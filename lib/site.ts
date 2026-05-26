/**
 * Site-wide configuration for Surroundings Group.
 * Single source of truth for nav, footer, hero video, contact info, etc.
 */

export const site = {
  name: "Surroundings Group",
  wordmark: "SURROUNDINGS GROUP",
  tagline: "An award-winning creative agency for premium markets.",
  description:
    "Full-service creative, content, and distribution for luxury brands — built by the team behind Nautical Network's 180M+ annual viewers.",
  url: "https://surroundingsgroup.com",

  contact: {
    email: "hello@surroundingsgroup.com",
    phone: "727-810-1770",
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
    vimeoId: "1195210356",
    vimeoHash: "456679e373", // unlisted-video hash from Vimeo embed
  },

  nav: [
    { label: "Services", href: "/services" },
    { label: "Verticals", href: "/verticals" },
    { label: "Editorial", href: "/editorial" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  cta: {
    primary: { label: "Book a discovery call", href: "/discovery-call" },
    secondary: { label: "Explore our work", href: "/case-studies" },
  },

  // Analytics
  gtm: "GTM-5S62THWD",
} as const;

export type SiteConfig = typeof site;
