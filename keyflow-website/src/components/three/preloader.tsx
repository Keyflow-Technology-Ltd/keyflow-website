"use client";
import { useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { PreloaderCables } from "./preloader-cables";
import { LogoPortal } from "./logo-portal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type PreloaderPhase = "loading" | "snapping" | "hovering" | "portal" | "complete";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<PreloaderPhase>("loading");
  const [loadProgress, setLoadProgress] = useState(0);
  const [skipEnabled, setSkipEnabled] = useState(false);

  // Skip preloader entirely for users who prefer reduced motion
  useEffect(() => {
    if (reducedMotion) {
      onComplete();
    }
  }, [reducedMotion, onComplete]);

  // Enable skip after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setSkipEnabled(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Maximum duration: 5 seconds — force transition to snapping
  useEffect(() => {
    const timer = setTimeout(() => {
      if (phase === "loading") {
        setPhase("snapping");
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [phase]);

  // Skip handler (click or keypress after 2s gate)
  useEffect(() => {
    if (!skipEnabled || phase === "complete" || phase !== "loading") return;
    const handler = () => setPhase("snapping");
    window.addEventListener("click", handler);
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("keydown", handler);
    };
  }, [skipEnabled, phase]);

  // Stable onComplete reference to avoid stale closure issues
  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Phase transitions
  useEffect(() => {
    if (phase === "snapping") {
      const timer = setTimeout(() => setPhase("hovering"), 600);
      return () => clearTimeout(timer);
    }
    if (phase === "hovering") {
      const timer = setTimeout(() => setPhase("portal"), 800);
      return () => clearTimeout(timer);
    }
    if (phase === "portal") {
      const timer = setTimeout(() => {
        setPhase("complete");
        handleComplete();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [phase, handleComplete]);

  // Simulate loading progress (real progress from Drei useProgress would replace this)
  useEffect(() => {
    if (phase !== "loading") return;
    const interval = setInterval(() => {
      setLoadProgress((prev) => {
        const next = prev + 0.05 + Math.random() * 0.1;
        if (next >= 1) {
          setPhase("snapping");
          return 1;
        }
        return next;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [phase]);

  if (phase === "complete") return null;

  const snapProgress =
    phase === "loading"
      ? loadProgress * 0.3
      : phase === "snapping"
        ? 1
        : 1;

  return (
    <div className="fixed inset-0 z-50 bg-brand-dark" aria-hidden="true">
      <Canvas
        gl={{ antialias: true, alpha: false }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <PreloaderCables snapProgress={snapProgress} />
        <LogoPortal phase={phase} />
      </Canvas>
      {skipEnabled && phase === "loading" && (
        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-light/30 text-sm font-body">
          Click or press any key to skip
        </p>
      )}
    </div>
  );
}
