import Link from "next/link";
import { site } from "@/lib/site";

interface HeroProps {
  /** Vimeo video ID. Defaults to site config. */
  vimeoId?: string;
  /** Optional eyebrow text above the headline */
  eyebrow?: string;
  /** Headline override (defaults to site tagline) */
  headline?: string;
  /** Three-pillar positioning under the headline, e.g. "Full-Service | Vertical-focused | Creatively Connected" */
  pillars?: string[];
}

/**
 * Cinematic full-bleed video hero.
 *
 * Vimeo iframe in background mode (autoplay, muted, looping, no controls).
 * Uses the "always-cover" CSS pattern so the video fills the section
 * regardless of viewport aspect ratio.
 *
 * Three-pillar subhead replaces a longer description — quicker to scan,
 * sharper premium positioning (carried forward from the current SG site).
 */
export function Hero({
  vimeoId = site.hero.vimeoId,
  eyebrow = site.wordmark,
  headline = site.tagline,
  pillars = ["Full-Service", "Vertical-focused", "Creatively Connected"],
}: HeroProps) {
  const vimeoSrc = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1`;

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-ink">
      {/* Background video — sized to always cover the section */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={vimeoSrc}
          title="Surroundings Group reel"
          allow="autoplay; fullscreen; picture-in-picture"
          aria-hidden="true"
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "max(100%, calc(100vh * 16 / 9))",
            height: "max(100%, calc(100vw * 9 / 16))",
            minWidth: "100%",
            minHeight: "100%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            border: 0,
          }}
        />
      </div>

      {/* Dark overlay tint */}
      <div className="absolute inset-0 bg-ink/45 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 lg:px-12 text-center text-canvas pt-20">
        <p className="caption tracking-[0.2em] text-gold mb-8">{eyebrow}</p>

        <h1 className="font-sans font-extrabold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-5xl text-balance mb-10">
          {headline}
        </h1>

        {/* Three-pillar positioning */}
        <p className="caption tracking-[0.2em] text-gold mb-12 flex items-center flex-wrap justify-center gap-x-3 gap-y-1">
          {pillars.map((pillar, i) => (
            <span key={pillar} className="inline-flex items-center gap-3">
              {pillar}
              {i < pillars.length - 1 && (
                <span className="text-gold/40" aria-hidden>
                  |
                </span>
              )}
            </span>
          ))}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={site.cta.primary.href}
            className="bg-gold text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas transition-colors duration-300"
          >
            {site.cta.primary.label}
          </Link>
          <Link
            href={site.cta.secondary.href}
            className="border border-canvas text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas hover:text-ink transition-colors duration-300"
          >
            {site.cta.secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
