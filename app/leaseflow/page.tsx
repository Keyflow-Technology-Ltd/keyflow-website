"use client";

import {
  FileText,
  CreditCard,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import ProductPage from "@/components/ProductPage";

const accent = "#3B82F6";

const features = [
  {
    iconNode: <FileText size={20} color={accent} />,
    title: "Tenant Lifecycle Management",
    description:
      "From onboarding to renewal, manage the entire tenant journey digitally. Automated lease generation, Ejari registration tracking, and renewal reminders — no more spreadsheet chaos.",
  },
  {
    iconNode: <CreditCard size={20} color={accent} />,
    title: "Automated Rent Tracking & Collection",
    description:
      "Track cheque schedules, post-dated cheques, and bank transfers. Automated payment reminders via email and WhatsApp. Real-time arrears dashboard with escalation workflows.",
  },
  {
    iconNode: <LayoutDashboard size={20} color={accent} />,
    title: "Portfolio Analytics & Reporting",
    description:
      "Real-time visibility across your entire portfolio. Occupancy rates, rental yields, vacancy forecasting, and maintenance cost tracking — all in one dashboard.",
  },
  {
    iconNode: <Shield size={20} color={accent} />,
    title: "Document Generation & Compliance",
    description:
      "Auto-generate tenancy contracts, Ejari forms, and NOC letters pre-filled with property and tenant data. AI-powered document processing with Textract for ID verification and lease extraction.",
  },
];

const steps = [
  {
    number: "1",
    title: "Add Your Properties",
    description:
      "Import your portfolio from spreadsheets or add properties manually. Set up units, tenants, and lease terms.",
  },
  {
    number: "2",
    title: "Automate Operations",
    description:
      "Lease renewals, rent reminders, and document generation run on autopilot. Focus on growing your portfolio.",
  },
  {
    number: "3",
    title: "Monitor & Grow",
    description:
      "Track portfolio performance, identify underperforming assets, and make data-driven investment decisions.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "299",
    unit: "mo",
    features: [
      "Up to 50 units",
      "Tenant management",
      "Rent tracking",
      "Basic document templates",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "699",
    unit: "mo",
    highlighted: true,
    features: [
      "Up to 200 units",
      "Advanced analytics",
      "WhatsApp notifications",
      "AI document processing",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "1,499",
    unit: "mo",
    features: [
      "Unlimited units",
      "White-label tenant portal",
      "API access & integrations",
      "Custom workflows",
      "Dedicated account manager",
    ],
  },
];

export default function LeaseFlowPage() {
  return (
    <ProductPage
      productName="LeaseFlow"
      label="LEASEFLOW"
      tagline="Manage Every Lease. Track Every Payment. Grow Your Portfolio."
      description="Digital lease management for landlords and property managers in Dubai. Automate tenant onboarding, rent collection, and document generation — purpose-built for UAE property regulations."
      accentColor="#3B82F6"
      accentColorLight="#EFF6FF"
      features={features}
      steps={steps}
      pricing={pricing}
      pricingNote="Flat monthly pricing by portfolio size. Annual plans save ~17%."
    />
  );
}
