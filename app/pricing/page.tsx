import Link from "next/link";
import { CheckCircle } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import CTASection from "@/components/CTASection";

const tiers = [
  {
    name: "Starter",
    price: "1,799",
    description:
      "For small agencies getting started with digital property management.",
    features: [
      "Up to 50 properties",
      "2 user seats",
      "Lease management",
      "Tenant & owner portal",
      "Document generation",
      "Email support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "2,999",
    description:
      "For growing agencies that need advanced automation and integrations.",
    features: [
      "Up to 200 properties",
      "10 user seats",
      "Everything in Starter",
      "AI document processing",
      "PropertyFinder integration",
      "Renewal automation",
      "Advanced analytics",
      "Priority support",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "4,999+",
    description:
      "For large agencies and portfolios requiring full customization.",
    features: [
      "Unlimited properties",
      "Unlimited user seats",
      "Everything in Professional",
      "Custom integrations",
      "Dedicated account manager",
      "White-label options",
      "SLA-backed support",
      "Custom training & onboarding",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <SectionLabel>PRICING</SectionLabel>
          <h1 className="mt-4 text-4xl md:text-[56px] font-bold text-[#1B1B1B] leading-[1.1]">
            Simple, Transparent Pricing
          </h1>
          <p className="mt-6 text-lg text-[#666] max-w-2xl mx-auto">
            Choose the plan that fits your agency. All plans include core
            property management features, RERA compliance tools, and free
            onboarding.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 flex flex-col ${
                tier.highlighted
                  ? "bg-[#1B1B1B] text-white ring-2 ring-[#1B1B1B]"
                  : "border border-[#E0E0E0] bg-white"
              }`}
            >
              {tier.highlighted && (
                <span className="inline-block text-xs font-semibold tracking-[2px] uppercase bg-white/10 text-white px-3 py-1 rounded-full mb-4 self-start">
                  Most Popular
                </span>
              )}
              <h3
                className={`text-xl font-bold ${
                  tier.highlighted ? "text-white" : "text-[#1B1B1B]"
                }`}
              >
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className={`text-4xl font-bold ${
                    tier.highlighted ? "text-white" : "text-[#1B1B1B]"
                  }`}
                >
                  AED {tier.price}
                </span>
                <span
                  className={`text-sm ${
                    tier.highlighted ? "text-white/60" : "text-[#999]"
                  }`}
                >
                  /month
                </span>
              </div>
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  tier.highlighted ? "text-white/70" : "text-[#666]"
                }`}
              >
                {tier.description}
              </p>

              <ul className="mt-8 space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <CheckCircle
                      size={16}
                      className={`shrink-0 ${
                        tier.highlighted ? "text-white/60" : "text-[#1B1B1B]"
                      }`}
                    />
                    <span
                      className={
                        tier.highlighted ? "text-white/90" : "text-[#444]"
                      }
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href={tier.name === "Enterprise" ? "/contact" : "/request-demo"}
                className={`mt-8 block text-center py-3.5 rounded-lg font-medium transition-colors ${
                  tier.highlighted
                    ? "bg-white text-[#1B1B1B] hover:bg-white/90"
                    : "bg-[#1B1B1B] text-white hover:bg-[#333]"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Billing note */}
        <p className="mt-8 text-center text-sm text-[#999]">
          All prices are in AED and billed monthly. Annual billing available on
          request.
          <br />
          VAT excluded. Custom pricing available for large portfolios.
        </p>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 md:px-20 bg-[#F8F8F8]">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              Common Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {[
              {
                q: "Is there a free trial?",
                a: "Yes. We offer a 14-day free trial on the Starter and Professional plans with no credit card required.",
              },
              {
                q: "Can I switch plans later?",
                a: "Absolutely. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
              },
              {
                q: "What's included in onboarding?",
                a: "Every plan includes free onboarding support — we'll help you import properties, set up your team, and configure your workflows.",
              },
              {
                q: "Do you offer discounts for annual billing?",
                a: "Yes. Contact our sales team for annual billing options and volume discounts for agencies managing 500+ properties.",
              },
              {
                q: "Is my data secure?",
                a: "All data is encrypted at rest and in transit. We're DIFC-compliant with full audit logging and role-based access control.",
              },
            ].map((item) => (
              <div key={item.q}>
                <h3 className="text-base font-semibold text-[#1B1B1B] mb-2">
                  {item.q}
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Get Started?"
        subtitle="Book a demo to see how Keyflow can transform your property management operations."
        primaryLabel="Request a Demo"
        primaryHref="/request-demo"
        secondaryLabel="Contact Sales"
        secondaryHref="/contact"
        trustText="14-day free trial  ·  No credit card required  ·  Free onboarding"
      />
    </>
  );
}
