import { pageMetadata } from "@/content/metadata";
import { WaitlistForm } from "@/components/contact/waitlist-form";
import { ContactInfo } from "@/components/contact/contact-info";

export const metadata = pageMetadata.contact;

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-display text-4xl desktop:text-6xl font-bold text-brand-dark mb-4">
          Get Early Access
        </h1>
        <p className="font-accent italic text-lg text-brand-dark/60 mb-16">
          Join the future of Dubai real estate.
        </p>

        <div className="grid desktop:grid-cols-[1fr_320px] gap-16 desktop:gap-24">
          <WaitlistForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
