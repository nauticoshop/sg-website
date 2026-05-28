/**
 * Studio Journal entries shown on the homepage feed + on /journal.
 *
 * The journal is a media hub mixing four content types:
 *   - case-study   : finished engagement with outcomes
 *   - bts          : behind-the-scenes process content
 *   - client-update: status / win posts about a current engagement
 *   - studio-news  : SG team news, hires, awards, announcements
 *
 * Image fields are optional. Drop a WebP/JPG at
 * `/public/images/work/{slug}.webp` and set `image` accordingly.
 */

export type JournalType = "case-study" | "bts" | "client-update" | "studio-news";

export interface FeaturedProject {
  slug: string;
  /** What kind of entry this is — drives the chip on the card */
  type: JournalType;
  /** Client / subject name as displayed publicly */
  client: string;
  /** Which vertical this work falls under */
  vertical: string;
  /** Headline result or hook */
  headline: string;
  /** Optional category/service tag */
  tag?: string;
  href: string;
  /** Optional hero image, /public path */
  image?: string;
  imageAlt?: string;
}

/** Human-readable label for the type chip */
export function journalTypeLabel(type: JournalType): string {
  switch (type) {
    case "case-study":
      return "CASE STUDY";
    case "bts":
      return "BEHIND THE SCENES";
    case "client-update":
      return "CLIENT UPDATE";
    case "studio-news":
      return "STUDIO NEWS";
  }
}

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "nautical-network",
    type: "case-study",
    client: "Nautical Network",
    vertical: "Marine",
    headline:
      "Built the largest multi-platform boating and yachting outlet from a single Instagram.",
    tag: "Studio + Social + Growth",
    href: "/journal/nautical-network",
  },
  {
    slug: "placeholder-real-estate",
    type: "case-study",
    client: "Featured Real Estate Project",
    vertical: "Real Estate & Development",
    headline:
      "Pre-sales storytelling and grand-opening campaign for a flagship luxury development.",
    tag: "Studio + Growth",
    href: "/journal/placeholder-real-estate",
  },
  {
    slug: "placeholder-multifamily",
    type: "case-study",
    client: "Featured Multifamily Property",
    vertical: "Multifamily",
    headline:
      "Lease-up content program filling a 300-unit luxury rental community.",
    tag: "Studio + Social",
    href: "/journal/placeholder-multifamily",
  },
];
