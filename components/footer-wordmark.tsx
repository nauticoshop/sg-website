"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Oversized animated footer wordmark — signature brand moment.
 * Reveals letter-by-letter on scroll into view, anchors the bottom of
 * every page with the brand at full presence.
 *
 * Uses container-query-style fluid type so it fills the container width
 * on every breakpoint without horizontal scroll.
 */
export function FooterWordmark() {
  const reduce = useReducedMotion();
  const words = ["SURROUNDINGS", "GROUP"];

  return (
    <div className="overflow-hidden mt-12 lg:mt-16 mb-2">
      <motion.div
        initial={reduce ? false : "hidden"}
        whileInView={reduce ? undefined : "shown"}
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
        }}
        className="font-sans font-extrabold text-canvas leading-[0.85] tracking-[-0.04em] text-[clamp(2rem,8vw,7rem)] select-none"
        aria-hidden
      >
        {words.map((word, wi) => (
          <div key={wi} className="flex flex-wrap">
            {word.split("").map((letter, li) => (
              <motion.span
                key={`${wi}-${li}`}
                variants={{
                  hidden: { y: "100%", opacity: 0 },
                  shown: {
                    y: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.7,
                      ease: [0.22, 0.61, 0.36, 1],
                    },
                  },
                }}
                className="inline-block"
                style={{ willChange: "transform" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
