"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { services, type Service } from "@/lib/services";

/**
 * Six-service bento grid with scroll-stagger reveal.
 *
 * Layout (desktop, 3-col grid):
 *   [ Studio TALL ] [ Social      ] [ Digital     ]
 *   [             ] [ Growth      ] [ Experiences ]
 *   [ Intelligence WIDE — spans all 3 cols                  ]
 *
 * Studio gets a double-tall hero (it's the foundation service —
 * the work everything else builds on, so it earns the visual weight).
 *
 * Intelligence gets a full-width wide card (AI/automation is Billy's
 * most distinctive differentiator — premium agencies don't ship their
 * own software).
 *
 * Mobile collapses to a clean single column.
 *
 * Motion: stagger fade-up on scroll into view, once-only, with
 * prefers-reduced-motion fallback to instant render.
 */

interface BentoLayout {
  className: string;
  cardVariant: "standard" | "tall" | "wide";
}

// Layout mapped 1:1 to the services array order
const layout: BentoLayout[] = [
  { className: "lg:col-span-1 lg:row-span-2", cardVariant: "tall" },     // Studio
  { className: "lg:col-span-1 lg:row-span-1", cardVariant: "standard" }, // Social
  { className: "lg:col-span-1 lg:row-span-1", cardVariant: "standard" }, // Digital
  { className: "lg:col-span-1 lg:row-span-1", cardVariant: "standard" }, // Growth
  { className: "lg:col-span-1 lg:row-span-1", cardVariant: "standard" }, // Experiences
  { className: "lg:col-span-3 lg:row-span-1", cardVariant: "wide" },     // Intelligence
];

export function ServicesGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <header className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <p className="caption text-gold mb-6">WHAT WE DO</p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-ink mb-6 text-balance">
            Six disciplines, one in-house team.
          </h2>
          <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
            Every campaign moves through our studio under one roof — strategy,
            production, distribution, and measurement working as a single team.
          </p>
        </header>

        {/* Bento grid */}
        <motion.ul
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "shown"}
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
          className="grid grid-cols-1 lg:grid-cols-3 grid-rows-[auto] lg:grid-auto-rows-[minmax(360px,1fr)] gap-6 lg:gap-6"
        >
          {services.map((service, i) => (
            <motion.li
              key={service.slug}
              variants={{
                hidden: { opacity: 0, y: 32 },
                shown: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.95, ease: [0.22, 0.61, 0.36, 1] },
                },
              }}
              className={layout[i].className}
            >
              <ServiceCard
                service={service}
                index={i + 1}
                variant={layout[i].cardVariant}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  variant,
}: {
  service: Service;
  index: number;
  variant: "standard" | "tall" | "wide";
}) {
  const num = String(index).padStart(2, "0");

  // Wide cards get horizontal layout (name left, copy right)
  if (variant === "wide") {
    return (
      <Link href={service.href} className="group block h-full">
        <article className="@container relative h-full overflow-hidden bg-ink text-canvas p-8 lg:p-12 transition-transform duration-500 group-hover:scale-[1.005]">
          <div
            className="absolute top-0 right-0 w-24 h-px bg-gold/40"
            aria-hidden
          />
          <span className="absolute top-8 left-8 lg:top-12 lg:left-12 caption text-canvas/40">
            {num} / Service
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full items-end pt-12">
            <div className="lg:col-span-6">
              <span className="font-sans font-extrabold leading-none tracking-tight text-[clamp(2.75rem,9cqi,6rem)]">
                {service.name}
              </span>
            </div>
            <div className="lg:col-span-6 lg:max-w-md">
              <p className="text-lg lg:text-xl text-canvas leading-snug mb-3">
                {service.tagline}
              </p>
              <p className="text-sm text-canvas/70 leading-relaxed mb-5 line-clamp-3">
                {service.description}
              </p>
              <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold transition-colors duration-300">
                Explore {service.name}
                <Arrow />
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Tall and standard variants share the vertical layout; tall just stretches
  return (
    <Link href={service.href} className="group block h-full">
      <article
        className={`@container relative h-full overflow-hidden bg-ink text-canvas p-8 lg:p-10 transition-transform duration-500 group-hover:scale-[1.01] flex flex-col justify-end ${
          variant === "tall" ? "min-h-[480px] lg:min-h-full" : "min-h-[360px]"
        }`}
      >
        <div
          className="absolute top-0 right-0 w-24 h-px bg-gold/40"
          aria-hidden
        />
        <span className="absolute top-8 left-8 caption text-canvas/40">
          {num} / Service
        </span>

        <div>
          <span
            className={`font-sans font-extrabold text-canvas leading-none tracking-tight block mb-6 ${
              variant === "tall"
                ? "text-[clamp(3rem,10cqi,7rem)]"
                : "text-[clamp(2.75rem,9cqi,5.5rem)]"
            }`}
          >
            {service.name}
          </span>

          <p className="text-base lg:text-lg text-canvas leading-snug mb-3">
            {service.tagline}
          </p>
          <p className="text-sm text-canvas/70 leading-relaxed mb-5 line-clamp-3">
            {service.description}
          </p>
          <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold transition-colors duration-300">
            Explore {service.name}
            <Arrow />
          </span>
        </div>
      </article>
    </Link>
  );
}

function Arrow() {
  return (
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
  );
}
