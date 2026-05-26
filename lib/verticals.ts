/**
 * Seven luxury verticals — Surroundings Group.
 * Tier 1 (4) get full landing-page treatment; Tier 2 (3) get lighter pages.
 */

export interface Vertical {
  slug: string;
  name: string;
  /** Short editorial positioning */
  tagline: string;
  /** Longer description for landing pages */
  description: string;
  href: string;
  /** Tier 1 = lead vertical, full landing page; Tier 2 = lighter treatment */
  tier: 1 | 2;
  /**
   * Hero photo for the card. Drop a file in `/public/images/verticals/`
   * and reference as `/images/verticals/marine.webp`. Recommended:
   * portrait 1200×1500 (4:5), WebP, <300KB. Falls back to a dark
   * placeholder with the vertical name if missing.
   */
  image?: string;
  imageAlt?: string;
}

export const verticals: Vertical[] = [
  {
    slug: "marine-yachting",
    name: "Marine & Yachting",
    tagline:
      "The category where we have the deepest reach — anchored by Nautical Network.",
    description:
      "From boat builders and brokerages to charter operators and marinas, we serve the entire marine ecosystem with content, social, and distribution at a scale no other agency can match.",
    href: "/verticals/marine-yachting",
    tier: 1,
  },
  {
    slug: "luxury-real-estate",
    name: "Luxury Real Estate Development",
    tagline:
      "From pre-sales storytelling to grand-opening campaigns for the top of the market.",
    description:
      "Cinematic project films, editorial storytelling, and integrated paid + PR for developers building flagship properties.",
    href: "/verticals/luxury-real-estate",
    tier: 1,
  },
  {
    slug: "multifamily",
    name: "Multifamily",
    tagline:
      "Lease-up campaigns and lifestyle content for amenitized properties.",
    description:
      "Built for properties competing for discerning residents — content programs, social engines, and paid demand that fills units.",
    href: "/verticals/multifamily",
    tier: 1,
  },
  {
    slug: "private-aviation",
    name: "Private Aviation",
    tagline:
      "Cinematic brand content for charter operators, OEMs, and FBOs.",
    description:
      "Production and distribution for the brands and terminals serving private flight — captured at the standard the category requires.",
    href: "/verticals/private-aviation",
    tier: 1,
  },
  {
    slug: "resorts-travel",
    name: "Resorts & Travel",
    tagline: "Visual storytelling for boutique resorts and luxury travel.",
    description:
      "Editorial-grade content and paid distribution for resorts, vacation rentals, and travel brands serving the top of the market.",
    href: "/verticals/resorts-travel",
    tier: 2,
  },
  {
    slug: "exotic-automotive",
    name: "Exotic & Luxury Automotive",
    tagline:
      "Launch campaigns and ongoing social for dealers, collectors, and performance brands.",
    description:
      "From new-model launches to ongoing brand presence — cinematic content and audience reach for premium automotive.",
    href: "/verticals/exotic-automotive",
    tier: 2,
  },
  {
    slug: "luxury-goods",
    name: "Luxury Goods & Experiences",
    tagline:
      "Editorial campaigns for timepieces, fashion, fine spirits, and experiential brands.",
    description:
      "When the category demands an editorial sensibility, we deliver work that feels like the magazines your customers already read.",
    href: "/verticals/luxury-goods",
    tier: 2,
  },
];
