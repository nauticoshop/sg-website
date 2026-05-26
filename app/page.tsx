import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { FeaturedWork } from "@/components/featured-work";
import { ServicesGrid } from "@/components/services-grid";
import { VerticalsGrid } from "@/components/verticals-grid";
import { CtaBanner } from "@/components/cta-banner";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <FeaturedWork />
      <ServicesGrid />
      <VerticalsGrid />
      <CtaBanner />
      <Footer />
    </>
  );
}
