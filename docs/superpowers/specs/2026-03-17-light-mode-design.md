# Light Mode — Design Spec

**Date:** 2026-03-17
**Scope:** Both LeadsFlow and LeaseFlow
**Status:** Approved

## Overview

Add a light/dark theme toggle to both LeadsFlow and LeaseFlow. Dark mode remains the default. Light mode is opt-in via a toggle in the sidebar navigation.

## Toggle

- **Location:** Sidebar nav, alongside Settings and Logout icons
- **Icons:** Sun icon (switch to light) / Moon icon (switch to dark)
- **Persistence:** `localStorage` key `theme` with values `"light"` or `"dark"`
- **Default:** `"dark"` (no localStorage entry = dark)

## Mechanism

1. `ThemeProvider` component reads localStorage on mount, applies `class="dark"` to `<html>` (or removes it for light)
2. Toggle updates localStorage and toggles the class
3. Flash prevention: inline `<script>` in `<head>` reads localStorage before paint and sets the class immediately
4. Tailwind `darkMode: ["class"]` already configured in both apps

## CSS Variable Strategy

Current dark-only variables in `globals.css` get split:

```css
:root {
  /* Light theme (new) */
  --background: 0 0% 98%;        /* #FAFAFA */
  --foreground: 0 0% 9%;         /* near-black text */
  --card: 0 0% 100%;             /* white */
  --card-foreground: 0 0% 9%;
  --popover: 0 0% 100%;
  --popover-foreground: 0 0% 9%;
  --primary: <brand hue>;        /* sage for LeaseFlow, indigo for LeadsFlow */
  --primary-foreground: 0 0% 98%;
  --secondary: 0 0% 96%;
  --secondary-foreground: 0 0% 9%;
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 40%;
  --accent: <brand hue light>;
  --accent-foreground: <brand hue dark>;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 98%;
  --border: 0 0% 89%;
  --input: 0 0% 89%;
  --ring: <brand hue>;
  --radius: 0.5rem;
  --sidebar-background: 0 0% 96%;
  --sidebar-foreground: 0 0% 15%;
  --sidebar-primary: <brand hue>;
  --sidebar-primary-foreground: 0 0% 98%;
  --sidebar-accent: <brand hue very light>;
  --sidebar-accent-foreground: 0 0% 15%;
  --sidebar-border: 0 0% 89%;
  --sidebar-ring: <brand hue>;
}

.dark {
  /* Current dark theme values (moved here from :root) */
  --background: 240 5% 8%;
  --foreground: 0 0% 95%;
  /* ... all existing dark values ... */
}
```

## Hardcoded Color Replacement

Many components use hardcoded dark colors instead of CSS variables. These must be replaced:

| Hardcoded | Replace with |
|-----------|-------------|
| `bg-[#141416]` | `bg-background` |
| `bg-neutral-900` | `bg-card` or `bg-background` |
| `bg-neutral-900/50` | `bg-card/50` |
| `text-neutral-100` | `text-foreground` |
| `text-neutral-400` | `text-muted-foreground` |
| `text-neutral-500` | `text-muted-foreground` |
| `border-white/[0.08]` | `border-border` |
| `border-white/[0.12]` | `border-border` |

## Files to Change (per app)

### New files
1. `ThemeProvider` component — context + localStorage + class toggle
2. `ThemeToggle` component — sun/moon button

### Modified files
1. `globals.css` — split variables into `:root` (light) and `.dark` (dark)
2. `layout.tsx` — wrap with ThemeProvider, add flash-prevention script
3. Sidebar component — add ThemeToggle button
4. `tailwind.config.ts` — no changes needed (darkMode already configured)
5. All components with hardcoded dark colors — replace with variable-driven classes

### Estimated hardcoded replacements
- **LeadsFlow:** ~300+ instances (bulk sed replacement, same approach as the dark theme migration)
- **LeaseFlow:** ~200+ instances

## Light Palette — LeadsFlow (Indigo)

- Background: `#FAFAFA`
- Card: `#FFFFFF` with `border-neutral-200`
- Text primary: `#171717` (neutral-900)
- Text secondary: `#525252` (neutral-600)
- Text muted: `#737373` (neutral-500)
- Brand accent: `#5B5EA8` (unchanged)
- Sidebar: `#F5F5F5` with indigo accent highlights
- Input: white with `border-neutral-300`, focus ring indigo

## Light Palette — LeaseFlow (Sage)

- Background: `#FAFAFA`
- Card: `#FFFFFF` with `border-neutral-200`
- Text primary: `#171717`
- Text secondary: `#525252`
- Text muted: `#737373`
- Brand accent: `#4A9468` (unchanged)
- Sidebar: `#F5F5F5` with sage accent highlights
- Input: white with `border-neutral-300`, focus ring sage

## What stays unchanged

- All functionality, API routes, database operations
- Animations and transitions
- Font families and type scale
- Brand colors (sage/indigo)
- Mobile layout and responsive behavior
