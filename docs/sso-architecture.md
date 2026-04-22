# Keyflow SSO — `auth.keyflowae.com`

Status: **design — pending review** (2026-04-20)
Owner: Abdallah Alshaqra
Scope: Phase 2 of the ecosystem auth program (Phase 1 = per-product device binding + JWT hardening = **done**; Phase 3 = shared user directory = **deferred**).

---

## 1. Goal

Let a user who has signed into **any** Keyflow product (LeadsFlow, DealsFlow, LeaseFlow, and later Connect) obtain a token the **other** products will accept — so the app or website opens already authenticated instead of asking for credentials again.

Non-goals for this phase:
- Merging user records across products (that is Phase 3 / Option C).
- Replacing NextAuth on the web dashboards.
- Changing each product's `User` table schema, role model, or tenant boundary.

After Phase 2:
- Users still have **separate accounts per product** (one email can exist in LeadsFlow *and* LeaseFlow as two distinct users).
- Signing in at any product also establishes a **federated session** the others can consume.
- iOS login screens all talk to the same service, so swapping between apps never asks for a password twice in a day.

---

## 2. Components

```
┌──────────────────────────────┐
│ iOS apps (3×)                │
│   KeyflowAuthKit (SPM)       │──┐  federated JWT (iss=auth.keyflowae.com,
│   KeychainService, LoginView │  │  aud=<product>, sub=<product_user_id>)
└──────────────────────────────┘  │
                                   ▼
                       ┌──────────────────────┐
                       │ auth.keyflowae.com      │
                       │ Next.js on ECS       │
                       │ Postgres (identities)│
                       └──────────────────────┘
                                   ▲
                 ┌─────────────────┼─────────────────┐
                 │                 │                 │
        ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
        │ LeadsFlow API  │ │ DealsFlow API  │ │ LeaseFlow API  │
        │ verifyToken()  │ │ verifyToken()  │ │ verifyToken()  │
        └────────────────┘ └────────────────┘ └────────────────┘
```

- **auth.keyflowae.com** — new Next.js app, new ECS service in the existing cluster, behind a new CloudFront distribution + Route 53 record. Issues federated tokens.
- **identities DB** — new Postgres schema. Stores only *authentication* data (email, password hash, MFA secrets, blocked state, session records). *No product-specific fields.* Links out to product user rows via `(product, product_user_id)` tuples.
- **per-product backends** — extend each product's `verifyMobileToken` to accept federated tokens in addition to their existing native tokens during rollout.
- **KeyflowAuthKit** — new Swift Package, depended on by all 3 iOS apps. Replaces each app's copy of `KeychainService`, `AuthService`, JWT decoding, login UI.

---

## 3. Token format

All tokens are JWT, HS256, signed with a per-product **federated signing key** stored in Secrets Manager (`keyflow/<product>/app-config` → `FEDERATED_JWT_SECRET`). Each product has its own shared secret with the auth service — compromising one product's key does not compromise the others.

### 3.1 Access token (short-lived, 1h)

```jsonc
{
  "iss": "auth.keyflowae.com",
  "aud": "leadsflow",              // or "dealsflow" / "leaseflow"
  "sub": "<product_user_id>",      // the user's id WITHIN that product
  "iat": 1776690000,
  "exp": 1776693600,
  "type": "access",
  "email": "agent@propointae.com",
  "role": "AGENT",                  // product-local role
  "tenantId": "org_abc123",         // organizationId / agency_id
  "tenantName": "Propoint Properties",
  "deviceId": "F4527ANP…",          // carried forward from Phase 1
  "keyflow_uid": "k_01HXYZ…"        // stable ID across products (from auth.keyflowae.com)
}
```

- `aud` is the contract: LeadsFlow only accepts tokens where `aud == "leadsflow"`. Prevents cross-product replay.
- `sub` is the user id **in that product's DB**, so existing queries (`WHERE userId = ?`) keep working.
- `keyflow_uid` is the auth-service's identity ID — the row that links all this user's per-product memberships. Phase 2 ignores it; Phase 3 collapses users via this column.

### 3.2 Refresh token (long-lived, 30d)

Same `iss` / `aud`, `type: "refresh"`, plus a `session_id` claim pointing at the auth service's session row so the user can be signed out server-side.

### 3.3 Cross-product "handoff" token (short-lived, 60s)

When the user is signed into LeadsFlow and taps a "Open in DealsFlow" deep link:
- LeadsFlow calls `auth.keyflowae.com/api/handoff/mint` with its own valid token.
- Auth service mints a 60-second handoff token with `aud: "dealsflow"` if the user has a DealsFlow membership.
- The deep link opens `dealsflow.me/auth/handoff?token=<…>` which exchanges it for a full DealsFlow session.

---

## 4. Per-product integration

### 4.1 `verifyMobileToken` — accept both token families

During rollout each product's `lib/mobile-auth.ts` accepts:

1. **Legacy product-local tokens** — existing `iss: "<product>-mobile"`, signed with `NEXTAUTH_SECRET` as today. Unchanged path.
2. **Federated tokens** — `iss: "auth.keyflowae.com"`, `aud: "<product>"`, signed with `FEDERATED_JWT_SECRET`.

```ts
async function verifyMobileToken(req) {
  const token = extractBearer(req)
  const header = decodeHeader(token)

  // Try federated first (cheap header-only check on `iss` claim)
  if (decodePayload(token).iss === 'auth.keyflowae.com') {
    return verifyFederated(token, process.env.FEDERATED_JWT_SECRET, PRODUCT_AUD)
  }
  return verifyLegacy(token, process.env.NEXTAUTH_SECRET)
}
```

After Phase 2 stabilises we delete the legacy path. No user-visible break.

### 4.2 Product signin endpoints during rollout

Each product's `/api/mobile/auth/signin` keeps working — some iOS apps in the wild will not upgrade immediately. New iOS builds talk to `auth.keyflowae.com` instead. Both populate Keychain with the same JWT shape.

### 4.3 Membership provisioning

Today, a user is created when they're invited to an organization (e.g. `/api/team/invites`). In Phase 2:

- The invite flow continues to create the product-local `User` row **and** additionally POSTs to `auth.keyflowae.com/api/memberships/link` with `{ email, product, product_user_id, tenantId, role }`.
- The auth service either finds an existing identity by email or creates a new one, then records a membership row.
- The invited user sets their password **on auth.keyflowae.com** (or migrates their existing product password on first federated signin — see §6 migration).

---

## 5. Auth service (`auth.keyflowae.com`)

### 5.1 Endpoints

| Method | Path | Purpose | Auth |
|---|---|---|---|
| `POST` | `/api/signin` | email + password + product + deviceId → `{ accessToken, refreshToken, memberships[] }` | public, rate-limited |
| `POST` | `/api/refresh` | refresh token + aud → new access token | refresh token |
| `POST` | `/api/memberships/link` | idempotent upsert of `(identity, product, product_user_id, tenantId, role)` | server-to-server (shared HMAC header) |
| `GET`  | `/api/memberships` | list memberships for the authenticated identity | access token |
| `POST` | `/api/handoff/mint` | aud = caller product; returns 60s token for target product if membership exists | access token |
| `POST` | `/api/signout` | revoke the server-side session | refresh token |
| `POST` | `/api/forgot-password` | generic response, 15-min rate-limited per IP | public |
| `POST` | `/api/reset-password` | token + new password | reset token |

All rate-limited with the same `lib/rate-limit` pattern we already use.

### 5.2 Schema

```prisma
model Identity {
  id                 String       @id @default(cuid())          // "k_…" — the keyflow_uid
  email              String       @unique
  passwordHash       String
  emailVerifiedAt    DateTime?
  mfaSecret          String?
  blockedAt          DateTime?
  blockedReason      String?
  createdAt          DateTime     @default(now())
  updatedAt          DateTime     @updatedAt
  memberships        Membership[]
  sessions           Session[]
}

model Membership {
  id             String   @id @default(cuid())
  identityId     String
  product        Product                                         // enum LEADSFLOW | DEALSFLOW | LEASEFLOW
  productUserId  String                                          // the id in that product's User table
  tenantId       String
  tenantName     String
  role           String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  identity       Identity @relation(fields: [identityId], references: [id], onDelete: Cascade)
  @@unique([product, productUserId])
  @@unique([identityId, product, tenantId])
  @@index([identityId])
}

model Session {
  id           String   @id @default(cuid())                     // the `session_id` claim
  identityId   String
  deviceId     String?
  createdAt    DateTime @default(now())
  lastSeenAt   DateTime @default(now())
  revokedAt    DateTime?
  userAgent    String?
  ipAddress    String?

  identity     Identity @relation(fields: [identityId], references: [id], onDelete: Cascade)
  @@index([identityId, revokedAt])
  @@index([deviceId])
}
```

### 5.3 Deployment

- New ECS service `keyflow-auth-sg` in the existing cluster (re-use the LeaseFlow VPC/subnets — this service sits next to LeaseFlow infra).
- New ALB target group + CloudFront distribution aliased to `auth.keyflowae.com`.
- New secret `keyflow/auth/app-config` in Secrets Manager with `FEDERATED_JWT_SECRET_LEADSFLOW`, `…_DEALSFLOW`, `…_LEASEFLOW`, plus its own `DATABASE_URL` pointing at a new Postgres database (`keyflow_auth`).
- GitHub OIDC CI pipeline mirrors the other products.

---

## 6. Rollout plan

### Step 1 — ship the auth service (week 1)
- Schema migration + endpoints behind `auth.keyflowae.com`.
- Provisioning: one-off script imports every existing product `User` as an `Identity` + `Membership`, keying by lowercased email. **Email collisions between products become the same Identity** (single `keyflow_uid`, multiple memberships). Flagged for review if password hashes differ significantly — defer those and tell the user to reset password.
- Dark deploy: service is live, nothing calls it yet.

### Step 2 — add federated-token acceptance to all 3 backends (week 1)
- Ship `verifyMobileToken` update in each product that accepts both legacy and federated tokens.
- Deploy — no behavior change because nothing issues federated tokens yet.

### Step 3 — KeyflowAuthKit (week 2)
- Publish the SPM package (initially as a monorepo-local dependency; later its own repo).
- Each iOS app updates to depend on it. Login UI, Keychain, token refresh all route through the shared package.
- Phase 1 device binding work moves into the package.

### Step 4 — flip iOS apps to `auth.keyflowae.com` (week 2)
- Rolled out build-by-build, staged via TestFlight.
- Feature flag on the iOS side: `useFederatedAuth = true`. Toggleable via remote config so we can back out fast.
- Old iOS builds keep hitting product-local signin — we keep that endpoint alive indefinitely.

### Step 5 — enable handoff links (week 2–3)
- Deep link `dealsflow://open?handoff=…` exchanges the token and opens authenticated.
- Web: "Open in DealsFlow" button on the LeadsFlow dashboard produces a handoff token and redirects.

### Step 6 — stabilisation (week 3+)
- 2 weeks of production soak before we propose Phase 3.

---

## 7. Security

- **Key separation**: one federated signing secret per product. Leaking the DealsFlow key can't forge LeaseFlow tokens.
- **aud enforcement**: mandatory check, not optional. A handoff-to-LeadsFlow token cannot be used against DealsFlow.
- **deviceId preserved**: Phase 1's device claim carries through federated tokens unchanged.
- **Session revocation**: `auth.keyflowae.com/api/signout` marks the session row revoked. Product `verifyMobileToken` does a 1-minute-cached check against the session API for federated tokens (small overhead, big value — currently no product has mobile session revocation).
- **Admin-initiated block**: `Identity.blockedAt` is the single block switch. Setting it revokes all sessions across all products at the next verify.

---

## 8. What this does NOT do (Phase 3 preview)

- Does NOT merge `User` rows across products. An agent who has access to both LeadsFlow and DealsFlow still has two product-local user ids (stitched together by one `Identity`, but their data lives in separate DBs).
- Does NOT change tenant/org scoping — each product keeps its own tenant model.
- Does NOT let a LeadsFlow-only agent read DealsFlow deals. Authorisation is still per-product. SSO is authentication only.

Phase 3 would either: (a) collapse product `User` tables into memberships on the auth service, or (b) build a shared data plane. Both are large. We decide after Phase 2 ships cleanly.

---

## 9. Open questions

1. **Password migration** — do we force reset on first federated signin, or transparently migrate the bcrypt hash from the product DB to the auth service? Recommend transparent migration (one-time script + on-signin fallback) unless legal flags a reason not to.
2. **MFA** — enable TOTP on the auth service on day one, or defer to a follow-up? Day one adds ~1 day of work.
3. **Who owns the Sentry org for `auth.keyflowae.com`?** — add it as a 4th project? (Leaning yes.)
4. **Rate limit cost** — `rateLimit` is in-memory per instance today. The auth service will have multiple instances behind an ALB; in-memory drift makes brute-force detection weaker. Do we pull in Redis/ElastiCache now or later?
5. **Email delivery** — reuse LeaseFlow's SES setup, or provision a fresh SES identity for `auth.keyflowae.com`? Reuse is faster; fresh is cleaner for deliverability reputation.

---

## 10. Checklist for approval to start Step 1

- [ ] Sign off on token format (§3)
- [ ] Sign off on endpoint list (§5.1)
- [ ] Sign off on schema (§5.2)
- [ ] Answer open questions (§9)
- [ ] Approve new ECS service + CloudFront distribution + Route 53 record for `auth.keyflowae.com`
- [ ] Approve new RDS/Postgres database `keyflow_auth`
- [ ] Provide (or approve creation of) a 4th Sentry project
