"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/**
 * Verticals journey — a pinned, scroll-driven cinematic tour through
 * all eight SG verticals using real portfolio photography. The user
 * scrolls and the page pins while eight full-bleed shots cross-dissolve
 * with a subtle Ken Burns zoom. Built as "a day in the life of an SG
 * client" — the same person flying private in the morning, on the
 * water at noon, at dinner by the water that night.
 *
 * Pacing: 8 beats × 70vh each = 560vh total. Each beat has ~30vh of
 * full-opacity time before cross-fading into the next. The final beat
 * has slightly longer dwell so the user lands cleanly into the next
 * section.
 *
 * Mobile + reduced-motion fall back to a stacked sequence with the
 * same shots and the same captions — no pinning, no scrubbed
 * animations, but the same narrative arc.
 */

type JourneyBeat = {
  verticalSlug: string;
  vertical: string;
  line: string;
  image: string;
  alt: string;
};

const JOURNEY: JourneyBeat[] = [
  {
    verticalSlug: "private-aviation",
    vertical: "Private Aviation",
    line: "The day begins above the clouds.",
    image: "/images/work/flexjet/flexjet-01.jpg",
    alt: "Sikorsky helicopter and private jet on hangar ramp at golden hour",
  },
  {
    verticalSlug: "resorts-travel",
    vertical: "Resorts & Travel",
    line: "Arrival on the coast.",
    image: "/images/work/los-suenos/los-suenos-01.jpg",
    alt: "Sunrise aerial of Los Suenos marina, jungle hillside, and Pacific coastline",
  },
  {
    verticalSlug: "real-estate",
    vertical: "Real Estate",
    line: "Behind the gate.",
    image: "/images/work/tranquility-estate/tranquility-estate-01.jpg",
    alt: "Sunset view of symmetrical screened pool terrace with cabana and umbrellas",
  },
  {
    verticalSlug: "marine",
    vertical: "Marine",
    line: "Offshore by noon.",
    image: "/images/work/skyfall/skyfall-02.jpg",
    alt: "Top-down aerial of superyacht with tenders over gin-clear turquoise flats",
  },
  {
    verticalSlug: "exotic-automotive",
    vertical: "Exotic Automotive",
    line: "The drive back.",
    image: "/images/verticals/exotic-automotive.jpg",
    alt: "Mercedes G-Wagen Brabus parked on a coastal road",
  },
  {
    verticalSlug: "hospitality-experiences",
    vertical: "Hospitality & Experiences",
    line: "Dinner by the water.",
    image: "/images/work/sparkman-wharf/sparkman-wharf-01.jpg",
    alt: "Aerial of Sparkman Wharf lawn and marina against Tampa skyline at dusk",
  },
  {
    verticalSlug: "luxury-goods",
    vertical: "Luxury Goods",
    line: "Details that don't ask for attention.",
    image: "/images/work/gg-timepieces/gg-timepieces-01.jpg",
    alt: "Editorial close-up of a fine timepiece on cream backdrop",
  },
  {
    verticalSlug: "multifamily",
    vertical: "Multifamily",
    line: "Tower lights. Home.",
    image: "/images/work/cora-residences/cora-residences-01.jpg",
    alt: "Aerial of landscaped rooftop pool deck atop downtown residential tower",
  },
];

export function VerticalsJourneyScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduce) return <StaticJourney />;

  const total = JOURNEY.length;

  return (
    <section ref={ref} className="relative h-[640vh] bg-ink">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background image stack — each beat cross-fades with the next */}
        {JOURNEY.map((beat, i) => (
          <JourneyImageLayer
            key={beat.verticalSlug}
            beat={beat}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}

        {/* Persistent header eyebrow */}
        <header className="absolute top-7 lg:top-10 left-0 right-0 z-40 text-center pointer-events-none">
          <p className="caption text-canvas/70 tracking-[0.35em]">
            ONE CLIENT · EIGHT CATEGORIES
          </p>
        </header>

        {/* Foreground captions — only the active beat is at full opacity */}
        {JOURNEY.map((beat, i) => (
          <JourneyCaption
            key={beat.verticalSlug}
            beat={beat}
            index={i}
            total={total}
            progress={scrollYProgress}
          />
        ))}

        {/* Progress dots — bottom-center */}
        <ProgressDots progress={scrollYProgress} total={total} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Background image layer                                             */
/* ------------------------------------------------------------------ */

function JourneyImageLayer({
  beat,
  index,
  total,
  progress,
}: {
  beat: JourneyBeat;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each beat occupies 1/total of the scroll. Fade in 8% before its
  // window starts and fade out 8% after, for a smooth cross-dissolve.
  const span = 1 / total;
  const start = index * span;
  const end = start + span;
  const fadeIn = Math.max(0, start - 0.04);
  const fadeOut = Math.min(1, end + 0.04);

  const opacity = useTransform(
    progress,
    [fadeIn, start + span * 0.2, end - span * 0.2, fadeOut],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0],
  );

  // Slow Ken Burns zoom across the beat's window
  const scale = useTransform(progress, [start, end], [1.06, 1.16]);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image
          src={beat.image}
          alt={beat.alt}
          fill
          sizes="100vw"
          quality={85}
          priority={index < 2}
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic vignette — darker bottom for caption legibility, gold top */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-ink/50" />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Foreground caption per beat                                        */
/* ------------------------------------------------------------------ */

function JourneyCaption({
  beat,
  index,
  total,
  progress,
}: {
  beat: JourneyBeat;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;

  const opacity = useTransform(
    progress,
    [start - 0.01, start + span * 0.22, end - span * 0.22, end + 0.01],
    [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    [start, start + span * 0.4],
    [40, 0],
  );

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-0 z-30 px-6 lg:px-16 pb-24 lg:pb-32"
    >
      <div className="max-w-[1400px] mx-auto">
        <p className="caption text-gold mb-5">
          {num} / {beat.vertical.toUpperCase()}
        </p>

        <h2 className="font-sans font-extrabold text-canvas leading-[0.95] tracking-tight text-balance text-5xl md:text-7xl lg:text-8xl max-w-5xl">
          {beat.line}
        </h2>

        <Link
          href={`/verticals/${beat.verticalSlug}`}
          className="caption inline-flex items-center gap-3 mt-8 text-canvas/80 hover:text-gold transition-colors"
        >
          Explore {beat.vertical}
          <svg
            width="16"
            height="11"
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
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
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress dots                                                      */
/* ------------------------------------------------------------------ */

function ProgressDots({
  progress,
  total,
}: {
  progress: MotionValue<number>;
  total: number;
}) {
  return (
    <div className="absolute bottom-7 lg:bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <DotIndicator
          key={i}
          progress={progress}
          index={i}
          total={total}
        />
      ))}
    </div>
  );
}

function DotIndicator({
  progress,
  index,
  total,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const span = 1 / total;
  const start = index * span;
  const end = start + span;
  const width = useTransform(
    progress,
    [start - 0.01, start + span * 0.2, end - span * 0.2, end + 0.01],
    ["10px", "32px", "32px", "10px"],
  );
  const opacity = useTransform(
    progress,
    [start - 0.05, start + span * 0.2, end - span * 0.2, end + 0.05],
    [0.3, 1, 1, 0.3],
  );
  return (
    <motion.span
      style={{ width, opacity }}
      className="h-[2px] bg-gold rounded-full"
      aria-hidden
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Reduced-motion / mobile fallback                                   */
/* ------------------------------------------------------------------ */

function StaticJourney() {
  return (
    <section className="bg-ink py-16 lg:py-24">
      <div className="text-center mb-12">
        <p className="caption text-canvas/70 tracking-[0.35em]">
          ONE CLIENT · EIGHT CATEGORIES
        </p>
      </div>
      <div className="space-y-2">
        {JOURNEY.map((beat, i) => (
          <Link
            key={beat.verticalSlug}
            href={`/verticals/${beat.verticalSlug}`}
            className="block relative overflow-hidden h-[60vh] group"
          >
            <Image
              src={beat.image}
              alt={beat.alt}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-ink/50" />
            <div className="absolute inset-x-0 bottom-0 px-6 lg:px-12 pb-10">
              <p className="caption text-gold mb-3">
                {String(i + 1).padStart(2, "0")} / {beat.vertical.toUpperCase()}
              </p>
              <h2 className="font-sans font-extrabold text-canvas leading-[0.95] tracking-tight text-3xl md:text-5xl lg:text-6xl">
                {beat.line}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
