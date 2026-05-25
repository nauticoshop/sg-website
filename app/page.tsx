import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { ServicesGrid } from "@/components/services-grid";
import { PowerInNumbers } from "@/components/power-in-numbers";
import { FeaturedWork } from "@/components/featured-work";
import { VerticalsGrid } from "@/components/verticals-grid";
import { NauticalNetworkProof } from "@/components/nautical-network-proof";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

const marqueeItems = [
  "Marine & Yachting",
  "Luxury Real Estate",
  "Multifamily",
  "Private Aviation",
  "Resorts & Travel",
  "Exotic Automotive",
  "Luxury Goods",
];

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee items={marqueeItems} duration={45} tone="dark" />
      <ServicesGrid />
      <PowerInNumbers />
      <FeaturedWork />
      <VerticalsGrid />
      <NauticalNetworkProof />
      <CtaBanner />
      <Footer />
    </>
  );
}
