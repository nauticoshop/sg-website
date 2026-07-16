import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BdMeetingCard } from "@/components/bd-meeting-card";
import { DiscoveryQualifier } from "@/components/discovery-qualifier";
import { Rule } from "@/components/rule";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Connect directly with Phallon Ray, Director of Business Development, for a 30-minute discovery call with Surroundings Group.",
};

export default function DiscoveryCallPage() {
  return (
    <>
      <Nav />

      {/* Hero — offset for fixed nav */}
      <section className="bg-canvas pt-36 lg:pt-44 pb-12 lg:pb-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="caption text-neutral-500 mb-6">◆ DISCOVERY CALL</p>
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink max-w-3xl text-balance">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="text-xl lg:text-2xl font-light text-ink mt-6 max-w-2xl leading-[1.35] text-balance">
            30 minutes with our team.{" "}
            <span className="text-ink/55">
              We&apos;ll learn your project and tell you honestly whether
              we&apos;re the right fit.
            </span>
          </p>
        </div>
      </section>

      {/* Primary CTA — BD editorial card */}
      <BdMeetingCard
        name="Phallon Ray"
        title="Director of Business Development"
        initials="PR"
        quote="Every great brand starts with a great conversation."
        meta="30 minutes. No pitch deck. No follow-up nagging."
        bookingHref="#book"
        bookingLabel="Book 30 min with Phallon"
        eyebrow="◆ CONNECT DIRECTLY"
        image="/images/team/phallon-ray-cutout.png"
        imageAlt="Phallon Ray, Director of Business Development at Surroundings Group"
      />

      {/* Qualifying questions gate the calendar — answers email the
          team, then the live Calendly calendar is revealed in place. */}
      <section id="book" className="bg-[#EFE7DA] py-16 lg:py-24 px-6 lg:px-12 scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <header className="mb-8 lg:mb-10">
            <p className="caption text-neutral-500 mb-4">◆ A FEW QUICK QUESTIONS</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              Tell us a little first.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 mt-4 max-w-2xl leading-relaxed">
              So we come to the call already up to speed. Then you&apos;ll pick
              a time.
            </p>
          </header>
          <DiscoveryQualifier />
        </div>
      </section>

      {/* What to expect — the page's only job is getting you on a call,
          so the duplicate contact form is gone. Anyone who'd rather not
          book has the phone here and /contact one tap away. */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-10">
          <div className="lg:col-span-4">
            <p className="caption text-neutral-500 mb-4">◆ WHAT TO EXPECT</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              How this goes.
            </h2>
            <Rule className="bg-ink mt-6" />
          </div>

          <div className="lg:col-span-8">
            <ol className="border-t border-neutral-200">
              <ExpectationStep
                num="01"
                title="Answer a few quick questions"
                copy="30 seconds so we come prepared, then the calendar opens right there."
              />
              <ExpectationStep
                num="02"
                title="30-minute discovery"
                copy="No pitch deck. We listen, ask, and tell you honestly whether we're the right fit."
              />
              <ExpectationStep
                num="03"
                title="A clear next step"
                copy="Either a proposal, a referral to someone better suited, or we revisit in 90 days."
              />
            </ol>

            <div className="mt-10 lg:mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
              <div>
                <p className="caption text-neutral-500 mb-3">◆ PREFER TO CALL?</p>
                <a
                  href={`tel:${site.contact.phone.replace(/-/g, "")}`}
                  className="font-sans font-extrabold text-2xl lg:text-3xl text-ink hover:text-neutral-500 transition-colors block"
                >
                  {site.contact.phone}
                </a>
                <p className="text-sm text-neutral-600 mt-2">Mon–Fri, 9–5 ET</p>
              </div>
              <Link
                href="/contact"
                className="caption inline-flex items-center gap-2 text-ink hover:text-neutral-500 transition-colors shrink-0"
              >
                Rather send a note?
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
        </div>
      </section>

      <Footer />
    </>
  );
}

function ExpectationStep({
  num,
  title,
  copy,
}: {
  num: string;
  title: string;
  copy: string;
}) {
  return (
    <li className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-1 py-6 lg:py-7 border-b border-neutral-200">
      <span className="caption text-neutral-500 md:col-span-1">{num}</span>
      <p className="md:col-span-4 font-sans font-extrabold text-xl lg:text-2xl text-ink leading-tight text-balance">
        {title}
      </p>
      <p className="md:col-span-7 text-base text-neutral-700 leading-relaxed">
        {copy}
      </p>
    </li>
  );
}
