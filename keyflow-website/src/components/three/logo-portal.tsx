"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

type PortalPhase = "loading" | "snapping" | "hovering" | "portal" | "complete";

interface LogoPortalProps {
  phase: PortalPhase;
}

export function LogoPortal({ phase }: LogoPortalProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetY = useRef(0);
  const targetRotation = useRef(0);
  const targetScale = useRef(1);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    switch (phase) {
      case "loading":
        targetY.current = 0;
        targetRotation.current = 0;
        targetScale.current = 1;
        break;
      case "snapping":
        targetY.current = -0.3;
        break;
      case "hovering":
        targetY.current = -0.1 + Math.sin(Date.now() * 0.002) * 0.05;
        break;
      case "portal":
        targetRotation.current += delta * 3;
        targetScale.current = 5;
        break;
      default:
        break;
    }

    const lerpSpeed = phase === "portal" ? 3 : 5;
    groupRef.current.position.y +=
      (targetY.current - groupRef.current.position.y) * delta * lerpSpeed;
    groupRef.current.rotation.z +=
      (targetRotation.current - groupRef.current.rotation.z) * delta * lerpSpeed;
    groupRef.current.scale.setScalar(
      groupRef.current.scale.x +
        (targetScale.current - groupRef.current.scale.x) * delta * lerpSpeed,
    );
  });

  return (
    <group ref={groupRef}>
      <Text
        fontSize={0.8}
        color="#C9A96E"
        anchorX="center"
        anchorY="middle"
      >
        K
      </Text>
      {/* Geometric ring around the logo */}
      <mesh>
        <ringGeometry args={[0.9, 1.0, 64]} />
        <meshBasicMaterial color="#C9A96E" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}
