"use client";
import { useRef, useEffect } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function PropTechHub() {
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
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-brand-dark">
      <div className="max-w-3xl mx-auto text-center">
        <p data-reveal className="font-body text-sm uppercase tracking-[0.2em] text-brand-accent mb-6">
          Our Home
        </p>
        <h2 data-reveal className="font-display text-3xl tablet:text-5xl font-bold text-brand-light mb-6">
          Part of the Dubai PropTech Hub
        </h2>
        <p data-reveal className="font-body text-base text-brand-light/50 max-w-xl mx-auto mb-12">
          A joint initiative by DIFC and DLD, the Dubai PropTech Hub supports
          technology companies transforming the emirate&apos;s real estate sector.
          Keyflow is proud to be part of this ecosystem.
        </p>
        <div data-reveal className="flex justify-center gap-12 text-brand-light/30">
          <div className="text-center">
            <p className="font-display text-lg font-bold text-brand-light/60">DIFC</p>
            <p className="font-body text-xs text-brand-light/30 mt-1">Dubai International Financial Centre</p>
          </div>
          <div className="text-center">
            <p className="font-display text-lg font-bold text-brand-light/60">DLD</p>
            <p className="font-body text-xs text-brand-light/30 mt-1">Dubai Land Department</p>
          </div>
        </div>
      </div>
    </section>
  );
}
