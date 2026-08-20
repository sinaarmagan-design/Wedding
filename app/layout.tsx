import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--nf-cormorant",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--nf-jost",
  weight: ["300", "400", "500"],
  display: "swap",
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Armağan & Eylül",
  description: "Armağan & Eylül's wedding gift list — buy a gift outright, or contribute towards one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#faf6f1] text-[#2b2420]">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
