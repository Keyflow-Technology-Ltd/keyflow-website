import {
  MapPin,
  Brain,
  Layers,
  Gem,
  ShieldCheck,
  Rocket,
  Building,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import FeatureCard from "@/components/FeatureCard";
import CTASection from "@/components/CTASection";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] text-center">
          <SectionLabel>ABOUT KEYFLOW</SectionLabel>
          <h1 className="mt-4 text-4xl md:text-[56px] font-bold text-[#1B1B1B] leading-[1.1]">
            Building the Future of Dubai Real Estate
          </h1>
          <p className="mt-6 text-lg text-[#666] max-w-2xl mx-auto">
            We are a proptech startup on a mission to transform how real estate
            operates in the UAE — one intelligent platform at a time.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-[#E0E0E0] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#1B1B1B] mb-4">
              Our Mission
            </h2>
            <p className="text-sm text-[#666] leading-relaxed">
              To eliminate the friction in real estate operations by delivering
              AI-powered platforms that are purpose-built for the way property
              works in Dubai and the wider UAE. We believe technology should
              adapt to the market, not the other way around.
            </p>
          </div>
          <div className="border border-[#E0E0E0] rounded-2xl p-8">
            <h2 className="text-xl font-bold text-[#1B1B1B] mb-4">
              Our Vision
            </h2>
            <p className="text-sm text-[#666] leading-relaxed">
              A real estate ecosystem where every stakeholder — from landlord to
              tenant, broker to buyer — operates on intelligent, connected
              platforms that make property transactions seamless, transparent,
              and efficient.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 md:px-20 bg-[#F8F8F8]">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>OUR VALUES</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              What Drives Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={MapPin}
              title="Dubai-First Thinking"
              description="We don't localize global software. We build from scratch for the UAE market — its regulations, its workflows, its people."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={Brain}
              title="Intelligence by Default"
              description="AI isn't an add-on. It's woven into every workflow, from document processing to lead scoring, making every user more effective."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={Layers}
              title="End-to-End Ownership"
              description="We own the full stack of problems. No fragmented tools, no integration headaches — one platform that covers the entire property lifecycle."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={Gem}
              title="Built with Craft"
              description="We obsess over the details — every interaction, every screen, every workflow. Great software should feel effortless."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Trust & Compliance"
              description="Operating in a regulated market means security and compliance aren't optional. They're foundational to everything we build."
              bg="#FFFFFF"
            />
            <FeatureCard
              icon={Rocket}
              title="Speed to Impact"
              description="We move fast because the market moves fast. Our goal is to deliver meaningful improvements to our users as quickly as possible."
              bg="#FFFFFF"
            />
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-6 md:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="text-center mb-16">
            <SectionLabel>OUR APPROACH</SectionLabel>
            <h2 className="mt-4 text-3xl md:text-[44px] font-bold text-[#1B1B1B]">
              How We Build
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex gap-6">
              <div className="shrink-0 w-12 h-12 rounded-full bg-[#F8F8F8] flex items-center justify-center text-lg font-bold text-[#1B1B1B]">
                01
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2">
                  Market Immersion
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  We spend time with property managers, brokers, landlords, and
                  tenants in Dubai to understand their daily realities — not just
                  their software wishlists.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="shrink-0 w-12 h-12 rounded-full bg-[#F8F8F8] flex items-center justify-center text-lg font-bold text-[#1B1B1B]">
                02
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2">
                  Purpose-Built Solutions
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  Every feature is designed for a specific workflow in the UAE
                  property lifecycle. We don&apos;t build generic tools and hope
                  they fit.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="shrink-0 w-12 h-12 rounded-full bg-[#F8F8F8] flex items-center justify-center text-lg font-bold text-[#1B1B1B]">
                03
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1B1B1B] mb-2">
                  Continuous Intelligence
                </h3>
                <p className="text-sm text-[#666] leading-relaxed">
                  Our platforms learn and improve over time. AI models are
                  trained on real estate patterns specific to the Dubai market,
                  getting smarter with every interaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dubai Commitment */}
      <section className="py-20 px-6 md:px-20 bg-[#F8F8F8]">
        <div className="mx-auto max-w-[1440px] text-center max-w-3xl">
          <div className="w-12 h-12 rounded-lg bg-[#1B1B1B] flex items-center justify-center mx-auto mb-6">
            <Building size={24} className="text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B1B1B] mb-4">
            Rooted in Dubai. Built for the UAE.
          </h2>
          <p className="text-base text-[#666] leading-relaxed mb-6">
            Dubai&apos;s real estate market is unlike any other in the world. Its
            pace, its scale, its regulatory framework, and its multicultural
            stakeholders demand solutions that truly understand this environment.
            Keyflow was founded in Dubai because we believe the region deserves
            technology that matches its ambition.
          </p>
          <div className="inline-flex items-center gap-2 bg-white border border-[#E0E0E0] px-5 py-2.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-[#555]">
              Proud member of the <span className="font-semibold text-[#1B1B1B]">Proptech Hub</span> — an initiative by DIFC &amp; Dubai Land Department
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Want to Be Part of the Journey?"
        subtitle="We're building the future of proptech in Dubai. Get in touch to learn more about Keyflow."
        primaryLabel="Request a Demo"
        primaryHref="/request-demo"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
        trustText="Pre-launch  ·  Early access available  ·  Dubai-based team"
      />
    </>
  );
}
