import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Surroundings Group is a vertical-fluent creative agency for premium brands. Marine, real estate, hospitality, aviation, and the categories around them. Built in-house. Backed by an owned-media network.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="ABOUT"
        title="At home in the world's premium markets."
        subhead="Vertical-fluent. Fully in-house. Built for premium markets."
      />

      {/* Story */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <p className="caption text-gold-deep lg:col-span-1">OUR STORY</p>
            <div className="lg:col-span-2 space-y-6 text-base lg:text-lg text-neutral-700 leading-relaxed">
              <p>
                Surroundings Group started with a simple observation. Most
                agencies pitch the same playbook to a watchmaker, a $50M
                real estate development, and a private aviation operator,
                then wonder why none of the campaigns land. We don&apos;t.
              </p>
              <p>
                We built a different model. Vertical-fluent specialists,
                fully in-house production, and an owned-media network at
                a scale no other agency our size has. The proof is in
                the sister brand we built: Nautical Network reaches more
                than 180 million marine enthusiasts a year, and that
                distribution becomes part of every marine engagement.
              </p>
              <p>
                Today we work across the premium categories that demand
                the same discipline. Marine. Real estate and development.
                Multifamily. Private aviation. Hospitality and experiences.
                Resorts and travel. Exotic automotive. Luxury goods. Each
                one gets specialists who&apos;ve spent careers in the
                category, not generalists with a credential.
              </p>
              <p>
                Our clients borrow from each other across the verticals.
                A yacht from our marine roster anchors a real estate
                launch film. A car reveal lands at a hospitality
                activation. A private aviation terminal hosts a luxury
                goods drop. Then every engagement is amplified through
                an owned-media network of ten editorial channels reaching
                255M+ affluent viewers a year. Most agencies buy
                attention. We built ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team photo — full-width editorial moment */}
      <section className="bg-canvas pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <Image
            src="/images/team/team-photo.jpg"
            alt="The Surroundings Group team"
            width={1800}
            height={896}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Team preview */}
      <section className="bg-neutral-50 py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="caption text-gold-deep mb-4">THE TEAM</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
                The team behind the work.
              </h2>
            </div>
            <Link
              href="/about/team"
              className="caption inline-flex items-center gap-2 text-ink hover:text-gold-deep transition-colors shrink-0"
            >
              Meet the full team
              <Arrow />
            </Link>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {team.slice(0, 3).map((m) => (
              <li
                key={m.slug}
                className="bg-canvas border border-neutral-200 p-6 lg:p-8"
              >
                <div className="relative aspect-[4/5] bg-ink mb-6 overflow-hidden">
                  {m.photo && (
                    <Image
                      src={m.photo}
                      alt={`${m.name} — ${m.role}`}
                      fill
                      sizes="(min-width: 1024px) 350px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top"
                    />
                  )}
                </div>
                <p className="caption text-gold-deep mb-2">{m.department}</p>
                <h3 className="font-sans font-extrabold text-2xl text-ink mb-2">
                  {m.name}
                </h3>
                <p className="text-sm text-neutral-600 mb-4">{m.role}</p>
                {m.bio && (
                  <p className="text-sm text-neutral-700 leading-relaxed line-clamp-3">
                    {m.bio}
                  </p>
                )}
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
                Nautical Network. Owned distribution at scale.
              </h2>
              <p className="text-base lg:text-lg text-canvas/70 leading-relaxed mb-8">
                Built from a single Instagram into eight social brands
                reaching 180M+ marine enthusiasts a year. It&apos;s proof
                of capability and an unfair distribution advantage we
                extend to every client we work with.
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
