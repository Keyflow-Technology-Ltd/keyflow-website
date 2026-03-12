"use client";
import { useMemo } from "react";
import { Line } from "@react-three/drei";

interface PreloaderCablesProps {
  snapProgress: number; // 0 = all taut, 1 = all snapped
}

const CABLE_COUNT = 8;

type Point3 = [number, number, number];

function generateCablePoints(index: number, snapped: boolean): Point3[] {
  const angle = (index / CABLE_COUNT) * Math.PI * 2;
  const edgeRadius = 4;
  const edgeX = Math.cos(angle) * edgeRadius;
  const edgeY = Math.sin(angle) * edgeRadius;

  if (snapped) {
    // Cable droops down after snapping
    const midX = edgeX * 0.5;
    const midY = edgeY * 0.5 - 2;
    return [
      [edgeX, edgeY, 0],
      [midX, midY, 0],
      [midX, midY - 1, 0],
    ];
  }

  // Taut cable to center
  return [
    [edgeX, edgeY, 0],
    [edgeX * 0.3, edgeY * 0.3, 0],
    [0, 0, 0],
  ];
}

export function PreloaderCables({ snapProgress }: PreloaderCablesProps) {
  const cables = useMemo(() => {
    return Array.from({ length: CABLE_COUNT }, (_, i) => {
      const snapThreshold = i / CABLE_COUNT;
      const snapped = snapProgress > snapThreshold;
      return {
        key: i,
        points: generateCablePoints(i, snapped),
        opacity: snapped
          ? Math.max(0, 1 - (snapProgress - snapThreshold) * 3)
          : 0.6,
      };
    });
  }, [snapProgress]);

  return (
    <group>
      {cables.map((cable) => (
        <Line
          key={cable.key}
          points={cable.points}
          color="#C9A96E"
          lineWidth={1.5}
          opacity={cable.opacity}
          transparent
        />
      ))}
    </group>
  );
}
