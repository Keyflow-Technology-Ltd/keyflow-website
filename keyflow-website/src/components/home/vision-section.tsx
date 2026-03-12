"use client";
import { useRef, useEffect } from "react";
import { registerGSAP, gsap, ScrollTrigger } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const WORDS = [
  { text: "We're", accent: false },
  { text: "building", accent: false },
  { text: "the", accent: false },
  { text: "operating", accent: true },
  { text: "system", accent: true },
  { text: "for", accent: false },
  { text: "Dubai's", accent: true },
  { text: "real", accent: true },
  { text: "estate", accent: true },
  { text: "ecosystem.", accent: true },
];

export function VisionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    registerGSAP();

    const words = sectionRef.current.querySelectorAll("[data-word]");
    gsap.set(words, { opacity: 0.15 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onUpdate: (self) => {
        const progress = self.progress;
        words.forEach((word, i) => {
          const wordProgress = i / words.length;
          const opacity = Math.min(
            1,
            Math.max(0.15, (progress - wordProgress) * words.length)
          );
          gsap.set(word, { opacity });
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
      className="relative min-h-screen bg-brand-dark flex items-center justify-center px-6 py-24"
    >
      <p className="font-display text-4xl tablet:text-6xl desktop:text-7xl font-bold text-brand-light leading-tight max-w-5xl text-center">
        {WORDS.map((word, i) => (
          <span
            key={i}
            data-word
            className={
              word.accent ? "font-accent italic text-brand-accent" : ""
            }
          >
            {word.text}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
