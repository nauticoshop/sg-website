/**
 * Eight luxury verticals — Surroundings Group.
 * Tier 1 (4) get full landing-page treatment; Tier 2 (4) get lighter pages.
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
   * Hero photo for the vertical card. File lives in
   * `/public/images/verticals/{slug}.jpg`. Optional — if omitted, a
   * dark placeholder with the vertical name renders instead.
   */
  image?: string;
  imageAlt?: string;
}

export const verticals: Vertical[] = [
  {
    slug: "marine",
    name: "Marine",
    tagline:
      "The category where we have the deepest reach — anchored by Nautical Network.",
    description:
      "From boat builders and brokerages to charter operators and marinas, we serve the entire marine industry with content, social, and distribution at a scale no other agency can match.",
    href: "/verticals/marine",
    tier: 1,
    image: "/images/verticals/marine.jpg",
    imageAlt: "Sport-fish yacht running across calm coastal water",
  },
  {
    slug: "real-estate",
    name: "Real Estate & Development",
    tagline:
      "Developers, brokerages, builders, and the home services that bring properties to life.",
    description:
      "Cinematic project films, editorial storytelling, and integrated paid + PR — for developers building flagship properties, brokerages selling them, and the home services brands working around the luxury home.",
    href: "/verticals/real-estate",
    tier: 1,
    image: "/images/verticals/real-estate.jpg",
    imageAlt: "Luxury estate at twilight — illuminated pool, palms, two-story home",
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
    image: "/images/verticals/multifamily.jpg",
    imageAlt: "Mid-rise residential building at sunset with pool deck below",
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
    image: "/images/verticals/private-aviation.jpg",
    imageAlt: "Private jet on tarmac with airstairs down and red carpet",
  },
  {
    slug: "resorts-travel",
    name: "Resorts & Travel",
    tagline: "Visual storytelling for boutique resorts and luxury travel.",
    description:
      "Editorial-grade content and paid distribution for resorts, vacation rentals, and travel brands serving the top of the market.",
    href: "/verticals/resorts-travel",
    tier: 2,
    image: "/images/verticals/resorts-travel.jpg",
    imageAlt: "Beachfront resort villa with infinity pool and loungers",
  },
  {
    slug: "hospitality-experiences",
    name: "Hospitality & Experiences",
    tagline:
      "Hotels, restaurants, member clubs, and the curated experiences that define them.",
    description:
      "Content and distribution for hospitality brands — boutique hotels, restaurants, private clubs, spas — and the experiential brands building the next generation of premium service.",
    href: "/verticals/hospitality-experiences",
    tier: 2,
    image: "/images/verticals/hospitality-experiences.jpg",
    imageAlt: "Premium event hospitality activation — branded bar setup at a luxury concours",
  },
  {
    slug: "exotic-automotive",
    name: "Exotic Automotive",
    tagline:
      "Launch campaigns and ongoing social for dealers, collectors, and performance brands.",
    description:
      "From new-model launches to ongoing brand presence — cinematic content and audience reach for premium automotive.",
    href: "/verticals/exotic-automotive",
    tier: 2,
    image: "/images/verticals/exotic-automotive.jpg",
    imageAlt: "Mercedes G-Wagen Brabus parked on a coastal road",
  },
  {
    slug: "luxury-goods",
    name: "Luxury Goods",
    tagline:
      "Editorial campaigns for timepieces, fashion, fine spirits, and craftsmanship-led brands.",
    description:
      "When the category demands an editorial sensibility, we deliver work that feels like the magazines your customers already read.",
    href: "/verticals/luxury-goods",
    tier: 2,
    image: "/images/verticals/luxury-goods.jpg",
    imageAlt: "Silver Rolex Day-Date watch on cream backdrop",
  },
];
