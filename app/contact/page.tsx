import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { BdMeetingCard } from "@/components/bd-meeting-card";
import { DiscoveryQualifier } from "@/components/discovery-qualifier";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a discovery call with Surroundings Group, or reach us by email or phone. We reply within one business day.",
};

/** Direct ways in — email and phone. One tap each. */
const channels = [
  {
    label: "Email us",
    value: "interested@surroundingsgroup.com",
    detail: "Best for briefs, press, and partnerships.",
    href: "mailto:interested@surroundingsgroup.com",
  },
  {
    label: "Call us",
    value: "813-869-0162",
    detail: "Mon–Fri, 9–5 ET.",
    href: "tel:8138690162",
  },
];

export default function ContactPage() {
  return (
    <>
      <Nav />

      {/* Hero — offset for fixed nav */}
      <section className="bg-canvas pt-36 lg:pt-44 pb-12 lg:pb-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="caption text-neutral-500 mb-6">◆ CONTACT</p>
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink max-w-3xl text-balance">
            Let&apos;s work together.
          </h1>
          <p className="text-xl lg:text-2xl font-light text-ink mt-6 max-w-2xl leading-[1.35] text-balance">
            Tell us what you&apos;re building.{" "}
            <span className="text-ink/55">
              We reply within one business day.
            </span>
          </p>
        </div>
      </section>

      {/* Primary path — book time with Phallon. A call tells us more about
          a project than any form field, so it leads the page. */}
      <BdMeetingCard
        name="Phallon Ray"
        title="Director of Business Development"
        initials="PR"
        quote="Every great brand starts with a great conversation."
        meta="30 minutes, straight on my calendar. You'll leave with a clear next step."
        bookingHref="#book"
        bookingLabel="Book a discovery call"
        eyebrow="◆ THE FASTEST WAY IN"
        image="/images/team/phallon-ray-cutout.png"
        imageAlt="Phallon Ray, Director of Business Development at Surroundings Group"
      />

      {/* Booking — a few qualifying questions gate the calendar. Answers
          email the team, then the live calendar is revealed in place. */}
      <section
        id="book"
        className="bg-[#EFE7DA] py-16 lg:py-24 px-6 lg:px-12 scroll-mt-24"
      >
        <div className="max-w-[900px] mx-auto">
          <header className="mb-8 lg:mb-10">
            <p className="caption text-neutral-500 mb-4">
              ◆ A FEW QUICK QUESTIONS
            </p>
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

      {/* Direct ways in + studio info */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-8 lg:mb-10">
            <p className="caption text-neutral-500 mb-4">
              ◆ OR REACH US DIRECTLY
            </p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              Other ways in.
            </h2>
          </header>

          <ul className="border-t border-neutral-200">
            {channels.map((c) => (
              <li key={c.label}>
                <Link
                  href={c.href}
                  className="group grid grid-cols-1 md:grid-cols-12 md:items-baseline gap-x-6 gap-y-1 py-6 lg:py-8 border-b border-neutral-200 hover:border-ink/40 transition-colors duration-300"
                >
                  <h3 className="md:col-span-4 font-sans font-extrabold text-xl lg:text-2xl text-ink group-hover:text-neutral-500 transition-colors duration-300">
                    {c.label}
                  </h3>
                  <p className="md:col-span-4 text-base lg:text-lg text-ink break-words">
                    {c.value}
                  </p>
                  <p className="md:col-span-3 text-sm text-neutral-600">
                    {c.detail}
                  </p>
                  <span className="hidden md:flex md:col-span-1 justify-end text-neutral-400 group-hover:text-ink transition-colors duration-300">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 lg:mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
            <div>
              <p className="caption text-neutral-500 mb-4">◆ STUDIO</p>
              <address className="not-italic text-base text-neutral-700 leading-relaxed">
                {site.contact.city}
              </address>
            </div>
            <div>
              <p className="caption text-neutral-500 mb-4">◆ FOLLOW</p>
              <ul className="flex gap-6">
                <li>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-neutral-700 hover:text-ink transition-colors"
                  >
                    Instagram →
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.vimeo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-neutral-700 hover:text-ink transition-colors"
                  >
                    Vimeo →
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Arrow() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
