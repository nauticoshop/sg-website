import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { PinnedStoryScroll } from "@/components/pinned-story-scroll";
import { AboutSummary } from "@/components/about-summary";
import { ServicesGrid } from "@/components/services-grid";
import { VerticalsGrid } from "@/components/verticals-grid";
import { FeaturedWork } from "@/components/featured-work";
import { GlobalReach } from "@/components/global-reach";
import { WhatSetsUsApart } from "@/components/what-sets-us-apart";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <PinnedStoryScroll />
      <AboutSummary />
      <VerticalsGrid />
      <ServicesGrid />
      <FeaturedWork />
      <GlobalReach />
      <WhatSetsUsApart />
      <CtaBanner />
      <Footer />
    </>
  );
}
