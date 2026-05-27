import Image from "next/image";
import Link from "next/link";
import { verticals, type Vertical } from "@/lib/verticals";

/**
 * Industries-we-serve — photo-driven card grid.
 *
 * Each vertical is a full-bleed photo with gradient overlay; the
 * vertical name + tagline + "Explore" CTA sit on top of the gradient.
 * Tier 1 verticals render in a 4-up grid, Tier 2 in a 3-up grid.
 *
 * Cards use aspect-[4/5] portrait to feel magazine-cover-ish.
 * Section background is bg-canvas so the photos pop against light
 * (the cards themselves carry the dark imagery).
 *
 * If a vertical is missing its `image` field, a dark placeholder with
 * the vertical name renders instead — no breakage.
 */
export function VerticalsGrid() {
  const tier1 = verticals.filter((v) => v.tier === 1);
  const tier2 = verticals.filter((v) => v.tier === 2);

  return (
    <section className="pt-10 lg:pt-14 pb-16 lg:pb-20 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-10 lg:mb-14 max-w-3xl mx-auto">
          <p className="caption text-gold-deep mb-5">INDUSTRIES WE SERVE</p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-ink mb-5 text-balance">
            Vertical-focused.
          </h2>
          <p className="text-base lg:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            We work deeply in these luxury verticals. Our clients collaborate
            across them. That&apos;s the difference.
          </p>
        </header>

        {/* Tier 1 — 4 featured verticals */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-4 lg:mb-5">
          {tier1.map((vertical) => (
            <VerticalCard key={vertical.slug} vertical={vertical} />
          ))}
        </ul>

        {/* Tier 2 — 4 additional verticals */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {tier2.map((vertical) => (
            <VerticalCard key={vertical.slug} vertical={vertical} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function VerticalCard({ vertical }: { vertical: Vertical }) {
  return (
    <li>
      <Link
        href={vertical.href}
        className="group block relative overflow-hidden bg-ink aspect-[4/5]"
      >
        {/* Photo (or dark placeholder) */}
        {vertical.image ? (
          <Image
            src={vertical.image}
            alt={vertical.imageAlt ?? vertical.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <span className="font-sans font-extrabold text-3xl lg:text-4xl text-canvas/15 text-center leading-tight">
              {vertical.name}
            </span>
          </div>
        )}

        {/* Gradient overlay for caption legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5 group-hover:from-ink group-hover:via-ink/55 transition-all duration-500"
          aria-hidden
        />

        {/* Gold corner accent */}
        <div
          className="absolute top-0 right-0 w-16 h-px bg-gold/70"
          aria-hidden
        />

        {/* Caption stack — bottom-anchored */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-7 text-canvas">
          <h3 className="font-sans font-extrabold text-2xl lg:text-3xl leading-[1.1] text-balance mb-3 group-hover:text-gold transition-colors duration-300">
            {vertical.name}
          </h3>
          <p className="text-sm lg:text-base text-canvas/85 leading-snug mb-4 line-clamp-2">
            {vertical.tagline}
          </p>
          <span className="caption inline-flex items-center gap-2 text-canvas/90 group-hover:text-gold transition-colors duration-300">
            Explore
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
          </span>
        </div>
      </Link>
    </li>
  );
}
