"use client";
import { useRef, useEffect } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { products } from "@/content/products";

function splitProductName(name: string): { prefix: string; suffix: string } | null {
  if (name.toLowerCase().endsWith("flow")) {
    return {
      prefix: name.slice(0, -4),
      suffix: "flow",
    };
  }
  return null;
}

export function ProductReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;
    registerGSAP();

    const sections = containerRef.current.querySelectorAll("[data-product]");

    sections.forEach((section) => {
      const elements = section.querySelectorAll("[data-reveal]");
      gsap.set(elements, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          });
        },
        onLeaveBack: () => {
          gsap.set(elements, { opacity: 0, y: 30 });
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef}>
      {products.map((product, i) => {
        const isDark = i % 2 === 1;
        const nameParts = splitProductName(product.name);

        return (
          <section
            key={product.slug}
            data-product={product.slug}
            className={`min-h-screen flex flex-col items-center justify-center px-6 py-24 ${
              isDark ? "bg-brand-dark" : "bg-brand-light"
            }`}
          >
            <h2
              data-reveal
              className={`font-display text-6xl desktop:text-[8rem] font-bold tracking-tight leading-none ${
                isDark ? "text-brand-light" : "text-brand-dark"
              }`}
            >
              {nameParts ? (
                <>
                  {nameParts.prefix}
                  <span className="text-brand-accent">{nameParts.suffix}</span>
                </>
              ) : (
                product.name
              )}
            </h2>
            <p
              data-reveal
              className={`font-accent italic text-xl desktop:text-2xl mt-4 ${
                isDark ? "text-brand-light/70" : "text-brand-dark/70"
              }`}
            >
              {product.tagline}
            </p>
            <p
              data-reveal
              className={`font-body text-base desktop:text-lg mt-6 max-w-xl text-center ${
                isDark ? "text-brand-light/60" : "text-brand-dark/60"
              }`}
            >
              {product.description}
            </p>
            <ul data-reveal className="mt-8 space-y-2 max-w-md">
              {product.capabilities.map((cap) => (
                <li
                  key={cap}
                  className={`font-body text-sm flex items-start gap-2 ${
                    isDark ? "text-brand-light/50" : "text-brand-dark/50"
                  }`}
                >
                  <span className="text-brand-accent mt-1">•</span>
                  {cap}
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
