import Link from "next/link";

/**
 * About snippet for the homepage — short positioning statement.
 *
 * Long-form story + team grid + NN spotlight live on /about. This is
 * the homepage hit: who we are in a few sentences, then directs to
 * the deeper page.
 *
 * Copy informed by the SG 2026 media kit positioning ("connects luxury
 * brands together through content and influence with our unique
 * multi-channel global online reach").
 */
export function AboutSummary() {
  return (
    <section className="bg-canvas py-24 lg:py-36 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="caption text-gold-deep mb-6">ABOUT</p>
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink text-balance">
              More than a media company.
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <p className="text-xl lg:text-2xl text-ink leading-snug font-medium text-balance">
              We create cinematic content and strategic marketing systems
              designed to elevate luxury brands and drive attention where it
              matters most.
            </p>
            <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
              From real estate developments to private aviation and hospitality
              experiences, our work blends creative direction with
              performance-focused marketing — backed by an owned-media network
              that reaches the audiences our clients want most.
            </p>
            <div className="pt-4">
              <Link
                href="/about"
                className="caption inline-flex items-center gap-2 text-ink hover:text-gold-deep transition-colors duration-300"
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
