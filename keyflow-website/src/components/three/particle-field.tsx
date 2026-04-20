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
  colorMode?: "light" | "dark" | "accent";
  visible?: boolean;
}

const COLOR_MAP: Record<string, string> = {
  light: "#1b1b1b",
  dark: "#fafafa",
  accent: "#C9A96E",
};

/** Deterministic 32-bit PRNG (Mulberry32). Pure: same seed → same sequence. */
function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
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
        targets[i3] = (Math.random() - 0.5) * 10;
        targets[i3 + 1] = (Math.random() - 0.5) * 8;
        targets[i3 + 2] = (Math.random() - 0.5) * 3;
      }
    }
  }
  return targets;
}

export function ParticleField({
  count = 1500,
  formation = "ambient",
  transition = 0,
  colorMode = "accent",
  visible = true,
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));

  // Seed particle positions + per-particle random factors deterministically
  // from `count` so the computation is pure (no Math.random in render —
  // React 19's `react-hooks/purity` rule flags that). mulberry32 gives a
  // fast 32-bit PRNG with excellent distribution for this seed size.
  const { positions, randoms } = useMemo(() => {
    const rng = mulberry32(count ^ 0x9e3779b9);
    const pos = new Float32Array(count * 3);
    const rand = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rng() - 0.5) * 14;
      pos[i * 3 + 1] = (rng() - 0.5) * 10;
      pos[i * 3 + 2] = (rng() - 0.5) * 6;
      rand[i] = rng();
    }
    return { positions: pos, randoms: rand };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTransition: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColor: { value: new THREE.Color(COLOR_MAP[colorMode] ?? COLOR_MAP.accent) },
    }),
    [colorMode],
  );

  const targets = useMemo(
    () => generateTargets(formation, count),
    [formation, count],
  );

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

  useEffect(() => {
    if (!points.current) return;
    const geo = points.current.geometry;
    geo.setAttribute("aTarget", new THREE.BufferAttribute(targets, 3));
  }, [targets]);

  useEffect(() => {
    if (!points.current) return;
    const material = points.current.material as THREE.ShaderMaterial;
    material.uniforms.uColor.value.set(COLOR_MAP[colorMode] ?? COLOR_MAP.accent);
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
