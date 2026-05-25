import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { ServicesGrid } from "@/components/services-grid";
import { VerticalsGrid } from "@/components/verticals-grid";
import { NauticalNetworkProof } from "@/components/nautical-network-proof";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav variant="dark" />
      <Hero />
      <ServicesGrid />
      <VerticalsGrid />
      <NauticalNetworkProof />
      <CtaBanner />
      <Footer />
    </>
  );
}
