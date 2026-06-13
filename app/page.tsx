import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { AboutSummary } from "@/components/about-summary";
import { VerticalsCinemaScroll } from "@/components/verticals-cinema-scroll";
import { ServicesGrid } from "@/components/services-grid";
import { FeaturedWork } from "@/components/featured-work";
import { GlobalReach } from "@/components/global-reach";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

/**
 * Homepage flow.
 *
 *   1. Hero                  — plain Vimeo bg + tagline (no overlay drama)
 *   2. AboutSummary          — gold section, scroll-reveal animations
 *   3. VerticalsCinemaScroll — pinned cinematic section with the eight
 *                              vertical CARDS floating over a cross-
 *                              fading background. Replaces both the
 *                              prior journey AND the static grid.
 *   4. ServicesGrid          — six service editorial bands
 *   5. FeaturedWork          — journal feed
 *   6. GlobalReach           — owned-media reach stat moment
 *   7. CtaBanner             — book the call
 *   8. Footer
 *
 * Earlier the page also rendered PinnedStoryScroll, VerticalsGrid,
 * VerticalsJourneyScroll, and WhatSetsUsApart. All unwired. The
 * component files are kept on disk in case we want them back.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <AboutSummary />
      <VerticalsCinemaScroll />
      <ServicesGrid />
      <FeaturedWork />
      <GlobalReach />
      <CtaBanner />
      <Footer />
    </>
  );
}
