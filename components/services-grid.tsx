"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { services, type Service } from "@/lib/services";

/**
 * Six-service grid — uniform 3-col, all cards equal size.
 *
 * Cleaned-up version per Billy's feedback:
 *   - No more line-clamp truncation on descriptions (they read in full)
 *   - All cards same height (flex layout ensures consistency)
 *   - bg-ink everywhere dark for color palette consistency
 *   - Larger sub-text for readability
 *
 * Motion: stagger fade-up on scroll into view.
 */
export function ServicesGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        <header className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <p className="caption text-gold-deep mb-5">WHAT WE DO</p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink mb-5 text-balance">
            Six services. All in-house.
          </h2>
          <p className="text-base lg:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Strategy, production, paid, PR, owned media, and the tech behind
            it. Run by senior people who plan the work and ship it themselves.
          </p>
        </header>

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
      <article className="relative h-full overflow-hidden bg-ink text-canvas p-8 lg:p-10 transition-all duration-500 group-hover:bg-neutral-800 flex flex-col min-h-[400px]">
        {/* Gold accent corner */}
        <div
          className="absolute top-0 right-0 w-16 h-px bg-gold-deep/40"
          aria-hidden
        />

        {/* Top: number marker */}
        <span className="caption text-canvas/40 mb-8 lg:mb-10">
          {num} / Service
        </span>

        {/* Service name */}
        <div className="flex-1 flex items-end mb-6 lg:mb-8">
          <h3 className="font-sans font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-none tracking-tight">
            {service.name}
          </h3>
        </div>

        {/* Bottom: tagline + description + CTA */}
        <div className="border-t border-canvas/15 pt-5">
          <p className="text-base lg:text-lg text-canvas leading-snug mb-3 font-medium">
            {service.tagline}
          </p>
          <p className="text-sm text-canvas/70 leading-relaxed mb-5">
            {service.description}
          </p>
          <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold-deep transition-colors duration-300">
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
