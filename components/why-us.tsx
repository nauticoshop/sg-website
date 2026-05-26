import Link from "next/link";
import { GlobalReachMap } from "./global-reach-map";

/**
 * Combined "Why Surroundings Group" section.
 *
 * Replaces four separate sections (AboutSummary, PowerInNumbers, Process,
 * GlobalReach) with one tighter narrative:
 *   1. Global reach map (visual proof — Tampa-rooted, world-reaching)
 *   2. What sets us apart (positioning copy)
 *   3. Why it matters (the implication for clients)
 *   4. Proven results (3 condensed stats)
 *   5. Process (4 chapter strip, single line each)
 *
 * Dark mode throughout. One scroll, one story.
 */
export function WhyUs() {
  return (
    <section className="bg-ink text-canvas py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        {/* Top header */}
        <header className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
          <p className="caption text-gold mb-6">WHY SURROUNDINGS GROUP</p>
          <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-balance">
            From Tampa, reaching the world.
          </h2>
        </header>

        {/* 1. Map — visual proof */}
        <div className="bg-canvas/[0.03] p-6 lg:p-10 border border-canvas/10 mb-20 lg:mb-28">
          <GlobalReachMap />
        </div>

        {/* 2 + 3. What sets us apart + Why it matters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-28 max-w-6xl mx-auto">
          <div>
            <p className="caption text-gold mb-4">WHAT SETS US APART</p>
            <h3 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight mb-6 text-balance">
              More than a media company.
            </h3>
            <p className="text-base lg:text-lg text-canvas/75 leading-relaxed">
              We build cinematic content and the marketing systems behind it —
              category-fluent teams working in-house, no outsourced juniors,
              no handoffs between strategy and production.
            </p>
          </div>
          <div>
            <p className="caption text-gold mb-4">WHY IT MATTERS</p>
            <h3 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.08] tracking-tight mb-6 text-balance">
              Owned audience changes the math.
            </h3>
            <p className="text-base lg:text-lg text-canvas/75 leading-relaxed">
              Our network reaches the buyers our clients want before any
              dollar of paid media moves. Creative compounds because the
              distribution channel is already there.
            </p>
          </div>
        </div>

        {/* 4. Proven results — condensed 3-stat row */}
        <div className="border-y border-canvas/15 py-12 lg:py-16 mb-20 lg:mb-28">
          <p className="caption text-gold mb-10 text-center">PROVEN RESULTS</p>
          <ul className="grid grid-cols-3 divide-x divide-canvas/15">
            <Stat value="255M+" label="Annual network reach" />
            <Stat value="100%" label="In-house production" />
            <Stat value="10" label="Owned media channels" />
          </ul>
        </div>

        {/* 5. Process — 4-chapter strip */}
        <div className="max-w-6xl mx-auto">
          <p className="caption text-gold mb-8 text-center">HOW WE WORK</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-canvas/15 border border-canvas/15">
            <ProcessStep
              num="01"
              name="Strategy"
              copy="Learn the brand, build the plan."
            />
            <ProcessStep
              num="02"
              name="Production"
              copy="In-house team, no handoffs."
            />
            <ProcessStep
              num="03"
              name="Launch"
              copy="Paid, owned, and earned in concert."
            />
            <ProcessStep
              num="04"
              name="Growth"
              copy="Measure, refine, compound."
            />
          </ol>

          <div className="text-center mt-10">
            <Link
              href="/about"
              className="caption inline-flex items-center gap-2 text-canvas hover:text-gold transition-colors duration-300"
            >
              Read the full story
              <svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden
              >
                <path
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <li className="text-center px-4">
      <p className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl text-canvas leading-none mb-3 tracking-tight">
        {value}
      </p>
      <p className="text-xs lg:text-sm text-canvas/60 leading-snug max-w-[200px] mx-auto">
        {label}
      </p>
    </li>
  );
}

function ProcessStep({
  num,
  name,
  copy,
}: {
  num: string;
  name: string;
  copy: string;
}) {
  return (
    <li className="bg-ink p-6 lg:p-7">
      <p className="caption text-gold mb-3">{num}</p>
      <h4 className="font-sans font-extrabold text-xl lg:text-2xl leading-none tracking-tight mb-2">
        {name}
      </h4>
      <p className="text-sm text-canvas/65 leading-snug">{copy}</p>
    </li>
  );
}
