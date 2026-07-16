import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Marquee } from "@/components/marquee";
import {
  CareersHero,
  OpenRolesList,
  WhyPeopleStay,
  HowWeHire,
  OfferAndCta,
} from "@/components/careers-sections";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build the agency premium brands actually deserve. Surroundings Group hires vertical-fluent practitioners who care about premium work and want to make it.",
};

/** Disciplines strip — the signature marquee device as a transition. */
const disciplines = [
  "Business Development",
  "Photo / Video",
  "Email Marketing",
  "Paid Media",
  "PR + Communications",
  "Social Media",
  "Internships",
];

export default function CareersPage() {
  return (
    <>
      <Nav />
      <CareersHero />
      <Marquee items={disciplines} tone="dark" duration={35} />
      <OpenRolesList />
      <WhyPeopleStay />
      <HowWeHire />
      <OfferAndCta />
      <Footer />
    </>
  );
}
