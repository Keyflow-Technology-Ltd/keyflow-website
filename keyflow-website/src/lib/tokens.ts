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
