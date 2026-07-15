"use client";

import Script from "next/script";

/**
 * Inline Calendly booking calendar.
 *
 * Renders Calendly's embed widget directly in the page so visitors
 * book without leaving the site. The widget hydrates when Calendly's
 * external script loads (lazyOnload keeps it off the critical path).
 *
 * Brand-matched via Calendly's URL theming params:
 *   background_color / text_color / primary_color (hex, no #).
 */
export function CalendlyEmbed({
  url = "https://calendly.com/surroundingsgroup/30min",
}: {
  url?: string;
}) {
  const themed = `${url}?hide_gdpr_banner=1&background_color=f7f4f0&text_color=0f0f0f&primary_color=0f0f0f`;

  return (
    <>
      <div
        className="calendly-inline-widget w-full"
        data-url={themed}
        style={{ minWidth: "320px", height: "760px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
