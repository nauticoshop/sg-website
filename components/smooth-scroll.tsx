"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Site-wide smooth scroll provider. Premium agencies all use this —
 * butter-smooth wheel/trackpad scrolling that makes the whole site
 * feel more deliberate.
 *
 * Mounted once in the root layout; runs a RAF loop while the page
 * is alive. Cleans up on unmount.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return; // Respect accessibility preference

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
