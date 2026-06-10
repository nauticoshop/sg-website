import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { WorkGrid } from "@/components/work-grid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Surroundings Group — superyacht charter campaigns, estate and residential shoots, private aviation, resorts, hospitality, and luxury goods.",
};

export default function WorkIndexPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="THE PORTFOLIO"
        title="Work that speaks for itself."
        subhead="Selected collections across marine, real estate, aviation, hospitality, and the categories around them. Shot, cut, and delivered by our in-house team."
      />

      <section className="bg-canvas pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <WorkGrid />
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}
