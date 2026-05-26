import type { Metadata } from "next";
import { DM_Sans, Castoro, Inter } from "next/font/google";
import "./globals.css";
import { FloatingContact } from "@/components/floating-contact";
import { SmoothScroll } from "@/components/smooth-scroll";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const castoro = Castoro({
  variable: "--font-castoro",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Surroundings Group — An award-winning creative agency for premium markets",
    template: "%s — Surroundings Group",
  },
  description:
    "Full-service creative, content, and distribution for luxury brands — built by the team behind Nautical Network's 180M+ annual viewers.",
  metadataBase: new URL("https://surroundingsgroup.com"),
  openGraph: {
    title: "Surroundings Group",
    description: "An award-winning creative agency for premium markets.",
    url: "https://surroundingsgroup.com",
    siteName: "Surroundings Group",
    locale: "en_US",
    type: "website",
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
      className={`${dmSans.variable} ${castoro.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        {/* Fontshare CDN — Clash Display + Satoshi for the /fonts-preview
            comparison page. Will be swapped to next/font/local once a
            choice is committed. */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        <SmoothScroll />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
