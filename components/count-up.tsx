"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface CountUpProps {
  /** Final value to count to. Pass as string so we preserve formatting (180M+, etc.) */
  value: string;
  /** Duration of count-up in ms */
  duration?: number;
  /** Optional className for the rendered span */
  className?: string;
}

/**
 * Count-up animation triggered when the element scrolls into view.
 *
 * Smart-parses the value string to find the numeric portion, animates
 * just that part, and preserves all surrounding characters (M+, %, etc.).
 *
 * For non-numeric values like "Tampa" or "#1", renders as-is.
 * Respects prefers-reduced-motion.
 */
export function CountUp({ value, duration = 1800, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const reduce = useReducedMotion();

  // Parse value: split into prefix + number + suffix
  // Examples: "180M+" → ["", "180", "M+"], "100%" → ["", "100", "%"], "#1" → ["#", "1", ""], "Tampa" → no number
  const match = value.match(/^([^\d]*)(\d+)(.*)$/);

  useEffect(() => {
    if (!match || reduce) {
      setDisplay(value);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseInt(numStr, 10);

    const el = ref.current;
    if (!el) return;

    let started = false;
    let rafId: number;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const start = performance.now();

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic for a confident landing
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            setDisplay(`${prefix}${current}${suffix}`);
            if (progress < 1) {
              rafId = requestAnimationFrame(tick);
            } else {
              setDisplay(value); // Snap to exact final value
            }
          };

          rafId = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);

    // Initialize to "0" of the right format until the observer fires
    setDisplay(`${prefix}0${suffix}`);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [value, duration, reduce, match]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
