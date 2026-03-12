"use client";
import { useState, useEffect } from "react";
import { breakpoints } from "@/lib/tokens";

export type Viewport = "mobile" | "tablet" | "desktop";

export function useViewport(): Viewport {
  const [viewport, setViewport] = useState<Viewport>("desktop");

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < breakpoints.mobile) setViewport("mobile");
      else if (w < breakpoints.tablet) setViewport("tablet");
      else setViewport("desktop");
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return viewport;
}
