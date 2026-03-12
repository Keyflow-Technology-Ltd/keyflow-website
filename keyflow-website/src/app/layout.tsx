import type { Metadata } from "next";
import { generalSans, satoshi, editorialNew } from "@/lib/fonts";
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
      <body>{children}</body>
    </html>
  );
}
