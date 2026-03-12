# Keyflow Website Design Spec

**Date:** 2026-03-12
**Project:** keyflowae.com — Main marketing website
**Goal:** Awwwards Site of the Year-level brand experience for Keyflow, a proptech SaaS company in Dubai

---

## 1. Context & Goals

### Company
Keyflow is a proptech SaaS company based in Dubai, UAE, building a complete integrated suite of software for real estate stakeholders — agents, agencies, developers, owners, and tenants. The company is part of the Dubai PropTech Hub, an initiative by DIFC and DLD.

### Products (in development, launching in order)
1. **Dealsflow** — Agent-oriented application for managing deals
2. **Leadsflow** — Real estate-focused CRM
3. **Leaseflow** — Lease management software
4. **Keyflow Connect** — Unified client communication platform

### Website Goals (priority order)
1. **Brand credibility** — Establish Keyflow as a serious, premium player in Dubai real estate tech
2. **Education** — Communicate what the suite does and who it serves
3. **Conversion** — Collect early access signups and demo requests

### Target Audience
Broad: all real estate stakeholders in the UAE (primarily Dubai).
Primary: agents and agencies — visual, fast-moving professionals who judge credibility in seconds.

### Design Standard
Awwwards Site of the Year. The site itself is the product pitch — by the time visitors reach a CTA, they should already be convinced by the experience.

---

## 2. Brand Identity

### Logo
- **Mark:** Rounded rectangle containing two geometric shapes forming an abstract "K" — angular, arrow-like forms
- **Wordmark:** "KEYFLOW" in bold geometric sans-serif
- **Tagline:** "AI REAL ESTATE SOLUTIONS"
- **Variants:** 4 SVGs — dark (#1b1b1b) and light (#fff) at two scales
- **Files:** `Logos/KEYFLOW-01.svg` through `Logos/KEYFLOW-04.svg`

### Color System
| Token | Value | Usage |
|-------|-------|-------|
| `background-light` | #fafafa | Primary background (off-white, warm) |
| `background-dark` | #1b1b1b | Dark sections, primary text |
| `text-light` | #fafafa | Text on dark backgrounds |
| `text-dark` | #1b1b1b | Text on light backgrounds |
| `accent` | #C9A96E | Warm metallic gold — accent highlights, CTA hover states, emphasis words in dark sections |
| `accent-hover` | #D4B97E | Lighter gold for hover/active states |
| `particle-light` | #1b1b1b | Particles on light backgrounds |
| `particle-dark` | #fafafa | Particles on dark backgrounds |

The gold accent bridges luxury real estate and modern tech. It complements the #1b1b1b/#fafafa primary palette without competing.

### Typography System
| Role | Family | Weight | Loading |
|------|--------|--------|---------|
| Display / Headlines | **General Sans** | Bold (700), Semibold (600) | Self-hosted WOFF2, variable font |
| Body | **Satoshi** | Regular (400), Medium (500) | Self-hosted WOFF2, variable font |
| Accent / Quotes | **Editorial New** | Italic (400i) | Self-hosted WOFF2, standard |

Font loading strategy: `font-display: swap` with self-hosted WOFF2 files. Variable fonts for Display and Body to minimize file count. Preload the Display font in `<head>` since it appears above the fold.

### Tone
- **Visual palette:** Clean, modern SaaS — light backgrounds, whites, airy space
- **Typography & feel:** Premium/luxury — refined type, elegant spacing, authority
- **Journey & experience:** Futuristic — immersive 3D, particle effects, scroll-driven cinematic storytelling

---

## 3. Technical Architecture

### Approach: "The Cinematic World" (Hybrid)
Custom Three.js/R3F for hero and key moments (maximum Awwwards impact where judges look hardest). Spline for secondary 3D elements (faster iteration on inner pages). GSAP for all motion choreography. 21st Dev for premium UI components.

### Tech Stack
| Layer | Technology | Scope |
|-------|-----------|-------|
| Framework | Next.js (App Router) | Routing, SSR, code splitting |
| 3D (hero, preloader, transitions) | React Three Fiber + Drei + custom GLSL shaders | Preloader portal, hero particle field, page transitions |
| 3D (secondary scenes) | Spline | Solutions page product visualizations, ecosystem diagram |
| Animation & scroll | GSAP + ScrollTrigger | All scroll-driven animations, section reveals, text animations |
| UI components (21st Dev) | Buttons, form inputs, navigation bar, CTA sections | Premium pre-built components — customized to match brand tokens |
| Micro-interactions | Framer Motion | Hover states, menu toggles, small element transitions |
| Styling | Tailwind CSS | All layout and responsive design |
| Form backend | Resend (email) + Supabase (storage) | Waitlist submissions stored in Supabase, notification via Resend |
| Analytics | PostHog | Page views, scroll depth, CTA clicks, form submissions |
| Deployment | Vercel | Hosting, edge functions, preview deployments |

### Page Transition Architecture
GSAP page transitions with Next.js App Router require a custom transition layer. Implementation approach:
- Shared layout component wraps all pages with a persistent `<Canvas>` for the particle field
- Route changes intercepted via `router.push` wrapper that triggers GSAP exit animation before navigation
- `startViewTransition` API used where supported, with GSAP fallback for unsupported browsers
- The particle field canvas persists across routes (never unmounts), only page content transitions

### Performance Targets
- 60fps on modern devices (MacBook Pro M1+, iPhone 15+)
- Progressive loading: preloader buys time for Three.js initialization
- Route-based code splitting: inner pages load Spline scenes on demand
- Texture compression, geometry instancing for particles
- Graceful degradation on older devices: 2D fallback with GSAP-only animations
- Lighthouse targets: Performance > 60, Accessibility > 90, Best Practices > 90, SEO > 95 (Performance measured on SSR shell before Three.js hydration; WebGL-heavy sites typically score 50-70 on Performance)

---

## 4. Site Structure

Minimal multi-page: 4 pages.

| Page | Purpose |
|------|---------|
| **Home** | Cinematic brand experience — hero, vision, product overview, credibility, CTA |
| **Solutions** | What Keyflow does, filterable by stakeholder type |
| **About** | Team, mission, Dubai PropTech Hub, DLD integration story |
| **Contact / Early Access** | Waitlist signup, demo booking, direct contact |

---

## 5. Homepage — The Scroll Journey

### 5.1 Preloader → Portal Transition
- Screen opens on dark (#1b1b1b) background
- The Keyflow logo mark is suspended by thin geometric wireframe cables
- As assets load, cables snap one by one (progress-linked to actual asset loading)
- Final cable snaps → logo drops → catches itself mid-air, begins hovering — the moment it becomes alive
- Logo rotates toward camera → zooms in → viewer flies through the geometric "K" shapes inside
- Camera emerges into bright (#fafafa) world — the abstract particle flow field
- Transition from preloader to hero is seamless — no hard cut

**Fallback behavior:**
- Maximum preloader duration: 5 seconds. If assets haven't loaded by then, cables snap in rapid succession and transition proceeds with progressive asset loading in the background
- Skip mechanism: click anywhere or press any key to skip the preloader after 2 seconds
- Non-WebGL devices: CSS-animated version of the logo mark with a simple fade-to-white transition. The logo scales up and fades, then the hero loads with GSAP text animations only (no particle field)

### 5.2 Hero
- Full viewport. Particle flow field alive behind everything
- "KEYFLOW" in massive display type (General Sans Bold)
- Below: "The Future of Real Estate, Flowing." in refined serif (Editorial New Italic)
- Single CTA: "Get Early Access" — subtle, not screaming
- Particles subtly react to cursor movement (parallax depth)

### 5.3 Vision Statement (dark section)
- Background transitions to #1b1b1b
- Full-screen statement typography with gold accent (#C9A96E) on emphasis words
- Oversized General Sans Bold for main text, Editorial New Italic for emphasis words — creating typographic contrast within the statement (reference: landonorris.com dark section where "REDEFINING", "WINS", and "LEGACY" use a distinct lime accent and italic style against the main bold text)
- *"We're building the operating system for Dubai's real estate ecosystem."*
- Breathing room — just type and particle traces in the dark

### 5.4 The Suite — Scroll-Driven Product Reveal
- Each product gets its own scroll moment — full or near-full viewport
- Product name animates in large display type: "Dealsflow"
- Particle field morphs into abstract representation of the product's function
- One-line description fades in below
- Scroll → particles dissolve and reform → next product takes the stage
- The shared "-flow" suffix is styled consistently — a visual thread

**Particle choreography per product (shared base behavior with variations):**
All four use the same particle system with different configuration parameters — not four separate implementations:
- **Dealsflow:** Particles form converging arrows/directional streams (deals flowing toward closure)
- **Leadsflow:** Particles radiate outward from a center point in expanding rings (lead generation/reach)
- **Leaseflow:** Particles form a structured grid that breathes rhythmically (organized, systematic management)
- **Keyflow Connect:** Particles form interconnected clusters with visible lines between groups (connection/network)

Fallback: If particle morphing proves too complex during implementation, all four products share the same ambient particle behavior with color density variation (denser = more mature product). This is the minimum viable version.

### 5.5 The Ecosystem Diagram
- Beautifully animated 2D SVG diagram (GSAP-animated, not Spline 3D) showing how the four products connect
- GSAP draws connection lines between product nodes on scroll — the diagram builds itself as you watch
- Hover on nodes to highlight connections: agents → Dealsflow → Leadsflow → clients
- DLD integration shown as external node feeding authenticated data
- Clean, elegant, and performant — reserves 3D complexity budget for the hero where it has maximum impact

### 5.6 Credibility Strip
- Dubai PropTech Hub badge + DIFC logo + DLD logo
- "Powered by authenticated DLD data"
- Partner section: Mohamed Shaat and Abdullah Abdulqader with photos, names, credentials (titled as "Strategic Advisors" — see Section 10 for role clarification)
- Clean, horizontal, authoritative

### 5.7 CTA / Early Access
- "Join the future of Dubai real estate"
- Single-field email capture — clean, premium-feeling
- Particle field returns and settles into calm, static pattern

### 5.8 Footer
- Fanned card layout with Keyflow content — tilted cards linking to Solutions, About, Contact with subtle 3D hover effect. Rounded corners, slight rotation offset per card, spread like a hand of playing cards (reference: landonorris.com "What's Up On Socials" section where photo cards fan out from a central point)
- Social links, legal, copyright
- Keyflow logo mark centered — the same mark that started the journey in the preloader

---

## 6. Solutions Page

### 6.1 Page Transition
- GSAP: current page elements dissolve into particles → particles sweep across viewport → reform into Solutions page elements

### 6.2 Hero
- "One Suite. Every Stakeholder." in large display type
- *"Four products. One ecosystem. Built for how Dubai real estate actually works."*
- Particle field present but calmer — ambient, not dominant

### 6.3 Stakeholder Navigation
- Horizontal scroll or tab interaction: Agents, Agencies, Developers, Owners, Tenants
- Selecting one reframes product descriptions below for that audience's pain points
- Smooth morph transitions between views — not hard swaps

### 6.4 Product Deep Dives
Each product section includes:
- Large product name in display type
- Spline 3D scene — abstract animated representation (not a UI mockup)
- 3-4 key capabilities as short lines, staggered GSAP reveal on scroll
- "Coming Soon" styled as design element, not afterthought
- Particle field shifts form between products for continuity

### 6.5 DLD Integration Highlight
- Dedicated moment: *"Built on authenticated data from the Dubai Land Department"*
- Animation: data flowing from DLD node into Keyflow ecosystem
- Signals official connection, not scraped or estimated data

### 6.6 CTA
- "See yourself in the flow"
- Uses the shared `EarlyAccessCTA` component (see Section 9) with custom headline prop

---

## 7. About Page

### 7.1 Hero
- Quiet after the product-heavy Solutions page
- "Built in Dubai. Built for Dubai." in large type
- Minimal particle field — just traces, like a watermark

### 7.2 The Mission
- 2-3 paragraphs about why Keyflow exists
- The fragmentation of Dubai's real estate tools, disconnected workflows, vision of unified ecosystem
- Typography-driven — no competing imagery, beautifully set type with generous spacing

### 7.3 Team
- Staggered, asymmetric layout — photos at varying sizes, some overlapping, organic placement across the viewport (reference: landonorris.com photo gallery where images of different sizes are scattered across the scroll with location/date captions, not aligned to a grid)
- **Abdallah Al Shaqra** — Founder & CEO
- **Mohamed Shaat** — Strategic Advisor (real estate industry veteran)
- **Abdullah Abdulqader** — Strategic Advisor (real estate industry veteran)
- Each person: photo, name, title, one-line personal note
- Photos should feel candid and human — not corporate headshots

### 7.4 Dubai PropTech Hub
- Dedicated section for accelerator membership
- DIFC + DLD logos featured large
- Statement about what hub membership means for Keyflow
- Positions company within government-backed innovation ecosystem

### 7.5 Timeline / Roadmap (optional)
- Only if milestones feel substantial
- Scroll-driven horizontal or vertical reveal
- Key milestones: founding, PropTech Hub acceptance, DLD integration, upcoming product launches

---

## 8. Contact / Early Access Page

### 8.1 Split Layout
- Left: "Let's Build the Future Together" in large type
- Right: the form

### 8.2 Form Fields
- Stakeholder type selector (Agent, Agency, Developer, Owner, Tenant, Other)
- Name, email, company
- Optional message
- "Get Early Access" submit
- Every input has subtle focus animations

### 8.3 Form Backend
- Submissions stored in **Supabase** (table: `waitlist_submissions` with fields: id, stakeholder_type, name, email, company, message, created_at)
- On submission: **Resend** sends a confirmation email to the user and a notification to the Keyflow team (a.alshaqra@keyflowae.com)
- Rate limiting: max 3 submissions per email per day (prevent spam)
- Success state: form morphs into a "You're in" confirmation with subtle animation

### 8.3 Direct Contact
- Email, physical address (DIFC), social links
- Stylized location indicator for Dubai

### 8.4 Background
- Particle field makes final appearance — particles settling, coming to rest
- The journey that began with explosive energy ends in calm resolution

---

## 9. Global Design Elements

### Navigation
- Fixed top bar: logo mark (left), nav links (center/right), "Get Early Access" CTA
- On scroll: subtle frosted-glass backdrop blur
- Mobile: full-screen overlay menu with large type links and particle animation behind

### Page Transitions
- GSAP-choreographed particle dissolution and reformation on every page change
- ~800ms duration — fast enough to not annoy, slow enough to feel intentional
- Particle field is connective tissue across all pages — the `<Canvas>` never unmounts
- See Section 3 (Page Transition Architecture) for technical implementation

### Shared CTA Component (`EarlyAccessCTA`)
- Reusable React component with configurable props: `headline` (string), `subtext` (string, optional), `variant` ("light" | "dark")
- Homepage uses: headline="Join the future of Dubai real estate", variant="light"
- Solutions uses: headline="See yourself in the flow", variant="light"
- All instances submit to the same Supabase backend

### Custom Cursor (Phase 2 — Post-Launch Polish)
- Small circle that scales and morphs on interactive elements
- Hover over CTAs: cursor expands into ring
- Hover over 3D: cursor becomes grab/drag indicator
- Not in initial launch scope — add after core experience is solid

### Responsive Strategy
- Desktop-first for the immersive 3D experience
- **Breakpoints:** Desktop (>1280px), Tablet (768-1279px), Mobile (<768px)
- **Tablet:** Maintained 3D with reduced particle count (50% of desktop). Spline scenes at lower polygon count
- **Mobile:** No WebGL canvas. GSAP text animations and scroll reveals only. Spline scenes replaced with pre-rendered PNG/WebP stills exported from the Spline scenes at 2x resolution. Preloader uses CSS animation of the logo mark (scale + fade) instead of Three.js
- The page transitions work across all breakpoints (GSAP fade/slide on mobile instead of particle dissolution)

---

## 10. Credibility Assets

### Team & Advisors
- **Abdallah Al Shaqra** — Founder & CEO
- **Mohamed Shaat** — Strategic Advisor, renowned Dubai real estate professional
- **Abdullah Abdulqader** — Strategic Advisor, renowned Dubai real estate professional

On the homepage Credibility Strip (5.6), they appear as "Strategic Advisors." On the About page Team section (7.3), they appear with full bios. Titles must be consistent across both locations.

### Partnerships & Integrations
- **Dubai PropTech Hub** — DIFC + DLD initiative, first PropTech innovation center in MEASA
- **DLD Integration** — Authenticated data extraction and upload/updating

### Content Needed
- Copywriting for all pages (to be produced as part of this project)
- Advisor photos (Mohamed Shaat, Abdullah Abdulqader)
- Team photos (candid, not corporate)
- Dubai PropTech Hub badge / approval for logo usage
- DLD logo usage approval

---

## 11. SEO, Metadata & Analytics

### SEO
- **Sitemap:** Auto-generated via `next-sitemap` — submitted to Google Search Console
- **Canonical URLs:** Set on all pages to prevent duplicate content
- **Meta descriptions:** Unique per page, written as part of copywriting phase
- **Structured data (JSON-LD):**
  - `Organization` schema on all pages (name, logo, url, sameAs for social profiles)
  - `SoftwareApplication` schema on Solutions page (for each product)
  - `WebSite` schema with search action on homepage

### Open Graph & Social Sharing
- OG image: Custom 1200x630 graphic for each page (homepage, solutions, about, contact)
- OG title and description unique per page
- Twitter Card: `summary_large_image`
- WhatsApp preview optimized (important for Dubai market where WhatsApp is dominant)

### Analytics & Conversion Tracking
- **Tool:** PostHog (self-hosted or cloud)
- **Events tracked:**
  - `page_view` — all pages with scroll depth (25%, 50%, 75%, 100%)
  - `cta_click` — every "Get Early Access" button, tagged by location (hero, footer, solutions)
  - `form_submit` — successful waitlist submissions with stakeholder_type
  - `form_error` — failed submissions with error type
  - `preloader_skip` — when users skip the preloader (indicates patience threshold)
  - `3d_interaction` — interactions with Spline scenes (hover, drag)
- **Conversion funnel:** Page view → CTA click → Form view → Form submit
- **No cookies required** for basic analytics — PostHog can run cookieless

---

## 12. Accessibility

### Motion Sensitivity
- Respect `prefers-reduced-motion` at the OS level
- When enabled: disable particle field, GSAP scroll animations, page transitions, and Spline auto-rotation
- Replace with: instant section reveals, simple fade transitions, static imagery
- The site must still look intentional and premium with reduced motion — not broken

### Keyboard Navigation
- Full tab navigation through all interactive elements
- Focus rings visible on all focusable elements (styled to match brand — gold accent outline)
- Skip-to-content link on all pages
- Spline 3D scenes: not keyboard-interactive (decorative). Provide text description alongside.
- Page transition: focus moves to main content area after transition completes

### Screen Readers
- All images have descriptive `alt` text
- 3D/particle scenes have `aria-hidden="true"` with adjacent text descriptions
- Form fields have associated `<label>` elements
- Page structure uses semantic HTML (`<header>`, `<main>`, `<nav>`, `<footer>`, `<section>`)
- Dynamic content changes announced via `aria-live` regions

### Color Contrast
- All text meets WCAG 2.1 AA contrast ratios (4.5:1 for body, 3:1 for large text)
- Gold accent (#C9A96E) on dark (#1b1b1b): contrast ratio 5.2:1 — passes AA
- Gold accent (#C9A96E) on light (#fafafa): contrast ratio 3.1:1 — passes AA for large text only. Use only for display headings on light backgrounds, never for body text.

---

## 13. Reference Sites

| Site | Year | What to emulate |
|------|------|----------------|
| [landonorris.com](https://landonorris.com) | SOTY 2025 | **5.3:** Full-viewport dark section with oversized bold text and accent-colored emphasis words. **7.3:** Asymmetric scattered photo layout with varying sizes and location captions. **5.8:** Fanned photo-card layout from the "On Socials" section. |
| [igloo.inc](https://igloo.inc) | SOTY 2024 | Immersive 3D combined with easy scroll navigation — proof that 3D and usability coexist |
| [lusion.co](https://lusion.co) | SOTY 2023 | Particle systems and abstract 3D as storytelling — the artistic benchmark for the hero particle field |

---

## 14. Success Criteria

- [ ] Site achieves Awwwards Site of the Day nomination
- [ ] 60fps on modern devices (MacBook Pro M1+, iPhone 15+)
- [ ] Graceful degradation on older devices (GSAP-only fallback functional)
- [ ] Lighthouse: Performance > 60, Accessibility > 90, Best Practices > 90, SEO > 95
- [ ] Full responsiveness across desktop (>1280px), tablet (768-1279px), mobile (<768px)
- [ ] All pages load within 3 seconds on 4G connection (excluding preloader)
- [ ] Waitlist form functional: submissions stored in Supabase, confirmation emails via Resend
- [ ] Brand credibility established — visitor leaves knowing Keyflow is legitimate and backed by DLD/DIFC
- [ ] `prefers-reduced-motion` fully supported with premium fallback experience
- [ ] All form fields accessible via keyboard with visible focus indicators
