import localFont from "next/font/local";

export const generalSans = localFont({
  src: "../../public/fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  display: "swap",
  preload: true,
});

export const satoshi = localFont({
  src: "../../public/fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  display: "swap",
});

export const editorialNew = localFont({
  src: "../../public/fonts/EditorialNew-Italic.woff2",
  variable: "--font-editorial-new",
  display: "swap",
  style: "italic",
});
