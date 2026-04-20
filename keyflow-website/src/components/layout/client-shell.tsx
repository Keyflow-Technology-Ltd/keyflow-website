"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { Preloader } from "@/components/three/preloader";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { CustomCursor } from "@/components/layout/custom-cursor";

const CanvasWrapper = dynamic(
  () =>
    import("@/components/three/canvas-wrapper").then((m) => m.CanvasWrapper),
  { ssr: false },
);

const ParticleField = dynamic(
  () =>
    import("@/components/three/particle-field").then((m) => m.ParticleField),
  { ssr: false },
);

interface ClientShellProps {
  children: React.ReactNode;
}

export function ClientShell({ children }: ClientShellProps) {
  const [showPreloader, setShowPreloader] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const hasCheckedSession = useRef(false);

  // Initialise preloader state from sessionStorage once on mount.
  // We need an effect because sessionStorage is browser-only (SSR can't
  // read it), so the initial render must use a safe default. The setState
  // calls below are the intended synchronisation pattern between the
  // external session store and React state.
  useEffect(() => {
    if (hasCheckedSession.current) return;
    hasCheckedSession.current = true;

    const seen = sessionStorage.getItem("keyflow-preloader-seen");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (seen) setPreloaderDone(true);
    else setShowPreloader(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
    setShowPreloader(false);
    try {
      sessionStorage.setItem("keyflow-preloader-seen", "1");
    } catch {
      // sessionStorage unavailable — ignore
    }
  }, []);

  return (
    <>
      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Preloader overlay — only first visit per session */}
      {showPreloader && !preloaderDone && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* Ambient particle field — above content, purely decorative */}
      {preloaderDone && (
        <CanvasWrapper>
          <ParticleField count={1000} colorMode="accent" />
        </CanvasWrapper>
      )}

      {/* Page content — always rendered, visible after preloader fades */}
      <div
        style={{
          opacity: preloaderDone ? 1 : 0,
          transition: "opacity 0.8s ease-out",
        }}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </div>
    </>
  );
}
