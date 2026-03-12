import { pageMetadata } from "@/content/metadata";
import { websiteSchema } from "@/lib/seo";
import { HeroSection } from "@/components/home/hero-section";
import { VisionSection } from "@/components/home/vision-section";
import { ProductReveal } from "@/components/home/product-reveal";
import { EcosystemDiagram } from "@/components/home/ecosystem-diagram";
import { CredibilityStrip } from "@/components/home/credibility-strip";
import { CTASection } from "@/components/home/cta-section";

export const metadata = pageMetadata.home;

export default function HomePage() {
  return (
    <>
      {/* JSON-LD: WebSite schema — static content, no user input */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />
      <HeroSection />
      <VisionSection />
      <ProductReveal />
      <EcosystemDiagram />
      <CredibilityStrip />
      <CTASection />
    </>
  );
}
