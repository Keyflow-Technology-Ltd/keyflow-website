"use client";
import { useRef, useEffect } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Product } from "@/content/products";

interface ProductDeepDiveProps {
  product: Product;
  index: number;
}

export function ProductDeepDive({ product, index }: ProductDeepDiveProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isDark = index % 2 === 0;

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    registerGSAP();

    const elements = sectionRef.current.querySelectorAll("[data-reveal]");
    gsap.set(elements, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`py-24 px-6 ${isDark ? "bg-brand-dark" : "bg-brand-light"}`}
    >
      <div className="max-w-5xl mx-auto">
        <h3
          data-reveal
          className={`font-display text-5xl desktop:text-[6rem] font-bold leading-none mb-4 ${
            isDark ? "text-brand-light" : "text-brand-dark"
          }`}
        >
          {product.name}
        </h3>
        <p
          data-reveal
          className={`font-accent italic text-xl mb-2 ${
            isDark ? "text-brand-accent" : "text-brand-accent"
          }`}
        >
          {product.tagline}
        </p>
        <p
          data-reveal
          className={`font-body text-base max-w-2xl mb-12 ${
            isDark ? "text-brand-light/60" : "text-brand-dark/60"
          }`}
        >
          {product.description}
        </p>
        <div data-reveal className="grid tablet:grid-cols-2 gap-6 mb-12">
          {product.capabilities.map((cap) => (
            <div
              key={cap}
              className={`flex items-start gap-3 ${
                isDark ? "text-brand-light/70" : "text-brand-dark/70"
              }`}
            >
              <span className="text-brand-accent mt-1 text-lg">→</span>
              <p className="font-body text-sm">{cap}</p>
            </div>
          ))}
        </div>
        <div data-reveal>
          <span
            className={`inline-block font-display text-xs uppercase tracking-[0.3em] px-4 py-2 rounded-full border ${
              isDark
                ? "border-brand-light/20 text-brand-light/40"
                : "border-brand-dark/20 text-brand-dark/40"
            }`}
          >
            Coming Soon
          </span>
        </div>
      </div>
    </section>
  );
}
