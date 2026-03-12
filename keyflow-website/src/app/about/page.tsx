import { pageMetadata } from "@/content/metadata";
import { MissionSection } from "@/components/about/mission-section";
import { TeamScatter } from "@/components/about/team-scatter";
import { PropTechHub } from "@/components/about/proptech-hub";
import { EarlyAccessCTA } from "@/components/ui/early-access-cta";

export const metadata = pageMetadata.about;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 text-center pt-24">
        <h1 className="font-display text-5xl desktop:text-[7rem] font-bold text-brand-dark leading-none">
          Built in Dubai,
          <br />
          <span className="font-accent italic text-brand-accent">for Dubai.</span>
        </h1>
      </section>

      <MissionSection />
      <TeamScatter />
      <PropTechHub />

      <EarlyAccessCTA
        headline="Join us"
        subtext="Be part of the future of Dubai real estate."
      />
    </>
  );
}
