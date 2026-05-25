import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Surroundings Group — a Tampa-based premium creative studio building the agency luxury brands actually deserve.",
};

const benefits = [
  {
    title: "Senior peers, in-house.",
    copy: "No layered junior teams. You'll work alongside category experts who've spent careers in the verticals we serve.",
  },
  {
    title: "Real ownership of work.",
    copy: "We don't ship work we'd be embarrassed to publish. Every shipped deliverable is something you'll want in your portfolio.",
  },
  {
    title: "Built around the discipline.",
    copy: "Vertical-focused. In-house production. Owned distribution. The model itself is the perk — work compounds because the system is built for it.",
  },
  {
    title: "Tampa-rooted.",
    copy: "Studio is in Tampa, FL. We work with brands nationally but the team is here, building together.",
  },
];

export default function CareersPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="CAREERS"
        title="Build the agency luxury brands actually deserve."
        subhead="We hire senior, vertical-fluent practitioners who care about premium work and want to ship it."
      />

      {/* Why work here */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="caption text-gold mb-6">WHY HERE</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink mb-12 lg:mb-16 max-w-3xl text-balance">
            Four reasons people stay.
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {benefits.map((b, i) => (
              <li
                key={i}
                className="border-t border-neutral-200 pt-6 lg:pt-8"
              >
                <p className="caption text-gold mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-3 text-balance">
                  {b.title}
                </h3>
                <p className="text-base text-neutral-700 leading-relaxed">
                  {b.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Open roles */}
      <section className="bg-neutral-50 py-16 lg:py-24 px-6 lg:px-12 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-10 lg:mb-12">
            <p className="caption text-gold mb-4">OPEN ROLES</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance max-w-3xl">
              Current openings.
            </h2>
          </header>

          <div className="bg-canvas border border-neutral-200 p-10 lg:p-16 text-center">
            <p className="caption text-neutral-500 mb-4">UPDATING</p>
            <p className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance max-w-2xl mx-auto">
              Roles are being refreshed for the current hiring window.
            </p>
            <p className="text-sm text-neutral-700 max-w-md mx-auto mb-6 leading-relaxed">
              If you&apos;re a senior practitioner in creative production,
              strategy, social, paid, or operations — send us a note. We&apos;ll
              talk even when a formal role isn&apos;t listed.
            </p>
            <Link
              href={`mailto:${site.contact.email}?subject=Careers%20%E2%80%94%20${encodeURIComponent("Introduction")}`}
              className="caption inline-flex items-center gap-2 text-ink hover:text-gold transition-colors"
            >
              Introduce yourself
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
