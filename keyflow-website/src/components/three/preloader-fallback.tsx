"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface PreloaderFallbackProps {
  onComplete: () => void;
}

export function PreloaderFallback({ onComplete }: PreloaderFallbackProps) {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");

  // Stable onComplete reference
  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const loadTimer = setTimeout(() => setPhase("fading"), 1500);
    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    if (phase === "fading") {
      const fadeTimer = setTimeout(() => {
        setPhase("done");
        handleComplete();
      }, 800);
      return () => clearTimeout(fadeTimer);
    }
  }, [phase, handleComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-brand-dark flex items-center justify-center transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <Image
        src="/logos/KEYFLOW-04.svg"
        alt=""
        width={200}
        height={67}
        className={`transition-transform duration-1000 ${
          phase === "fading" ? "scale-150" : "scale-100"
        }`}
      />
    </div>
  );
}
