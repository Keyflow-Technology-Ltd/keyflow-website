import Link from "next/link";
import {
  FileText,
  Users,
  PenTool,
  RefreshCw,
  LayoutDashboard,
  Shield,
  UserCircle,
  Brain,
  MessageSquare,
  Zap,
  BarChart3,
  GitBranch,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import FeatureCard from "@/components/FeatureCard";
import CTASection from "@/components/CTASection";

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <SectionLabel>OUR PRODUCTS</SectionLabel>
          <h1 className="mt-4 text-4xl md:text-[56px] font-bold text-[#1B1B1B] leading-[1.1]">
            Purpose-Built Platforms for Real Estate
          </h1>
          <p className="mt-6 text-lg text-[#666] max-w-2xl mx-auto">
            Two specialized products designed for the stakeholders who power
            Dubai&apos;s property market. Each built from the ground up for how
            real estate actually works.
          </p>
        </div>
      </section>

      {/* LeaseFlow Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center">
                  <FileText size={20} className="text-white" />
                </div>
                <span className="text-sm font-bold tracking-[2px]">
                  LEASEFLOW
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#F8F8F8] px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs font-medium text-[#666]">
                  Launching Soon
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B1B1B] mb-4">
                Streamline Your Entire Lease Lifecycle
              </h2>
              <p className="text-base text-[#666] leading-relaxed mb-8">
                From tenant onboarding to renewal management, Leaseflow
                digitizes every step of the leasing process. Automated
                workflows, smart document generation, and real-time portfolio
                visibility — purpose-built for the Dubai market.
              </p>
              <Link
                href="/request-demo"
                className="bg-[#1B1B1B] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#333] transition-colors inline-block"
              >
                Request Leaseflow Demo
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/leaseflow-screenshot.png"
                alt="LeaseFlow Dashboard"
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* LeaseFlow Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={PenTool}
              title="Smart Lease Generation"
              description="Auto-generate compliant lease agreements with customizable templates tailored to Dubai's regulatory requirements."
            />
            <FeatureCard
              icon={FileText}
              title="Digital Signatures"
              description="Secure e-signature workflows that streamline tenant and landlord approvals across every document."
            />
            <FeatureCard
              icon={RefreshCw}
              title="Renewal Management"
              description="Automated renewal tracking with smart alerts, ensuring you never miss a critical lease date."
            />
            <FeatureCard
              icon={LayoutDashboard}
              title="Portfolio Dashboard"
              description="Real-time visibility across your entire property portfolio with occupancy, revenue, and performance metrics."
            />
            <FeatureCard
              icon={Shield}
              title="RERA & Ejari Compliance"
              description="Built-in regulatory checks and automated Ejari registration workflows to keep you compliant."
            />
            <FeatureCard
              icon={UserCircle}
              title="Tenant Portal"
              description="Self-service portal for tenants to submit requests, view documents, and manage their lease details."
            />
          </div>
        </div>
      </section>

      {/* LeadsFlow Section */}
      <section className="py-20 px-6 md:px-20 bg-[#F8F8F8]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl order-2 lg:order-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/leadsflow-screenshot.png"
                alt="LeadsFlow Pipeline"
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <span className="text-sm font-bold tracking-[2px]">
                  LEADSFLOW
                </span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-medium text-[#666]">
                  Coming Soon
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B1B1B] mb-4">
                Capture, Qualify & Convert Leads Faster
              </h2>
              <p className="text-base text-[#666] leading-relaxed mb-8">
                Leadsflow connects every touchpoint in the buyer and renter
                journey. AI-powered lead scoring, automated follow-ups, and deep
                analytics help your sales team focus on closing deals.
              </p>
              <Link
                href="/request-demo"
                className="bg-[#1B1B1B] text-white px-8 py-3.5 rounded-lg font-medium hover:bg-[#333] transition-colors inline-block"
              >
                Request Leadsflow Demo
              </Link>
            </div>
          </div>

          {/* LeadsFlow Features Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Brain}
              title="AI Lead Scoring"
              description="Intelligent scoring algorithms that analyze behavior and demographics to prioritize your highest-value prospects."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Multi-Channel Capture"
              description="Capture leads from websites, WhatsApp, property portals, and social media into one unified pipeline."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={Zap}
              title="Automated Follow-ups"
              description="Smart drip campaigns and automated response sequences that engage leads at exactly the right moment."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={BarChart3}
              title="Pipeline Analytics"
              description="Detailed conversion funnels, team performance metrics, and revenue forecasting dashboards."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={GitBranch}
              title="Smart Routing"
              description="Automatically assign leads to the right agent based on expertise, workload, and property type."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={Globe}
              title="Portal Integration"
              description="Direct integration with Bayut, Property Finder, Dubizzle, and other major UAE property portals."
              bg="#FFFFFF"
            />
          </div>
        </div>
      </section>

      {/* Compare Section */}
      <section className="py-20 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>COMPARE</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              Choose the Right Platform
            </h2>
            <p className="mt-4 text-lg text-[#666] max-w-2xl mx-auto">
              Both products work independently or together as a unified
              ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LeaseFlow Compare */}
            <div className="border border-[#E0E0E0] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center">
                  <FileText size={20} className="text-white" />
                </div>
                <span className="text-sm font-bold tracking-[2px]">
                  LEASEFLOW
                </span>
              </div>
              <p className="text-sm text-[#666] mb-6">
                Best for property managers, landlords, and leasing teams
              </p>
              <ul className="space-y-3">
                {[
                  "Lease generation & e-signatures",
                  "Renewal tracking & alerts",
                  "Portfolio dashboard & analytics",
                  "RERA & Ejari compliance",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#444]"
                  >
                    <CheckCircle size={16} className="text-[#1B1B1B] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* LeadsFlow Compare */}
            <div className="border border-[#E0E0E0] rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#1B1B1B] flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <span className="text-sm font-bold tracking-[2px]">
                  LEADSFLOW
                </span>
              </div>
              <p className="text-sm text-[#666] mb-6">
                Best for sales teams, brokerages, and marketing managers
              </p>
              <ul className="space-y-3">
                {[
                  "AI lead scoring & smart routing",
                  "Multi-channel lead capture",
                  "Pipeline analytics & forecasting",
                  "Portal integration (Bayut, Property Finder)",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#444]"
                  >
                    <CheckCircle size={16} className="text-[#1B1B1B] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to See It in Action?"
        subtitle="Book a personalized walkthrough and discover how Keyflow's products can transform your operations."
        primaryLabel="Request a Demo"
        primaryHref="/request-demo"
        secondaryLabel="Contact Sales"
        secondaryHref="/contact"
        trustText="No commitment required  ·  Free consultation  ·  Custom onboarding"
      />
    </>
  );
}
