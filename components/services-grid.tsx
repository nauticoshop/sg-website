"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { services, type Service } from "@/lib/services";

/**
 * Six-service grid — clean 3-col uniform layout.
 *
 * Removed the asymmetric tall-Studio + wide-Intelligence bento per Billy's
 * feedback ("don't like Intelligence being that full bottom part"). Now all
 * six cards are equal weight, equal size — calmer, more confident,
 * uniformly readable.
 *
 * Typography intentionally larger throughout so taglines + descriptions
 * are easy to scan, not squeezed.
 *
 * Motion: stagger fade-up on scroll into view (per-card 90ms delay).
 */
export function ServicesGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        {/* Section header — significantly larger per feedback */}
        <header className="text-center mb-16 lg:mb-24 max-w-4xl mx-auto">
          <p className="caption text-gold mb-6">WHAT WE DO</p>
          <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-ink mb-8 text-balance">
            Six disciplines, one in-house team.
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 leading-relaxed max-w-3xl mx-auto">
            Every campaign moves through our studio under one roof — strategy,
            production, distribution, and measurement working as a single team.
          </p>
        </header>

        {/* Uniform 3-col grid */}
        <motion.ul
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "shown"}
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, i) => (
            <motion.li
              key={service.slug}
              variants={{
                hidden: { opacity: 0, y: 32 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] },
                },
              }}
            >
              <ServiceCard service={service} index={i + 1} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const num = String(index).padStart(2, "0");

  return (
    <Link href={service.href} className="group block h-full">
      <article className="@container relative h-full overflow-hidden bg-ink text-canvas p-10 lg:p-12 transition-all duration-500 group-hover:bg-deep group-hover:scale-[1.01] flex flex-col min-h-[420px]">
        {/* Subtle gold accent line top-right */}
        <div
          className="absolute top-0 right-0 w-20 h-px bg-gold/40"
          aria-hidden
        />

        {/* Top: number marker */}
        <div className="flex items-start justify-between mb-12 lg:mb-16">
          <span className="caption text-canvas/40">
            {num} / Service
          </span>
        </div>

        {/* Middle: big serif-weight name (DM Sans Black for that wordmark feel) */}
        <div className="flex-1 flex items-end">
          <h3 className="font-sans font-extrabold text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight">
            {service.name}
          </h3>
        </div>

        {/* Bottom: tagline + CTA — intentionally larger taglines per feedback */}
        <div className="mt-10 lg:mt-12 border-t border-canvas/15 pt-6">
          <p className="text-lg lg:text-xl text-canvas leading-snug mb-3 font-medium">
            {service.tagline}
          </p>
          <p className="text-sm lg:text-base text-canvas/60 leading-relaxed mb-6 line-clamp-2">
            {service.description}
          </p>
          <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold transition-colors duration-300">
            Explore {service.name}
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
      </article>
    </Link>
  );
}
