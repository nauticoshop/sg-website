import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Castoro } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { site } from "@/lib/site";
import { AnalyticsEvents } from "@/components/analytics-events";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ClarkyTweaks } from "@/components/clarky-tweaks";
import {
  JsonLd,
  organizationSchema,
  websiteSchema,
} from "@/components/json-ld";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const castoro = Castoro({
  variable: "--font-castoro",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Surroundings Group — The creative partner behind the world's premium brands",
    template: "%s — Surroundings Group",
  },
  description:
    "Surroundings Group is the creative partner behind the world's premium brands. Marine, real estate, hospitality, aviation, and more. Fully in-house. Backed by an owned-media network reaching 255M+ affluent viewers a year.",
  metadataBase: new URL("https://surroundingsgroup.com"),
  openGraph: {
    title: "Surroundings Group",
    description: "The creative partner behind the world's premium brands.",
    url: "https://surroundingsgroup.com",
    siteName: "Surroundings Group",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Surroundings Group",
    description: "The creative partner behind the world's premium brands.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${castoro.variable} antialiased`}
    >
      <GoogleTagManager gtmId={site.gtm} />
      <body className="min-h-screen flex flex-col bg-canvas text-ink">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll />
        <AnalyticsEvents />
        {children}
        {/* Clarky AI chat — loads after hydration so it doesn't block
            initial paint. Renders its own floating widget; replaces
            the earlier placeholder FloatingContact bubble. */}
        <Script
          src="https://clarky.ai/embed/54eff0a3-e16d-4ebd-a26d-c12fe344e043/chat.js"
          strategy="afterInteractive"
        />
        <ClarkyTweaks />
      </body>
    </html>
  );
}
