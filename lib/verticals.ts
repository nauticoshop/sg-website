/**
 * Eight premium verticals — Surroundings Group.
 * Tier 1 (4) get full landing-page treatment; Tier 2 (4) get lighter pages.
 *
 * Data shape extended (2026-05-29) with rich detail-page fields:
 *   - intro            : positioning paragraph for the detail page
 *   - audienceSegments : who-we-serve breakouts within the vertical
 *   - signaturePlays   : recurring work patterns we deliver for this vertical
 *   - relatedServiceSlugs : services most relevant to this vertical
 *
 * The homepage card still uses `tagline`. The detail page uses
 * everything below.
 */

export interface AudienceSegment {
  name: string;
  copy: string;
}

export interface SignaturePlay {
  title: string;
  copy: string;
}

export interface Vertical {
  slug: string;
  name: string;
  /** Short editorial positioning shown on the homepage vertical card */
  tagline: string;
  /** Longer description (legacy field; still used in some places) */
  description: string;
  href: string;
  /** Tier 1 = lead vertical, full landing page; Tier 2 = lighter treatment */
  tier: 1 | 2;
  /**
   * Rich positioning paragraph for the detail page intro.
   * 2-3 sentences. No em-dashes, no triadic lists.
   */
  intro: string;
  /**
   * Who within this vertical we serve. Drives the "Who we serve"
   * section on the detail page.
   */
  audienceSegments: AudienceSegment[];
  /**
   * Recurring work patterns we deliver for this category.
   * Drives the "Signature work" section on the detail page.
   */
  signaturePlays: SignaturePlay[];
  /**
   * Service slugs most relevant to this vertical. Drives the
   * "Capabilities tuned to this category" section. Order matters.
   */
  relatedServiceSlugs: string[];
  /** Per-page section headlines so detail pages read authored, not templated */
  headlines: {
    intro: string;
    who: string;
    work: string;
    capabilities: string;
  };
  /**
   * Hero photo for the vertical card. File lives in
   * `/public/images/verticals/{slug}.jpg`. Optional.
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
    headlines: {
      intro: "Our home water.",
      who: "Everyone who builds, sells, and runs the water.",
      work: "The plays we run in marine.",
      capabilities: "The disciplines behind the marine roster.",
    },
    tier: 1,
    image: "/images/verticals/marine.jpg",
    imageAlt: "Sport-fish yacht running across calm coastal water",
    intro:
      "Marine is our deepest category. We've worked in it for years, and we own Nautical Network — a marine media network reaching 180M+ viewers a year. Every marine client gets that distribution included.",
    audienceSegments: [
      {
        name: "Boat builders & OEMs",
        copy: "Launch films, new-model campaigns, and content for dealer networks.",
      },
      {
        name: "Brokerages & dealers",
        copy: "Listing video and photography, social that moves inventory, and ads aimed at qualified buyers.",
      },
      {
        name: "Charter operators",
        copy: "Fleet films, social that drives bookings, and coverage across Nautical Network's channels.",
      },
      {
        name: "Marinas, refit yards & service brands",
        copy: "Branding, member content, and campaigns for the businesses around the boater.",
      },
    ],
    signaturePlays: [
      {
        title: "New-model launches",
        copy: "Launch film, social campaign, paid ads, and Nautical Network coverage — all timed to the reveal.",
      },
      {
        title: "Brokerage listing programs",
        copy: "Consistent listing video and photography for every boat, plus a social and email program that gets listings seen.",
      },
      {
        title: "Editorial integration",
        copy: "Coverage across Nautical Network's eight channels, built into every marine engagement.",
      },
      {
        title: "Boat show activation",
        copy: "Pre-show buildup, on-site capture, live publishing, and a post-show recap.",
      },
    ],
    relatedServiceSlugs: ["studio", "social", "growth", "experiences"],
  },
  {
    slug: "real-estate",
    name: "Real Estate + Development",
    tagline:
      "Developers, brokerages, builders, and the home services that bring properties to life.",
    description:
      "Cinematic project films, editorial storytelling, and integrated paid + PR — for developers building flagship properties, brokerages selling them, and the home services brands working around the luxury home.",
    href: "/verticals/real-estate",
    headlines: {
      intro: "Built around the luxury home.",
      who: "From groundbreaking to grand opening.",
      work: "How we move premium property.",
      capabilities: "The disciplines behind the listings.",
    },
    tier: 1,
    image: "/images/verticals/real-estate.jpg",
    imageAlt: "Luxury estate at night — illuminated pool, waterfall feature, dramatic landscape lighting",
    intro:
      "We work across everything around the luxury home: developers building flagship projects, the brokerages selling them, the builders shaping them, and the design and service brands around them.",
    audienceSegments: [
      {
        name: "Developers",
        copy: "Pre-sales storytelling, grand-opening campaigns, and ongoing brand presence for flagship developments. From sales-center launch to post-close referral programs.",
      },
      {
        name: "Brokerages & agents",
        copy: "Listing programs that match the property, agent brand building, and lead systems that bring in qualified buyers.",
      },
      {
        name: "Builders & design firms",
        copy: "Magazine-grade portfolio films and photography for builders and design firms.",
      },
      {
        name: "Home services brands",
        copy: "Interior design, landscape architecture, smart-home, and the premium service categories operating around the luxury home. Brand systems and content programs that travel with the property.",
      },
    ],
    signaturePlays: [
      {
        title: "Pre-sales campaigns",
        copy: "Project film, renderings turned into real content, and paid ads, PR, and email that sell units before doors open.",
      },
      {
        title: "Grand-opening launches",
        copy: "A campaign timed to opening day: on-site capture, social, and brand assets the property keeps using.",
      },
      {
        title: "Listing video programs",
        copy: "Repeatable capture and edit, so every property gets premium video without starting from scratch each listing.",
      },
      {
        title: "Editorial portfolio work",
        copy: "Magazine-style features for builders and design firms, distributed through the design press and our own channels.",
      },
    ],
    relatedServiceSlugs: ["studio", "growth", "social", "digital"],
  },
  {
    slug: "multifamily",
    name: "Multifamily",
    tagline:
      "Lease-up campaigns and lifestyle content for amenitized properties.",
    description:
      "Built for properties competing for discerning residents — content programs, social engines, and paid demand that fills units.",
    href: "/verticals/multifamily",
    headlines: {
      intro: "Lease-ups are a content business.",
      who: "From lease-up to stabilized and beyond.",
      work: "The programs that fill buildings.",
      capabilities: "The disciplines that drive occupancy.",
    },
    tier: 1,
    image: "/images/verticals/multifamily.jpg",
    imageAlt: "Mid-rise residential building at sunset with pool deck below",
    intro:
      "The properties that lease fastest are the ones people can already picture living in. We build the content, social presence, and paid ads that take a property from announcement to full occupancy.",
    audienceSegments: [
      {
        name: "Lease-up properties",
        copy: "Pre-opening content, leasing campaigns, and resident acquisition built to hit occupancy targets fast.",
      },
      {
        name: "Stabilized properties",
        copy: "Ongoing lifestyle content, retention programming, and brand presence for properties competing on amenity and lifestyle.",
      },
      {
        name: "Owner-operators & portfolios",
        copy: "One brand system that covers the whole portfolio — no separate agency for every property.",
      },
      {
        name: "Branded residences",
        copy: "Multifamily that carries a hotel or hospitality brand name needs both consumer brand discipline and lease-velocity outcomes. We build for both.",
      },
    ],
    signaturePlays: [
      {
        title: "Lease-up content programs",
        copy: "Pre-opening through stabilization. Built to translate construction milestones, amenity reveals, and resident events into a continuous social presence that drives qualified leasing traffic.",
      },
      {
        title: "Resident lifestyle channels",
        copy: "Property-specific Instagram, TikTok, and editorial content that makes prospective residents feel the building before they tour it. Renewals get easier when residents already follow the place they live.",
      },
      {
        title: "Paid lead engines",
        copy: "Targeted Meta and Google campaigns, leads routed into the leasing CRM, and reporting tied to signed leases.",
      },
      {
        title: "Portfolio brand systems",
        copy: "For owner-operators with multiple properties. One brand framework, repeatable templates, and a content pipeline that scales without proportionally scaling the cost.",
      },
    ],
    relatedServiceSlugs: ["social", "growth", "studio", "digital"],
  },
  {
    slug: "private-aviation",
    name: "Private Aviation",
    tagline:
      "Cinematic brand content for charter operators, OEMs, and FBOs.",
    description:
      "Production and distribution for the brands and terminals serving private flight — captured at the standard the category requires.",
    href: "/verticals/private-aviation",
    headlines: {
      intro: "Work at altitude.",
      who: "The whole ecosystem around private flight.",
      work: "The campaigns that move aircraft.",
      capabilities: "The disciplines behind the fleet.",
    },
    tier: 1,
    image: "/images/verticals/private-aviation.jpg",
    imageAlt: "Private jet on tarmac with airstairs down and red carpet",
    intro:
      "Cinematic content for the brands and terminals serving private flight, ads that reach real charter buyers and owners, and editorial coverage that connects aviation to the rest of the luxury lifestyle.",
    audienceSegments: [
      {
        name: "Charter operators",
        copy: "Brand films, fleet content, route campaigns, and member-acquisition systems for the operators serving the top end of the on-demand market.",
      },
      {
        name: "Aircraft OEMs",
        copy: "Launch campaigns for new models, ongoing brand presence, and dealer-network content programs for the manufacturers shaping the category.",
      },
      {
        name: "FBOs & terminals",
        copy: "Brand work and film for terminals, hangars, and member spaces.",
      },
      {
        name: "Aviation service brands",
        copy: "Brand work for management companies, jet card programs, and training operations.",
      },
    ],
    signaturePlays: [
      {
        title: "Fleet & terminal films",
        copy: "Cinematic capture of aircraft, terminals, and member spaces. Aerial cinematography, interior coverage, and brand storytelling at the standard private aviation buyers expect.",
      },
      {
        title: "New-model & route launches",
        copy: "Campaign builds tied to a specific event: a new aircraft entering service, a new route opening, a new terminal coming online. Cinematic asset capture plus paid + PR + owned distribution.",
      },
      {
        title: "Member-acquisition programs",
        copy: "Paid campaigns and lead systems aimed at real charter and jet-card buyers.",
      },
      {
        title: "Cross-category integration",
        copy: "Aviation clients get visibility across our automotive, hospitality, and luxury goods rosters. The same buyer who charters a jet often owns the car and stays at the resort.",
      },
    ],
    relatedServiceSlugs: ["studio", "growth", "social", "experiences"],
  },
  {
    slug: "resorts-travel",
    name: "Resorts + Travel",
    tagline: "Visual storytelling for boutique resorts and luxury travel.",
    description:
      "Editorial-grade content and paid distribution for resorts, vacation rentals, and travel brands serving the top of the market.",
    href: "/verticals/resorts-travel",
    headlines: {
      intro: "Built for the booking window.",
      who: "The properties, and the people who fill them.",
      work: "The campaigns that drive direct bookings.",
      capabilities: "The disciplines behind the stay.",
    },
    tier: 2,
    image: "/images/verticals/resorts-travel.jpg",
    imageAlt: "Eye-level view of a Caribbean luxury villa — infinity pool, loungers, dramatic sky",
    intro:
      "The places that get booked are the places that look incredible online. We shoot properties at that standard, run campaigns timed to booking seasons, and put them in front of the people who actually book.",
    audienceSegments: [
      {
        name: "Boutique resorts & villas",
        copy: "Property captures, seasonal campaigns, and direct-booking content programs for resorts and rental portfolios competing on visual and service standard.",
      },
      {
        name: "Travel brands & tour operators",
        copy: "Brand storytelling for the operators selling curated travel. Built around itinerary content, destination editorial, and the lifestyle their guest already lives.",
      },
      {
        name: "Destinations & tourism boards",
        copy: "Campaigns for destinations, built like magazine features.",
      },
    ],
    signaturePlays: [
      {
        title: "Property capture programs",
        copy: "Film and photography on a seasonal schedule, so the content library stays fresh year-round.",
      },
      {
        title: "Seasonal campaigns",
        copy: "Campaigns timed to when guests actually plan their trips.",
      },
      {
        title: "Direct-booking funnels",
        copy: "Paid plus owned-media plus on-property capture, working together to drive bookings through the property's own channels instead of paying OTA commissions.",
      },
    ],
    relatedServiceSlugs: ["studio", "social", "growth"],
  },
  {
    slug: "hospitality-experiences",
    name: "Hospitality + Experiences",
    tagline:
      "Hotels, restaurants, member clubs, and the curated experiences that define them.",
    description:
      "Content and distribution for hospitality brands — boutique hotels, restaurants, private clubs, spas — and the experiential brands building the next generation of premium service.",
    href: "/verticals/hospitality-experiences",
    headlines: {
      intro: "Every guest interaction is the brand.",
      who: "Hotels, tables, clubs, and the nights between.",
      work: "The programs that fill rooms and covers.",
      capabilities: "The disciplines behind the experience.",
    },
    tier: 2,
    image: "/images/verticals/hospitality-experiences.jpg",
    imageAlt: "Premium event hospitality activation — branded bar setup at a luxury concours",
    intro:
      "We work with hotels, restaurants, member clubs, and spas — daily content, opening and seasonal campaigns, and on-site event coverage.",
    audienceSegments: [
      {
        name: "Boutique hotels",
        copy: "Property films, food and drink content, seasonal campaigns, and direct-booking programs.",
      },
      {
        name: "Restaurants & chef-led concepts",
        copy: "Brand systems, food and chef storytelling, opening campaigns, and the ongoing content rhythm that fills covers and supports a concept past its first six months.",
      },
      {
        name: "Member clubs & private spaces",
        copy: "Brand work for the clubs whose discretion is part of the value. Content programs that reflect the membership without compromising it.",
      },
      {
        name: "Activations & experiential brands",
        copy: "Event production, on-site capture, and post-event content. From concours to product launches to client gatherings.",
      },
    ],
    signaturePlays: [
      {
        title: "Opening campaigns",
        copy: "Pre-opening tease through grand-opening coverage, with assets the brand keeps publishing long after.",
      },
      {
        title: "Hospitality content systems",
        copy: "Daily publishing for the property, run by us — no weekly creative briefings needed.",
      },
      {
        title: "Event activations",
        copy: "Strategy, production, and on-site capture — then the event footage becomes months of content.",
      },
    ],
    relatedServiceSlugs: ["studio", "experiences", "social", "growth"],
  },
  {
    slug: "exotic-automotive",
    name: "Exotic Automotive",
    tagline:
      "Launch campaigns and ongoing social for dealers, collectors, and performance brands.",
    description:
      "From new-model launches to ongoing brand presence — cinematic content and audience reach for premium automotive.",
    href: "/verticals/exotic-automotive",
    headlines: {
      intro: "Cinema for the machines that deserve it.",
      who: "From the factory floor to the collector's garage.",
      work: "The campaigns that move metal.",
      capabilities: "The disciplines behind the reveal.",
    },
    tier: 2,
    image: "/images/verticals/exotic-automotive.jpg",
    imageAlt: "Mercedes G-Wagen Brabus parked on a coastal road",
    intro:
      "We make the films and photography, and we bring the distribution: paid campaigns that reach real buyers, plus placement across our hospitality and aviation rosters, where the same customer lives.",
    audienceSegments: [
      {
        name: "OEMs & performance brands",
        copy: "Launch campaigns, model storytelling, and ongoing brand presence for the manufacturers and performance houses defining the category.",
      },
      {
        name: "Dealers & retail networks",
        copy: "Branding and content programs for dealerships selling to qualified buyers.",
      },
      {
        name: "Collector ecosystems",
        copy: "Auction houses, restoration shops, and the businesses around significant cars.",
      },
      {
        name: "Aftermarket & service brands",
        copy: "Tuners, customization houses, and premium service brands around the high-end car.",
      },
    ],
    signaturePlays: [
      {
        title: "New-model reveals",
        copy: "Pre-reveal tease, launch film, social campaign, and press coverage — planned to run for months, not one news cycle.",
      },
      {
        title: "Hero film programs",
        copy: "Cinematic capture of single significant cars. The film, the photography, the social cutdowns, and the campaign assets that make a car a brand moment.",
      },
      {
        title: "Cross-category placements",
        copy: "Automotive clients regularly appear in our hospitality and aviation work. A car can headline a member event, anchor a resort campaign, or stage at a private aviation terminal. The verticals collaborate.",
      },
    ],
    relatedServiceSlugs: ["studio", "social", "growth", "experiences"],
  },
  {
    slug: "luxury-goods",
    name: "Luxury Goods",
    tagline:
      "Magazine-grade campaigns for timepieces, fashion, fine spirits, and craftsmanship-led brands.",
    description:
      "When the category demands an editorial sensibility, we deliver work that feels like the magazines your customers already read.",
    href: "/verticals/luxury-goods",
    headlines: {
      intro: "Editorial standard, atelier discipline.",
      who: "Makers, houses, and the craft between.",
      work: "The campaigns built like collections.",
      capabilities: "The disciplines behind the brand.",
    },
    tier: 2,
    image: "/images/verticals/luxury-goods.jpg",
    imageAlt: "Silver Rolex Day-Date watch on cream backdrop",
    intro:
      "Campaigns for timepieces, fashion, fine spirits, and craftsmanship-led brands — shot and written at the standard of the magazines your customers already read.",
    audienceSegments: [
      {
        name: "Timepieces & jewelry",
        copy: "Brand films, product photography, and collection campaigns.",
      },
      {
        name: "Fashion & accessories",
        copy: "Lookbooks, campaigns, and content programs for premium fashion brands.",
      },
      {
        name: "Fine spirits & wine",
        copy: "Branding, retail and trade campaigns, and editorial features for premium spirits and wine.",
      },
      {
        name: "Craftsmanship-led brands",
        copy: "Furniture, leather goods, audio — categories where the product is the brand and the story is the craft.",
      },
    ],
    signaturePlays: [
      {
        title: "Editorial campaigns",
        copy: "Lookbook-grade campaigns with matched art direction, distributed through paid ads and our own channels.",
      },
      {
        title: "Collection launches",
        copy: "Capsule and seasonal collection launches. The film, the photography, the press distribution, and the social activation working as one campaign.",
      },
      {
        title: "Cross-category placement",
        copy: "Luxury goods clients regularly anchor moments in our hospitality, automotive, and aviation work. A watch reveal at a private terminal, a fashion drop at a member club, a spirit anchoring a concours. The verticals collaborate.",
      },
    ],
    relatedServiceSlugs: ["studio", "growth", "social"],
  },
];
