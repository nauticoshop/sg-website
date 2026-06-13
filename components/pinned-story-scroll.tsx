"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { verticals } from "@/lib/verticals";
import { services } from "@/lib/services";

/**
 * Pinned scroll-driven story.
 *
 * Sits between the homepage Hero and the rest of the page. The section
 * is 300vh tall and pins to the viewport while the user scrolls
 * through three beats:
 *
 *   01 / FLUENT  — Vertical-fluent. Eight categories cascade in.
 *   02 / REACH   — 180M+ owned media network reach. Stat counts up.
 *   03 / STUDIO  — Six disciplines under one roof.
 *
 * Visual language: ink background, gold radial glow that drifts as the
 * user scrolls, big editorial type, no stock imagery. Designed to feel
 * like a luxury magazine fold-out, not an agency carousel.
 *
 * Mobile + reduced motion fall back to a stacked, non-pinned version
 * that ships the same content without the scroll choreography.
 */
export function PinnedStoryScroll() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress: progress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Beat opacities — three beats, each occupies ~1/3 of the scroll.
  // Slight overlap so the transition between beats feels like a
  // cross-dissolve, not a hard cut.
  const beat1Opacity = useTransform(progress, [0.0, 0.04, 0.28, 0.34], [0, 1, 1, 0]);
  const beat2Opacity = useTransform(progress, [0.34, 0.40, 0.61, 0.67], [0, 1, 1, 0]);
  const beat3Opacity = useTransform(progress, [0.67, 0.73, 0.96, 1.0], [0, 1, 1, 1]);

  // Number tick-up for the reach stat
  const reachValue = useTransform(progress, [0.34, 0.55], [0, 180]);

  if (reduce) {
    return <StaticFallback />;
  }

  return (
    <section ref={ref} className="relative h-[300vh] bg-ink text-canvas">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Backdrop: ink + static gold radial glow. Kept static (not
            scroll-driven) so the GPU isn't running an additional
            transform alongside the beats. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-ink via-neutral-900 to-ink"
        />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 50% 45%, rgba(255, 189, 132, 0.18), transparent 65%)",
          }}
        />

        {/* Top-left progress rail */}
        <ProgressRail progress={progress} />

        {/* Beat 1 — FLUENT */}
        <motion.div
          style={{ opacity: beat1Opacity }}
          className="absolute inset-0 flex items-center justify-center px-6 lg:px-16"
        >
          <BeatOne progress={progress} />
        </motion.div>

        {/* Beat 2 — REACH */}
        <motion.div
          style={{ opacity: beat2Opacity }}
          className="absolute inset-0 flex items-center justify-center px-6 lg:px-16"
        >
          <BeatTwo reachValue={reachValue} progress={progress} />
        </motion.div>

        {/* Beat 3 — STUDIO */}
        <motion.div
          style={{ opacity: beat3Opacity }}
          className="absolute inset-0 flex items-center justify-center px-6 lg:px-16"
        >
          <BeatThree progress={progress} />
        </motion.div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Beats                                                              */
/* ------------------------------------------------------------------ */

function BeatOne({ progress }: { progress: MotionValue<number> }) {
  // Within beat 1 (scroll 0 → 0.33), individually cascade the verticals
  // in as the user moves through it.
  return (
    <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-12 items-center">
      <div className="lg:col-span-5">
        <p className="caption text-gold mb-6">01 / FLUENT</p>
        <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-balance">
          Vertical-fluent.
          <br />
          <span className="text-gold">By design.</span>
        </h2>
        <p className="mt-8 text-lg lg:text-xl text-canvas/70 leading-relaxed max-w-md">
          Eight premium categories. One creative studio that speaks each
          one natively.
        </p>
      </div>

      <div className="lg:col-span-7">
        <ol className="space-y-2 lg:space-y-3">
          {verticals.map((v, i) => {
            // Each vertical reveals at a slightly different scroll point
            // inside beat 1. Stagger across 0.04 → 0.26 of total scroll.
            const start = 0.04 + (i / verticals.length) * 0.18;
            return (
              <VerticalRow
                key={v.slug}
                index={i}
                name={v.name}
                href={v.href}
                progress={progress}
                start={start}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
}

function VerticalRow({
  index,
  name,
  href,
  progress,
  start,
}: {
  index: number;
  name: string;
  href: string;
  progress: MotionValue<number>;
  start: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.03], [0, 1]);
  const x = useTransform(progress, [start, start + 0.04], [-40, 0]);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.li style={{ opacity, x }}>
      <Link
        href={href}
        className="group flex items-baseline gap-6 py-1 border-b border-canvas/10 hover:border-gold/50 transition-colors"
      >
        <span className="caption text-gold/70 w-10">{num}</span>
        <span className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl tracking-tight text-canvas group-hover:text-gold transition-colors">
          {name}
        </span>
        <span
          aria-hidden
          className="ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold"
        >
          →
        </span>
      </Link>
    </motion.li>
  );
}

function BeatTwo({
  reachValue,
  progress,
}: {
  reachValue: MotionValue<number>;
  progress: MotionValue<number>;
}) {
  // Fade the supporting copy in slightly after the stat lands
  const supportOpacity = useTransform(progress, [0.45, 0.55], [0, 1]);

  return (
    <div className="max-w-[1440px] w-full text-center">
      <p className="caption text-gold mb-8">02 / REACH</p>

      <div className="relative inline-block">
        <motion.span
          className="block font-sans font-extrabold text-gold leading-none tracking-tight"
          style={{ fontSize: "clamp(7rem, 22vw, 22rem)" }}
        >
          <CountUpDisplay value={reachValue} />
          <span className="text-canvas/80">M+</span>
        </motion.span>
      </div>

      <motion.div
        style={{ opacity: supportOpacity }}
        className="mt-8 max-w-3xl mx-auto"
      >
        <p className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight text-balance">
          Annual viewers across our owned media network.
        </p>
        <p className="mt-6 text-base lg:text-lg text-canvas/60 leading-relaxed max-w-2xl mx-auto">
          The distribution advantage other agencies have to buy. We
          built ours, anchored by Nautical Network and extending into
          every category we serve.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-canvas/70">
          <Stat value="8" label="Owned channels" />
          <Stat value="62M" label="Annual watch minutes" />
          <Stat value="#1" label="In premium marine" />
        </div>
      </motion.div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-sans font-extrabold text-2xl lg:text-3xl text-gold">
        {value}
      </span>
      <span className="caption text-canvas/50">{label}</span>
    </div>
  );
}

function CountUpDisplay({ value }: { value: MotionValue<number> }) {
  const rounded = useTransform(value, (v) => Math.round(v));
  return <motion.span>{rounded}</motion.span>;
}

function BeatThree({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="max-w-[1440px] w-full">
      <div className="text-center mb-12 lg:mb-16">
        <p className="caption text-gold mb-6">03 / STUDIO</p>
        <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-balance">
          Six disciplines.
          <br />
          <span className="text-gold">One roof.</span>
        </h2>
        <p className="mt-6 text-lg text-canvas/70 max-w-xl mx-auto">
          Full-service for premium brands. Every capability under one
          studio, run by one accountable team.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4 max-w-5xl mx-auto">
        {services.map((s, i) => {
          // Stagger each service tile across 0.73 → 0.92
          const start = 0.73 + (i / services.length) * 0.16;
          return (
            <ServiceTile
              key={s.slug}
              name={s.name}
              href={s.href}
              progress={progress}
              start={start}
            />
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/services"
          className="caption inline-flex items-center gap-3 text-gold hover:text-canvas transition-colors"
        >
          Explore our services
          <svg
            width="16"
            height="11"
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
  );
}

function ServiceTile({
  name,
  href,
  progress,
  start,
}: {
  name: string;
  href: string;
  progress: MotionValue<number>;
  start: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.025], [0, 1]);
  const y = useTransform(progress, [start, start + 0.03], [16, 0]);

  return (
    <motion.div style={{ opacity, y }}>
      <Link
        href={href}
        className="group block aspect-[3/4] border border-canvas/15 hover:border-gold/60 bg-canvas/[0.02] hover:bg-canvas/[0.05] transition-all p-4 lg:p-5 flex flex-col justify-between"
      >
        <span className="caption text-gold/70 text-[0.65rem]">
          {name.slice(0, 2).toUpperCase()}
        </span>
        <span className="font-sans font-extrabold text-xl lg:text-2xl tracking-tight text-canvas group-hover:text-gold transition-colors leading-none">
          {name}
        </span>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress rail                                                      */
/* ------------------------------------------------------------------ */

function ProgressRail({ progress }: { progress: MotionValue<number> }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-6 lg:left-10 hidden md:flex flex-col items-center gap-4">
      <span className="caption text-canvas/40 [writing-mode:vertical-rl] rotate-180 tracking-[0.3em]">
        THE STUDIO
      </span>
      <div className="relative w-px h-40 bg-canvas/15">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gold origin-top"
          style={{ scaleY, height: "100%" }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reduced-motion fallback                                            */
/* ------------------------------------------------------------------ */

function StaticFallback() {
  return (
    <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto space-y-20">
        {/* Beat 1 */}
        <div>
          <p className="caption text-gold mb-4">01 / FLUENT</p>
          <h2 className="font-sans font-extrabold text-4xl lg:text-6xl tracking-tight">
            Vertical-fluent. <span className="text-gold">By design.</span>
          </h2>
          <p className="mt-4 text-canvas/70 max-w-xl">
            Eight premium categories. One studio that speaks each.
          </p>
          <ol className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8">
            {verticals.map((v, i) => (
              <li key={v.slug} className="border-b border-canvas/10 py-2">
                <Link
                  href={v.href}
                  className="flex items-baseline gap-4 text-canvas hover:text-gold transition-colors"
                >
                  <span className="caption text-gold/70 w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-sans font-bold text-xl">{v.name}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Beat 2 */}
        <div className="text-center">
          <p className="caption text-gold mb-4">02 / REACH</p>
          <p
            className="font-sans font-extrabold text-gold leading-none"
            style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
          >
            180<span className="text-canvas/80">M+</span>
          </p>
          <p className="mt-4 font-sans font-bold text-2xl lg:text-3xl text-balance">
            Annual viewers across our owned media network.
          </p>
        </div>

        {/* Beat 3 */}
        <div>
          <p className="caption text-gold mb-4 text-center">03 / STUDIO</p>
          <h2 className="text-center font-sans font-extrabold text-4xl lg:text-6xl tracking-tight">
            Six disciplines. <span className="text-gold">One roof.</span>
          </h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={s.href}
                className="border border-canvas/15 hover:border-gold/60 p-4 text-canvas hover:text-gold transition-colors"
              >
                <span className="font-sans font-extrabold text-xl">
                  {s.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
