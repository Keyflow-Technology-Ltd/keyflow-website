import { pageMetadata } from "@/content/metadata";
import { products } from "@/content/products";
import { StakeholderNav } from "@/components/solutions/stakeholder-nav";
import { ProductDeepDive } from "@/components/solutions/product-deep-dive";
import { DLDHighlight } from "@/components/solutions/dld-highlight";
import { EarlyAccessCTA } from "@/components/ui/early-access-cta";

export const metadata = pageMetadata.solutions;

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center pt-24">
        <h1 className="font-display text-5xl desktop:text-[7rem] font-bold text-brand-dark leading-none">
          One Suite.
          <br />
          <span className="text-brand-accent">Every Stakeholder.</span>
        </h1>
        <p className="font-accent italic text-lg desktop:text-xl text-brand-dark/60 mt-6 max-w-2xl">
          Four products. One ecosystem. Built for how Dubai real estate actually works.
        </p>
      </section>

      {/* Stakeholder tabs */}
      <StakeholderNav />

      {/* Product deep dives */}
      {products.map((product, i) => (
        <ProductDeepDive key={product.slug} product={product} index={i} />
      ))}

      {/* DLD highlight */}
      <DLDHighlight />

      {/* CTA */}
      <EarlyAccessCTA
        headline="See yourself in the flow"
        subtext="Get early access to the Keyflow suite."
      />
    </>
  );
}
