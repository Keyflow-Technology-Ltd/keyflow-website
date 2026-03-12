"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "./mobile-menu";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-brand-light/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" aria-label="Keyflow Home">
            <Image
              src="/logos/KEYFLOW-01.svg"
              alt="Keyflow"
              width={120}
              height={40}
              priority
            />
          </Link>

          <nav className="hidden tablet:flex items-center gap-8">
            {["Solutions", "About", "Contact"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                className="font-body text-sm text-brand-dark hover:text-brand-accent transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="font-body text-sm px-5 py-2.5 bg-brand-dark text-brand-light rounded-full hover:bg-brand-accent transition-colors"
            >
              Get Early Access
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(true)}
            className="tablet:hidden font-body text-sm text-brand-dark"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            Menu
          </button>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
