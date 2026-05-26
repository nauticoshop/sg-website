import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/services-grid";
import { PowerInNumbers } from "@/components/power-in-numbers";
import { FeaturedWork } from "@/components/featured-work";
import { VerticalsGrid } from "@/components/verticals-grid";
import { NauticalNetworkProof } from "@/components/nautical-network-proof";
import { GlobalReach } from "@/components/global-reach";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ServicesGrid />
      <PowerInNumbers />
      <FeaturedWork />
      <VerticalsGrid />
      <NauticalNetworkProof />
      <GlobalReach />
      <CtaBanner />
      <Footer />
    </>
  );
}
