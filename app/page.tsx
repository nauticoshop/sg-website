import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { VerticalsJourneyScroll } from "@/components/verticals-journey-scroll";
import { AboutSummary } from "@/components/about-summary";
import { ServicesGrid } from "@/components/services-grid";
import { FeaturedWork } from "@/components/featured-work";
import { GlobalReach } from "@/components/global-reach";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

/**
 * Homepage flow — eight sections, each says one thing and stops.
 *
 *   1. Hero               — tagline + Vimeo bg
 *   2. VerticalsJourney   — cinematic walk through all 8 verticals
 *                           (also serves as the verticals showcase)
 *   3. AboutSummary       — who we are
 *   4. ServicesGrid       — six service editorial bands
 *   5. FeaturedWork       — journal feed
 *   6. GlobalReach        — owned-media reach stat moment
 *   7. CtaBanner          — book the call
 *   8. Footer
 *
 * Earlier the page also rendered PinnedStoryScroll, VerticalsGrid,
 * and WhatSetsUsApart. Those were unwired because they re-said what
 * the journey, services bands, and reach moment already cover. The
 * component files are kept on disk in case we want them back.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <VerticalsJourneyScroll />
      <AboutSummary />
      <ServicesGrid />
      <FeaturedWork />
      <GlobalReach />
      <CtaBanner />
      <Footer />
    </>
  );
}
