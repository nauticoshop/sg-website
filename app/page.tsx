import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { LogoWall } from "@/components/logo-wall";
import { AboutSummary } from "@/components/about-summary";
import { ServicesGrid } from "@/components/services-grid";
import { PowerInNumbers } from "@/components/power-in-numbers";
import { FeaturedWork } from "@/components/featured-work";
import { Process } from "@/components/process";
import { VerticalsGrid } from "@/components/verticals-grid";
import { NauticalNetworkProof } from "@/components/nautical-network-proof";
import { GlobalReach } from "@/components/global-reach";
import { Testimonials } from "@/components/testimonials";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <LogoWall />
      <AboutSummary />
      <ServicesGrid />
      <PowerInNumbers />
      <FeaturedWork />
      <Process />
      <VerticalsGrid />
      <NauticalNetworkProof />
      <GlobalReach />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </>
  );
}
