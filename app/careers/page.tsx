import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build the agency premium brands actually deserve. Surroundings Group hires vertical-fluent practitioners who care about premium work and want to ship it.",
};

/** Six reasons people stay (why here). */
const benefits = [
  {
    title: "Vertical-fluent by design.",
    copy: "You work in the categories you know best. We pick the verticals on purpose and turn down work outside them. Deep category fluency matters more here than a generalist credential.",
  },
  {
    title: "Real ownership of work.",
    copy: "Every deliverable that ships is something you'd put in your portfolio. We don't ship work we'd be embarrassed to publish, and we don't ship work that gets buried in a deck.",
  },
  {
    title: "The cross-vertical advantage.",
    copy: "Our clients borrow from each other across the categories. A yacht in a real estate launch film. A car reveal at a hospitality activation. You make connected work, not siloed campaigns.",
  },
  {
    title: "Owned media at scale.",
    copy: "Every piece of creative ships through editorial channels we run, reaching 255M+ affluent viewers a year. Your work gets distribution most agencies have to buy.",
  },
  {
    title: "One team, one process.",
    copy: "Strategy, production, distribution, and measurement all under one roof. No handoffs between departments. The people who plan it are the people who ship it.",
  },
  {
    title: "Tampa-rooted.",
    copy: "Studio is in Tampa. We work with brands nationally, but the team is here, building together in real space, on a real schedule.",
  },
];

/** Five paths people fit into. Mailto subjects are pre-filled per path. */
const paths = [
  {
    name: "Creative & Studio",
    blurb:
      "Directors, cinematographers, editors, photographers, art directors. The team that makes the work.",
    subject: "Careers — Creative & Studio",
  },
  {
    name: "Strategy & Growth",
    blurb:
      "Strategists, paid media operators, PR leads, email and lifecycle marketers. The team that builds and ships demand.",
    subject: "Careers — Strategy & Growth",
  },
  {
    name: "Social & Content",
    blurb:
      "Social strategists, community leads, content producers, creators. The team that runs daily presence.",
    subject: "Careers — Social & Content",
  },
  {
    name: "Digital & Intelligence",
    blurb:
      "Engineers, designers, AI and automation operators, marketing technologists. The team building the digital surface and the systems behind it.",
    subject: "Careers — Digital & Intelligence",
  },
  {
    name: "Operations & BD",
    blurb:
      "Producers, account leads, business development, finance, ops. The team that keeps the studio running and the partnerships growing.",
    subject: "Careers — Operations & BD",
  },
];

/** Culture pillars. Image placeholders until real team/studio photos are dropped. */
const culturePillars = [
  {
    title: "Vertical-fluent by design.",
    copy: "We work in the categories we've spent years learning. Marine, real estate, multifamily, aviation, hospitality, resorts, automotive, luxury goods. You bring your category and the rest of the team learns from it.",
  },
  {
    title: "Real ownership.",
    copy: "Every deliverable has your name on it. The work goes live in the brands you respect, not into a deck the client politely thanks you for.",
  },
  {
    title: "A network that compounds.",
    copy: "Our clients borrow from each other across the categories. As a teammate, that means cross-vertical work most agencies can't pull off, and a portfolio that reflects it.",
  },
  {
    title: "Tampa-rooted.",
    copy: "Studio is in Tampa. We work with brands nationally, but the team is here. Real days together, real shared lunches, a built-in culture you can't get over Slack.",
  },
];

function mailtoLink(subject: string) {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
}

export default function CareersPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="CAREERS"
        title="Build the agency premium brands actually deserve."
        subhead="We hire vertical-fluent people who care about premium work and want to ship it."
      />

      {/* Why here — 6 reasons */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="caption text-gold-deep mb-6">WHY HERE</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink mb-12 lg:mb-16 max-w-3xl text-balance">
            Six reasons people stay.
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {benefits.map((b, i) => (
              <li
                key={i}
                className="border-t border-neutral-200 pt-6 lg:pt-8"
              >
                <p className="caption text-gold-deep mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-ink mb-3 text-balance">
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

      {/* Where you fit — 5 role category paths */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold mb-4">WHERE YOU FIT</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas leading-[1.1] text-balance">
              Five paths into the studio.
            </h2>
            <p className="text-base lg:text-lg text-canvas/70 leading-relaxed mt-6 max-w-2xl">
              Pick the closest one and send a note. Even when there isn&apos;t
              an open role on the list, we&apos;ll keep the introduction on
              file for the next hiring window.
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-canvas/15 border border-canvas/15">
            {paths.map((p, i) => (
              <li key={p.name}>
                <a
                  href={mailtoLink(p.subject)}
                  className="group block bg-ink p-8 lg:p-10 hover:bg-neutral-800 transition-colors duration-300 h-full"
                >
                  <p className="caption text-gold mb-6">
                    {String(i + 1).padStart(2, "0")} / PATH
                  </p>
                  <h3 className="font-sans font-extrabold text-2xl lg:text-3xl text-canvas leading-tight mb-4 text-balance group-hover:text-gold transition-colors duration-300">
                    {p.name}
                  </h3>
                  <p className="text-base text-canvas/70 leading-relaxed mb-6">
                    {p.blurb}
                  </p>
                  <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold transition-colors duration-300">
                    Introduce yourself
                    <Arrow />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Life at the studio — culture pillars with image placeholders */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold-deep mb-4">LIFE AT THE STUDIO</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.1] text-balance">
              The model is the perk.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-6 max-w-2xl">
              People stay because the way the studio runs makes the work
              better. The verticals, the network, the in-house production,
              the room itself.
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {culturePillars.map((pillar, i) => (
              <li key={i} className="flex flex-col">
                {/* Image placeholder — 4:5 portrait, dark frame.
                    Drop real studio/team photos at
                    /public/images/careers/{slug}.jpg and swap to <Image>. */}
                <div className="aspect-[4/5] bg-ink relative overflow-hidden mb-5">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="caption text-canvas/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="absolute top-0 right-0 w-12 h-px bg-gold/50"
                    aria-hidden
                  />
                </div>

                <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-ink mb-3 leading-tight text-balance">
                  {pillar.title}
                </h3>
                <p className="text-sm lg:text-base text-neutral-700 leading-relaxed">
                  {pillar.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Open roles — placeholder + introduce yourself */}
      <section className="bg-neutral-50 py-16 lg:py-24 px-6 lg:px-12 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-10 lg:mb-12">
            <p className="caption text-gold-deep mb-4">OPEN ROLES</p>
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
              If you&apos;re a vertical-fluent practitioner in creative,
              strategy, social, digital, or operations, send us a note.
              We&apos;ll talk even when a formal role isn&apos;t listed.
            </p>
            <Link
              href={mailtoLink("Careers — Introduction")}
              className="caption inline-flex items-center gap-2 text-ink hover:text-gold-deep transition-colors"
            >
              Introduce yourself
              <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
