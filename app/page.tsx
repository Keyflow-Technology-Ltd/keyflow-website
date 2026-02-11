import Link from "next/link";
import {
  FileText,
  Users,
  Brain,
  MapPin,
  Layers,
  Shield,
  BarChart3,
  Zap,
  Globe,
  Link2,
  Lock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import FeatureCard from "@/components/FeatureCard";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-40 px-6 md:px-20">
        {/* Background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1765504033368-eec68680d2ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-white/80" />
        <div className="relative mx-auto max-w-[1440px] flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-[56px] font-bold text-[#1B1B1B] leading-[1.1] max-w-[900px]">
            The Operating System for Dubai Real Estate
          </h1>
          <p className="text-lg text-[#666] leading-relaxed max-w-[680px]">
            End-to-end platforms built for every stakeholder in the property
            lifecycle. From lease management to lead generation — Keyflow
            streamlines how real estate works.
          </p>
          <div className="mt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/request-demo"
              className="bg-[#1B1B1B] text-white px-9 py-4 rounded-md font-semibold hover:bg-[#333] transition-colors text-center"
            >
              Request a Demo
            </Link>
            <Link
              href="/products"
              className="border-[1.5px] border-[#1B1B1B] text-[#1B1B1B] px-9 py-4 rounded-md font-semibold hover:bg-white/60 transition-colors flex items-center justify-center gap-2"
            >
              Explore Products
            </Link>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-[#E0E0E0] px-5 py-2.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-[#555]">
              Part of the <span className="font-semibold text-[#1B1B1B]">Proptech Hub</span> — a DIFC &times; DLD Initiative
            </span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>OUR PRODUCTS</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              Purpose-Built Platforms for Real Estate
            </h2>
            <p className="mt-4 text-lg text-[#666] max-w-2xl mx-auto">
              Each product is designed for a specific stakeholder in the property
              lifecycle, delivering tailored workflows and intelligent
              automation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* LeaseFlow Card */}
            <div className="border border-[#E0E0E0] rounded-2xl overflow-hidden">
              <div className="bg-[#F8F8F8] p-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center">
                  <FileText size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-[2px]">
                    LEASEFLOW
                  </h3>
                  <p className="text-xs text-[#888]">
                    Lease Management Platform
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div className="inline-flex items-center gap-2 bg-[#F8F8F8] px-3 py-1.5 rounded-full mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-medium text-[#666]">
                    Launching Soon
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1B1B1B] mb-3">
                  Streamline Your Entire Lease Lifecycle
                </h3>
                <p className="text-sm text-[#666] leading-relaxed mb-6">
                  From tenant onboarding to renewal management, Leaseflow
                  digitizes every step of the leasing process. Automated
                  workflows, smart document generation, and real-time portfolio
                  visibility — built specifically for the Dubai market.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Automated lease generation & e-signatures",
                    "Real-time portfolio & tenant dashboard",
                    "Renewal alerts & compliance tracking",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[#444]"
                    >
                      <CheckCircle size={16} className="text-[#1B1B1B] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1B1B1B] hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* LeadsFlow Card */}
            <div className="border border-[#E0E0E0] rounded-2xl overflow-hidden">
              <div className="bg-[#F8F8F8] p-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-[2px]">
                    LEADSFLOW
                  </h3>
                  <p className="text-xs text-[#888]">
                    Leads Management Platform
                  </p>
                </div>
              </div>
              <div className="p-8">
                <div className="inline-flex items-center gap-2 bg-[#F8F8F8] px-3 py-1.5 rounded-full mb-4">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs font-medium text-[#666]">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1B1B1B] mb-3">
                  Capture, Qualify & Convert Leads Faster
                </h3>
                <p className="text-sm text-[#666] leading-relaxed mb-6">
                  Leadsflow connects every touchpoint in the buyer and renter
                  journey. AI-powered lead scoring, automated follow-ups, and
                  deep analytics help your sales team focus on what matters —
                  closing deals.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "AI lead scoring & smart routing",
                    "Multi-channel capture (web, WhatsApp, portals)",
                    "Pipeline analytics & conversion tracking",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-[#444]"
                    >
                      <CheckCircle size={16} className="text-[#1B1B1B] shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1B1B1B] hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Keyflow */}
      <section className="py-20 px-6 md:px-20 bg-[#F8F8F8]">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>WHY KEYFLOW</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              Built Different. Built for Dubai.
            </h2>
            <p className="mt-4 text-lg text-[#666] max-w-2xl mx-auto">
              We don&apos;t adapt generic software to real estate. We build from
              the ground up for the way property works in the UAE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center mb-4">
                <Brain size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-3">
                AI-Powered Intelligence
              </h3>
              <p className="text-sm text-[#666] leading-relaxed">
                Smart automation at every layer. From predictive lead scoring to
                intelligent document processing, our AI understands real estate
                workflows and accelerates decision-making.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center mb-4">
                <MapPin size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-3">
                Dubai-First Approach
              </h3>
              <p className="text-sm text-[#666] leading-relaxed">
                Purpose-built for the UAE market. RERA compliance, Ejari
                integration, multilingual support, and workflows designed around
                how Dubai real estate actually operates.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8">
              <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center mb-4">
                <Layers size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-3">
                End-to-End Platform
              </h3>
              <p className="text-sm text-[#666] leading-relaxed">
                No more stitching together disconnected tools. Keyflow covers
                the entire property lifecycle — leasing, sales, marketing, and
                operations — in one unified ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>CAPABILITIES</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              Everything You Need to Scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Shield}
              title="RERA & Ejari Compliance"
              description="Stay compliant with automated regulatory checks and real-time updates to Dubai's property laws."
            />
            <FeatureCard
              icon={BarChart3}
              title="Advanced Analytics"
              description="Real-time dashboards and custom reports that give you actionable insights across your entire portfolio."
            />
            <FeatureCard
              icon={Zap}
              title="Workflow Automation"
              description="Eliminate manual tasks with intelligent automation — from follow-up emails to contract renewals."
            />
            <FeatureCard
              icon={Globe}
              title="Multi-Language Support"
              description="Arabic and English interfaces with full RTL support, designed for the diverse UAE market."
            />
            <FeatureCard
              icon={Link2}
              title="Seamless Integrations"
              description="Connect with property portals, payment gateways, CRMs, and government platforms out of the box."
            />
            <FeatureCard
              icon={Lock}
              title="Enterprise Security"
              description="Bank-grade encryption, role-based access control, and full audit trails to protect your data."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection
        title="Ready to Transform Your Real Estate Operations?"
        subtitle="See how Keyflow can streamline your real estate operations. Book a personalized walkthrough with our team."
        primaryLabel="Request a Demo"
        primaryHref="/request-demo"
        secondaryLabel="Contact Sales"
        secondaryHref="/contact"
        trustText="No commitment required  ·  Free consultation  ·  Custom onboarding"
      />
    </>
  );
}
