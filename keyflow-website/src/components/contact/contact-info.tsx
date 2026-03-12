const SOCIAL_LINKS = [
  { href: "https://linkedin.com/company/keyflow", label: "LinkedIn" },
  { href: "https://instagram.com/keyflowae", label: "Instagram" },
  { href: "https://x.com/keyflowae", label: "X" },
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-display text-sm uppercase tracking-[0.15em] text-brand-dark/40 mb-2">
          Email
        </h3>
        <a
          href="mailto:hello@keyflowae.com"
          className="font-body text-lg text-brand-dark hover:text-brand-accent transition-colors"
        >
          hello@keyflowae.com
        </a>
      </div>

      <div>
        <h3 className="font-display text-sm uppercase tracking-[0.15em] text-brand-dark/40 mb-2">
          Location
        </h3>
        <p className="font-body text-lg text-brand-dark">
          Dubai International Financial Centre
        </p>
        <p className="font-body text-sm text-brand-dark/50 mt-1">
          Dubai, United Arab Emirates
        </p>
      </div>

      <div>
        <h3 className="font-display text-sm uppercase tracking-[0.15em] text-brand-dark/40 mb-3">
          Social
        </h3>
        <div className="flex gap-6">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm text-brand-dark/60 hover:text-brand-accent transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
