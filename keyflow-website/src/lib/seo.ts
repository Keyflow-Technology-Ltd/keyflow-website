export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Keyflow",
    url: "https://keyflowae.com",
    logo: "https://keyflowae.com/logos/KEYFLOW-01.svg",
    description: "AI-powered real estate software suite for Dubai stakeholders",
    sameAs: [
      "https://linkedin.com/company/keyflow",
      "https://instagram.com/keyflowae",
      "https://x.com/keyflowae",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Keyflow",
    url: "https://keyflowae.com",
  };
}

export function softwareSchema(product: { name: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", availability: "https://schema.org/PreOrder" },
  };
}
