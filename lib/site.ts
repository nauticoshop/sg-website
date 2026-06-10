/**
 * Site-wide configuration for Surroundings Group.
 * Single source of truth for nav, footer, hero video, contact info, etc.
 */

export const site = {
  name: "Surroundings Group",
  wordmark: "SURROUNDINGS GROUP",
  tagline: "The vertical-fluent agency for premium brands.",
  description:
    "Full-service creative, content, and distribution for luxury brands — built by the team behind Nautical Network's 180M+ annual viewers.",
  url: "https://surroundingsgroup.com",

  contact: {
    email: "interested@surroundingsgroup.com",
    phone: "813-869-0162",
    address: "4600 W Cypress St. Suite 500",
    city: "Tampa, FL 33607",
  },

  social: {
    instagram: "https://instagram.com/surroundingsgroup",
    vimeo: "https://vimeo.com/surroundingsgroup",
    // Add when available:
    // linkedin: "https://linkedin.com/company/surroundings-group",
    // youtube: "https://youtube.com/@surroundingsgroup",
  },

  hero: {
    // Vimeo video ID for the homepage hero. Background mode + autoplay + loop + muted.
    // To swap the banner video, change vimeoId (and vimeoHash if the video
    // is unlisted — it's the `h=` value in Vimeo's embed code; leave "" for
    // public videos).
    vimeoId: "1195210356",
    vimeoHash: "456679e373", // unlisted-video hash from Vimeo embed

    // A/B test for the hero video. Set variantB.vimeoId to enable; leave it
    // "" to turn the test off. Visitors are split by `weightB` (0.5 = 50/50)
    // and stick to their variant across visits (stored in localStorage).
    // Each pageview pushes a `hero_video_ab` event with `hero_video_variant`
    // ("a" | "b") to the GTM dataLayer for reporting.
    variantB: {
      vimeoId: "1200194773", // "SG Web Banner" — clear to stop the test
      vimeoHash: "", // public video, no hash needed
      weightB: 0.5,
    },
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Verticals", href: "/verticals" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  cta: {
    primary: { label: "Book a discovery call", href: "/discovery-call" },
    secondary: { label: "Explore our work", href: "/journal" },
  },

  // Analytics
  gtm: "GTM-5S62THWD",
} as const;

export type SiteConfig = typeof site;
