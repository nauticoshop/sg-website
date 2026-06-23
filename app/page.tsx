import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { AboutSummary } from "@/components/about-summary";
import { VerticalsGrid } from "@/components/verticals-grid";
import { ServicesGrid } from "@/components/services-grid";
import { FeaturedWork } from "@/components/featured-work";
import { GlobalReach } from "@/components/global-reach";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

/**
 * Homepage flow.
 *
 *   1. Hero           — plain Vimeo bg + tagline
 *   2. AboutSummary   — gold section, scroll-reveal animations
 *   3. VerticalsGrid  — eight vertical cards in a magazine-cover layout
 *                       (4-up tier 1 row, 4-up tier 2 row)
 *   4. ServicesGrid   — six service accordion rows, click to expand
 *   5. FeaturedWork   — journal feed
 *   6. GlobalReach    — owned-media reach stat moment
 *   7. CtaBanner      — book the call
 *   8. Footer
 *
 * Earlier the page rendered PinnedStoryScroll, VerticalsJourneyScroll,
 * VerticalsCinemaScroll, and WhatSetsUsApart. All unwired. The
 * component files are kept on disk in case we want them back.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <AboutSummary />
      <VerticalsGrid />
      <ServicesGrid />
      <FeaturedWork />
      <GlobalReach />
      <CtaBanner />
      <Footer />
    </>
  );
}
