"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

/**
 * Site-wide conversion event listeners. Renders nothing.
 *
 * Mounted once in the root layout:
 *   1. Delegated click listener — catches every tel:, mailto:, and
 *      /discovery-call link on the site without touching individual
 *      components. New links are covered automatically.
 *   2. Calendly postMessage listener — the inline widget on
 *      /discovery-call emits calendly.event_scheduled when a booking
 *      completes; we forward it as discovery_call_booked.
 */
export function AnalyticsEvents() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_url: href, page_path: pathname });
      } else if (href.startsWith("mailto:")) {
        trackEvent("email_click", { link_url: href, page_path: pathname });
      } else if (href.startsWith("/discovery-call")) {
        trackEvent("book_cta_click", { page_path: pathname });
      }
    }

    function onMessage(e: MessageEvent) {
      if (
        e.origin === "https://calendly.com" &&
        typeof e.data === "object" &&
        e.data?.event === "calendly.event_scheduled"
      ) {
        trackEvent("discovery_call_booked", { page_path: pathname });
      }
    }

    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, [pathname]);

  return null;
}
