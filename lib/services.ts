/**
 * Six services — Surroundings Group.
 * One-word names. Source of truth for homepage grid + individual service pages.
 * Copy approved by Billy 2026-05-25 (see SG Website/copy-services.md).
 */

export interface Service {
  slug: string;
  /** One-word service name */
  name: string;
  /** Confident one-line positioning statement */
  tagline: string;
  /** Longer description for cards + landing pages */
  description: string;
  /** What's included — used on service detail pages */
  capabilities: string[];
  href: string;
}

export const services: Service[] = [
  {
    slug: "studio",
    name: "Studio",
    tagline: "Premium production for brands that demand it.",
    description:
      "In-house creative production built for luxury markets — from cinematic brand films to listing videos, aerial coverage, and editorial photography. Every frame matches the standard of the brands we serve.",
    capabilities: [
      "Brand films & lifestyle video",
      "Listing & walkthrough videos",
      "Aerial & drone production",
      "Editorial & product photography",
      "Event coverage",
    ],
    href: "/services/studio",
  },
  {
    slug: "social",
    name: "Social",
    tagline: "Where premium brands live online.",
    description:
      "Full-service social presence management — strategy, content, community, and growth — executed by a team that understands how luxury audiences engage, share, and buy.",
    capabilities: [
      "Multi-platform management",
      "Content calendar & production",
      "Community engagement",
      "Influencer & creator collaboration",
      "Monthly strategy & reporting",
    ],
    href: "/services/social",
  },
  {
    slug: "digital",
    name: "Digital",
    tagline: "Websites worthy of the brands behind them.",
    description:
      "Strategy, design, build, and ongoing care for digital properties that convert as well as they look. Mobile-first, performance-obsessed, and tailored to the conventions of your vertical.",
    capabilities: [
      "Website strategy & UX",
      "Custom design & development",
      "Webflow, WordPress & custom builds",
      "Hosting, maintenance & security",
      "SEO & conversion optimization",
    ],
    href: "/services/digital",
  },
  {
    slug: "growth",
    name: "Growth",
    tagline: "Integrated demand for luxury markets.",
    description:
      "Paid advertising, public relations, email, and owned-media distribution working together as one acquisition engine. Built to reach the audiences that matter — and convert them.",
    capabilities: [
      "Paid media (Google, Meta, YouTube, LinkedIn)",
      "Public relations & press placement",
      "Email marketing & HubSpot automation",
      "Owned-media distribution",
      "Funnel & landing page optimization",
    ],
    href: "/services/growth",
  },
  {
    slug: "experiences",
    name: "Experiences",
    tagline: "Moments that become marketing.",
    description:
      "Strategy, production, and on-site activation for premium brand experiences — from boat shows to property launches to private client gatherings. We plan it, market it, capture it, and amplify it.",
    capabilities: [
      "Event strategy & production",
      "Pre-event marketing",
      "Live coverage & social activation",
      "Trade show & exhibitor support",
      "Post-event content & recaps",
    ],
    href: "/services/experiences",
  },
  {
    slug: "intelligence",
    name: "Intelligence",
    tagline: "Tech-company leverage for premium brands.",
    description:
      "Custom AI and workflow automation engineered for marketing operations, sales pipelines, and client deliverables. Built by an agency that ships its own software — not one that just talks about AI.",
    capabilities: [
      "Marketing & sales automation",
      "Custom AI agents & workflows",
      "CRM integration & lead routing",
      "Chatbots & conversational systems",
      "Internal tools & dashboards",
    ],
    href: "/services/intelligence",
  },
];
