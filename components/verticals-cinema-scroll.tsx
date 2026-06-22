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
  const spotRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // MOUSE-FOLLOWING SPOTLIGHT.
  //
  // We track the cursor's position inside the section, then write
  // its coordinates as CSS custom properties (--spot-x, --spot-y) on
  // a single fixed-position div. A radial gradient is drawn from
  // those coordinates, giving the illusion of a warm gold light
  // following the cursor.
  //
  // Smoothing: we lerp the current position toward the target each
  // frame, so the light glides instead of jumping. Lerp factor 0.12
  // is a quiet, premium feel — not snappy.
  //
  // Mobile / no-cursor fallback: the spotlight slowly drifts in a
  // figure-eight using a sin/cos pair seeded by Date.now(). Result:
  // touch users get an ambient candlelit feel rather than a static
  // pool. Since Date.now() isn't available in our Math wrappers, we
  // use performance.now() inside the rAF loop instead.
  useEffect(() => {
    if (reduce) return;
    const section = ref.current;
    const spot = spotRef.current;
    if (!section || !spot) return;

    let rafId: number | null = null;
    let targetX = 50;
    let targetY = 45;
    let currentX = 50;
    let currentY = 45;
    let usingMouse = false;
    let lastDriftStamp = 0;

    const matchMediaCoarse =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;

    const tick = (timestamp: number) => {
      // Drift fallback for touch / no-pointer devices.
      if (!usingMouse) {
        if (lastDriftStamp === 0) lastDriftStamp = timestamp;
        const t = (timestamp - lastDriftStamp) / 1000;
        targetX = 50 + Math.sin(t * 0.35) * 18;
        targetY = 45 + Math.cos(t * 0.28) * 14;
      }
      // Lerp toward the target each frame for a smooth glide.
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      spot.style.setProperty("--spot-x", `${currentX}%`);
      spot.style.setProperty("--spot-y", `${currentY}%`);
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) return;
      usingMouse = true;
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    };

    if (!matchMediaCoarse) {
      window.addEventListener("mousemove", onMove);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      if (!matchMediaCoarse) {
        window.removeEventListener("mousemove", onMove);
      }
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  if (reduce) return <StaticVerticals />;

  const total = verticals.length;

  return (
    <section
      ref={ref}
      className="relative bg-ink"
      style={{ height: `${total * 90}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Deep ink base — Tom Ford / Loewe-style velvet dark room. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-ink via-neutral-900 to-ink"
        />

        {/* Per-vertical cinematic backdrop — the active vertical's
            portfolio photo cross-fades into view as you scroll. Sits
            UNDER the cursor spotlight so the gold light glows on top
            of the imagery. */}
        {verticals.map((vertical, i) => (
          <BackgroundLayer
            key={`bg-${vertical.slug}`}
            vertical={vertical}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}

        {/* Mouse-following warm gold spotlight. Coordinates set as
            CSS custom properties from the rAF loop in the effect
            above. Touch users get an ambient figure-eight drift. */}
        <div
          ref={spotRef}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            ["--spot-x" as string]: "50%",
            ["--spot-y" as string]: "45%",
            background:
              "radial-gradient(circle 620px at var(--spot-x) var(--spot-y), rgba(255, 189, 132, 0.22), rgba(255, 189, 132, 0.06) 35%, transparent 70%)",
          }}
        />

        {/* Vignette — pulls the eye toward the centered card. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(15, 15, 18, 0.75) 100%)",
          }}
        />

        {/* Film grain — subtle premium texture. */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
          }}
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
/*  Background layer — per-vertical photo cross-fade                   */
/* ------------------------------------------------------------------ */

function BackgroundLayer({
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

  // Cross-fade input range: cushion the fade by 15% of the beat on
  // each side so adjacent beats overlap and there's no hard cut.
  // Input clamped into [0, 1] to keep WAAPI happy.
  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - span * 0.15),
      Math.max(0, Math.min(1, start + span * 0.15)),
      Math.max(0, Math.min(1, end - span * 0.15)),
      Math.min(1, end + span * 0.15),
    ],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0],
  );

  // Slow Ken Burns scale across the beat window.
  const scale = useTransform(
    progress,
    [Math.max(0, start), Math.min(1, end)],
    [1.06, 1.16],
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        {vertical.image && (
          <Image
            src={vertical.image}
            alt={vertical.imageAlt ?? vertical.name}
            fill
            sizes="100vw"
            quality={75}
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            className="object-cover opacity-55"
          />
        )}
      </motion.div>
      {/* Soft ink wash on the photo so the cursor spotlight can
          light it without the imagery competing with the card. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-ink/30 pointer-events-none"
      />
    </motion.div>
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
