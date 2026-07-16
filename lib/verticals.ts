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
      "Marine is the category where Surroundings Group goes deepest. We've spent years building distribution, content systems, and category fluency that no other agency at our size has. Every marine engagement gets the Nautical Network advantage baked in: an owned editorial ecosystem reaching 180M+ marine viewers a year. Most agencies have to buy reach to the marine audience. We built it.",
    audienceSegments: [
      {
        name: "Boat builders & OEMs",
        copy: "Launch films, new-model campaigns, content systems for dealer networks. We work with the brands defining the next generation of premium boat building.",
      },
      {
        name: "Brokerages & dealers",
        copy: "Listing video at the standard premium buyers expect, social engines that move inventory, and paid distribution that reaches qualified buyers, not the open market.",
      },
      {
        name: "Charter operators",
        copy: "Visual storytelling for fleets, booking-driven social, and editorial coverage across the Nautical Network channels. Built for the operators serving the top end of the charter market.",
      },
      {
        name: "Marinas, refit yards & service brands",
        copy: "Brand systems, member content, and editorial campaigns for the businesses operating around the luxury boater. We understand the marine ecosystem because we publish in it daily.",
      },
    ],
    signaturePlays: [
      {
        title: "New-model launches",
        copy: "Cinematic launch film, social campaign, paid distribution, and Nautical Network editorial coverage timed to release. Built so a model debut isn't a single moment, it's a quarter of compounding attention.",
      },
      {
        title: "Brokerage listing programs",
        copy: "Standardized listing video and photography at the level premium buyers expect, plus a social and email program that moves listings faster than the standard MLS push.",
      },
      {
        title: "Editorial integration",
        copy: "Clients get earned and owned coverage across Nautical Network's eight channels. It's the closest thing to a magazine cover for the marine audience, and it's built into the engagement.",
      },
      {
        title: "Boat show activation",
        copy: "Pre-show buildup, on-site content capture, live publishing, and post-show recap. We treat shows like the brand moments they are, not the trade-show booths most agencies make them.",
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
      "Real estate at the premium end is a category where craft matters and category fluency is non-negotiable. We work across the full ecosystem around the luxury home: the developers building flagship projects, the brokerages and agents selling them, the builders shaping them, and the design and service brands operating around them. The work is cinematic, the systems are measurable, and the engagements run long.",
    audienceSegments: [
      {
        name: "Developers",
        copy: "Pre-sales storytelling, grand-opening campaigns, and ongoing brand presence for flagship developments. From sales-center launch to post-close referral programs.",
      },
      {
        name: "Brokerages & agents",
        copy: "Listing programs that match the property, agent brand building, and lead systems that bring qualified buyers, not the open-market tire-kickers.",
      },
      {
        name: "Builders & design firms",
        copy: "Editorial portfolio work for the firms whose projects deserve magazine treatment. We make the case for craft to the audiences that care.",
      },
      {
        name: "Home services brands",
        copy: "Interior design, landscape architecture, smart-home, and the premium service categories operating around the luxury home. Brand systems and content programs that travel with the property.",
      },
    ],
    signaturePlays: [
      {
        title: "Pre-sales campaigns",
        copy: "Cinematic project film, renderings transformed into editorial storytelling, paid + PR + email working in concert. Built to drive contracted units before doors open.",
      },
      {
        title: "Grand-opening launches",
        copy: "Editorial campaign timed to opening, on-site capture, social activation, and lasting brand assets. The work that turns an opening into a year of compounding attention.",
      },
      {
        title: "Listing video programs",
        copy: "Standardized capture and edit at a level premium buyers expect, repeatable across portfolios. Built so brokers get better video on every property without the per-listing creative burden.",
      },
      {
        title: "Editorial portfolio work",
        copy: "Magazine-grade features for builders and design firms whose projects deserve more than a project gallery. Distributed through the design press and the SG editorial channels.",
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
      "Multifamily at the premium end is a content business. The properties that lease fastest are the ones whose social presence makes a prospect feel like they already live there. We build the content engine, the social presence, and the paid distribution that takes a property from announcement to stabilized occupancy, and keeps the brand running long after lease-up.",
    audienceSegments: [
      {
        name: "Lease-up properties",
        copy: "Pre-opening content programs, leasing campaigns, and resident-acquisition systems built to hit occupancy targets faster than the property pro forma assumes.",
      },
      {
        name: "Stabilized properties",
        copy: "Ongoing lifestyle content, retention programming, and brand presence for properties competing on amenity and lifestyle.",
      },
      {
        name: "Owner-operators & portfolios",
        copy: "Brand systems and content frameworks that scale across multiple properties. Built so a 12-property portfolio produces premium content without 12 agency relationships.",
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
        copy: "Tightly targeted Meta and Google campaigns, lead routing into the leasing CRM, and reporting tied to actual signed leases, not just MQLs.",
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
      "Private aviation is a category where the visual standard is set by the aircraft and the experience around it. We make work at that standard. Cinematic content for the brands and terminals serving private flight, distribution programs that reach actual charter buyers and aircraft owners, and editorial coverage that ties premium aviation into the broader luxury lifestyle.",
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
        copy: "Brand systems for the ground experience. Cinematic captures of the terminals, hangars, and member spaces that often define a brand more than the aircraft itself.",
      },
      {
        name: "Aviation service brands",
        copy: "Management companies, jet card programs, training operations, and the service ecosystem around private flight. Brand work that places these companies as the category serious operators choose.",
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
        copy: "Paid campaigns and lead systems targeting actual charter and jet-card buyers. Built around real intent signals, not aviation enthusiast traffic that never converts.",
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
      "Boutique resorts and premium travel brands win on visual standard. The places that get booked are the places that look the way the guest imagines themselves looking when they're there. We make work at that standard. Cinematic property captures, editorial campaigns timed to season, and distribution that reaches the audience that actually books at this end of the market.",
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
        copy: "Editorial-grade campaigns for places, not just properties. We build narrative around destinations the way magazines do.",
      },
    ],
    signaturePlays: [
      {
        title: "Property capture programs",
        copy: "Cinematic film and editorial photography on a recurring cadence. Built so a property's content library refreshes seasonally instead of degrading between major reshoots.",
      },
      {
        title: "Seasonal campaigns",
        copy: "Editorial campaigns timed to booking windows. Built around the cycles guests actually plan trips on, not the agency-quarter calendar.",
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
      "Premium hospitality is the category where every guest interaction is the brand. We work with hotels, restaurants, member clubs, spas, and the experiential brands shaping how premium service is delivered. The work spans content systems for daily publishing, editorial campaigns for openings and seasonal moments, and on-site activation work that turns events into a year of brand momentum.",
    audienceSegments: [
      {
        name: "Boutique hotels",
        copy: "Property storytelling, F&B content, seasonal campaigns, and direct-booking programs. Built for hotels competing on experience and visual standard, not on rate.",
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
        copy: "Event production, on-site capture, and the post-event content that turns a single night into months of brand momentum. From concours to product launches to client gatherings.",
      },
    ],
    signaturePlays: [
      {
        title: "Opening campaigns",
        copy: "Pre-opening tease through grand-opening coverage. Built so an opening event isn't the peak, it's the start of the brand's owned-attention curve.",
      },
      {
        title: "Hospitality content systems",
        copy: "The daily publishing rhythm a premium property requires. Built so the content engine runs on its own without weekly creative briefing.",
      },
      {
        title: "Event activations",
        copy: "Strategy, production, and on-site capture for events that are part marketing, part service. We treat them as brand moments and turn the assets into a year of content.",
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
      "Exotic automotive is a category that runs on cinematic content and a connected audience. We make the films and the photography, but we also bring the distribution: paid programs that reach actual buyers, editorial integration across our hospitality and aviation rosters, and an audience whose tastes overlap directly with the customer at this end of the market.",
    audienceSegments: [
      {
        name: "OEMs & performance brands",
        copy: "Launch campaigns, model storytelling, and ongoing brand presence for the manufacturers and performance houses defining the category.",
      },
      {
        name: "Dealers & retail networks",
        copy: "Brand systems for dealerships whose floor traffic is qualified buyers, plus the content programs that match.",
      },
      {
        name: "Collector ecosystems",
        copy: "Auction houses, restoration shops, broker-collectors, and the businesses operating around significant cars. Editorial work that places these brands in the buyer's eyeline.",
      },
      {
        name: "Aftermarket & service brands",
        copy: "Tuners, customization houses, and the premium service brands operating around the high-end car. Brand work that reflects the work.",
      },
    ],
    signaturePlays: [
      {
        title: "New-model reveals",
        copy: "Pre-reveal tease, launch film, social campaign, and editorial integration across automotive press and the SG editorial channels. Built so a reveal compounds across months, not one news cycle.",
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
      "Luxury goods is a category where the visual language was set by editorial. The brands that win look the way the magazines look, photograph the way fine-art catalogs photograph, and write the way fashion editors write. We work at that standard. For timepieces, fashion houses, fine spirits, and the craftsmanship-led brands shaping the next generation of premium goods.",
    audienceSegments: [
      {
        name: "Timepieces & jewelry",
        copy: "Brand storytelling, product photography, collection campaigns, and the editorial cadence the category requires. Built to match the magazines collectors already read.",
      },
      {
        name: "Fashion & accessories",
        copy: "Lookbook, campaign, and content programs for the brands defining the next generation of premium fashion. Visual standard non-negotiable.",
      },
      {
        name: "Fine spirits & wine",
        copy: "Brand systems, retail and trade campaigns, and the editorial features that build a category-defining premium spirit instead of an SKU on a shelf.",
      },
      {
        name: "Craftsmanship-led brands",
        copy: "Furniture, leather goods, audio, and the categories where the product is the brand and the story is the craft. Editorial work that matches what the maker built.",
      },
    ],
    signaturePlays: [
      {
        title: "Editorial campaigns",
        copy: "Lookbook-grade visual campaigns, art direction matched to the category, and distribution through both paid programs and the SG editorial channels. Magazine standard, agency execution.",
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
