/**
 * Client/brand list for the homepage logo wall.
 *
 * Pulled from the Surroundings Group + Nautical Network 2026 media kits
 * (real client work cited there). Mix of yacht builders, developers,
 * brokerages, and lifestyle brands across the verticals SG serves.
 *
 * Until real logo SVGs are uploaded, the logo wall renders names in
 * a uniform wordmark treatment — looks intentional, easy to swap to
 * real logos later by adding a `logo: "/logos/x.svg"` field.
 */

export interface Client {
  name: string;
  vertical: string;
  /** Optional: path to logo SVG once available (e.g. "/logos/bertram.svg") */
  logo?: string;
}

export const featuredClients: Client[] = [
  // From the kits — these are real cited clients
  { name: "Bertram Yachts", vertical: "Marine" },
  { name: "Marine Connection", vertical: "Marine" },
  { name: "Phil Kean Design Group", vertical: "Luxury Real Estate" },
  { name: "Ryan Hughes Design", vertical: "Luxury Real Estate" },
  { name: "NOVEL Beach Park", vertical: "Multifamily" },
  // Placeholder slots — Billy to confirm real partners for these
  { name: "Featured Charter", vertical: "Marine" },
  { name: "Premier Developer", vertical: "Luxury Real Estate" },
  { name: "Multifamily Group", vertical: "Multifamily" },
  { name: "Private Aviation Partner", vertical: "Private Aviation" },
  { name: "Luxury Resort Brand", vertical: "Resorts & Travel" },
  { name: "Performance Auto Brand", vertical: "Exotic Automotive" },
  { name: "Timepiece Maker", vertical: "Luxury Goods" },
];
