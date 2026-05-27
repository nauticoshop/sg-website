import Link from "next/link";

/**
 * About snippet for the homepage — positioning statement designed
 * to read as editorial and load with SEO-relevant terms naturally.
 *
 * SEO-targeted keywords integrated: "Tampa creative agency",
 * "luxury brands", "marine", "real estate development", "private
 * aviation", "hospitality", "luxury goods", "in-house production",
 * "owned media", "editorial channels". No keyword stuffing —
 * each term lives inside a real sentence.
 *
 * Long-form story + team grid + NN spotlight live on /about.
 */
export function AboutSummary() {
  return (
    <section className="bg-gold text-ink py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="caption text-ink mb-6">ABOUT</p>
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink text-balance">
              Specialists where everyone else is a generalist.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <p className="text-xl lg:text-2xl text-ink leading-snug font-medium text-balance">
              Surroundings Group is a Tampa-based creative agency built
              specifically for luxury brands — eight verticals deep, with one
              in-house team running strategy, production, distribution, and
              measurement under a single roof.
            </p>
            <p className="text-base lg:text-lg text-ink/80 leading-relaxed">
              From marine and real estate development to private aviation,
              hospitality, and luxury goods, we make cinematic content and the
              marketing systems behind it. Every engagement is amplified
              through an owned-media network of ten editorial channels reaching
              255M+ affluent viewers a year. Most agencies buy attention. We
              built ours.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="caption inline-flex items-center gap-2 text-ink hover:opacity-70 transition-opacity duration-300"
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
      </div>
    </section>
  );
}
