"use client";
import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import vertexShader from "@/shaders/particle.vert";
import fragmentShader from "@/shaders/particle.frag";

interface ParticleFieldProps {
  count?: number;
  formation?: "ambient" | "converge" | "radiate" | "grid" | "cluster";
  transition?: number;
  colorMode?: "light" | "dark";
  visible?: boolean;
}

function generateTargets(
  formation: string,
  count: number,
): Float32Array {
  const targets = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    switch (formation) {
      case "converge": {
        const angle = (i / count) * Math.PI * 2;
        const radius = 0.5 + Math.random() * 0.3;
        targets[i3] = Math.cos(angle) * radius;
        targets[i3 + 1] = Math.sin(angle) * radius;
        targets[i3 + 2] = (Math.random() - 0.5) * 0.5;
        break;
      }
      case "radiate": {
        const a = Math.random() * Math.PI * 2;
        const r = 1.0 + Math.random() * 3.0;
        targets[i3] = Math.cos(a) * r;
        targets[i3 + 1] = Math.sin(a) * r;
        targets[i3 + 2] = (Math.random() - 0.5) * 0.5;
        break;
      }
      case "grid": {
        const cols = Math.ceil(Math.sqrt(count));
        const row = Math.floor(i / cols);
        const col = i % cols;
        targets[i3] = (col / cols - 0.5) * 4;
        targets[i3 + 1] = (row / cols - 0.5) * 4;
        targets[i3 + 2] = 0;
        break;
      }
      case "cluster": {
        const clusterIdx = i % 4;
        const cx = ((clusterIdx % 2) - 0.5) * 2;
        const cy = (Math.floor(clusterIdx / 2) - 0.5) * 2;
        targets[i3] = cx + (Math.random() - 0.5) * 0.8;
        targets[i3 + 1] = cy + (Math.random() - 0.5) * 0.8;
        targets[i3 + 2] = (Math.random() - 0.5) * 0.3;
        break;
      }
      default: {
        targets[i3] = (Math.random() - 0.5) * 8;
        targets[i3 + 1] = (Math.random() - 0.5) * 6;
        targets[i3 + 2] = (Math.random() - 0.5) * 2;
      }
    }
  }
  return targets;
}

export function ParticleField({
  count = 2000,
  formation = "ambient",
  transition = 0,
  colorMode = "light",
  visible = true,
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  // Stable across colorMode changes — only regenerate when count changes
  const { positions, randoms } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      rand[i] = Math.random();
    }

    return { positions: pos, randoms: rand };
  }, [count]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uTransition: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor: { value: new THREE.Color(colorMode === "light" ? "#1b1b1b" : "#fafafa") },
  }), [colorMode]);

  const targets = useMemo(
    () => generateTargets(formation, count),
    [formation, count],
  );

  // Attach mouse listener to window (canvas has pointer-events: none)
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  // Update target buffer when formation changes — replace attribute entirely
  useEffect(() => {
    if (!points.current) return;
    const geo = points.current.geometry;
    geo.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
  }, [targets]);

  // Update color uniform when colorMode changes
  useEffect(() => {
    if (!points.current) return;
    const material = points.current.material as THREE.ShaderMaterial;
    material.uniforms.uColor.value.set(
      colorMode === "light" ? "#1b1b1b" : "#fafafa",
    );
  }, [colorMode]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const material = points.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = clock.getElapsedTime();
    material.uniforms.uTransition.value = transition;
    material.uniforms.uMouse.value.copy(mouse.current);
  });

  return (
    <points ref={points} visible={visible}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
        <bufferAttribute
          attach="attributes-aTarget"
          args={[targets, 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
