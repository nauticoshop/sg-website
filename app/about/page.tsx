import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Surroundings Group is a Tampa-based premium creative agency serving luxury verticals — marine, real estate, multifamily, aviation, and more. Sister brand to Nautical Network.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="ABOUT"
        title="A premium creative agency for premium brands."
        subhead="Tampa-based. Vertical-focused. Built around the discipline that luxury markets actually require."
      />

      {/* Story */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <p className="caption text-gold lg:col-span-1">OUR STORY</p>
            <div className="lg:col-span-2 space-y-6 text-base lg:text-lg text-neutral-700 leading-relaxed">
              <p>
                Surroundings Group exists because luxury brands deserve more
                than generalist marketing. Most agencies pitch the same
                playbook to a luxury watch brand, a $50M real estate
                development, and a private aviation operator — and wonder
                why none of the campaigns land.
              </p>
              <p>
                We built a different model: vertical-focused expertise,
                in-house production, and owned media distribution at a
                scale no other agency at our size has. The work that
                proves it — Nautical Network, our sister brand — reaches
                more than 180 million luxury marine enthusiasts every year.
              </p>
              <p>
                Today we serve seven luxury categories with the same
                discipline: marine, luxury real estate development,
                multifamily, private aviation, resorts and travel, exotic
                automotive, and luxury goods. Each one gets specialists,
                not generalists.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section className="bg-neutral-50 py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="caption text-gold mb-4">THE TEAM</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
                Senior people. In-house. Always.
              </h2>
            </div>
            <Link
              href="/about/team"
              className="caption inline-flex items-center gap-2 text-ink hover:text-gold transition-colors shrink-0"
            >
              Meet the full team
              <Arrow />
            </Link>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {team.slice(0, 3).map((m) => (
              <li key={m.slug} className="bg-canvas border border-neutral-200 p-6 lg:p-8">
                <div className="aspect-[4/5] bg-ink mb-6" aria-hidden />
                <p className="caption text-gold mb-2">{m.department}</p>
                <h3 className="font-sans font-extrabold text-2xl text-ink mb-2">
                  {m.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-4">{m.role}</p>
                <p className="text-sm text-neutral-700 leading-relaxed line-clamp-3">
                  {m.bio}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Nautical Network spotlight */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <p className="caption text-gold mb-6">SISTER BRAND</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-6 text-balance">
                Nautical Network — owned distribution at scale.
              </h2>
              <p className="text-base lg:text-lg text-canvas/70 leading-relaxed mb-8">
                Built from a single Instagram into eight social brands
                reaching 180M+ luxury marine enthusiasts annually. It&apos;s
                proof of capability — and an unfair distribution advantage
                we extend to every client we work with.
              </p>
              <Link
                href="/about/nautical-network"
                className="caption inline-flex items-center gap-2 text-canvas hover:text-gold transition-colors"
              >
                See how it works
                <Arrow />
              </Link>
            </div>
            <div className="lg:col-span-5">
              <ul className="space-y-6">
                <li className="border-t border-canvas/15 pt-4">
                  <p className="font-sans font-extrabold text-4xl lg:text-5xl leading-none">
                    180M+
                  </p>
                  <p className="text-sm text-canvas/60 mt-2">
                    Annual viewers across the network
                  </p>
                </li>
                <li className="border-t border-canvas/15 pt-4">
                  <p className="font-sans font-extrabold text-4xl lg:text-5xl leading-none">
                    8
                  </p>
                  <p className="text-sm text-canvas/60 mt-2">
                    Owned social brands publishing daily
                  </p>
                </li>
                <li className="border-t border-canvas/15 pt-4">
                  <p className="font-sans font-extrabold text-4xl lg:text-5xl leading-none">
                    #1
                  </p>
                  <p className="text-sm text-canvas/60 mt-2">
                    Largest global multi-platform boating outlet
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
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
