/**
 * Outcomes section — replaces the prior testimonial quote cards.
 *
 * Per Billy: synthesized quotes felt fake. This section now shows
 * factual client outcomes (real numbers, real client names, no
 * fabricated attribution). Two cards for now (NOVEL Beach Park
 * and Ryan Hughes Design — both verified outcomes). A third card
 * gets added when there's a verified number for another client.
 *
 * Dark section, gold accent on the stat numbers, centered on
 * desktop since we only have 2 cards.
 */

interface Outcome {
  slug: string;
  vertical: string;
  /** The hero number (e.g. "12% → 52%" or "$7M+") */
  value: string;
  /** One-line description of what the number represents */
  label: string;
  /** Client name */
  client: string;
}

const outcomes: Outcome[] = [
  {
    slug: "novel-beach-park",
    vertical: "MULTIFAMILY",
    value: "12% → 52%",
    label: "Occupancy in two months",
    client: "NOVEL Beach Park",
  },
  {
    slug: "ryan-hughes-design",
    vertical: "REAL ESTATE & DEVELOPMENT",
    value: "$7M+",
    label: "In client upsells driven by content + social",
    client: "Ryan Hughes Design",
  },
];

export function Testimonials() {
  return (
    <section className="bg-ink text-canvas py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
          <p className="caption text-gold mb-6">OUTCOMES</p>
          <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-canvas text-balance">
            Work that moved the metric.
          </h2>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {outcomes.map((o) => (
            <li
              key={o.slug}
              className="bg-neutral-900 border border-canvas/10 p-8 lg:p-12 flex flex-col h-full"
            >
              <p className="caption text-gold mb-8">{o.vertical}</p>

              <p className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl text-canvas leading-none mb-5 tracking-tight">
                {o.value}
              </p>

              <p className="text-base lg:text-lg text-canvas/80 leading-snug mb-8 flex-1">
                {o.label}
              </p>

              <p className="font-sans font-extrabold text-base text-canvas border-t border-canvas/15 pt-5">
                {o.client}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
