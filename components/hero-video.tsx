"use client";

import { useEffect, useSyncExternalStore, type CSSProperties } from "react";
import { site } from "@/lib/site";

// window.dataLayer is declared globally by @next/third-parties, which
// installs the GTM container in app/layout.tsx.

const STORAGE_KEY = "sg_hero_variant";

type Variant = "a" | "b";

/** Build a Vimeo background-mode embed URL (autoplay, muted, looping, no UI). */
function vimeoBackgroundSrc(vimeoId: string, vimeoHash?: string): string {
  const hash = vimeoHash ? `h=${vimeoHash}&` : "";
  return `https://player.vimeo.com/video/${vimeoId}?${hash}background=1&autoplay=1&loop=1&muted=1`;
}

/**
 * Assign this browser to an A/B bucket, sticky across visits via
 * localStorage. Cached in-module so repeated snapshot reads are stable.
 * localStorage can throw (strict privacy settings, sandboxed contexts) —
 * fall back to a per-pageview assignment rather than breaking the hero.
 */
let assignedVariant: Variant | null = null;
function getAssignedVariant(weightB: number): Variant {
  if (assignedVariant) return assignedVariant;
  let stored: string | null = null;
  try {
    stored = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // storage unavailable — assignment just won't stick across visits
  }
  const v: Variant =
    stored === "a" || stored === "b"
      ? stored
      : Math.random() < weightB
        ? "b"
        : "a";
  if (stored !== v) {
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {
      // ignore — see above
    }
  }
  assignedVariant = v;
  return v;
}

const noopSubscribe = () => () => {};

/**
 * "Always-cover" sizing so the 16:9 video fills the hero section
 * regardless of viewport aspect ratio.
 */
const coverStyle: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "max(100%, calc(100vh * 16 / 9))",
  height: "max(100%, calc(100vw * 9 / 16))",
  minWidth: "100%",
  minHeight: "100%",
  transform: "translate(-50%, -50%)",
  pointerEvents: "none",
  border: 0,
};

interface HeroVideoProps {
  /** Vimeo video ID for variant A (control). Defaults to site config. */
  vimeoId?: string;
  /** Unlisted-video hash for variant A. Defaults to site config. */
  vimeoHash?: string;
}

/**
 * Hero background video with optional A/B test.
 *
 * With no variant B configured (site.hero.variantB.vimeoId === ""), this
 * renders the control video directly — server-rendered, no flash, identical
 * to the old static iframe.
 *
 * With variant B configured:
 *   - Each new visitor is assigned a/b by weightB and the choice is stored
 *     in localStorage, so they see the same video on every visit.
 *   - The server renders no iframe (one frame on the dark hero background);
 *     the assigned variant mounts after hydration, so server and client
 *     markup never disagree.
 *   - Every exposure pushes { event: "hero_video_ab", hero_video_variant }
 *     to the GTM dataLayer so conversions can be segmented by variant.
 */
export function HeroVideo({
  vimeoId = site.hero.vimeoId,
  vimeoHash = site.hero.vimeoHash,
}: HeroVideoProps) {
  const b = site.hero.variantB;
  const testEnabled = Boolean(b.vimeoId);

  // "a" immediately when the test is off; with the test on, null during
  // SSR/hydration, then the sticky assignment on the client.
  const variant = useSyncExternalStore<Variant | null>(
    noopSubscribe,
    () => (testEnabled ? getAssignedVariant(b.weightB) : "a"),
    () => (testEnabled ? null : "a")
  );

  useEffect(() => {
    if (!testEnabled || !variant) return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "hero_video_ab",
      hero_video_variant: variant,
    });
  }, [testEnabled, variant]);

  if (!variant) return null;

  const src =
    variant === "b"
      ? vimeoBackgroundSrc(b.vimeoId, b.vimeoHash)
      : vimeoBackgroundSrc(vimeoId, vimeoHash);

  return (
    <iframe
      key={variant}
      src={src}
      title="Surroundings Group reel"
      allow="autoplay; fullscreen; picture-in-picture"
      aria-hidden="true"
      tabIndex={-1}
      style={coverStyle}
    />
  );
}
