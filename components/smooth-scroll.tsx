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
    // don't fire — and Next's <Link> intercepts the click before a
    // bubble-phase listener can. Run in the CAPTURE phase so we win the
    // event first, stop Next from handling it, and hand the scroll to
    // Lenis (offset leaves room for the fixed nav).
    function onAnchorClick(e: MouseEvent) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
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
      e.stopImmediatePropagation(); // keep Next's <Link> from also acting
      // Instant native scroll — Lenis syncs to it. Neither lenis.scrollTo()
      // (its scroll limit mis-measures to 0 and clamps) nor native *smooth*
      // scroll (Lenis overrides each animation frame) moves the page here;
      // an instant jump is the one thing Lenis reliably follows. Offset
      // clears the fixed nav.
      const top =
        target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo(0, top);
      history.pushState(null, "", url.hash);
    }

    document.addEventListener("click", onAnchorClick, true);

    return () => {
      document.removeEventListener("click", onAnchorClick, true);
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
