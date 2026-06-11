"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { services, type Service } from "@/lib/services";

/**
 * Six-service editorial bands.
 *
 * Each service is a full-bleed horizontal row instead of a card in a
 * grid. Row split 50/50 on desktop: photo on one side, text on the
 * other, alternating sides per row. On mobile each row stacks photo
 * over text.
 *
 * When a service has a `portfolioImage`, it renders as the row's
 * photo. When absent, a stylized gold-numeral placeholder fills the
 * photo slot (the same pattern as the Phallon BD card). Drop a JPG
 * at /public/images/services/{slug}.jpg and the placeholder swaps to
 * the real photo automatically.
 *
 * Voice: editorial magazine spread, not "agency grid". Drama from
 * scale and negative space rather than dense card layouts.
 */
export function ServicesGrid() {
  const reduce = useReducedMotion();

  return (
    <section className="pt-10 lg:pt-14 pb-20 lg:pb-28 bg-canvas">
      {/* Header sits inside a container; the rows below go full-bleed */}
      <div className="px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <header className="text-center mb-12 lg:mb-20 max-w-3xl mx-auto">
            <p className="caption text-gold-deep mb-5">WHAT WE DO</p>
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink mb-5 text-balance">
              Full-service. An extension of your team.
            </h2>
            <p className="text-base lg:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              A diverse suite of specialty areas, all under one roof. Studio,
              Social, Digital, Growth, Experiences, Intelligence.
            </p>
          </header>
        </div>
      </div>

      {/* Editorial bands — full-width, no container constraint */}
      <motion.ol
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "shown"}
        viewport={{ once: true, amount: 0.05 }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: 0.12 } },
        }}
        className="border-t border-neutral-200"
      >
        {services.map((service, i) => (
          <motion.li
            key={service.slug}
            variants={{
              hidden: { opacity: 0, y: 24 },
              shown: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] },
              },
            }}
          >
            <ServiceBand
              service={service}
              index={i + 1}
              photoLeft={i % 2 === 0}
            />
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

function ServiceBand({
  service,
  index,
  photoLeft,
}: {
  service: Service;
  index: number;
  photoLeft: boolean;
}) {
  const num = String(index).padStart(2, "0");

  return (
    <Link
      href={service.href}
      className="group block border-b border-neutral-200"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[360px]">
        {/* Photo side */}
        <div
          className={`relative aspect-[5/4] lg:aspect-auto overflow-hidden bg-ink ${
            photoLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {service.portfolioImage ? (
            <Image
              src={service.portfolioImage}
              alt={service.portfolioAlt ?? `${service.name} — Surroundings Group`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <PlaceholderNumeral num={num} name={service.name} />
          )}

          {/* Gold corner accent */}
          <div
            className="absolute top-0 right-0 w-20 h-px bg-gold/60"
            aria-hidden
          />
          <div
            className="absolute top-0 right-0 w-px h-20 bg-gold/60"
            aria-hidden
          />
        </div>

        {/* Text side */}
        <div
          className={`bg-canvas px-6 py-10 lg:px-12 lg:py-14 flex flex-col justify-center ${
            photoLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="max-w-xl">
            <p className="caption text-gold-deep mb-4">
              {num} / SERVICE
            </p>

            <h3 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-none tracking-tight text-ink mb-5 group-hover:text-gold-deep transition-colors duration-500">
              {service.name}
            </h3>

            <p className="text-base lg:text-lg text-ink font-medium leading-snug mb-3 text-balance">
              {service.tagline}
            </p>

            <p className="text-sm lg:text-base text-neutral-700 leading-relaxed mb-6">
              {service.description}
            </p>

            <span className="caption inline-flex items-center gap-3 text-ink group-hover:text-gold-deep transition-colors duration-300">
              Explore {service.name}
              <svg
                width="16"
                height="11"
                viewBox="0 0 14 10"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-2"
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
        </div>
      </div>
    </Link>
  );
}

/**
 * Placeholder shown until a portfolio image is added.
 * Giant gold number on a textured dark frame with subtle radial glow.
 */
function PlaceholderNumeral({ num, name }: { num: string; name: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-900 via-ink to-neutral-800 overflow-hidden">
      {/* Soft radial gold glow */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, rgba(255, 189, 132, 0.5) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      {/* Giant number */}
      <span
        className="relative font-sans font-extrabold text-gold leading-none tracking-tight"
        style={{ fontSize: "clamp(6rem, 14vw, 12rem)" }}
        aria-hidden
      >
        {num}
      </span>

      {/* Subtle caption */}
      <span className="absolute bottom-6 left-6 caption text-canvas/35 tracking-[0.2em]">
        {name.toUpperCase()} · PHOTO COMING
      </span>
    </div>
  );
}
