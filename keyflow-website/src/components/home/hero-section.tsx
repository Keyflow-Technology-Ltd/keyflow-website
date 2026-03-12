"use client";
import { useRef, useEffect } from "react";
import { registerGSAP, gsap } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;
    registerGSAP();

    const elements = sectionRef.current.querySelectorAll("[data-animate]");
    gsap.set(elements, { opacity: 0, y: 40 });
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.2,
      delay: 0.3,
    });
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <h1
        data-animate
        className="font-display text-7xl desktop:text-[12rem] font-bold tracking-tight text-brand-dark leading-none"
      >
        KEYFLOW
      </h1>
      <p
        data-animate
        className="font-accent italic text-lg desktop:text-2xl text-brand-dark/70 mt-4 desktop:mt-6"
      >
        The Future of Real Estate, Flowing.
      </p>
      <div data-animate className="mt-8 desktop:mt-12">
        <Link href="/contact">
          <Button variant="secondary" size="lg">
            Get Early Access
          </Button>
        </Link>
      </div>
    </section>
  );
}
