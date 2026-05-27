import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { AboutSummary } from "@/components/about-summary";
import { ServicesGrid } from "@/components/services-grid";
import { VerticalsGrid } from "@/components/verticals-grid";
import { PowerInNumbers } from "@/components/power-in-numbers";
import { FeaturedWork } from "@/components/featured-work";
import { GlobalReach } from "@/components/global-reach";
import { WhatSetsUsApart } from "@/components/what-sets-us-apart";
import { Testimonials } from "@/components/testimonials";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <AboutSummary />
      <ServicesGrid />
      <VerticalsGrid />
      <PowerInNumbers />
      <FeaturedWork />
      <GlobalReach />
      <WhatSetsUsApart />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </>
  );
}
