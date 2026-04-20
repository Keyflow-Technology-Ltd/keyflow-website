"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { registerGSAP, gsap } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const TRANSITION_DURATION = 0.8;

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPathname = useRef(pathname);

  const animateTransition = useCallback(async () => {
    if (!containerRef.current || reducedMotion) {
      setDisplayChildren(children);
      return;
    }

    registerGSAP();
    setIsTransitioning(true);

    if ("startViewTransition" in document) {
      const transition = (
        document as unknown as {
          startViewTransition: (cb: () => void) => { finished: Promise<void> };
        }
      ).startViewTransition(() => {
        setDisplayChildren(children);
      });
      await transition.finished;
    } else {
      await gsap.to(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: TRANSITION_DURATION / 2,
        ease: "power2.in",
      });

      setDisplayChildren(children);

      await gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: TRANSITION_DURATION / 2,
          ease: "power2.out",
        },
      );
    }

    setIsTransitioning(false);

    const main = document.getElementById("main-content");
    main?.focus({ preventScroll: true });
  }, [children, reducedMotion]);

  // Route transitions are inherently an external-side-effect + state sync:
  // when the pathname changes we need to play a GSAP animation (external
  // system) AND swap the rendered children. Both legitimate reasons to
  // call setState from an effect — the lint rule flags the shape but the
  // alternatives (imperative refs + forceUpdate) are strictly worse for
  // readability here.
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      animateTransition();
    } else {
      setDisplayChildren(children);
    }
  }, [pathname, children, animateTransition]);

  if (reducedMotion) {
    return <div>{children}</div>;
  }

  return (
    <div ref={containerRef} aria-busy={isTransitioning}>
      {displayChildren}
    </div>
  );
}
