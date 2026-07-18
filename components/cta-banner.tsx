"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { Rule } from "@/components/rule";

/**
 * Closing CTA banner — full-bleed ink statement pushing toward the
 * primary conversion (book a discovery call). The single dark close;
 * gold lives earlier in the page (AboutSummary) so it stays special.
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
    <section className="py-28 lg:py-44 px-6 lg:px-12 bg-ink text-canvas border-t border-canvas/10">
      <motion.div
        {...containerProps}
        className="max-w-[1100px] mx-auto text-center"
      >
        <motion.p variants={child} className="caption text-gold mb-8">
          ◆ READY WHEN YOU ARE
        </motion.p>
        <motion.h2
          variants={child}
          className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl leading-[1.02] tracking-tight text-balance text-canvas"
        >
          Let&apos;s build something worth talking about.
        </motion.h2>
        <Rule className="bg-gold mx-auto mt-8" />
        <motion.p
          variants={child}
          className="text-base lg:text-lg text-canvas/60 max-w-2xl mx-auto leading-relaxed mt-8 mb-12"
        >
          We work with a small roster of premium brands at a time. If
          you&apos;re one of them, we should talk.
        </motion.p>
        <motion.div variants={child} className="flex justify-center">
          <Link
            href={site.cta.primary.href}
            className="bg-gold text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-gold/85 transition-colors duration-300"
          >
            {site.cta.primary.label}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
