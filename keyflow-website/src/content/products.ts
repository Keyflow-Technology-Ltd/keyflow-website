export type ParticleFormation = "ambient" | "converge" | "radiate" | "grid" | "cluster";

export interface Product {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  capabilities: string[];
  particleConfig: {
    formation: ParticleFormation;
    density: number;
  };
}

export const products: readonly Product[] = [
  {
    name: "Dealsflow",
    slug: "dealsflow",
    tagline: "Close deals, not tabs.",
    description: "The agent-oriented application that streamlines every deal from inquiry to handover.",
    capabilities: [
      "Pipeline visualization for every active deal",
      "Automated document collection and verification",
      "Commission tracking and split management",
      "Real-time deal status for all parties",
    ],
    particleConfig: { formation: "converge", density: 1.0 },
  },
  {
    name: "Leadsflow",
    slug: "leadsflow",
    tagline: "Every lead, one place.",
    description: "A CRM built for real estate — not retrofitted from another industry.",
    capabilities: [
      "Unified inbox across WhatsApp, email, and portals",
      "AI-powered lead scoring and prioritization",
      "Automated follow-up sequences",
      "Performance analytics by agent, team, and source",
    ],
    particleConfig: { formation: "radiate", density: 0.8 },
  },
  {
    name: "Leaseflow",
    slug: "leaseflow",
    tagline: "Leases that manage themselves.",
    description: "End-to-end lease management from contract generation to renewal reminders.",
    capabilities: [
      "Automated lease generation with DLD-compliant templates",
      "Renewal and expiry tracking dashboards",
      "Tenant communication portal",
      "Integrated payment tracking and receipts",
    ],
    particleConfig: { formation: "grid", density: 0.9 },
  },
  {
    name: "Keyflow Connect",
    slug: "keyflow-connect",
    tagline: "One thread, every stakeholder.",
    description: "Integrate all your client communications into a single, unified platform.",
    capabilities: [
      "Unified messaging across channels",
      "Client-facing portal with document sharing",
      "Activity timeline for every relationship",
      "Team handoff and collaboration tools",
    ],
    particleConfig: { formation: "cluster", density: 0.7 },
  },
];
