"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { verticals, type Vertical } from "@/lib/verticals";

/**
 * Verticals — pinned, interactive, cinematic.
 *
 * Replaces both VerticalsJourneyScroll and VerticalsGrid. One sticky
 * section that walks the visitor through all eight verticals.
 *
 *   Background : full-bleed cinematic imagery for the active vertical
 *                that cross-fades + scales subtly as you scroll. This
 *                slot is where a generated Higgsfield video can drop
 *                in later — same scroll plumbing, swap the asset.
 *
 *   Foreground : ONE vertical CARD floats centered in the viewport
 *                at any moment. Cards match the magazine-cover
 *                aesthetic of the static grid: full-bleed photo,
 *                gold corner, name + tagline + Explore CTA. As the
 *                user scrolls, the active card slides up and out
 *                while the next card emerges from below.
 *
 *   Eyebrow    : "INDUSTRIES WE SERVE" — silent label at the top.
 *
 *   Progress   : a thin gold rail at the bottom that fills 0 → 100%
 *                across the section.
 *
 * Each card is a real clickable Link to its vertical detail page,
 * so the "interactive" part is real: hover lifts the card slightly,
 * click navigates. No fake hot-spots.
 *
 * Mobile + reduced motion fall back to a stacked, photo-driven card
 * sequence — same content, no scroll choreography.
 *
 * All useTransform input ranges are clamped to [0, 1] to avoid the
 * WAAPI "Offsets must be monotonically non-decreasing" crash.
 */
export function VerticalsCinemaScroll() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // SCROLL-SCRUB THE BACKGROUND VIDEO.
  //
  // Tie the <video> currentTime directly to scroll progress, so the
  // user is physically driving the playback as they scroll the
  // section. We update inside requestAnimationFrame to batch writes
  // and avoid hammering the video element on every scroll event.
  //
  // Mobile Safari rejects rapid currentTime writes on autoplaying
  // muted video; we mitigate by NOT autoplaying and by setting
  // currentTime only when the video metadata is loaded.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduce) return;

    let rafId: number | null = null;
    let targetTime = 0;

    const apply = () => {
      rafId = null;
      if (!Number.isNaN(video.duration) && video.duration > 0) {
        // Clamp into a hair below duration to avoid the seek wrap.
        video.currentTime = Math.min(video.duration - 0.05, targetTime);
      }
    };

    const onChange = (v: number) => {
      if (!Number.isNaN(video.duration) && video.duration > 0) {
        targetTime = v * video.duration;
        if (rafId === null) rafId = requestAnimationFrame(apply);
      }
    };

    // Run once when metadata arrives so the first frame matches
    // wherever the user happens to be in the section already.
    const onLoaded = () => onChange(scrollYProgress.get());
    video.addEventListener("loadedmetadata", onLoaded);
    if (video.readyState >= 1) onLoaded();

    const unsubscribe = scrollYProgress.on("change", onChange);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      unsubscribe();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress, reduce]);

  if (reduce) return <StaticVerticals />;

  const total = verticals.length;

  return (
    <section
      ref={ref}
      className="relative bg-ink"
      style={{ height: `${total * 90}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Atmospheric Higgsfield video — scroll-scrubbed background.
            currentTime is driven by scrollYProgress in the effect
            above. autoPlay + loop give a graceful fallback when
            scroll hasn't engaged yet (or when iOS rejects programmatic
            currentTime control). Muted + playsInline are required
            for autoplay to actually fire on mobile browsers. */}
        <video
          ref={videoRef}
          src="/videos/verticals-atmosphere.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Light overlay only — the video is the show. A subtle
            bottom-anchored gradient keeps the floating card legible
            without burying the cinematic backdrop. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/30 pointer-events-none"
        />

        {/* Eyebrow at top */}
        <header className="absolute top-7 lg:top-10 inset-x-0 z-40 text-center pointer-events-none">
          <p className="caption text-canvas/65 tracking-[0.35em]">
            INDUSTRIES WE SERVE
          </p>
        </header>

        {/* Vertical cards — one active at a time, floating center stage */}
        {verticals.map((vertical, i) => (
          <FloatingCard
            key={vertical.slug}
            vertical={vertical}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}

        {/* Gold progress rail across the bottom */}
        <ProgressRail progress={scrollYProgress} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating vertical card — one active per scroll position            */
/* ------------------------------------------------------------------ */

function FloatingCard({
  vertical,
  index,
  total,
  progress,
}: {
  vertical: Vertical;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;

  // Card lifecycle:
  //   - emerges from below as the beat starts (y: 80 → 0, opacity 0 → 1)
  //   - holds in place during the dwell
  //   - slides up + fades as the beat ends (y: 0 → -80, opacity 1 → 0)
  const inputRange = [
    Math.max(0, start - 0.01),
    Math.max(0, Math.min(1, start + span * 0.22)),
    Math.max(0, Math.min(1, end - span * 0.22)),
    Math.min(1, end + 0.01),
  ];

  const opacity = useTransform(progress, inputRange, [0, 1, 1, 0]);
  const y = useTransform(progress, inputRange, [80, 0, 0, -80]);
  const scale = useTransform(progress, inputRange, [0.96, 1, 1, 0.96]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 z-30 flex items-center justify-center px-6 lg:px-12 pointer-events-none"
    >
      <Link
        href={vertical.href}
        className="group block relative overflow-hidden bg-ink/40 backdrop-blur-md border border-canvas/15 hover:border-gold/70 transition-colors duration-500 w-full max-w-md lg:max-w-lg aspect-[4/5] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] pointer-events-auto"
      >
        {vertical.image && (
          <Image
            src={vertical.image}
            alt={vertical.imageAlt ?? vertical.name}
            fill
            sizes="(min-width: 1024px) 32rem, 100vw"
            quality={80}
            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}

        {/* Bottom gradient so caption stays legible */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5 group-hover:from-ink group-hover:via-ink/55 transition-all duration-500"
        />

        {/* Gold corner accent */}
        <div
          aria-hidden
          className="absolute top-0 right-0 w-16 h-px bg-gold/80"
        />
        <div
          aria-hidden
          className="absolute top-0 right-0 w-px h-16 bg-gold/80"
        />

        {/* Beat number — top left */}
        <span className="absolute top-5 left-5 caption text-gold tracking-[0.3em]">
          {String(index + 1).padStart(2, "0")} / 0{total}
        </span>

        {/* Caption stack — bottom anchored */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8 text-canvas">
          <p className="caption text-gold mb-3">
            {vertical.tier === 1 ? "TIER ONE" : "TIER TWO"}
          </p>
          <h3 className="font-sans font-extrabold text-3xl lg:text-4xl leading-[1.05] text-balance mb-3 group-hover:text-gold transition-colors duration-300">
            {vertical.name}
          </h3>
          <p className="text-sm lg:text-base text-canvas/85 leading-snug mb-5 line-clamp-3">
            {vertical.tagline}
          </p>
          <span className="caption inline-flex items-center gap-2 text-canvas/90 group-hover:text-gold transition-colors duration-300">
            Explore {vertical.name}
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M1 5h12m0 0L9 1m4 4L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Gold progress rail                                                 */
/* ------------------------------------------------------------------ */

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-[2px] bg-canvas/10 z-40"
      aria-hidden
    >
      <motion.div
        className="h-full bg-gold origin-left"
        style={{ scaleX: progress }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reduced-motion fallback — stacked card sequence                    */
/* ------------------------------------------------------------------ */

function StaticVerticals() {
  return (
    <section className="bg-ink py-16 lg:py-24 px-6 lg:px-12">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-10">
          <p className="caption text-canvas/70 tracking-[0.35em]">
            INDUSTRIES WE SERVE
          </p>
        </header>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {verticals.map((vertical) => (
            <li key={vertical.slug}>
              <Link
                href={vertical.href}
                className="group block relative overflow-hidden bg-canvas/5 border border-canvas/15 hover:border-gold/70 transition-colors aspect-[4/5]"
              >
                {vertical.image && (
                  <Image
                    src={vertical.image}
                    alt={vertical.imageAlt ?? vertical.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5" />
                <div className="absolute top-0 right-0 w-12 h-px bg-gold/70" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-canvas">
                  <h3 className="font-sans font-extrabold text-xl lg:text-2xl mb-2 group-hover:text-gold transition-colors">
                    {vertical.name}
                  </h3>
                  <p className="text-sm text-canvas/85 line-clamp-2">
                    {vertical.tagline}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
