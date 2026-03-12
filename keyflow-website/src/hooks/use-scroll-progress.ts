"use client";
import { useEffect, useRef, useState } from "react";
import { registerGSAP, ScrollTrigger } from "@/lib/motion";

export function useScrollProgress(options?: { start?: string; end?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    registerGSAP();
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: options?.start ?? "top bottom",
      end: options?.end ?? "bottom top",
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [options?.start, options?.end]);

  return { ref, progress };
}
