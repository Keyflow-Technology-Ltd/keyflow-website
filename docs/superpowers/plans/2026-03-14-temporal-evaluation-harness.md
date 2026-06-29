# Temporal Evaluation Harness Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an MCP server that uses Playwright to temporally evaluate generated Awwwards-level sites against 15 scoring dimensions, returning a weighted score card with actionable fix suggestions.

**Architecture:** Pure checker functions operate on extracted `PageData` (no Playwright dependency), making them fully unit-testable. A thin Playwright layer handles extraction and temporal capture. The MCP server exposes a single `evaluate` tool that orchestrates the full pipeline. LLM-judged dimensions (D11, D13) return screenshot data + placeholder scores for the Agent Pipeline's Evaluation Agent to finalize.

**Tech Stack:** TypeScript, Playwright, Vitest, `@modelcontextprotocol/sdk`, Zod

---

## File Structure

```
mcp/evaluation-server/
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── src/
│   ├── types.ts                          # All interfaces: PageData, TemporalData, DimensionScore, EvaluationResult
│   ├── checkers/
│   │   ├── utils.ts                      # Shared severity() helper
│   │   ├── css-checkers.ts               # D2 Easing, D5 Color, D9 Font Loading, D15 CSS Architecture
│   │   ├── dom-checkers.ts               # D1 Typography, D7 Text Animation, D8 Spatial Rhythm
│   │   ├── scroll-checkers.ts            # D3 Scroll Architecture, D10 Scroll-Away, D12 Page Transitions
│   │   ├── interaction-checkers.ts       # D4 Entrance Choreography, D6 Hover Completeness
│   │   ├── performance-checker.ts        # D14 Performance
│   │   └── llm-checkers.ts              # D11 Interactive Signature, D13 Mobile Strategy (placeholders)
│   ├── scorer.ts                         # Weighted scoring engine + threshold logic
│   ├── extractor.ts                      # Playwright page.evaluate → PageData
│   ├── capture.ts                        # Temporal capture protocol (scroll, hover, preloader)
│   ├── pipeline.ts                       # Orchestrator: capture → extract → check → score
│   ├── server.ts                         # MCP server with `evaluate` tool
│   ├── main.ts                           # Entry point: wires StdioServerTransport
│   └── index.ts                          # Barrel exports
└── tests/
    ├── fixtures/
    │   ├── test-page.html                # Minimal page with known properties for integration tests
    │   └── make-page-data.ts             # Shared PageData factory for tests
    ├── css-checkers.test.ts
    ├── dom-checkers.test.ts
    ├── scroll-checkers.test.ts
    ├── interaction-checkers.test.ts
    ├── performance-checker.test.ts
    ├── llm-checkers.test.ts
    ├── scorer.test.ts
    ├── extractor.test.ts
    ├── capture.test.ts
    ├── pipeline.test.ts
    └── server.test.ts
```

---

## Chunk 1: Foundation — Types, CSS/DOM Checkers, Scorer

### Task 1: Project Scaffolding

**Files:**
- Create: `mcp/evaluation-server/package.json`
- Create: `mcp/evaluation-server/tsconfig.json`
- Create: `mcp/evaluation-server/vitest.config.ts`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "@awwwards-agent/evaluation-server",
  "version": "0.1.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest run",
    "test:watch": "vitest",
    "start": "node dist/main.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.0",
    "playwright": "^1.52.0",
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

- [ ] **Step 4: Install dependencies**

Run: `cd mcp/evaluation-server && npm install`
Expected: `node_modules/` created, no errors

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/package.json mcp/evaluation-server/tsconfig.json mcp/evaluation-server/vitest.config.ts mcp/evaluation-server/package-lock.json
git commit -m "chore: scaffold evaluation-server package"
```

---

### Task 2: Core Types

**Files:**
- Create: `mcp/evaluation-server/src/types.ts`
- Create: `mcp/evaluation-server/tests/types.test.ts`

- [ ] **Step 1: Write the failing test**

```typescript
// tests/types.test.ts
import { describe, it, expect } from 'vitest';
import type {
  PageData,
  TemporalData,
  ScrollSnapshot,
  HoverProbe,
  DimensionScore,
  EvaluationResult,
  FontFaceInfo,
  ElementMeasurement,
  Severity,
  DimensionName,
} from '../src/types';
import {
  DIMENSION_WEIGHTS,
  DIMENSION_NAMES,
  SCORE_THRESHOLDS,
} from '../src/types';

describe('types', () => {
  it('exports all 15 dimension names', () => {
    expect(DIMENSION_NAMES).toHaveLength(15);
  });

  it('dimension weights sum to 1.0', () => {
    const sum = Object.values(DIMENSION_WEIGHTS).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1.0, 5);
  });

  it('every dimension has a weight', () => {
    for (const name of DIMENSION_NAMES) {
      expect(DIMENSION_WEIGHTS[name]).toBeGreaterThan(0);
    }
  });

  it('exports score thresholds', () => {
    expect(SCORE_THRESHOLDS.critical).toBe(5);
    expect(SCORE_THRESHOLDS.warning).toBe(7);
    expect(SCORE_THRESHOLDS.pass).toBe(7.5);
    expect(SCORE_THRESHOLDS.maxIterations).toBe(5);
  });

  it('PageData type is constructible', () => {
    const data: Partial<PageData> = {
      cssCustomProperties: new Map([['--ease-signature', 'cubic-bezier(0.65,0.05,0,1)']]),
      bodyFontSize: 18,
      hasLenis: true,
    };
    expect(data.cssCustomProperties).toBeDefined();
  });

  it('DimensionScore type is constructible', () => {
    const score: DimensionScore = {
      dimension: 'typography_scale',
      dimensionNumber: 1,
      score: 8,
      details: 'Display: 120px, body: 18px',
      severity: 'info',
    };
    expect(score.score).toBe(8);
  });

  it('EvaluationResult type is constructible', () => {
    const result: EvaluationResult = {
      overall: 7.8,
      dimensions: [],
      failures: [],
      pass: true,
      iteration: 1,
    };
    expect(result.pass).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/types.test.ts`
Expected: FAIL — cannot find module `../src/types`

- [ ] **Step 3: Write types implementation**

```typescript
// src/types.ts

// --- Dimension Names & Weights ---

export const DIMENSION_NAMES = [
  'typography_scale',
  'easing_identity',
  'scroll_architecture',
  'entrance_choreography',
  'color_discipline',
  'hover_completeness',
  'text_animation',
  'spatial_rhythm',
  'font_loading',
  'scroll_away',
  'interactive_signature',
  'page_transitions',
  'mobile_strategy',
  'performance',
  'css_architecture',
] as const;

export type DimensionName = (typeof DIMENSION_NAMES)[number];

export const DIMENSION_WEIGHTS: Readonly<Record<DimensionName, number>> = {
  typography_scale: 0.10,
  scroll_architecture: 0.10,
  entrance_choreography: 0.10,
  interactive_signature: 0.10,
  easing_identity: 0.08,
  text_animation: 0.08,
  color_discipline: 0.06,
  hover_completeness: 0.06,
  spatial_rhythm: 0.06,
  scroll_away: 0.06,
  font_loading: 0.04,
  page_transitions: 0.04,
  mobile_strategy: 0.04,
  performance: 0.04,
  css_architecture: 0.04,
};

export const SCORE_THRESHOLDS = {
  critical: 5,
  warning: 7,
  pass: 7.5,
  maxIterations: 5,
} as const;

// --- Severity ---

export type Severity = 'critical' | 'warning' | 'info';

// --- Font & Element Info ---

export interface FontFaceInfo {
  readonly family: string;
  readonly src: string;
  readonly display: string;
  readonly weight: string;
}

export interface ElementMeasurement {
  readonly tag: string;
  readonly fontSize: number;
  readonly lineHeight: number;
  readonly fontFamily: string;
  readonly selector: string;
}

// --- Page Data (static extraction) ---

export interface PageData {
  // CSS layer
  readonly cssCustomProperties: ReadonlyMap<string, string>;
  readonly allTransitionValues: readonly string[];
  readonly allAnimationValues: readonly string[];
  readonly allColorValues: readonly string[];
  readonly fontFaceDeclarations: readonly FontFaceInfo[];
  readonly externalStylesheetHrefs: readonly string[];
  readonly hasHiddenScrollbar: boolean;
  readonly hasAntialiasing: boolean;
  readonly hasSelectionStyling: boolean;
  readonly hasBoxSizingBorderBox: boolean;
  readonly hasHoverMediaQuery: boolean;

  // DOM layer
  readonly headlineElements: readonly ElementMeasurement[];
  readonly bodyFontSize: number;
  readonly fontFamiliesUsed: readonly string[];
  readonly sectionGaps: readonly number[];
  readonly usesClampForGaps: boolean;
  readonly usesClampForFonts: boolean;

  // Text animation layer
  readonly hasSplitTypeLib: boolean;
  readonly charLevelElements: number;
  readonly clipPathOnLines: number;
  readonly dataAnimAttributes: readonly string[];
  readonly staggerMs: number | null;

  // Script detection layer
  readonly hasLenis: boolean;
  readonly hasGSAP: boolean;
  readonly hasScrollTrigger: boolean;
  readonly hasScrubTrue: boolean;
  readonly hasVelocityReactive: boolean;
  readonly hasCompileAsync: boolean;
  readonly hasDPRCap: boolean;
  readonly hasRenderGates: boolean;
  readonly pageTransitionLib: string | null;
  readonly hasClipPathTransition: boolean;
  readonly hasCanvasTransition: boolean;

  // Preloader layer
  readonly hasPreloader: boolean;
  readonly preloaderTracksProgress: boolean;
  readonly scrollLockedDuringPreload: boolean;

  // Performance layer
  readonly lcp: number;
  readonly cls: number;

  // Metadata
  readonly viewportWidth: number;
  readonly viewportHeight: number;
  readonly totalScrollHeight: number;
}

// --- Temporal Data ---

export interface ScrollSnapshot {
  readonly scrollPercent: number;
  readonly heroTransform: {
    readonly scale: number;
    readonly rotate: number;
    readonly translateY: number;
    readonly opacity: number;
  } | null;
  readonly screenshot?: Buffer;
}

export interface HoverProbe {
  readonly selector: string;
  readonly changed: boolean;
  readonly screenshotBefore?: Buffer;
  readonly screenshotAfter?: Buffer;
}

export interface TemporalData {
  readonly scrollSnapshots: readonly ScrollSnapshot[];
  readonly hoverProbes: readonly HoverProbe[];
  readonly preloaderScreenshots: readonly Buffer[];
}

// --- Scoring Output ---

export interface DimensionScore {
  readonly dimension: DimensionName;
  readonly dimensionNumber: number;
  readonly score: number;
  readonly details: string;
  readonly fix?: string;
  readonly severity: Severity;
}

export interface EvaluationResult {
  readonly overall: number;
  readonly dimensions: readonly DimensionScore[];
  readonly failures: readonly DimensionScore[];
  readonly pass: boolean;
  readonly iteration: number;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/types.test.ts`
Expected: PASS (all 7 tests)

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/types.ts mcp/evaluation-server/tests/types.test.ts
git commit -m "feat: add core types for evaluation harness"
```

---

### Task 3: CSS Checkers (D2, D5, D9, D15)

**Files:**
- Create: `mcp/evaluation-server/src/checkers/utils.ts`
- Create: `mcp/evaluation-server/tests/fixtures/make-page-data.ts`
- Create: `mcp/evaluation-server/src/checkers/css-checkers.ts`
- Create: `mcp/evaluation-server/tests/css-checkers.test.ts`

These are pure functions: `(data: PageData) => DimensionScore`. No Playwright dependency.

- [ ] **Step 1: Create shared checker utility**

```typescript
// src/checkers/utils.ts
import type { Severity } from '../types';
import { SCORE_THRESHOLDS } from '../types';

export function severity(score: number): Severity {
  if (score < SCORE_THRESHOLDS.critical) return 'critical';
  if (score < SCORE_THRESHOLDS.warning) return 'warning';
  return 'info';
}
```

- [ ] **Step 2: Create shared test fixture**

```typescript
// tests/fixtures/make-page-data.ts
import type { PageData } from '../../src/types';

export function makePageData(overrides: Partial<PageData>): PageData {
  return {
    cssCustomProperties: new Map(),
    allTransitionValues: [],
    allAnimationValues: [],
    allColorValues: [],
    fontFaceDeclarations: [],
    externalStylesheetHrefs: [],
    hasHiddenScrollbar: false,
    hasAntialiasing: false,
    hasSelectionStyling: false,
    hasBoxSizingBorderBox: false,
    hasHoverMediaQuery: false,
    headlineElements: [],
    bodyFontSize: 16,
    fontFamiliesUsed: [],
    sectionGaps: [],
    usesClampForGaps: false,
    usesClampForFonts: false,
    hasSplitTypeLib: false,
    charLevelElements: 0,
    clipPathOnLines: 0,
    dataAnimAttributes: [],
    staggerMs: null,
    hasLenis: false,
    hasGSAP: false,
    hasScrollTrigger: false,
    hasScrubTrue: false,
    hasVelocityReactive: false,
    hasCompileAsync: false,
    hasDPRCap: false,
    hasRenderGates: false,
    pageTransitionLib: null,
    hasClipPathTransition: false,
    hasCanvasTransition: false,
    hasPreloader: false,
    preloaderTracksProgress: false,
    scrollLockedDuringPreload: false,
    lcp: 3000,
    cls: 0.1,
    viewportWidth: 1440,
    viewportHeight: 900,
    totalScrollHeight: 5000,
    ...overrides,
  };
}
```

- [ ] **Step 3: Write failing tests**

```typescript
// tests/css-checkers.test.ts
import { describe, it, expect } from 'vitest';
import {
  checkEasingIdentity,
  checkColorDiscipline,
  checkFontLoading,
  checkCSSArchitecture,
} from '../src/checkers/css-checkers';
import { makePageData } from './fixtures/make-page-data';

describe('checkEasingIdentity (D2)', () => {
  it('scores 10 for single custom curve as CSS var used everywhere', () => {
    const data = makePageData({
      cssCustomProperties: new Map([
        ['--ease-signature', 'cubic-bezier(0.65,0.05,0,1)'],
        ['--duration-default', '0.75s'],
      ]),
      allTransitionValues: [
        'transform 0.75s cubic-bezier(0.65,0.05,0,1)',
        'opacity 0.75s cubic-bezier(0.65,0.05,0,1)',
      ],
      allAnimationValues: [],
    });
    const result = checkEasingIdentity(data);
    expect(result.score).toBeGreaterThanOrEqual(9);
    expect(result.dimension).toBe('easing_identity');
  });

  it('scores 0-2 for ease-out everywhere', () => {
    const data = makePageData({
      allTransitionValues: ['transform 0.3s ease-out', 'opacity 0.3s ease-out'],
    });
    const result = checkEasingIdentity(data);
    expect(result.score).toBeLessThanOrEqual(2);
  });

  it('scores low when no easing var defined', () => {
    const data = makePageData({
      allTransitionValues: ['transform 0.5s cubic-bezier(0.4,0,0.2,1)'],
    });
    const result = checkEasingIdentity(data);
    expect(result.score).toBeLessThanOrEqual(6);
  });
});

describe('checkColorDiscipline (D5)', () => {
  it('scores 10 for 3 tinted colors, no pure B/W', () => {
    const data = makePageData({
      allColorValues: ['#0C1311', '#F2F2F0', '#C8FF00'],
      hasSelectionStyling: true,
    });
    const result = checkColorDiscipline(data);
    expect(result.score).toBeGreaterThanOrEqual(9);
  });

  it('scores critical for pure #FFFFFF', () => {
    const data = makePageData({
      allColorValues: ['#0C1311', '#FFFFFF', '#C8FF00'],
    });
    const result = checkColorDiscipline(data);
    expect(result.score).toBeLessThanOrEqual(4);
    expect(result.severity).toBe('critical');
  });

  it('scores critical for pure #000000', () => {
    const data = makePageData({
      allColorValues: ['#000000', '#F2F2F0'],
    });
    const result = checkColorDiscipline(data);
    expect(result.score).toBeLessThanOrEqual(4);
  });

  it('scores low for 5+ distinct colors', () => {
    const data = makePageData({
      allColorValues: ['#111', '#222', '#333', '#444', '#555', '#F00'],
    });
    const result = checkColorDiscipline(data);
    expect(result.score).toBeLessThanOrEqual(4);
  });
});

describe('checkFontLoading (D9)', () => {
  it('scores 10 for self-hosted WOFF2 with block and variable weight', () => {
    const data = makePageData({
      fontFaceDeclarations: [
        { family: 'Mona Sans', src: '/fonts/mona.woff2', display: 'block', weight: '100 900' },
      ],
      externalStylesheetHrefs: [],
      fontFamiliesUsed: ['Mona Sans'],
    });
    const result = checkFontLoading(data);
    expect(result.score).toBeGreaterThanOrEqual(8);
  });

  it('scores critical for Google Fonts CDN', () => {
    const data = makePageData({
      externalStylesheetHrefs: ['https://fonts.googleapis.com/css2?family=Inter'],
    });
    const result = checkFontLoading(data);
    expect(result.score).toBeLessThanOrEqual(2);
    expect(result.severity).toBe('critical');
  });

  it('scores low for font-display: swap', () => {
    const data = makePageData({
      fontFaceDeclarations: [
        { family: 'Inter', src: '/fonts/inter.woff2', display: 'swap', weight: '400' },
      ],
    });
    const result = checkFontLoading(data);
    expect(result.score).toBeLessThanOrEqual(4);
  });
});

describe('checkCSSArchitecture (D15)', () => {
  it('scores 10 for full CSS var system with all features', () => {
    const data = makePageData({
      cssCustomProperties: new Map([
        ['--ease-signature', 'cubic-bezier(0.65,0.05,0,1)'],
        ['--color-bg', '#0C1311'],
        ['--color-text', '#F2F2F0'],
        ['--section-gap', 'clamp(100px,15vw,280px)'],
        ['--text-display', 'clamp(3rem,10vw,12rem)'],
        ['--duration-default', '0.75s'],
      ]),
      hasHiddenScrollbar: true,
      hasAntialiasing: true,
      hasSelectionStyling: true,
      hasBoxSizingBorderBox: true,
      hasHoverMediaQuery: true,
    });
    const result = checkCSSArchitecture(data);
    expect(result.score).toBeGreaterThanOrEqual(9);
  });

  it('scores 0-2 for no CSS vars at all', () => {
    const data = makePageData({});
    const result = checkCSSArchitecture(data);
    expect(result.score).toBeLessThanOrEqual(2);
  });
});
```

- [ ] **Step 4: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/css-checkers.test.ts`
Expected: FAIL — cannot find module

- [ ] **Step 5: Implement CSS checkers**

```typescript
// src/checkers/css-checkers.ts
import type { PageData, DimensionScore } from '../types';
import { severity } from './utils';

const GENERIC_EASINGS = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];
const PURE_BLACK_WHITE = [
  '#fff', '#ffffff', '#000', '#000000',
  'rgb(255,255,255)', 'rgb(255, 255, 255)',
  'rgb(0,0,0)', 'rgb(0, 0, 0)',
  '#FFF', '#FFFFFF',
];

function extractEasingsFromValues(values: readonly string[]): string[] {
  const easings: string[] = [];
  for (const val of values) {
    const cubicMatches = val.match(/cubic-bezier\([^)]+\)/g);
    if (cubicMatches) easings.push(...cubicMatches);
    for (const generic of GENERIC_EASINGS) {
      if (val.includes(generic)) easings.push(generic);
    }
  }
  return easings;
}

export function checkEasingIdentity(data: PageData): DimensionScore {
  const allEasings = extractEasingsFromValues([
    ...data.allTransitionValues,
    ...data.allAnimationValues,
  ]);

  const hasEaseVar = data.cssCustomProperties.has('--ease-signature')
    || data.cssCustomProperties.has('--ease')
    || data.cssCustomProperties.has('--cubic-default');

  const hasGeneric = allEasings.some((e) => GENERIC_EASINGS.includes(e));
  const customCurves = allEasings.filter((e) => e.startsWith('cubic-bezier'));
  const uniqueCustom = new Set(customCurves.map((c) => c.replace(/\s/g, '')));
  const hasDurationVar = [...data.cssCustomProperties.keys()].some((k) =>
    k.includes('duration'),
  );

  let score = 0;

  if (allEasings.length === 0) {
    score = 0;
  } else if (hasGeneric && !hasEaseVar) {
    score = 2;
  } else if (uniqueCustom.size > 0 && !hasEaseVar) {
    score = hasGeneric ? 4 : 6;
  } else if (hasEaseVar && !hasGeneric) {
    score = hasDurationVar ? 10 : 8;
  } else if (hasEaseVar && hasGeneric) {
    score = 6;
  }

  const details = [
    hasEaseVar ? 'Easing CSS var found' : 'No easing CSS var',
    `${uniqueCustom.size} custom curve(s)`,
    hasGeneric ? 'Generic easing detected (bad)' : 'No generic easing',
    hasDurationVar ? 'Duration var found' : '',
  ].filter(Boolean).join('. ');

  return {
    dimension: 'easing_identity',
    dimensionNumber: 2,
    score,
    details,
    fix: score < 7 ? 'tokens.easing' : undefined,
    severity: severity(score),
  };
}

function normalizeColor(color: string): string {
  return color.toLowerCase().replace(/\s/g, '');
}

function isPureBlackWhite(color: string): boolean {
  const normalized = normalizeColor(color);
  return PURE_BLACK_WHITE.some((bw) => normalizeColor(bw) === normalized);
}

function uniqueHues(colors: readonly string[]): number {
  const unique = new Set(colors.map(normalizeColor));
  return unique.size;
}

export function checkColorDiscipline(data: PageData): DimensionScore {
  const colors = data.allColorValues;
  const hasPureBW = colors.some(isPureBlackWhite);
  const hueCount = uniqueHues(colors);

  let score = 0;
  const issues: string[] = [];

  if (hueCount === 0) {
    score = 0;
    issues.push('No colors found');
  } else if (hueCount <= 3 && !hasPureBW) {
    score = data.hasSelectionStyling ? 10 : 8;
    issues.push(`${hueCount} tinted colors — excellent`);
  } else if (hueCount <= 3 && hasPureBW) {
    score = 4;
    const offending = colors.filter(isPureBlackWhite);
    issues.push(`Pure B/W found: ${offending.join(', ')}`);
  } else if (hueCount <= 5) {
    score = hasPureBW ? 2 : 4;
    issues.push(`${hueCount} distinct colors — too many`);
    if (hasPureBW) issues.push('Pure B/W found');
  } else {
    score = 0;
    issues.push(`${hueCount} distinct colors — far too many`);
  }

  return {
    dimension: 'color_discipline',
    dimensionNumber: 5,
    score,
    details: issues.join('. '),
    fix: score < 7 ? 'tokens.colors' : undefined,
    severity: severity(score),
  };
}

export function checkFontLoading(data: PageData): DimensionScore {
  const hasGoogleCDN = data.externalStylesheetHrefs.some(
    (href) => href.includes('fonts.googleapis.com') || href.includes('fonts.gstatic.com'),
  );

  if (hasGoogleCDN) {
    return {
      dimension: 'font_loading',
      dimensionNumber: 9,
      score: 2,
      details: 'Google Fonts CDN detected — must self-host',
      fix: 'tokens.fonts[].src',
      severity: 'critical',
    };
  }

  const faces = data.fontFaceDeclarations;
  const allWoff2 = faces.length > 0 && faces.every((f) => f.src.includes('.woff2'));
  const allBlock = faces.length > 0 && faces.every((f) => f.display === 'block');
  const hasVariable = faces.some((f) => f.weight.includes(' '));
  const familyCount = data.fontFamiliesUsed.length;

  let score = 0;

  if (faces.length === 0) {
    score = 0;
  } else if (!allWoff2) {
    score = 4;
  } else if (!allBlock) {
    score = 4;
  } else if (familyCount > 3) {
    score = 6;
  } else {
    score = hasVariable ? 10 : 8;
  }

  const details = [
    `${faces.length} @font-face declarations`,
    allWoff2 ? 'All WOFF2' : 'Non-WOFF2 fonts found',
    allBlock ? 'font-display: block' : 'font-display not block',
    `${familyCount} font families`,
    hasVariable ? 'Variable font detected' : '',
  ].filter(Boolean).join('. ');

  return {
    dimension: 'font_loading',
    dimensionNumber: 9,
    score,
    details,
    fix: score < 7 ? 'tokens.fonts' : undefined,
    severity: severity(score),
  };
}

export function checkCSSArchitecture(data: PageData): DimensionScore {
  const varCount = data.cssCustomProperties.size;
  const vars = data.cssCustomProperties;

  const hasEasingVar = [...vars.keys()].some((k) => k.includes('ease') || k.includes('cubic'));
  const hasColorVar = [...vars.keys()].some((k) => k.includes('color'));
  const hasSpacingVar = [...vars.keys()].some((k) =>
    k.includes('gap') || k.includes('spacing') || k.includes('padding'),
  );
  const hasTypoVar = [...vars.keys()].some((k) =>
    k.includes('font') || k.includes('text') || k.includes('display'),
  );
  const hasDurationVar = [...vars.keys()].some((k) => k.includes('duration'));

  const categories = [hasEasingVar, hasColorVar, hasSpacingVar, hasTypoVar, hasDurationVar]
    .filter(Boolean).length;

  let score = 0;

  if (varCount === 0) {
    score = 0;
  } else if (categories <= 1) {
    score = 4;
  } else if (categories <= 2) {
    score = 6;
  } else {
    const bonuses = [
      data.hasHiddenScrollbar,
      data.hasAntialiasing,
      data.hasSelectionStyling,
      data.hasBoxSizingBorderBox,
      data.hasHoverMediaQuery,
    ].filter(Boolean).length;

    score = Math.min(10, 6 + categories + bonuses);
  }

  const details = [
    `${varCount} CSS custom properties`,
    `Categories covered: ${categories}/5 (easing, color, spacing, typography, duration)`,
    data.hasHiddenScrollbar ? 'Scrollbar hidden' : 'Scrollbar visible',
    data.hasAntialiasing ? 'Antialiased' : 'No antialiasing',
  ].join('. ');

  return {
    dimension: 'css_architecture',
    dimensionNumber: 15,
    score,
    details,
    fix: score < 7 ? 'tokens' : undefined,
    severity: severity(score),
  };
}
```

- [ ] **Step 6: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/css-checkers.test.ts`
Expected: PASS (all tests)

- [ ] **Step 7: Commit**

```bash
git add mcp/evaluation-server/src/checkers/utils.ts mcp/evaluation-server/tests/fixtures/make-page-data.ts mcp/evaluation-server/src/checkers/css-checkers.ts mcp/evaluation-server/tests/css-checkers.test.ts
git commit -m "feat: add shared checker utils, test fixture, and CSS checkers (D2, D5, D9, D15)"
```

---

### Task 4: DOM Checkers (D1, D7, D8)

**Files:**
- Create: `mcp/evaluation-server/src/checkers/dom-checkers.ts`
- Create: `mcp/evaluation-server/tests/dom-checkers.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/dom-checkers.test.ts
import { describe, it, expect } from 'vitest';
import {
  checkTypographyScale,
  checkTextAnimation,
  checkSpatialRhythm,
} from '../src/checkers/dom-checkers';
import { makePageData } from './fixtures/make-page-data';

describe('checkTypographyScale (D1)', () => {
  it('scores 10 for fluid display 120px+, body 18px+, self-hosted, clamp', () => {
    const data = makePageData({
      headlineElements: [
        { tag: 'h1', fontSize: 144, lineHeight: 0.88, fontFamily: 'Mona Sans', selector: 'h1' },
      ],
      bodyFontSize: 18,
      fontFamiliesUsed: ['Mona Sans', 'Inter'],
      usesClampForFonts: true,
      fontFaceDeclarations: [
        { family: 'Mona Sans', src: '/fonts/mona.woff2', display: 'block', weight: '100 900' },
      ],
    });
    const result = checkTypographyScale(data);
    expect(result.score).toBeGreaterThanOrEqual(8);
  });

  it('scores 0 for fixed 14px body, no headlines', () => {
    const data = makePageData({ bodyFontSize: 14, headlineElements: [] });
    const result = checkTypographyScale(data);
    expect(result.score).toBeLessThanOrEqual(2);
  });

  it('scores mid for good sizes but no clamp', () => {
    const data = makePageData({
      headlineElements: [
        { tag: 'h1', fontSize: 80, lineHeight: 1.0, fontFamily: 'Arial', selector: 'h1' },
      ],
      bodyFontSize: 17,
      fontFamiliesUsed: ['Arial'],
      usesClampForFonts: false,
    });
    const result = checkTypographyScale(data);
    expect(result.score).toBeGreaterThanOrEqual(4);
    expect(result.score).toBeLessThanOrEqual(7);
  });
});

describe('checkTextAnimation (D7)', () => {
  it('scores 10 for SplitType + char-level + clip-path + 20ms stagger', () => {
    const data = makePageData({
      hasSplitTypeLib: true,
      charLevelElements: 3,
      clipPathOnLines: 5,
      staggerMs: 20,
    });
    const result = checkTextAnimation(data);
    expect(result.score).toBeGreaterThanOrEqual(9);
  });

  it('scores 0 for no text animation', () => {
    const data = makePageData({});
    const result = checkTextAnimation(data);
    expect(result.score).toBeLessThanOrEqual(2);
  });

  it('scores mid for word-level only', () => {
    const data = makePageData({
      dataAnimAttributes: ['fade-up'],
      charLevelElements: 0,
    });
    const result = checkTextAnimation(data);
    expect(result.score).toBeLessThanOrEqual(4);
  });
});

describe('checkSpatialRhythm (D8)', () => {
  it('scores 10 for 200px+ gaps with clamp', () => {
    const data = makePageData({
      sectionGaps: [200, 240, 180],
      usesClampForGaps: true,
    });
    const result = checkSpatialRhythm(data);
    expect(result.score).toBeGreaterThanOrEqual(9);
  });

  it('scores 0 for uniform 40px gaps', () => {
    const data = makePageData({
      sectionGaps: [40, 40, 40],
    });
    const result = checkSpatialRhythm(data);
    expect(result.score).toBeLessThanOrEqual(2);
  });

  it('scores mid for 120px gaps without clamp', () => {
    const data = makePageData({
      sectionGaps: [120, 130, 110],
      usesClampForGaps: false,
    });
    const result = checkSpatialRhythm(data);
    expect(result.score).toBeGreaterThanOrEqual(4);
    expect(result.score).toBeLessThanOrEqual(7);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/dom-checkers.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement DOM checkers**

```typescript
// src/checkers/dom-checkers.ts
import type { PageData, DimensionScore } from '../types';
import { severity } from './utils';

export function checkTypographyScale(data: PageData): DimensionScore {
  const maxHeadline = data.headlineElements.reduce(
    (max, el) => Math.max(max, el.fontSize), 0,
  );
  const body = data.bodyFontSize;
  const familyCount = data.fontFamiliesUsed.length;
  const selfHosted = data.fontFaceDeclarations.length > 0;

  let score = 0;

  if (maxHeadline === 0 && body < 16) {
    score = 0;
  } else if (body < 17) {
    score = 2;
  } else if (maxHeadline < 72) {
    score = 4;
  } else if (!data.usesClampForFonts) {
    score = 6;
  } else if (maxHeadline >= 72 && body >= 17 && selfHosted && familyCount <= 3) {
    score = maxHeadline >= 120 && body >= 18 ? 10 : 8;
  } else {
    score = 6;
  }

  const details = [
    `Display: ${maxHeadline}px`,
    `Body: ${body}px`,
    `${familyCount} font families`,
    data.usesClampForFonts ? 'Uses clamp()' : 'No clamp()',
    selfHosted ? 'Self-hosted' : 'Not self-hosted',
  ].join('. ');

  return {
    dimension: 'typography_scale',
    dimensionNumber: 1,
    score,
    details,
    fix: score < 7 ? 'tokens.typography' : undefined,
    severity: severity(score),
  };
}

export function checkTextAnimation(data: PageData): DimensionScore {
  const hasSplit = data.hasSplitTypeLib;
  const hasChars = data.charLevelElements > 0;
  const hasClip = data.clipPathOnLines > 0;
  const stagger = data.staggerMs;
  const hasDataAnim = data.dataAnimAttributes.length > 0;

  let score = 0;

  if (!hasDataAnim && !hasSplit && !hasChars) {
    score = 0;
  } else if (hasDataAnim && !hasChars) {
    score = 4;
  } else if (hasChars && !hasSplit) {
    score = 6;
  } else if (hasSplit && hasChars && !hasClip) {
    score = 7;
  } else if (hasSplit && hasChars && hasClip) {
    const goodStagger = stagger !== null && stagger >= 15 && stagger <= 30;
    score = goodStagger ? 10 : 8;
  }

  const details = [
    hasSplit ? 'SplitType detected' : 'No SplitType',
    `${data.charLevelElements} char-level elements`,
    `${data.clipPathOnLines} lines with clip-path`,
    stagger !== null ? `Stagger: ${stagger}ms` : 'No stagger detected',
  ].join('. ');

  return {
    dimension: 'text_animation',
    dimensionNumber: 7,
    score,
    details,
    fix: score < 7 ? 'sections[].content.headline.anim' : undefined,
    severity: severity(score),
  };
}

export function checkSpatialRhythm(data: PageData): DimensionScore {
  const gaps = data.sectionGaps;

  if (gaps.length === 0) {
    return {
      dimension: 'spatial_rhythm',
      dimensionNumber: 8,
      score: 0,
      details: 'No sections found',
      fix: 'sections',
      severity: 'critical',
    };
  }

  const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
  const minGap = Math.min(...gaps);
  const maxGap = Math.max(...gaps);
  const varied = maxGap - minGap > 20;

  let score = 0;

  if (avgGap < 60) {
    score = 0;
  } else if (avgGap < 100) {
    score = 2;
  } else if (avgGap < 140) {
    score = 4;
  } else if (avgGap < 160) {
    score = data.usesClampForGaps ? 6 : 5;
  } else if (avgGap < 200) {
    score = data.usesClampForGaps ? 8 : 7;
  } else {
    score = data.usesClampForGaps && varied ? 10 : 9;
  }

  const details = [
    `Avg gap: ${Math.round(avgGap)}px`,
    `Range: ${minGap}-${maxGap}px`,
    data.usesClampForGaps ? 'Uses clamp()' : 'No clamp()',
    varied ? 'Varied spacing' : 'Uniform spacing',
  ].join('. ');

  return {
    dimension: 'spatial_rhythm',
    dimensionNumber: 8,
    score,
    details,
    fix: score < 7 ? 'tokens.spacing.sectionGap' : undefined,
    severity: severity(score),
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/dom-checkers.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/checkers/dom-checkers.ts mcp/evaluation-server/tests/dom-checkers.test.ts
git commit -m "feat: add DOM checkers for D1 typography, D7 text-animation, D8 spatial-rhythm"
```

---

### Task 5: Weighted Scorer

**Files:**
- Create: `mcp/evaluation-server/src/scorer.ts`
- Create: `mcp/evaluation-server/tests/scorer.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/scorer.test.ts
import { describe, it, expect } from 'vitest';
import { computeResult } from '../src/scorer';
import type { DimensionScore } from '../src/types';
import { DIMENSION_NAMES } from '../src/types';

function makeScore(
  dimension: (typeof DIMENSION_NAMES)[number],
  score: number,
): DimensionScore {
  const idx = DIMENSION_NAMES.indexOf(dimension);
  return {
    dimension,
    dimensionNumber: idx + 1,
    score,
    details: 'test',
    severity: score < 5 ? 'critical' : score < 7 ? 'warning' : 'info',
  };
}

function makeAllScores(defaultScore: number): DimensionScore[] {
  return DIMENSION_NAMES.map((d) => makeScore(d, defaultScore));
}

describe('computeResult', () => {
  it('computes weighted average correctly for uniform scores', () => {
    const result = computeResult(makeAllScores(8), 1);
    expect(result.overall).toBeCloseTo(8.0, 1);
    expect(result.pass).toBe(true);
    expect(result.failures).toHaveLength(0);
  });

  it('fails when average < 7.5', () => {
    const result = computeResult(makeAllScores(6), 1);
    expect(result.overall).toBeCloseTo(6.0, 1);
    expect(result.pass).toBe(false);
  });

  it('fails when any dimension < 5 even if average >= 7.5', () => {
    const scores = makeAllScores(9);
    scores[0] = makeScore('typography_scale', 3);
    const result = computeResult(scores, 1);
    expect(result.pass).toBe(false);
    expect(result.failures).toHaveLength(1);
    expect(result.failures[0].dimension).toBe('typography_scale');
  });

  it('passes at exactly 7.5 with no criticals', () => {
    const result = computeResult(makeAllScores(7.5), 1);
    expect(result.overall).toBeCloseTo(7.5, 1);
    expect(result.pass).toBe(true);
  });

  it('includes iteration number', () => {
    const result = computeResult(makeAllScores(8), 3);
    expect(result.iteration).toBe(3);
  });

  it('identifies all critical failures', () => {
    const scores = makeAllScores(8);
    scores[0] = makeScore('typography_scale', 2);
    scores[4] = makeScore('color_discipline', 4);
    const result = computeResult(scores, 1);
    expect(result.failures).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/scorer.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement scorer**

```typescript
// src/scorer.ts
import type { DimensionScore, EvaluationResult } from './types';
import { DIMENSION_WEIGHTS, SCORE_THRESHOLDS } from './types';

export function computeResult(
  dimensions: readonly DimensionScore[],
  iteration: number,
): EvaluationResult {
  const overall = dimensions.reduce((sum, d) => {
    const weight = DIMENSION_WEIGHTS[d.dimension];
    return sum + d.score * weight;
  }, 0);

  const failures = dimensions.filter((d) => d.score < SCORE_THRESHOLDS.critical);

  const pass = overall >= SCORE_THRESHOLDS.pass && failures.length === 0;

  return {
    overall: Math.round(overall * 100) / 100,
    dimensions,
    failures,
    pass,
    iteration,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/scorer.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/scorer.ts mcp/evaluation-server/tests/scorer.test.ts
git commit -m "feat: add weighted scoring engine with threshold logic"
```

---

## Chunk 2: Remaining Checkers + Extraction

### Task 6: Scroll Checkers (D3, D10, D12)

**Files:**
- Create: `mcp/evaluation-server/src/checkers/scroll-checkers.ts`
- Create: `mcp/evaluation-server/tests/scroll-checkers.test.ts`

D3 and D12 use static PageData. D10 uses TemporalData (hero transforms at different scroll positions).

- [ ] **Step 1: Write failing tests**

```typescript
// tests/scroll-checkers.test.ts
import { describe, it, expect } from 'vitest';
import {
  checkScrollArchitecture,
  checkScrollAway,
  checkPageTransitions,
} from '../src/checkers/scroll-checkers';
import type { TemporalData } from '../src/types';
import { makePageData } from './fixtures/make-page-data';

describe('checkScrollArchitecture (D3)', () => {
  it('scores 10 for Lenis + GSAP + scrub + velocity + render gates', () => {
    const data = makePageData({
      hasLenis: true, hasGSAP: true, hasScrollTrigger: true,
      hasScrubTrue: true, hasVelocityReactive: true, hasRenderGates: true,
    });
    const result = checkScrollArchitecture(data);
    expect(result.score).toBeGreaterThanOrEqual(9);
  });

  it('scores 0 for native scroll only', () => {
    const result = checkScrollArchitecture(makePageData({}));
    expect(result.score).toBe(0);
  });

  it('scores 4 for Lenis + ScrollTrigger but no scrub', () => {
    const data = makePageData({
      hasLenis: true, hasGSAP: true, hasScrollTrigger: true,
    });
    const result = checkScrollArchitecture(data);
    expect(result.score).toBe(4);
  });
});

describe('checkScrollAway (D10)', () => {
  it('scores 10 for hero with rotation + scale + translate via scrub', () => {
    const temporal: TemporalData = {
      scrollSnapshots: [
        { scrollPercent: 0, heroTransform: { scale: 1, rotate: 0, translateY: 0, opacity: 1 } },
        { scrollPercent: 25, heroTransform: { scale: 0.95, rotate: -2, translateY: -50, opacity: 0.8 } },
        { scrollPercent: 55, heroTransform: { scale: 0.9, rotate: -3, translateY: -100, opacity: 0.5 } },
      ],
      hoverProbes: [],
      preloaderScreenshots: [],
    };
    const result = checkScrollAway(makePageData({}), temporal);
    expect(result.score).toBeGreaterThanOrEqual(9);
  });

  it('scores 0 for no hero transform change', () => {
    const temporal: TemporalData = {
      scrollSnapshots: [
        { scrollPercent: 0, heroTransform: { scale: 1, rotate: 0, translateY: 0, opacity: 1 } },
        { scrollPercent: 25, heroTransform: { scale: 1, rotate: 0, translateY: 0, opacity: 1 } },
      ],
      hoverProbes: [],
      preloaderScreenshots: [],
    };
    const result = checkScrollAway(makePageData({}), temporal);
    expect(result.score).toBe(0);
  });

  it('scores 0 when no hero found', () => {
    const temporal: TemporalData = {
      scrollSnapshots: [{ scrollPercent: 0, heroTransform: null }],
      hoverProbes: [],
      preloaderScreenshots: [],
    };
    const result = checkScrollAway(makePageData({}), temporal);
    expect(result.score).toBe(0);
  });
});

describe('checkPageTransitions (D12)', () => {
  it('scores 8 for clip-path transition', () => {
    const data = makePageData({ hasClipPathTransition: true });
    const result = checkPageTransitions(data);
    expect(result.score).toBeGreaterThanOrEqual(6);
  });

  it('scores high for transition library', () => {
    const data = makePageData({ pageTransitionLib: 'swup' });
    const result = checkPageTransitions(data);
    expect(result.score).toBeGreaterThanOrEqual(4);
  });

  it('scores 0 for no transitions', () => {
    const result = checkPageTransitions(makePageData({}));
    expect(result.score).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/scroll-checkers.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement scroll checkers**

```typescript
// src/checkers/scroll-checkers.ts
import type { PageData, TemporalData, DimensionScore } from '../types';
import { severity } from './utils';

export function checkScrollArchitecture(data: PageData): DimensionScore {
  const hasSmooth = data.hasLenis;
  const hasTrigger = data.hasScrollTrigger;
  const hasScrub = data.hasScrubTrue;
  const hasVelocity = data.hasVelocityReactive;
  const hasGates = data.hasRenderGates;

  let score = 0;

  if (!data.hasGSAP && !hasTrigger) {
    score = 0;
  } else if (hasSmooth && !hasTrigger) {
    score = 2;
  } else if (hasSmooth && hasTrigger && !hasScrub) {
    score = 4;
  } else if (hasSmooth && hasScrub && !hasVelocity) {
    score = 6;
  } else if (hasSmooth && hasScrub && hasVelocity) {
    score = hasGates ? 10 : 8;
  } else if (!hasSmooth && hasScrub) {
    score = 4;
  }

  const details = [
    hasSmooth ? 'Lenis detected' : 'No smooth scroll',
    hasTrigger ? 'ScrollTrigger' : 'No ScrollTrigger',
    hasScrub ? 'scrub: true found' : 'No scrub',
    hasVelocity ? 'Velocity-reactive' : '',
    hasGates ? 'Render gates' : '',
  ].filter(Boolean).join('. ');

  return {
    dimension: 'scroll_architecture',
    dimensionNumber: 3,
    score,
    details,
    fix: score < 7 ? 'global.primitives (scroll)' : undefined,
    severity: severity(score),
  };
}

export function checkScrollAway(data: PageData, temporal: TemporalData): DimensionScore {
  const snapshots = temporal.scrollSnapshots;
  const initial = snapshots.find((s) => s.scrollPercent === 0);
  const later = snapshots.filter((s) => s.scrollPercent >= 25);

  if (!initial?.heroTransform) {
    return {
      dimension: 'scroll_away',
      dimensionNumber: 10,
      score: 0,
      details: 'No hero element found',
      fix: 'sections[0].primitives',
      severity: 'critical',
    };
  }

  const hero0 = initial.heroTransform;
  let maxScaleDelta = 0;
  let maxRotateDelta = 0;
  let maxTranslateDelta = 0;
  let maxOpacityDelta = 0;

  for (const snap of later) {
    if (!snap.heroTransform) continue;
    maxScaleDelta = Math.max(maxScaleDelta, Math.abs(hero0.scale - snap.heroTransform.scale));
    maxRotateDelta = Math.max(maxRotateDelta, Math.abs(hero0.rotate - snap.heroTransform.rotate));
    maxTranslateDelta = Math.max(maxTranslateDelta, Math.abs(hero0.translateY - snap.heroTransform.translateY));
    maxOpacityDelta = Math.max(maxOpacityDelta, Math.abs(hero0.opacity - snap.heroTransform.opacity));
  }

  const transformTypes = [
    maxScaleDelta > 0.02,
    maxRotateDelta > 0.5,
    maxTranslateDelta > 10,
    maxOpacityDelta > 0.1,
  ].filter(Boolean).length;

  let score = 0;

  if (transformTypes === 0) {
    score = 0;
  } else if (transformTypes === 1) {
    score = maxOpacityDelta > 0.1 && transformTypes === 1 ? 2 : 4;
  } else if (transformTypes === 2) {
    score = 6;
  } else if (transformTypes >= 3) {
    score = maxRotateDelta > 1 ? 10 : 8;
  }

  const details = [
    `Scale delta: ${maxScaleDelta.toFixed(2)}`,
    `Rotate delta: ${maxRotateDelta.toFixed(1)}deg`,
    `TranslateY delta: ${maxTranslateDelta.toFixed(0)}px`,
    `Opacity delta: ${maxOpacityDelta.toFixed(2)}`,
    `${transformTypes} transform types active`,
  ].join('. ');

  return {
    dimension: 'scroll_away',
    dimensionNumber: 10,
    score,
    details,
    fix: score < 7 ? 'sections[0].primitives (scroll-away)' : undefined,
    severity: severity(score),
  };
}

export function checkPageTransitions(data: PageData): DimensionScore {
  const hasClip = data.hasClipPathTransition;
  const hasCanvas = data.hasCanvasTransition;
  const hasLib = data.pageTransitionLib !== null;

  let score = 0;

  if (!hasClip && !hasCanvas && !hasLib) {
    score = 0;
  } else if (hasLib && !hasClip && !hasCanvas) {
    score = 4;
  } else if (hasClip || hasCanvas) {
    score = hasClip && hasCanvas ? 10 : 8;
  }

  const details = [
    hasClip ? 'clip-path transition detected' : '',
    hasCanvas ? 'Canvas transition detected' : '',
    hasLib ? `Transition library: ${data.pageTransitionLib}` : '',
    !hasClip && !hasCanvas && !hasLib ? 'No page transitions' : '',
  ].filter(Boolean).join('. ');

  return {
    dimension: 'page_transitions',
    dimensionNumber: 12,
    score,
    details,
    fix: score < 7 ? 'global.primitives (page-transition)' : undefined,
    severity: severity(score),
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/scroll-checkers.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/checkers/scroll-checkers.ts mcp/evaluation-server/tests/scroll-checkers.test.ts
git commit -m "feat: add scroll checkers for D3, D10, D12"
```

---

### Task 7: Interaction Checkers (D4, D6)

**Files:**
- Create: `mcp/evaluation-server/src/checkers/interaction-checkers.ts`
- Create: `mcp/evaluation-server/tests/interaction-checkers.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/interaction-checkers.test.ts
import { describe, it, expect } from 'vitest';
import {
  checkEntranceChoreography,
  checkHoverCompleteness,
} from '../src/checkers/interaction-checkers';
import type { TemporalData } from '../src/types';
import { makePageData } from './fixtures/make-page-data';

describe('checkEntranceChoreography (D4)', () => {
  it('scores 10 for preloader + progress + scroll-lock + char-level + compileAsync', () => {
    const data = makePageData({
      hasPreloader: true,
      preloaderTracksProgress: true,
      scrollLockedDuringPreload: true,
      charLevelElements: 3,
      hasSplitTypeLib: true,
      hasCompileAsync: true,
    });
    const result = checkEntranceChoreography(data);
    expect(result.score).toBeGreaterThanOrEqual(9);
  });

  it('scores 0 for no preloader and no entrance', () => {
    const result = checkEntranceChoreography(makePageData({}));
    expect(result.score).toBe(0);
  });

  it('scores 4 for cosmetic preloader only', () => {
    const data = makePageData({ hasPreloader: true });
    const result = checkEntranceChoreography(data);
    expect(result.score).toBeLessThanOrEqual(4);
  });
});

describe('checkHoverCompleteness (D6)', () => {
  it('scores 10 for all elements responding + hover media query', () => {
    const temporal: TemporalData = {
      scrollSnapshots: [],
      hoverProbes: [
        { selector: 'a.nav-link', changed: true },
        { selector: 'button.cta', changed: true },
        { selector: '.card', changed: true },
        { selector: '.stat-item', changed: true },
      ],
      preloaderScreenshots: [],
    };
    const data = makePageData({ hasHoverMediaQuery: true });
    const result = checkHoverCompleteness(data, temporal);
    expect(result.score).toBeGreaterThanOrEqual(9);
  });

  it('scores 0 for no hover probes', () => {
    const temporal: TemporalData = {
      scrollSnapshots: [], hoverProbes: [], preloaderScreenshots: [],
    };
    const result = checkHoverCompleteness(makePageData({}), temporal);
    expect(result.score).toBe(0);
  });

  it('scores low when most elements dont respond', () => {
    const temporal: TemporalData = {
      scrollSnapshots: [],
      hoverProbes: [
        { selector: 'a.nav-link', changed: true },
        { selector: '.card', changed: false },
        { selector: '.stat', changed: false },
        { selector: '.badge', changed: false },
      ],
      preloaderScreenshots: [],
    };
    const result = checkHoverCompleteness(makePageData({}), temporal);
    expect(result.score).toBeLessThanOrEqual(4);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/interaction-checkers.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement interaction checkers**

```typescript
// src/checkers/interaction-checkers.ts
import type { PageData, TemporalData, DimensionScore } from '../types';
import { severity } from './utils';

export function checkEntranceChoreography(data: PageData): DimensionScore {
  const hasPreloader = data.hasPreloader;
  const tracksProgress = data.preloaderTracksProgress;
  const scrollLocked = data.scrollLockedDuringPreload;
  const hasCharAnim = data.charLevelElements > 0 && data.hasSplitTypeLib;
  const hasCompile = data.hasCompileAsync;

  let score = 0;

  if (!hasPreloader && !hasCharAnim) {
    score = 0;
  } else if (!hasPreloader) {
    score = 2;
  } else if (hasPreloader && !tracksProgress && !hasCharAnim) {
    score = 4;
  } else if (hasPreloader && !tracksProgress && hasCharAnim) {
    score = 6;
  } else if (hasPreloader && tracksProgress && hasCharAnim && scrollLocked) {
    score = hasCompile ? 10 : 8;
  } else if (hasPreloader && tracksProgress) {
    score = 7;
  }

  const details = [
    hasPreloader ? 'Preloader detected' : 'No preloader',
    tracksProgress ? 'Tracks real progress' : 'No progress tracking',
    scrollLocked ? 'Scroll locked during load' : '',
    hasCharAnim ? 'Char-level entrance' : 'No char animation',
    hasCompile ? 'compileAsync detected' : '',
  ].filter(Boolean).join('. ');

  return {
    dimension: 'entrance_choreography',
    dimensionNumber: 4,
    score,
    details,
    fix: score < 7 ? 'global.primitives.preloader' : undefined,
    severity: severity(score),
  };
}

export function checkHoverCompleteness(data: PageData, temporal: TemporalData): DimensionScore {
  const probes = temporal.hoverProbes;

  if (probes.length === 0) {
    return {
      dimension: 'hover_completeness',
      dimensionNumber: 6,
      score: 0,
      details: 'No hoverable elements found',
      fix: 'sections[].primitives (hover)',
      severity: 'critical',
    };
  }

  const responded = probes.filter((p) => p.changed).length;
  const ratio = responded / probes.length;
  const hasMediaQuery = data.hasHoverMediaQuery;

  let score = 0;

  if (ratio === 0) {
    score = 0;
  } else if (ratio < 0.3) {
    score = 2;
  } else if (ratio < 0.6) {
    score = 4;
  } else if (ratio < 0.8) {
    score = 6;
  } else if (ratio < 1.0) {
    score = hasMediaQuery ? 8 : 7;
  } else {
    score = hasMediaQuery ? 10 : 8;
  }

  const details = [
    `${responded}/${probes.length} elements respond to hover (${Math.round(ratio * 100)}%)`,
    hasMediaQuery ? '@media (hover: hover) detected' : 'No hover media query',
  ].join('. ');

  return {
    dimension: 'hover_completeness',
    dimensionNumber: 6,
    score,
    details,
    fix: score < 7 ? 'sections[].primitives (hover states)' : undefined,
    severity: severity(score),
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/interaction-checkers.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/checkers/interaction-checkers.ts mcp/evaluation-server/tests/interaction-checkers.test.ts
git commit -m "feat: add interaction checkers for D4 entrance, D6 hover"
```

---

### Task 8: Performance Checker (D14)

**Files:**
- Create: `mcp/evaluation-server/src/checkers/performance-checker.ts`
- Create: `mcp/evaluation-server/tests/performance-checker.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/performance-checker.test.ts
import { describe, it, expect } from 'vitest';
import { checkPerformance } from '../src/checkers/performance-checker';
import { makePageData } from './fixtures/make-page-data';

describe('checkPerformance (D14)', () => {
  it('scores 10 for LCP <2s, CLS <0.05, DPR cap, render gates, compileAsync', () => {
    const data = makePageData({
      lcp: 1800, cls: 0.02, hasDPRCap: true, hasRenderGates: true, hasCompileAsync: true,
    });
    const result = checkPerformance(data);
    expect(result.score).toBeGreaterThanOrEqual(9);
  });

  it('scores low for LCP >5s and high CLS', () => {
    const data = makePageData({ lcp: 6000, cls: 0.3 });
    const result = checkPerformance(data);
    expect(result.score).toBeLessThanOrEqual(2);
  });

  it('scores 6 for LCP <2.5s and CLS <0.1', () => {
    const data = makePageData({ lcp: 2400, cls: 0.08 });
    const result = checkPerformance(data);
    expect(result.score).toBeGreaterThanOrEqual(5);
    expect(result.score).toBeLessThanOrEqual(7);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/performance-checker.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement performance checker**

```typescript
// src/checkers/performance-checker.ts
import type { PageData, DimensionScore } from '../types';
import { severity } from './utils';

export function checkPerformance(data: PageData): DimensionScore {
  const lcp = data.lcp;
  const cls = data.cls;

  let lcpScore = 0;
  if (lcp > 5000) lcpScore = 0;
  else if (lcp > 3000) lcpScore = 2;
  else if (lcp > 2500) lcpScore = 4;
  else if (lcp > 2000) lcpScore = 6;
  else lcpScore = 8;

  let clsScore = 0;
  if (cls > 0.25) clsScore = 0;
  else if (cls > 0.1) clsScore = 4;
  else if (cls > 0.05) clsScore = 7;
  else clsScore = 10;

  const baseScore = Math.round((lcpScore + clsScore) / 2);

  const bonuses = [data.hasDPRCap, data.hasRenderGates, data.hasCompileAsync]
    .filter(Boolean).length;

  const score = Math.min(10, baseScore + bonuses);

  const details = [
    `LCP: ${lcp}ms`,
    `CLS: ${cls}`,
    data.hasDPRCap ? 'DPR capped' : '',
    data.hasRenderGates ? 'Render gates active' : '',
    data.hasCompileAsync ? 'compileAsync used' : '',
  ].filter(Boolean).join('. ');

  return {
    dimension: 'performance',
    dimensionNumber: 14,
    score,
    details,
    fix: score < 7 ? 'Performance optimization needed' : undefined,
    severity: severity(score),
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/performance-checker.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/checkers/performance-checker.ts mcp/evaluation-server/tests/performance-checker.test.ts
git commit -m "feat: add performance checker for D14"
```

---

### Task 9: LLM Placeholder Checkers (D11, D13)

**Files:**
- Create: `mcp/evaluation-server/src/checkers/llm-checkers.ts`
- Create: `mcp/evaluation-server/tests/llm-checkers.test.ts`

These return default scores + screenshot data. The Agent Pipeline's Evaluation Agent handles actual LLM scoring.

- [ ] **Step 1: Write failing tests**

```typescript
// tests/llm-checkers.test.ts
import { describe, it, expect } from 'vitest';
import {
  checkInteractiveSignature,
  checkMobileStrategy,
} from '../src/checkers/llm-checkers';
import type { TemporalData } from '../src/types';

describe('checkInteractiveSignature (D11)', () => {
  it('returns placeholder score of 5 with screenshot count', () => {
    const temporal: TemporalData = {
      scrollSnapshots: [
        { scrollPercent: 0, heroTransform: null, screenshot: Buffer.from('a') },
        { scrollPercent: 25, heroTransform: null, screenshot: Buffer.from('b') },
      ],
      hoverProbes: [],
      preloaderScreenshots: [],
    };
    const result = checkInteractiveSignature(temporal);
    expect(result.score).toBe(5);
    expect(result.dimension).toBe('interactive_signature');
    expect(result.details).toContain('2 temporal screenshots');
  });
});

describe('checkMobileStrategy (D13)', () => {
  it('returns placeholder score of 5', () => {
    const temporal: TemporalData = {
      scrollSnapshots: [],
      hoverProbes: [],
      preloaderScreenshots: [],
    };
    const result = checkMobileStrategy(temporal);
    expect(result.score).toBe(5);
    expect(result.dimension).toBe('mobile_strategy');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/llm-checkers.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement LLM checkers**

```typescript
// src/checkers/llm-checkers.ts
import type { TemporalData, DimensionScore } from '../types';

export function checkInteractiveSignature(temporal: TemporalData): DimensionScore {
  const screenshotCount = temporal.scrollSnapshots
    .filter((s) => s.screenshot).length;

  return {
    dimension: 'interactive_signature',
    dimensionNumber: 11,
    score: 5,
    details: `LLM-judged dimension. ${screenshotCount} temporal screenshots captured for evaluation.`,
    severity: 'warning',
  };
}

// Note: temporal data is accepted for forward-compatibility. The Agent Pipeline's
// Evaluation Agent will use desktop vs mobile screenshots from temporal capture
// to perform the actual LLM-based comparison.
export function checkMobileStrategy(_temporal: TemporalData): DimensionScore {
  return {
    dimension: 'mobile_strategy',
    dimensionNumber: 13,
    score: 5,
    details: 'LLM-judged dimension. Desktop vs mobile comparison required by Evaluation Agent.',
    severity: 'warning',
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/llm-checkers.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/checkers/llm-checkers.ts mcp/evaluation-server/tests/llm-checkers.test.ts
git commit -m "feat: add LLM placeholder checkers for D11, D13"
```

---

### Task 10: Page Data Extractor

**Files:**
- Create: `mcp/evaluation-server/src/extractor.ts`
- Create: `mcp/evaluation-server/tests/extractor.test.ts`

The extractor calls Playwright's `page.evaluate()` to extract `PageData`. Tests mock the Playwright Page object.

- [ ] **Step 1: Write failing tests**

```typescript
// tests/extractor.test.ts
import { describe, it, expect, vi } from 'vitest';
import { extractPageData } from '../src/extractor';

function mockPage(returnValue: unknown) {
  return {
    evaluate: vi.fn().mockResolvedValue(returnValue),
    url: vi.fn().mockReturnValue('http://localhost:3000'),
    viewportSize: vi.fn().mockReturnValue({ width: 1440, height: 900 }),
  } as unknown as import('playwright').Page;
}

const MOCK_RAW_DATA = {
  cssCustomProperties: [['--ease-signature', 'cubic-bezier(0.65,0.05,0,1)']],
  allTransitionValues: ['transform 0.75s cubic-bezier(0.65,0.05,0,1)'],
  allAnimationValues: [],
  allColorValues: ['#0C1311', '#F2F2F0', '#C8FF00'],
  fontFaceDeclarations: [
    { family: 'Mona Sans', src: '/fonts/mona.woff2', display: 'block', weight: '100 900' },
  ],
  externalStylesheetHrefs: [],
  hasHiddenScrollbar: true,
  hasAntialiasing: true,
  hasSelectionStyling: true,
  hasBoxSizingBorderBox: true,
  hasHoverMediaQuery: true,
  headlineElements: [{ tag: 'h1', fontSize: 120, lineHeight: 0.88, fontFamily: 'Mona Sans', selector: 'h1' }],
  bodyFontSize: 18,
  fontFamiliesUsed: ['Mona Sans', 'Inter'],
  sectionGaps: [200, 180],
  usesClampForGaps: true,
  usesClampForFonts: true,
  hasSplitTypeLib: true,
  charLevelElements: 3,
  clipPathOnLines: 5,
  dataAnimAttributes: ['chars', 'fade-up'],
  staggerMs: 20,
  hasLenis: true,
  hasGSAP: true,
  hasScrollTrigger: true,
  hasScrubTrue: true,
  hasVelocityReactive: false,
  hasCompileAsync: false,
  hasDPRCap: false,
  hasRenderGates: false,
  pageTransitionLib: null,
  hasClipPathTransition: false,
  hasCanvasTransition: false,
  hasPreloader: true,
  preloaderTracksProgress: true,
  scrollLockedDuringPreload: true,
  lcp: 2100,
  cls: 0.05,
  viewportWidth: 1440,
  viewportHeight: 900,
  totalScrollHeight: 6000,
};

describe('extractPageData', () => {
  it('calls page.evaluate and returns PageData with Map for cssCustomProperties', async () => {
    const page = mockPage(MOCK_RAW_DATA);
    const data = await extractPageData(page);

    expect(page.evaluate).toHaveBeenCalled();
    expect(data.cssCustomProperties).toBeInstanceOf(Map);
    expect(data.cssCustomProperties.get('--ease-signature')).toBe('cubic-bezier(0.65,0.05,0,1)');
    expect(data.bodyFontSize).toBe(18);
    expect(data.hasLenis).toBe(true);
  });

  it('handles empty CSS vars gracefully', async () => {
    const page = mockPage({ ...MOCK_RAW_DATA, cssCustomProperties: [] });
    const data = await extractPageData(page);
    expect(data.cssCustomProperties.size).toBe(0);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/extractor.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement extractor**

The extractor contains a large `page.evaluate()` call that runs in the browser context to extract all PageData fields. The function inside `page.evaluate()` uses browser APIs (document, getComputedStyle, performance) to inspect the page.

```typescript
// src/extractor.ts
import type { Page } from 'playwright';
import type { PageData } from './types';

interface RawPageData extends Omit<PageData, 'cssCustomProperties'> {
  readonly cssCustomProperties: readonly (readonly [string, string])[];
}

export async function extractPageData(page: Page): Promise<PageData> {
  const raw: RawPageData = await page.evaluate(() => {
    const root = document.documentElement;
    const bodyStyle = getComputedStyle(document.body);

    // CSS custom properties from :root
    const cssVars: [string, string][] = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSStyleRule && rule.selectorText === ':root') {
            for (let i = 0; i < rule.style.length; i++) {
              const prop = rule.style[i];
              if (prop.startsWith('--')) {
                cssVars.push([prop, rule.style.getPropertyValue(prop).trim()]);
              }
            }
          }
        }
      } catch { /* cross-origin stylesheet */ }
    }

    // Collect all CSS text for pattern matching
    const allCSS = [...document.styleSheets].flatMap((s) => {
      try { return [...s.cssRules].map((r) => r.cssText); } catch { return []; }
    }).join('\n');

    // Colors from stylesheets
    const colorValues: string[] = [];
    const colorProps = ['color', 'background-color', 'border-color', 'fill', 'stroke'];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSStyleRule) {
            for (const prop of colorProps) {
              const val = rule.style.getPropertyValue(prop);
              if (val && val !== 'initial' && val !== 'inherit') colorValues.push(val);
            }
          }
        }
      } catch { /* cross-origin */ }
    }

    // Transitions & animations
    const transitions: string[] = [];
    const animations: string[] = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSStyleRule) {
            const t = rule.style.getPropertyValue('transition');
            if (t) transitions.push(t);
            const a = rule.style.getPropertyValue('animation');
            if (a) animations.push(a);
          }
        }
      } catch { /* cross-origin */ }
    }

    // @font-face
    const fontFaces: Array<{ family: string; src: string; display: string; weight: string }> = [];
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          if (rule instanceof CSSFontFaceRule) {
            fontFaces.push({
              family: rule.style.getPropertyValue('font-family').replace(/['"]/g, ''),
              src: rule.style.getPropertyValue('src'),
              display: rule.style.getPropertyValue('font-display') || 'auto',
              weight: rule.style.getPropertyValue('font-weight') || '400',
            });
          }
        }
      } catch { /* cross-origin */ }
    }

    // External stylesheets
    const extSheets = [...document.querySelectorAll('link[rel="stylesheet"]')]
      .map((el) => (el as HTMLLinkElement).href);

    // CSS architecture checks
    const hasHiddenScrollbar = allCSS.includes('scrollbar-width: none')
      || allCSS.includes('::-webkit-scrollbar');
    const hasAntialiasing = allCSS.includes('-webkit-font-smoothing: antialiased');
    const hasSelectionStyling = allCSS.includes('::selection');
    const hasBoxSizingBorderBox = allCSS.includes('box-sizing: border-box');
    const hasHoverMediaQuery = allCSS.includes('@media (hover: hover)')
      || allCSS.includes('@media(hover:hover)');

    // Headlines
    const headlines = [...document.querySelectorAll('h1, h2, h3')].map((el) => {
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        fontSize: parseFloat(cs.fontSize),
        lineHeight: parseFloat(cs.lineHeight) / parseFloat(cs.fontSize) || 1.2,
        fontFamily: cs.fontFamily.split(',')[0].replace(/['"]/g, '').trim(),
        selector: el.tagName.toLowerCase(),
      };
    });

    const bodyFontSize = parseFloat(bodyStyle.fontSize);

    // Font families
    const families = new Set<string>();
    document.querySelectorAll('h1, h2, h3, p, span, a, li, div').forEach((el) => {
      const ff = getComputedStyle(el).fontFamily.split(',')[0].replace(/['"]/g, '').trim();
      if (ff) families.add(ff);
    });

    // Section gaps
    const sections = [...document.querySelectorAll('section, [data-section]')];
    const gaps: number[] = [];
    for (let i = 1; i < sections.length; i++) {
      const prev = sections[i - 1].getBoundingClientRect();
      const curr = sections[i].getBoundingClientRect();
      gaps.push(curr.top - prev.bottom);
    }

    const usesClampForGaps = allCSS.includes('clamp(') &&
      (allCSS.includes('gap') || allCSS.includes('margin') || allCSS.includes('padding'));
    const usesClampForFonts = allCSS.includes('clamp(') && allCSS.includes('font-size');

    // Script detection
    const scriptTexts = [...document.querySelectorAll('script')]
      .map((s) => s.textContent || '').join('\n');
    const scriptSrcs = [...document.querySelectorAll('script[src]')]
      .map((s) => (s as HTMLScriptElement).src).join('\n');
    const scripts = scriptTexts + '\n' + scriptSrcs;

    const hasLenis = scripts.includes('lenis') || scripts.includes('Lenis');
    const hasGSAP = scripts.includes('gsap') || scripts.includes('GSAP');
    const hasScrollTrigger = scripts.includes('ScrollTrigger');
    const hasScrubTrue = scripts.includes('scrub') && scripts.includes('true');
    const hasVelocityReactive = scripts.includes('velocity');
    const hasCompileAsync = scripts.includes('compileAsync');
    const hasDPRCap = scripts.includes('devicePixelRatio') && scripts.includes('Math.min');
    const hasRenderGates = scripts.includes('isRendering');

    // Text animation
    const hasSplitTypeLib = scripts.includes('SplitType') || scripts.includes('split-type');
    const charElements = document.querySelectorAll('.char, [class*="char"]').length;
    const clipLines = [...document.querySelectorAll('.line, [class*="line"]')]
      .filter((el) => getComputedStyle(el).clipPath !== 'none').length;
    const dataAnims = [...document.querySelectorAll('[data-anim], [data-primitive]')]
      .map((el) => (el as HTMLElement).dataset.anim || (el as HTMLElement).dataset.primitive || '');

    let staggerMs: number | null = null;
    const staggerMatch = scripts.match(/stagger[:\s]*([0-9.]+)/);
    if (staggerMatch) staggerMs = parseFloat(staggerMatch[1]) * 1000;

    // Page transitions
    const pageTransitionLib = scripts.includes('swup') ? 'swup'
      : scripts.includes('barba') ? 'barba' : null;
    const hasClipPathTransition = allCSS.includes('clip-path') && scripts.includes('transition');
    const hasCanvasTransition = scripts.includes('canvas') && scripts.includes('transition');

    // Preloader
    const preloaderEl = document.querySelector('[data-preloader], .preloader, #preloader');
    const hasPreloader = preloaderEl !== null || scripts.includes('preloader');
    const preloaderTracksProgress = scripts.includes('progress') && hasPreloader;
    const scrollLockedDuringPreload = (scripts.includes('overflow') || scripts.includes('lenis'))
      && hasPreloader;

    // Performance
    const perfEntries = performance.getEntriesByType('largest-contentful-paint') as PerformanceLargestContentfulPaint[];
    const lcp = perfEntries.length > 0 ? perfEntries[perfEntries.length - 1].startTime : 0;
    const layoutShifts = performance.getEntriesByType('layout-shift') as (PerformanceEntry & { value: number })[];
    const cls = layoutShifts.reduce((sum, e) => sum + (e.value || 0), 0);

    return {
      cssCustomProperties: cssVars,
      allTransitionValues: transitions,
      allAnimationValues: animations,
      allColorValues: colorValues,
      fontFaceDeclarations: fontFaces,
      externalStylesheetHrefs: extSheets,
      hasHiddenScrollbar,
      hasAntialiasing,
      hasSelectionStyling,
      hasBoxSizingBorderBox,
      hasHoverMediaQuery,
      headlineElements: headlines,
      bodyFontSize,
      fontFamiliesUsed: [...families],
      sectionGaps: gaps,
      usesClampForGaps,
      usesClampForFonts,
      hasSplitTypeLib,
      charLevelElements: charElements,
      clipPathOnLines: clipLines,
      dataAnimAttributes: dataAnims,
      staggerMs,
      hasLenis,
      hasGSAP,
      hasScrollTrigger,
      hasScrubTrue,
      hasVelocityReactive,
      hasCompileAsync,
      hasDPRCap,
      hasRenderGates,
      pageTransitionLib,
      hasClipPathTransition,
      hasCanvasTransition,
      hasPreloader,
      preloaderTracksProgress,
      scrollLockedDuringPreload,
      lcp,
      cls,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      totalScrollHeight: document.documentElement.scrollHeight,
    };
  });

  return {
    ...raw,
    cssCustomProperties: new Map(raw.cssCustomProperties),
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/extractor.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/extractor.ts mcp/evaluation-server/tests/extractor.test.ts
git commit -m "feat: add Playwright page data extractor"
```

---

## Chunk 3: Temporal Capture, Pipeline, MCP Server

### Task 11: Temporal Capture

**Files:**
- Create: `mcp/evaluation-server/src/capture.ts`
- Create: `mcp/evaluation-server/tests/capture.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/capture.test.ts
import { describe, it, expect, vi } from 'vitest';
import { captureTemporalData } from '../src/capture';

function mockPage() {
  return {
    evaluate: vi.fn()
      .mockResolvedValueOnce(5000)
      .mockResolvedValue({ scale: 1, rotate: 0, translateY: 0, opacity: 1 }),
    screenshot: vi.fn().mockResolvedValue(Buffer.from('screenshot')),
    mouse: { move: vi.fn().mockResolvedValue(undefined) },
    hover: vi.fn().mockResolvedValue(undefined),
    $$eval: vi.fn().mockResolvedValue(['.btn', '.card']),
    waitForTimeout: vi.fn().mockResolvedValue(undefined),
    locator: vi.fn().mockReturnValue({
      first: vi.fn().mockReturnValue({
        boundingBox: vi.fn().mockResolvedValue({ x: 100, y: 100, width: 50, height: 30 }),
        screenshot: vi.fn().mockResolvedValue(Buffer.from('element')),
      }),
    }),
  } as unknown as import('playwright').Page;
}

describe('captureTemporalData', () => {
  it('captures 8 scroll snapshots', async () => {
    const page = mockPage();
    const result = await captureTemporalData(page);
    expect(result.scrollSnapshots.length).toBeGreaterThanOrEqual(8);
  });

  it('includes screenshot buffers in scroll snapshots', async () => {
    const page = mockPage();
    const result = await captureTemporalData(page);
    for (const snap of result.scrollSnapshots) {
      expect(snap.screenshot).toBeInstanceOf(Buffer);
    }
  });

  it('captures hover probes with before/after screenshots', async () => {
    const page = mockPage();
    const result = await captureTemporalData(page);
    expect(result.hoverProbes.length).toBeGreaterThan(0);
    for (const probe of result.hoverProbes) {
      expect(probe.selector).toBeTruthy();
      expect(typeof probe.changed).toBe('boolean');
      expect(probe.screenshotBefore).toBeInstanceOf(Buffer);
      expect(probe.screenshotAfter).toBeInstanceOf(Buffer);
    }
  });

  it('returns preloaderScreenshots array', async () => {
    const page = mockPage();
    const result = await captureTemporalData(page);
    expect(Array.isArray(result.preloaderScreenshots)).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/capture.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement capture**

```typescript
// src/capture.ts
import type { Page } from 'playwright';
import type { TemporalData, ScrollSnapshot, HoverProbe } from './types';

const SCROLL_POSITIONS = [0, 10, 25, 40, 55, 70, 85, 100];

async function getHeroTransform(page: Page): Promise<ScrollSnapshot['heroTransform']> {
  return page.evaluate(() => {
    const hero = document.querySelector('section:first-of-type, [data-section="hero"], .hero');
    if (!hero) return null;
    const cs = getComputedStyle(hero);
    const matrix = cs.transform;
    if (!matrix || matrix === 'none') {
      return { scale: 1, rotate: 0, translateY: 0, opacity: parseFloat(cs.opacity) };
    }
    const values = matrix.match(/matrix\(([^)]+)\)/);
    if (!values) return { scale: 1, rotate: 0, translateY: 0, opacity: parseFloat(cs.opacity) };
    const parts = values[1].split(',').map(Number);
    const scaleX = Math.sqrt(parts[0] * parts[0] + parts[1] * parts[1]);
    const angle = Math.atan2(parts[1], parts[0]) * (180 / Math.PI);
    return {
      scale: Math.round(scaleX * 100) / 100,
      rotate: Math.round(angle * 10) / 10,
      translateY: parts[5] || 0,
      opacity: parseFloat(cs.opacity),
    };
  });
}

export async function captureTemporalData(page: Page): Promise<TemporalData> {
  const totalHeight: number = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );

  // Scroll snapshots
  const scrollSnapshots: ScrollSnapshot[] = [];
  for (const percent of SCROLL_POSITIONS) {
    const scrollY = Math.round((percent / 100) * totalHeight);
    await page.evaluate((y: number) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(200);

    const heroTransform = await getHeroTransform(page);
    const screenshot = await page.screenshot({ type: 'png' });

    scrollSnapshots.push({ scrollPercent: percent, heroTransform, screenshot });
  }

  // Reset scroll
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);

  // Hover probes — broadened beyond spec's [data-cursor-hover] to catch all
  // interactive elements. The spec (6.2 item 2) targets data-cursor-hover, but
  // real sites may use standard anchors/buttons without that attribute.
  const interactiveSelectors: string[] = await page.$$eval(
    'a, button, [data-cursor-hover], [role="button"], .card, [data-hover]',
    (els: Element[]) => els.slice(0, 20).map((el) => {
      const tag = el.tagName.toLowerCase();
      const cls = el.className ? `.${String(el.className).split(' ')[0]}` : '';
      const id = el.id ? `#${el.id}` : '';
      return `${tag}${id}${cls}`;
    }),
  );

  const hoverProbes: HoverProbe[] = [];
  for (const selector of interactiveSelectors) {
    try {
      const locator = page.locator(selector).first();
      const box = await locator.boundingBox();
      if (!box) continue;

      const before = await locator.screenshot();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(300);
      const after = await locator.screenshot();

      const changed = !before.equals(after);
      hoverProbes.push({
        selector,
        changed,
        screenshotBefore: before,
        screenshotAfter: after,
      });
    } catch {
      // Element may have moved or be hidden
    }
  }

  // Deferred spec items (6.2 items 3, 5):
  // - Scroll velocity test (fast vs slow scroll screenshots for parallax/scrub validation)
  // - Interaction probes (click-and-hold on [data-primitive="hold-reveal"])
  // These require additional TemporalData fields and will be added when the
  // corresponding primitives are integrated in the Agent Pipeline.

  // Preloader screenshots — capture if a preloader element exists.
  // The preloader is typically visible on initial load and fades out.
  // Since we navigate with waitUntil: 'networkidle' before calling capture,
  // the preloader may already be gone. Full preloader capture (at 0%, 50%, 100%)
  // requires hooking into the page load lifecycle before networkidle,
  // which will be handled by the pipeline orchestrator in a future iteration.
  const preloaderScreenshots: Buffer[] = [];

  return {
    scrollSnapshots,
    hoverProbes,
    preloaderScreenshots,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/capture.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/capture.ts mcp/evaluation-server/tests/capture.test.ts
git commit -m "feat: add temporal capture protocol for scroll, hover, preloader"
```

---

### Task 12: Pipeline Orchestrator

**Files:**
- Create: `mcp/evaluation-server/src/pipeline.ts`
- Create: `mcp/evaluation-server/tests/pipeline.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/pipeline.test.ts
import { describe, it, expect, vi } from 'vitest';
import type { PageData, TemporalData } from '../src/types';

vi.mock('../src/extractor', () => ({
  extractPageData: vi.fn().mockResolvedValue({
    cssCustomProperties: new Map([['--ease-signature', 'cubic-bezier(0.65,0.05,0,1)']]),
    allTransitionValues: ['transform 0.75s cubic-bezier(0.65,0.05,0,1)'],
    allAnimationValues: [],
    allColorValues: ['#0C1311', '#F2F2F0', '#C8FF00'],
    fontFaceDeclarations: [{ family: 'Mona', src: '/f.woff2', display: 'block', weight: '400' }],
    externalStylesheetHrefs: [],
    hasHiddenScrollbar: true, hasAntialiasing: true, hasSelectionStyling: true,
    hasBoxSizingBorderBox: true, hasHoverMediaQuery: true,
    headlineElements: [{ tag: 'h1', fontSize: 120, lineHeight: 0.88, fontFamily: 'Mona', selector: 'h1' }],
    bodyFontSize: 18, fontFamiliesUsed: ['Mona'], sectionGaps: [200, 180],
    usesClampForGaps: true, usesClampForFonts: true,
    hasSplitTypeLib: true, charLevelElements: 3, clipPathOnLines: 5,
    dataAnimAttributes: ['chars'], staggerMs: 20,
    hasLenis: true, hasGSAP: true, hasScrollTrigger: true, hasScrubTrue: true,
    hasVelocityReactive: true, hasCompileAsync: true, hasDPRCap: true, hasRenderGates: true,
    pageTransitionLib: null, hasClipPathTransition: true, hasCanvasTransition: false,
    hasPreloader: true, preloaderTracksProgress: true, scrollLockedDuringPreload: true,
    lcp: 1800, cls: 0.02,
    viewportWidth: 1440, viewportHeight: 900, totalScrollHeight: 6000,
  } satisfies PageData),
}));

vi.mock('../src/capture', () => ({
  captureTemporalData: vi.fn().mockResolvedValue({
    scrollSnapshots: [
      { scrollPercent: 0, heroTransform: { scale: 1, rotate: 0, translateY: 0, opacity: 1 } },
      { scrollPercent: 25, heroTransform: { scale: 0.95, rotate: -2, translateY: -50, opacity: 0.8 } },
      { scrollPercent: 55, heroTransform: { scale: 0.9, rotate: -3, translateY: -100, opacity: 0.5 } },
    ],
    hoverProbes: [
      { selector: 'a', changed: true },
      { selector: 'button', changed: true },
    ],
    preloaderScreenshots: [],
  } satisfies TemporalData),
}));

vi.mock('playwright', () => ({
  chromium: {
    launch: vi.fn().mockResolvedValue({
      newPage: vi.fn().mockResolvedValue({
        goto: vi.fn().mockResolvedValue(undefined),
        waitForLoadState: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined),
        setViewportSize: vi.fn().mockResolvedValue(undefined),
      }),
      close: vi.fn().mockResolvedValue(undefined),
    }),
  },
}));

import { evaluate } from '../src/pipeline';

describe('evaluate pipeline', () => {
  it('returns EvaluationResult with 15 dimensions', async () => {
    const result = await evaluate({ url: 'http://localhost:3000', iteration: 1 });
    expect(result.dimensions).toHaveLength(15);
    expect(result.overall).toBeGreaterThan(0);
    expect(typeof result.pass).toBe('boolean');
    expect(result.iteration).toBe(1);
  });

  it('includes all dimension names', async () => {
    const result = await evaluate({ url: 'http://localhost:3000', iteration: 1 });
    const names = result.dimensions.map((d) => d.dimension);
    expect(names).toContain('typography_scale');
    expect(names).toContain('easing_identity');
    expect(names).toContain('scroll_architecture');
  });

  it('high-quality page scores above minimum', async () => {
    const result = await evaluate({ url: 'http://localhost:3000', iteration: 1 });
    expect(result.overall).toBeGreaterThanOrEqual(5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/pipeline.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement pipeline**

```typescript
// src/pipeline.ts
import { chromium } from 'playwright';
import { extractPageData } from './extractor';
import { captureTemporalData } from './capture';
import { checkEasingIdentity, checkColorDiscipline, checkFontLoading, checkCSSArchitecture } from './checkers/css-checkers';
import { checkTypographyScale, checkTextAnimation, checkSpatialRhythm } from './checkers/dom-checkers';
import { checkScrollArchitecture, checkScrollAway, checkPageTransitions } from './checkers/scroll-checkers';
import { checkEntranceChoreography, checkHoverCompleteness } from './checkers/interaction-checkers';
import { checkPerformance } from './checkers/performance-checker';
import { checkInteractiveSignature, checkMobileStrategy } from './checkers/llm-checkers';
import { computeResult } from './scorer';
import type { EvaluationResult, DimensionScore } from './types';

export interface EvaluateOptions {
  readonly url: string;
  readonly iteration: number;
  readonly viewportWidth?: number;
  readonly viewportHeight?: number;
}

export async function evaluate(options: EvaluateOptions): Promise<EvaluationResult> {
  const { url, iteration, viewportWidth = 1440, viewportHeight = 900 } = options;

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewportSize({ width: viewportWidth, height: viewportHeight });
    await page.goto(url, { waitUntil: 'networkidle' });
    // Allow time for entrance animations to settle after networkidle
    await page.waitForTimeout(2000);

    const pageData = await extractPageData(page);
    const temporal = await captureTemporalData(page);

    const dimensions: DimensionScore[] = [
      checkTypographyScale(pageData),
      checkEasingIdentity(pageData),
      checkScrollArchitecture(pageData),
      checkEntranceChoreography(pageData),
      checkColorDiscipline(pageData),
      checkHoverCompleteness(pageData, temporal),
      checkTextAnimation(pageData),
      checkSpatialRhythm(pageData),
      checkFontLoading(pageData),
      checkScrollAway(pageData, temporal),
      checkInteractiveSignature(temporal),
      checkPageTransitions(pageData),
      checkMobileStrategy(temporal),
      checkPerformance(pageData),
      checkCSSArchitecture(pageData),
    ];

    await page.close();

    return computeResult(dimensions, iteration);
  } finally {
    await browser.close();
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `cd mcp/evaluation-server && npx vitest run tests/pipeline.test.ts`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add mcp/evaluation-server/src/pipeline.ts mcp/evaluation-server/tests/pipeline.test.ts
git commit -m "feat: add evaluation pipeline orchestrator"
```

---

### Task 13: MCP Server + Barrel Exports

**Files:**
- Create: `mcp/evaluation-server/src/server.ts`
- Create: `mcp/evaluation-server/src/main.ts`
- Create: `mcp/evaluation-server/src/index.ts`
- Create: `mcp/evaluation-server/tests/server.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// tests/server.test.ts
import { describe, it, expect, vi } from 'vitest';

vi.mock('../src/pipeline', () => ({
  evaluate: vi.fn().mockResolvedValue({
    overall: 7.8,
    dimensions: [],
    failures: [],
    pass: true,
    iteration: 1,
  }),
}));

import { createEvaluationServer } from '../src/server';

describe('createEvaluationServer', () => {
  it('creates server with correct name', () => {
    const { name } = createEvaluationServer();
    expect(name).toBe('awwwards-evaluator');
  });

  it('exposes an MCP server instance', () => {
    const { server } = createEvaluationServer();
    expect(server).toBeDefined();
  });

  it('can be created without errors and returns consistent name', () => {
    const s1 = createEvaluationServer();
    const s2 = createEvaluationServer();
    expect(s1.name).toBe(s2.name);
    expect(s1.server).not.toBe(s2.server); // each call creates a fresh instance
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd mcp/evaluation-server && npx vitest run tests/server.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement server**

```typescript
// src/server.ts
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { evaluate } from './pipeline';

export interface EvaluationServer {
  readonly name: string;
  readonly server: McpServer;
}

export function createEvaluationServer(): EvaluationServer {
  const serverName = 'awwwards-evaluator';

  const server = new McpServer({
    name: serverName,
    version: '0.1.0',
  });

  server.tool(
    'evaluate',
    'Evaluate an Awwwards-level site against 15 scoring dimensions',
    {
      url: z.string().url().describe('URL of the site to evaluate'),
      iteration: z.number().int().min(1).default(1).describe('Current iteration number'),
    },
    async ({ url, iteration }) => {
      try {
        const result = await evaluate({ url, iteration });

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ error: message }) }],
          isError: true,
        };
      }
    },
  );

  return { name: serverName, server };
}
```

- [ ] **Step 4: Implement main entry point**

```typescript
// src/main.ts
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createEvaluationServer } from './server';

try {
  const { name, server } = createEvaluationServer();
  const transport = new StdioServerTransport();
  process.stderr.write(`${name}: starting on stdio\n`);
  await server.connect(transport);
} catch (err) {
  process.stderr.write(`Fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
}
```

- [ ] **Step 5: Implement barrel exports**

```typescript
// src/index.ts
export { createEvaluationServer } from './server';
export type { EvaluationServer } from './server';
export { evaluate } from './pipeline';
export type { EvaluateOptions } from './pipeline';
export type {
  PageData,
  TemporalData,
  DimensionScore,
  EvaluationResult,
  DimensionName,
  Severity,
} from './types';
export { DIMENSION_NAMES, DIMENSION_WEIGHTS, SCORE_THRESHOLDS } from './types';
```

- [ ] **Step 6: Run all tests**

Run: `cd mcp/evaluation-server && npx vitest run`
Expected: ALL PASS

- [ ] **Step 7: Verify TypeScript compiles**

Run: `cd mcp/evaluation-server && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 8: Commit**

```bash
git add mcp/evaluation-server/src/server.ts mcp/evaluation-server/src/main.ts mcp/evaluation-server/src/index.ts mcp/evaluation-server/tests/server.test.ts
git commit -m "feat: add evaluation MCP server with evaluate tool and stdio transport"
```

---

## Summary

| Chunk | Tasks | Key Deliverables |
|-------|-------|-----------------|
| 1 | 1-5 | Scaffolding, types, CSS/DOM checkers, scorer |
| 2 | 6-10 | Scroll/interaction/performance/LLM checkers, extractor |
| 3 | 11-13 | Temporal capture, pipeline, MCP server |

**Total: 13 tasks, ~40 test cases, 12 source files**

**Testing strategy:**
- Checkers: pure unit tests with constructed PageData (no Playwright)
- Extractor: mocked Page object
- Capture: mocked Page object
- Pipeline: mocked extractor + capture + playwright
- Server: mocked pipeline
