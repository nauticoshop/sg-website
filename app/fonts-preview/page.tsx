import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Font Preview (Internal)",
  description: "Side-by-side font comparison — internal review page",
  robots: { index: false, follow: false },
};

/**
 * Internal font-comparison page (not linked from public site, noindex).
 *
 * Updated for clearer differentiation:
 *   - Character samples top of each section so the distinct
 *     letterforms are visible (R, g, a, &, etc.)
 *   - Larger sample sizes
 *   - Weight comparisons
 *   - Real hero copy in context
 */
export default function FontsPreviewPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink py-12 lg:py-16">
      {/* Top bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
        <p className="caption text-gold mb-2">INTERNAL — NOT PUBLIC</p>
        <h1 className="font-sans font-extrabold text-3xl lg:text-4xl tracking-tight mb-3">
          Font Comparison
        </h1>
        <p className="text-base text-neutral-700 max-w-2xl leading-relaxed mb-4">
          Three font systems, same content. Look at the giant character row
          first (R, g, a, &, %) — that&apos;s where the differences are
          obvious. Then scroll the full hero treatment.
        </p>
        <div className="bg-neutral-100 border border-neutral-300 p-3 text-xs text-neutral-700 max-w-2xl mb-4">
          <strong>If they still look the same:</strong> Fontshare fonts may
          not have loaded. Try hard-refresh (⌘⇧R), check console for errors,
          or try in an incognito window.
        </div>
        <Link
          href="/"
          className="caption inline-flex items-center gap-2 text-ink hover:text-gold transition-colors"
        >
          ← Back to homepage
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-16 lg:space-y-20">
        <FontSample
          label="A — DM Sans (CURRENT)"
          note="Geometric Google Font. What's on the site right now."
          fontFamily="var(--font-dm-sans), system-ui, sans-serif"
        />

        <FontSample
          label="B — Clash Display + Inter"
          note="Clash Display (headlines) is architectural, condensed, has serious character — feels like BIG / Bjarke Ingels. Inter (body) is the modern body workhorse."
          fontFamily="'Clash Display', sans-serif"
          bodyFontFamily="var(--font-inter), sans-serif"
        />

        <FontSample
          label="C — Satoshi (everything)"
          note="One typeface, premium humanist. Cleaner and more universal than Clash. Feels like Linear / Vercel — modern but tasteful."
          fontFamily="'Satoshi', sans-serif"
        />
      </div>
    </main>
  );
}

interface FontSampleProps {
  label: string;
  note: string;
  fontFamily: string;
  bodyFontFamily?: string;
}

function FontSample({
  label,
  note,
  fontFamily,
  bodyFontFamily,
}: FontSampleProps) {
  const headlineStyle = { fontFamily };
  const bodyStyle = { fontFamily: bodyFontFamily ?? fontFamily };

  return (
    <section className="border-t border-neutral-300 pt-10">
      {/* Label */}
      <div className="mb-8">
        <p className="caption text-gold mb-2">{label}</p>
        <p className="text-sm text-neutral-600 max-w-3xl">{note}</p>
      </div>

      {/* CHARACTER SHOWCASE — this is where differences pop */}
      <div className="bg-ink text-canvas p-8 lg:p-10 mb-8 overflow-x-auto">
        <p className="caption text-canvas/40 mb-6">CHARACTER FORMS</p>
        <p
          className="text-[8rem] lg:text-[10rem] leading-none tracking-tight font-extrabold whitespace-nowrap"
          style={headlineStyle}
        >
          Rg & a%
        </p>
      </div>

      {/* WEIGHT LADDER */}
      <div className="bg-neutral-100 p-6 lg:p-8 mb-10 space-y-2">
        <p className="caption text-gold mb-3">WEIGHT LADDER</p>
        <p
          className="text-2xl lg:text-3xl tracking-tight"
          style={{ ...headlineStyle, fontWeight: 400 }}
        >
          Surroundings Group · 400 Regular
        </p>
        <p
          className="text-2xl lg:text-3xl tracking-tight"
          style={{ ...headlineStyle, fontWeight: 500 }}
        >
          Surroundings Group · 500 Medium
        </p>
        <p
          className="text-2xl lg:text-3xl tracking-tight"
          style={{ ...headlineStyle, fontWeight: 700 }}
        >
          Surroundings Group · 700 Bold
        </p>
        <p
          className="text-2xl lg:text-3xl tracking-tight"
          style={{ ...headlineStyle, fontWeight: 800 }}
        >
          Surroundings Group · 800 ExtraBold
        </p>
      </div>

      {/* IN CONTEXT — hero treatment */}
      <p
        className="caption tracking-[0.2em] text-gold mb-4"
        style={bodyStyle}
      >
        SURROUNDINGS GROUP
      </p>
      <h2
        className="text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 text-balance max-w-4xl"
        style={{ ...headlineStyle, fontWeight: 800 }}
      >
        An award-winning creative agency for premium markets.
      </h2>
      <p
        className="caption tracking-[0.2em] text-gold mb-8"
        style={bodyStyle}
      >
        FULL-SERVICE · VERTICAL-FOCUSED · CREATIVELY CONNECTED
      </p>

      <h3
        className="text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight mb-6 mt-10"
        style={{ ...headlineStyle, fontWeight: 800 }}
      >
        Six disciplines, one in-house team.
      </h3>

      <p
        className="text-base lg:text-lg text-neutral-700 leading-relaxed max-w-2xl mb-8"
        style={bodyStyle}
      >
        Every campaign moves through our studio under one roof — strategy,
        production, distribution, and measurement working as a single team.
        Each service is built specifically for the discipline luxury markets
        actually require.
      </p>

      <div className="flex items-baseline gap-8 mt-12 mb-8 flex-wrap">
        <p
          className="text-6xl lg:text-7xl leading-none tracking-tight"
          style={{ ...headlineStyle, fontWeight: 800 }}
        >
          255M+
        </p>
        <p
          className="text-sm lg:text-base text-neutral-600 max-w-[200px]"
          style={bodyStyle}
        >
          Annual reach across our owned network
        </p>
      </div>

      <div className="mt-10 bg-ink text-canvas p-8 lg:p-10 max-w-md">
        <p
          className="caption text-canvas/40 mb-8"
          style={bodyStyle}
        >
          01 / SERVICE
        </p>
        <p
          className="text-5xl lg:text-6xl leading-none tracking-tight mb-6"
          style={{ ...headlineStyle, fontWeight: 800 }}
        >
          Studio
        </p>
        <p
          className="text-base text-canvas/80 leading-snug"
          style={bodyStyle}
        >
          Premium production for brands that demand it.
        </p>
      </div>
    </section>
  );
}
