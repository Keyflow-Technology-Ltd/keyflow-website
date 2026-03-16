"use client";

import {
  Briefcase,
  DollarSign,
  Users,
  FileText,
} from "lucide-react";
import ProductPage from "@/components/ProductPage";

const accent = "#10B981";

const features = [
  {
    iconNode: <Briefcase size={20} color={accent} />,
    title: "Deal Pipeline Management",
    description:
      "Visual pipeline with drag-and-drop stages tailored for Dubai real estate transactions. Track every deal from initial inquiry to handover, with Oqood and DLD integration checkpoints built in.",
  },
  {
    iconNode: <DollarSign size={20} color={accent} />,
    title: "Commission Tracking & Splits",
    description:
      "Automated commission calculations, split tracking between agents, and real-time earnings dashboards. Never lose track of what you're owed — even across complex co-broker deals.",
  },
  {
    iconNode: <Users size={20} color={accent} />,
    title: "Client Portfolio & CRM",
    description:
      "360-degree client profiles with interaction history, preferences, and property matches. Smart reminders for follow-ups, birthdays, and visa renewals that keep relationships warm.",
  },
  {
    iconNode: <FileText size={20} color={accent} />,
    title: "Document Generation & MOU Tracking",
    description:
      "Auto-generate Form A, Form B, MOU templates, and NOC requests pre-filled with deal data. Track document status and expiry dates across your entire portfolio.",
  },
];

const steps = [
  {
    number: "1",
    title: "Import Your Deals",
    description:
      "Connect your existing leads or import from spreadsheets. DealsFlow maps your pipeline automatically.",
  },
  {
    number: "2",
    title: "Track & Manage",
    description:
      "Move deals through stages, set follow-up reminders, and generate documents — all from one dashboard.",
  },
  {
    number: "3",
    title: "Close & Earn",
    description:
      "Track commissions in real-time, generate invoices, and get a clear view of your earnings.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "199",
    unit: "user/mo",
    features: [
      "Deal pipeline management",
      "Basic commission tracking",
      "Client CRM (up to 200 contacts)",
      "Document templates",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: "299",
    unit: "user/mo",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Unlimited contacts",
      "Advanced commission splits",
      "Custom pipeline stages",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "449",
    unit: "user/mo",
    features: [
      "Everything in Pro",
      "Team management & reporting",
      "API access",
      "Custom integrations",
      "Dedicated account manager",
    ],
  },
];

export default function DealsFlowPage() {
  return (
    <ProductPage
      productName="DealsFlow"
      label="DEALSFLOW"
      tagline="Your Deals. Your Pipeline. Your Commission. All in One Place."
      description="Purpose-built CRM for RERA-registered real estate agents in Dubai. Manage your pipeline, track commissions, and close deals faster — with workflows designed for how Dubai real estate actually works."
      accentColor="#10B981"
      accentColorLight="#ECFDF5"
      features={features}
      steps={steps}
      pricing={pricing}
      pricingNote="Per-user pricing. Annual plans save ~17% (2 months free)."
    />
  );
}
