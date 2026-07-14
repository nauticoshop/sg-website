/**
 * Lightweight conversion-event tracking.
 *
 * Events are pushed onto GTM's dataLayer (the container is installed
 * globally in app/layout.tsx). GTM forwards them to GA4 via a single
 * "Custom Event → GA4 Event" tag pair — see the setup note in the
 * repo docs / GTM workspace.
 *
 * Event vocabulary (keep this list in sync with GTM's trigger regex):
 *   contact_form_submit    — contact form successfully sent
 *   discovery_call_booked  — Calendly inline booking completed
 *   phone_click            — any tel: link clicked
 *   email_click            — any mailto: link clicked
 *   book_cta_click         — any link into /discovery-call clicked
 */

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
}
