import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build the agency premium brands actually deserve. Surroundings Group hires vertical-fluent practitioners who care about premium work and want to make it.",
};

/** Six reasons people stay (why here). */
const benefits = [
  {
    title: "Vertical-fluent by design.",
    copy: "You work in the categories you know best. We pick the verticals on purpose and turn down work outside them. Deep category fluency matters more here than a generalist credential.",
  },
  {
    title: "Real ownership of work.",
    copy: "Every deliverable that goes out is something you'd put in your portfolio. We don't put our name on work we'd be embarrassed to publish, and we don't make work that gets buried in a deck.",
  },
  {
    title: "Owned media at scale.",
    copy: "Every piece of creative travels through editorial channels we run, reaching 255M+ affluent viewers a year. Your work gets distribution most agencies have to buy.",
  },
  {
    title: "Fun is the fuel.",
    copy: "Brainstorming here is a team sport. Thinking outside the box is the compass for creativity, innovation is the norm, and the room runs on genuine energy, not mandatory fun.",
  },
  {
    title: "Live the industry.",
    copy: "Yachts, estates, jets, resorts. You work in the lifestyle most people only see in a feed, and the access is part of the job. Where passion meets opulence.",
  },
  {
    title: "Tampa-rooted.",
    copy: "Studio is in Tampa. We work with brands nationally, but the team is here, building together in real space, on a real schedule — with quarterly one-on-ones charting where you're headed.",
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
      "Strategists, paid media operators, PR leads, email and lifecycle marketers. The team that builds demand.",
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
        subhead="An adaptive-first group of creative humans working in the industries most people only dream about. We bet you'll fit right in."
      />

      {/* Why here — 6 reasons */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="caption text-gold-deep mb-6">WHY HERE</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink mb-12 lg:mb-16 max-w-3xl text-balance">
            Why people stay.
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {benefits.map((b, i) => (
              <li
                key={i}
                className="border-t border-neutral-200 pt-6 lg:pt-8"
              >
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
              Find where you fit.
            </h2>
            <p className="text-base lg:text-lg text-canvas/70 leading-relaxed mt-6 max-w-2xl">
              Pick the closest one and send a note. Even when there isn&apos;t
              an open role on the list, we&apos;ll keep the introduction on
              file for the next hiring window.
            </p>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-canvas/15 border border-canvas/15">
            {paths.map((p) => (
              <li key={p.name}>
                <a
                  href={mailtoLink(p.subject)}
                  className="group block bg-ink p-8 lg:p-10 hover:bg-neutral-800 transition-colors duration-300 h-full"
                >
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

      {/* Hiring process — what to expect after introducing yourself */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold-deep mb-5 tracking-[0.28em]">
              WHAT TO EXPECT
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.1] text-balance">
              How we hire.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mt-6 max-w-2xl">
              We read every note. No black-hole portals, no ATS auto-rejections
              ten months after the fact. Here&apos;s the actual sequence.
            </p>
          </header>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <Step
              num="01"
              title="Introduction"
              body="You send a note via the path that fits best. A real person at SG reads it within the week and replies — even when a formal role isn't open."
            />
            <Step
              num="02"
              title="Conversation"
              body="30-minute call with the discipline lead. We talk about your work, your category fluency, and what you're looking for next."
            />
            <Step
              num="03"
              title="Portfolio review"
              body="Walk us through 2-3 projects you'd want associated with your name forever. We're more interested in your taste than in case-study polish."
            />
            <Step
              num="04"
              title="Team day + offer"
              body="A working session with the team you'd join, on the kind of brief you'd actually run here. Decision within a week of the day."
            />
          </ol>
        </div>
      </section>

      {/* What we offer — transparent benefits strip */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12 border-t border-canvas/10">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold mb-5 tracking-[0.28em]">
              WHAT WE OFFER
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas leading-[1.1] text-balance">
              The table stakes, the upside, and the access.
            </h2>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <Offer
              title="Competitive base + performance"
              body="Salary calibrated to the discipline and category, plus performance upside tied to engagements you contribute to."
            />
            <Offer
              title="Full medical + dental"
              body="Comprehensive coverage for you and your dependents from day one. No tier games."
            />
            <Offer
              title="PTO that's actually used"
              body="Built-in time off plus seasonal closures so the team genuinely unplugs. The studio runs because we're rested."
            />
            <Offer
              title="In-house creative pipeline"
              body="Best-in-class production gear, editorial tools, and AI workflows wired to the studio. You don't fight your tools to do the work."
            />
            <Offer
              title="Industry access"
              body="On-location work in the categories we serve — yachts, estates, terminals, member clubs. The job exposes you to rooms most agencies don't get into."
            />
            <Offer
              title="Path to leadership"
              body="Clear track from practitioner to lead to discipline head. Quarterly reviews tied to growth, not just performance."
            />
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Step({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <li className="border-t border-neutral-300 pt-6 lg:pt-8">
      <p className="caption text-gold-deep mb-4">{num}</p>
      <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-ink leading-tight mb-4 tracking-tight">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-neutral-700 leading-relaxed">
        {body}
      </p>
    </li>
  );
}

function Offer({ title, body }: { title: string; body: string }) {
  return (
    <li className="border-t border-canvas/15 pt-6 lg:pt-8">
      <h3 className="font-sans font-extrabold text-lg lg:text-xl text-canvas leading-tight mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-sm lg:text-base text-canvas/75 leading-relaxed">
        {body}
      </p>
    </li>
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
