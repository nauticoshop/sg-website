/**
 * 4-stat proof row — Power Design "Power in Numbers" pattern.
 *
 * The mix is intentional: scale + reach + craft + values.
 * Not 4 scale metrics — each stat speaks to a different dimension
 * of what makes SG distinct.
 *
 * NUMBERS NEED BILLY CONFIRMATION — current values are best-guess
 * placeholders. Swap freely.
 */

interface Stat {
  /** The big number/value — kept short, scannable */
  value: string;
  /** What this stat actually means */
  label: string;
  /** Which dimension of differentiation this proves */
  dimension: "reach" | "scale" | "craft" | "values";
}

const stats: Stat[] = [
  {
    value: "180M+",
    label: "Annual viewers across Nautical Network",
    dimension: "reach",
  },
  {
    value: "8",
    label: "Owned social brands publishing daily",
    dimension: "scale",
  },
  {
    value: "100%",
    label: "Creative production in-house",
    dimension: "craft",
  },
  {
    value: "Tampa",
    label: "Rooted, building for premium markets nationwide",
    dimension: "values",
  },
];

export function PowerInNumbers() {
  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 bg-canvas border-y border-neutral-200">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-12 lg:mb-16">
          <p className="caption text-gold mb-4">BUILT ON A FOUNDATION OF PROVEN REACH</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-ink text-balance max-w-3xl mx-auto">
            The numbers that separate us from everyone else pitching luxury.
          </h2>
        </header>

        <ul className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-neutral-200 border border-neutral-200 lg:border-0">
          {stats.map((stat, i) => (
            <li
              key={i}
              className="px-6 py-10 lg:px-8 lg:py-12 text-center flex flex-col justify-center min-h-[180px]"
            >
              <p className="font-serif text-5xl md:text-6xl lg:text-7xl text-ink leading-none mb-4 tracking-tight">
                {stat.value}
              </p>
              <p className="text-sm lg:text-base text-neutral-600 leading-snug max-w-[220px] mx-auto">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
