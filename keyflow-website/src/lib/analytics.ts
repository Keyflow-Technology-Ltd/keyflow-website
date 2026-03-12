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
    persistence: "memory",
    autocapture: false,
    capture_pageview: false,
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
