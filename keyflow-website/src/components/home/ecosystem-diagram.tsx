"use client";
import { useRef, useEffect, useState } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const PRODUCTS = [
  { id: "dealsflow", label: "Dealsflow", x: 200, y: 150 },
  { id: "leadsflow", label: "Leadsflow", x: 500, y: 150 },
  { id: "leaseflow", label: "Leaseflow", x: 200, y: 350 },
  { id: "connect", label: "Connect", x: 500, y: 350 },
];

const STAKEHOLDERS = [
  { id: "agents", label: "Agents", x: 50, y: 250 },
  { id: "agencies", label: "Agencies", x: 100, y: 100 },
  { id: "developers", label: "Developers", x: 650, y: 100 },
  { id: "owners", label: "Owners", x: 650, y: 250 },
  { id: "tenants", label: "Tenants", x: 600, y: 400 },
];

const CENTER = { id: "keyflow", label: "Keyflow", x: 350, y: 250 };
const DLD = { id: "dld", label: "DLD", x: 350, y: 450 };

const CONNECTIONS = [
  ...PRODUCTS.map((p) => ({ from: CENTER, to: p })),
  ...STAKEHOLDERS.map((s) => {
    const closest = PRODUCTS.reduce((a, b) =>
      Math.hypot(a.x - s.x, a.y - s.y) < Math.hypot(b.x - s.x, b.y - s.y)
        ? a
        : b,
    );
    return { from: closest, to: s };
  }),
  { from: DLD, to: CENTER },
];

export function EcosystemDiagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (reducedMotion || !svgRef.current) return;
    registerGSAP();

    const lines = svgRef.current.querySelectorAll("[data-connection]");
    lines.forEach((line) => {
      const el = line as SVGLineElement;
      const length = Math.hypot(
        Number(el.getAttribute("x2")) - Number(el.getAttribute("x1")),
        Number(el.getAttribute("y2")) - Number(el.getAttribute("y1")),
      );
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      end: "bottom 40%",
      onUpdate: (self) => {
        lines.forEach((line, i) => {
          const el = line as SVGLineElement;
          const length = Number(el.style.strokeDasharray) || 200;
          const lineProgress = Math.min(
            1,
            Math.max(
              0,
              (self.progress - (i / lines.length) * 0.5) * 3,
            ),
          );
          gsap.set(el, { strokeDashoffset: length * (1 - lineProgress) });
        });
      },
    });

    const nodes = svgRef.current.querySelectorAll("[data-node]");
    gsap.set(nodes, { opacity: 0, scale: 0.8, transformOrigin: "center" });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 50%",
      onEnter: () => {
        gsap.to(nodes, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.5)",
          stagger: 0.08,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  function isConnected(nodeId: string): boolean {
    if (!hoveredNode) return false;
    return CONNECTIONS.some(
      (c) =>
        (c.from.id === hoveredNode && c.to.id === nodeId) ||
        (c.to.id === hoveredNode && c.from.id === nodeId) ||
        nodeId === hoveredNode,
    );
  }

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-brand-light">
      <h2 className="font-display text-3xl tablet:text-5xl font-bold text-brand-dark text-center mb-16">
        The Ecosystem
      </h2>
      <div className="max-w-3xl mx-auto">
        <svg
          ref={svgRef}
          viewBox="0 0 700 500"
          className="w-full h-auto"
          aria-label="Keyflow ecosystem diagram showing how products connect stakeholders"
          role="img"
        >
          {/* Connection lines */}
          {CONNECTIONS.map((conn, i) => (
            <line
              key={i}
              data-connection
              x1={conn.from.x}
              y1={conn.from.y}
              x2={conn.to.x}
              y2={conn.to.y}
              stroke={
                hoveredNode &&
                isConnected(conn.from.id) &&
                isConnected(conn.to.id)
                  ? "#C9A96E"
                  : "#1b1b1b"
              }
              strokeWidth={
                hoveredNode &&
                isConnected(conn.from.id) &&
                isConnected(conn.to.id)
                  ? 2
                  : 1
              }
              strokeOpacity={
                hoveredNode && !isConnected(conn.from.id) ? 0.1 : 0.3
              }
              className="transition-all duration-300"
            />
          ))}

          {/* Center node */}
          <g
            data-node
            onMouseEnter={() => setHoveredNode(CENTER.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer"
          >
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r={35}
              fill="#C9A96E"
              fillOpacity={0.15}
              stroke="#C9A96E"
              strokeWidth={2}
            />
            <text
              x={CENTER.x}
              y={CENTER.y + 5}
              textAnchor="middle"
              className="font-display text-sm font-bold fill-brand-dark"
            >
              {CENTER.label}
            </text>
          </g>

          {/* DLD node */}
          <g
            data-node
            onMouseEnter={() => setHoveredNode(DLD.id)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer"
          >
            <rect
              x={DLD.x - 30}
              y={DLD.y - 15}
              width={60}
              height={30}
              rx={6}
              fill="#1b1b1b"
              fillOpacity={0.05}
              stroke="#1b1b1b"
              strokeWidth={1}
              strokeOpacity={0.3}
            />
            <text
              x={DLD.x}
              y={DLD.y + 5}
              textAnchor="middle"
              className="font-body text-xs fill-brand-dark/70"
            >
              {DLD.label}
            </text>
          </g>

          {/* Product nodes */}
          {PRODUCTS.map((product) => (
            <g
              key={product.id}
              data-node
              onMouseEnter={() => setHoveredNode(product.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
              opacity={hoveredNode && !isConnected(product.id) ? 0.3 : 1}
            >
              <circle
                cx={product.x}
                cy={product.y}
                r={28}
                fill={isConnected(product.id) ? "#C9A96E" : "#1b1b1b"}
                fillOpacity={isConnected(product.id) ? 0.2 : 0.05}
                stroke={isConnected(product.id) ? "#C9A96E" : "#1b1b1b"}
                strokeWidth={1}
                strokeOpacity={0.3}
                className="transition-all duration-300"
              />
              <text
                x={product.x}
                y={product.y + 4}
                textAnchor="middle"
                className="font-body text-xs fill-brand-dark"
              >
                {product.label}
              </text>
            </g>
          ))}

          {/* Stakeholder nodes */}
          {STAKEHOLDERS.map((s) => (
            <g
              key={s.id}
              data-node
              onMouseEnter={() => setHoveredNode(s.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
              opacity={hoveredNode && !isConnected(s.id) ? 0.3 : 1}
            >
              <circle
                cx={s.x}
                cy={s.y}
                r={22}
                fill="transparent"
                stroke={isConnected(s.id) ? "#C9A96E" : "#1b1b1b"}
                strokeWidth={1}
                strokeOpacity={0.3}
                strokeDasharray="4 2"
                className="transition-all duration-300"
              />
              <text
                x={s.x}
                y={s.y + 4}
                textAnchor="middle"
                className="font-body text-[10px] fill-brand-dark/60"
              >
                {s.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
