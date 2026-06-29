# Awwwards Agent — Design Specification

**Goal:** Build a Claude Code plugin that can one-shot generate Awwwards Site of the Day-level websites (8.0+ score) from a single user prompt.

**Core Innovation:** Temporal-first design representation — scroll-timeline storyboards instead of static layouts — combined with a parametric interaction library and automated temporal evaluation.

**Platform Strategy:** Built as a Claude Code plugin (skills + agents + MCP servers + npm packages). Portable to Perplexity Computer via SKILLS.MD import and MCP connectors.

---

## 1. System Architecture

Four subsystems, each independently buildable and testable:

```
┌─────────────────────────────────────────────────────────────┐
│                     Agent Pipeline                          │
│  Concept → Storyboard → Composition → Code → Eval → Refine │
└──────────────────────────┬──────────────────────────────────┘
                           │ reads/writes
                           ▼
                    ┌──────────────┐
                    │   Manifest   │  (JSON)
                    └──────┬───────┘
                           │ consumed by
              ┌────────────┼────────────┐
              ▼            ▼            ▼
     ┌────────────┐ ┌───────────┐ ┌──────────────┐
     │    Code    │ │ Primitive │ │  Evaluation   │
     │ Generator  │ │  Library  │ │   Harness     │
     └────────────┘ └───────────┘ └──────────────┘
```

### Build Order

1. **Parametric Interaction Library** — foundation, no dependencies
2. **Manifest Schema + Code Generator** — depends on #1
3. **Temporal Evaluation Harness** — depends on #2 (needs built sites to evaluate)
4. **Agent Pipeline** — depends on all three

---

## 2. Parametric Interaction Library

### 2.1 Primitive Interface

Every primitive follows a single contract:

```typescript
type Cleanup = () => void;

interface PrimitiveModule<TConfig> {
  init(el: HTMLElement, config: TConfig, bus: EventBus): Cleanup;
}
```

- `el` — the DOM element with the `data-primitive` attribute
- `config` — parsed from `data-*` attributes or inline JSON
- `bus` — shared EventBus for inter-primitive communication
- Returns a cleanup function for teardown

### 2.2 EventBus

Shared communication channel between primitives:

```typescript
interface EventBus {
  emit(event: string, payload?: unknown): void;
  on(event: string, handler: (payload?: unknown) => void): () => void;
}
```

Standard events:
- `preloader:complete` — triggers entrance animations (emitted by `preloader`)
- `preloader:progress` — loading progress 0-1 (emitted by `preloader`)
- `scroll:velocity` — current scroll speed for velocity-reactive effects (emitted by Lenis wrapper)
- `section:enter` / `section:leave` — intersection-based section tracking (emitted by main.ts)
- `hero:exited` — hero scroll-away animation complete (emitted by `scroll-away`)
- `reveal:complete` — a reveal animation finished (emitted by `hold-reveal`, `scroll-scale`)
- `counter:done` — counter finished animating (emitted by `counter`)

### 2.3 Data-Attribute Architecture

HTML declares animation intent, primitives wire themselves. This evolves the void-watch pattern (which used `data-anim` and `data-split-text` as separate conventions) into a unified `data-primitive` registry:

```html
<h1 data-primitive="char-reveal"
    data-stagger="0.02"
    data-trigger="preloader:complete">
  ABSENCE
</h1>

<section data-primitive="scroll-away"
         data-rotate-x="-2"
         data-scale="0.92"
         data-opacity="0.3">
  ...
</section>
```

Runtime discovery in `main.ts`:

```typescript
document.querySelectorAll('[data-primitive]').forEach(el => {
  const type = el.dataset.primitive;
  const mod = primitiveRegistry[type];
  const config = parseDataAttributes(el);
  const cleanup = mod.init(el, config, bus);
  cleanups.push(cleanup);
});
```

### 2.6 Responsive / Mobile Strategy

Every primitive handles its own responsive behavior via `gsap.matchMedia()`:

```typescript
// Inside each primitive's init():
const mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
  // Desktop: full animation
  return () => { /* cleanup */ };
});
mm.add("(max-width: 767px)", () => {
  // Mobile: simplified or disabled
  return () => { /* cleanup */ };
});
```

Per-primitive mobile rules:
| Primitive | Mobile behavior |
|-----------|----------------|
| `cursor` | Disabled entirely (touch devices) |
| `tilt` | Disabled (no hover on touch) |
| `parallax` | Mouse-follow disabled, scroll-parallax reduced by 50% |
| `scroll-away` | Simplified: y-translate + opacity only (no rotation) |
| `scroll-scale` | Pin disabled, plays as scroll-triggered entrance instead |
| `hold-reveal` | Touch-and-hold with pulsing ring hint animation |
| `char-reveal` | Stagger increased 2x for readability |
| `scrub-sequence` | Snap enabled by default for touch scrolling |

The code generator emits mobile-specific CSS in `global.css`:
- `@media (max-width: 768px)` breakpoints for layout templates
- `@media (pointer: coarse)` for touch-specific styles
- `@media (prefers-reduced-motion: reduce)` disables all animation

### 2.4 The 12 Primitives

Organized by function:

**Entrance & Reveal:**
| Primitive | What it does | Key config params |
|-----------|-------------|-------------------|
| `char-reveal` | SplitType + GSAP char stagger with clip-path masks | stagger, duration, ease, trigger, direction |
| `fade-up` | Element entrance from below with opacity | y, duration, delay, threshold |
| `preloader` | Counter + ring draw + curtain exit + scroll lock | duration, counter-end, ring-draw, exit-style |

**Scroll-Driven:**
| Primitive | What it does | Key config params |
|-----------|-------------|-------------------|
| `scroll-away` | Hero exit choreography (rotate + scale + translate) | rotateX, rotateY, scale, opacity, y-percent |
| `scroll-scale` | Element scales from small to full on scroll (portal effect) | start-scale, end-scale, pin, pin-spacing |
| `scrub-sequence` | Multi-step scroll-driven animation timeline | steps (array of Keyframe), scrub, snap |

`scrub-sequence` Keyframe schema:
```typescript
interface Keyframe {
  at: number;        // 0-1 normalized scroll position within trigger range
  props: {           // Any GSAP-animatable CSS properties
    [key: string]: string | number;  // e.g. opacity: 0, x: "100%", scale: 1.2
  };
  ease?: string;     // Ease for this segment (defaults to signature easing)
}
// Example: [{ at: 0, props: { opacity: 0, y: 40 } }, { at: 0.5, props: { opacity: 1, y: 0 } }, { at: 1, props: { scale: 0.9 } }]
```
| `parallax` | Multi-layer depth on scroll or mouse | factor, direction, mouse-enabled, range |

**Interaction:**
| Primitive | What it does | Key config params |
|-----------|-------------|-------------------|
| `cursor` | Custom cursor with lerp, blend mode, hover scaling | size, blend, lerp, hover-scale, hide-touch |
| `tilt` | 3D card tilt on hover (perspective + rotateX/Y) | max-rotation, perspective, scale, glare |
| `hold-reveal` | Press-and-hold with SVG radial progress ring | duration, ring-size, reveal-target |

**Data & Drawing:**
| Primitive | What it does | Key config params |
|-----------|-------------|-------------------|
| `counter` | Animated number count-up on scroll enter | end-value, suffix, duration, ease |
| `path-draw` | SVG stroke-dashoffset animation on scroll or enter | trigger, duration, delay, direction |

### 2.5 Deep Parameterization Philosophy

Creativity comes from configuration space, not primitive count. Each primitive has 8-15 configurable parameters. For example, `char-reveal` alone produces vastly different feels:

- `stagger: 0.01, direction: "random"` — chaotic typewriter
- `stagger: 0.04, direction: "center-out"` — elegant cinematic
- `stagger: 0.02, direction: "left", clip: true` — clean editorial

---

## 3. The 6-Layer Model

Every generated site is described across six layers:

| Layer | What it defines | Example |
|-------|----------------|---------|
| **Concept** | Brand personality, mood, references | "Scandinavian minimal, dark, precision" |
| **Storyboard** | Scroll timeline, section sequence, pacing | "0-100vh hero scroll-away, 100-300vh portal..." |
| **Design Tokens** | Colors, fonts, easing, spacing | `bg: #0A0A0C, accent: #7BA7C2, ease: cubic-bezier(...)` |
| **Content** | Text, headings, spec data, descriptions | Headlines, body copy, numeric specs |
| **Layout** | Spatial arrangement per section | split-asymmetric, bento-grid, full-bleed |
| **Primitives** | Motion and interaction per section | char-reveal on headline, scroll-away on hero |

### 3.1 Content Layer — Asset Strategy

Assets use a pluggable strategy per slot:

| Type | What it does | When to use |
|------|-------------|-------------|
| `css` | Abstract visuals via CSS (gradients, borders, shapes) | Default. No external dependencies. Always works. |
| `generated` | AI-generated via MCP (image gen, 3D model) | When the concept demands rich visuals |
| `provided` | User-supplied files (photos, videos, 3D) | When user has their own assets |

```yaml
assets:
  - slot: "hero-media"
    type: "css"
    gradient: "radial-gradient(ellipse 60% 60% at 30% 40%, rgba(123,167,194,0.15), transparent)"

  - slot: "product-shot"
    type: "generated"
    prompt: "Titanium watch on dark slate, studio lighting, top-down"
    provider: "dall-e"

  - slot: "brand-video"
    type: "provided"
    path: "assets/hero-loop.mp4"
```

---

## 4. Manifest Schema

The manifest is the central artifact. Every agent reads/writes to it. The code generator consumes it.

### 4.1 Structure

```yaml
meta:
  name: string              # Project name
  style: string             # Style descriptor for concept reference
  version: string           # Schema version

tokens:
  colors:
    bg: string              # Background (never pure #000)
    text: string            # Primary text (never pure #FFF)
    accent: string          # Accent color
    muted: string           # Secondary text
    surface: string         # Card/panel backgrounds
    border: string          # Borders
  fonts:
    display: { family, weight, src? }
    body: { family, weight, src? }
    mono: { family, weight, src? }
  easing: string            # Signature cubic-bezier
  spacing:
    section-gap: string     # clamp() value, min 160px
    content-padding: string # clamp() value

sections:
  - type: string            # Section type identifier
    layout: string          # Layout template name
    content:                # Text, data, labels
      headline?: { text, anim?, stagger?, delay? }
      subline?: { text, anim?, delay? }
      body?: string
      items?: array
    primitives:             # Motion/interaction per section
      - { type, ...config }
    assets:                 # Visual assets per section
      - { slot, type, ...config }

global:
  primitives:               # Site-wide primitives
    - { type: "cursor", ... }
    - { type: "preloader", ... }
  preloader:
    enabled: boolean
    duration: number
```

### 4.2 Global vs Section Primitive Precedence

Primitives in `global.primitives` apply site-wide and are initialized once on `<body>` or a root container. Section-level primitives apply only to their section's elements.

Rules:
- **No overlap by type**: `cursor` and `preloader` are always global (they operate on the page, not a section). Scroll-driven and entrance primitives are always per-section.
- **If a section explicitly declares a primitive type that is also global**: the section-level config wins for elements within that section. The global instance skips those elements.
- **Global primitives are initialized first**, before any section primitives, because `preloader` must emit `preloader:complete` before entrance primitives can trigger.

### 4.3 Font Resolution

Fonts are resolved in this priority order:
1. **`src` field provided** — direct URL to a WOFF2 file. Downloaded and copied to `public/fonts/`.
2. **`src` not provided, `family` matches a bundled font** — the plugin ships with 5-6 curated display fonts (e.g., Editorial New, Neue Haas Grotesk) as WOFF2 in `packages/primitives/fonts/`.
3. **`src` not provided, no bundled match** — the code generator searches Google Fonts API for the family name, downloads the WOFF2, and self-hosts it. The generated site never links to Google Fonts CDN.

### 4.4 Asset Generation

Assets with `type: "generated"` are handled by **external MCP tools**, not by the plugin itself. The Composition Agent includes the generation prompt and provider in the manifest. The Code Agent calls the appropriate external MCP tool (e.g., an image generation MCP server the user has configured) and writes the result to `public/assets/`. If no generation MCP is available, the Code Agent falls back to `type: "css"` and logs a warning.

### 4.5 Validation

JSON Schema validates the manifest before code generation:
- Required fields enforced (meta, tokens, at least one section)
- Color values checked against pure B/W kill list
- Section gaps validated against 160px minimum
- Easing value must be a custom cubic-bezier (no `ease-out`, `ease-in-out`)
- Font `src` URLs must not point to Google Fonts CDN
- Each section must reference a known layout template name
- Primitive types must exist in the primitive registry

---

## 5. Code Generator

### 5.1 Layout Templates

Layout templates define the HTML structure of a section. They are Handlebars templates that receive section content, assets, and primitive configs as context.

| Template | Structure | Use case | Mobile behavior |
|----------|-----------|----------|-----------------|
| `split-asymmetric` | 60/40 two-column. Left: primary content. Right: media slot. | Product-focused hero, feature sections | Stacks vertically, media on top |
| `full-bleed-type` | Single centered column, headline spans viewport width | Bold brand statements, typography-driven sections | Headline scales down via clamp() |
| `bento-grid` | CSS Grid with named areas: hero cell (2x2), medium cells (1x1), small cells (1x1) | Specifications, data-heavy sections | Collapses to 2-column, then 1-column |
| `scroll-narrative` | Full-width sections stacked vertically with large scroll runway (200vh+) | Story-driven reveals, video portals | Scroll runway reduced, pin disabled |
| `card-carousel` | Flex row with overflow, card sizing via CSS calc | Collection displays, portfolio items | Single card per view, swipe-enabled |
| `centered-stage` | Single centered element with background layer | CTAs, craftsmanship reveals, interactive moments | Padding increased, element scaled down |
| `footer-bar` | Flex row: mark / nav / tagline with space-between | Page footer | Wraps to column layout |

Each template is a function:
```typescript
interface LayoutTemplate {
  name: string;
  render(ctx: {
    content: SectionContent;    // Headline, body, items from manifest
    assets: ResolvedAsset[];    // Resolved asset slots
    primitives: string[];       // data-primitive attributes to wire
    tokens: DesignTokens;       // For inline token references
  }): string;                   // Returns Astro component source
  styles(): string;             // Returns scoped CSS for this layout
}
```

### 5.2 Pipeline

```
Manifest
  → Validate (JSON Schema + kill-list checks)
  → Resolve Tokens → CSS custom properties map
  → For each section:
      → Match layout template by manifest section.layout
      → Resolve assets (css: inline, provided: copy to public/, generated: skip placeholder)
      → Call template.render() with content + assets + primitive configs
      → Wire primitives: add data-primitive="..." attributes to target elements
      → Emit .astro component file
  → Tree-shake primitives: scan all emitted .astro files for data-primitive values,
    copy only referenced primitive .ts files to output
  → Download fonts: fetch from manifest font.src URLs, convert to WOFF2 via fonttools
  → Emit BaseLayout.astro with tokens as CSS vars
  → Emit global.css with reset, typography, responsive breakpoints, reduced-motion
  → Emit main.ts with Lenis, GSAP, primitive discovery loop
  → Emit package.json, astro.config.mjs, tsconfig.json
```

### 5.3 Output Structure

```
output/
  src/
    layouts/
      BaseLayout.astro          # HTML shell, design tokens as CSS vars
    components/
      Section0Hero.astro        # Named by index + type (generic, not site-specific)
      Section1Specs.astro
      Section2Collection.astro
      ...
    scripts/
      primitives/               # Tree-shaken: only used primitives
        char-reveal.ts
        scroll-away.ts
        cursor.ts
      event-bus.ts              # Shared EventBus
      main.ts                   # Lenis + GSAP + primitive discovery
    styles/
      global.css                # Reset, tokens, typography, kill-list compliance
  public/
    fonts/                      # Self-hosted WOFF2 files
    assets/                     # Copied provided assets
  astro.config.mjs
  package.json
  tsconfig.json
```

### 5.4 Design Principles

- **Output is indistinguishable from hand-crafted Astro** — no framework smell, no "generated by" markers
- **No runtime manifest parsing** — everything resolved at build time
- **Layout templates are composable functions**, not rigid page templates
- **Primitives are wired via data-attributes** — evolves the void-watch `data-anim` pattern into a unified `data-primitive` registry
- **`prefers-reduced-motion`** media query included in every generated site
- **Component naming is generic** — `Section0Hero.astro` not `VoidWatchHero.astro`

---

## 6. Temporal Evaluation Harness

### 6.1 Purpose

Automated quality measurement for motion-driven websites. A single screenshot cannot evaluate scroll-linked animation, hover interactions, or entrance choreography.

### 6.2 Temporal Capture Protocol

Using Playwright:

1. **Scroll snapshots** — screenshots at 0%, 10%, 25%, 40%, 55%, 70%, 85%, 100% scroll positions
2. **Hover probes** — find all `[data-cursor-hover]` elements, screenshot before and after hover
3. **Scroll velocity test** — screenshot during fast vs slow scroll (validates parallax/scrub)
4. **Preloader sequence** — screenshots at 0%, 50%, 100% of initial load
5. **Interaction probes** — trigger click-and-hold on `[data-primitive="hold-reveal"]`, capture progress

### 6.3 Scoring Dimensions

15 dimensions aligned with the Awwwards rubric:

| # | Dimension | Method | Auto? |
|---|-----------|--------|-------|
| 1 | Typography Scale | Measure computed font sizes | Hybrid |
| 2 | Easing Identity | Parse CSS for `--ease-signature`, flag `ease-out` | Yes |
| 3 | Scroll Architecture | Detect Lenis + scrub:true | Yes |
| 4 | Entrance Choreography | Detect preloader + measure stagger timing | Hybrid |
| 5 | Color Discipline | Extract CSS colors, count hues, flag pure B/W | Yes |
| 6 | Hover Completeness | Probe all interactive elements, diff before/after | Yes |
| 7 | Text Animation | Check for SplitType + char-level stagger | Yes |
| 8 | Spatial Rhythm | Measure section gaps in px | Yes |
| 9 | Font Loading | Check for WOFF2, flag Google Fonts CDN | Yes |
| 10 | Scroll-Away & Depth | Check hero exit transforms | Hybrid |
| 11 | Interactive Signature | Temporal snapshots → LLM "screenshot test" | LLM |
| 12 | Page Transitions | Detect clip-path or canvas transitions | Yes |
| 13 | Mobile Strategy | Compare desktop vs mobile screenshots | LLM |
| 14 | Performance | Lighthouse audit | Yes |
| 15 | CSS Architecture | Check for CSS vars, hidden scrollbar | Yes |

### 6.4 Output Format

```json
{
  "overall": 7.8,
  "dimensions": {
    "typography_scale": { "score": 8, "details": "Display: 120px, body: 18px" },
    "easing_identity": { "score": 10, "details": "Single --ease-signature, no ease-out found" },
    "color_discipline": { "score": 4, "details": "Found #FFFFFF in .hero__bg", "fix": "tokens.colors.text" },
    ...
  },
  "failures": [
    { "dimension": "color_discipline", "severity": "critical", "path": "tokens.colors.text", "suggestion": "Replace #FFFFFF with #E8E6E1" }
  ],
  "pass": false,
  "iteration": 2
}
```

### 6.5 Scoring Weights

Not all dimensions are equally important. Weighted average uses these weights (total = 1.0):

| Weight | Dimensions | Rationale |
|--------|-----------|-----------|
| **0.10** | Typography Scale, Scroll Architecture, Entrance Choreography, Interactive Signature | Core quality pillars — these define the feel |
| **0.08** | Easing Identity, Text Animation | High-impact differentiation |
| **0.06** | Color Discipline, Hover Completeness, Spatial Rhythm, Scroll-Away | Important but more formulaic |
| **0.04** | Font Loading, Mobile Strategy, Performance, Page Transitions, CSS Architecture | Supporting quality — necessary but not differentiating |

The overall score = weighted sum of all 15 dimensions.

**Calibration note:** The 7.5 threshold should be calibrated by running the 5 reference teardown sites (Lusion, Lando, DS-K, Noomo, Igloo) through the harness during development. Their scores establish the baseline — our generated sites should be within 1 point of the reference average.

### 6.6 LLM-Judged Dimensions

For dimensions marked "Hybrid" or "LLM", the Evaluation Agent (Sonnet) receives:
- The temporal screenshot set (8-12 images per dimension)
- A scoring rubric specific to that dimension (embedded in the agent prompt)
- The 0-10 scale definition with concrete examples for each score level

The agent returns a score and one-sentence justification. LLM scoring is deterministic enough for iteration (same model, same temperature=0, structured output).

### 6.7 Thresholds

- Any dimension < 5 → **critical**, must fix before next iteration
- Any dimension < 7 → **should fix**
- Weighted average < 7.5 → **not SOTD-ready**, loop continues
- Weighted average >= 7.5 AND no criticals → **pass**
- Max iterations: 5 (then surface to user)

---

## 7. Agent Pipeline

### 7.1 Six Agents

| # | Agent | Input | Output | Model |
|---|-------|-------|--------|-------|
| 1 | **Concept** | User prompt | Brand brief JSON | Opus |
| 2 | **Storyboard** | Brand brief | Scroll timeline JSON | Opus |
| 3 | **Composition** | Storyboard + brief | Complete manifest JSON | Sonnet |
| 4 | **Code** | Manifest | Built Astro project (invokes Code Generator MCP server) | Haiku |
| 5 | **Evaluation** | Built site path | Score card JSON (invokes Evaluation MCP server) | Sonnet |
| 6 | **Refine** | Score card + manifest | Patched manifest JSON | Sonnet |

Note: Agent #4 (Code) is an orchestrator, not a code-generating LLM. It invokes the Code Generator MCP server with the manifest and handles errors. Agent #5 (Evaluation) similarly invokes the Evaluation Harness MCP server.

### 7.2 Agent Output Schemas

**Concept Agent → Brand Brief:**
```typescript
interface BrandBrief {
  personality: string[];        // 3-5 adjectives: ["minimal", "precise", "cold"]
  mood: string;                 // One-sentence mood description
  references: string[];         // 2-3 reference sites or aesthetics
  constraints: string[];        // What to avoid
  colorDirection: "dark" | "light" | "mixed";
  typographyFeel: "editorial" | "geometric" | "humanist" | "monospace-heavy";
  signatureMoment: string;      // The "how did they do that?" interaction idea
}
```

**Storyboard Agent → Scroll Timeline:**
```typescript
interface ScrollTimeline {
  totalHeight: string;          // e.g. "800vh"
  sections: Array<{
    name: string;               // Section identifier
    range: [number, number];    // vh range: [0, 100]
    purpose: string;            // What this section achieves narratively
    layout: string;             // Layout template name
    pacing: "fast" | "medium" | "slow";  // Scroll speed feel
    pinned: boolean;            // Whether section pins during scroll
    primitives: string[];       // Suggested primitive types
    transitionIn: string;       // How this section enters
    transitionOut: string;      // How this section exits
  }>;
}
```

**Refine Agent → Manifest Patch:**
The Refine Agent outputs a JSON Patch (RFC 6902) array targeting specific manifest paths. It only patches dimensions scoring below 7, leaving passing dimensions untouched.

### 7.3 Flow

```
User Prompt → ①Concept → ②Storyboard → ③Composition → ④Code → ⑤Eval → ⑥Refine
                                                           ↑                    │
                                                           └────────────────────┘
                                                            (loop until score ≥ 7.5
                                                             or max 5 iterations)
```

### 7.4 Communication

Agents communicate exclusively through the manifest file. Each agent:
1. Reads the current manifest state
2. Performs its transformation
3. Writes the updated manifest
4. Passes control to the next agent

No agent has access to another agent's internal reasoning.

### 7.5 Anti-Homogenization

The Concept Agent includes:
- **High temperature** (0.9+) for creative divergence in brand direction
- **Negative prompting**: explicit instruction to avoid common AI patterns (gradient backgrounds, rounded shadow cards, generic hero layouts). The agent prompt includes a blacklist of 20+ specific patterns to avoid.
- **Pattern blacklist check**: before passing to Storyboard, the concept brief is checked against a hardcoded list of overused AI design patterns (e.g., "gradient mesh background", "floating 3D shapes", "glassmorphism cards"). If > 3 matches, regenerate. This is a simple string-matching heuristic, not an ML embedding system.
- **Reference diversity**: draws from the 5 Awwwards SOTD teardowns (Lusion, Lando, DS-K, Noomo, Igloo) but combines patterns in non-obvious ways. The agent prompt includes specific pattern combinations from each teardown to use as inspiration anchors.

---

## 8. Plugin Structure

```
awwwards-agent/
  plugin.json                    # Plugin manifest
  skills/
    awwwards-generate.md         # Main skill: "Generate an Awwwards-level site"
    awwwards-evaluate.md         # Standalone evaluation skill
    awwwards-refine.md           # Standalone refinement skill
  agents/
    concept.md                   # Concept agent definition
    storyboard.md                # Storyboard agent definition
    composition.md               # Composition agent definition
    code.md                      # Code agent definition
    evaluation.md                # Evaluation agent definition
    refine.md                    # Refine agent definition
  mcp/
    evaluation-server/           # MCP server: temporal capture + scoring
      src/
        server.ts
        capture.ts               # Playwright temporal snapshots
        scoring.ts               # Automated dimension scoring
        lighthouse.ts            # Performance audit
    generator-server/            # MCP server: manifest → Astro project
      src/
        server.ts
        generator.ts             # Code generation pipeline
        layouts.ts               # Layout template functions
        font-resolver.ts         # Font download + WOFF2 conversion
  packages/
    primitives/                  # npm package: @awwwards-agent/primitives
      src/
        event-bus.ts
        registry.ts
        primitives/
          char-reveal.ts
          fade-up.ts
          preloader.ts
          scroll-away.ts
          scroll-scale.ts
          scrub-sequence.ts
          parallax.ts
          cursor.ts
          tilt.ts
          hold-reveal.ts
          counter.ts
          path-draw.ts
      package.json
    manifest-schema/             # npm package: @awwwards-agent/manifest
      src/
        schema.ts                # JSON Schema definition
        validator.ts             # Manifest validation
        types.ts                 # TypeScript types
      package.json
  templates/
    layouts/                     # Astro layout templates (generic, not site-specific)
      base.astro.hbs
    components/                  # One template per layout type
      split-asymmetric.astro.hbs
      full-bleed-type.astro.hbs
      bento-grid.astro.hbs
      scroll-narrative.astro.hbs
      card-carousel.astro.hbs
      centered-stage.astro.hbs
      footer-bar.astro.hbs
    scripts/
      main.ts.hbs               # Lenis + GSAP + discovery template
    styles/
      global.css.hbs             # Tokens + reset template
```

---

## 9. Technology Stack

| Component | Technology |
|-----------|-----------|
| Primitives | TypeScript, GSAP, Lenis, SplitType, ScrollTrigger |
| Code Generator | TypeScript, Handlebars (templates), fonttools (WOFF2) |
| Evaluation Harness | Playwright, Lighthouse, TypeScript |
| Manifest Schema | JSON Schema, Zod (TypeScript validation) |
| Agent Definitions | Markdown (Claude Code agent format) |
| MCP Servers | TypeScript, @modelcontextprotocol/sdk |
| Generated Output | Astro, vanilla JS/TS, CSS |

---

## 10. Success Criteria

1. Given a single user prompt (e.g., "luxury watch brand, Scandinavian minimal"), the system produces a deployed Astro site
2. The site scores 7.5+ average across 15 Awwwards-aligned dimensions
3. The site passes all automated kill-list checks (no pure B/W, no ease-out, no Google Fonts, etc.)
4. The temporal evaluation captures motion quality that static screenshots miss
5. The refinement loop converges within 5 iterations
6. Generated sites are visually distinct from each other (anti-homogenization)
7. Output is indistinguishable from a hand-crafted Astro project
