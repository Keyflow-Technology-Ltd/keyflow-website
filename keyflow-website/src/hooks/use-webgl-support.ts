"use client";
import { useState, useEffect } from "react";
import { detectWebGLSupport } from "@/lib/webgl-support";

export function useWebGLSupport(): boolean {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(detectWebGLSupport());
  }, []);

  return supported;
}
