"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";

/**
 * Closing CTA banner — full-bleed gold section pushing toward the
 * primary conversion (book a discovery call).
 *
 * Scroll-reveal: eyebrow → headline → supporting copy → button row
 * cascade in with staggered timing as the section enters view.
 */
export function CtaBanner() {
  const reduce = useReducedMotion();

  const child = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 24 },
        shown: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: [0.22, 0.61, 0.36, 1] as const },
        },
      };

  const containerProps = reduce
    ? {}
    : {
        initial: "hidden",
        whileInView: "shown",
        viewport: { once: true, amount: 0.3 },
        variants: {
          hidden: {},
          shown: { transition: { staggerChildren: 0.12 } },
        },
      };

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gold text-ink">
      <motion.div
        {...containerProps}
        className="max-w-[1000px] mx-auto text-center"
      >
        <motion.p variants={child} className="caption text-ink mb-6">
          READY WHEN YOU ARE
        </motion.p>
        <motion.h2
          variants={child}
          className="font-sans font-extrabold text-4xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6 text-balance text-ink"
        >
          Let&apos;s build something worth talking about.
        </motion.h2>
        <motion.p
          variants={child}
          className="text-base lg:text-lg text-ink/75 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          We work with a small roster of premium brands at a time. If
          you&apos;re one of them, we should talk.
        </motion.p>
        <motion.div
          variants={child}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href={site.cta.primary.href}
            className="bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-300"
          >
            {site.cta.primary.label}
          </Link>
          <Link
            href="/contact"
            className="border border-ink/40 text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-ink hover:text-canvas hover:border-ink transition-colors duration-300"
          >
            Or send us a note
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
