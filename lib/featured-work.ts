/**
 * Featured projects shown on the homepage "What We're Up To" section.
 *
 * PLACEHOLDER DATA — Billy needs to confirm real client names,
 * verticals, and outcomes. Each project will eventually be a full
 * case study at /case-studies/[slug].
 */

export interface FeaturedProject {
  slug: string;
  /** Client name as displayed publicly */
  client: string;
  /** Which vertical this work falls under */
  vertical: string;
  /** Headline result — the one-line outcome */
  headline: string;
  /** Optional category/service tag */
  tag?: string;
  href: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "nautical-network",
    client: "Nautical Network",
    vertical: "Marine & Yachting",
    headline:
      "Built the largest multi-platform boating and yachting outlet from a single Instagram.",
    tag: "Studio + Social + Growth",
    href: "/case-studies/nautical-network",
  },
  {
    slug: "placeholder-real-estate",
    client: "Featured Real Estate Project",
    vertical: "Luxury Real Estate Development",
    headline:
      "Pre-sales storytelling and grand-opening campaign for a flagship luxury development.",
    tag: "Studio + Growth",
    href: "/case-studies/placeholder-real-estate",
  },
  {
    slug: "placeholder-multifamily",
    client: "Featured Multifamily Property",
    vertical: "Multifamily",
    headline:
      "Lease-up content program filling a 300-unit luxury rental community.",
    tag: "Studio + Social",
    href: "/case-studies/placeholder-multifamily",
  },
];
