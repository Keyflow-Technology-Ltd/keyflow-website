import Link from "next/link";
import Image from "next/image";

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Leaseflow", href: "/products" },
      { label: "Leadsflow", href: "/products" },
      { label: "Pricing", href: "#" },
      { label: "Integrations", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Security", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B1B1B] text-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.svg"
                alt="Keyflow"
                width={28}
                height={28}
                className="brightness-0 invert"
              />
              <span className="text-lg font-bold tracking-[4px]">KEYFLOW</span>
            </div>
            <p className="text-sm text-[#888] leading-relaxed max-w-sm mb-4">
              AI-powered real estate solutions built for the Dubai market.
              Transforming how property works.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#252525] px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] text-[#888]">
                DIFC &times; DLD Proptech Hub
              </span>
            </div>
          </div>

          {/* Nav Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold mb-4">{col.title}</h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#888] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#333] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#666]">
            &copy; 2025 Keyflow Technologies. All rights reserved.
          </p>
          <p className="text-xs text-[#666]">Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  );
}
