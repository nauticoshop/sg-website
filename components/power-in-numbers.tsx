import { CountUp } from "./count-up";

/**
 * 4-stat proof row.
 *
 * Numbers updated from the actual Surroundings Group + Nautical Network
 * 2026 media kits — these are real, not placeholders.
 */

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    value: "255M+",
    label: "Annual reach across our owned network",
  },
  {
    value: "10",
    label: "Branded channels publishing daily",
  },
  {
    value: "100%",
    label: "Creative production in-house",
  },
  {
    value: "Tampa",
    label: "Rooted, serving premium brands nationally",
  },
];

export function PowerInNumbers() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-canvas border-y border-neutral-200">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-16 lg:mb-20 max-w-4xl mx-auto">
          <p className="caption text-gold mb-6">
            BUILT ON A FOUNDATION OF PROVEN REACH
          </p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-ink text-balance">
            The numbers that separate us from everyone else pitching luxury.
          </h2>
        </header>

        <ul className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-x divide-neutral-200 border border-neutral-200 lg:border-0">
          {stats.map((stat, i) => (
            <li
              key={i}
              className="px-6 py-12 lg:px-8 lg:py-16 text-center flex flex-col justify-center min-h-[220px]"
            >
              <p className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-ink leading-none mb-5 tracking-tight">
                <CountUp value={stat.value} />
              </p>
              <p className="text-sm lg:text-base text-neutral-600 leading-snug max-w-[240px] mx-auto">
                {stat.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
