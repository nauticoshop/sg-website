/**
 * Surroundings Group team data.
 *
 * Placeholder structure. Billy will fill in real team members + bios
 * + photos in a future session. Each member can become a /about/team/[slug]
 * page later if we want individual bios.
 */

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** Short bio for team grid card */
  bio: string;
  /** Department / function — used for filtering */
  department:
    | "Leadership"
    | "Creative"
    | "Strategy"
    | "Production"
    | "Operations";
}

export const team: TeamMember[] = [
  {
    slug: "billy-pavlock",
    name: "Billy Pavlock",
    role: "Founder & CEO",
    bio: "Founded Surroundings Group to bring tech-company leverage to premium brand marketing. Built Nautical Network from a single Instagram into the largest multi-platform boating outlet.",
    department: "Leadership",
  },
  // Placeholder additional members — Billy to confirm + add real teammates
  {
    slug: "creative-director",
    name: "Creative Director",
    role: "Creative Direction",
    bio: "Leads the studio's editorial sensibility across film, photography, and brand identity work.",
    department: "Creative",
  },
  {
    slug: "head-of-production",
    name: "Head of Production",
    role: "Production",
    bio: "Runs the in-house production team — cinematic capture for luxury brand films, listing videos, and editorial shoots.",
    department: "Production",
  },
  {
    slug: "head-of-growth",
    name: "Head of Growth",
    role: "Growth & Paid Media",
    bio: "Builds integrated paid + PR + email engines that turn premium brand awareness into measurable demand.",
    department: "Strategy",
  },
  {
    slug: "head-of-social",
    name: "Head of Social",
    role: "Social & Distribution",
    bio: "Plans the content calendars and community programs that keep luxury brands engaging the right audiences daily.",
    department: "Strategy",
  },
];
