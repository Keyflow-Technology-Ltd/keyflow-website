"use client";
import { useRef, useEffect } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    registerGSAP();

    const paragraphs = sectionRef.current.querySelectorAll("[data-reveal]");
    gsap.set(paragraphs, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(paragraphs, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.3,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <p data-reveal className="font-display text-3xl tablet:text-4xl font-bold text-brand-dark leading-relaxed">
          Dubai&apos;s real estate market moves fast. The tools haven&apos;t kept up.
        </p>
        <p data-reveal className="font-body text-lg text-brand-dark/60 leading-relaxed">
          Keyflow exists because we believe every stakeholder in Dubai real estate — from
          independent agents to large developers, from property owners to tenants — deserves
          software that was built for them, not adapted from another industry or another market.
        </p>
        <p data-reveal className="font-body text-lg text-brand-dark/60 leading-relaxed">
          We&apos;re building an integrated suite of tools that speak the language of Dubai
          real estate: DLD compliance, RERA regulations, Ejari contracts, and the unique
          dynamics of a market where WhatsApp is as important as email.
        </p>
      </div>
    </section>
  );
}
