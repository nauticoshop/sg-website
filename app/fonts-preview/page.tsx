import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Font Preview (Internal)",
  description: "Side-by-side font comparison — internal review page",
  robots: { index: false, follow: false },
};

/**
 * Internal font-comparison page. Not linked from the public site.
 *
 * Renders the same hero/H2/body/CTA content in three font systems:
 *   - Current: DM Sans (everything)
 *   - Option A: Clash Display headlines + Inter body
 *   - Option B: Satoshi (everything)
 *
 * Access via /fonts-preview. Marked noindex.
 */
export default function FontsPreviewPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink py-16 lg:py-24">
      {/* Top bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
        <p className="caption text-gold mb-2">INTERNAL — NOT PUBLIC</p>
        <h1 className="font-sans font-extrabold text-4xl lg:text-5xl tracking-tight mb-4">
          Font Comparison
        </h1>
        <p className="text-base lg:text-lg text-neutral-700 max-w-2xl leading-relaxed mb-6">
          Same hero copy, same section header, same body, rendered in three
          font systems. Pick the one that feels right and tell me which to
          commit to.
        </p>
        <Link
          href="/"
          className="caption inline-flex items-center gap-2 text-ink hover:text-gold transition-colors"
        >
          ← Back to homepage
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 space-y-12 lg:space-y-16">
        {/* CURRENT: DM Sans */}
        <FontSample
          label="A — Current: DM Sans"
          note="What's on the site now. Geometric, clean, universal. Slightly common."
          headlineClass="font-sans"
          bodyClass="font-sans"
        />

        {/* OPTION B: Clash Display + Inter */}
        <FontSample
          label="B — Clash Display (headlines) + Inter (body)"
          note="Most distinctive premium-agency feel. Clash Display has serious architectural character — feels like BIG or Bjarke Ingels. Inter is the modern body workhorse."
          headlineStyle={{ fontFamily: "'Clash Display', sans-serif" }}
          bodyStyle={{ fontFamily: "'Inter', sans-serif" }}
        />

        {/* OPTION C: Satoshi */}
        <FontSample
          label="C — Satoshi (everything)"
          note="One typeface, premium humanist. Cleaner and more universal than Clash. Feels like newer Linear / Vercel / modern SaaS-but-tasteful."
          headlineStyle={{ fontFamily: "'Satoshi', sans-serif" }}
          bodyStyle={{ fontFamily: "'Satoshi', sans-serif" }}
        />
      </div>
    </main>
  );
}

interface FontSampleProps {
  label: string;
  note: string;
  headlineClass?: string;
  bodyClass?: string;
  headlineStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}

function FontSample({
  label,
  note,
  headlineClass = "",
  bodyClass = "",
  headlineStyle,
  bodyStyle,
}: FontSampleProps) {
  return (
    <section className="border-t border-neutral-300 pt-8">
      {/* Label */}
      <div className="mb-10">
        <p className="caption text-gold mb-3">{label}</p>
        <p className="text-sm text-neutral-600 max-w-3xl">{note}</p>
      </div>

      {/* Hero-like H1 */}
      <p
        className={`caption tracking-[0.2em] text-gold mb-4 ${bodyClass}`}
        style={bodyStyle}
      >
        SURROUNDINGS GROUP
      </p>
      <h2
        className={`text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6 text-balance max-w-4xl ${headlineClass}`}
        style={headlineStyle}
      >
        An award-winning creative agency for premium markets.
      </h2>
      <p
        className={`caption tracking-[0.2em] text-gold mb-8 ${bodyClass}`}
        style={bodyStyle}
      >
        FULL-SERVICE · VERTICAL-FOCUSED · CREATIVELY CONNECTED
      </p>

      {/* Section H2 */}
      <h3
        className={`text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-6 mt-12 ${headlineClass}`}
        style={headlineStyle}
      >
        Six disciplines, one in-house team.
      </h3>

      {/* Body paragraph */}
      <p
        className={`text-base lg:text-lg text-neutral-700 leading-relaxed max-w-2xl mb-8 ${bodyClass}`}
        style={bodyStyle}
      >
        Every campaign moves through our studio under one roof — strategy,
        production, distribution, and measurement working as a single team.
        Each service is built specifically for the discipline luxury markets
        actually require.
      </p>

      {/* Stat treatment */}
      <div className="flex items-baseline gap-8 mt-12 mb-8">
        <p
          className={`text-6xl lg:text-7xl font-extrabold leading-none tracking-tight ${headlineClass}`}
          style={headlineStyle}
        >
          255M+
        </p>
        <p
          className={`text-sm lg:text-base text-neutral-600 max-w-[200px] ${bodyClass}`}
          style={bodyStyle}
        >
          Annual reach across our owned network
        </p>
      </div>

      {/* Service-card-style heading */}
      <div className="mt-10 bg-ink text-canvas p-8 lg:p-10 max-w-md">
        <p
          className={`caption text-canvas/40 mb-8 ${bodyClass}`}
          style={bodyStyle}
        >
          01 / SERVICE
        </p>
        <p
          className={`text-5xl lg:text-6xl font-extrabold leading-none tracking-tight mb-6 ${headlineClass}`}
          style={headlineStyle}
        >
          Studio
        </p>
        <p
          className={`text-base text-canvas/80 leading-snug ${bodyClass}`}
          style={bodyStyle}
        >
          Premium production for brands that demand it.
        </p>
      </div>
    </section>
  );
}
