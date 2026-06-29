# Keyflow Website — CLAUDE.md

> Marketing and public website for Keyflow.
> Part of the Keyflow platform (keyflowae.com).

@import ~/.claude/keyflow-knowledge/products.md
@import ~/.claude/keyflow-knowledge/design/brand.md

---

## Project Overview

**Keyflow Website** is the public-facing marketing site for the Keyflow platform. It showcases the product suite (LeaseFlow, LeadsFlow, Connect), communicates pricing, and drives conversions. It is a statically exported Next.js site with no server runtime, making it deployable to any CDN or static hosting service.

- **Framework:** Next.js 16.1.6, React 19.2.3, TypeScript 5
- **Styling:** Tailwind CSS 4
- **Output:** Static export (`output: 'export'`) — no server runtime needed
- **Dependencies:** Lightweight; `lucide-react` is the only significant external dependency
- **Repo:** keyflow-website/

---

## Development Commands

```bash
# Install dependencies
npm install

# Development server
npm run dev                          # Start at http://localhost:3000

# Build (static export)
npm run build                        # Generates static HTML/CSS/JS in /out

# Preview production build
npm run start                        # Serve the built output locally

# Lint
npm run lint                         # Run ESLint
```

---

## Deployment

Since the site is a static export, it can be deployed to any CDN or static hosting provider:

| Platform | Notes |
|----------|-------|
| AWS S3 + CloudFront | Primary production target |
| Vercel | Zero-config deployment |
| Netlify | Zero-config deployment |
| Any CDN | Upload `/out` directory |

No server runtime, environment variables, or database required at runtime.

---

## Brand Guidelines

### Color Palette

Monochromatic palette with warm accent:

| Color | Usage |
|-------|-------|
| Deep Black (#0A0A0A) | Primary backgrounds, hero sections |
| Charcoal (#1A1A1A) | Card backgrounds, secondary surfaces |
| Medium Gray (#4A4A4A) | Secondary text, borders |
| Light Gray (#E5E5E5) | Dividers, subtle borders |
| Off-White (#FAFAFA) | Primary text on dark backgrounds |
| White (#FFFFFF) | Headings, emphasis text |
| Warm Stone (#C9A87C) | Accent color — CTAs, highlights, premium feel |

### Typography

| Font | Usage |
|------|-------|
| Outfit | Headings and display text — modern, geometric |
| Inter | Body text — clean, highly readable |

### Design Principles

- Premium, sophisticated feel (targeting Dubai/DIFC real estate market)
- Generous whitespace and breathing room
- Conversion-optimized layouts (clear CTAs, social proof, benefit-driven copy)
- Mobile-first responsive design
- Subtle animations for engagement (not distracting)

---

## Site Structure

### Pages

| Page | Path | Purpose |
|------|------|---------|
| Landing / Home | `/` | Hero, value proposition, product overview, social proof, CTA |
| LeaseFlow | `/leaseflow` | Product page for property management platform |
| LeadsFlow | `/leadsflow` | Product page for CRM and lead management |
| Connect | `/connect` | Product page for communication hub |
| Pricing | `/pricing` | Pricing tiers and comparison |
| About | `/about` | Company story, team, mission |
| Contact | `/contact` | Contact form, office location, support |
| Privacy Policy | `/privacy-policy` | Legal privacy policy |
| Terms of Service | `/terms-of-service` | Legal terms |

### Page Composition

Each page typically includes:
- **Hero section** with headline, subheadline, and primary CTA
- **Feature sections** with benefit-driven copy and visuals
- **Social proof** (testimonials, client logos, stats)
- **CTA blocks** driving toward signup or demo request
- **Footer** with navigation, legal links, social links

---

## SEO

- Static export enables full search engine crawling
- Meta tags and Open Graph tags per page
- Structured data (JSON-LD) for organization and product information
- Semantic HTML structure
- Fast load times (no server rendering overhead)

---

## Technology Details

### Tailwind CSS 4

- Utility-first styling
- Custom theme tokens aligned with brand guidelines
- Responsive breakpoints for mobile, tablet, desktop

### Lucide React

- Icon library for consistent iconography
- Lightweight, tree-shakeable

### Static Export

- `next.config.js` sets `output: 'export'`
- No API routes, no server-side rendering at runtime
- All pages pre-rendered at build time
- Images must use `<img>` or next/image with `unoptimized: true`

---

## Working with This Codebase

### Adding New Pages
1. Create page component in `app/[page-name]/page.tsx`
2. Add meta tags and structured data
3. Include in navigation (header and footer)
4. Follow existing section patterns: hero, features, CTA, social proof
5. Maintain brand consistency (colors, typography, spacing)

### Updating Content
- All content is hardcoded in page components (no CMS)
- Edit text directly in the page TSX files
- Ensure copy is benefit-driven and conversion-oriented
- Keep messaging consistent with product positioning

### Adding Animations
- Keep animations subtle and performance-friendly
- Use CSS transitions/animations where possible
- Ensure animations don't block content visibility (no layout shift)

### Image Handling
- Static export means no Next.js image optimization at runtime
- Use `unoptimized: true` for next/image, or use standard `<img>` tags
- Optimize images at build time (compress, resize, use WebP)
- Store images in `/public` directory

---

## Future Roadmap

- **Arabic version:** Full RTL Arabic translation of the website
- **Blog / Content marketing:** Articles, guides, market insights for SEO
- **Case studies:** Customer success stories from Dubai agencies
- **Interactive demos:** Embedded product walkthroughs
