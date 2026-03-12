import type { Metadata } from "next";
import { generalSans, satoshi, editorialNew } from "@/lib/fonts";
import { Navigation } from "@/components/layout/navigation";
import { SkipToContent } from "@/components/layout/skip-to-content";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keyflow \u2014 The Future of Real Estate",
  description: "The integrated software suite for Dubai real estate stakeholders.",
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
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
