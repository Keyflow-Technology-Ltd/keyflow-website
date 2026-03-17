# Light Mode Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add opt-in light mode with sidebar toggle to both LeadsFlow and LeaseFlow, keeping dark as default.

**Architecture:** CSS variable-driven theming via Tailwind `darkMode: ["class"]`. A `ThemeProvider` reads/writes `localStorage` and toggles `class="dark"` on `<html>`. Hardcoded dark colors get replaced with semantic Tailwind classes (`bg-background`, `text-foreground`, `border-border`) that respond to the theme.

**Tech Stack:** Next.js, Tailwind CSS, React Context, localStorage, lucide-react icons

---

## File Structure

### LeadsFlow (`/Users/abdallahalshaqra/leadsflow/`)

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `src/components/theme-provider.tsx` | React context, localStorage sync, class toggle |
| Create | `src/components/theme-toggle.tsx` | Sun/moon icon button |
| Modify | `src/app/globals.css` | Split vars into `:root` (light) + `.dark` (dark) |
| Modify | `src/app/layout.tsx` | Wrap with ThemeProvider, add flash-prevention script |
| Modify | `src/components/dashboard-nav.tsx` | Add ThemeToggle next to Settings/Logout |
| Modify | ~100 files | Replace hardcoded dark colors with semantic classes |

### LeaseFlow (`/Users/abdallahalshaqra/project_apex/`)

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `components/theme-provider.tsx` | React context, localStorage sync, class toggle |
| Create | `components/theme-toggle.tsx` | Sun/moon icon button |
| Modify | `app/globals.css` | Split vars into `:root` (light) + `.dark` (dark) |
| Modify | `app/layout.tsx` | Wrap with ThemeProvider, add flash-prevention script |
| Modify | `components/main-layout.tsx` | Add ThemeToggle next to Settings/Sign Out |
| Modify | ~80 files | Replace hardcoded dark colors with semantic classes |

---

## Task 1: LeadsFlow — ThemeProvider + ThemeToggle Components

**Files:**
- Create: `src/components/theme-provider.tsx`
- Create: `src/components/theme-toggle.tsx`

- [ ] **Step 1: Create ThemeProvider** — React context with localStorage sync and class toggle on `<html>`
- [ ] **Step 2: Create ThemeToggle** — Sun/moon button matching sidebar styling (text-[13px], md:justify-center lg:justify-start)
- [ ] **Step 3: Commit**

---

## Task 2: LeadsFlow — Update globals.css (Light/Dark Split)

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Move current `:root` dark values under `.dark` selector**
- [ ] **Step 2: Add light values under `:root`** — background #FAFAFA, card white, text neutral-900, borders neutral-200, indigo accent unchanged
- [ ] **Step 3: Add light variants for `--lf-*` tokens** — lf-bg-page #FAFAFA, lf-bg-card white, lf-text-primary #171717, lf-border-default #E5E5E5
- [ ] **Step 4: Commit**

---

## Task 3: LeadsFlow — Wire Up Layout + Sidebar

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/dashboard-nav.tsx`

- [ ] **Step 1: Update layout.tsx** — change `className="dark"` to `suppressHydrationWarning`, add inline script to read localStorage and set class before paint (prevents flash), wrap children with ThemeProvider
- [ ] **Step 2: Add ThemeToggle to sidebar** — import ThemeToggle, add above the Sign Out button in the bottom section (around line 151)
- [ ] **Step 3: Commit**

---

## Task 4: LeadsFlow — Replace Hardcoded Dark Colors

**Files:**
- Modify: ~100 files across `src/`

- [ ] **Step 1: Bulk sed replacement** across all .tsx/.ts files:

| Hardcoded | Semantic |
|-----------|----------|
| `bg-[#141416]` | `bg-background` |
| `bg-neutral-900/50` | `bg-card/50` |
| `bg-neutral-900` | `bg-card` |
| `bg-neutral-800` | `bg-secondary` |
| `text-neutral-100` | `text-foreground` |
| `text-neutral-200` | `text-foreground` |
| `text-neutral-300` | `text-muted-foreground` |
| `text-neutral-400` | `text-muted-foreground` |
| `text-neutral-500` | `text-muted-foreground` |
| `border-white/[0.08]` | `border-border` |
| `border-white/[0.12]` | `border-border` |
| `hover:bg-neutral-800` | `hover:bg-accent` |
| `divide-white/[0.08]` | `divide-border` |

- [ ] **Step 2: Fix dashboard layout background** — replace `bg-[#141416]` with `bg-background`
- [ ] **Step 3: Build to verify** — `npx next build`
- [ ] **Step 4: Commit**

---

## Task 5: LeadsFlow — Build, Deploy, Push

- [ ] **Step 1: Build Docker image**
- [ ] **Step 2: Push to ECR and deploy to ECS**
- [ ] **Step 3: Push to GitHub** — `git push origin main`

---

## Task 6: LeaseFlow — ThemeProvider + ThemeToggle Components

**Files:**
- Create: `components/theme-provider.tsx`
- Create: `components/theme-toggle.tsx`

- [ ] **Step 1: Create ThemeProvider** — same as LeadsFlow version
- [ ] **Step 2: Create ThemeToggle** — matching LeaseFlow sidebar styling (font-mono text-[11px] tracking-[0.12em] uppercase, gap-3 px-3 py-2.5)
- [ ] **Step 3: Commit**

---

## Task 7: LeaseFlow — Update globals.css (Light/Dark Split)

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Verify/update `:root` light values** — LeaseFlow already has light/dark split but verify accent values use sage hue (143)
- [ ] **Step 2: Remove hardcoded `background: #141416`** from `html, body` rule — let `bg-background` handle it
- [ ] **Step 3: Commit**

---

## Task 8: LeaseFlow — Wire Up Layout + Sidebar

**Files:**
- Modify: `app/layout.tsx`
- Modify: `components/main-layout.tsx`

- [ ] **Step 1: Update layout.tsx** — add `suppressHydrationWarning`, inline flash-prevention script, wrap with ThemeProvider
- [ ] **Step 2: Add ThemeToggle to sidebar** — in `main-layout.tsx` DesktopSidebar, add between Settings link (line 99) and Sign Out button (line 101)
- [ ] **Step 3: Commit**

---

## Task 9: LeaseFlow — Replace Hardcoded Dark Colors

**Files:**
- Modify: ~80 files across the codebase

- [ ] **Step 1: Bulk sed replacement** — same mapping as Task 4, additionally:

| Hardcoded | Semantic |
|-----------|----------|
| `bg-[#121212]` | `bg-background` |
| `border-white/[0.06]` | `border-border` |

- [ ] **Step 2: Build to verify** — `npx next build`
- [ ] **Step 3: Commit**

---

## Task 10: LeaseFlow — Build, Deploy, Push

- [ ] **Step 1: Build Docker image**
- [ ] **Step 2: Push to ECR and deploy to ECS**
- [ ] **Step 3: Push to GitHub** — `git push origin main`
