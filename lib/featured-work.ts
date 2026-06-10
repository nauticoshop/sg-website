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
 *
 * Rich detail-page content lives in the optional `content` field.
 * When present, the /journal/[slug] route renders the full case
 * study layout. When absent, that route renders a "more coming"
 * placeholder using the summary fields.
 */

export type JournalType = "case-study" | "bts" | "client-update" | "studio-news";

export interface JournalOutcome {
  value: string;
  label: string;
}

export interface JournalSection {
  /** Small uppercase eyebrow (e.g. "01 / THE OPPORTUNITY") */
  eyebrow?: string;
  /** Section heading */
  heading: string;
  /** One or more body paragraphs */
  body: string[];
}

export interface JournalEntryContent {
  /** Lead paragraph — the TL;DR / setup */
  lead: string;
  /** 3-4 outcome stats shown in a hero band */
  outcomes?: JournalOutcome[];
  /** Body sections */
  sections: JournalSection[];
  /** Optional closer / takeaway */
  closer?: string;
}

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
  /** Rich detail-page content. When absent, /journal/[slug] shows
   *  a "more coming" placeholder using the summary fields. */
  content?: JournalEntryContent;
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
    image: "/images/work/skyfall/skyfall-02.jpg",
    imageAlt:
      "Top-down aerial of superyacht with tenders over gin-clear turquoise flats",
    content: {
      lead: "Surroundings Group's sister brand started as a single Instagram account. Today Nautical Network is the largest multi-platform editorial and social ecosystem in premium marine, reaching more than 180 million viewers a year across eight branded channels. It's also the distribution advantage we extend to every marine engagement we run.",
      outcomes: [
        { value: "180M+", label: "Annual viewers across the network" },
        { value: "8", label: "Owned social brands publishing daily" },
        { value: "#1", label: "Largest multi-platform marine outlet" },
        { value: "62M", label: "Annual watch minutes on owned video" },
      ],
      sections: [
        {
          eyebrow: "01 / The opportunity",
          heading: "Premium marine had no editorial home.",
          body: [
            "Yachts, sport-fishing, charter, boat builders, marinas. The premium marine category had a fragmented media landscape when Nautical Network started. Print outlets carried aging audiences. Social conversation lived scattered across enthusiast forums and brand-owned accounts that didn't talk to each other. There was no single editorial home consistently publishing category-defining content at the standard the audience actually expected.",
            "The opening was clear. Build the editorial property the category was missing, do it at premium standard, and the audience will follow.",
          ],
        },
        {
          eyebrow: "02 / What we built",
          heading: "A multi-platform editorial ecosystem.",
          body: [
            "We started with a single Instagram account. Over the next several years that grew into eight branded channels publishing daily across Instagram, TikTok, YouTube, Facebook, and the broader social ecosystem.",
            "Each channel serves a distinct sub-audience: yachting, sport-fishing, sailing, the charter category, and the lifestyle around premium boating. The format mix runs from cinematic video to editorial photography to news and commentary. The whole system is run by an in-house team that publishes at a daily cadence with a consistent editorial standard.",
          ],
        },
        {
          eyebrow: "03 / The scale today",
          heading: "180M+ annual viewers. #1 in the category.",
          body: [
            "Today Nautical Network is the largest multi-platform editorial and social ecosystem in premium marine. The eight channels combined reach more than 180 million viewers a year, with 62 million annual watch minutes on owned video.",
            "It is a real distribution channel, not a marketing claim. The audience is built, the production rhythm is steady, and the editorial standard is the floor, not the ceiling.",
          ],
        },
        {
          eyebrow: "04 / What it means for clients",
          heading: "The distribution advantage other agencies have to buy.",
          body: [
            "Every Surroundings Group marine engagement gets Nautical Network reach built in. The film we shoot for a boat builder's new model launch doesn't only run on the brand's own channels. It runs across our editorial channels too, to the exact audience that buys yachts.",
            "The math changes when distribution is owned. Most agencies have to buy reach. We built ours.",
          ],
        },
      ],
      closer:
        "Nautical Network is the proof point for the broader Surroundings Group model. We're building owned editorial properties in each of the premium categories we serve, so every client eventually gets the same distribution leverage. The marine roster has it today. The rest of the verticals are next.",
    },
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
    image: "/images/work/tranquility-estate/tranquility-estate-01.jpg",
    imageAlt:
      "Sunset view of symmetrical screened pool terrace with cabana and umbrellas",
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
    image: "/images/work/cora-residences/cora-residences-01.jpg",
    imageAlt:
      "Aerial of landscaped rooftop pool deck atop downtown residential tower",
  },
];
