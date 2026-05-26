import Image from "next/image";
import Link from "next/link";
import { verticals, type Vertical } from "@/lib/verticals";

/**
 * Industries-we-serve — photo-card layout.
 *
 * Each vertical is an image-driven card with full-bleed photo,
 * gradient overlay for legibility, and editorial caption stack.
 * Tier 1 = 4-up portrait cards (4:5). Tier 2 = 3-up portrait cards.
 *
 * Photos are optional — if `image` is missing from lib/verticals.ts,
 * a dark placeholder with the vertical name renders. To wire a real
 * photo: drop a WebP at /public/images/verticals/{slug}.webp and add
 * `image: "/images/verticals/{slug}.webp"` to the vertical entry.
 */
export function VerticalsGrid() {
  const tier1 = verticals.filter((v) => v.tier === 1);
  const tier2 = verticals.filter((v) => v.tier === 2);

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-14 lg:mb-20 max-w-4xl mx-auto">
          <p className="caption text-gold-deep mb-6">INDUSTRIES WE SERVE</p>
          <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-ink mb-6 text-balance">
            Vertical-focused. Never generalist.
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Seven luxury categories. The kind of category fluency generalist
            agencies can&apos;t replicate.
          </p>
        </header>

        {/* Tier 1 — 4 featured verticals */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-4 lg:mb-6">
          {tier1.map((vertical) => (
            <VerticalCard key={vertical.slug} vertical={vertical} />
          ))}
        </ul>

        {/* Tier 2 — 3 additional verticals */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
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
        {/* Image (or dark placeholder) */}
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

        {/* Gradient overlay for legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/10 group-hover:from-ink group-hover:via-ink/50 transition-all duration-500"
          aria-hidden
        />

        {/* Gold corner accent */}
        <div
          className="absolute top-0 right-0 w-16 h-px bg-gold/60"
          aria-hidden
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 text-canvas">
          <h3 className="font-sans font-extrabold text-2xl lg:text-3xl leading-[1.1] text-balance mb-3 group-hover:text-gold transition-colors duration-300">
            {vertical.name}
          </h3>
          <p className="text-sm lg:text-base text-canvas/80 leading-snug mb-4 line-clamp-2">
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
