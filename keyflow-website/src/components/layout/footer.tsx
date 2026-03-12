import Link from "next/link";
import Image from "next/image";

const FOOTER_LINKS = [
  { href: "/solutions", label: "Solutions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_LINKS = [
  { href: "https://linkedin.com/company/keyflow", label: "LinkedIn" },
  { href: "https://instagram.com/keyflowae", label: "Instagram" },
  { href: "https://x.com/keyflowae", label: "X" },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        {/* Fanned card navigation */}
        <div className="flex justify-center gap-4 mb-16">
          {FOOTER_LINKS.map((link, i) => {
            const rotation = (i - 1) * 6; // -6, 0, 6 degrees
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block w-40 h-52 bg-brand-light/5 border border-brand-light/10 rounded-2xl flex items-center justify-center font-display text-lg text-brand-light hover:bg-brand-accent/20 hover:border-brand-accent/30 hover:scale-105 hover:rotate-0 transition-all duration-300"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Logo centered */}
        <div className="flex justify-center mb-12">
          <Image src="/logos/KEYFLOW-03.svg" alt="Keyflow" width={160} height={53} />
        </div>

        {/* Social + legal */}
        <div className="flex flex-col tablet:flex-row items-center justify-between gap-6 text-sm text-brand-light/50">
          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="font-body">&copy; {new Date().getFullYear()} Keyflow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
