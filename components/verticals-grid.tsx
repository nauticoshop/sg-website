import Link from "next/link";
import { verticals } from "@/lib/verticals";

/**
 * Industries-we-serve section. 7 verticals in a 4+3 editorial grid.
 * Card style: deep navy backgrounds (different visual language from services
 * to give the page rhythm) with vertical name in serif + tagline + arrow.
 */
export function VerticalsGrid() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-neutral-900 text-canvas">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
          <p className="caption text-gold mb-6">INDUSTRIES WE SERVE</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6 text-balance">
            Vertical-focused. Never generalist.
          </h2>
          <p className="text-base lg:text-lg text-canvas/70 leading-relaxed">
            We work deeply in seven luxury categories — building the kind of
            category expertise generalist agencies can&apos;t replicate.
          </p>
        </header>

        {/* 4+3 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-canvas/10">
          {verticals.map((vertical) => (
            <VerticalCard key={vertical.slug} vertical={vertical} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VerticalCard({ vertical }: { vertical: (typeof verticals)[number] }) {
  return (
    <Link
      href={vertical.href}
      className="group block bg-neutral-900 hover:bg-deep transition-colors duration-500 p-8 lg:p-10 min-h-[260px] flex flex-col justify-between"
    >
      <div>
        {vertical.tier === 1 && (
          <span className="caption text-gold/80 mb-4 inline-block">
            FEATURED
          </span>
        )}
        <h3 className="font-serif text-2xl lg:text-3xl leading-tight text-balance mb-3 group-hover:text-gold transition-colors duration-300">
          {vertical.name}
        </h3>
        <p className="text-sm lg:text-base text-canvas/70 leading-relaxed">
          {vertical.tagline}
        </p>
      </div>

      <span className="caption mt-6 inline-flex items-center gap-2 text-canvas group-hover:text-gold transition-colors duration-300">
        Explore
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
          <path
            d="M1 5h12m0 0L9 1m4 4L9 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </span>
    </Link>
  );
}
