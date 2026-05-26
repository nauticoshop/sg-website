/**
 * Audience hubs and studio markers for the global reach map.
 *
 * Cities chosen to reflect the network demographics from the Nautical
 * Network Media Kit 2025:
 *   - Americas: 46.1% (heavy US East Coast + LA + Latin America)
 *   - Europe: 21.5% (UK, France, Italy, Monaco)
 *   - Middle East: 16.2% (UAE, Saudi)
 *   - Asia: 13.9% (Singapore, Hong Kong)
 *
 * Weight 1-3 controls visual emphasis on the map (larger dot for
 * primary audience hubs).
 */

export interface MapLocation {
  city: string;
  region: string;
  coordinates: [number, number]; // [longitude, latitude]
  weight: 1 | 2 | 3;
  type: "studio" | "audience";
}

export const studioLocation: MapLocation = {
  city: "Tampa",
  region: "Florida — Studio",
  coordinates: [-82.4572, 27.9506],
  weight: 3,
  type: "studio",
};

export const audienceHubs: MapLocation[] = [
  // Americas
  { city: "Miami", region: "Florida", coordinates: [-80.1918, 25.7617], weight: 3, type: "audience" },
  { city: "New York", region: "USA East", coordinates: [-74.006, 40.7128], weight: 3, type: "audience" },
  { city: "Los Angeles", region: "USA West", coordinates: [-118.2437, 34.0522], weight: 2, type: "audience" },
  { city: "Newport", region: "Rhode Island", coordinates: [-71.3128, 41.4901], weight: 1, type: "audience" },
  { city: "Toronto", region: "Canada", coordinates: [-79.3832, 43.6532], weight: 1, type: "audience" },
  { city: "São Paulo", region: "Brazil", coordinates: [-46.6333, -23.5505], weight: 1, type: "audience" },
  // Europe
  { city: "London", region: "United Kingdom", coordinates: [-0.1276, 51.5074], weight: 3, type: "audience" },
  { city: "Monaco", region: "Monaco", coordinates: [7.4246, 43.7384], weight: 3, type: "audience" },
  { city: "Paris", region: "France", coordinates: [2.3522, 48.8566], weight: 2, type: "audience" },
  { city: "Milan", region: "Italy", coordinates: [9.19, 45.4642], weight: 2, type: "audience" },
  { city: "Palma", region: "Mallorca", coordinates: [2.6502, 39.5696], weight: 1, type: "audience" },
  // Middle East
  { city: "Dubai", region: "UAE", coordinates: [55.2708, 25.2048], weight: 3, type: "audience" },
  { city: "Abu Dhabi", region: "UAE", coordinates: [54.3773, 24.4539], weight: 2, type: "audience" },
  { city: "Riyadh", region: "Saudi Arabia", coordinates: [46.6753, 24.7136], weight: 1, type: "audience" },
  // Asia
  { city: "Singapore", region: "Singapore", coordinates: [103.8198, 1.3521], weight: 2, type: "audience" },
  { city: "Hong Kong", region: "Hong Kong", coordinates: [114.1694, 22.3193], weight: 2, type: "audience" },
  // Oceania
  { city: "Sydney", region: "Australia", coordinates: [151.2093, -33.8688], weight: 1, type: "audience" },
];
