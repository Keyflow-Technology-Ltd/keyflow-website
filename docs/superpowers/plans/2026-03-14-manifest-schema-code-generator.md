# Manifest Schema + Code Generator — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `@awwwards-agent/manifest` schema package and the code generator MCP server that transforms a manifest JSON into a complete, hand-crafted-quality Astro project.

**Architecture:** Two packages + templates directory. The manifest package provides TypeScript types, Zod validation, and kill-list compliance checks. The generator server consumes a validated manifest and emits a complete Astro project by rendering Handlebars layout templates, wiring primitives via data-attributes, resolving fonts to self-hosted WOFF2, and tree-shaking unused primitives. Exposed as an MCP server tool for the agent pipeline.

**Tech Stack:** TypeScript, Zod, Handlebars, @modelcontextprotocol/sdk, Vitest

**Spec:** `docs/superpowers/specs/2026-03-14-awwwards-agent-design.md` — Sections 3, 4, 5, 8, 9

**Dependencies:** `@awwwards-agent/primitives` (completed) — provides PrimitiveModule types and 12 primitive module names for registry/tree-shaking validation.

---

## File Structure

```
awwwards-agent/
  packages/
    manifest-schema/
      src/
        types.ts              # Manifest TypeScript interfaces
        schema.ts             # Zod schema definitions
        kill-list.ts          # Semantic kill-list checks
        validator.ts          # Unified validator (Zod + kill-list)
        index.ts              # Barrel exports
      tests/
        schema.test.ts        # Zod schema validation tests
        kill-list.test.ts     # Kill-list checker tests
        validator.test.ts     # Unified validator tests
        fixtures/
          valid-manifest.json
      package.json
      tsconfig.json
      vitest.config.ts
  mcp/
    generator-server/
      src/
        types.ts              # Generator-specific types
        token-resolver.ts     # Tokens → CSS custom properties
        layout-registry.ts    # Template loading + rendering
        asset-resolver.ts     # Asset slot resolution
        primitive-wirer.ts    # Wire data-primitive attributes
        tree-shaker.ts        # Scan + filter used primitives
        font-resolver.ts      # Font resolution chain
        section-emitter.ts    # Per-section file generation
        project-emitter.ts    # Project scaffolding files
        pipeline.ts           # Full pipeline orchestrator
        server.ts             # MCP server
        index.ts              # Entry point
      tests/
        token-resolver.test.ts
        layout-registry.test.ts
        asset-resolver.test.ts
        primitive-wirer.test.ts
        tree-shaker.test.ts
        font-resolver.test.ts
        section-emitter.test.ts
        project-emitter.test.ts
        pipeline.test.ts
        server.test.ts
        fixtures/
          sample-manifest.json
      package.json
      tsconfig.json
      vitest.config.ts
  templates/
    layouts/
      base.astro.hbs
    components/
      split-asymmetric.astro.hbs
      full-bleed-type.astro.hbs
      bento-grid.astro.hbs
      scroll-narrative.astro.hbs
      card-carousel.astro.hbs
      centered-stage.astro.hbs
      footer-bar.astro.hbs
    scripts/
      main.ts.hbs
    styles/
      global.css.hbs
```

---

## Chunk 1: Manifest Schema Package

### Task 1: Scaffold manifest-schema package

**Files:**
- Create: `packages/manifest-schema/package.json`
- Create: `packages/manifest-schema/tsconfig.json`
- Create: `packages/manifest-schema/vitest.config.ts`
- Create: `packages/manifest-schema/src/` (directory)
- Create: `packages/manifest-schema/tests/` (directory)
- Create: `packages/manifest-schema/tests/fixtures/` (directory)

- [ ] **Step 1: Create package.json**

```json
{
  "name": "@awwwards-agent/manifest",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "vitest": "^3.1.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

- [ ] **Step 3: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

- [ ] **Step 4: Create test fixture — valid-manifest.json**

```json
{
  "meta": {
    "name": "Test Project",
    "style": "Scandinavian minimal",
    "version": "1.0.0"
  },
  "tokens": {
    "colors": {
      "bg": "#0A0A0C",
      "text": "#E8E6E1",
      "accent": "#7BA7C2",
      "muted": "#6B6B6B",
      "surface": "#141416",
      "border": "#2A2A2C"
    },
    "fonts": {
      "display": { "family": "Editorial New", "weight": 300 },
      "body": { "family": "Inter", "weight": 400 },
      "mono": { "family": "JetBrains Mono", "weight": 400 }
    },
    "easing": "cubic-bezier(0.65, 0.05, 0, 1)",
    "spacing": {
      "section-gap": "clamp(160px, 15vw, 280px)",
      "content-padding": "clamp(20px, 5vw, 80px)"
    }
  },
  "sections": [
    {
      "type": "hero",
      "layout": "split-asymmetric",
      "content": {
        "headline": { "text": "ABSENCE", "anim": "char-reveal", "stagger": 0.02 },
        "subline": { "text": "A study in negative space" },
        "body": "Where nothing exists, everything matters."
      },
      "primitives": [
        { "type": "char-reveal", "stagger": 0.02, "direction": "left" },
        { "type": "scroll-away", "rotateX": -2, "scale": 0.92 }
      ],
      "assets": [
        { "slot": "hero-media", "type": "css", "gradient": "radial-gradient(ellipse 60% 60% at 30% 40%, rgba(123,167,194,0.15), transparent)" }
      ]
    },
    {
      "type": "specs",
      "layout": "bento-grid",
      "content": {
        "headline": { "text": "SPECIFICATIONS" },
        "items": [
          { "label": "Case", "value": "41mm Grade 5 Titanium" },
          { "label": "Movement", "value": "Automatic VØ-01A" }
        ]
      },
      "primitives": [
        { "type": "fade-up", "y": 40 },
        { "type": "counter", "endValue": 72, "suffix": "h" }
      ],
      "assets": []
    }
  ],
  "global": {
    "primitives": [
      { "type": "cursor", "size": 20, "blend": "difference" },
      { "type": "preloader", "duration": 2.4 }
    ],
    "preloader": {
      "enabled": true,
      "duration": 2.4
    }
  }
}
```

- [ ] **Step 5: Install dependencies**

Run: `cd packages/manifest-schema && npm install`

- [ ] **Step 6: Commit**

```bash
git add packages/manifest-schema/package.json packages/manifest-schema/tsconfig.json packages/manifest-schema/vitest.config.ts packages/manifest-schema/tests/fixtures/valid-manifest.json
git commit -m "chore: scaffold manifest-schema package"
```

---

### Task 2: TypeScript types

**Files:**
- Create: `packages/manifest-schema/src/types.ts`

- [ ] **Step 1: Write types.ts**

```typescript
export interface ManifestMeta {
  readonly name: string;
  readonly style: string;
  readonly version: string;
}

export interface ColorTokens {
  readonly bg: string;
  readonly text: string;
  readonly accent: string;
  readonly muted: string;
  readonly surface: string;
  readonly border: string;
}

export interface FontSpec {
  readonly family: string;
  readonly weight: number;
  readonly src?: string;
}

export interface SpacingTokens {
  readonly 'section-gap': string;
  readonly 'content-padding': string;
}

export interface DesignTokens {
  readonly colors: ColorTokens;
  readonly fonts: {
    readonly display: FontSpec;
    readonly body: FontSpec;
    readonly mono: FontSpec;
  };
  readonly easing: string;
  readonly spacing: SpacingTokens;
}

export interface HeadlineContent {
  readonly text: string;
  readonly anim?: string;
  readonly stagger?: number;
  readonly delay?: number;
}

export interface SublineContent {
  readonly text: string;
  readonly anim?: string;
  readonly delay?: number;
}

export interface SectionContent {
  readonly headline?: HeadlineContent;
  readonly subline?: SublineContent;
  readonly body?: string;
  readonly items?: ReadonlyArray<Record<string, string>>;
}

export interface PrimitiveConfig {
  readonly type: string;
  readonly [key: string]: unknown;
}

export interface AssetConfig {
  readonly slot: string;
  readonly type: 'css' | 'generated' | 'provided';
  readonly [key: string]: unknown;
}

export interface ManifestSection {
  readonly type: string;
  readonly layout: string;
  readonly content: SectionContent;
  readonly primitives: ReadonlyArray<PrimitiveConfig>;
  readonly assets: ReadonlyArray<AssetConfig>;
}

export interface PreloaderGlobalConfig {
  readonly enabled: boolean;
  readonly duration: number;
}

export interface GlobalConfig {
  readonly primitives: ReadonlyArray<PrimitiveConfig>;
  readonly preloader: PreloaderGlobalConfig;
}

export interface Manifest {
  readonly meta: ManifestMeta;
  readonly tokens: DesignTokens;
  readonly sections: ReadonlyArray<ManifestSection>;
  readonly global: GlobalConfig;
}

export const KNOWN_LAYOUTS = [
  'split-asymmetric',
  'full-bleed-type',
  'bento-grid',
  'scroll-narrative',
  'card-carousel',
  'centered-stage',
  'footer-bar',
] as const;

export type LayoutName = typeof KNOWN_LAYOUTS[number];

export const KNOWN_PRIMITIVES = [
  'char-reveal',
  'fade-up',
  'preloader',
  'scroll-away',
  'scroll-scale',
  'scrub-sequence',
  'parallax',
  'cursor',
  'tilt',
  'hold-reveal',
  'counter',
  'path-draw',
] as const;

export type PrimitiveName = typeof KNOWN_PRIMITIVES[number];
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd packages/manifest-schema && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add packages/manifest-schema/src/types.ts
git commit -m "feat: add manifest TypeScript types"
```

---

### Task 3: Zod schema definitions

**Files:**
- Create: `packages/manifest-schema/src/schema.ts`
- Create: `packages/manifest-schema/tests/schema.test.ts`

- [ ] **Step 1: Write the failing test — schema.test.ts**

```typescript
import { describe, test, expect } from 'vitest';
import { manifestSchema } from '../src/schema';
import validManifest from './fixtures/valid-manifest.json';

describe('manifestSchema', () => {
  test('validates a complete valid manifest', () => {
    const result = manifestSchema.safeParse(validManifest);
    expect(result.success).toBe(true);
  });

  test('rejects manifest missing meta', () => {
    const { meta, ...rest } = validManifest;
    const result = manifestSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test('rejects manifest missing tokens', () => {
    const { tokens, ...rest } = validManifest;
    const result = manifestSchema.safeParse(rest);
    expect(result.success).toBe(false);
  });

  test('rejects manifest with empty sections array', () => {
    const result = manifestSchema.safeParse({ ...validManifest, sections: [] });
    expect(result.success).toBe(false);
  });

  test('rejects manifest with invalid color token type', () => {
    const bad = {
      ...validManifest,
      tokens: {
        ...validManifest.tokens,
        colors: { ...validManifest.tokens.colors, bg: 123 },
      },
    };
    const result = manifestSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  test('rejects section missing layout field', () => {
    const bad = {
      ...validManifest,
      sections: [{ type: 'hero', content: {}, primitives: [], assets: [] }],
    };
    const result = manifestSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  test('accepts section with optional content fields omitted', () => {
    const minimal = {
      ...validManifest,
      sections: [{
        type: 'hero',
        layout: 'full-bleed-type',
        content: {},
        primitives: [],
        assets: [],
      }],
    };
    const result = manifestSchema.safeParse(minimal);
    expect(result.success).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/manifest-schema && npx vitest run tests/schema.test.ts`
Expected: FAIL — cannot resolve `../src/schema`

- [ ] **Step 3: Write schema.ts**

```typescript
import { z } from 'zod';

const colorTokensSchema = z.object({
  bg: z.string(),
  text: z.string(),
  accent: z.string(),
  muted: z.string(),
  surface: z.string(),
  border: z.string(),
});

const fontSpecSchema = z.object({
  family: z.string(),
  weight: z.number(),
  src: z.string().optional(),
});

const spacingTokensSchema = z.object({
  'section-gap': z.string(),
  'content-padding': z.string(),
});

const designTokensSchema = z.object({
  colors: colorTokensSchema,
  fonts: z.object({
    display: fontSpecSchema,
    body: fontSpecSchema,
    mono: fontSpecSchema,
  }),
  easing: z.string(),
  spacing: spacingTokensSchema,
});

const headlineContentSchema = z.object({
  text: z.string(),
  anim: z.string().optional(),
  stagger: z.number().optional(),
  delay: z.number().optional(),
});

const sublineContentSchema = z.object({
  text: z.string(),
  anim: z.string().optional(),
  delay: z.number().optional(),
});

const sectionContentSchema = z.object({
  headline: headlineContentSchema.optional(),
  subline: sublineContentSchema.optional(),
  body: z.string().optional(),
  items: z.array(z.record(z.string())).optional(),
});

const primitiveConfigSchema = z.object({
  type: z.string(),
}).passthrough();

const assetConfigSchema = z.object({
  slot: z.string(),
  type: z.enum(['css', 'generated', 'provided']),
}).passthrough();

const manifestSectionSchema = z.object({
  type: z.string(),
  layout: z.string(),
  content: sectionContentSchema,
  primitives: z.array(primitiveConfigSchema),
  assets: z.array(assetConfigSchema),
});

const preloaderGlobalSchema = z.object({
  enabled: z.boolean(),
  duration: z.number(),
});

const globalConfigSchema = z.object({
  primitives: z.array(primitiveConfigSchema),
  preloader: preloaderGlobalSchema,
});

const manifestMetaSchema = z.object({
  name: z.string(),
  style: z.string(),
  version: z.string(),
});

export const manifestSchema = z.object({
  meta: manifestMetaSchema,
  tokens: designTokensSchema,
  sections: z.array(manifestSectionSchema).min(1),
  global: globalConfigSchema,
});

export type ManifestFromSchema = z.infer<typeof manifestSchema>;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/manifest-schema && npx vitest run tests/schema.test.ts`
Expected: 7 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/manifest-schema/src/schema.ts packages/manifest-schema/tests/schema.test.ts
git commit -m "feat: add Zod schema for manifest validation"
```

---

### Task 4: Kill-list checker

**Files:**
- Create: `packages/manifest-schema/src/kill-list.ts`
- Create: `packages/manifest-schema/tests/kill-list.test.ts`

- [ ] **Step 1: Write the failing test — kill-list.test.ts**

```typescript
import { describe, test, expect } from 'vitest';
import { checkKillList } from '../src/kill-list';
import type { Manifest } from '../src/types';
import validManifest from './fixtures/valid-manifest.json';

const asManifest = (m: unknown) => m as Manifest;

describe('checkKillList', () => {
  test('passes clean manifest with no violations', () => {
    const errors = checkKillList(asManifest(validManifest));
    expect(errors).toHaveLength(0);
  });

  test('detects pure black #000000 in bg color', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, colors: { ...validManifest.tokens.colors, bg: '#000000' } } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-pure-bw', path: 'tokens.colors.bg' }));
  });

  test('detects pure white #FFFFFF in text color', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, colors: { ...validManifest.tokens.colors, text: '#FFFFFF' } } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-pure-bw', path: 'tokens.colors.text' }));
  });

  test('detects pure white #fff (lowercase)', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, colors: { ...validManifest.tokens.colors, accent: '#fff' } } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-pure-bw' }));
  });

  test('detects pure black #000 (shorthand)', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, colors: { ...validManifest.tokens.colors, surface: '#000' } } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-pure-bw' }));
  });

  test('detects banned easing "ease-out"', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, easing: 'ease-out' } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-generic-easing' }));
  });

  test('detects banned easing "ease-in-out"', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, easing: 'ease-in-out' } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-generic-easing' }));
  });

  test('requires cubic-bezier format for easing', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, easing: 'spring(1, 80, 10, 0)' } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'cubic-bezier-easing' }));
  });

  test('detects Google Fonts CDN in font src', () => {
    const bad = {
      ...validManifest,
      tokens: {
        ...validManifest.tokens,
        fonts: {
          ...validManifest.tokens.fonts,
          display: { family: 'Inter', weight: 400, src: 'https://fonts.googleapis.com/css2?family=Inter' },
        },
      },
    };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-google-fonts-cdn' }));
  });

  test('detects unknown layout name', () => {
    const bad = {
      ...validManifest,
      sections: [{ ...validManifest.sections[0], layout: 'hero-gradient' }],
    };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'known-layout' }));
  });

  test('detects unknown primitive type in section', () => {
    const bad = {
      ...validManifest,
      sections: [{
        ...validManifest.sections[0],
        primitives: [{ type: 'sparkle-effect' }],
      }],
    };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'known-primitive' }));
  });

  test('detects unknown primitive type in global', () => {
    const bad = {
      ...validManifest,
      global: {
        ...validManifest.global,
        primitives: [{ type: 'magic-cursor' }],
      },
    };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'known-primitive' }));
  });

  test('detects banned easing "ease"', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, easing: 'ease' } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-generic-easing' }));
  });

  test('detects banned easing "linear"', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, easing: 'linear' } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-generic-easing' }));
  });

  test('detects banned easing "ease-in"', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, easing: 'ease-in' } };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'no-generic-easing' }));
  });

  test('banned easing produces exactly one error, not two', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, easing: 'ease-out' } };
    const errors = checkKillList(asManifest(bad));
    const easingErrors = errors.filter((e) => e.path === 'tokens.easing');
    expect(easingErrors).toHaveLength(1);
  });

  test('detects section-gap below 160px with plain pixel value', () => {
    const bad = {
      ...validManifest,
      tokens: {
        ...validManifest.tokens,
        spacing: { ...validManifest.tokens.spacing, 'section-gap': '100px' },
      },
    };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'min-section-gap' }));
  });

  test('detects section-gap minimum below 160px', () => {
    const bad = {
      ...validManifest,
      tokens: {
        ...validManifest.tokens,
        spacing: { ...validManifest.tokens.spacing, 'section-gap': 'clamp(80px, 10vw, 200px)' },
      },
    };
    const errors = checkKillList(asManifest(bad));
    expect(errors).toContainEqual(expect.objectContaining({ rule: 'min-section-gap' }));
  });

  test('passes section-gap at 160px minimum', () => {
    const ok = {
      ...validManifest,
      tokens: {
        ...validManifest.tokens,
        spacing: { ...validManifest.tokens.spacing, 'section-gap': 'clamp(160px, 15vw, 280px)' },
      },
    };
    const errors = checkKillList(asManifest(ok));
    expect(errors.filter((e) => e.rule === 'min-section-gap')).toHaveLength(0);
  });

  test('all errors have severity field', () => {
    const bad = { ...validManifest, tokens: { ...validManifest.tokens, colors: { ...validManifest.tokens.colors, bg: '#000' }, easing: 'ease-out' } };
    const errors = checkKillList(asManifest(bad));
    for (const err of errors) {
      expect(['critical', 'warning']).toContain(err.severity);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/manifest-schema && npx vitest run tests/kill-list.test.ts`
Expected: FAIL — cannot resolve `../src/kill-list`

- [ ] **Step 3: Write kill-list.ts**

```typescript
import type { Manifest } from './types';
import { KNOWN_LAYOUTS, KNOWN_PRIMITIVES } from './types';

export interface KillListError {
  readonly rule: string;
  readonly path: string;
  readonly message: string;
  readonly severity: 'critical' | 'warning';
}

const PURE_BW = new Set([
  '#000', '#000000', '#fff', '#ffffff',
  'rgb(0,0,0)', 'rgb(0, 0, 0)',
  'rgb(255,255,255)', 'rgb(255, 255, 255)',
]);

const BANNED_EASINGS = new Set([
  'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear',
]);

const GOOGLE_FONTS_CDN = 'fonts.googleapis.com';

export function checkKillList(manifest: Manifest): readonly KillListError[] {
  const errors: KillListError[] = [];

  // Rule: no pure black/white colors
  for (const [key, value] of Object.entries(manifest.tokens.colors)) {
    if (PURE_BW.has(value.toLowerCase())) {
      errors.push({
        rule: 'no-pure-bw',
        path: `tokens.colors.${key}`,
        message: `Pure black/white "${value}" is not allowed. Use tinted values (e.g. #0A0A0A, #FAFAF7).`,
        severity: 'critical',
      });
    }
  }

  // Rule: easing validation (mutually exclusive — banned names first, then format check)
  if (BANNED_EASINGS.has(manifest.tokens.easing)) {
    errors.push({
      rule: 'no-generic-easing',
      path: 'tokens.easing',
      message: `Generic easing "${manifest.tokens.easing}" not allowed. Use a custom cubic-bezier().`,
      severity: 'critical',
    });
  } else if (!manifest.tokens.easing.startsWith('cubic-bezier(')) {
    errors.push({
      rule: 'cubic-bezier-easing',
      path: 'tokens.easing',
      message: 'Easing must be a cubic-bezier() value.',
      severity: 'critical',
    });
  }

  // Rule: no Google Fonts CDN links
  const fontRoles = ['display', 'body', 'mono'] as const;
  for (const role of fontRoles) {
    const font = manifest.tokens.fonts[role];
    if (font.src && font.src.includes(GOOGLE_FONTS_CDN)) {
      errors.push({
        rule: 'no-google-fonts-cdn',
        path: `tokens.fonts.${role}.src`,
        message: 'Google Fonts CDN links are not allowed. Fonts must be self-hosted.',
        severity: 'critical',
      });
    }
  }

  // Rule: section-gap minimum 160px (handles both clamp() and plain px values)
  const gapValue = manifest.tokens.spacing['section-gap'];
  const clampGapMatch = gapValue.match(/clamp\((\d+)px/);
  if (clampGapMatch) {
    if (parseInt(clampGapMatch[1], 10) < 160) {
      errors.push({
        rule: 'min-section-gap',
        path: 'tokens.spacing.section-gap',
        message: `Section gap minimum ${clampGapMatch[1]}px is below 160px.`,
        severity: 'critical',
      });
    }
  } else {
    const plainGapMatch = gapValue.match(/^(\d+)px$/);
    if (plainGapMatch && parseInt(plainGapMatch[1], 10) < 160) {
      errors.push({
        rule: 'min-section-gap',
        path: 'tokens.spacing.section-gap',
        message: `Section gap ${plainGapMatch[1]}px is below 160px minimum.`,
        severity: 'critical',
      });
    }
  }

  // Rule: known layout names and primitive types
  const layoutSet = new Set<string>(KNOWN_LAYOUTS);
  const primSet = new Set<string>(KNOWN_PRIMITIVES);

  for (let i = 0; i < manifest.sections.length; i++) {
    const section = manifest.sections[i];
    if (!layoutSet.has(section.layout)) {
      errors.push({
        rule: 'known-layout',
        path: `sections[${i}].layout`,
        message: `Unknown layout "${section.layout}". Must be one of: ${KNOWN_LAYOUTS.join(', ')}`,
        severity: 'critical',
      });
    }

    for (let j = 0; j < section.primitives.length; j++) {
      if (!primSet.has(section.primitives[j].type)) {
        errors.push({
          rule: 'known-primitive',
          path: `sections[${i}].primitives[${j}].type`,
          message: `Unknown primitive "${section.primitives[j].type}".`,
          severity: 'critical',
        });
      }
    }
  }

  // Rule: known primitive types (global)
  for (let i = 0; i < manifest.global.primitives.length; i++) {
    if (!primSet.has(manifest.global.primitives[i].type)) {
      errors.push({
        rule: 'known-primitive',
        path: `global.primitives[${i}].type`,
        message: `Unknown primitive "${manifest.global.primitives[i].type}".`,
        severity: 'critical',
      });
    }
  }

  return errors;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/manifest-schema && npx vitest run tests/kill-list.test.ts`
Expected: 20 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/manifest-schema/src/kill-list.ts packages/manifest-schema/tests/kill-list.test.ts
git commit -m "feat: add kill-list checker for manifest validation"
```

---

### Task 5: Unified validator

**Files:**
- Create: `packages/manifest-schema/src/validator.ts`
- Create: `packages/manifest-schema/tests/validator.test.ts`

- [ ] **Step 1: Write the failing test — validator.test.ts**

```typescript
import { describe, test, expect } from 'vitest';
import { validateManifest } from '../src/validator';
import validManifest from './fixtures/valid-manifest.json';

describe('validateManifest', () => {
  test('returns success for valid manifest', () => {
    const result = validateManifest(validManifest);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.manifest.meta.name).toBe('Test Project');
    }
  });

  test('returns schema errors for invalid structure', () => {
    const result = validateManifest({ meta: { name: 'X' } });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].source).toBe('schema');
    }
  });

  test('returns kill-list errors for pure black color', () => {
    const bad = {
      ...validManifest,
      tokens: {
        ...validManifest.tokens,
        colors: { ...validManifest.tokens.colors, bg: '#000000' },
      },
    };
    const result = validateManifest(bad);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors).toContainEqual(
        expect.objectContaining({ source: 'kill-list', rule: 'no-pure-bw' }),
      );
    }
  });

  test('returns both schema and kill-list errors', () => {
    const bad = {
      meta: { name: 'X', style: 'dark', version: '1.0.0' },
      tokens: {
        ...validManifest.tokens,
        colors: { ...validManifest.tokens.colors, bg: '#000' },
      },
      sections: [],
      global: validManifest.global,
    };
    const result = validateManifest(bad);
    expect(result.success).toBe(false);
    if (!result.success) {
      const sources = new Set(result.errors.map((e) => e.source));
      expect(sources.has('schema')).toBe(true);
      expect(sources.has('kill-list')).toBe(true);
    }
  });

  test('typed manifest output matches interface', () => {
    const result = validateManifest(validManifest);
    if (result.success) {
      expect(result.manifest.tokens.colors.bg).toBe('#0A0A0C');
      expect(result.manifest.sections).toHaveLength(2);
      expect(result.manifest.global.preloader.enabled).toBe(true);
    }
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd packages/manifest-schema && npx vitest run tests/validator.test.ts`
Expected: FAIL — cannot resolve `../src/validator`

- [ ] **Step 3: Write validator.ts**

```typescript
import type { Manifest } from './types';
import { manifestSchema } from './schema';
import { checkKillList, type KillListError } from './kill-list';

export interface ValidationError {
  readonly source: 'schema' | 'kill-list';
  readonly path: string;
  readonly message: string;
  readonly rule?: string;
  readonly severity: 'critical' | 'warning';
}

export type ValidationResult =
  | { readonly success: true; readonly manifest: Manifest }
  | { readonly success: false; readonly errors: readonly ValidationError[] };

export function validateManifest(input: unknown): ValidationResult {
  const errors: ValidationError[] = [];

  // Step 1: Zod schema validation
  const parseResult = manifestSchema.safeParse(input);

  if (!parseResult.success) {
    for (const issue of parseResult.error.issues) {
      errors.push({
        source: 'schema',
        path: issue.path.join('.'),
        message: issue.message,
        severity: 'critical',
      });
    }
  }

  // Step 2: Kill-list checks (only if schema is structurally valid enough)
  if (parseResult.success) {
    const killListErrors = checkKillList(parseResult.data as Manifest);
    for (const kle of killListErrors) {
      errors.push({
        source: 'kill-list',
        path: kle.path,
        message: kle.message,
        rule: kle.rule,
        severity: kle.severity,
      });
    }
  } else {
    // Try kill-list on raw input if it looks like a manifest (has tokens)
    const raw = input as Record<string, unknown>;
    if (raw && typeof raw === 'object' && 'tokens' in raw && 'sections' in raw && 'global' in raw) {
      try {
        const killListErrors = checkKillList(raw as Manifest);
        for (const kle of killListErrors) {
          errors.push({
            source: 'kill-list',
            path: kle.path,
            message: kle.message,
            rule: kle.rule,
            severity: kle.severity,
          });
        }
      } catch {
        // Kill-list check failed on malformed input, skip
      }
    }
  }

  if (errors.length > 0) {
    return { success: false, errors };
  }

  return { success: true, manifest: parseResult.data as Manifest };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd packages/manifest-schema && npx vitest run tests/validator.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/manifest-schema/src/validator.ts packages/manifest-schema/tests/validator.test.ts
git commit -m "feat: add unified manifest validator with Zod + kill-list"
```

---

### Task 6: Barrel exports + full test run

**Files:**
- Create: `packages/manifest-schema/src/index.ts`

- [ ] **Step 1: Write index.ts**

```typescript
// Types
export type {
  Manifest,
  ManifestMeta,
  DesignTokens,
  ColorTokens,
  FontSpec,
  SpacingTokens,
  SectionContent,
  HeadlineContent,
  SublineContent,
  PrimitiveConfig,
  AssetConfig,
  ManifestSection,
  GlobalConfig,
  PreloaderGlobalConfig,
  LayoutName,
  PrimitiveName,
} from './types';

export { KNOWN_LAYOUTS, KNOWN_PRIMITIVES } from './types';

// Schema
export { manifestSchema } from './schema';
export type { ManifestFromSchema } from './schema';

// Kill-list
export { checkKillList } from './kill-list';
export type { KillListError } from './kill-list';

// Validator
export { validateManifest } from './validator';
export type { ValidationError, ValidationResult } from './validator';
```

- [ ] **Step 2: Run all tests**

Run: `cd packages/manifest-schema && npx vitest run`
Expected: All 32 tests PASS

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd packages/manifest-schema && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add packages/manifest-schema/src/index.ts
git commit -m "feat: add barrel exports for manifest-schema package"
```

---

## Chunk 2: Handlebars Templates

All templates live in `awwwards-agent/templates/`. They are Handlebars files that produce valid Astro source code. `{{var}}` = Handlebars substitution (resolved at generation time). Astro template expressions use single `{var}` — no conflict.

Template testing is deferred to Chunk 3 (layout-registry tests validate rendering).

### Task 7: global.css.hbs + directory structure

**Files:**
- Create: `templates/styles/global.css.hbs`

- [ ] **Step 1: Create directories**

```bash
mkdir -p templates/styles templates/layouts templates/components templates/scripts
```

- [ ] **Step 2: Write global.css.hbs**

```handlebars
:root {
  --color-bg: {{colors.bg}};
  --color-text: {{colors.text}};
  --color-accent: {{colors.accent}};
  --color-muted: {{colors.muted}};
  --color-surface: {{colors.surface}};
  --color-border: {{colors.border}};

  --ease-signature: {{easing}};
  --duration-default: 0.75s;
  --anim: var(--duration-default) var(--ease-signature);

  --font-display: '{{fonts.display.family}}', sans-serif;
  --font-body: '{{fonts.body.family}}', sans-serif;
  --font-mono: '{{fonts.mono.family}}', monospace;
  --text-display: clamp(3rem, 10vw, 12rem);
  --text-heading: clamp(2rem, 5vw, 5.5rem);
  --text-body: clamp(1rem, 1.1vw, 1.125rem);
  --text-label: 0.6875rem;
  --display-line-height: 0.88;
  --display-letter-spacing: -0.02em;

  --section-gap: {{spacing.sectionGap}};
  --content-padding: {{spacing.contentPadding}};
}

{{#each fontFaces}}
@font-face {
  font-family: '{{this.family}}';
  font-weight: {{this.weight}};
  font-display: block;
  src: url('/fonts/{{this.file}}') format('woff2');
}
{{/each}}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scrollbar-width: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body::-webkit-scrollbar { display: none; }

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-body);
  line-height: 1.6;
  overflow-x: hidden;
}

img, video { display: block; max-width: 100%; height: auto; }
a { color: inherit; text-decoration: none; }

::selection {
  background-color: var(--color-accent);
  color: var(--color-bg);
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add templates/
git commit -m "feat: add global.css.hbs template with tokens and reset"
```

---

### Task 8: base.astro.hbs + main.ts.hbs

**Files:**
- Create: `templates/layouts/base.astro.hbs`
- Create: `templates/scripts/main.ts.hbs`

- [ ] **Step 1: Write base.astro.hbs**

```handlebars
---
{{#each sectionImports}}
import {{this.name}} from '../components/{{this.file}}';
{{/each}}
import '../styles/global.css';
---

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{{title}}</title>
{{#each fontPreloads}}
  <link rel="preload" href="/fonts/{{this.file}}" as="font" type="font/woff2" crossorigin />
{{/each}}
</head>
<body>
{{#each sectionComponents}}
  <{{this.name}} />
{{/each}}
  <script src="../scripts/main.ts"></script>
</body>
</html>
```

Context shape:
```typescript
{
  title: string;
  sectionImports: Array<{ name: string; file: string }>;
  sectionComponents: Array<{ name: string }>;
  fontPreloads: Array<{ file: string }>;
}
```

- [ ] **Step 2: Write main.ts.hbs**

```handlebars
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createEventBus } from './event-bus';
import { createRegistry } from './registry';
{{#each primitiveImports}}
import { {{this.importName}} } from './primitives/{{this.file}}';
{{/each}}

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const bus = createEventBus();

const registry = createRegistry();
{{#each primitiveImports}}
registry.register({{this.importName}});
{{/each}}

const cleanup = registry.discover(bus);

window.addEventListener('beforeunload', cleanup);
```

Context shape:
```typescript
{
  primitiveImports: Array<{ importName: string; file: string }>;
}
```

- [ ] **Step 3: Commit**

```bash
git add templates/layouts/base.astro.hbs templates/scripts/main.ts.hbs
git commit -m "feat: add base layout and main.ts Handlebars templates"
```

---

### Task 9: split-asymmetric + full-bleed-type templates

**Files:**
- Create: `templates/components/split-asymmetric.astro.hbs`
- Create: `templates/components/full-bleed-type.astro.hbs`

- [ ] **Step 1: Write split-asymmetric.astro.hbs**

```handlebars
<section id="{{sectionId}}" class="split" {{{sectionAttrs}}}>
  <div class="split__content">
{{#if content.headline}}
    <h1 class="split__headline" {{{headlineAttrs}}}>{{content.headline.text}}</h1>
{{/if}}
{{#if content.subline}}
    <p class="split__subline" {{{sublineAttrs}}}>{{content.subline.text}}</p>
{{/if}}
{{#if content.body}}
    <p class="split__body">{{content.body}}</p>
{{/if}}
  </div>
  <div class="split__media">
    {{{assetHtml}}}
  </div>
</section>

<style>
  .split {
    display: grid;
    grid-template-columns: 1fr 0.65fr;
    min-height: 100vh;
    gap: var(--content-padding);
    padding: var(--content-padding);
    align-items: center;
  }
  .split__headline {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 300;
    line-height: var(--display-line-height);
    letter-spacing: var(--display-letter-spacing);
  }
  .split__subline {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--color-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 24px;
  }
  .split__body {
    font-family: var(--font-body);
    font-size: var(--text-body);
    color: var(--color-muted);
    line-height: 1.8;
    margin-top: 24px;
    max-width: 480px;
  }
  .split__media {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 400px;
  }
  @media (max-width: 768px) {
    .split { grid-template-columns: 1fr; min-height: auto; padding-top: 120px; }
    .split__media { order: -1; min-height: 300px; }
  }
</style>
```

- [ ] **Step 2: Write full-bleed-type.astro.hbs**

```handlebars
<section id="{{sectionId}}" class="bleed" {{{sectionAttrs}}}>
  <div class="bleed__content">
{{#if content.headline}}
    <h1 class="bleed__headline" {{{headlineAttrs}}}>{{content.headline.text}}</h1>
{{/if}}
{{#if content.subline}}
    <p class="bleed__subline" {{{sublineAttrs}}}>{{content.subline.text}}</p>
{{/if}}
{{#if content.body}}
    <p class="bleed__body">{{content.body}}</p>
{{/if}}
  </div>
{{#if assetHtml}}
  <div class="bleed__bg">{{{assetHtml}}}</div>
{{/if}}
</section>

<style>
  .bleed {
    position: relative;
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: var(--content-padding);
    overflow: hidden;
  }
  .bleed__content { position: relative; z-index: 1; text-align: center; max-width: 1200px; }
  .bleed__headline {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 300;
    line-height: var(--display-line-height);
    letter-spacing: var(--display-letter-spacing);
  }
  .bleed__subline {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--color-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 32px;
  }
  .bleed__body {
    font-family: var(--font-body);
    font-size: var(--text-body);
    color: var(--color-muted);
    line-height: 1.8;
    margin-top: 24px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  .bleed__bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  @media (max-width: 768px) {
    .bleed { min-height: 80vh; }
    .bleed__subline { margin-top: 24px; }
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add templates/components/split-asymmetric.astro.hbs templates/components/full-bleed-type.astro.hbs
git commit -m "feat: add split-asymmetric and full-bleed-type layout templates"
```

---

### Task 10: bento-grid + scroll-narrative + card-carousel templates

**Files:**
- Create: `templates/components/bento-grid.astro.hbs`
- Create: `templates/components/scroll-narrative.astro.hbs`
- Create: `templates/components/card-carousel.astro.hbs`

- [ ] **Step 1: Write bento-grid.astro.hbs**

```handlebars
<section id="{{sectionId}}" class="bento" {{{sectionAttrs}}}>
{{#if content.headline}}
  <h2 class="bento__headline" {{{headlineAttrs}}}>{{content.headline.text}}</h2>
{{/if}}
  <div class="bento__grid">
{{#each content.items}}
    <div class="bento__cell{{#if @first}} bento__cell--hero{{/if}}" {{{../itemAttrs}}}>
      <span class="bento__label">{{this.label}}</span>
      <span class="bento__value" {{{../valueAttrs}}}>{{this.value}}</span>
    </div>
{{/each}}
  </div>
</section>

<style>
  .bento { padding: var(--section-gap) var(--content-padding); max-width: 1200px; margin: 0 auto; }
  .bento__headline {
    font-family: var(--font-display);
    font-size: var(--text-heading);
    font-weight: 300;
    letter-spacing: var(--display-letter-spacing);
    margin-bottom: 64px;
  }
  .bento__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(180px, auto);
    gap: 2px;
  }
  .bento__cell--hero {
    grid-column: span 2;
    grid-row: span 2;
  }
  .bento__cell {
    background: var(--color-surface);
    padding: clamp(24px, 3vw, 48px);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 12px;
  }
  .bento__cell--hero .bento__value {
    font-size: clamp(2rem, 5vw, 4rem);
  }
  .bento__label {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--color-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .bento__value {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 300;
    letter-spacing: var(--display-letter-spacing);
  }
  @media (max-width: 768px) {
    .bento__grid { grid-template-columns: repeat(2, 1fr); }
    .bento__cell--hero { grid-column: span 2; grid-row: span 1; }
  }
  @media (max-width: 480px) {
    .bento__grid { grid-template-columns: 1fr; }
    .bento__cell--hero { grid-column: span 1; }
  }
</style>
```

- [ ] **Step 2: Write scroll-narrative.astro.hbs**

```handlebars
<section id="{{sectionId}}" class="narrative" {{{sectionAttrs}}}>
{{#if content.headline}}
  <div class="narrative__header">
    <h2 class="narrative__headline" {{{headlineAttrs}}}>{{content.headline.text}}</h2>
{{#if content.subline}}
    <p class="narrative__subline" {{{sublineAttrs}}}>{{content.subline.text}}</p>
{{/if}}
  </div>
{{/if}}
{{#if content.body}}
  <div class="narrative__body"><p>{{content.body}}</p></div>
{{/if}}
{{#if assetHtml}}
  <div class="narrative__media">{{{assetHtml}}}</div>
{{/if}}
</section>

<style>
  .narrative {
    min-height: 200vh;
    padding: var(--section-gap) var(--content-padding);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--section-gap);
  }
  .narrative__header { text-align: center; max-width: 800px; }
  .narrative__headline {
    font-family: var(--font-display);
    font-size: var(--text-heading);
    font-weight: 300;
    letter-spacing: var(--display-letter-spacing);
  }
  .narrative__subline {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--color-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-top: 24px;
  }
  .narrative__body {
    font-family: var(--font-body);
    font-size: var(--text-body);
    color: var(--color-muted);
    line-height: 1.8;
    max-width: 600px;
    text-align: center;
  }
  .narrative__media {
    width: 100%;
    max-width: 1000px;
    min-height: 60vh;
    display: grid;
    place-items: center;
  }
  @media (max-width: 768px) { .narrative { min-height: auto; } }
</style>
```

- [ ] **Step 3: Write card-carousel.astro.hbs**

```handlebars
<section id="{{sectionId}}" class="carousel" {{{sectionAttrs}}}>
{{#if content.headline}}
  <h2 class="carousel__headline" {{{headlineAttrs}}}>{{content.headline.text}}</h2>
{{/if}}
  <div class="carousel__track">
{{#each content.items}}
    <div class="carousel__card" {{{../itemAttrs}}}>
{{#if this.label}}
      <span class="carousel__label">{{this.label}}</span>
{{/if}}
{{#if this.value}}
      <span class="carousel__value" {{{../valueAttrs}}}>{{this.value}}</span>
{{/if}}
{{#if this.description}}
      <p class="carousel__desc">{{this.description}}</p>
{{/if}}
    </div>
{{/each}}
  </div>
</section>

<style>
  .carousel { padding: var(--section-gap) 0; overflow: hidden; }
  .carousel__headline {
    font-family: var(--font-display);
    font-size: var(--text-heading);
    font-weight: 300;
    letter-spacing: var(--display-letter-spacing);
    padding: 0 var(--content-padding);
    margin-bottom: 64px;
  }
  .carousel__track {
    display: flex;
    gap: 2px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    padding: 0 var(--content-padding);
  }
  .carousel__track::-webkit-scrollbar { display: none; }
  .carousel__card {
    flex: 0 0 calc(33.333% - 2px);
    min-width: 300px;
    background: var(--color-surface);
    padding: clamp(24px, 3vw, 48px);
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .carousel__label {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--color-accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .carousel__value {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-weight: 300;
    letter-spacing: var(--display-letter-spacing);
  }
  .carousel__desc {
    font-family: var(--font-body);
    font-size: var(--text-body);
    color: var(--color-muted);
    line-height: 1.6;
  }
  @media (max-width: 768px) { .carousel__card { flex: 0 0 85%; min-width: 260px; } }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add templates/components/bento-grid.astro.hbs templates/components/scroll-narrative.astro.hbs templates/components/card-carousel.astro.hbs
git commit -m "feat: add bento-grid, scroll-narrative, card-carousel templates"
```

---

### Task 11: centered-stage + footer-bar templates

**Files:**
- Create: `templates/components/centered-stage.astro.hbs`
- Create: `templates/components/footer-bar.astro.hbs`

- [ ] **Step 1: Write centered-stage.astro.hbs**

```handlebars
<section id="{{sectionId}}" class="stage" {{{sectionAttrs}}}>
  <div class="stage__content">
{{#if content.subline}}
    <span class="stage__label" {{{sublineAttrs}}}>{{content.subline.text}}</span>
{{/if}}
{{#if content.headline}}
    <h2 class="stage__headline" {{{headlineAttrs}}}>{{content.headline.text}}</h2>
{{/if}}
{{#if content.body}}
    <p class="stage__body">{{content.body}}</p>
{{/if}}
  </div>
{{#if assetHtml}}
  <div class="stage__media">{{{assetHtml}}}</div>
{{/if}}
</section>

<style>
  .stage {
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: var(--content-padding);
    position: relative;
  }
  .stage__content { text-align: center; max-width: 600px; position: relative; z-index: 1; }
  .stage__label {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--color-accent);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    display: block;
    margin-bottom: 24px;
  }
  .stage__headline {
    font-family: var(--font-display);
    font-size: var(--text-heading);
    font-weight: 300;
    letter-spacing: var(--display-letter-spacing);
  }
  .stage__body {
    font-family: var(--font-body);
    font-size: var(--text-body);
    color: var(--color-muted);
    line-height: 1.8;
    margin-top: 24px;
  }
  .stage__media {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    pointer-events: none;
    z-index: 0;
  }
  @media (max-width: 768px) {
    .stage { padding: calc(var(--content-padding) * 2); }
    .stage__headline { font-size: clamp(1.5rem, 6vw, 2.5rem); }
  }
</style>
```

- [ ] **Step 2: Write footer-bar.astro.hbs**

```handlebars
<footer id="{{sectionId}}" class="footer" {{{sectionAttrs}}}>
  <div class="footer__row">
    <div class="footer__mark">
      <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="40" stroke="var(--color-accent)" stroke-width="2" />
        <line x1="22" y1="78" x2="78" y2="22" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
{{#if content.items}}
    <nav class="footer__nav">
{{#each content.items}}
      <a href="{{this.href}}" class="footer__link" data-cursor-hover>{{this.label}}</a>
{{/each}}
    </nav>
{{/if}}
{{#if content.body}}
    <span class="footer__tagline">{{content.body}}</span>
{{/if}}
  </div>
</footer>

<style>
  .footer {
    position: relative;
    padding: clamp(48px, 6vw, 96px) var(--content-padding);
    border-top: 1px solid var(--color-border);
  }
  .footer__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    flex-wrap: wrap;
    gap: 24px;
  }
  .footer__mark { display: flex; align-items: center; }
  .footer__nav { display: flex; gap: clamp(16px, 3vw, 48px); }
  .footer__link {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--color-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    position: relative;
    transition: color var(--anim);
  }
  @media (hover: hover) {
    .footer__link:hover { color: var(--color-accent); }
    .footer__link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 1px;
      background: var(--color-accent);
      transform: translateX(-101%);
      transition: transform var(--anim);
    }
    .footer__link:hover::after { transform: translateX(0); }
  }
  .footer__tagline {
    font-family: var(--font-mono);
    font-size: var(--text-label);
    color: var(--color-muted);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    .footer__row { flex-direction: column; align-items: flex-start; }
  }
</style>
```

- [ ] **Step 3: Commit all templates**

```bash
git add templates/
git commit -m "feat: add centered-stage and footer-bar layout templates"
```

**Template context contract (all layout component templates):**

```typescript
interface LayoutTemplateContext {
  sectionId: string;           // e.g. "section-0-hero"
  sectionAttrs: string;        // data-primitive attrs for section wrapper (triple-stash)
  headlineAttrs: string;       // data-primitive attrs for headline element
  sublineAttrs: string;        // data-primitive attrs for subline element
  itemAttrs: string;           // data-primitive attrs for item containers
  valueAttrs: string;          // data-primitive attrs for value elements (counter)
  assetHtml: string;           // resolved asset HTML (triple-stash)
  content: {
    headline?: { text: string };
    subline?: { text: string };
    body?: string;
    items?: Array<Record<string, string>>;
  };
}
```

---

## Chunk 3: Generator Core Modules

### Task 12: Scaffold generator-server + types

**Files:**
- Create: `mcp/generator-server/package.json`
- Create: `mcp/generator-server/tsconfig.json`
- Create: `mcp/generator-server/vitest.config.ts`
- Create: `mcp/generator-server/src/types.ts`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "@awwwards-agent/generator-server",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "test:watch": "vitest",
    "start": "node dist/server.js"
  },
  "dependencies": {
    "@awwwards-agent/manifest": "workspace:*",
    "handlebars": "^4.7.8",
    "@modelcontextprotocol/sdk": "^1.12.0",
    "zod": "^3.24.0"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "vitest": "^3.1.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

- [ ] **Step 3: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
});
```

- [ ] **Step 4: Write types.ts**

```typescript
import type { Manifest, ManifestSection, DesignTokens, PrimitiveConfig } from '@awwwards-agent/manifest';

export interface CSSVarMap {
  readonly [varName: string]: string;
}

export interface FontFace {
  readonly family: string;
  readonly weight: number;
  readonly file: string;
}

export interface ResolvedAsset {
  readonly slot: string;
  readonly html: string;
}

export interface WiredSection {
  readonly sectionAttrs: string;
  readonly headlineAttrs: string;
  readonly sublineAttrs: string;
  readonly itemAttrs: string;
  readonly valueAttrs: string;
}

export interface SectionEmitContext {
  readonly sectionIndex: number;
  readonly section: ManifestSection;
  readonly wired: WiredSection;
  readonly assets: readonly ResolvedAsset[];
  readonly tokens: DesignTokens;
}

export interface GeneratedFile {
  readonly path: string;
  readonly content: string;
}

export interface GeneratorOptions {
  readonly manifest: Manifest;
  readonly outputDir: string;
  readonly templateDir: string;
  readonly primitivesDir?: string;
}

export interface FontResolution {
  readonly file: string;
  readonly family: string;
  readonly weight: number;
  readonly source: 'url' | 'bundled' | 'google' | 'failed';
  readonly data: ArrayBuffer | null;
}

export interface GeneratorResult {
  readonly files: readonly GeneratedFile[];
  readonly usedPrimitives: ReadonlySet<string>;
  readonly fontFiles: readonly string[];
  readonly fontResolutions: readonly FontResolution[];
}

export const SECTION_LEVEL_PRIMITIVES = new Set([
  'scroll-away', 'scroll-scale', 'scrub-sequence', 'parallax',
]);
```

- [ ] **Step 5: Install dependencies**

Run: `cd mcp/generator-server && npm install`

- [ ] **Step 6: Commit**

```bash
git add mcp/generator-server/package.json mcp/generator-server/tsconfig.json mcp/generator-server/vitest.config.ts mcp/generator-server/src/types.ts
git commit -m "chore: scaffold generator-server package with types"
```

---

### Task 13: Token resolver

**Files:**
- Create: `mcp/generator-server/src/token-resolver.ts`
- Create: `mcp/generator-server/tests/token-resolver.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, test, expect } from 'vitest';
import { resolveTokens } from '../src/token-resolver';
import type { DesignTokens } from '@awwwards-agent/manifest';

const tokens: DesignTokens = {
  colors: { bg: '#0A0A0C', text: '#E8E6E1', accent: '#7BA7C2', muted: '#6B6B6B', surface: '#141416', border: '#2A2A2C' },
  fonts: {
    display: { family: 'Editorial New', weight: 300 },
    body: { family: 'Inter', weight: 400 },
    mono: { family: 'JetBrains Mono', weight: 400 },
  },
  easing: 'cubic-bezier(0.65, 0.05, 0, 1)',
  spacing: { 'section-gap': 'clamp(100px, 15vw, 280px)', 'content-padding': 'clamp(20px, 5vw, 80px)' },
};

describe('resolveTokens', () => {
  test('maps color tokens to CSS custom properties', () => {
    const result = resolveTokens(tokens);
    expect(result.cssVars['--color-bg']).toBe('#0A0A0C');
    expect(result.cssVars['--color-accent']).toBe('#7BA7C2');
  });

  test('maps easing to --ease-signature', () => {
    const result = resolveTokens(tokens);
    expect(result.cssVars['--ease-signature']).toBe('cubic-bezier(0.65, 0.05, 0, 1)');
  });

  test('maps spacing values with kebab-to-camel for template context', () => {
    const result = resolveTokens(tokens);
    expect(result.templateContext.spacing.sectionGap).toBe('clamp(100px, 15vw, 280px)');
    expect(result.templateContext.spacing.contentPadding).toBe('clamp(20px, 5vw, 80px)');
  });

  test('generates font face entries', () => {
    const result = resolveTokens(tokens);
    expect(result.fontFaces).toHaveLength(3);
    expect(result.fontFaces[0]).toMatchObject({ family: 'Editorial New', weight: 300 });
  });

  test('font face file names are slugified', () => {
    const result = resolveTokens(tokens);
    expect(result.fontFaces[0].file).toBe('editorial-new-300.woff2');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/generator-server && npx vitest run tests/token-resolver.test.ts`
Expected: FAIL

- [ ] **Step 3: Write token-resolver.ts**

```typescript
import type { DesignTokens } from '@awwwards-agent/manifest';
import type { CSSVarMap, FontFace } from './types';

export interface ResolvedTokens {
  readonly cssVars: CSSVarMap;
  readonly fontFaces: readonly FontFace[];
  readonly templateContext: {
    readonly colors: DesignTokens['colors'];
    readonly fonts: {
      readonly display: { readonly family: string };
      readonly body: { readonly family: string };
      readonly mono: { readonly family: string };
    };
    readonly easing: string;
    readonly spacing: {
      readonly sectionGap: string;
      readonly contentPadding: string;
    };
    readonly fontFaces: readonly FontFace[];
  };
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function resolveTokens(tokens: DesignTokens): ResolvedTokens {
  const cssVars: Record<string, string> = {};

  for (const [key, value] of Object.entries(tokens.colors)) {
    cssVars[`--color-${key}`] = value;
  }

  cssVars['--ease-signature'] = tokens.easing;
  cssVars['--section-gap'] = tokens.spacing['section-gap'];
  cssVars['--content-padding'] = tokens.spacing['content-padding'];

  const fontRoles = ['display', 'body', 'mono'] as const;
  const fontFaces: FontFace[] = fontRoles.map((role) => ({
    family: tokens.fonts[role].family,
    weight: tokens.fonts[role].weight,
    file: `${slugify(tokens.fonts[role].family)}-${tokens.fonts[role].weight}.woff2`,
  }));

  return {
    cssVars,
    fontFaces,
    templateContext: {
      colors: tokens.colors,
      fonts: {
        display: { family: tokens.fonts.display.family },
        body: { family: tokens.fonts.body.family },
        mono: { family: tokens.fonts.mono.family },
      },
      easing: tokens.easing,
      spacing: {
        sectionGap: tokens.spacing['section-gap'],
        contentPadding: tokens.spacing['content-padding'],
      },
      fontFaces,
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/generator-server && npx vitest run tests/token-resolver.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/generator-server/src/token-resolver.ts mcp/generator-server/tests/token-resolver.test.ts
git commit -m "feat: add token resolver for CSS custom properties"
```

---

### Task 14: Layout registry

**Files:**
- Create: `mcp/generator-server/src/layout-registry.ts`
- Create: `mcp/generator-server/tests/layout-registry.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, test, expect } from 'vitest';
import { createLayoutRegistry } from '../src/layout-registry';
import { resolve } from 'path';

const TEMPLATE_DIR = resolve(__dirname, '../../../templates');

describe('createLayoutRegistry', () => {
  test('loads template from filesystem', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    expect(reg.has('split-asymmetric')).toBe(true);
  });

  test('lists all 7 available layouts', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    const names = reg.list();
    expect(names).toContain('split-asymmetric');
    expect(names).toContain('bento-grid');
    expect(names).toContain('footer-bar');
    expect(names).toHaveLength(7);
  });

  test('renders template with content context', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    const html = reg.render('split-asymmetric', {
      sectionId: 'section-0-hero',
      sectionAttrs: '',
      headlineAttrs: 'data-primitive="char-reveal"',
      sublineAttrs: '', itemAttrs: '', valueAttrs: '',
      assetHtml: '<div class="gradient"></div>',
      content: { headline: { text: 'ABSENCE' }, subline: { text: 'Sub' }, body: 'Body text.' },
    });
    expect(html).toContain('ABSENCE');
    expect(html).toContain('data-primitive="char-reveal"');
    expect(html).toContain('class="split"');
  });

  test('throws for unknown layout name', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    expect(() => reg.render('hero-gradient', {} as any)).toThrow(/unknown layout/i);
  });

  test('renders base layout template', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    const html = reg.renderBase({
      title: 'Test Project',
      sectionImports: [{ name: 'Section0Hero', file: 'Section0Hero.astro' }],
      sectionComponents: [{ name: 'Section0Hero' }],
      fontPreloads: [{ file: 'inter-400.woff2' }],
    });
    expect(html).toContain('<title>Test Project</title>');
    expect(html).toContain('Section0Hero');
  });

  test('renders global.css template', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    const css = reg.renderGlobalCSS({
      colors: { bg: '#0A0A0C', text: '#E8E6E1', accent: '#7BA7C2', muted: '#6B6B6B', surface: '#141416', border: '#2A2A2C' },
      easing: 'cubic-bezier(0.65, 0.05, 0, 1)',
      spacing: { sectionGap: 'clamp(100px, 15vw, 280px)', contentPadding: 'clamp(20px, 5vw, 80px)' },
      fonts: { display: { family: 'Ed New' }, body: { family: 'Inter' }, mono: { family: 'JBM' } },
      fontFaces: [{ family: 'Ed New', weight: 300, file: 'ed-new-300.woff2' }],
    });
    expect(css).toContain('--color-bg: #0A0A0C');
    expect(css).toContain('--ease-signature');
    expect(css).toContain('@font-face');
  });

  test('renders main.ts template', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    const ts = reg.renderMainTS({
      primitiveImports: [
        { importName: 'charReveal', file: 'char-reveal' },
        { importName: 'scrollAway', file: 'scroll-away' },
      ],
    });
    expect(ts).toContain("import { charReveal }");
    expect(ts).toContain('registry.register(charReveal)');
    expect(ts).toContain('Lenis');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/generator-server && npx vitest run tests/layout-registry.test.ts`
Expected: FAIL

- [ ] **Step 3: Write layout-registry.ts**

```typescript
import Handlebars from 'handlebars';
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';

export interface LayoutRegistry {
  has(name: string): boolean;
  list(): readonly string[];
  render(layoutName: string, context: Record<string, unknown>): string;
  renderBase(context: Record<string, unknown>): string;
  renderGlobalCSS(context: Record<string, unknown>): string;
  renderMainTS(context: Record<string, unknown>): string;
}

function compileTemplate(filePath: string): HandlebarsTemplateDelegate {
  const source = readFileSync(filePath, 'utf-8');
  return Handlebars.compile(source, { noEscape: false });
}

export function createLayoutRegistry(templateDir: string): LayoutRegistry {
  const componentsDir = join(templateDir, 'components');
  const layoutsDir = join(templateDir, 'layouts');
  const stylesDir = join(templateDir, 'styles');
  const scriptsDir = join(templateDir, 'scripts');

  const templates = new Map<string, HandlebarsTemplateDelegate>();

  const files = readdirSync(componentsDir).filter((f) => f.endsWith('.astro.hbs'));
  for (const file of files) {
    const name = basename(file, '.astro.hbs');
    templates.set(name, compileTemplate(join(componentsDir, file)));
  }

  const baseTemplate = compileTemplate(join(layoutsDir, 'base.astro.hbs'));
  const globalCSSTemplate = compileTemplate(join(stylesDir, 'global.css.hbs'));
  const mainTSTemplate = compileTemplate(join(scriptsDir, 'main.ts.hbs'));

  return {
    has(name: string): boolean {
      return templates.has(name);
    },

    list(): readonly string[] {
      return [...templates.keys()];
    },

    render(layoutName: string, context: Record<string, unknown>): string {
      const template = templates.get(layoutName);
      if (!template) {
        throw new Error(`Unknown layout: "${layoutName}". Available: ${[...templates.keys()].join(', ')}`);
      }
      return template(context);
    },

    renderBase(context: Record<string, unknown>): string {
      return baseTemplate(context);
    },

    renderGlobalCSS(context: Record<string, unknown>): string {
      return globalCSSTemplate(context);
    },

    renderMainTS(context: Record<string, unknown>): string {
      return mainTSTemplate(context);
    },
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/generator-server && npx vitest run tests/layout-registry.test.ts`
Expected: 7 tests PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/generator-server/src/layout-registry.ts mcp/generator-server/tests/layout-registry.test.ts
git commit -m "feat: add layout registry with Handlebars template rendering"
```

---

### Task 15: Asset resolver + primitive wirer

**Files:**
- Create: `mcp/generator-server/src/asset-resolver.ts`
- Create: `mcp/generator-server/src/primitive-wirer.ts`
- Create: `mcp/generator-server/tests/asset-resolver.test.ts`
- Create: `mcp/generator-server/tests/primitive-wirer.test.ts`

- [ ] **Step 1: Write asset-resolver.test.ts**

```typescript
import { describe, test, expect } from 'vitest';
import { resolveAssets } from '../src/asset-resolver';
import type { AssetConfig } from '@awwwards-agent/manifest';

describe('resolveAssets', () => {
  test('resolves css asset to inline div with gradient', () => {
    const assets: AssetConfig[] = [
      { slot: 'hero-media', type: 'css', gradient: 'radial-gradient(circle, red, blue)' },
    ];
    const result = resolveAssets(assets);
    expect(result[0].slot).toBe('hero-media');
    expect(result[0].html).toContain('style="background:');
    expect(result[0].html).toContain('radial-gradient');
  });

  test('resolves provided asset to img tag', () => {
    const assets: AssetConfig[] = [
      { slot: 'product', type: 'provided', path: 'assets/watch.jpg' },
    ];
    const result = resolveAssets(assets);
    expect(result[0].html).toContain('<img');
    expect(result[0].html).toContain('/assets/watch.jpg');
  });

  test('resolves generated asset to placeholder div', () => {
    const assets: AssetConfig[] = [
      { slot: 'hero-bg', type: 'generated', prompt: 'Dark studio shot' },
    ];
    const result = resolveAssets(assets);
    expect(result[0].html).toContain('data-asset-placeholder');
  });

  test('returns empty array for no assets', () => {
    expect(resolveAssets([])).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Write primitive-wirer.test.ts**

```typescript
import { describe, test, expect } from 'vitest';
import { wirePrimitives } from '../src/primitive-wirer';
import type { ManifestSection } from '@awwwards-agent/manifest';

describe('wirePrimitives', () => {
  test('wires headline primitive from content.headline.anim', () => {
    const section: ManifestSection = {
      type: 'hero', layout: 'split-asymmetric',
      content: { headline: { text: 'TEST', anim: 'char-reveal', stagger: 0.02 } },
      primitives: [{ type: 'char-reveal', stagger: 0.02, direction: 'left' }],
      assets: [],
    };
    const result = wirePrimitives(section);
    expect(result.headlineAttrs).toContain('data-primitive="char-reveal"');
    expect(result.headlineAttrs).toContain('data-stagger="0.02"');
    expect(result.headlineAttrs).toContain('data-direction="left"');
  });

  test('wires section-level primitive to section wrapper', () => {
    const section: ManifestSection = {
      type: 'hero', layout: 'split-asymmetric',
      content: { headline: { text: 'TEST' } },
      primitives: [{ type: 'scroll-away', rotateX: -2, scale: 0.92 }],
      assets: [],
    };
    const result = wirePrimitives(section);
    expect(result.sectionAttrs).toContain('data-primitive="scroll-away"');
    expect(result.sectionAttrs).toContain('data-rotate-x="-2"');
  });

  test('handles section with no primitives', () => {
    const section: ManifestSection = {
      type: 'basic', layout: 'full-bleed-type',
      content: { headline: { text: 'TEST' } },
      primitives: [], assets: [],
    };
    const result = wirePrimitives(section);
    expect(result.sectionAttrs).toBe('');
    expect(result.headlineAttrs).toBe('');
  });

  test('converts camelCase config keys to kebab-case attributes', () => {
    const section: ManifestSection = {
      type: 'hero', layout: 'split-asymmetric',
      content: {},
      primitives: [{ type: 'scroll-away', rotateX: -2, yPercent: 10 }],
      assets: [],
    };
    const result = wirePrimitives(section);
    expect(result.sectionAttrs).toContain('data-rotate-x=');
    expect(result.sectionAttrs).toContain('data-y-percent=');
  });

  test('wires fade-up on items when present', () => {
    const section: ManifestSection = {
      type: 'specs', layout: 'bento-grid',
      content: { items: [{ label: 'Case', value: '41mm' }] },
      primitives: [{ type: 'fade-up', y: 40 }],
      assets: [],
    };
    const result = wirePrimitives(section);
    expect(result.itemAttrs).toContain('data-primitive="fade-up"');
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cd mcp/generator-server && npx vitest run tests/asset-resolver.test.ts tests/primitive-wirer.test.ts`
Expected: FAIL

- [ ] **Step 4: Write asset-resolver.ts**

```typescript
import type { AssetConfig } from '@awwwards-agent/manifest';
import type { ResolvedAsset } from './types';

export function resolveAssets(assets: readonly AssetConfig[]): readonly ResolvedAsset[] {
  return assets.map((asset) => ({
    slot: asset.slot,
    html: renderAssetHTML(asset),
  }));
}

function renderAssetHTML(asset: AssetConfig): string {
  switch (asset.type) {
    case 'css': {
      const gradient = (asset as Record<string, unknown>).gradient as string | undefined;
      return `<div class="asset asset--css" style="background: ${gradient ?? ''}; position: absolute; inset: 0;"></div>`;
    }
    case 'provided': {
      const path = (asset as Record<string, unknown>).path as string | undefined;
      return `<img class="asset asset--provided" src="/${path ?? ''}" alt="" loading="lazy" />`;
    }
    case 'generated': {
      const prompt = (asset as Record<string, unknown>).prompt as string | undefined;
      return `<div class="asset asset--placeholder" data-asset-placeholder data-prompt="${prompt ?? ''}"></div>`;
    }
    default:
      return '';
  }
}
```

- [ ] **Step 5: Write primitive-wirer.ts**

```typescript
import type { ManifestSection, PrimitiveConfig } from '@awwwards-agent/manifest';
import type { WiredSection } from './types';
import { SECTION_LEVEL_PRIMITIVES } from './types';

function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function buildDataAttrs(config: PrimitiveConfig): string {
  const { type, ...rest } = config;
  const attrs = [`data-primitive="${type}"`];
  for (const [key, value] of Object.entries(rest)) {
    attrs.push(`data-${camelToKebab(key)}="${value}"`);
  }
  return attrs.join(' ');
}

export function wirePrimitives(section: ManifestSection): WiredSection {
  const used = new Set<string>();
  let headlineAttrs = '';
  let sublineAttrs = '';
  let itemAttrs = '';
  let valueAttrs = '';

  const headlineAnim = section.content.headline?.anim;
  if (headlineAnim) {
    const config = section.primitives.find((p) => p.type === headlineAnim);
    if (config) {
      headlineAttrs = buildDataAttrs(config);
      used.add(headlineAnim);
    }
  }

  const sublineAnim = section.content.subline?.anim;
  if (sublineAnim) {
    const config = section.primitives.find((p) => p.type === sublineAnim);
    if (config) {
      sublineAttrs = buildDataAttrs(config);
      used.add(sublineAnim);
    }
  }

  const remaining = section.primitives.filter((p) => !used.has(p.type));
  const sectionLevel = remaining.filter((p) => SECTION_LEVEL_PRIMITIVES.has(p.type));
  const contentLevel = remaining.filter((p) => !SECTION_LEVEL_PRIMITIVES.has(p.type));

  const sectionAttrs = sectionLevel.length > 0 ? buildDataAttrs(sectionLevel[0]) : '';

  if (contentLevel.length > 0) {
    const fadeOrEntrance = contentLevel.find((p) => p.type === 'fade-up');
    if (fadeOrEntrance) itemAttrs = buildDataAttrs(fadeOrEntrance);
    const counterPrim = contentLevel.find((p) => p.type === 'counter');
    if (counterPrim) valueAttrs = buildDataAttrs(counterPrim);
  }

  return { sectionAttrs, headlineAttrs, sublineAttrs, itemAttrs, valueAttrs };
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd mcp/generator-server && npx vitest run tests/asset-resolver.test.ts tests/primitive-wirer.test.ts`
Expected: 9 tests PASS

- [ ] **Step 7: Commit**

```bash
git add mcp/generator-server/src/asset-resolver.ts mcp/generator-server/src/primitive-wirer.ts mcp/generator-server/tests/asset-resolver.test.ts mcp/generator-server/tests/primitive-wirer.test.ts
git commit -m "feat: add asset resolver and primitive wirer"
```

---

### Task 16: Tree-shaker

**Files:**
- Create: `mcp/generator-server/src/tree-shaker.ts`
- Create: `mcp/generator-server/tests/tree-shaker.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, test, expect } from 'vitest';
import { extractUsedPrimitives, getPrimitiveImportName } from '../src/tree-shaker';

describe('extractUsedPrimitives', () => {
  test('extracts single primitive from HTML', () => {
    const result = extractUsedPrimitives(['<h1 data-primitive="char-reveal">Hello</h1>']);
    expect(result).toEqual(new Set(['char-reveal']));
  });

  test('extracts multiple primitives from one file', () => {
    const html = '<section data-primitive="scroll-away"><h1 data-primitive="char-reveal">Hi</h1></section>';
    expect(extractUsedPrimitives([html])).toEqual(new Set(['char-reveal', 'scroll-away']));
  });

  test('deduplicates across files', () => {
    const files = ['<h1 data-primitive="fade-up">A</h1>', '<h2 data-primitive="fade-up">B</h2>'];
    expect(extractUsedPrimitives(files)).toEqual(new Set(['fade-up']));
  });

  test('returns empty set for no primitives', () => {
    expect(extractUsedPrimitives(['<div>Hello</div>']).size).toBe(0);
  });
});

describe('getPrimitiveImportName', () => {
  test('converts kebab-case to camelCase', () => {
    expect(getPrimitiveImportName('char-reveal')).toBe('charReveal');
    expect(getPrimitiveImportName('scroll-away')).toBe('scrollAway');
  });

  test('handles single-word primitives', () => {
    expect(getPrimitiveImportName('cursor')).toBe('cursor');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/generator-server && npx vitest run tests/tree-shaker.test.ts`
Expected: FAIL

- [ ] **Step 3: Write tree-shaker.ts**

```typescript
const PRIMITIVE_REGEX = /data-primitive="([^"]+)"/g;

export function extractUsedPrimitives(htmlContents: readonly string[]): ReadonlySet<string> {
  const used = new Set<string>();
  for (const html of htmlContents) {
    const regex = new RegExp(PRIMITIVE_REGEX.source, 'g');
    let match: RegExpExecArray | null;
    while ((match = regex.exec(html)) !== null) {
      used.add(match[1]);
    }
  }
  return used;
}

export function getPrimitiveImportName(kebabName: string): string {
  return kebabName.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/generator-server && npx vitest run tests/tree-shaker.test.ts`
Expected: 6 tests PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/generator-server/src/tree-shaker.ts mcp/generator-server/tests/tree-shaker.test.ts
git commit -m "feat: add primitive tree-shaker"
```

---

### Task 17: Font resolver

**Files:**
- Create: `mcp/generator-server/src/font-resolver.ts`
- Create: `mcp/generator-server/tests/font-resolver.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { resolveFonts } from '../src/font-resolver';
import type { FontFace } from '../src/types';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

beforeEach(() => { mockFetch.mockReset(); });

describe('resolveFonts', () => {
  test('downloads font from src URL', async () => {
    const fonts: FontFace[] = [{ family: 'Custom', weight: 400, file: 'custom-400.woff2' }];
    const srcs = { display: { family: 'Custom', weight: 400, src: 'https://example.com/custom.woff2' } };
    mockFetch.mockResolvedValueOnce({ ok: true, arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)) });

    const result = await resolveFonts(fonts, srcs);
    expect(result[0].source).toBe('url');
    expect(mockFetch).toHaveBeenCalledWith('https://example.com/custom.woff2');
  });

  test('uses Google Fonts API when no src provided', async () => {
    const fonts: FontFace[] = [{ family: 'Inter', weight: 400, file: 'inter-400.woff2' }];
    const srcs = { display: { family: 'Inter', weight: 400 } };
    mockFetch.mockResolvedValueOnce({
      ok: true, text: () => Promise.resolve('src: url(https://fonts.gstatic.com/s/inter/v18/abc.woff2)'),
    });
    mockFetch.mockResolvedValueOnce({ ok: true, arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)) });

    const result = await resolveFonts(fonts, srcs);
    expect(result[0].source).toBe('google');
  });

  test('handles fetch failure gracefully', async () => {
    const fonts: FontFace[] = [{ family: 'Missing', weight: 400, file: 'missing-400.woff2' }];
    const srcs = { display: { family: 'Missing', weight: 400, src: 'https://example.com/bad.woff2' } };
    mockFetch.mockResolvedValueOnce({ ok: false, status: 404 });

    const result = await resolveFonts(fonts, srcs);
    expect(result[0].source).toBe('failed');
    expect(result[0].data).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/generator-server && npx vitest run tests/font-resolver.test.ts`
Expected: FAIL

- [ ] **Step 3: Write font-resolver.ts**

```typescript
import type { FontFace, FontResolution } from './types';
import type { FontSpec } from '@awwwards-agent/manifest';
import { readFileSync } from 'fs';
import { join } from 'path';

interface FontSrcMap {
  readonly [role: string]: FontSpec;
}

const GOOGLE_FONTS_CSS_URL = 'https://fonts.googleapis.com/css2';
const WOFF2_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0';

async function downloadFromURL(url: string): Promise<ArrayBuffer | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return res.arrayBuffer();
  } catch {
    return null;
  }
}

function tryBundledFont(family: string, weight: number, bundledDir: string): ArrayBuffer | null {
  try {
    const slug = family.toLowerCase().replace(/\s+/g, '-');
    const fileName = `${slug}-${weight}.woff2`;
    const filePath = join(bundledDir, fileName);
    const buffer = readFileSync(filePath);
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  } catch {
    return null;
  }
}

async function downloadFromGoogleFonts(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `${GOOGLE_FONTS_CSS_URL}?family=${encodeURIComponent(family)}:wght@${weight}`;
    const cssRes = await fetch(cssUrl, { headers: { 'User-Agent': WOFF2_UA } });
    if (!cssRes.ok) return null;

    const css = await cssRes.text();
    const urlMatch = css.match(/url\(([^)]+\.woff2)\)/);
    if (!urlMatch) return null;

    return downloadFromURL(urlMatch[1]);
  } catch {
    return null;
  }
}

export async function resolveFonts(
  fontFaces: readonly FontFace[],
  fontSrcs: FontSrcMap,
  bundledDir?: string,
): Promise<readonly FontResolution[]> {
  const results: FontResolution[] = [];

  for (const face of fontFaces) {
    const spec = Object.values(fontSrcs).find(
      (s) => s.family === face.family && s.weight === face.weight,
    );

    // Tier 1: Direct src URL
    if (spec?.src) {
      const data = await downloadFromURL(spec.src);
      results.push({
        file: face.file, family: face.family, weight: face.weight,
        source: data ? 'url' : 'failed', data,
      });
      continue;
    }

    // Tier 2: Bundled fonts
    if (bundledDir) {
      const data = tryBundledFont(face.family, face.weight, bundledDir);
      if (data) {
        results.push({
          file: face.file, family: face.family, weight: face.weight,
          source: 'bundled', data,
        });
        continue;
      }
    }

    // Tier 3: Google Fonts API
    const data = await downloadFromGoogleFonts(face.family, face.weight);
    results.push({
      file: face.file, family: face.family, weight: face.weight,
      source: data ? 'google' : 'failed', data,
    });
  }

  return results;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/generator-server && npx vitest run tests/font-resolver.test.ts`
Expected: 3 tests PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/generator-server/src/font-resolver.ts mcp/generator-server/tests/font-resolver.test.ts
git commit -m "feat: add font resolver with Google Fonts fallback"
```

---

### Task 18: Section emitter + project emitter

**Files:**
- Create: `mcp/generator-server/src/section-emitter.ts`
- Create: `mcp/generator-server/src/project-emitter.ts`
- Create: `mcp/generator-server/tests/section-emitter.test.ts`
- Create: `mcp/generator-server/tests/project-emitter.test.ts`

- [ ] **Step 1: Write section-emitter.test.ts**

```typescript
import { describe, test, expect } from 'vitest';
import { emitSection, sectionComponentName } from '../src/section-emitter';
import { createLayoutRegistry } from '../src/layout-registry';
import { resolve } from 'path';
import type { ManifestSection, DesignTokens } from '@awwwards-agent/manifest';

const TEMPLATE_DIR = resolve(__dirname, '../../../templates');
const tokens: DesignTokens = {
  colors: { bg: '#0A0A0C', text: '#E8E6E1', accent: '#7BA7C2', muted: '#6B6B6B', surface: '#141416', border: '#2A2A2C' },
  fonts: { display: { family: 'T', weight: 300 }, body: { family: 'T', weight: 400 }, mono: { family: 'T', weight: 400 } },
  easing: 'cubic-bezier(0.65, 0.05, 0, 1)',
  spacing: { 'section-gap': 'clamp(100px, 15vw, 280px)', 'content-padding': 'clamp(20px, 5vw, 80px)' },
};

describe('sectionComponentName', () => {
  test('generates name from index and type', () => {
    expect(sectionComponentName(0, 'hero')).toBe('Section0Hero');
    expect(sectionComponentName(1, 'specs')).toBe('Section1Specs');
  });
});

describe('emitSection', () => {
  test('emits Astro component with correct path', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    const section: ManifestSection = {
      type: 'hero', layout: 'split-asymmetric',
      content: { headline: { text: 'HELLO' } }, primitives: [], assets: [],
    };
    const result = emitSection(reg, 0, section, tokens);
    expect(result.path).toBe('src/components/Section0Hero.astro');
    expect(result.content).toContain('HELLO');
  });

  test('wires primitives into output', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    const section: ManifestSection = {
      type: 'hero', layout: 'split-asymmetric',
      content: { headline: { text: 'X', anim: 'char-reveal' } },
      primitives: [{ type: 'char-reveal', stagger: 0.02 }], assets: [],
    };
    const result = emitSection(reg, 0, section, tokens);
    expect(result.content).toContain('data-primitive="char-reveal"');
  });

  test('resolves assets into template', () => {
    const reg = createLayoutRegistry(TEMPLATE_DIR);
    const section: ManifestSection = {
      type: 'hero', layout: 'split-asymmetric',
      content: { headline: { text: 'X' } }, primitives: [],
      assets: [{ slot: 'hero-media', type: 'css', gradient: 'linear-gradient(red, blue)' }],
    };
    const result = emitSection(reg, 0, section, tokens);
    expect(result.content).toContain('linear-gradient');
  });
});
```

- [ ] **Step 2: Write project-emitter.test.ts**

```typescript
import { describe, test, expect } from 'vitest';
import { emitPackageJson, emitAstroConfig, emitTsConfig } from '../src/project-emitter';

describe('emitPackageJson', () => {
  test('includes astro and gsap dependencies', () => {
    const pkg = JSON.parse(emitPackageJson('Test').content);
    expect(pkg.dependencies.astro).toBeDefined();
    expect(pkg.dependencies.gsap).toBeDefined();
  });
});

describe('emitAstroConfig', () => {
  test('exports defineConfig', () => {
    expect(emitAstroConfig().content).toContain('defineConfig');
  });
});

describe('emitTsConfig', () => {
  test('targets ES2022', () => {
    expect(JSON.parse(emitTsConfig().content).compilerOptions.target).toBe('ES2022');
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cd mcp/generator-server && npx vitest run tests/section-emitter.test.ts tests/project-emitter.test.ts`
Expected: FAIL

- [ ] **Step 4: Write section-emitter.ts**

```typescript
import type { ManifestSection, DesignTokens } from '@awwwards-agent/manifest';
import type { GeneratedFile } from './types';
import type { LayoutRegistry } from './layout-registry';
import { wirePrimitives } from './primitive-wirer';
import { resolveAssets } from './asset-resolver';

export function sectionComponentName(index: number, type: string): string {
  const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
  return `Section${index}${capitalized}`;
}

export function emitSection(
  registry: LayoutRegistry,
  index: number,
  section: ManifestSection,
  tokens: DesignTokens,
): GeneratedFile {
  const wired = wirePrimitives(section);
  const assets = resolveAssets(section.assets);
  const assetHtml = assets.map((a) => a.html).join('\n    ');

  const content = registry.render(section.layout, {
    sectionId: `section-${index}-${section.type}`,
    sectionAttrs: wired.sectionAttrs,
    headlineAttrs: wired.headlineAttrs,
    sublineAttrs: wired.sublineAttrs,
    itemAttrs: wired.itemAttrs,
    valueAttrs: wired.valueAttrs,
    assetHtml,
    content: section.content,
  });

  const name = sectionComponentName(index, section.type);
  return { path: `src/components/${name}.astro`, content };
}
```

- [ ] **Step 5: Write project-emitter.ts**

```typescript
import type { GeneratedFile } from './types';

export function emitPackageJson(projectName: string): GeneratedFile {
  const pkg = {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    type: 'module',
    version: '0.0.1',
    scripts: { dev: 'astro dev', build: 'astro build', preview: 'astro preview' },
    dependencies: {
      astro: '^5.7.0', gsap: '^3.14.0', lenis: '^1.3.0', 'split-type': '^0.3.0',
    },
    devDependencies: { typescript: '^5.9.0' },
  };
  return { path: 'package.json', content: JSON.stringify(pkg, null, 2) };
}

export function emitAstroConfig(): GeneratedFile {
  return {
    path: 'astro.config.mjs',
    content: `import { defineConfig } from 'astro/config';\n\nexport default defineConfig({});\n`,
  };
}

export function emitTsConfig(): GeneratedFile {
  const config = {
    compilerOptions: {
      target: 'ES2022', module: 'ES2022', moduleResolution: 'bundler',
      strict: true, esModuleInterop: true, skipLibCheck: true, jsx: 'preserve',
    },
    include: ['src'],
  };
  return { path: 'tsconfig.json', content: JSON.stringify(config, null, 2) };
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run: `cd mcp/generator-server && npx vitest run tests/section-emitter.test.ts tests/project-emitter.test.ts`
Expected: 8 tests PASS

- [ ] **Step 7: Commit**

```bash
git add mcp/generator-server/src/section-emitter.ts mcp/generator-server/src/project-emitter.ts mcp/generator-server/tests/section-emitter.test.ts mcp/generator-server/tests/project-emitter.test.ts
git commit -m "feat: add section emitter and project emitter"
```

---

## Chunk 4: Pipeline + MCP Server

### Task 19: Pipeline orchestrator

**Files:**
- Create: `mcp/generator-server/src/pipeline.ts`
- Create: `mcp/generator-server/tests/pipeline.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { generate } from '../src/pipeline';
import { resolve } from 'path';
import validManifest from '../../../packages/manifest-schema/tests/fixtures/valid-manifest.json';
import type { Manifest } from '@awwwards-agent/manifest';

const TEMPLATE_DIR = resolve(__dirname, '../../../templates');

// Mock font resolver to avoid network calls
vi.mock('../src/font-resolver', () => ({
  resolveFonts: vi.fn().mockResolvedValue([
    { file: 'editorial-new-300.woff2', family: 'Editorial New', weight: 300, source: 'failed', data: null },
    { file: 'inter-400.woff2', family: 'Inter', weight: 400, source: 'failed', data: null },
    { file: 'jetbrains-mono-400.woff2', family: 'JetBrains Mono', weight: 400, source: 'failed', data: null },
  ]),
}));

describe('generate', () => {
  test('produces output files for valid manifest', async () => {
    const result = await generate({
      manifest: validManifest as Manifest,
      outputDir: '/tmp/test-output',
      templateDir: TEMPLATE_DIR,
    });
    expect(result.files.length).toBeGreaterThan(0);
  });

  test('generates section components matching manifest sections', async () => {
    const result = await generate({
      manifest: validManifest as Manifest,
      outputDir: '/tmp/test-output',
      templateDir: TEMPLATE_DIR,
    });
    const componentFiles = result.files.filter((f) => f.path.startsWith('src/components/'));
    expect(componentFiles).toHaveLength(2); // hero + specs
    expect(componentFiles[0].path).toBe('src/components/Section0Hero.astro');
    expect(componentFiles[1].path).toBe('src/components/Section1Specs.astro');
  });

  test('generates base layout with section imports', async () => {
    const result = await generate({
      manifest: validManifest as Manifest,
      outputDir: '/tmp/test-output',
      templateDir: TEMPLATE_DIR,
    });
    const baseLayout = result.files.find((f) => f.path.includes('BaseLayout'));
    expect(baseLayout).toBeDefined();
    expect(baseLayout!.content).toContain('Section0Hero');
    expect(baseLayout!.content).toContain('Section1Specs');
  });

  test('generates global.css with tokens', async () => {
    const result = await generate({
      manifest: validManifest as Manifest,
      outputDir: '/tmp/test-output',
      templateDir: TEMPLATE_DIR,
    });
    const css = result.files.find((f) => f.path.includes('global.css'));
    expect(css).toBeDefined();
    expect(css!.content).toContain('--color-bg: #0A0A0C');
  });

  test('generates main.ts with discovered primitives', async () => {
    const result = await generate({
      manifest: validManifest as Manifest,
      outputDir: '/tmp/test-output',
      templateDir: TEMPLATE_DIR,
    });
    const mainTs = result.files.find((f) => f.path.includes('main.ts'));
    expect(mainTs).toBeDefined();
    expect(mainTs!.content).toContain('Lenis');
  });

  test('tree-shakes to only used primitives', async () => {
    const result = await generate({
      manifest: validManifest as Manifest,
      outputDir: '/tmp/test-output',
      templateDir: TEMPLATE_DIR,
    });
    // The manifest uses char-reveal, scroll-away, fade-up, counter, cursor, preloader
    expect(result.usedPrimitives.has('char-reveal')).toBe(true);
    expect(result.usedPrimitives.has('tilt')).toBe(false);
  });

  test('generates project scaffolding files', async () => {
    const result = await generate({
      manifest: validManifest as Manifest,
      outputDir: '/tmp/test-output',
      templateDir: TEMPLATE_DIR,
    });
    const paths = result.files.map((f) => f.path);
    expect(paths).toContain('package.json');
    expect(paths).toContain('astro.config.mjs');
    expect(paths).toContain('tsconfig.json');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/generator-server && npx vitest run tests/pipeline.test.ts`
Expected: FAIL

- [ ] **Step 3: Write pipeline.ts**

```typescript
import type { Manifest } from '@awwwards-agent/manifest';
import { validateManifest } from '@awwwards-agent/manifest';
import type { GeneratedFile, GeneratorOptions, GeneratorResult } from './types';
import { resolveTokens } from './token-resolver';
import { createLayoutRegistry } from './layout-registry';
import { emitSection, sectionComponentName } from './section-emitter';
import { emitPackageJson, emitAstroConfig, emitTsConfig } from './project-emitter';
import { extractUsedPrimitives, getPrimitiveImportName } from './tree-shaker';
import { resolveFonts } from './font-resolver';
import { readFileSync } from 'fs';
import { join } from 'path';

// Map primitive names to their source file names in @awwwards-agent/primitives
const CORE_PRIMITIVE_FILES = ['event-bus', 'registry', 'parse-config', 'types'];

export async function generate(options: GeneratorOptions): Promise<GeneratorResult> {
  const { manifest, outputDir, templateDir, primitivesDir } = options;

  // 1. Validate
  const validation = validateManifest(manifest);
  if (!validation.success) {
    throw new Error(
      `Manifest validation failed:\n${validation.errors.map((e) => `  - ${e.path}: ${e.message}`).join('\n')}`,
    );
  }

  const files: GeneratedFile[] = [];

  // 2. Resolve tokens
  const resolved = resolveTokens(manifest.tokens);

  // 3. Create layout registry
  const registry = createLayoutRegistry(templateDir);

  // 4. Emit section components
  for (let i = 0; i < manifest.sections.length; i++) {
    const file = emitSection(registry, i, manifest.sections[i], manifest.tokens);
    files.push(file);
  }

  // 5. Tree-shake primitives
  const sectionHtmls = files.map((f) => f.content);
  const usedFromSections = extractUsedPrimitives(sectionHtmls);
  const usedPrimitives = new Set(usedFromSections);
  for (const prim of manifest.global.primitives) {
    usedPrimitives.add(prim.type);
  }

  // 6. Copy primitive source files (tree-shaken)
  if (primitivesDir) {
    // Copy core infrastructure files
    for (const core of CORE_PRIMITIVE_FILES) {
      try {
        const src = readFileSync(join(primitivesDir, `${core}.ts`), 'utf-8');
        files.push({ path: `src/scripts/primitives/${core}.ts`, content: src });
      } catch { /* skip missing */ }
    }
    // Copy only used primitive modules
    for (const name of usedPrimitives) {
      try {
        const src = readFileSync(join(primitivesDir, `primitives/${name}.ts`), 'utf-8');
        files.push({ path: `src/scripts/primitives/${name}.ts`, content: src });
      } catch { /* skip missing */ }
    }
  }

  // 7. Generate main.ts
  const primitiveImports = [...usedPrimitives].map((name) => ({
    importName: getPrimitiveImportName(name),
    file: name,
  }));
  const mainTs = registry.renderMainTS({ primitiveImports });
  files.push({ path: 'src/scripts/main.ts', content: mainTs });

  // 8. Generate global.css
  const globalCSS = registry.renderGlobalCSS(resolved.templateContext);
  files.push({ path: 'src/styles/global.css', content: globalCSS });

  // 9. Generate base layout
  const sectionImports = manifest.sections.map((s, i) => {
    const name = sectionComponentName(i, s.type);
    return { name, file: `${name}.astro` };
  });
  const sectionComponents = sectionImports.map((s) => ({ name: s.name }));
  const baseLayout = registry.renderBase({
    title: manifest.meta.name,
    sectionImports,
    sectionComponents,
    fontPreloads: resolved.fontFaces,
  });
  files.push({ path: 'src/layouts/BaseLayout.astro', content: baseLayout });

  // 10. Generate index page
  files.push({ path: 'src/pages/index.astro', content: `---\nimport BaseLayout from '../layouts/BaseLayout.astro';\n---\n\n<BaseLayout />\n` });

  // 11. Resolve fonts and emit font files
  const fontSrcs = manifest.tokens.fonts;
  const fontResolutions = await resolveFonts(resolved.fontFaces, fontSrcs, primitivesDir);
  const fontFiles: string[] = [];
  for (const fontRes of fontResolutions) {
    fontFiles.push(fontRes.file);
    // Font binary data is written separately by the MCP server (not as GeneratedFile)
  }

  // 12. Copy provided assets to public/assets/
  for (const section of manifest.sections) {
    for (const asset of section.assets) {
      if (asset.type === 'provided' && (asset as Record<string, unknown>).path) {
        const assetPath = (asset as Record<string, unknown>).path as string;
        // Record the asset path — actual file copy handled by MCP server
        files.push({ path: `public/${assetPath}`, content: `<!-- placeholder: copy from ${assetPath} -->` });
      }
    }
  }

  // 13. Emit project scaffolding
  files.push(emitPackageJson(manifest.meta.name));
  files.push(emitAstroConfig());
  files.push(emitTsConfig());

  return { files, usedPrimitives, fontFiles, fontResolutions };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/generator-server && npx vitest run tests/pipeline.test.ts`
Expected: 7 tests PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/generator-server/src/pipeline.ts mcp/generator-server/tests/pipeline.test.ts
git commit -m "feat: add pipeline orchestrator for code generation"
```

---

### Task 20: MCP server

**Files:**
- Create: `mcp/generator-server/src/server.ts`
- Create: `mcp/generator-server/tests/server.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
import { describe, test, expect, vi } from 'vitest';
import { createGeneratorServer } from '../src/server';

// Mock the pipeline to avoid actual generation
vi.mock('../src/pipeline', () => ({
  generate: vi.fn().mockResolvedValue({
    files: [{ path: 'package.json', content: '{}' }],
    usedPrimitives: new Set(['char-reveal']),
    fontFiles: ['inter-400.woff2'],
    fontResolutions: [
      { file: 'inter-400.woff2', family: 'Inter', weight: 400, source: 'google', data: null },
    ],
  }),
}));

describe('createGeneratorServer', () => {
  test('creates server with correct name', () => {
    const server = createGeneratorServer('/tmp/templates');
    expect(server).toBeDefined();
    expect(server.name).toBe('awwwards-generator');
  });

  test('server object has McpServer instance', () => {
    const server = createGeneratorServer('/tmp/templates');
    expect(server.server).toBeDefined();
  });

  test('accepts optional primitivesDir', () => {
    const server = createGeneratorServer('/tmp/templates', '/tmp/primitives');
    expect(server).toBeDefined();
    expect(server.name).toBe('awwwards-generator');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/generator-server && npx vitest run tests/server.test.ts`
Expected: FAIL

- [ ] **Step 3: Write server.ts**

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { generate } from './pipeline';
import { manifestSchema } from '@awwwards-agent/manifest';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

export interface GeneratorServer {
  readonly name: string;
  readonly server: McpServer;
}

export function createGeneratorServer(templateDir: string, primitivesDir?: string): GeneratorServer {
  const server = new McpServer({
    name: 'awwwards-generator',
    version: '0.1.0',
  });

  server.tool(
    'generate',
    'Generate an Astro project from an Awwwards manifest',
    {
      manifest: manifestSchema.describe('The Awwwards manifest JSON object'),
      outputDir: z.string().describe('Directory to write generated files to'),
    },
    async ({ manifest, outputDir }) => {
      const result = await generate({
        manifest,
        outputDir,
        templateDir,
        primitivesDir,
      });

      // Write text files to disk
      for (const file of result.files) {
        const fullPath = join(outputDir, file.path);
        mkdirSync(dirname(fullPath), { recursive: true });
        writeFileSync(fullPath, file.content, 'utf-8');
      }

      // Write font binaries to public/fonts/
      for (const fontRes of result.fontResolutions) {
        if (fontRes.data) {
          const fontPath = join(outputDir, 'public/fonts', fontRes.file);
          mkdirSync(dirname(fontPath), { recursive: true });
          writeFileSync(fontPath, Buffer.from(fontRes.data));
        }
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({
              filesGenerated: result.files.length,
              usedPrimitives: [...result.usedPrimitives],
              fontFiles: result.fontFiles,
              fontsResolved: result.fontResolutions.filter((f) => f.data !== null).length,
              outputDir,
            }),
          },
        ],
      };
    },
  );

  return { name: 'awwwards-generator', server };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/generator-server && npx vitest run tests/server.test.ts`
Expected: 3 tests PASS

- [ ] **Step 5: Write index.ts entry point**

```typescript
export { createGeneratorServer } from './server';
export { generate } from './pipeline';
export type { GeneratorOptions, GeneratorResult, GeneratedFile, FontResolution } from './types';
```

- [ ] **Step 6: Commit**

```bash
git add mcp/generator-server/src/server.ts mcp/generator-server/src/index.ts mcp/generator-server/tests/server.test.ts
git commit -m "feat: add MCP server exposing generate tool"
```

---

### Task 21: Integration test

**Files:**
- Create: `mcp/generator-server/tests/fixtures/sample-manifest.json` (copy from manifest-schema fixtures)
- Modify: `mcp/generator-server/tests/pipeline.test.ts` (already exists — add integration assertions)

- [ ] **Step 1: Copy test fixture**

Copy `packages/manifest-schema/tests/fixtures/valid-manifest.json` to `mcp/generator-server/tests/fixtures/sample-manifest.json`.

- [ ] **Step 2: Run full test suite for generator-server**

Run: `cd mcp/generator-server && npx vitest run`
Expected: All tests PASS (~40 tests across 8 test files)

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd mcp/generator-server && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Run manifest-schema tests to verify no regressions**

Run: `cd packages/manifest-schema && npx vitest run`
Expected: All 32 tests PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/generator-server/tests/fixtures/
git commit -m "test: add integration test fixtures"
```

---

### Task 22: Final cleanup + commit

**Files:**
- Verify: all packages build and test
- Create: `mcp/generator-server/.gitignore`

- [ ] **Step 1: Create .gitignore**

```
node_modules/
dist/
```

- [ ] **Step 2: Run all tests across both packages**

Run: `cd packages/manifest-schema && npx vitest run && cd ../../mcp/generator-server && npx vitest run`
Expected: All tests PASS

- [ ] **Step 3: Commit**

```bash
git add mcp/generator-server/.gitignore
git commit -m "chore: finalize manifest-schema and generator-server packages"
```
