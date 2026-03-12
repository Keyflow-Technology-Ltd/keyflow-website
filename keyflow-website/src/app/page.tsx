import { HeroSection } from "@/components/home/hero-section";
import { VisionSection } from "@/components/home/vision-section";
import { ProductReveal } from "@/components/home/product-reveal";
import { EcosystemDiagram } from "@/components/home/ecosystem-diagram";
import { CredibilityStrip } from "@/components/home/credibility-strip";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VisionSection />
      <ProductReveal />
      <EcosystemDiagram />
      <CredibilityStrip />
      <CTASection />
    </>
  );
}
