"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Site-wide smooth scroll provider. Premium agencies all use this —
 * butter-smooth wheel/trackpad scrolling that makes the whole site
 * feel more deliberate.
 *
 * Mounted once in the root layout; runs a RAF loop while the page
 * is alive. Cleans up on unmount.
 *
 * On route change we snap Lenis back to the top immediately —
 * otherwise its RAF loop re-applies the previous page's scroll
 * offset after Next.js navigates, landing visitors mid-page.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

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
    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Lenis manages scroll position itself, so native `#anchor` jumps
    // don't fire. Intercept same-page hash links and hand them to Lenis
    // (offset leaves room for the fixed nav so targets aren't hidden).
    function onAnchorClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) {
        return;
      }
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href*="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      // Only same-page hashes (ignore links to other routes).
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -96 });
      history.pushState(null, "", url.hash);
    }

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page → start at the top, no easing.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
