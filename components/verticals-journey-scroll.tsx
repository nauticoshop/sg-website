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
 * all eight SG verticals using real portfolio photography.
 *
 * Caption format per beat: small uppercase eyebrow combining the
 * client credit with the vertical name, then an agency-voice line
 * describing the kind of work we do for that category.
 *
 * Visual treatment:
 *   - Eight portfolio shots cross-dissolve as the user scrolls
 *   - Each shot scales subtly (Ken Burns) while it's the active beat —
 *     numeric scale only, no string-based interpolation, safe under
 *     the Web Animations API offset rules.
 *   - No "ONE CLIENT · EIGHT CATEGORIES" header overlay — silent.
 *   - No progress dots; instead a single gold rail at the bottom
 *     fills from 0 → 100% as the user moves through the section.
 *
 * Mobile + reduced-motion fall back to a stacked sequence with the
 * same shots and same captions — no pinning, no scrubbed animations.
 *
 * All useTransform input ranges are clamped to [0, 1] — values outside
 * that range crash motion's WAAPI keyframe binding with
 *   "Offsets must be monotonically non-decreasing".
 */

type JourneyBeat = {
  verticalSlug: string;
  vertical: string;
  /** Client credit shown above the headline. "—" means no specific
   *  client (we don't claim work we didn't do). */
  client: string;
  /** Agency-voice line — what we do for this category, not poetic
   *  brand copy. */
  line: string;
  image: string;
  alt: string;
};

const JOURNEY: JourneyBeat[] = [
  {
    verticalSlug: "private-aviation",
    vertical: "Private Aviation",
    client: "Flexjet",
    line: "Brand films and category presence in private aviation.",
    image: "/images/work/flexjet/flexjet-01.jpg",
    alt: "Sikorsky helicopter and private jet on hangar ramp at golden hour",
  },
  {
    verticalSlug: "resorts-travel",
    vertical: "Resorts & Travel",
    client: "Los Sueños",
    line: "Editorial campaigns for premium destinations.",
    image: "/images/work/los-suenos/los-suenos-01.jpg",
    alt: "Sunrise aerial of Los Suenos marina, jungle hillside, and Pacific coastline",
  },
  {
    verticalSlug: "real-estate",
    vertical: "Real Estate",
    client: "Tranquility Estate",
    line: "Pre-sales storytelling for flagship developments.",
    image: "/images/work/tranquility-estate/tranquility-estate-01.jpg",
    alt: "Sunset view of symmetrical screened pool terrace with cabana and umbrellas",
  },
  {
    verticalSlug: "marine",
    vertical: "Marine",
    client: "Skyfall",
    line: "Launch films and editorial coverage in marine.",
    image: "/images/work/skyfall/skyfall-02.jpg",
    alt: "Top-down aerial of superyacht with tenders over gin-clear turquoise flats",
  },
  {
    verticalSlug: "exotic-automotive",
    vertical: "Exotic Automotive",
    client: "Studio",
    line: "Brand work for the exotic automotive category.",
    image: "/images/verticals/exotic-automotive.jpg",
    alt: "Mercedes G-Wagen Brabus parked on a coastal road",
  },
  {
    verticalSlug: "hospitality-experiences",
    vertical: "Hospitality & Experiences",
    client: "Sparkman Wharf",
    line: "Brand systems for hospitality at scale.",
    image: "/images/work/sparkman-wharf/sparkman-wharf-01.jpg",
    alt: "Aerial of Sparkman Wharf lawn and marina against Tampa skyline at dusk",
  },
  {
    verticalSlug: "luxury-goods",
    vertical: "Luxury Goods",
    client: "G&G Timepieces",
    line: "Editorial campaigns for luxury goods.",
    image: "/images/work/gg-timepieces/gg-timepieces-01.jpg",
    alt: "Editorial close-up of a fine timepiece on cream backdrop",
  },
  {
    verticalSlug: "multifamily",
    vertical: "Multifamily",
    client: "Cora Residences",
    line: "Lease-up content programs for multifamily.",
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

        {/* Gold rail — fills 0 → 100% across the full section scroll */}
        <ProgressRail progress={scrollYProgress} />
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
  // Each beat occupies 1/total of the scroll.
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

  // Ken Burns — gentle scale across the beat's active window.
  // Numeric transform, input clamped to [0, 1] — safe under WAAPI.
  const scale = useTransform(
    progress,
    [Math.max(0, start), Math.min(1, end)],
    [1.04, 1.12],
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        <Image
          src={beat.image}
          alt={beat.alt}
          fill
          sizes="100vw"
          quality={75}
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          className="object-cover"
        />
      </motion.div>

      {/* Cinematic vignette — darker bottom for caption legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/40" />
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

  // Clamp every keyframe to [0, 1]. WAAPI rejects offsets outside
  // that range and crashes the component on mount.
  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - 0.01),
      Math.max(0, Math.min(1, start + span * 0.22)),
      Math.max(0, Math.min(1, end - span * 0.22)),
      Math.min(1, end + 0.01),
    ],
    [0, 1, 1, 0],
  );

  const y = useTransform(
    progress,
    [
      Math.max(0, Math.min(1, start)),
      Math.max(0, Math.min(1, start + span * 0.4)),
    ],
    [32, 0],
  );

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 bottom-0 z-30 px-6 lg:px-16 pb-20 lg:pb-28"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow: number / client · vertical */}
        <p className="caption text-gold mb-6 tracking-[0.28em]">
          {num} <span className="text-canvas/50">/</span>{" "}
          {beat.client.toUpperCase()}{" "}
          <span className="text-canvas/40">·</span>{" "}
          <span className="text-canvas/70">{beat.vertical.toUpperCase()}</span>
        </p>

        {/* Agency-voice line */}
        <h2 className="font-sans font-extrabold text-canvas leading-[0.98] tracking-tight text-balance text-4xl md:text-5xl lg:text-6xl max-w-4xl">
          {beat.line}
        </h2>

        <Link
          href={`/verticals/${beat.verticalSlug}`}
          className="caption inline-flex items-center gap-3 mt-8 text-canvas/75 hover:text-gold transition-colors group"
        >
          Explore {beat.vertical}
          <svg
            width="16"
            height="11"
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
        </Link>
      </div>
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
/*  Reduced-motion / mobile fallback                                   */
/* ------------------------------------------------------------------ */

function StaticJourney() {
  return (
    <section className="bg-ink">
      <div className="space-y-2">
        {JOURNEY.map((beat, i) => (
          <Link
            key={beat.verticalSlug}
            href={`/verticals/${beat.verticalSlug}`}
            className="block relative overflow-hidden h-[70vh] group"
          >
            <Image
              src={beat.image}
              alt={beat.alt}
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-ink/40" />
            <div className="absolute inset-x-0 bottom-0 px-6 lg:px-12 pb-12">
              <p className="caption text-gold mb-4 tracking-[0.28em]">
                {String(i + 1).padStart(2, "0")}{" "}
                <span className="text-canvas/50">/</span>{" "}
                {beat.client.toUpperCase()}{" "}
                <span className="text-canvas/40">·</span>{" "}
                <span className="text-canvas/70">
                  {beat.vertical.toUpperCase()}
                </span>
              </p>
              <h2 className="font-sans font-extrabold text-canvas leading-[0.98] tracking-tight text-3xl md:text-4xl lg:text-5xl max-w-3xl">
                {beat.line}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
