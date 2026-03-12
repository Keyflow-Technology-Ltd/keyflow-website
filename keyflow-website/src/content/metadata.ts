import type { Metadata } from "next";

const BASE_URL = "https://keyflowae.com";

function buildMetadata(page: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const url = `${BASE_URL}${page.path}`;
  const ogImage = page.ogImage ?? "/images/og/home.jpg";

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: "Keyflow",
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.title }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImage],
    },
  };
}

export const pageMetadata = {
  home: buildMetadata({
    title: "Keyflow — The Future of Real Estate",
    description: "The integrated software suite for Dubai real estate stakeholders. AI-powered tools for agents, agencies, developers, owners, and tenants.",
    path: "/",
  }),
  solutions: buildMetadata({
    title: "Solutions — Keyflow",
    description: "Four products, one ecosystem. Dealsflow, Leadsflow, Leaseflow, and Keyflow Connect — built for how Dubai real estate actually works.",
    path: "/solutions",
    ogImage: "/images/og/solutions.jpg",
  }),
  about: buildMetadata({
    title: "About — Keyflow",
    description: "Built in Dubai, for Dubai. Part of the Dubai PropTech Hub by DIFC and DLD. Meet the team building the future of real estate technology.",
    path: "/about",
    ogImage: "/images/og/about.jpg",
  }),
  contact: buildMetadata({
    title: "Get Early Access — Keyflow",
    description: "Join the future of Dubai real estate. Sign up for early access to the Keyflow suite.",
    path: "/contact",
    ogImage: "/images/og/contact.jpg",
  }),
} as const;
