import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WhyUs } from "@/components/why-us";
import { ServicesGrid } from "@/components/services-grid";
import { FeaturedWork } from "@/components/featured-work";
import { VerticalsGrid } from "@/components/verticals-grid";
import { Testimonials } from "@/components/testimonials";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <WhyUs />
      <ServicesGrid />
      <FeaturedWork />
      <VerticalsGrid />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </>
  );
}
