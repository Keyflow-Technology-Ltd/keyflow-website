"use client";

import {
  Target,
  RefreshCw,
  BarChart3,
  Globe,
} from "lucide-react";
import ProductPage from "@/components/ProductPage";

const accent = "#8B5CF6";

const features = [
  {
    iconNode: <Target size={20} color={accent} />,
    title: "Lead Capture & Auto-Distribution",
    description:
      "Capture leads from Property Finder, Bayut, Dubizzle, your website, and social media — all in one place. Smart round-robin distribution ensures fair allocation across your team.",
  },
  {
    iconNode: <Globe size={20} color={accent} />,
    title: "Property Finder & Portal Integration",
    description:
      "Direct API integration with Property Finder for real-time lead sync every 15 minutes. Listings data flows in automatically — no manual entry, no missed inquiries.",
  },
  {
    iconNode: <RefreshCw size={20} color={accent} />,
    title: "Google Sheets Sync & Automation",
    description:
      "Bi-directional sync with Google Sheets every 5 minutes for teams that rely on spreadsheets. Automated stale-lead detection marks cold leads daily so your team focuses on hot prospects.",
  },
  {
    iconNode: <BarChart3 size={20} color={accent} />,
    title: "Performance Analytics & Reporting",
    description:
      "Track conversion rates by source, agent, and property type. Real-time dashboards show pipeline health, response times, and team performance at a glance.",
  },
];

const steps = [
  {
    number: "1",
    title: "Connect Your Sources",
    description:
      "Link Property Finder, Bayut, Google Sheets, and your website forms. Leads flow in automatically.",
  },
  {
    number: "2",
    title: "Distribute & Engage",
    description:
      "Smart routing assigns leads to the right agent. Automated follow-ups ensure no lead goes cold.",
  },
  {
    number: "3",
    title: "Convert & Measure",
    description:
      "Track every lead through to conversion. Identify your best sources and top-performing agents.",
  },
];

const pricing = [
  {
    name: "Growth",
    price: "499",
    unit: "mo",
    features: [
      "Up to 500 leads/month",
      "Property Finder integration",
      "Basic lead distribution",
      "Google Sheets sync",
      "Email support",
    ],
  },
  {
    name: "Scale",
    price: "999",
    unit: "mo",
    highlighted: true,
    features: [
      "Up to 2,000 leads/month",
      "All portal integrations",
      "Smart round-robin routing",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "1,999",
    unit: "mo",
    features: [
      "Unlimited leads",
      "Custom integrations & API",
      "White-label options",
      "Dedicated CSM",
      "SLA guarantee",
    ],
  },
];

export default function LeadsFlowPage() {
  return (
    <ProductPage
      productName="LeadsFlow"
      label="LEADSFLOW"
      tagline="Capture Every Lead. Convert Faster. Scale Your Agency."
      description="Automated lead management for Dubai real estate agencies. Integrates directly with Property Finder, Bayut, and Google Sheets — so your team spends time selling, not data entry."
      accentColor="#8B5CF6"
      accentColorLight="#F5F3FF"
      features={features}
      steps={steps}
      pricing={pricing}
      pricingNote="Flat monthly pricing per agency. Annual plans save ~17%."
    />
  );
}
