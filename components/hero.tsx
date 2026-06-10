import Image from "next/image";
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
  pillars = ["Full-service", "Vertical-fluent", "Powerful network"],
}: HeroProps) {
  // Unlisted videos need their `h=` hash in the player URL; public ones don't.
  const hash = site.hero.vimeoHash ? `h=${site.hero.vimeoHash}&` : "";
  const vimeoSrc = `https://player.vimeo.com/video/${vimeoId}?${hash}background=1&autoplay=1&loop=1&muted=1`;

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

      {/* Overlay — light wash up top so the video stays vivid, plus a
          bottom scrim so the text cluster reads on bright footage */}
      <div className="absolute inset-0 bg-ink/20 z-10" />
      <div
        className="absolute inset-x-0 bottom-0 h-[55vh] bg-gradient-to-t from-ink/85 via-ink/40 to-transparent z-10"
        aria-hidden
      />

      {/* Content — anchored low so the video does the talking.
          The tagline stays as an sr-only h1 for SEO and screen readers. */}
      <div className="relative z-20 flex flex-col items-center justify-end min-h-screen px-6 lg:px-12 pb-24 lg:pb-28 text-center text-canvas pt-20">
        <h1 className="sr-only">{headline}</h1>

        {/* S mark — the source PNG carries generous transparent padding,
            so it renders oversized with negative margins to compensate */}
        <Image
          src="/images/brand/s-mark-white.png"
          alt={eyebrow}
          width={500}
          height={500}
          priority
          className="h-28 w-28 lg:h-32 lg:w-32 object-contain -mt-7 lg:-mt-8 -mb-1 [filter:drop-shadow(0_2px_14px_rgba(20,18,16,0.65))]"
        />

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
