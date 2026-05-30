import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "Nautical Network",
  description:
    "Surroundings Group's owned-media ecosystem. Eight social brands reaching 180M+ marine enthusiasts a year. The unfair distribution advantage we extend to every client.",
};

export default function NauticalNetworkPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="SISTER BRAND"
        title="Nautical Network. Owned distribution at scale."
        subhead="Eight social brands, 180M+ annual viewers, the largest global multi-platform boating outlet. Built from a single Instagram. Available to every Surroundings Group client."
        tone="dark"
      />

      {/* What it is */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <p className="caption text-gold-deep lg:col-span-1">WHAT IT IS</p>
            <div className="lg:col-span-2 space-y-6 text-base lg:text-lg text-neutral-700 leading-relaxed">
              <p>
                Nautical Network is the largest multi-platform editorial
                and social ecosystem in premium marine. It started as a
                single Instagram account, grew into eight branded channels,
                and now publishes daily across every major platform. It
                reaches the engaged audience yacht builders, charter
                operators, marinas, and marine brands actually want to
                reach.
              </p>
              <p>
                For Surroundings Group clients, that audience becomes a
                distribution channel. Most agencies have to buy reach.
                We built ours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-neutral-50 py-16 lg:py-24 px-6 lg:px-12 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            <StatBlock value="180M+" label="Annual viewers across the network" />
            <StatBlock value="8" label="Owned social brands publishing daily" />
            <StatBlock
              value="#1"
              label="Largest global multi-platform boating outlet"
            />
          </ul>
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="caption text-gold-deep mb-4">WHY IT MATTERS</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink mb-6 text-balance">
                Owned reach changes the math.
              </h2>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                When the distribution channel is owned, every dollar of
                creative investment compounds. The film you commissioned
                for a boat launch isn&apos;t just a hero asset on your
                site. It runs across an editorial ecosystem reaching the
                exact audience that buys what you sell.
              </p>
            </div>
            <div>
              <p className="caption text-gold-deep mb-4">HOW WE EXTEND IT</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink mb-6 text-balance">
                Distribution as a service.
              </h2>
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                Marine clients get Nautical Network reach baked into their
                Growth engagements. For the other premium categories we
                serve, the model is the same. We&apos;re building owned
                media properties in each one, so every client eventually
                gets the same distribution leverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* External link */}
      <section className="bg-ink text-canvas py-16 lg:py-20 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="caption text-gold-deep mb-6">VISIT THE NETWORK</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight mb-8 text-balance max-w-3xl mx-auto">
            See what we publish daily.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://nauticalnetwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas transition-colors duration-300"
            >
              nauticalnetwork.com
            </Link>
            <Link
              href="https://instagram.com/nauticalnetwork"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-canvas/40 text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas hover:text-ink hover:border-canvas transition-colors duration-300"
            >
              Follow @nauticalnetwork
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <li className="px-6 py-10 md:py-12 text-center">
      <p className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl text-ink leading-none mb-4 tracking-tight">
        {value}
      </p>
      <p className="text-sm lg:text-base text-neutral-600 leading-snug max-w-[260px] mx-auto">
        {label}
      </p>
    </li>
  );
}
