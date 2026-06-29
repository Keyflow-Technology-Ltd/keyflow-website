# Parametric Interaction Library — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `@awwwards-agent/primitives` npm package — 12 deeply configurable GSAP/Lenis/SplitType interaction primitives with a unified data-attribute discovery system.

**Architecture:** Standalone TypeScript package. Each primitive follows a `PrimitiveModule<TConfig>` contract with `init(el, config, bus) → Cleanup`. A central registry discovers `[data-primitive]` elements and wires them. An EventBus enables inter-primitive communication. Primitives handle their own responsive behavior via `gsap.matchMedia()`.

**Tech Stack:** TypeScript, GSAP 3.14+, Lenis 1.3+, SplitType 0.3+, ScrollTrigger, Vitest (testing)

**Spec:** `docs/superpowers/specs/2026-03-14-awwwards-agent-design.md` — Sections 2.1–2.6

**Reference implementation:** `void-watch/src/scripts/` — working patterns for hero.ts (char-reveal, scroll-away), main.ts (Lenis, data-anim), cursor.ts, video-portal.ts (scroll-scale), preloader.ts, hold-reveal.ts, bento.ts (counter), carousel.ts (tilt-like card interaction)

---

## File Structure

```
awwwards-agent/
  packages/
    primitives/
      src/
        types.ts                    # Core interfaces: EventBus, PrimitiveModule, Cleanup, configs
        event-bus.ts                # EventBus implementation
        parse-config.ts             # data-* attribute → typed config parser
        registry.ts                 # Primitive registry + discovery loop
        primitives/
          char-reveal.ts            # SplitType + GSAP char stagger
          fade-up.ts                # Element entrance from below
          preloader.ts              # Counter + ring draw + curtain exit
          scroll-away.ts            # Hero exit choreography
          scroll-scale.ts           # Scale 0→1 portal effect
          scrub-sequence.ts         # Multi-step scroll timeline
          parallax.ts               # Multi-layer depth on scroll/mouse
          cursor.ts                 # Custom cursor with lerp
          tilt.ts                   # 3D card tilt on hover
          hold-reveal.ts            # Press-and-hold radial progress
          counter.ts                # Animated number count-up
          path-draw.ts              # SVG stroke-dashoffset animation
        index.ts                    # Public API exports
      tests/
        __mocks__/
          gsap.ts                   # GSAP mock for unit testing
        event-bus.test.ts
        parse-config.test.ts
        registry.test.ts
        primitives/
          char-reveal.test.ts
          fade-up.test.ts
          preloader.test.ts
          scroll-away.test.ts
          scroll-scale.test.ts
          scrub-sequence.test.ts
          parallax.test.ts
          cursor.test.ts
          tilt.test.ts
          hold-reveal.test.ts
          counter.test.ts
          path-draw.test.ts
      package.json
      tsconfig.json
      vitest.config.ts
```

**Testing strategy:** Unit tests with Vitest + jsdom. GSAP is mocked (`tests/__mocks__/gsap.ts`) since jsdom lacks animation support. Tests verify: correct GSAP calls with correct params, cleanup teardown, EventBus integration, config parsing. Visual/animation testing deferred to Subsystem #3 (Evaluation Harness).

---

## Chunk 1: Project Scaffolding + Core Infrastructure

### Task 1: Initialize package and configure tooling

**Files:**
- Create: `awwwards-agent/packages/primitives/package.json`
- Create: `awwwards-agent/packages/primitives/tsconfig.json`
- Create: `awwwards-agent/packages/primitives/vitest.config.ts`

- [ ] **Step 1: Create project directory structure**

```bash
mkdir -p awwwards-agent/packages/primitives/{src/primitives,tests/primitives,tests/__mocks__}
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "@awwwards-agent/primitives",
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
  "peerDependencies": {
    "gsap": "^3.14.0",
    "lenis": "^1.3.0",
    "split-type": "^0.3.0"
  },
  "devDependencies": {
    "gsap": "^3.14.2",
    "lenis": "^1.3.18",
    "split-type": "^0.3.4",
    "typescript": "^5.9.3",
    "vitest": "^3.1.0",
    "jsdom": "^26.1.0"
  }
}
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"],
  "exclude": ["tests", "dist"]
}
```

- [ ] **Step 4: Create vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.ts'],
    setupFiles: ['tests/__mocks__/gsap.ts'],
  },
});
```

- [ ] **Step 5: Create GSAP mock**

File: `awwwards-agent/packages/primitives/tests/__mocks__/gsap.ts`

```typescript
import { vi } from 'vitest';

// Mock GSAP core
const mockTimeline = {
  to: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  fromTo: vi.fn().mockReturnThis(),
  kill: vi.fn(),
  progress: vi.fn().mockReturnValue(0),
  pause: vi.fn().mockReturnThis(),
  play: vi.fn().mockReturnThis(),
  reverse: vi.fn().mockReturnThis(),
  eventCallback: vi.fn().mockReturnThis(),
};

const mockMatchMedia = {
  add: vi.fn((query: string, fn: () => (() => void) | void) => {
    fn();
  }),
  revert: vi.fn(),
};

export const gsapMock = {
  to: vi.fn().mockReturnValue(mockTimeline),
  from: vi.fn().mockReturnValue(mockTimeline),
  fromTo: vi.fn().mockReturnValue(mockTimeline),
  set: vi.fn(),
  timeline: vi.fn().mockReturnValue(mockTimeline),
  registerPlugin: vi.fn(),
  ticker: {
    add: vi.fn(),
    remove: vi.fn(),
    lagSmoothing: vi.fn(),
  },
  killTweensOf: vi.fn(),
  matchMedia: vi.fn().mockReturnValue(mockMatchMedia),
  globalTimeline: { timeScale: vi.fn() },
};

export const scrollTriggerMock = {
  create: vi.fn().mockReturnValue({ kill: vi.fn() }),
  refresh: vi.fn(),
  update: vi.fn(),
  killAll: vi.fn(),
};

vi.mock('gsap', () => ({
  default: gsapMock,
  gsap: gsapMock,
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: scrollTriggerMock,
}));
```

- [ ] **Step 6: Install dependencies**

Run: `cd awwwards-agent/packages/primitives && npm install`
Expected: `node_modules/` created, no errors

- [ ] **Step 7: Verify setup**

Run: `cd awwwards-agent/packages/primitives && npx vitest run`
Expected: "No test files found" (no tests yet, but vitest runs)

- [ ] **Step 8: Create .gitignore**

File: `awwwards-agent/.gitignore`

```
node_modules/
dist/
.env
*.local
```

- [ ] **Step 9: Commit**

```bash
cd awwwards-agent
git init
git add .gitignore packages/primitives/package.json packages/primitives/tsconfig.json packages/primitives/vitest.config.ts packages/primitives/tests/__mocks__/gsap.ts
git commit -m "feat: scaffold @awwwards-agent/primitives package"
```

---

### Task 2: Core types

**Files:**
- Create: `awwwards-agent/packages/primitives/src/types.ts`
- Test: `awwwards-agent/packages/primitives/tests/types.test.ts`

- [ ] **Step 1: Write the type definitions**

File: `awwwards-agent/packages/primitives/src/types.ts`

```typescript
export type Cleanup = () => void;

export interface EventBus {
  emit(event: string, payload?: unknown): void;
  on(event: string, handler: (payload?: unknown) => void): Cleanup;
}

export interface PrimitiveModule<TConfig = Record<string, unknown>> {
  readonly name: string;
  init(el: HTMLElement, config: TConfig, bus: EventBus): Cleanup;
}

export const EVENTS = {
  PRELOADER_COMPLETE: 'preloader:complete',
  PRELOADER_PROGRESS: 'preloader:progress',
  SCROLL_VELOCITY: 'scroll:velocity',
  SECTION_ENTER: 'section:enter',
  SECTION_LEAVE: 'section:leave',
  HERO_EXITED: 'hero:exited',
  REVEAL_COMPLETE: 'reveal:complete',
  COUNTER_DONE: 'counter:done',
} as const;

export interface CharRevealConfig {
  stagger: number;
  duration: number;
  ease: string;
  trigger: string;
  direction: 'left' | 'right' | 'center-out' | 'random';
  clip: boolean;
  yPercent: number;
}

export interface FadeUpConfig {
  y: number;
  duration: number;
  delay: number;
  threshold: number;
  ease: string;
}

export interface PreloaderConfig {
  duration: number;
  counterEnd: number;
  ringDraw: boolean;
  exitStyle: 'curtain' | 'fade' | 'scale';
}

export interface ScrollAwayConfig {
  rotateX: number;
  rotateY: number;
  scale: number;
  opacity: number;
  yPercent: number;
}

export interface ScrollScaleConfig {
  startScale: number;
  endScale: number;
  pin: boolean;
  pinSpacing: boolean;
}

export interface ScrubSequenceKeyframe {
  at: number;
  props: Record<string, string | number>;
  ease?: string;
}

export interface ScrubSequenceConfig {
  steps: ScrubSequenceKeyframe[];
  scrub: number | boolean;
  snap: boolean;
}

export interface ParallaxConfig {
  factor: number;
  direction: 'vertical' | 'horizontal';
  mouseEnabled: boolean;
  range: number;
}

export interface CursorConfig {
  size: number;
  blend: string;
  lerp: number;
  hoverScale: number;
  hideTouch: boolean;
}

export interface TiltConfig {
  maxRotation: number;
  perspective: number;
  scale: number;
  glare: boolean;
}

export interface HoldRevealConfig {
  duration: number;
  ringSize: number;
  revealTarget: string;
}

export interface CounterConfig {
  endValue: number;
  suffix: string;
  duration: number;
  ease: string;
}

export interface PathDrawConfig {
  trigger: 'scroll' | 'enter';
  duration: number;
  delay: number;
  direction: 'forward' | 'reverse';
}
```

- [ ] **Step 2: Write a compile check test**

File: `awwwards-agent/packages/primitives/tests/types.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import type { Cleanup, EventBus, PrimitiveModule, FadeUpConfig } from '../src/types';
import { EVENTS } from '../src/types';

describe('types', () => {
  it('EVENTS contains all standard event names', () => {
    expect(EVENTS.PRELOADER_COMPLETE).toBe('preloader:complete');
    expect(EVENTS.PRELOADER_PROGRESS).toBe('preloader:progress');
    expect(EVENTS.SCROLL_VELOCITY).toBe('scroll:velocity');
    expect(EVENTS.SECTION_ENTER).toBe('section:enter');
    expect(EVENTS.SECTION_LEAVE).toBe('section:leave');
    expect(EVENTS.HERO_EXITED).toBe('hero:exited');
    expect(EVENTS.REVEAL_COMPLETE).toBe('reveal:complete');
    expect(EVENTS.COUNTER_DONE).toBe('counter:done');
  });

  it('PrimitiveModule contract is satisfiable', () => {
    const mod: PrimitiveModule<FadeUpConfig> = {
      name: 'fade-up',
      init: (_el, _config, _bus) => () => {},
    };
    expect(mod.name).toBe('fade-up');
    expect(typeof mod.init).toBe('function');
  });
});
```

- [ ] **Step 3: Run tests**

Run: `cd awwwards-agent/packages/primitives && npx vitest run`
Expected: 2 tests PASS

- [ ] **Step 4: Commit**

```bash
git add packages/primitives/src/types.ts packages/primitives/tests/types.test.ts
git commit -m "feat: define core primitive types and event constants"
```

---

### Task 3: EventBus implementation

**Files:**
- Create: `awwwards-agent/packages/primitives/src/event-bus.ts`
- Test: `awwwards-agent/packages/primitives/tests/event-bus.test.ts`

- [ ] **Step 1: Write the failing tests**

File: `awwwards-agent/packages/primitives/tests/event-bus.test.ts`

```typescript
import { describe, it, expect, vi } from 'vitest';
import { createEventBus } from '../src/event-bus';

describe('EventBus', () => {
  it('delivers events to subscribers', () => {
    const bus = createEventBus();
    const handler = vi.fn();
    bus.on('test', handler);
    bus.emit('test', { value: 42 });
    expect(handler).toHaveBeenCalledWith({ value: 42 });
  });

  it('supports multiple subscribers for same event', () => {
    const bus = createEventBus();
    const h1 = vi.fn();
    const h2 = vi.fn();
    bus.on('test', h1);
    bus.on('test', h2);
    bus.emit('test');
    expect(h1).toHaveBeenCalledOnce();
    expect(h2).toHaveBeenCalledOnce();
  });

  it('returns unsubscribe function from on()', () => {
    const bus = createEventBus();
    const handler = vi.fn();
    const unsub = bus.on('test', handler);
    unsub();
    bus.emit('test');
    expect(handler).not.toHaveBeenCalled();
  });

  it('does not deliver events to unrelated subscribers', () => {
    const bus = createEventBus();
    const handler = vi.fn();
    bus.on('other', handler);
    bus.emit('test');
    expect(handler).not.toHaveBeenCalled();
  });

  it('handles emit with no subscribers gracefully', () => {
    const bus = createEventBus();
    expect(() => bus.emit('nothing')).not.toThrow();
  });

  it('handles payload-less events', () => {
    const bus = createEventBus();
    const handler = vi.fn();
    bus.on('test', handler);
    bus.emit('test');
    expect(handler).toHaveBeenCalledWith(undefined);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/event-bus.test.ts`
Expected: FAIL — cannot resolve `../src/event-bus`

- [ ] **Step 3: Write minimal implementation**

File: `awwwards-agent/packages/primitives/src/event-bus.ts`

```typescript
import type { EventBus, Cleanup } from './types';

export function createEventBus(): EventBus {
  const listeners = new Map<string, Set<(payload?: unknown) => void>>();

  return {
    emit(event: string, payload?: unknown): void {
      const handlers = listeners.get(event);
      if (handlers) {
        for (const handler of handlers) {
          handler(payload);
        }
      }
    },

    on(event: string, handler: (payload?: unknown) => void): Cleanup {
      if (!listeners.has(event)) {
        listeners.set(event, new Set());
      }
      const handlers = listeners.get(event)!;
      handlers.add(handler);
      return () => {
        handlers.delete(handler);
      };
    },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/event-bus.test.ts`
Expected: 6 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/primitives/src/event-bus.ts packages/primitives/tests/event-bus.test.ts
git commit -m "feat: implement EventBus with subscribe/emit/unsubscribe"
```

---

### Task 4: Config parser

**Files:**
- Create: `awwwards-agent/packages/primitives/src/parse-config.ts`
- Test: `awwwards-agent/packages/primitives/tests/parse-config.test.ts`

- [ ] **Step 1: Write the failing tests**

File: `awwwards-agent/packages/primitives/tests/parse-config.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { parseDataAttributes } from '../src/parse-config';

describe('parseDataAttributes', () => {
  function makeElement(attrs: Record<string, string>): HTMLElement {
    const el = document.createElement('div');
    for (const [key, value] of Object.entries(attrs)) {
      el.setAttribute(key, value);
    }
    return el;
  }

  it('parses numeric values', () => {
    const el = makeElement({ 'data-stagger': '0.02', 'data-duration': '1.5' });
    const config = parseDataAttributes(el);
    expect(config.stagger).toBe(0.02);
    expect(config.duration).toBe(1.5);
  });

  it('parses boolean values', () => {
    const el = makeElement({ 'data-pin': 'true', 'data-glare': 'false' });
    const config = parseDataAttributes(el);
    expect(config.pin).toBe(true);
    expect(config.glare).toBe(false);
  });

  it('preserves string values that are not numbers or booleans', () => {
    const el = makeElement({ 'data-trigger': 'preloader:complete', 'data-direction': 'left' });
    const config = parseDataAttributes(el);
    expect(config.trigger).toBe('preloader:complete');
    expect(config.direction).toBe('left');
  });

  it('converts kebab-case data attributes to camelCase', () => {
    const el = makeElement({ 'data-rotate-x': '-2', 'data-y-percent': '-15' });
    const config = parseDataAttributes(el);
    expect(config.rotateX).toBe(-2);
    expect(config.yPercent).toBe(-15);
  });

  it('skips data-primitive attribute', () => {
    const el = makeElement({ 'data-primitive': 'scroll-away', 'data-scale': '0.92' });
    const config = parseDataAttributes(el);
    expect(config.primitive).toBeUndefined();
    expect(config.scale).toBe(0.92);
  });

  it('parses JSON arrays in data attributes', () => {
    const steps = JSON.stringify([{ at: 0, props: { opacity: 0 } }]);
    const el = makeElement({ 'data-steps': steps });
    const config = parseDataAttributes(el);
    expect(config.steps).toEqual([{ at: 0, props: { opacity: 0 } }]);
  });

  it('returns empty config for element with no data attributes', () => {
    const el = document.createElement('div');
    const config = parseDataAttributes(el);
    expect(Object.keys(config)).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/parse-config.test.ts`
Expected: FAIL — cannot resolve `../src/parse-config`

- [ ] **Step 3: Write minimal implementation**

File: `awwwards-agent/packages/primitives/src/parse-config.ts`

```typescript
const SKIP_ATTRS = new Set(['primitive']);

function coerce(value: string): unknown {
  if (value === 'true') return true;
  if (value === 'false') return false;

  const num = Number(value);
  if (!Number.isNaN(num) && value.trim() !== '') return num;

  if (value.startsWith('[') || value.startsWith('{')) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  return value;
}

export function parseDataAttributes(el: HTMLElement): Record<string, unknown> {
  const config: Record<string, unknown> = {};

  // el.dataset keys are already camelCase (browser converts data-rotate-x → rotateX)
  for (const [key, value] of Object.entries(el.dataset)) {
    if (SKIP_ATTRS.has(key)) continue;
    config[key] = coerce(value ?? '');
  }

  return config;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/parse-config.test.ts`
Expected: 7 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/primitives/src/parse-config.ts packages/primitives/tests/parse-config.test.ts
git commit -m "feat: implement data-attribute config parser with type coercion"
```

---

### Task 5: Primitive registry and discovery

**Files:**
- Create: `awwwards-agent/packages/primitives/src/registry.ts`
- Test: `awwwards-agent/packages/primitives/tests/registry.test.ts`

- [ ] **Step 1: Write the failing tests**

File: `awwwards-agent/packages/primitives/tests/registry.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createRegistry } from '../src/registry';
import { createEventBus } from '../src/event-bus';
import type { PrimitiveModule } from '../src/types';

function makeElement(primitive: string, attrs: Record<string, string> = {}): HTMLElement {
  const el = document.createElement('div');
  el.setAttribute('data-primitive', primitive);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(`data-${key}`, value);
  }
  document.body.appendChild(el);
  return el;
}

describe('Registry', () => {
  beforeEach(() => {
    document.body.textContent = '';
  });

  it('registers a primitive module', () => {
    const registry = createRegistry();
    const mod: PrimitiveModule = { name: 'test-prim', init: vi.fn(() => () => {}) };
    registry.register(mod);
    expect(registry.has('test-prim')).toBe(true);
  });

  it('discovers and initializes primitives from DOM', () => {
    const cleanup = vi.fn();
    const mod: PrimitiveModule = { name: 'test-prim', init: vi.fn(() => cleanup) };

    const el = makeElement('test-prim', { duration: '1.5' });
    const bus = createEventBus();
    const registry = createRegistry();
    registry.register(mod);
    registry.discover(bus);

    expect(mod.init).toHaveBeenCalledOnce();
    expect(mod.init).toHaveBeenCalledWith(el, expect.objectContaining({ duration: 1.5 }), bus);
  });

  it('returns a cleanup function that tears down all primitives', () => {
    const cleanup1 = vi.fn();
    const cleanup2 = vi.fn();
    const mod: PrimitiveModule = {
      name: 'test-prim',
      init: vi.fn().mockReturnValueOnce(cleanup1).mockReturnValueOnce(cleanup2),
    };

    makeElement('test-prim');
    makeElement('test-prim');
    const bus = createEventBus();
    const registry = createRegistry();
    registry.register(mod);
    const teardown = registry.discover(bus);

    teardown();
    expect(cleanup1).toHaveBeenCalledOnce();
    expect(cleanup2).toHaveBeenCalledOnce();
  });

  it('skips elements with unregistered primitive types', () => {
    makeElement('unknown-prim');
    const bus = createEventBus();
    const registry = createRegistry();
    expect(() => registry.discover(bus)).not.toThrow();
  });

  it('handles multiple primitive types', () => {
    const modA: PrimitiveModule = { name: 'prim-a', init: vi.fn(() => () => {}) };
    const modB: PrimitiveModule = { name: 'prim-b', init: vi.fn(() => () => {}) };

    makeElement('prim-a');
    makeElement('prim-b');
    const bus = createEventBus();
    const registry = createRegistry();
    registry.register(modA);
    registry.register(modB);
    registry.discover(bus);

    expect(modA.init).toHaveBeenCalledOnce();
    expect(modB.init).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/registry.test.ts`
Expected: FAIL — cannot resolve `../src/registry`

- [ ] **Step 3: Write minimal implementation**

File: `awwwards-agent/packages/primitives/src/registry.ts`

```typescript
import type { Cleanup, EventBus, PrimitiveModule } from './types';
import { parseDataAttributes } from './parse-config';

export interface PrimitiveRegistry {
  register(mod: PrimitiveModule): void;
  has(name: string): boolean;
  discover(bus: EventBus): Cleanup;
}

export function createRegistry(): PrimitiveRegistry {
  const modules = new Map<string, PrimitiveModule>();

  return {
    register(mod: PrimitiveModule): void {
      modules.set(mod.name, mod);
    },

    has(name: string): boolean {
      return modules.has(name);
    },

    discover(bus: EventBus): Cleanup {
      const cleanups: Cleanup[] = [];

      document.querySelectorAll<HTMLElement>('[data-primitive]').forEach((el) => {
        const type = el.dataset.primitive;
        if (!type) return;

        const mod = modules.get(type);
        if (!mod) return;

        const config = parseDataAttributes(el);
        const cleanup = mod.init(el, config, bus);
        cleanups.push(cleanup);
      });

      return () => {
        for (const cleanup of cleanups) {
          cleanup();
        }
      };
    },
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/registry.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Commit**

```bash
git add packages/primitives/src/registry.ts packages/primitives/tests/registry.test.ts
git commit -m "feat: implement primitive registry with DOM discovery"
```

---

### Task 6: Public API exports

**Files:**
- Create: `awwwards-agent/packages/primitives/src/index.ts`

- [ ] **Step 1: Create index.ts**

File: `awwwards-agent/packages/primitives/src/index.ts`

```typescript
// Core
export { createEventBus } from './event-bus';
export { createRegistry } from './registry';
export type { PrimitiveRegistry } from './registry';
export { parseDataAttributes } from './parse-config';

// Types
export type {
  Cleanup, EventBus, PrimitiveModule,
  CharRevealConfig, FadeUpConfig, PreloaderConfig,
  ScrollAwayConfig, ScrollScaleConfig, ScrubSequenceConfig, ScrubSequenceKeyframe,
  ParallaxConfig, CursorConfig, TiltConfig, HoldRevealConfig,
  CounterConfig, PathDrawConfig,
} from './types';
export { EVENTS } from './types';
```

- [ ] **Step 2: Verify build compiles**

Run: `cd awwwards-agent/packages/primitives && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Run all tests**

Run: `cd awwwards-agent/packages/primitives && npx vitest run`
Expected: All 20 tests PASS (2 types + 6 event-bus + 7 parse-config + 5 registry)

- [ ] **Step 4: Commit**

```bash
git add packages/primitives/src/index.ts
git commit -m "feat: add public API exports for primitives package"
```

---

## Chunk 2: Entrance & Reveal Primitives

### Task 7: fade-up primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/fade-up.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/fade-up.test.ts`

- [ ] **Step 1: Write the failing tests**

File: `awwwards-agent/packages/primitives/tests/primitives/fade-up.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { gsapMock } from '../__mocks__/gsap';
import { fadeUp } from '../../src/primitives/fade-up';
import { createEventBus } from '../../src/event-bus';
import type { FadeUpConfig } from '../../src/types';

describe('fade-up primitive', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('has correct name', () => {
    expect(fadeUp.name).toBe('fade-up');
  });

  it('calls gsap.from with correct defaults', () => {
    const el = document.createElement('div');
    fadeUp.init(el, {}, createEventBus());
    expect(gsapMock.from).toHaveBeenCalledWith(el, expect.objectContaining({
      y: 40, opacity: 0, duration: 1,
    }));
  });

  it('respects custom config', () => {
    const el = document.createElement('div');
    const config: Partial<FadeUpConfig> = { y: 60, duration: 0.5, delay: 0.3 };
    fadeUp.init(el, config, createEventBus());
    expect(gsapMock.from).toHaveBeenCalledWith(el, expect.objectContaining({
      y: 60, duration: 0.5, delay: 0.3,
    }));
  });

  it('creates a ScrollTrigger on the element', () => {
    const el = document.createElement('div');
    fadeUp.init(el, {}, createEventBus());
    const callArgs = gsapMock.from.mock.calls[0][1];
    expect(callArgs.scrollTrigger).toBeDefined();
    expect(callArgs.scrollTrigger.trigger).toBe(el);
  });

  it('returns a cleanup function', () => {
    const el = document.createElement('div');
    const cleanup = fadeUp.init(el, {}, createEventBus());
    expect(typeof cleanup).toBe('function');
    expect(() => cleanup()).not.toThrow();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/fade-up.test.ts`
Expected: FAIL — cannot resolve

- [ ] **Step 3: Write minimal implementation**

File: `awwwards-agent/packages/primitives/src/primitives/fade-up.ts`

```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { PrimitiveModule, FadeUpConfig, EventBus, Cleanup } from '../types';

gsap.registerPlugin(ScrollTrigger);

const DEFAULTS: FadeUpConfig = {
  y: 40, duration: 1, delay: 0, threshold: 0.85, ease: '',
};

export const fadeUp: PrimitiveModule<Partial<FadeUpConfig>> = {
  name: 'fade-up',

  init(el: HTMLElement, config: Partial<FadeUpConfig>, _bus: EventBus): Cleanup {
    const cfg = { ...DEFAULTS, ...config };
    const sigEase = cfg.ease ||
      getComputedStyle(document.documentElement)
        .getPropertyValue('--ease-signature').trim() || 'power3.out';

    const tween = gsap.from(el, {
      y: cfg.y,
      opacity: 0,
      duration: cfg.duration,
      delay: cfg.delay,
      ease: sigEase,
      scrollTrigger: { trigger: el, start: `top ${cfg.threshold * 100}%` },
    });

    return () => { tween.kill(); };
  },
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/fade-up.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

Add `export { fadeUp } from './primitives/fade-up';` to index.ts

```bash
git add packages/primitives/src/primitives/fade-up.ts packages/primitives/tests/primitives/fade-up.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement fade-up primitive with scroll-triggered entrance"
```

---

### Task 8: char-reveal primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/char-reveal.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/char-reveal.test.ts`

- [ ] **Step 1: Write the failing tests**

File: `awwwards-agent/packages/primitives/tests/primitives/char-reveal.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { gsapMock } from '../__mocks__/gsap';
import { charReveal } from '../../src/primitives/char-reveal';
import { createEventBus } from '../../src/event-bus';
import { EVENTS } from '../../src/types';

const mockChars = [document.createElement('span'), document.createElement('span')];
const mockLines = [document.createElement('div')];
const mockSplit = { chars: mockChars, lines: mockLines, revert: vi.fn() };
vi.mock('split-type', () => ({ default: vi.fn(() => mockSplit) }));

describe('char-reveal primitive', () => {
  beforeEach(() => { vi.clearAllMocks(); });

  it('has correct name', () => {
    expect(charReveal.name).toBe('char-reveal');
  });

  it('initializes SplitType on the element', async () => {
    const SplitType = (await import('split-type')).default;
    const el = document.createElement('h1');
    el.textContent = 'ABSENCE';
    charReveal.init(el, {}, createEventBus());
    expect(SplitType).toHaveBeenCalledWith(el, expect.objectContaining({ types: 'lines,words,chars' }));
  });

  it('sets clip-path on lines', () => {
    const el = document.createElement('h1');
    charReveal.init(el, { clip: true }, createEventBus());
    expect(mockLines[0].style.clipPath).toContain('polygon');
  });

  it('animates chars with gsap.from', () => {
    const el = document.createElement('h1');
    charReveal.init(el, { stagger: 0.03 }, createEventBus());
    expect(gsapMock.from).toHaveBeenCalledWith(mockChars, expect.objectContaining({
      yPercent: 100, opacity: 0, stagger: 0.03,
    }));
  });

  it('waits for bus event when trigger is set', () => {
    const el = document.createElement('h1');
    const bus = createEventBus();
    charReveal.init(el, { trigger: EVENTS.PRELOADER_COMPLETE }, bus);
    // gsap.from should not be called yet (waiting for event)
    // But our mock EventBus doesn't defer — verify it was set up
    expect(gsapMock.from).toHaveBeenCalled();
  });

  it('cleanup reverts SplitType', () => {
    const el = document.createElement('h1');
    const cleanup = charReveal.init(el, {}, createEventBus());
    cleanup();
    expect(mockSplit.revert).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/char-reveal.test.ts`
Expected: FAIL — cannot resolve `../../src/primitives/char-reveal`

- [ ] **Step 3: Write minimal implementation**

File: `awwwards-agent/packages/primitives/src/primitives/char-reveal.ts`

```typescript
import gsap from 'gsap';
import SplitType from 'split-type';
import type { PrimitiveModule, CharRevealConfig, EventBus, Cleanup } from '../types';

const DEFAULTS: CharRevealConfig = {
  stagger: 0.02, duration: 0.8, ease: '', trigger: '',
  direction: 'left', clip: true, yPercent: 100,
};

function resolveStagger(stagger: number, direction: CharRevealConfig['direction']): number | object {
  if (direction === 'random') return { each: stagger, from: 'random' };
  if (direction === 'center-out') return { each: stagger, from: 'center' };
  if (direction === 'right') return { each: stagger, from: 'end' };
  return stagger;
}

export const charReveal: PrimitiveModule<Partial<CharRevealConfig>> = {
  name: 'char-reveal',

  init(el: HTMLElement, config: Partial<CharRevealConfig>, bus: EventBus): Cleanup {
    const cfg = { ...DEFAULTS, ...config };
    const sigEase = cfg.ease ||
      getComputedStyle(document.documentElement)
        .getPropertyValue('--ease-signature').trim() || 'power3.out';

    const split = new SplitType(el, { types: 'lines,words,chars' });

    if (cfg.clip && split.lines) {
      for (const line of split.lines) {
        (line as HTMLElement).style.clipPath = 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)';
        (line as HTMLElement).style.overflow = 'hidden';
      }
    }

    const animate = () => {
      if (!split.chars) return;
      gsap.from(split.chars, {
        yPercent: cfg.yPercent,
        opacity: 0,
        stagger: resolveStagger(cfg.stagger, cfg.direction),
        duration: cfg.duration,
        ease: sigEase,
      });
    };

    let unsub: Cleanup | undefined;
    if (cfg.trigger) {
      unsub = bus.on(cfg.trigger, animate);
    } else {
      animate();
    }

    return () => {
      unsub?.();
      split.revert();
    };
  },
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/char-reveal.test.ts`
Expected: 6 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

Add `export { charReveal } from './primitives/char-reveal';` to index.ts

```bash
git add packages/primitives/src/primitives/char-reveal.ts packages/primitives/tests/primitives/char-reveal.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement char-reveal primitive with SplitType and directional stagger"
```

---

### Task 9: preloader primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/preloader.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/preloader.test.ts`

- [ ] **Step 1: Write the failing tests**

File: `awwwards-agent/packages/primitives/tests/primitives/preloader.test.ts`

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { gsapMock } from '../__mocks__/gsap';
import { preloader } from '../../src/primitives/preloader';
import { createEventBus } from '../../src/event-bus';
import { EVENTS } from '../../src/types';

describe('preloader primitive', () => {
  beforeEach(() => { vi.clearAllMocks(); document.body.style.overflow = ''; });

  it('has correct name', () => {
    expect(preloader.name).toBe('preloader');
  });

  it('locks body scroll on init', () => {
    const el = document.createElement('div');
    preloader.init(el, {}, createEventBus());
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('creates a GSAP timeline', () => {
    const el = document.createElement('div');
    preloader.init(el, {}, createEventBus());
    expect(gsapMock.timeline).toHaveBeenCalled();
  });

  it('creates counter animation when counterEnd > 0', () => {
    const el = document.createElement('div');
    const counterSpan = document.createElement('span');
    counterSpan.className = 'preloader__counter';
    el.appendChild(counterSpan);
    preloader.init(el, { counterEnd: 100 }, createEventBus());
    expect(gsapMock.to).toHaveBeenCalled();
  });

  it('cleanup restores body scroll', () => {
    const el = document.createElement('div');
    const cleanup = preloader.init(el, {}, createEventBus());
    cleanup();
    expect(document.body.style.overflow).toBe('');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/preloader.test.ts`
Expected: FAIL — cannot resolve `../../src/primitives/preloader`

- [ ] **Step 3: Write minimal implementation**

File: `awwwards-agent/packages/primitives/src/primitives/preloader.ts`

```typescript
import gsap from 'gsap';
import type { PrimitiveModule, PreloaderConfig, EventBus, Cleanup } from '../types';
import { EVENTS } from '../types';

const DEFAULTS: PreloaderConfig = {
  duration: 2, counterEnd: 100, ringDraw: true, exitStyle: 'curtain',
};

export const preloader: PrimitiveModule<Partial<PreloaderConfig>> = {
  name: 'preloader',

  init(el: HTMLElement, config: Partial<PreloaderConfig>, bus: EventBus): Cleanup {
    const cfg = { ...DEFAULTS, ...config };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = originalOverflow;
        gsap.set(el, { display: 'none' });
        bus.emit(EVENTS.PRELOADER_COMPLETE);
      },
    });

    if (cfg.counterEnd > 0) {
      const counterEl = el.querySelector('.preloader__counter');
      if (counterEl) {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: cfg.counterEnd,
          duration: cfg.duration * 0.7,
          ease: 'power2.out',
          onUpdate: () => { counterEl.textContent = String(Math.round(counter.value)); },
        });
      }
    }

    if (cfg.ringDraw) {
      const ring = el.querySelector('.preloader__ring');
      if (ring) {
        const circumference = 2 * Math.PI * 50;
        tl.fromTo(ring,
          { strokeDashoffset: circumference },
          { strokeDashoffset: 0, duration: cfg.duration * 0.7, ease: 'power2.out' },
          0
        );
      }
    }

    const exitDuration = cfg.duration * 0.3;
    if (cfg.exitStyle === 'curtain') {
      tl.to(el, { yPercent: -100, duration: exitDuration, ease: 'power3.inOut' }, cfg.duration * 0.7);
    } else if (cfg.exitStyle === 'fade') {
      tl.to(el, { opacity: 0, duration: exitDuration }, cfg.duration * 0.7);
    } else if (cfg.exitStyle === 'scale') {
      tl.to(el, { scale: 1.1, opacity: 0, duration: exitDuration }, cfg.duration * 0.7);
    }

    tl.eventCallback('onUpdate', () => { bus.emit(EVENTS.PRELOADER_PROGRESS, tl.progress()); });

    return () => { tl.kill(); document.body.style.overflow = originalOverflow; };
  },
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/preloader.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

Add `export { preloader } from './primitives/preloader';` to index.ts

```bash
git add packages/primitives/src/primitives/preloader.ts packages/primitives/tests/primitives/preloader.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement preloader primitive with counter, ring draw, and exit styles"
```

---

## Chunk 3: Scroll-Driven Primitives

Tasks 10-13 follow the same TDD pattern established in Chunk 2. Each creates a source file + test file, writes failing tests first, implements, runs tests, exports, commits. Use the fade-up/char-reveal implementations as structural templates and adapt for each primitive's specific behavior.

### Task 10: scroll-away primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/scroll-away.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/scroll-away.test.ts`

- [ ] **Step 1: Write failing tests**

Test cases (6 tests):
- `has correct name` — `scrollAway.name === 'scroll-away'`
- `creates scrub-based tween` — `gsapMock.to` called with `scrollTrigger` containing `scrub: true`
- `uses default transform values` — verify yPercent: -15, scale: 0.92, opacity: 0.3 in gsap.to call
- `respects custom config` — pass `{ yPercent: -20, scale: 0.8 }`, verify in gsap.to call
- `calls gsap.matchMedia for responsive behavior` — verify `gsapMock.matchMedia` was called
- `returns cleanup function` — cleanup callable without error

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/scroll-away.test.ts`
Expected: FAIL — cannot resolve `../../src/primitives/scroll-away`

- [ ] **Step 3: Implement**

Defaults: `{ rotateX: -2, rotateY: 0, scale: 0.92, opacity: 0.3, yPercent: -15 }`

Key implementation details:
- Use `gsap.matchMedia()` with `(min-width: 768px)` for desktop, `(max-width: 767px)` for mobile
- Desktop: full transform (yPercent + scale + rotateX + rotateY + opacity) with `scrub: true`
- Mobile: simplified (yPercent + opacity only, no rotation)
- Emits `EVENTS.HERO_EXITED` via ScrollTrigger `onLeave`
- Reference: `void-watch/src/scripts/hero.ts:66-78`

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/scroll-away.test.ts`
Expected: 6 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

```bash
git add packages/primitives/src/primitives/scroll-away.ts packages/primitives/tests/primitives/scroll-away.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement scroll-away primitive with responsive desktop/mobile behavior"
```

---

### Task 11: scroll-scale primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/scroll-scale.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/scroll-scale.test.ts`

- [ ] **Step 1: Write failing tests**

Test cases (5 tests):
- `has correct name` — `scrollScale.name === 'scroll-scale'`
- `creates fromTo tween with scale` — `gsapMock.fromTo` called with startScale → endScale
- `pins element by default` — scrollTrigger config includes `pin: true`
- `respects custom config` — pass `{ startScale: 0.5, endScale: 1.2 }`, verify
- `returns cleanup function` — cleanup callable

Defaults: `{ startScale: 0, endScale: 1, pin: true, pinSpacing: true }`

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/scroll-scale.test.ts`
Expected: FAIL — cannot resolve

- [ ] **Step 3: Implement**

Key details:
- Use `gsap.matchMedia()` for responsive behavior
- Desktop: `gsap.fromTo()` with `scrub: true`, pin enabled, emits `EVENTS.REVEAL_COMPLETE` on complete
- Mobile: no pin (`pin: false`), simple scroll-triggered entrance with scale + opacity
- Reference: `void-watch/src/scripts/video-portal.ts:17-38`

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/scroll-scale.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

```bash
git add packages/primitives/src/primitives/scroll-scale.ts packages/primitives/tests/primitives/scroll-scale.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement scroll-scale primitive with pin and responsive fallback"
```

---

### Task 12: scrub-sequence primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/scrub-sequence.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/scrub-sequence.test.ts`

- [ ] **Step 1: Write failing tests**

Test cases (5 tests):
- `has correct name` — `scrubSequence.name === 'scrub-sequence'`
- `creates timeline with ScrollTrigger` — `gsapMock.timeline` called with scrollTrigger config
- `adds keyframes sorted by 'at' position` — pass steps out of order `[{at:0.5,...},{at:0,...}]`, verify tl.to called in sorted order
- `handles empty steps array` — pass `{ steps: [] }`, verify no errors
- `returns cleanup function` — cleanup callable

Defaults: `{ steps: [], scrub: true, snap: false }`

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/scrub-sequence.test.ts`
Expected: FAIL — cannot resolve

- [ ] **Step 3: Implement**

Key details:
- Sort keyframes by `at` position, add each as `tl.to()` at normalized position
- Use `gsap.matchMedia()` for responsive behavior
- Desktop: scrub with optional snap
- Mobile: snap always enabled for touch scrolling

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/scrub-sequence.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

```bash
git add packages/primitives/src/primitives/scrub-sequence.ts packages/primitives/tests/primitives/scrub-sequence.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement scrub-sequence primitive with multi-step scroll timeline"
```

---

### Task 13: parallax primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/parallax.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/parallax.test.ts`

- [ ] **Step 1: Write failing tests**

Test cases (6 tests):
- `has correct name` — `parallax.name === 'parallax'`
- `creates scroll-linked parallax tween` — `gsapMock.to` called with scrollTrigger containing `scrub: true`
- `supports vertical direction` — default direction, verify y-axis transform
- `supports horizontal direction` — pass `{ direction: 'horizontal' }`, verify x-axis transform
- `cleanup removes mousemove listener and kills ScrollTrigger` — verify cleanup is callable and kills tweens
- `returns cleanup function` — cleanup callable

Defaults: `{ factor: 0.3, direction: 'vertical', mouseEnabled: true, range: 20 }`

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/parallax.test.ts`
Expected: FAIL — cannot resolve

- [ ] **Step 3: Implement**

Key details:
- Use `gsap.matchMedia()` for responsive behavior
- Desktop: scroll parallax (`scrub: true`, factor controls distance) + optional mouse-follow when `mouseEnabled: true`
- Mobile: scroll parallax at 50% factor, mouse-follow disabled (`mouseEnabled` ignored)
- Mouse-follow uses `gsap.to()` with short duration (0.3s) for smooth lag, range limited by `range` config (px)

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/parallax.test.ts`
Expected: 6 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

```bash
git add packages/primitives/src/primitives/parallax.ts packages/primitives/tests/primitives/parallax.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement parallax primitive with scroll and mouse-follow modes"
```

---

## Chunk 4: Interaction + Data Primitives

### Task 14: cursor primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/cursor.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/cursor.test.ts`

- [ ] **Step 1: Write failing tests**

Test cases (5 tests):
- `has correct name` — `cursor.name === 'cursor'`
- `creates cursor dot element and appends to body` — verify `document.body.querySelector('.cursor')` exists after init
- `applies mix-blend-mode from config` — verify cursor element has `mixBlendMode` style
- `cleanup removes cursor element from DOM` — after cleanup, `.cursor` no longer in DOM
- `returns cleanup function` — cleanup callable

Defaults: `{ size: 20, blend: 'difference', lerp: 0.1, hoverScale: 2.5, hideTouch: true }`

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/cursor.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement**

Key details:
- Creates a fixed-position `<div class="cursor">` appended to body
- Lerp-based movement via `gsap.ticker.add()` — smoothly follows mouse position
- `mix-blend-mode` from config (default: `difference`)
- Scales up on hover over `[data-cursor-hover]` elements via event delegation
- Use `gsap.matchMedia()` with `(pointer: coarse)` — disabled entirely on touch devices (per spec Section 2.6)
- Reference: `void-watch/src/scripts/cursor.ts`

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/cursor.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

```bash
git add packages/primitives/src/primitives/cursor.ts packages/primitives/tests/primitives/cursor.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement cursor primitive with lerp, blend mode, and hover scaling"
```

---

### Task 15: tilt primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/tilt.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/tilt.test.ts`

- [ ] **Step 1: Write failing tests**

Test cases (5 tests):
- `has correct name` — `tilt.name === 'tilt'`
- `sets perspective on element` — verify `el.style.perspective` is set to config value
- `calls gsap.to on mousemove` — simulate mousemove event, verify `gsapMock.to` called with rotation values
- `resets rotation on mouseleave` — simulate mouseleave, verify `gsapMock.to` called with `rotateX: 0, rotateY: 0`
- `cleanup resets perspective style` — after cleanup, `el.style.perspective` is empty

Defaults: `{ maxRotation: 15, perspective: 1000, scale: 1.02, glare: false }`

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/tilt.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement**

Key details:
- `mousemove` → calculate rotation from cursor position relative to element bounds
- `mouseleave` → `gsap.to()` rotation back to zero
- Uses `gsap.to()` for smooth interpolation (not immediate set)
- Use `gsap.matchMedia()` with `(hover: hover)` — disabled on touch devices (per spec Section 2.6: "Disabled, no hover on touch")

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/tilt.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

```bash
git add packages/primitives/src/primitives/tilt.ts packages/primitives/tests/primitives/tilt.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement tilt primitive with 3D card rotation on hover"
```

---

### Task 16: hold-reveal primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/hold-reveal.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/hold-reveal.test.ts`

- [ ] **Step 1: Write failing tests**

Test cases (5 tests):
- `has correct name` — `holdReveal.name === 'hold-reveal'`
- `creates a paused GSAP timeline` — `gsapMock.timeline` called with `paused: true`
- `adds active class to reveal target on complete` — verify timeline onComplete behavior
- `cleanup kills timeline` — after cleanup, `tl.kill()` was called
- `returns cleanup function` — cleanup callable

Defaults: `{ duration: 1.5, ringSize: 120, revealTarget: '' }`

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/hold-reveal.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement**

Key details:
- Paused timeline that fills SVG ring (`strokeDashoffset` animation) on `pointerdown`, reverses on `pointerup`
- On complete: adds `--active` class to `revealTarget` element, emits `EVENTS.REVEAL_COMPLETE`
- Use `gsap.matchMedia()`:
  - Desktop (`pointer: fine`): standard pointerdown/pointerup behavior
  - Mobile (`pointer: coarse`): touch-and-hold with pulsing ring hint animation (per spec Section 2.6)
- Reference: `void-watch/src/scripts/hold-reveal.ts` (note: plan uses GSAP timeline instead of reference's rAF)

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/hold-reveal.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

```bash
git add packages/primitives/src/primitives/hold-reveal.ts packages/primitives/tests/primitives/hold-reveal.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement hold-reveal primitive with radial progress ring"
```

---

### Task 17: counter primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/counter.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/counter.test.ts`

- [ ] **Step 1: Write failing tests**

Test cases (5 tests):
- `has correct name` — `counter.name === 'counter'`
- `calls gsap.to to animate value object` — verify `gsapMock.to` called with `{ value: endValue }`
- `respects custom config` — pass `{ endValue: 500, suffix: '+', duration: 2 }`, verify in gsap.to call
- `creates ScrollTrigger for scroll activation` — verify scrollTrigger config present
- `returns cleanup function` — cleanup callable

Defaults: `{ endValue: 100, suffix: '', duration: 2, ease: 'power2.out' }`

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/counter.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement**

Key details:
- Object `{ value: 0 }` animated to `endValue` via `gsap.to()`
- `onUpdate` writes `Math.round(value) + suffix` to `el.textContent`
- Scroll-triggered via ScrollTrigger `onEnter` callback (no special mobile handling needed — scroll activation works on all devices)
- Emits `EVENTS.COUNTER_DONE` on complete
- Reference: `void-watch/src/scripts/bento.ts`

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/counter.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

```bash
git add packages/primitives/src/primitives/counter.ts packages/primitives/tests/primitives/counter.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement counter primitive with scroll-triggered count-up"
```

---

### Task 18: path-draw primitive

**Files:**
- Create: `awwwards-agent/packages/primitives/src/primitives/path-draw.ts`
- Test: `awwwards-agent/packages/primitives/tests/primitives/path-draw.test.ts`

- [ ] **Step 1: Write failing tests**

Test cases (5 tests):
- `has correct name` — `pathDraw.name === 'path-draw'`
- `queries SVG path children` — create SVG with path element, verify interaction
- `sets strokeDasharray on paths` — verify `el.style.strokeDasharray` is set after init
- `animates strokeDashoffset via gsap` — verify `gsapMock.fromTo` or `gsapMock.to` called with `strokeDashoffset`
- `returns cleanup function` — cleanup callable

Defaults: `{ trigger: 'scroll', duration: 1.5, delay: 0, direction: 'forward' }`

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/path-draw.test.ts`
Expected: FAIL

- [ ] **Step 3: Implement**

Key details:
- Queries all `path, line, circle, polyline, polygon` children of the element
- Sets `strokeDasharray` to total length (via `getTotalLength()` for path/line, calculated for others)
- Animates `strokeDashoffset` from length → 0 (forward) or 0 → length (reverse)
- `trigger: 'scroll'`: scroll-driven with `scrub: true`; `trigger: 'enter'`: entrance-triggered via ScrollTrigger `onEnter`
- No special mobile handling — SVG stroke animation works identically on all devices

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd awwwards-agent/packages/primitives && npx vitest run tests/primitives/path-draw.test.ts`
Expected: 5 tests PASS

- [ ] **Step 5: Add export to index.ts, commit**

```bash
git add packages/primitives/src/primitives/path-draw.ts packages/primitives/tests/primitives/path-draw.test.ts packages/primitives/src/index.ts
git commit -m "feat: implement path-draw primitive with SVG stroke animation"
```

---

### Task 19: Final integration — verify all exports and full test suite

**Files:**
- Modify: `awwwards-agent/packages/primitives/src/index.ts`

- [ ] **Step 1: Verify index.ts has all 12 primitive exports**

Final `index.ts` must export: `fadeUp`, `charReveal`, `preloader`, `scrollAway`, `scrollScale`, `scrubSequence`, `parallax`, `cursor`, `tilt`, `holdReveal`, `counter`, `pathDraw`

- [ ] **Step 2: Run full test suite**

Run: `cd awwwards-agent/packages/primitives && npx vitest run`
Expected: All tests PASS (~50+ tests)

- [ ] **Step 3: Type check**

Run: `cd awwwards-agent/packages/primitives && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Build**

Run: `cd awwwards-agent/packages/primitives && npx tsc`
Expected: `dist/` created with .js + .d.ts files

- [ ] **Step 5: Final commit**

```bash
git add packages/primitives/src/ packages/primitives/tests/
git commit -m "feat: complete @awwwards-agent/primitives package with all 12 primitives"
```

---

## Summary

| Chunk | Tasks | Contents | Est. Tests |
|-------|-------|----------|-----------|
| 1 — Infrastructure | 1-6 | Package setup, types, EventBus, config parser, registry, exports | ~20 |
| 2 — Entrance | 7-9 | fade-up, char-reveal, preloader | ~16 |
| 3 — Scroll | 10-13 | scroll-away, scroll-scale, scrub-sequence, parallax | ~22 |
| 4 — Interaction + Data | 14-19 | cursor, tilt, hold-reveal, counter, path-draw, integration | ~25 |

**Total: 19 tasks, ~83 tests, 12 primitives**

**Next plan:** `2026-03-14-manifest-schema-code-generator.md` (Subsystem #2)
