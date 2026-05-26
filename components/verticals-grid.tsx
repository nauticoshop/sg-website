import Link from "next/link";
import { verticals } from "@/lib/verticals";

/**
 * Industries-we-serve section — clean tiered layout, no empty cells.
 *
 * Per Billy's feedback: removed the empty 8th cell from the previous
 * 4-col grid. Now uses an explicit two-row layout that reflects the
 * tier structure:
 *
 *   Tier 1 (4 featured verticals): 4-col row, FEATURED label
 *   Tier 2 (3 additional): 3-col row, cleaner cards
 *
 * Larger typography throughout per feedback.
 */
export function VerticalsGrid() {
  const tier1 = verticals.filter((v) => v.tier === 1);
  const tier2 = verticals.filter((v) => v.tier === 2);

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 bg-neutral-900 text-canvas">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-16 lg:mb-24 max-w-4xl mx-auto">
          <p className="caption text-gold mb-6">INDUSTRIES WE SERVE</p>
          <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight mb-8 text-balance">
            Vertical-focused. Never generalist.
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-canvas/70 leading-relaxed max-w-3xl mx-auto">
            We work deeply in seven luxury categories — building the kind of
            category expertise generalist agencies can&apos;t replicate.
          </p>
        </header>

        {/* Tier 1 — 4 featured verticals */}
        <div className="mb-px">
          <p className="caption text-gold/70 mb-6">FEATURED VERTICALS</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-canvas/10">
            {tier1.map((vertical) => (
              <VerticalCard key={vertical.slug} vertical={vertical} featured />
            ))}
          </ul>
        </div>

        {/* Tier 2 — 3 additional verticals */}
        <div className="mt-px">
          <p className="caption text-gold/70 mb-6 mt-12">ALSO SERVING</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-canvas/10">
            {tier2.map((vertical) => (
              <VerticalCard key={vertical.slug} vertical={vertical} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function VerticalCard({
  vertical,
  featured = false,
}: {
  vertical: (typeof verticals)[number];
  featured?: boolean;
}) {
  return (
    <li>
      <Link
        href={vertical.href}
        className="group block bg-neutral-900 hover:bg-deep transition-colors duration-500 p-8 lg:p-10 min-h-[280px] lg:min-h-[320px] flex flex-col justify-between h-full"
      >
        <div>
          <h3 className="font-sans font-extrabold text-2xl lg:text-3xl xl:text-4xl leading-[1.1] text-balance mb-4 group-hover:text-gold transition-colors duration-300">
            {vertical.name}
          </h3>
          <p className="text-base lg:text-lg text-canvas/70 leading-relaxed">
            {vertical.tagline}
          </p>
        </div>

        <span className="caption mt-8 inline-flex items-center gap-2 text-canvas group-hover:text-gold transition-colors duration-300">
          {featured ? "Explore vertical" : "Explore"}
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
      </Link>
    </li>
  );
}
