import Link from "next/link";
import { site } from "@/lib/site";

interface HeroProps {
  /** Vimeo video ID. Defaults to site config. */
  vimeoId?: string;
  /** Optional eyebrow text above the headline */
  eyebrow?: string;
  /** Headline override (defaults to site tagline) */
  headline?: string;
  /** Subhead override (defaults to site description) */
  subhead?: string;
}

/**
 * Cinematic full-bleed video hero.
 *
 * Vimeo iframe in background mode (autoplay, muted, looping, no controls).
 * Dark overlay tint for text readability. Min-height 90vh.
 *
 * Replicates and improves on the Webflow version: no Relume wrapper bloat,
 * no Code Embed gymnastics, full responsive control.
 */
export function Hero({
  vimeoId = site.hero.vimeoId,
  eyebrow = site.wordmark,
  headline = site.tagline,
  subhead = site.description,
}: HeroProps) {
  const vimeoSrc = `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&loop=1&muted=1`;

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-ink">
      {/* Background video — scaled to always cover */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={vimeoSrc}
          title="Surroundings Group reel"
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
          style={{ transform: "translate(-50%, -50%) scale(1.5)" }}
        />
      </div>

      {/* Dark overlay tint for text readability */}
      <div className="absolute inset-0 bg-ink/40 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[90vh] px-6 lg:px-12 text-center text-canvas">
        <p className="caption tracking-[0.2em] text-gold mb-8">{eyebrow}</p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight max-w-5xl text-balance mb-8">
          {headline}
        </h1>

        <p className="text-base md:text-lg lg:text-xl max-w-2xl text-canvas/90 leading-relaxed mb-12">
          {subhead}
        </p>

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
