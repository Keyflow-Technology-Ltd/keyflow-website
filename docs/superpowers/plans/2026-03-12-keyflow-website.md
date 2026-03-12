# Keyflow Website Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Awwwards SOTY-level marketing website for Keyflow (keyflowae.com) — a proptech SaaS company in Dubai.

**Architecture:** Next.js App Router with React Three Fiber for the immersive 3D hero/preloader, Spline for secondary 3D, GSAP for all scroll/motion choreography, and a full AWS backend (Amplify, Lambda, DynamoDB, SES). The particle field persists across routes via a shared layout Canvas that never unmounts.

**Tech Stack:** Next.js 15, React Three Fiber, Drei, GSAP + ScrollTrigger, Spline, Tailwind CSS, Framer Motion, TypeScript, AWS (Amplify, API Gateway, Lambda, DynamoDB, SES, CloudFront, Route 53), PostHog

**Spec:** `docs/superpowers/specs/2026-03-12-keyflow-website-design.md`

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout: persistent Canvas, nav, footer, analytics
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # Tailwind base + custom font faces + global styles
│   ├── solutions/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
├── components/
│   ├── layout/
│   │   ├── navigation.tsx            # Fixed top nav with frosted glass + mobile menu
│   │   ├── footer.tsx                # Fanned card footer
│   │   ├── mobile-menu.tsx           # Full-screen overlay menu
│   │   ├── page-transition.tsx       # GSAP route transition wrapper
│   │   └── skip-to-content.tsx       # A11y skip link
│   ├── ui/
│   │   ├── button.tsx                # Brand-styled button (21st Dev customized)
│   │   ├── input.tsx                 # Brand-styled form input
│   │   └── early-access-cta.tsx      # Shared CTA section component
│   ├── three/
│   │   ├── canvas-wrapper.tsx        # Persistent R3F Canvas with WebGL detection
│   │   │   ├── particle-field.tsx        # Core particle system (configurable formations)
│   │   ├── preloader.tsx             # Full preloader orchestrator
│   │   ├── preloader-cables.tsx      # Geometric wireframe cables + snapping
│   │   ├── preloader-fallback.tsx    # CSS fallback preloader for non-WebGL
│   │   └── logo-portal.tsx           # Logo mark 3D + fly-through transition
│   ├── home/
│   │   ├── hero-section.tsx          # Hero with KEYFLOW type + CTA over particle field
│   │   ├── vision-section.tsx        # Dark section with accent typography
│   │   ├── product-reveal.tsx        # Scroll-driven product sequence (4 products)
│   │   ├── ecosystem-diagram.tsx     # SVG node graph with GSAP draw
│   │   ├── credibility-strip.tsx     # Logos + advisors
│   │   └── cta-section.tsx           # Homepage CTA wrapper
│   ├── solutions/
│   │   ├── stakeholder-nav.tsx       # Horizontal tab/scroll navigation
│   │   ├── product-deep-dive.tsx     # Single product section (reused x4)
│   │   └── dld-highlight.tsx         # DLD integration section
│   ├── about/
│   │   ├── mission-section.tsx       # Typography-driven mission statement
│   │   ├── team-scatter.tsx          # Asymmetric photo layout
│   │   └── proptech-hub.tsx          # DIFC/DLD membership section
│   └── contact/
│       ├── waitlist-form.tsx          # Form with validation + submission
│       └── contact-info.tsx           # Address, email, socials, location
├── lib/
│   ├── tokens.ts                     # Design tokens: colors, spacing, breakpoints
│   ├── fonts.ts                      # next/font configuration for 3 font families
│   ├── analytics.ts                  # PostHog client wrapper + event helpers
│   ├── motion.ts                     # GSAP registration + reduced-motion utilities
│   ├── webgl-support.ts              # WebGL capability detection
│   └── seo.ts                        # Shared metadata builder per page
├── hooks/
│   ├── use-reduced-motion.ts         # Reads prefers-reduced-motion
│   ├── use-scroll-progress.ts        # ScrollTrigger progress for sections
│   ├── use-webgl-support.ts          # Returns boolean for WebGL availability
│   └── use-viewport.ts              # Returns current breakpoint (desktop/tablet/mobile)
├── shaders/
│   ├── particle.vert                 # Vertex shader for particle positions
│   ├── particle.frag                 # Fragment shader for particle appearance
│   └── shaders.d.ts                  # TypeScript declarations for .vert/.frag imports
└── content/
    ├── products.ts                   # Product names, descriptions, capabilities, particle configs
    ├── team.ts                       # Team/advisor data
    └── metadata.ts                   # Per-page SEO titles, descriptions, OG data

infrastructure/
├── template.yaml                     # AWS SAM template (API GW + Lambda + DynamoDB + SES)
└── lambda/
    └── waitlist/
        ├── index.ts                  # Lambda handler: validate, store, email
        └── package.json

public/
├── fonts/
│   ├── GeneralSans-Variable.woff2
│   ├── Satoshi-Variable.woff2
│   └── EditorialNew-Italic.woff2
├── logos/                            # Copied from project root Logos/
├── images/
│   ├── og/                           # OG images per page (1200x630)
│   ├── team/                         # Team/advisor photos
│   └── partners/                     # DIFC, DLD, PropTech Hub logos
└── spline/                           # Pre-rendered stills for mobile fallback

Config files (root):
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── next-sitemap.config.js
└── package.json
```

---

## Chunk 1: Foundation

Project scaffolding, design tokens, fonts, shared utilities, and core layout components. After this chunk, you have a working Next.js app with branded typography, colors, navigation, and footer — but no 3D or page content yet.

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`

- [ ] **Step 1: Initialize Next.js project**

```bash
npx create-next-app@latest keyflow-website --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
cd keyflow-website
```

- [ ] **Step 2: Install core dependencies**

```bash
npm install gsap @gsap/react @react-three/fiber @react-three/drei three @splinetool/react-spline framer-motion
npm install -D @types/three
```

- [ ] **Step 3: Install utility dependencies**

```bash
npm install next-sitemap posthog-js clsx
```

- [ ] **Step 4: Copy logo files into public**

```bash
mkdir -p public/logos public/fonts public/images/og public/images/team public/images/partners public/spline
cp ../Logos/KEYFLOW-*.svg public/logos/
```

- [ ] **Step 5: Download and place font files**

Download General Sans Variable, Satoshi Variable, and Editorial New Italic as WOFF2 files. Place in `public/fonts/`:
- `GeneralSans-Variable.woff2`
- `Satoshi-Variable.woff2`
- `EditorialNew-Italic.woff2`

- [ ] **Step 6: Commit**

```bash
git init && git add -A && git commit -m "chore: scaffold Next.js project with dependencies"
```

---

### Task 2: Design Tokens & Font Configuration

**Files:**
- Create: `src/lib/tokens.ts`, `src/lib/fonts.ts`, `src/app/globals.css` (update)

- [ ] **Step 1: Create design tokens**

Create `src/lib/tokens.ts`:

```typescript
export const colors = {
  background: { light: "#fafafa", dark: "#1b1b1b" },
  text: { light: "#fafafa", dark: "#1b1b1b" },
  accent: { DEFAULT: "#C9A96E", hover: "#D4B97E" },
  particle: { light: "#1b1b1b", dark: "#fafafa" },
} as const;

export const breakpoints = {
  mobile: 768,
  tablet: 1280,
} as const;

export type ColorToken = typeof colors;
export type BreakpointToken = typeof breakpoints;
```

- [ ] **Step 2: Create font configuration**

Create `src/lib/fonts.ts`:

```typescript
import localFont from "next/font/local";

export const generalSans = localFont({
  src: "../../public/fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  display: "swap",
  preload: true,
});

export const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const editorialNew = localFont({
  src: "../../public/fonts/EditorialNew-Italic.woff2",
  variable: "--font-editorial-new",
  display: "swap",
  style: "italic",
});
```

- [ ] **Step 3: Update tailwind.config.ts with brand tokens**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#fafafa",
          dark: "#1b1b1b",
          accent: "#C9A96E",
          "accent-hover": "#D4B97E",
        },
      },
      fontFamily: {
        display: ["var(--font-general-sans)", "sans-serif"],
        body: ["var(--font-satoshi)", "sans-serif"],
        accent: ["var(--font-editorial-new)", "serif"],
      },
      screens: {
        tablet: "768px",
        desktop: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Update globals.css with font faces and base styles**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-brand-light text-brand-dark font-body antialiased;
  }

  ::selection {
    @apply bg-brand-accent/30 text-brand-dark;
  }

  /* Focus ring for a11y */
  :focus-visible {
    @apply outline-2 outline-offset-2 outline-brand-accent;
  }
}
```

- [ ] **Step 5: Update root layout with fonts**

Update `src/app/layout.tsx`:

```typescript
import { generalSans, satoshi, editorialNew } from "@/lib/fonts";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${satoshi.variable} ${editorialNew.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Verify fonts render correctly**

Run: `npm run dev`
Visit `http://localhost:3000` — verify the page renders with Satoshi body font. Inspect CSS variables in devtools: `--font-general-sans`, `--font-satoshi`, `--font-editorial-new` should all be present on `<html>`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add design tokens, font config, and Tailwind brand theme"
```

---

### Task 3: Core Utility Hooks

**Files:**
- Create: `src/hooks/use-reduced-motion.ts`, `src/hooks/use-webgl-support.ts`, `src/hooks/use-viewport.ts`, `src/hooks/use-scroll-progress.ts`
- Create: `src/lib/webgl-support.ts`, `src/lib/motion.ts`

- [ ] **Step 1: Create reduced motion hook**

Create `src/hooks/use-reduced-motion.ts`:

```typescript
"use client";
import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}
```

- [ ] **Step 2: Create WebGL support detection**

Create `src/lib/webgl-support.ts`:

```typescript
export function detectWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}
```

Create `src/hooks/use-webgl-support.ts`:

```typescript
"use client";
import { useState, useEffect } from "react";
import { detectWebGLSupport } from "@/lib/webgl-support";

export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(detectWebGLSupport());
  }, []);

  return supported;
}
```

- [ ] **Step 3: Create viewport hook**

Create `src/hooks/use-viewport.ts`:

```typescript
"use client";
import { useState, useEffect } from "react";
import { breakpoints } from "@/lib/tokens";

export type Viewport = "mobile" | "tablet" | "desktop";

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < breakpoints.mobile) setViewport("mobile");
      else if (w < breakpoints.tablet) setViewport("tablet");
      else setViewport("desktop");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return viewport;
}
```

- [ ] **Step 4: Create GSAP registration utility**

Create `src/lib/motion.ts`:

```typescript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGSAP() {
  if (typeof window === "undefined" || registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };
```

Note: No `"use client"` here — this is a plain utility module, not a React component. The `"use client"` directive is only for component boundaries.

- [ ] **Step 5: Create scroll progress hook**

Create `src/hooks/use-scroll-progress.ts`:

```typescript
"use client";
import { useEffect, useRef, useState } from "react";
import { registerGSAP, ScrollTrigger } from "@/lib/motion";

export function useScrollProgress(options?: { start?: string; end?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    registerGSAP();
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: options?.start ?? "top bottom",
      end: options?.end ?? "bottom top",
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [options?.start, options?.end]);

  return { ref, progress };
}
```

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add utility hooks (reduced-motion, webgl, viewport, scroll)"
```

---

### Task 4: Navigation Component

**Files:**
- Create: `src/components/layout/navigation.tsx`, `src/components/layout/mobile-menu.tsx`, `src/components/layout/skip-to-content.tsx`

- [ ] **Step 1: Create skip-to-content link**

Create `src/components/layout/skip-to-content.tsx`:

```typescript
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-accent focus:text-brand-dark focus:rounded-md font-body text-sm"
    >
      Skip to content
    </a>
  );
}
```

- [ ] **Step 2: Create mobile menu**

Create `src/components/layout/mobile-menu.tsx`:

```typescript
"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-brand-dark flex flex-col items-center justify-center"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-brand-light font-display text-lg"
            aria-label="Close menu"
          >
            Close
          </button>
          <nav className="flex flex-col gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="font-display text-4xl text-brand-light hover:text-brand-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Create navigation bar**

Create `src/components/layout/navigation.tsx`:

```typescript
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "./mobile-menu";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-brand-light/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" aria-label="Keyflow Home">
            <Image
              src="/logos/KEYFLOW-01.svg"
              alt="Keyflow"
              width={120}
              height={40}
              priority
            />
          </Link>

          <nav className="hidden tablet:flex items-center gap-8">
            {["Solutions", "About", "Contact"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="font-body text-sm text-brand-dark hover:text-brand-accent transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="font-body text-sm px-5 py-2.5 bg-brand-dark text-brand-light rounded-full hover:bg-brand-accent transition-colors"
            >
              Get Early Access
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="tablet:hidden font-body text-sm text-brand-dark"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
```

- [ ] **Step 4: Verify navigation renders**

Run: `npm run dev`
Add `<Navigation />` to layout.tsx temporarily. Verify: fixed header, frosted glass on scroll, mobile menu opens/closes, links work.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add navigation with frosted glass header and mobile menu"
```

---

### Task 5: Footer & Shared CTA Component

**Files:**
- Create: `src/components/layout/footer.tsx`, `src/components/ui/early-access-cta.tsx`, `src/components/ui/button.tsx`, `src/components/ui/input.tsx`, `src/app/api/waitlist/route.ts`

- [ ] **Step 1: Create brand button component**

Create `src/components/ui/button.tsx`:

```typescript
import { forwardRef } from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "font-body rounded-full transition-all duration-300 inline-flex items-center justify-center",
          {
            "bg-brand-dark text-brand-light hover:bg-brand-accent": variant === "primary",
            "border border-brand-dark text-brand-dark hover:border-brand-accent hover:text-brand-accent": variant === "secondary",
            "text-brand-dark hover:text-brand-accent": variant === "ghost",
          },
          {
            "text-xs px-4 py-2": size === "sm",
            "text-sm px-6 py-3": size === "md",
            "text-base px-8 py-4": size === "lg",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
```

- [ ] **Step 2: Create brand input component**

Create `src/components/ui/input.tsx`:

```typescript
import { forwardRef } from "react";
import { clsx } from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="font-body text-sm text-brand-dark/70">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "font-body text-base px-4 py-3 bg-transparent border rounded-lg transition-all duration-200",
            "border-brand-dark/20 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent",
            "placeholder:text-brand-dark/30",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className,
          )}
          {...props}
        />
        {error && <p className="text-red-500 text-xs font-body">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";
```

- [ ] **Step 3: Create shared EarlyAccessCTA component**

Create `src/components/ui/early-access-cta.tsx`:

```typescript
"use client";
import { useState } from "react";
import { Button } from "./button";
import { clsx } from "clsx";

interface EarlyAccessCTAProps {
  headline: string;
  subtext?: string;
  variant?: "light" | "dark";
}

export function EarlyAccessCTA({
  headline,
  subtext,
  variant = "light",
}: EarlyAccessCTAProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isDark = variant === "dark";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className={clsx("py-24 px-6 text-center", isDark ? "bg-brand-dark" : "bg-brand-light")}>
        <h2 className={clsx("font-display text-3xl tablet:text-5xl font-bold mb-4", isDark ? "text-brand-light" : "text-brand-dark")}>
          You're in.
        </h2>
        <p className={clsx("font-accent italic text-lg", isDark ? "text-brand-light/70" : "text-brand-dark/70")}>
          We'll be in touch soon.
        </p>
      </section>
    );
  }

  return (
    <section className={clsx("py-24 px-6 text-center", isDark ? "bg-brand-dark" : "bg-brand-light")}>
      <h2 className={clsx("font-display text-3xl tablet:text-5xl font-bold mb-4", isDark ? "text-brand-light" : "text-brand-dark")}>
        {headline}
      </h2>
      {subtext && (
        <p className={clsx("font-accent italic text-lg mb-8", isDark ? "text-brand-light/70" : "text-brand-dark/70")}>
          {subtext}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col tablet:flex-row gap-3 max-w-md mx-auto">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={clsx(
            "flex-1 font-body text-base px-5 py-3.5 rounded-full border transition-all",
            isDark
              ? "bg-transparent border-brand-light/20 text-brand-light placeholder:text-brand-light/40 focus:border-brand-accent"
              : "bg-transparent border-brand-dark/20 text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-accent",
            "focus:ring-1 focus:ring-brand-accent focus:outline-none",
          )}
        />
        <Button type="submit" disabled={status === "loading"} size="lg">
          {status === "loading" ? "Joining..." : "Get Early Access"}
        </Button>
      </form>
      {status === "error" && (
        <p className="text-red-500 text-sm mt-3 font-body">Something went wrong. Please try again.</p>
      )}
    </section>
  );
}
```

- [ ] **Step 4: Create stub API route for waitlist**

Create `src/app/api/waitlist/route.ts` — a dev stub so the CTA is testable before the real Lambda is wired in Chunk 5:

```typescript
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // In production, proxy to API Gateway (set WAITLIST_API_URL env var)
  const apiUrl = process.env.WAITLIST_API_URL;
  if (apiUrl) {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  }

  // Dev mode: log and return success
  console.log("[waitlist-stub]", body);
  return NextResponse.json({ success: true });
}
```

Note: The `EarlyAccessCTA` component sends `{ email }` only. The full Contact page form sends all fields. The Lambda (Task 20) must accept `stakeholder_type`, `name`, `company`, and `message` as optional — only `email` is required.

- [ ] **Step 5: Create footer component**

Create `src/components/layout/footer.tsx`:

```typescript
import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://linkedin.com/company/keyflow", label: "LinkedIn" },
  { href: "https://instagram.com/keyflowae", label: "Instagram" },
  { href: "https://x.com/keyflowae", label: "X" },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Fanned card navigation */}
        <div className="flex justify-center gap-4 mb-16">
          {FOOTER_LINKS.map((link, i) => {
            const rotation = (i - 1) * 6; // -6, 0, 6 degrees
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block w-40 h-52 bg-brand-light/5 border border-brand-light/10 rounded-2xl flex items-center justify-center font-display text-lg text-brand-light hover:bg-brand-accent/20 hover:border-brand-accent/30 hover:scale-105 hover:rotate-0 transition-all duration-300"
                style={{ transform: `rotate(${rotation}deg)`, perspective: "600px" }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Logo centered */}
        <div className="flex justify-center mb-12">
          <Image src="/logos/KEYFLOW-03.svg" alt="Keyflow" width={160} height={53} />
        </div>

        {/* Social + legal */}
        <div className="flex flex-col tablet:flex-row items-center justify-between gap-6 text-sm text-brand-light/50">
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="font-body">© {new Date().getFullYear()} Keyflow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Wire layout.tsx with all layout components**

Update `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { generalSans, satoshi, editorialNew } from "@/lib/fonts";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/layout/skip-to-content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keyflow — The Future of Real Estate",
  description: "The integrated software suite for Dubai real estate stakeholders. AI-powered tools for agents, agencies, developers, owners, and tenants.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${satoshi.variable} ${editorialNew.variable}`}
    >
      <body>
        <SkipToContent />
        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Verify full layout**

Run: `npm run dev`
Verify: navigation renders at top, footer renders at bottom, skip-to-content appears on Tab, fonts applied correctly.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add footer, shared CTA, button, input, stub API, and wire root layout"
```

---

### Task 6: Content Data Files

**Files:**
- Create: `src/content/products.ts`, `src/content/team.ts`, `src/content/metadata.ts`

- [ ] **Step 1: Create product data**

Create `src/content/products.ts`:

```typescript
export type ParticleFormation = "ambient" | "converge" | "radiate" | "grid" | "cluster";

export interface Product {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  capabilities: string[];
  particleConfig: {
    formation: ParticleFormation;
    density: number;
  };
}

export const products: readonly Product[] = [
  {
    name: "Dealsflow",
    slug: "dealsflow",
    tagline: "Close deals, not tabs.",
    description: "The agent-oriented application that streamlines every deal from inquiry to handover.",
    capabilities: [
      "Pipeline visualization for every active deal",
      "Automated document collection and verification",
      "Commission tracking and split management",
      "Real-time deal status for all parties",
    ],
    particleConfig: { formation: "converge", density: 1.0 },
  },
  {
    name: "Leadsflow",
    slug: "leadsflow",
    tagline: "Every lead, one place.",
    description: "A CRM built for real estate — not retrofitted from another industry.",
    capabilities: [
      "Unified inbox across WhatsApp, email, and portals",
      "AI-powered lead scoring and prioritization",
      "Automated follow-up sequences",
      "Performance analytics by agent, team, and source",
    ],
    particleConfig: { formation: "radiate", density: 0.8 },
  },
  {
    name: "Leaseflow",
    slug: "leaseflow",
    tagline: "Leases that manage themselves.",
    description: "End-to-end lease management from contract generation to renewal reminders.",
    capabilities: [
      "Automated lease generation with DLD-compliant templates",
      "Renewal and expiry tracking dashboards",
      "Tenant communication portal",
      "Integrated payment tracking and receipts",
    ],
    particleConfig: { formation: "grid", density: 0.9 },
  },
  {
    name: "Keyflow Connect",
    slug: "keyflow-connect",
    tagline: "One thread, every stakeholder.",
    description: "Integrate all your client communications into a single, unified platform.",
    capabilities: [
      "Unified messaging across channels",
      "Client-facing portal with document sharing",
      "Activity timeline for every relationship",
      "Team handoff and collaboration tools",
    ],
    particleConfig: { formation: "cluster", density: 0.7 },
  },
];
```

- [ ] **Step 2: Create team data**

Create `src/content/team.ts`:

```typescript
export interface TeamMember {
  name: string;
  role: string;
  title: string;
  note: string;
  image: string;
  size: "large" | "medium" | "small";
}

export const team: readonly TeamMember[] = [
  {
    name: "Abdallah Al Shaqra",
    role: "founder",
    title: "Founder & CEO",
    note: "Building the future of Dubai real estate, one flow at a time.",
    image: "/images/team/abdallah.webp",
    size: "large",
  },
  {
    name: "Mohamed Shaat",
    role: "advisor",
    title: "Strategic Advisor",
    note: "Real estate industry veteran shaping Keyflow's market strategy.",
    image: "/images/team/mohamed.webp",
    size: "medium",
  },
  {
    name: "Abdullah Abdulqader",
    role: "advisor",
    title: "Strategic Advisor",
    note: "Bringing decades of Dubai real estate expertise to the table.",
    image: "/images/team/abdullah.webp",
    size: "medium",
  },
] as const;
```

- [ ] **Step 3: Create per-page metadata**

Create `src/content/metadata.ts`:

```typescript
import type { Metadata } from "next";

const BASE_URL = "https://keyflowae.com";

function buildMetadata(page: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${BASE_URL}${page.path}`;
  const ogImage = page.ogImage ?? "/images/og/home.jpg";

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: "Keyflow",
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
  };
}

export const pageMetadata = {
  home: buildMetadata({
    title: "Keyflow — The Future of Real Estate",
    description: "The integrated software suite for Dubai real estate stakeholders. AI-powered tools for agents, agencies, developers, owners, and tenants.",
    path: "/",
  }),
  solutions: buildMetadata({
    title: "Solutions — Keyflow",
    description: "Four products, one ecosystem. Dealsflow, Leadsflow, Leaseflow, and Keyflow Connect — built for how Dubai real estate actually works.",
    path: "/solutions",
    ogImage: "/images/og/solutions.jpg",
  }),
  about: buildMetadata({
    title: "About — Keyflow",
    description: "Built in Dubai, for Dubai. Part of the Dubai PropTech Hub by DIFC and DLD. Meet the team building the future of real estate technology.",
    path: "/about",
    ogImage: "/images/og/about.jpg",
  }),
  contact: buildMetadata({
    title: "Get Early Access — Keyflow",
    description: "Join the future of Dubai real estate. Sign up for early access to the Keyflow suite.",
    path: "/contact",
    ogImage: "/images/og/contact.jpg",
  }),
} as const;
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add content data files for products, team, and page metadata"
```

---

## Chunk 2: 3D Engine

The particle field, preloader portal, and Canvas wrapper. After this chunk, you have a working preloader that transitions into an interactive particle field hero.

### Task 7: Canvas Wrapper & WebGL Fallback

**Files:**
- Create: `src/components/three/canvas-wrapper.tsx`

- [ ] **Step 1: Create the persistent Canvas wrapper**

Create `src/components/three/canvas-wrapper.tsx`:

```typescript
"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useViewport } from "@/hooks/use-viewport";

interface CanvasWrapperProps {
  children: React.ReactNode;
}

export function CanvasWrapper({ children }: CanvasWrapperProps) {
  const webgl = useWebGLSupport();
  const reducedMotion = useReducedMotion();
  const viewport = useViewport();

  // No WebGL on mobile or unsupported devices or reduced motion
  if (!webgl || viewport === "mobile" || reducedMotion) {
    return null;
  }

  // Tablet: reduce particle count to 50% of desktop (spec responsive strategy)
  const particleCount = viewport === "tablet" ? 1000 : 2000;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Pass particleCount to children via context or props */}
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: add persistent Canvas wrapper with WebGL/viewport/motion detection"
```

---

### Task 8: Particle Field Shader & System

**Files:**
- Create: `src/shaders/particle.vert`, `src/shaders/particle.frag`, `src/components/three/particle-field.tsx`

- [ ] **Step 1: Create vertex shader**

Create `src/shaders/particle.vert`:

```glsl
uniform float uTime;
uniform float uTransition; // 0-1 blend between formations
uniform vec2 uMouse;

attribute float aRandom;
attribute vec3 aTarget;

varying float vAlpha;

void main() {
  vec3 pos = position;

  // Ambient drift
  float drift = sin(uTime * 0.5 + aRandom * 6.28) * 0.1;
  pos.x += drift;
  pos.y += cos(uTime * 0.3 + aRandom * 3.14) * 0.08;

  // Blend toward target formation
  pos = mix(pos, aTarget, uTransition);

  // Mouse repulsion (subtle parallax)
  vec2 mouseDir = pos.xy - uMouse;
  float mouseDist = length(mouseDir);
  if (mouseDist < 1.0) {
    pos.xy += normalize(mouseDir) * (1.0 - mouseDist) * 0.3;
  }

  vAlpha = 0.3 + aRandom * 0.7;
  float size = 1.5 + aRandom * 2.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = size * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
```

- [ ] **Step 2: Create fragment shader**

Create `src/shaders/particle.frag`:

```glsl
uniform vec3 uColor;
varying float vAlpha;

void main() {
  // Soft circle
  float dist = length(gl_PointCoord - vec2(0.5));
  if (dist > 0.5) discard;

  float alpha = vAlpha * smoothstep(0.5, 0.2, dist);
  gl_FragColor = vec4(uColor, alpha);
}
```

- [ ] **Step 3: Create particle field component**

Create `src/components/three/particle-field.tsx`:

```typescript
"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "@/shaders/particle.vert";
import fragmentShader from "@/shaders/particle.frag";

interface ParticleFieldProps {
  count?: number;
  formation?: "ambient" | "converge" | "radiate" | "grid" | "cluster";
  transition?: number;
  colorMode?: "light" | "dark";
  visible?: boolean;
}

function generateTargets(
  formation: string,
  count: number,
): Float32Array {
  const targets = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    switch (formation) {
      case "converge": {
        const angle = (i / count) * Math.PI * 2;
        const radius = 0.5 + Math.random() * 0.3;
        targets[i3] = Math.cos(angle) * radius;
        targets[i3 + 1] = Math.sin(angle) * radius;
        targets[i3 + 2] = (Math.random() - 0.5) * 0.5;
        break;
      }
      case "radiate": {
        const a = Math.random() * Math.PI * 2;
        const r = 1.0 + Math.random() * 3.0;
        targets[i3] = Math.cos(a) * r;
        targets[i3 + 1] = Math.sin(a) * r;
        targets[i3 + 2] = (Math.random() - 0.5) * 0.5;
        break;
      }
      case "grid": {
        const cols = Math.ceil(Math.sqrt(count));
        const row = Math.floor(i / cols);
        const col = i % cols;
        targets[i3] = (col / cols - 0.5) * 4;
        targets[i3 + 1] = (row / cols - 0.5) * 4;
        targets[i3 + 2] = 0;
        break;
      }
      case "cluster": {
        const clusterIdx = i % 4;
        const cx = ((clusterIdx % 2) - 0.5) * 2;
        const cy = (Math.floor(clusterIdx / 2) - 0.5) * 2;
        targets[i3] = cx + (Math.random() - 0.5) * 0.8;
        targets[i3 + 1] = cy + (Math.random() - 0.5) * 0.8;
        targets[i3 + 2] = (Math.random() - 0.5) * 0.3;
        break;
      }
      default: {
        targets[i3] = (Math.random() - 0.5) * 8;
        targets[i3 + 1] = (Math.random() - 0.5) * 6;
        targets[i3 + 2] = (Math.random() - 0.5) * 2;
      }
    }
  }
  return targets;
}

export function ParticleField({
  count = 2000,
  formation = "ambient",
  transition = 0,
  colorMode = "light",
  visible = true,
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  const { positions, randoms, uniforms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      rand[i] = Math.random();
    }

    return {
      positions: pos,
      randoms: rand,
      uniforms: {
        uTime: { value: 0 },
        uTransition: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color(colorMode === "light" ? "#1b1b1b" : "#fafafa") },
      },
    };
  }, [count, colorMode]);

  const targets = useMemo(
    () => generateTargets(formation, count),
    [formation, count],
  );

  // Attach mouse listener to window (canvas has pointer-events: none)
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  // Update target buffer when formation changes
  useEffect(() => {
    if (!points.current) return;
    const geo = points.current.geometry;
    const attr = geo.getAttribute("aTarget") as THREE.BufferAttribute;
    if (attr) {
      attr.array.set(targets);
      attr.needsUpdate = true;
    }
  }, [targets]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const material = points.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = clock.getElapsedTime();
    material.uniforms.uTransition.value = transition;
    material.uniforms.uMouse.value.copy(mouse.current);
    material.uniforms.uColor.value.set(
      colorMode === "light" ? "#1b1b1b" : "#fafafa",
    );
  });

  if (!visible) return null;

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-aRandom" array={randoms} count={count} itemSize={1} />
        <bufferAttribute attach="attributes-aTarget" array={targets} count={count} itemSize={3} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
```

- [ ] **Step 4: Add raw shader imports to next.config.ts**

Update `next.config.ts` to handle `.vert`/`.frag` imports:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(vert|frag|glsl)$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
```

Add shader type declarations in `src/shaders/shaders.d.ts`:

```typescript
declare module "*.vert" {
  const value: string;
  export default value;
}
declare module "*.frag" {
  const value: string;
  export default value;
}
```

- [ ] **Step 5: Verify particle field renders**

Add the CanvasWrapper + ParticleField to layout temporarily. Run `npm run dev`. Verify: particles visible, drifting, responsive to page background.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add particle field system with configurable formations and GLSL shaders"
```

---

### Task 9: Preloader

**Files:**
- Create: `src/components/three/preloader.tsx`, `src/components/three/preloader-cables.tsx`, `src/components/three/logo-portal.tsx`

This is the most complex 3D task. The preloader has three phases:
1. Logo suspended by cables (loading)
2. Cables snap, logo drops and hovers (loaded)
3. Logo rotates and zooms — fly-through portal into hero (transition)

- [ ] **Step 1: Create preloader cables component**

Create `src/components/three/preloader-cables.tsx` — geometric wireframe lines that snap based on loading progress. Each cable is a `<Line>` from Drei. The cables connect from viewport edges to the central logo mark. As `snapProgress` increases (0→1), cables break one by one.

- [ ] **Step 2: Create logo portal component**

Create `src/components/three/logo-portal.tsx` — the 3D representation of the Keyflow logo mark (the geometric "K" shape). Starts static, then animates rotation + zoom for the fly-through. Use Drei's `<Extrude>` or `<Shape>` to recreate the logo geometry from the SVG path data in `public/logos/KEYFLOW-01.svg`.

- [ ] **Step 3: Create preloader orchestrator**

Create `src/components/three/preloader.tsx` — the state machine that drives the preloader sequence:

```typescript
"use client";
import { useState, useEffect, useCallback } from "react";

type PreloaderPhase = "loading" | "snapping" | "hovering" | "portal" | "complete";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<PreloaderPhase>("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [skipEnabled, setSkipEnabled] = useState(false);

  // Enable skip after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setSkipEnabled(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Maximum duration: 5 seconds — force transition regardless of load state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === "loading") {
        setPhase("snapping"); // Rapid-snap all remaining cables
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [phase]);

  // Skip handler (click or keypress after 2s gate)
  useEffect(() => {
    if (!skipEnabled || phase === "complete") return;
    const handler = () => setPhase("snapping");
    window.addEventListener("click", handler);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [skipEnabled, phase]);

  // Phase transitions
  useEffect(() => {
    if (phase === "snapping") {
      // Rapid-snap animation → then hover
      const timer = setTimeout(() => setPhase("hovering"), 600);
      return () => clearTimeout(timer);
    }
    if (phase === "hovering") {
      // Logo hovers → then portal fly-through
      const timer = setTimeout(() => setPhase("portal"), 800);
      return () => clearTimeout(timer);
    }
    if (phase === "portal") {
      // Fly-through animation → complete
      const timer = setTimeout(() => {
        setPhase("complete");
        onComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Loading progress from Three.js assets
  const handleProgress = useCallback((progress: number) => {
    setLoadProgress(progress);
    if (progress >= 1 && phase === "loading") {
      setPhase("snapping");
    }
  }, [phase]);

  if (phase === "complete") return null;

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark" aria-hidden="true">
      {/* Three.js preloader scene renders here:
          - PreloaderCables: snapProgress driven by loadProgress + phase
          - LogoPortal: animates based on phase (static → drop → hover → rotate → zoom)
          Wire handleProgress to Three.js useProgress() from Drei */}
    </div>
  );
}
```

This is the orchestration skeleton — the Three.js scene components (`PreloaderCables`, `LogoPortal`) render inside the overlay div's Canvas. Wire Drei's `useProgress()` hook to `handleProgress` for real asset loading tracking.

- [ ] **Step 4: Create CSS fallback preloader**

Create `src/components/three/preloader-fallback.tsx` — for non-WebGL devices:

```typescript
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface PreloaderFallbackProps {
  onComplete: () => void;
}

export function PreloaderFallback({ onComplete }: PreloaderFallbackProps) {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");

  useEffect(() => {
    const loadTimer = setTimeout(() => setPhase("fading"), 1500);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (phase === "fading") {
      const fadeTimer = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, 800);
      return () => clearTimeout(fadeTimer);
    }
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-brand-dark flex items-center justify-center transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <Image
        src="/logos/KEYFLOW-04.svg"
        alt=""
        width={200}
        height={67}
        className={`transition-transform duration-1000 ${
          phase === "fading" ? "scale-150" : "scale-100"
        }`}
      />
    </div>
  );
}
```

- [ ] **Step 5: Integrate preloader into root layout**

The preloader renders as an overlay on top of everything. In `layout.tsx`, conditionally render `<Preloader>` (WebGL) or `<PreloaderFallback>` (non-WebGL/mobile/reduced-motion). Once `onComplete` fires, unmount the preloader overlay and reveal the page content + particle field.

- [ ] **Step 6: Verify full preloader flow**

Run: `npm run dev`
Verify: cables visible → snap as page loads → logo drops/hovers → rotates and zooms → hero revealed. Test skip (click after 2s). Test timeout (throttle network to slow 3G). Test CSS fallback (disable WebGL in devtools or resize to mobile). Fire `trackPreloaderSkip()` analytics event when skip is used (analytics helper from Task 22, wire later).

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add preloader with cable-snap, logo portal, and fly-through transition"
```

---

### Task 10: Page Transition System

**Files:**
- Create: `src/components/layout/page-transition.tsx`

- [ ] **Step 1: Create page transition wrapper**

Create `src/components/layout/page-transition.tsx`:

```typescript
"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { registerGSAP, gsap } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TRANSITION_DURATION = 0.8; // ~800ms per spec

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathname = useRef(pathname);

  const animateTransition = useCallback(async () => {
    if (!containerRef.current || reducedMotion) {
      setDisplayChildren(children);
      return;
    }

    registerGSAP();
    setIsTransitioning(true);

    // Try View Transition API first
    if ("startViewTransition" in document) {
      const transition = (document as any).startViewTransition(() => {
        setDisplayChildren(children);
      });
      await transition.finished;
    } else {
      // GSAP fallback: fade out → swap → fade in
      await gsap.to(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: TRANSITION_DURATION / 2,
        ease: "power2.in",
      });

      setDisplayChildren(children);

      await gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: TRANSITION_DURATION / 2, ease: "power2.out" },
      );
    }

    setIsTransitioning(false);

    // Move focus to main content after transition (a11y)
    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
  }, [children, reducedMotion]);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      animateTransition();
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children, animateTransition]);

  if (reducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <div ref={containerRef} aria-busy={isTransitioning}>
      {displayChildren}
    </div>
  );
}
```

Note: The `<Canvas>` for the particle field lives OUTSIDE this wrapper (in layout.tsx), so it never unmounts during transitions. Only the page content inside `<PageTransition>` animates. Mobile uses GSAP fade/slide (same code path — the View Transition API handles the cross-fade automatically on supported browsers).

- [ ] **Step 2: Wire into root layout**

Wrap `{children}` in layout.tsx with `<PageTransition>`:

```typescript
<main id="main-content" tabIndex={-1}>
  <PageTransition>{children}</PageTransition>
</main>
```

Add `tabIndex={-1}` to `<main>` so it can receive focus programmatically after transitions.

- [ ] **Step 3: Verify transitions between pages**

Navigate between Home ↔ Solutions ↔ About ↔ Contact. Verify:
- Smooth ~800ms animation (no hard cuts)
- No layout shift during transition
- Focus moves to `#main-content` after transition completes
- Particle field canvas persists (never flashes or remounts)
- Reduced motion: instant swap, no animation
- Mobile: simple fade works without WebGL

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add GSAP page transitions with startViewTransition fallback"
```

---

## Chunk 3: Homepage Sections

All homepage sections assembled in scroll order. After this chunk, the homepage is complete.

### Task 11: Hero Section

**Files:**
- Create: `src/components/home/hero-section.tsx`

- [ ] **Step 1: Create hero section**

Full-viewport section with:
- "KEYFLOW" in `font-display text-7xl desktop:text-[12rem] font-bold` over the particle field
- Subtitle: *"The Future of Real Estate, Flowing."* in `font-accent italic text-lg desktop:text-2xl` (Editorial New Italic)
- CTA button: "Get Early Access" — subtle, not screaming
- GSAP entrance animation (staggered text reveal from bottom)
- Cursor parallax: mouse movement events are already forwarded to the particle field via the window listener (Task 8) — particles will react automatically
- Reduced motion: instant display, no animation

- [ ] **Step 2: Wire into homepage**

Update `src/app/page.tsx` with HeroSection.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add homepage hero section with GSAP text animation"
```

---

### Task 12: Vision Statement Section

**Files:**
- Create: `src/components/home/vision-section.tsx`

- [ ] **Step 1: Create vision section**

Dark (#1b1b1b) full-viewport section. Copy: *"We're building the operating system for Dubai's real estate ecosystem."*

Typography treatment: `font-display font-bold` (General Sans Bold) for main text, emphasis words use `font-accent italic text-brand-accent` (Editorial New Italic + gold #C9A96E) — two fonts in one sentence for typographic contrast. Reference: landonorris.com dark section where accent words use a distinct style against the main bold text.

GSAP scroll-triggered word-by-word reveal. Set particle field `colorMode="dark"` for this section so particles render as `#fafafa` against the dark background.

- [ ] **Step 2: Add to homepage**

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add vision statement section with accent typography"
```

---

### Task 13: Product Reveal Section

**Files:**
- Create: `src/components/home/product-reveal.tsx`

- [ ] **Step 1: Create scroll-pinned section scaffold**

Set up `src/components/home/product-reveal.tsx` with four scroll-pinned sections using GSAP `ScrollTrigger.create({ pin: true })`. Each section takes near-full viewport. Import product data from `src/content/products.ts`.

- [ ] **Step 2: Wire particle formation switching**

As scroll progresses through each pinned section, update the particle field's `formation` prop based on the current product's `particleConfig.formation` value. Use ScrollTrigger `onEnter`/`onLeave` callbacks to set the active formation. The `transition` prop (0→1) should smoothly blend from ambient to the target formation.

**Fallback:** If particle morphing proves too complex during implementation, all four products share the same ambient formation with `density` variation from `particleConfig` — this is the spec-approved minimum viable version.

- [ ] **Step 3: Animate product name and description**

Product name in `font-display text-6xl desktop:text-[8rem] font-bold`. Style the shared "-flow" suffix consistently across all four product names (same weight/style) as a visual thread connecting them. One-line tagline fades in below with GSAP stagger.

- [ ] **Step 4: Add to homepage and verify**

Wire into `page.tsx`. Run `npm run dev`. Verify: scroll pins work, product names animate, particle formations switch between products (or fallback density works).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add scroll-driven product reveal with particle choreography"
```

---

### Task 14: Ecosystem Diagram

**Files:**
- Create: `src/components/home/ecosystem-diagram.tsx`

- [ ] **Step 1: Create SVG ecosystem diagram**

Inline SVG with nodes for each product + DLD + stakeholder types. GSAP ScrollTrigger draws connection lines progressively on scroll. Hover highlights connected nodes. Clean, minimal aesthetic.

- [ ] **Step 2: Add to homepage**

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add GSAP-animated SVG ecosystem diagram"
```

---

### Task 15: Credibility Strip & Homepage CTA

**Files:**
- Create: `src/components/home/credibility-strip.tsx`, `src/components/home/cta-section.tsx`

- [ ] **Step 1: Create credibility strip**

Horizontal section with partner/institution logos (PropTech Hub, DIFC, DLD). Include the text *"Powered by authenticated DLD data"* below/adjacent to the DLD logo.

Display Mohamed Shaat and Abdullah Abdulqader with photos, names, and the title **"Strategic Advisor"** — this exact title is required for consistency with the About page (spec Section 10). Clean, horizontal layout. GSAP fade-in on scroll.

- [ ] **Step 2: Create homepage CTA wrapper**

Uses `<EarlyAccessCTA headline="Join the future of Dubai real estate" />`. Configure the particle field to use `formation="ambient"` with reduced density for a "settling" effect — particles calming as the journey concludes (spec 5.7).

- [ ] **Step 3: Add both to homepage**

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add credibility strip and homepage CTA section"
```

---

### Task 16: Assemble Complete Homepage

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Assemble all sections in scroll order**

```typescript
import { pageMetadata } from "@/content/metadata";
import { HeroSection } from "@/components/home/hero-section";
import { VisionSection } from "@/components/home/vision-section";
import { ProductReveal } from "@/components/home/product-reveal";
import { EcosystemDiagram } from "@/components/home/ecosystem-diagram";
import { CredibilityStrip } from "@/components/home/credibility-strip";
import { CTASection } from "@/components/home/cta-section";

export const metadata = pageMetadata.home;

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VisionSection />
      <ProductReveal />
      <EcosystemDiagram />
      <CredibilityStrip />
      <CTASection />
    </>
  );
}
```

- [ ] **Step 2: Full scroll test**

Verify: smooth scroll through all sections, particle field transitions, GSAP triggers fire correctly, reduced motion works, mobile layout works.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: assemble complete homepage scroll journey"
```

---

## Chunk 4: Inner Pages

Solutions, About, and Contact pages. These are independent of each other and can be built in parallel.

### Task 17: Solutions Page

**Files:**
- Create: `src/components/solutions/stakeholder-nav.tsx`, `src/components/solutions/product-deep-dive.tsx`, `src/components/solutions/dld-highlight.tsx`
- Create: `src/app/solutions/page.tsx`

- [ ] **Step 1: Create Solutions hero section**

Full-viewport hero: *"One Suite. Every Stakeholder."* in display type, subtitle *"Four products. One ecosystem. Built for how Dubai real estate actually works."* Particle field present but calmer — ambient formation, lower density.

- [ ] **Step 2: Create stakeholder navigation tabs**

Horizontal tab navigation: Agents, Agencies, Developers, Owners, Tenants. Selecting one reframes product descriptions below for that audience's pain points. Smooth morph transitions between views (Framer Motion `AnimatePresence`).

- [ ] **Step 3: Create product deep dive component (reused x4)**

Each product section includes: large product name in display type, Spline 3D scene (lazy-loaded via `React.lazy` + `Suspense` — not at page load), 3-4 key capabilities as short lines with staggered GSAP reveal, "Coming Soon" styled as design element. On mobile, Spline scenes are replaced with pre-rendered PNG/WebP stills from `public/spline/`.

- [ ] **Step 4: Create DLD integration highlight section**

Dedicated moment: *"Built on authenticated data from the Dubai Land Department."* GSAP animation: data flowing from DLD node into Keyflow ecosystem.

- [ ] **Step 5: Add EarlyAccessCTA and assemble Solutions page**

Assemble all sections in scroll order. Add `<EarlyAccessCTA headline="See yourself in the flow" />` at the bottom (spec Section 6.6).

- [ ] **Step 6: Verify stakeholder filtering, scroll animations, Spline lazy loading**

Verify Spline scenes load lazily (not at page load). On mobile viewport, verify Spline scenes are replaced by pre-rendered stills from `public/spline/`.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add Solutions page with stakeholder nav and product deep dives"
```

---

### Task 18: About Page

**Files:**
- Create: `src/components/about/mission-section.tsx`, `src/components/about/team-scatter.tsx`, `src/components/about/proptech-hub.tsx`
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Create mission section (typography-driven)**

2-3 paragraphs about why Keyflow exists. Typography-driven — no competing imagery, beautifully set type with generous spacing.

- [ ] **Step 2: Create team scatter layout (asymmetric, not grid)**

Reference: landonorris.com photo gallery — images scattered at varying sizes across the scroll with name/title captions, NOT aligned to a grid. Use the `size` field from `src/content/team.ts` to drive photo dimensions (`large`/`medium`/`small`). Each person: photo, name, title, one-line personal note. Use "Strategic Advisor" as the title for Mohamed Shaat and Abdullah Abdulqader (must match credibility strip).

- [ ] **Step 3: Create PropTech Hub section with DIFC/DLD logos**

Note: Spec Section 7.5 defines an optional timeline/roadmap section — omit in initial implementation. Add later only if milestones feel substantial at content review stage.
- [ ] **Step 4: Assemble About page**
- [ ] **Step 5: Verify layout across breakpoints**
- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add About page with mission, team scatter, and PropTech Hub"
```

---

### Task 19: Contact Page

**Files:**
- Create: `src/components/contact/waitlist-form.tsx`, `src/components/contact/contact-info.tsx`
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Create waitlist form with validation**

Full form: stakeholder type (select), name, email, company, message (optional). Client-side validation. Submits to `/api/waitlist`. Morphs to success state.

- [ ] **Step 2: Create contact info section**

Email, DIFC address, social links, stylized Dubai location indicator.

- [ ] **Step 3: Assemble Contact page (split layout)**
- [ ] **Step 4: Verify form submission, validation errors, success state**

The stub `/api/waitlist` route (created in Task 5) returns `{ success: true }` in dev mode, so form submission will work. Full Lambda integration comes in Task 20.

Configure the particle field for a "settling" formation: low energy, minimal movement — the journey that began with explosive energy ends in calm resolution (spec 8.4).

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add Contact page with waitlist form and contact info"
```

---

## Chunk 5: AWS Backend

API Gateway + Lambda + DynamoDB + SES for the waitlist form. Plus a Next.js API route that proxies to the Lambda (or handles directly during development).

### Task 20: AWS Infrastructure (SAM Template)

**Files:**
- Create: `infrastructure/template.yaml`

- [ ] **Step 1: Create SAM template**

Create `infrastructure/template.yaml` with these resources:

**DynamoDB Table:**
- Table name: `keyflow-waitlist`
- Partition key: `email` (String)
- Sort key: `created_at` (String, ISO-8601 format)
- Attributes stored: `id` (UUID), `stakeholder_type`, `name`, `email`, `company`, `message`, `created_at`
- Billing: On-demand (PAY_PER_REQUEST)

**Lambda Function:**
- Runtime: Node.js 20.x
- Handler: `index.handler`
- Metadata: `BuildMethod: esbuild` with `EntryPoints: ["index.ts"]`
- IAM Policy (least privilege):
  - `dynamodb:PutItem` on `keyflow-waitlist` table ARN
  - `dynamodb:Query` on `keyflow-waitlist` table ARN (for rate limiting)
  - `ses:SendEmail` scoped to verified identity ARN

**API Gateway:**
- Type: HTTP API (`AWS::Serverless::HttpApi`)
- CORS configuration:
  ```yaml
  CorsConfiguration:
    AllowOrigins:
      - "https://keyflowae.com"
      - "http://localhost:3000"
    AllowMethods:
      - POST
      - OPTIONS
    AllowHeaders:
      - Content-Type
  ```
- Route: `POST /waitlist` → Lambda

**SES:**
- Note: SES requires domain verification before sending. In sandbox mode, only verified addresses can receive mail. For production:
  1. Verify `keyflowae.com` domain identity via DKIM/CNAME records in Route 53
  2. Request SES production access (exits sandbox)
  3. Until production access is granted, test with verified email addresses only

- [ ] **Step 2: Create Lambda handler**

Create `infrastructure/lambda/waitlist/index.ts`:

```typescript
import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { randomUUID } from "crypto";

const dynamo = new DynamoDBClient({});
const ses = new SESClient({});

const TABLE_NAME = process.env.TABLE_NAME!;
const FROM_EMAIL = process.env.FROM_EMAIL!;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL!; // a.alshaqra@keyflowae.com

const STAKEHOLDER_TYPES = ["agent", "agency", "developer", "owner", "tenant", "other"] as const;

interface WaitlistBody {
  email: string;
  stakeholder_type?: string;
  name?: string;
  company?: string;
  message?: string;
}

export async function handler(event: any) {
  try {
    const body: WaitlistBody = JSON.parse(event.body ?? "{}");

    // Validate: email is required
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Valid email is required" }) };
    }

    // Validate: stakeholder_type is optional but must be valid if provided
    if (body.stakeholder_type && !STAKEHOLDER_TYPES.includes(body.stakeholder_type as any)) {
      return { statusCode: 400, body: JSON.stringify({ error: "Invalid stakeholder type" }) };
    }

    // Rate limit: max 3 submissions per email per day
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const countResult = await dynamo.send(new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "email = :email AND begins_with(created_at, :today)",
      ExpressionAttributeValues: {
        ":email": { S: body.email },
        ":today": { S: today },
      },
      Select: "COUNT",
    }));

    if ((countResult.Count ?? 0) >= 3) {
      return { statusCode: 429, body: JSON.stringify({ error: "Too many submissions today" }) };
    }

    // Store in DynamoDB
    const now = new Date().toISOString();
    await dynamo.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        email: { S: body.email },
        created_at: { S: now },
        id: { S: randomUUID() },
        ...(body.stakeholder_type && { stakeholder_type: { S: body.stakeholder_type } }),
        ...(body.name && { name: { S: body.name } }),
        ...(body.company && { company: { S: body.company } }),
        ...(body.message && { message: { S: body.message } }),
      },
    }));

    // Send confirmation email to user
    await ses.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [body.email] },
      Message: {
        Subject: { Data: "Welcome to Keyflow — You're In" },
        Body: { Text: { Data: "Thank you for joining the Keyflow early access list. We'll be in touch soon." } },
      },
    }));

    // Send notification to team
    await ses.send(new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: { ToAddresses: [NOTIFY_EMAIL] },
      Message: {
        Subject: { Data: `New Waitlist Signup: ${body.email}` },
        Body: { Text: { Data: `Email: ${body.email}\nType: ${body.stakeholder_type ?? "N/A"}\nName: ${body.name ?? "N/A"}\nCompany: ${body.company ?? "N/A"}\nMessage: ${body.message ?? "N/A"}` } },
      },
    }));

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (error) {
    console.error("Waitlist error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) };
  }
}
```

Create `infrastructure/lambda/waitlist/package.json`:

```json
{
  "name": "keyflow-waitlist-lambda",
  "type": "module",
  "dependencies": {
    "@aws-sdk/client-dynamodb": "^3.500.0",
    "@aws-sdk/client-ses": "^3.500.0"
  }
}
```

- [ ] **Step 3: Update Next.js API route for production**

Update `src/app/api/waitlist/route.ts` (created as stub in Task 5) — the production path already proxies to `WAITLIST_API_URL` when set. No changes needed if the stub was implemented correctly. Verify the proxy passes the full request body (including optional fields from the Contact page form).

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add AWS SAM template and Lambda handler for waitlist API"
```

---

## Chunk 6: SEO, Analytics & Accessibility Polish

Final polish layer. Structured data, PostHog integration, sitemap, and a11y audit.

### Task 21: SEO & Structured Data

**Files:**
- Create: `src/lib/seo.ts` (update), `next-sitemap.config.js`
- Modify: each page's metadata export

- [ ] **Step 1: Create `src/lib/seo.ts` with JSON-LD builders**

```typescript
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Keyflow",
    url: "https://keyflowae.com",
    logo: "https://keyflowae.com/logos/KEYFLOW-01.svg",
    description: "AI-powered real estate software suite for Dubai stakeholders",
    sameAs: [
      "https://linkedin.com/company/keyflow",
      "https://instagram.com/keyflowae",
      "https://x.com/keyflowae",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Keyflow",
    url: "https://keyflowae.com",
  };
}

export function softwareSchema(product: { name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", availability: "https://schema.org/PreOrder" },
  };
}
```

Add Organization JSON-LD to root `layout.tsx` via a `<script type="application/ld+json">` tag. Add WebSite schema on homepage. Add SoftwareApplication schema for each product on Solutions page.

- [ ] **Step 2: Configure next-sitemap**

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://keyflowae.com",
  generateRobotsTxt: true,
  changefreq: "weekly",
};
```

Add the postbuild script to `package.json`:
```json
"scripts": {
  "postbuild": "next-sitemap"
}
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add JSON-LD structured data and sitemap config"
```

---

### Task 22: PostHog Analytics

**Files:**
- Create: `src/lib/analytics.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create PostHog wrapper**

Create `src/lib/analytics.ts`:

```typescript
"use client";
import posthog from "posthog-js";

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return;

  posthog.init(key, {
    api_host: host,
    persistence: "memory",        // Cookieless — no cookies or localStorage
    autocapture: false,            // Manual events only
    capture_pageview: false,       // We track manually with scroll depth
  });
  initialized = true;
}

export function trackPageView(path: string) {
  posthog.capture("page_view", { path });
}

export function trackScrollDepth(path: string, depth: 25 | 50 | 75 | 100) {
  posthog.capture("scroll_depth", { path, depth });
}

export function trackCTAClick(location: string) {
  posthog.capture("cta_click", { location });
}

export function trackFormSubmit(stakeholderType?: string) {
  posthog.capture("form_submit", { stakeholder_type: stakeholderType });
}

export function trackFormError(errorType: string) {
  posthog.capture("form_error", { error_type: errorType });
}

export function trackPreloaderSkip() {
  posthog.capture("preloader_skip");
}

export function track3DInteraction(scene: string, action: string) {
  posthog.capture("3d_interaction", { scene, action });
}
```

**Prerequisite:** PostHog self-hosted instance must be running at `analytics.keyflowae.com` before deploying. Infrastructure provisioning (ECS Fargate + RDS) is out of scope for this plan.

- [ ] **Step 2: Add PostHog provider to layout**

- [ ] **Step 3: Add scroll depth tracking to each page**

Use ScrollTrigger to fire `trackScrollDepth(path, depth)` at 25%, 50%, 75%, and 100% scroll progress on each page. Create four trigger points per page (or use `onUpdate` with threshold checks).

- [ ] **Step 4: Add event tracking to CTA buttons, form, and preloader**

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add PostHog analytics with conversion tracking events"
```

---

### Task 23: Accessibility Audit & Polish

**Files:**
- Modify: multiple component files

- [ ] **Step 1: Add `prefers-reduced-motion` guards to all animated components**

Ensure: particle field hidden, GSAP animations disabled, page transitions instant, Spline auto-rotation stopped.

- [ ] **Step 2: Verify keyboard navigation flow**

Tab through all pages. Verify: focus rings visible (gold), skip-to-content works, all interactive elements reachable, form fields have labels.

- [ ] **Step 3: Add aria attributes**

- Canvas: `aria-hidden="true"`
- 3D sections: adjacent text descriptions
- Dynamic CTA state changes: `aria-live="polite"`
- Semantic HTML: verify `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>` usage

- [ ] **Step 4: Run Lighthouse audit**

```bash
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse.json
```

Target: Performance > 60, Accessibility > 90, Best Practices > 90, SEO > 95.

- [ ] **Step 5: Fix any issues found**

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: a11y polish — reduced motion, keyboard nav, aria, semantic HTML"
```

---

### Task 24: Final Integration & Deploy Config

**Files:**
- Create: `amplify.yml`, `.env.example`
- Modify: `next.config.ts`

- [ ] **Step 1: Create Amplify build config and configure Next.js for SSR**

Update `next.config.ts` — add `output: "standalone"` for Amplify SSR deployment:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.(vert|frag|glsl)$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
```

Create `amplify.yml`:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

**Important:** The Amplify app must be configured with `platform: WEB_COMPUTE` (framework: Next.js SSR) in the AWS console or CDK — not just via `amplify.yml`. This enables server-side rendering, API routes, and dynamic features.

**DNS/CDN:** Amplify Gen 2 automatically provisions CloudFront for hosting. Point `keyflowae.com` to the Amplify app via a CNAME/A record in Route 53. Static assets (fonts, OG images) are served through CloudFront automatically.

- [ ] **Step 2: Create .env.example**

```
WAITLIST_API_URL=https://xxx.execute-api.me-south-1.amazonaws.com/waitlist
NEXT_PUBLIC_POSTHOG_KEY=phc_xxx
NEXT_PUBLIC_POSTHOG_HOST=https://analytics.keyflowae.com
```

- [ ] **Step 3: Final build verification**

```bash
npm run build && npm run start
```

Verify: all pages render, no build errors, preloader works, form submits, analytics fires.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "chore: add Amplify deploy config and env template"
```

---

## Task Dependency Summary

```
Task 1 (Scaffold) → Task 2 (Tokens) → Task 3 (Hooks)
                                     → Task 4 (Nav)
                                     → Task 5 (Footer/CTA/Stub API)
                                     → Task 6 (Content)

Task 3 + 2 → Task 7 (Canvas) → Task 8 (Particles) → Task 9 (Preloader) → Task 10 (Transitions)

Task 5 + 8 → Task 11-15 (Homepage sections) → Task 16 (Assemble homepage)

Task 5 + 6 + 8 → Task 17 (Solutions)  ─┐
Task 6         → Task 18 (About)       ─┼─ 18 and 19 can run in parallel; 17 needs Task 8
Task 5         → Task 19 (Contact)     ─┘

Task 19 → Task 20 (AWS Backend)

Task 16-19 → Task 21 (SEO) → Task 22 (Analytics) → Task 23 (A11y) → Task 24 (Deploy)
```

Tasks 18 and 19 (About + Contact) are independent and can be executed in parallel via subagents. Task 17 (Solutions) has an additional dependency on Task 8 (particle system) for the Spline scenes and particle field configuration.
