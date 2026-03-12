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
- **Files:** `/logos/KEYFLOW-01.svg` through `KEYFLOW-04.svg`

### Color System
| Token | Value | Usage |
|-------|-------|-------|
| `background-light` | #fafafa | Primary background (off-white, warm) |
| `background-dark` | #1b1b1b | Dark sections, primary text |
| `text-light` | #fafafa | Text on dark backgrounds |
| `text-dark` | #1b1b1b | Text on light backgrounds |
| `accent` | TBD | Explore warm metallic gold (#C9A96E) or deep teal (#2A7D6F) |
| `particle-light` | #1b1b1b | Particles on light backgrounds |
| `particle-dark` | #fafafa | Particles on dark backgrounds |

### Typography System
| Role | Style | Candidates |
|------|-------|-----------|
| Display / Headlines | Bold geometric sans-serif | Saans, General Sans, or custom cut |
| Body | Clean, readable sans | Inter, Satoshi |
| Accent / Quotes | Refined serif | Editorial New, Cormorant |

The contrast between bold geometric headlines and refined serif accents creates the "luxury meets modern SaaS" feel.

### Tone
- **Visual palette:** Clean, modern SaaS — light backgrounds, whites, airy space
- **Typography & feel:** Premium/luxury — refined type, elegant spacing, authority
- **Journey & experience:** Futuristic — immersive 3D, particle effects, scroll-driven cinematic storytelling

---

## 3. Technical Architecture

### Approach: "The Cinematic World" (Hybrid)
Custom Three.js/R3F for hero and key moments (maximum Awwwards impact where judges look hardest). Spline for secondary 3D elements (faster iteration on inner pages). GSAP for all motion choreography. 21st Dev for premium UI components.

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| 3D (hero, preloader, transitions) | React Three Fiber + Drei + custom GLSL shaders |
| 3D (secondary scenes) | Spline |
| Animation & scroll | GSAP + ScrollTrigger |
| UI components | 21st Dev |
| Micro-interactions | Framer Motion |
| Styling | Tailwind CSS |
| Deployment | Vercel |

### Performance Targets
- 60fps on modern devices
- Progressive loading: preloader buys time for Three.js initialization
- Route-based code splitting: inner pages load Spline scenes on demand
- Texture compression, geometry instancing for particles
- Graceful degradation on older devices: 2D fallback with GSAP-only animations

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
- As assets load, cables snap one by one (progress-linked)
- Final cable snaps → logo drops → catches itself mid-air, begins hovering — the moment it becomes alive
- Logo rotates toward camera → zooms in → viewer flies through the geometric "K" shapes inside
- Camera emerges into bright (#fafafa) world — the abstract particle flow field
- Transition from preloader to hero is seamless — no hard cut

### 5.2 Hero
- Full viewport. Particle flow field alive behind everything
- "KEYFLOW" in massive display type
- Below: "The Future of Real Estate, Flowing." in refined serif/elegant sans
- Single CTA: "Get Early Access" — subtle, not screaming
- Particles subtly react to cursor movement (parallax depth)

### 5.3 Vision Statement (dark section)
- Background transitions to #1b1b1b
- Full-screen statement typography with accent-highlighted keywords
- *"We're building the operating system for Dubai's real estate ecosystem."*
- Breathing room — just type and particle traces in the dark
- Reference: Lando Norris dark typography section

### 5.4 The Suite — Scroll-Driven Product Reveal
- Each product gets its own scroll moment — full or near-full viewport
- Product name animates in large display type: "Dealsflow"
- Particle field morphs into abstract representation of the product's function
- One-line description fades in below
- Scroll → particles dissolve and reform → next product takes the stage
- Four products, four moments, each with unique particle choreography
- The shared "-flow" suffix is styled consistently — a visual thread

### 5.5 The Ecosystem (Spline 3D)
- Interactive 3D node graph showing how the four products connect
- Hover on nodes to highlight connections: agents → Dealsflow → Leadsflow → clients
- DLD integration shown as external node feeding authenticated data
- Living, rotating, explorable 3D network — not a flat diagram

### 5.6 Credibility Strip
- Dubai PropTech Hub badge + DIFC logo + DLD logo
- "Powered by authenticated DLD data"
- Partner section: Mohamed Shaat and Abdullah Abdulqader with photos, names, credentials
- Clean, horizontal, authoritative

### 5.7 CTA / Early Access
- "Join the future of Dubai real estate"
- Single-field email capture — clean, premium-feeling
- Particle field returns and settles into calm, static pattern

### 5.8 Footer
- Fanned card layout (inspired by Lando Norris social section) with Keyflow content — tilted cards linking to Solutions, About, Contact with subtle 3D hover
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
- Early access signup, same component as homepage

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

### 7.3 Founding Team
- Staggered, asymmetric layout (reference: Lando Norris photo scatter — NOT a grid of headshots)
- Each person: photo, name, title, one-line personal note
- Mohamed Shaat and Abdullah Abdulqader featured prominently with real estate credentials
- Abdallah Al Shaqra as founder/CEO
- Photos should feel candid and human — not corporate

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
- Particle field is connective tissue across all pages

### Custom Cursor
- Small circle that scales and morphs on interactive elements
- Hover over CTAs: cursor expands into ring
- Hover over 3D: cursor becomes grab/drag indicator

### Responsive Strategy
- Desktop-first for the immersive 3D experience
- Tablet: maintained 3D with simplified particle counts
- Mobile: 2D fallback with GSAP animations, Spline scenes replaced with static renders or simplified views
- The preloader and page transitions work across all breakpoints

---

## 10. Credibility Assets

### Partnerships & Integrations
- **Dubai PropTech Hub** — DIFC + DLD initiative, first PropTech innovation center in MEASA
- **DLD Integration** — Authenticated data extraction and upload/updating
- **Mohamed Shaat** — Renowned Dubai real estate professional
- **Abdullah Abdulqader** — Renowned Dubai real estate professional

### Content Needed
- Copywriting for all pages (to be produced as part of this project)
- Partner photos (Mohamed Shaat, Abdullah Abdulqader)
- Team photos (candid, not corporate)
- Dubai PropTech Hub badge / approval for logo usage
- DLD logo usage approval

---

## 11. Reference Sites

| Site | Year | Relevance |
|------|------|-----------|
| [landonorris.com](https://landonorris.com) | SOTY 2025 | Bold typography, custom card patterns, Webflow + WebGL + Rive hybrid, dark/light section transitions |
| [igloo.inc](https://igloo.inc) | SOTY 2024 | Immersive 3D + scroll-driven navigation, jury praised combining 3D with easy scrolling |
| [lusion.co](https://lusion.co) | SOTY 2023 | Three.js + WebGL + custom shaders, particle systems, abstract 3D as storytelling device |

---

## 12. Success Criteria

- [ ] Site achieves Awwwards Site of the Day nomination
- [ ] 60fps on modern devices (MacBook Pro, iPhone 15+)
- [ ] Graceful degradation on older devices
- [ ] Lighthouse performance score > 80
- [ ] Full responsiveness across desktop, tablet, mobile
- [ ] All pages load within 3 seconds on 4G connection (excluding preloader)
- [ ] Waitlist/early access form functional and collecting submissions
- [ ] Brand credibility established — visitor leaves knowing Keyflow is legitimate and backed by DLD/DIFC
