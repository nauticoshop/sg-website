import Link from "next/link";

/**
 * The Nautical Network proof section. This is Surroundings Group's
 * single biggest differentiator — owned media reach that no other agency
 * at this scale has. Should feel like a moment, not just a stat block.
 */
export function NauticalNetworkProof() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy column */}
          <div className="lg:col-span-7">
            <p className="caption text-gold mb-6">OWNED DISTRIBUTION</p>
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink mb-8 text-balance">
              We don&apos;t just make content. We have the audience.
            </h2>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mb-6">
              Nautical Network is Surroundings Group&apos;s owned-media
              ecosystem — eight social brands built from a single Instagram,
              now reaching the largest engaged audience in luxury marine and
              yachting.
            </p>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mb-8">
              When your campaign needs distribution, we don&apos;t just buy it.
              We own it.
            </p>
            <Link
              href="/about/nautical-network"
              className="caption inline-flex items-center gap-2 text-ink hover:text-gold transition-colors duration-300"
            >
              See how it works
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

          {/* Stats column */}
          <div className="lg:col-span-5">
            <ul className="space-y-8">
              <StatBlock value="180M+" label="Annual viewers across the network" />
              <StatBlock value="8" label="Social brands under one publishing system" />
              <StatBlock
                value="#1"
                label="Largest global multi-platform boating & yachting outlet"
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <li className="border-t border-neutral-200 pt-6">
      <p className="font-sans font-extrabold text-5xl lg:text-6xl text-ink leading-none mb-3 tracking-tight">
        {value}
      </p>
      <p className="text-sm lg:text-base text-neutral-600 leading-snug">
        {label}
      </p>
    </li>
  );
}
