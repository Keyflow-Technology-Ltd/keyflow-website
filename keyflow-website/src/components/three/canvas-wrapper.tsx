"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useViewport } from "@/hooks/use-viewport";

interface CanvasWrapperProps {
  children: React.ReactNode;
}

export function CanvasWrapper({ children }: CanvasWrapperProps) {
  const webgl = useWebGLSupport();
  const reducedMotion = useReducedMotion();
  const viewport = useViewport();

  // No WebGL on mobile or unsupported devices or reduced motion
  if (!webgl || viewport === "mobile" || reducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
}
