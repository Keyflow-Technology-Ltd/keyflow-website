"use client";
import { useSyncExternalStore } from "react";
import { detectWebGLSupport } from "@/lib/webgl-support";

let cachedSupport: boolean | null = null;

function getSnapshot(): boolean {
  if (cachedSupport === null) {
    cachedSupport = detectWebGLSupport();
  }
  return cachedSupport;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(): () => void {
  // WebGL support doesn't change after the initial probe, so the
  // subscription is a no-op. useSyncExternalStore still wants one.
  return () => {};
}

export function useWebGLSupport(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
