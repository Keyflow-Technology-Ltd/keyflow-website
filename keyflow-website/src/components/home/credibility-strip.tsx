"use client";
import { useRef, useEffect } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { team } from "@/content/team";

const PARTNERS = [
  { name: "Dubai PropTech Hub", note: "DIFC × DLD Initiative" },
  { name: "DIFC", note: "Dubai International Financial Centre" },
  { name: "DLD", note: "Dubai Land Department" },
];

export function CredibilityStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    registerGSAP();

    const elements = sectionRef.current.querySelectorAll("[data-fade]");
    gsap.set(elements, { opacity: 0, y: 20 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [reducedMotion]);

  const advisors = team.filter((m) => m.role === "advisor");

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-brand-light border-t border-brand-dark/5"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Partner affiliations */}
        <div
          data-fade
          className="flex flex-wrap justify-center gap-12 tablet:gap-16 mb-16"
        >
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="text-center">
              <p className="font-display text-lg font-bold text-brand-dark">
                {partner.name}
              </p>
              <p className="font-body text-xs text-brand-dark/50 mt-1">
                {partner.note}
              </p>
            </div>
          ))}
        </div>

        {/* Powered by DLD data */}
        <p
          data-fade
          className="text-center font-body text-sm text-brand-dark/50 mb-16"
        >
          Powered by authenticated DLD data
        </p>

        {/* Strategic advisors */}
        <div
          data-fade
          className="flex flex-col tablet:flex-row justify-center gap-12 tablet:gap-20"
        >
          {advisors.map((advisor) => (
            <div key={advisor.name} className="text-center">
              <div className="w-20 h-20 rounded-full bg-brand-dark/5 mx-auto mb-4 flex items-center justify-center">
                <span className="font-display text-2xl text-brand-dark/30">
                  {advisor.name.charAt(0)}
                </span>
              </div>
              <p className="font-display text-base font-bold text-brand-dark">
                {advisor.name}
              </p>
              <p className="font-body text-sm text-brand-accent">
                {advisor.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
