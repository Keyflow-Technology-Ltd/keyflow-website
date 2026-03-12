"use client";
import { useRef, useEffect } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { team } from "@/content/team";

const SIZE_MAP = {
  large: "w-64 h-80 tablet:w-80 tablet:h-96",
  medium: "w-48 h-60 tablet:w-56 tablet:h-72",
  small: "w-36 h-44 tablet:w-44 tablet:h-56",
};

const OFFSET_MAP: Record<string, string> = {
  "0": "tablet:translate-x-0 tablet:translate-y-0",
  "1": "tablet:translate-x-24 tablet:-translate-y-12",
  "2": "tablet:-translate-x-12 tablet:translate-y-8",
};

export function TeamScatter() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    registerGSAP();

    const cards = sectionRef.current.querySelectorAll("[data-team-card]");
    gsap.set(cards, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      onEnter: () => {
        gsap.to(cards, {
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
    <section ref={sectionRef} className="py-24 px-6">
      <h2 className="font-display text-3xl tablet:text-5xl font-bold text-brand-dark text-center mb-20">
        The Team
      </h2>
      <div className="max-w-5xl mx-auto flex flex-col tablet:flex-row items-center tablet:items-start justify-center gap-12 tablet:gap-8">
        {team.map((member, i) => (
          <div
            key={member.name}
            data-team-card
            className={`flex flex-col items-center ${OFFSET_MAP[String(i)] ?? ""}`}
          >
            <div
              className={`${SIZE_MAP[member.size]} rounded-2xl bg-brand-dark/5 flex items-center justify-center mb-6 overflow-hidden`}
            >
              {/* Placeholder — real photos go in public/images/team/ */}
              <span className="font-display text-5xl text-brand-dark/10">
                {member.name.charAt(0)}
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-brand-dark">
              {member.name}
            </h3>
            <p className="font-body text-sm text-brand-accent mt-1">{member.title}</p>
            <p className="font-accent italic text-sm text-brand-dark/50 mt-2 max-w-xs text-center">
              {member.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
