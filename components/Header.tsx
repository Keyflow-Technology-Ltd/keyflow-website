"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#F0F0F0]">
      <div className="mx-auto max-w-[1440px] px-6 md:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Keyflow" width={36} height={36} />
          <span className="text-[22px] font-bold tracking-[4px] text-[#1B1B1B]">
            KEYFLOW
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#1B1B1B]"
                  : "text-[#666] hover:text-[#1B1B1B]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/request-demo"
            className="bg-[#1B1B1B] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#333] transition-colors"
          >
            Request Demo
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#F0F0F0] bg-white px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium ${
                pathname === link.href
                  ? "text-[#1B1B1B]"
                  : "text-[#666]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/request-demo"
            onClick={() => setMobileOpen(false)}
            className="block bg-[#1B1B1B] text-white text-sm font-medium px-5 py-2.5 rounded-lg text-center"
          >
            Request Demo
          </Link>
        </div>
      )}
    </header>
  );
}
