"use client";
import { useRef, useEffect } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function DLDHighlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    registerGSAP();

    const elements = sectionRef.current.querySelectorAll("[data-reveal]");
    gsap.set(elements, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-brand-dark text-center">
      <div className="max-w-3xl mx-auto">
        <p data-reveal className="font-body text-sm uppercase tracking-[0.2em] text-brand-accent mb-6">
          Data Foundation
        </p>
        <h2 data-reveal className="font-display text-3xl tablet:text-5xl font-bold text-brand-light mb-6">
          Built on authenticated data from the Dubai Land Department.
        </h2>
        <p data-reveal className="font-body text-base text-brand-light/50 max-w-xl mx-auto">
          Every transaction, every listing, every regulation — flowing through one verified source. Not scraped. Not estimated. Authenticated.
        </p>
      </div>
    </section>
  );
}
