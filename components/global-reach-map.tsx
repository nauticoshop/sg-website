"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import {
  audienceHubs,
  projectLocations,
  studioLocation,
} from "@/lib/locations";

/**
 * Premium dark-mode world map showing studio location + global audience hubs.
 *
 * Uses react-simple-maps with the standard 110m world-atlas topojson.
 * Tampa is marked as the studio (gold accent + ring); audience cities are
 * gold dots sized by weight (1-3) reflecting the network demographics from
 * the Nautical Network Media Kit 2025.
 */

// Topojson — bundled in node_modules via the world-atlas package
const geoUrl = "/world-110m.json";

interface MarkerData {
  coordinates: [number, number];
  city: string;
  region: string;
  weight: 1 | 2 | 3;
  type: "studio" | "audience" | "project";
}

export function GlobalReachMap() {
  const [hovered, setHovered] = useState<MarkerData | null>(null);

  return (
    <div className="relative w-full">
      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 160 }}
        width={980}
        height={480}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[20, 30]} zoom={1} disablePanning disableZooming>
          {/* Country outlines */}
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: Array<{ rsmKey: string }> }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1c1a18"
                  stroke="#2e2b27"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#2e2b27" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Studio marker — Tampa */}
          <Marker
            coordinates={studioLocation.coordinates}
            onMouseEnter={() =>
              setHovered({ ...studioLocation, type: "studio" })
            }
            onMouseLeave={() => setHovered(null)}
          >
            {/* Outer pulse ring */}
            <circle
              r={12}
              fill="none"
              stroke="#FFBD84"
              strokeWidth={1}
              opacity={0.4}
            />
            <circle
              r={7}
              fill="none"
              stroke="#FFBD84"
              strokeWidth={1.2}
              opacity={0.8}
            />
            <circle r={4} fill="#FFBD84" />
            <text
              y={-18}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-dm-sans), system-ui",
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.1em",
                fill: "#FFBD84",
                textTransform: "uppercase",
              }}
            >
              Studio
            </text>
          </Marker>

          {/* Audience hub markers */}
          {audienceHubs.map((hub) => (
            <Marker
              key={`${hub.city}-${hub.coordinates[0]}`}
              coordinates={hub.coordinates}
              onMouseEnter={() => setHovered({ ...hub })}
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                r={hub.weight * 1.5 + 1}
                fill="#FFBD84"
                opacity={0.85}
                style={{ transition: "all 200ms ease", cursor: "pointer" }}
              />
              <circle
                r={hub.weight * 1.5 + 1}
                fill="none"
                stroke="#FFBD84"
                strokeWidth={1}
                opacity={0.25}
                style={{
                  transform: `scale(${hub.weight + 1})`,
                  transformOrigin: "center",
                  transformBox: "fill-box",
                }}
              />
            </Marker>
          ))}

          {/* Project & shoot markers — hollow canvas-white rings so they
              read distinctly from the gold audience dots */}
          {projectLocations.map((p) => (
            <Marker
              key={`${p.city}-${p.coordinates[0]}`}
              coordinates={p.coordinates}
              onMouseEnter={() => setHovered({ ...p })}
              onMouseLeave={() => setHovered(null)}
            >
              <circle
                r={p.weight * 1.5 + 2.5}
                fill="none"
                stroke="#f7f4f0"
                strokeWidth={1.4}
                opacity={0.9}
                style={{ cursor: "pointer" }}
              />
              <circle r={1.6} fill="#f7f4f0" opacity={0.9} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Hover tooltip */}
      <div
        className={`absolute top-4 right-4 lg:top-6 lg:right-6 bg-canvas/95 text-ink px-4 py-3 transition-opacity duration-200 pointer-events-none ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {hovered && (
          <>
            <p className="caption text-gold mb-1">
              {hovered.type === "studio"
                ? "STUDIO"
                : hovered.type === "project"
                  ? "ON LOCATION"
                  : "AUDIENCE HUB"}
            </p>
            <p className="font-sans font-extrabold text-base leading-none">
              {hovered.city}
            </p>
            <p className="text-xs text-neutral-600 mt-1">{hovered.region}</p>
          </>
        )}
      </div>

      {/* Marker key */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        <span className="caption text-canvas/60 inline-flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full bg-gold"
            aria-hidden
          />
          Audience hubs
        </span>
        <span className="caption text-canvas/60 inline-flex items-center gap-2">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full border border-canvas"
            aria-hidden
          />
          Shoots &amp; projects
        </span>
      </div>

      {/* Region legend at bottom */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 max-w-3xl mx-auto">
        <RegionStat region="Americas" pct="46%" />
        <RegionStat region="Europe" pct="22%" />
        <RegionStat region="Middle East" pct="16%" />
        <RegionStat region="Asia & Pacific" pct="14%" />
      </div>
    </div>
  );
}

function RegionStat({ region, pct }: { region: string; pct: string }) {
  return (
    <div className="text-center">
      <p className="font-sans font-extrabold text-2xl lg:text-3xl text-canvas leading-none mb-2">
        {pct}
      </p>
      <p className="caption text-canvas/60">{region}</p>
    </div>
  );
}
