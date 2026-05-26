import { testimonials } from "@/lib/testimonials";

/**
 * Client testimonials — 3-card grid, editorial pull-quote treatment.
 *
 * Sits near the bottom of the homepage before the closing CTA.
 * Quotes are PLACEHOLDER content derived from media kit outcomes —
 * to be replaced with real permissioned quotes before launch.
 *
 * Future upgrade: swap text quotes for video testimonials (each card
 * becomes a Vimeo embed thumbnail that expands to play on click).
 */
export function Testimonials() {
  return (
    <section className="bg-canvas py-24 lg:py-36 px-6 lg:px-12 border-t border-neutral-200">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-16 lg:mb-20 max-w-3xl mx-auto">
          <p className="caption text-gold mb-6">WHAT CLIENTS SAY</p>
          <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-ink text-balance">
            Work that moves the metric that matters.
          </h2>
        </header>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <li
              key={t.slug}
              className="bg-canvas border border-neutral-200 p-8 lg:p-10 flex flex-col h-full"
            >
              {/* Gold quote mark */}
              <svg
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
                aria-hidden
                className="text-gold mb-6"
              >
                <path
                  d="M0 24V14C0 6.27 4.5 0.7 13 0L13.5 4C7.8 4.5 5 8 5 12H8C12.5 12 14 13.5 14 17V19C14 22 12 24 8.5 24H0ZM18 24V14C18 6.27 22.5 0.7 31 0L31.5 4C25.8 4.5 23 8 23 12H26C30.5 12 32 13.5 32 17V19C32 22 30 24 26.5 24H18Z"
                  fill="currentColor"
                />
              </svg>

              <p
                className="text-lg lg:text-xl text-ink leading-snug mb-8 flex-1 font-medium text-balance"
                dangerouslySetInnerHTML={{ __html: `"${t.quote}"` }}
              />

              <div className="border-t border-neutral-200 pt-5">
                <p className="font-sans font-extrabold text-base text-ink">
                  {t.name}
                </p>
                <p className="text-sm text-neutral-600 mt-1">{t.title}</p>
                <p className="caption text-gold mt-3">{t.vertical}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
