"use client";

import {
  MessageSquare,
  Inbox,
  Brain,
  Users,
} from "lucide-react";
import ProductPage from "@/components/ProductPage";

const accent = "#D97706";

const features = [
  {
    iconNode: <MessageSquare size={20} color={accent} />,
    title: "WhatsApp Business API Integration",
    description:
      "Official WhatsApp Business API — not personal accounts. Send broadcasts, automate responses, and manage conversations at scale with full compliance and message templates.",
  },
  {
    iconNode: <Inbox size={20} color={accent} />,
    title: "Multi-Channel Unified Inbox",
    description:
      "WhatsApp, email, and SMS conversations in one threaded inbox. Never switch between apps — every client interaction is logged, searchable, and linked to their profile.",
  },
  {
    iconNode: <Brain size={20} color={accent} />,
    title: "AI-Powered Response Suggestions",
    description:
      "Smart reply suggestions based on conversation context and property data. Draft responses in seconds, personalized to each client's inquiry and history.",
  },
  {
    iconNode: <Users size={20} color={accent} />,
    title: "Team Collaboration & Routing",
    description:
      "Assign conversations to team members, set up auto-routing by language or property type, and track response times. Internal notes keep everyone aligned without exposing them to clients.",
  },
];

const steps = [
  {
    number: "1",
    title: "Connect Your Channels",
    description:
      "Link your WhatsApp Business number, email accounts, and other channels in minutes.",
  },
  {
    number: "2",
    title: "Centralize Conversations",
    description:
      "All messages flow into one inbox. Templates and AI suggestions help your team respond faster.",
  },
  {
    number: "3",
    title: "Scale Communications",
    description:
      "Broadcast updates, automate follow-ups, and track team performance — all from one platform.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "149",
    unit: "mo",
    features: [
      "1 WhatsApp number",
      "Up to 3 team members",
      "Unified inbox",
      "Basic templates",
      "Email support",
    ],
  },
  {
    name: "Business",
    price: "349",
    unit: "mo",
    highlighted: true,
    features: [
      "2 WhatsApp numbers",
      "Up to 10 team members",
      "AI response suggestions",
      "Broadcast campaigns",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "749",
    unit: "mo",
    features: [
      "Unlimited numbers & team",
      "Custom integrations & API",
      "Advanced analytics",
      "White-label options",
      "Dedicated CSM",
    ],
  },
];

export default function ConnectPage() {
  return (
    <ProductPage
      productName="Keyflow Connect"
      label="KEYFLOW CONNECT"
      tagline="One Inbox for WhatsApp, Email, and Every Client Conversation."
      description="Unified communications hub for real estate teams. Official WhatsApp Business API, AI-powered responses, and team collaboration — so no client message goes unanswered."
      accentColor="#D97706"
      accentColorLight="#FFFBEB"
      features={features}
      steps={steps}
      pricing={pricing}
      pricingNote="Flat monthly pricing. WhatsApp API message costs included in plan allowance."
    />
  );
}
