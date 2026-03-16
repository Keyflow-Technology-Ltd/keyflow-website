"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

interface Feature {
  iconNode: React.ReactNode;
  title: string;
  description: string;
}

interface Step {
  number: string;
  title: string;
  description: string;
}

interface PricingTier {
  name: string;
  price: string;
  unit: string;
  features: string[];
  highlighted?: boolean;
}

interface ProductPageProps {
  productName: string;
  tagline: string;
  description: string;
  accentColor: string;
  accentColorLight: string;
  label: string;
  features: Feature[];
  steps: Step[];
  pricing: PricingTier[];
  pricingNote: string;
}

export default function ProductPage({
  productName,
  tagline,
  description,
  accentColor,
  accentColorLight,
  label,
  features,
  steps,
  pricing,
  pricingNote,
}: ProductPageProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <div className="inline-flex items-center gap-2 bg-[#F8F8F8] px-4 py-2 rounded-full mb-6">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-xs font-semibold tracking-[2px] text-[#666] uppercase">
              Coming Soon
            </span>
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span
              className="text-sm font-bold tracking-[3px] uppercase"
              style={{ color: accentColor }}
            >
              {label}
            </span>
          </div>
          <h1 className="text-4xl md:text-[56px] font-bold text-[#1B1B1B] leading-[1.1] max-w-[800px] mx-auto">
            {tagline}
          </h1>
          <p className="mt-6 text-lg text-[#666] max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Waitlist Form */}
          <div className="mt-10 max-w-md mx-auto">
            {submitted ? (
              <div className="flex items-center justify-center gap-3 bg-[#F8F8F8] rounded-xl px-6 py-4">
                <CheckCircle size={20} style={{ color: accentColor }} />
                <span className="text-sm font-medium text-[#1B1B1B]">
                  You&apos;re on the list. We&apos;ll be in touch.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3.5 rounded-lg border border-[#E0E0E0] text-sm focus:outline-none focus:border-[#999] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#1B1B1B] text-white px-6 py-3.5 rounded-lg text-sm font-medium hover:bg-[#333] transition-colors whitespace-nowrap"
                >
                  Get Early Access
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/70 border border-[#E0E0E0] px-5 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-[#555]">
              Part of the{" "}
              <span className="font-semibold text-[#1B1B1B]">
                Proptech Hub
              </span>{" "}
              — a DIFC &times; DLD Initiative
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 md:px-20 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>KEY FEATURES</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              Built for How Real Estate Actually Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="rounded-xl p-8 bg-white border border-[#F0F0F0]"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: accentColorLight }}
                >
                  {feature.iconNode}
                </div>
                <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>HOW IT WORKS</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              Up and Running in Minutes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold"
                  style={{
                    backgroundColor: accentColorLight,
                    color: accentColor,
                  }}
                >
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-[#1B1B1B] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
                {i < steps.length - 1 && (
                  <ArrowRight
                    size={20}
                    className="text-[#D4D4D4] mx-auto mt-6 hidden md:block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-6 md:px-20 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>PRE-LAUNCH PRICING</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              Lock In Early-Adopter Rates
            </h2>
            <p className="mt-4 text-base text-[#666]">{pricingNote}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {pricing.map((tier, i) => (
              <div
                key={i}
                className={`rounded-xl p-6 bg-white border ${
                  tier.highlighted
                    ? "border-[#1B1B1B] ring-1 ring-[#1B1B1B]"
                    : "border-[#E0E0E0]"
                }`}
              >
                {tier.highlighted && (
                  <span
                    className="inline-block text-xs font-semibold text-white px-3 py-1 rounded-full mb-4"
                    style={{ backgroundColor: accentColor }}
                  >
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-[#1B1B1B]">
                  {tier.name}
                </h3>
                <div className="mt-3 mb-4">
                  <span className="text-3xl font-bold text-[#1B1B1B]">
                    AED {tier.price}
                  </span>
                  <span className="text-sm text-[#666]">/{tier.unit}</span>
                </div>
                <ul className="space-y-2.5">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: accentColor }}
                      />
                      <span className="text-sm text-[#666]">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/pricing"
                  className="mt-6 block text-center text-sm font-medium text-[#1B1B1B] border border-[#E0E0E0] px-4 py-2.5 rounded-lg hover:bg-[#F8F8F8] transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <h2 className="text-3xl md:text-[44px] font-bold text-[#1B1B1B] leading-tight">
            Ready to Transform Your Workflow?
          </h2>
          <p className="mt-4 text-lg text-[#666] max-w-2xl mx-auto">
            Join the waitlist for {productName} and be among the first to
            experience the future of Dubai real estate technology.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/request-demo"
              className="bg-[#1B1B1B] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#333] transition-colors"
            >
              Request a Demo
            </Link>
            <Link
              href="/pricing"
              className="border border-[#E0E0E0] text-[#1B1B1B] px-8 py-3.5 rounded-lg font-medium hover:bg-[#F8F8F8] transition-colors"
            >
              Compare All Plans
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#999]">
            No credit card required. Free setup assistance included.
          </p>
        </div>
      </section>
    </>
  );
}
