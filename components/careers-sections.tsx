"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { jobs } from "@/lib/jobs";
import { site } from "@/lib/site";

/**
 * Careers page sections — editorial composition with the same
 * scroll-reveal language as the homepage (AboutSummary/CtaBanner):
 * staggered opacity + y-translate, asymmetric 12-col grids, hairline
 * rules instead of boxed cards. Reduced-motion users get static layout.
 */

const EASE = [0.22, 0.61, 0.36, 1] as const;

function useReveal(stagger = 0.1) {
  const reduce = useReducedMotion();
  const child = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: EASE },
        },
      };
  const container = reduce
    ? {}
    : {
        initial: "hidden" as const,
        whileInView: "shown" as const,
        viewport: { once: true, amount: 0.2 },
        variants: {
          hidden: {},
          shown: { transition: { staggerChildren: stagger } },
        },
      };
  return { child, container };
}

/** Short accent rule under section headlines — the page's splitting device. */
function Rule({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`block w-14 h-[3px] mt-6 ${className}`} />;
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden
      className={className}
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

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function CareersHero() {
  const { child, container } = useReveal(0.12);

  return (
    <section className="bg-canvas pt-36 lg:pt-44 pb-16 lg:pb-20 px-6 lg:px-12">
      <motion.div {...container} className="max-w-[1200px] mx-auto">
        <motion.p variants={child} className="caption text-gold-deep mb-6">
          CAREERS
        </motion.p>
        <motion.h1
          variants={child}
          className="font-sans font-extrabold text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.02] tracking-tight text-ink max-w-5xl text-balance"
        >
          Build the agency premium brands actually deserve.
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 mt-10 lg:mt-14">
          <motion.p
            variants={child}
            className="lg:col-start-6 lg:col-span-7 text-lg lg:text-xl text-neutral-800 leading-relaxed max-w-2xl"
          >
            An adaptive-first group of creative humans working in the
            industries most people only dream about. We bet you&apos;ll fit
            right in.
          </motion.p>
        </div>

        <motion.a
          variants={child}
          href="#roles"
          className="group caption inline-flex items-center gap-3 text-ink hover:text-gold-deep transition-colors duration-300 mt-12 lg:mt-16"
        >
          See open roles
          <Arrow className="rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
        </motion.a>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Open roles — editorial list rows                                    */
/* ------------------------------------------------------------------ */

function mailtoLink(subject: string) {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}`;
}

export function OpenRolesList() {
  const { child, container } = useReveal(0.07);

  return (
    <section
      id="roles"
      className="bg-[#EFE7DA] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-20"
    >
      <motion.div {...container} className="max-w-[1200px] mx-auto">
        <motion.header variants={child} className="mb-8 lg:mb-10">
          <p className="caption text-gold-deep mb-4">OPEN ROLES</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
            Current openings.
          </h2>
          <Rule className="bg-gold-deep" />
        </motion.header>

        {jobs.length > 0 ? (
          <>
            <ul className="border-t border-ink/15">
              {jobs.map((job) => (
                <motion.li variants={child} key={job.slug}>
                  <Link
                    href={`/careers/${job.slug}`}
                    className="group grid grid-cols-1 md:grid-cols-12 md:items-baseline gap-y-2 gap-x-6 py-7 lg:py-9 border-b border-ink/10 hover:border-gold-deep/60 transition-colors duration-300"
                  >
                    <h3 className="md:col-span-7 font-sans font-extrabold text-2xl lg:text-[2.5rem] leading-tight tracking-tight text-ink group-hover:text-gold-deep transition-colors duration-300 text-balance">
                      {job.title}
                    </h3>
                    <span className="md:col-span-4 caption text-neutral-600">
                      {job.type} · {job.location}
                    </span>
                    <span className="hidden md:flex md:col-span-1 justify-end text-neutral-400 group-hover:text-gold-deep transition-colors duration-300">
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.p
              variants={child}
              className="text-sm text-neutral-700 mt-8 leading-relaxed"
            >
              Don&apos;t see your role?{" "}
              <Link
                href={mailtoLink("Careers — Introduction")}
                className="underline text-ink hover:text-gold-deep transition-colors"
              >
                Introduce yourself anyway
              </Link>{" "}
              — we talk even when a formal opening isn&apos;t listed.
            </motion.p>
          </>
        ) : (
          <motion.div
            variants={child}
            className="border-t border-neutral-200 pt-10"
          >
            <p className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance max-w-2xl">
              Roles are being refreshed for the current hiring window.
            </p>
            <p className="text-sm text-neutral-700 max-w-md mb-6 leading-relaxed">
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
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why people stay — sticky headline + flowing rows                    */
/* ------------------------------------------------------------------ */

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

export function WhyPeopleStay() {
  const { child, container } = useReveal(0.08);

  return (
    <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12 border-t border-neutral-200">
      <motion.div
        {...container}
        className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12"
      >
        <motion.div
          variants={child}
          className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
        >
          <p className="caption text-gold-deep mb-5">WHY HERE</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
            Why people stay.
          </h2>
          <Rule className="bg-gold-deep" />
        </motion.div>

        <div className="lg:col-span-8">
          {benefits.map((b, i) => (
            <motion.div
              variants={child}
              key={b.title}
              className={`grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2 py-7 lg:py-8 border-l-2 border-l-transparent hover:border-l-gold-deep hover:pl-5 transition-all duration-300 ${
                i === 0 ? "" : "border-t border-t-neutral-300"
              }`}
            >
              <h3 className="md:col-span-5 font-sans font-extrabold text-xl lg:text-2xl text-ink leading-tight text-balance">
                {b.title}
              </h3>
              <p className="md:col-span-7 text-base text-neutral-800 leading-relaxed">
                {b.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* How we hire — dark editorial band                                   */
/* ------------------------------------------------------------------ */

const steps = [
  {
    title: "Introduction",
    body: "You send a note via the path that fits best. A real person at SG reads it within the week and replies — even when a formal role isn't open.",
  },
  {
    title: "Conversation",
    body: "30-minute call with the discipline lead. We talk about your work, your category fluency, and what you're looking for next.",
  },
  {
    title: "Portfolio review",
    body: "Walk us through 2-3 projects you'd want associated with your name forever. We're more interested in your taste than in case-study polish.",
  },
  {
    title: "Team day + offer",
    body: "A working session with the team you'd join, on the kind of brief you'd actually run here. Decision within a week of the day.",
  },
];

export function HowWeHire() {
  const { child, container } = useReveal(0.1);

  return (
    <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
      <motion.div
        {...container}
        className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12"
      >
        <motion.div
          variants={child}
          className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
        >
          <p className="caption text-gold mb-5">WHAT TO EXPECT</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas text-balance">
            How we hire.
          </h2>
          <Rule className="bg-gold" />
          <p className="text-base lg:text-lg text-canvas/70 leading-relaxed mt-6">
            We read every note. No black-hole portals, no ATS auto-rejections
            ten months after the fact. Here&apos;s the actual sequence.
          </p>
        </motion.div>

        <div className="lg:col-span-8">
          {steps.map((s, i) => (
            <motion.div
              variants={child}
              key={s.title}
              className={`grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2 py-7 lg:py-8 ${
                i === 0 ? "" : "border-t border-canvas/10"
              }`}
            >
              <h3 className="md:col-span-5 font-sans font-extrabold text-xl lg:text-2xl text-canvas leading-tight text-balance">
                {s.title}
              </h3>
              <p className="md:col-span-7 text-base text-canvas/70 leading-relaxed">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What we offer + closing CTA — gold finale                           */
/* ------------------------------------------------------------------ */

const offers = [
  {
    title: "Competitive base + performance",
    body: "Salary calibrated to the discipline and category, plus performance upside tied to engagements you contribute to.",
  },
  {
    title: "PTO that's actually used",
    body: "Built-in time off plus seasonal closures so the team genuinely unplugs. The studio runs because we're rested.",
  },
  {
    title: "In-house creative pipeline",
    body: "Best-in-class production gear, editorial tools, and AI workflows wired to the studio. You don't fight your tools to do the work.",
  },
  {
    title: "Industry access",
    body: "On-location work in the categories we serve — yachts, estates, terminals, member clubs. The job exposes you to rooms most agencies don't get into.",
  },
  {
    title: "Path to leadership",
    body: "Clear track from practitioner to lead to discipline head. Quarterly reviews tied to growth, not just performance.",
  },
];

export function OfferAndCta() {
  const { child, container } = useReveal(0.08);

  return (
    <section className="bg-gold text-ink py-20 lg:py-28 px-6 lg:px-12">
      <motion.div {...container} className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
          <motion.div
            variants={child}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="caption text-gold-deep mb-5">WHAT WE OFFER</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              The table stakes, the upside, and the access.
            </h2>
            <Rule className="bg-ink" />
          </motion.div>

          <div className="lg:col-span-8">
            {offers.map((o, i) => (
              <motion.div
                variants={child}
                key={o.title}
                className={`grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2 py-6 lg:py-7 ${
                  i === 0 ? "" : "border-t border-ink/15"
                }`}
              >
                <h3 className="md:col-span-5 font-sans font-extrabold text-lg lg:text-xl text-ink leading-tight text-balance">
                  {o.title}
                </h3>
                <p className="md:col-span-7 text-sm lg:text-base text-ink/75 leading-relaxed">
                  {o.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          variants={child}
          className="border-t border-ink/20 mt-14 lg:mt-16 pt-10 lg:pt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <p className="font-sans font-extrabold text-2xl lg:text-3xl tracking-tight text-ink text-balance max-w-lg">
            Sound like your kind of room?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="#roles"
              className="bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-300 text-center"
            >
              Browse the roles
            </a>
            <Link
              href={mailtoLink("Careers — Introduction")}
              className="border border-ink/40 text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-ink hover:text-canvas hover:border-ink transition-colors duration-300 text-center"
            >
              Introduce yourself
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
