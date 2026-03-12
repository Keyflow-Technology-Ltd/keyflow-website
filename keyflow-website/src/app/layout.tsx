import type { Metadata } from "next";
import { generalSans, satoshi, editorialNew } from "@/lib/fonts";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { PageTransition } from "@/components/layout/page-transition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keyflow — The Future of Real Estate",
  description: "The integrated software suite for Dubai real estate stakeholders. AI-powered tools for agents, agencies, developers, owners, and tenants.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${satoshi.variable} ${editorialNew.variable}`}
    >
      <body>
        <SkipToContent />
        <Navigation />
        <main id="main-content" tabIndex={-1}>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
