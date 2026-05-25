import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { verticals } from "@/lib/verticals";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Seven luxury verticals served by Surroundings Group — marine, real estate development, multifamily, private aviation, resorts, automotive, and luxury goods.",
};

export default function VerticalsIndexPage() {
  const tier1 = verticals.filter((v) => v.tier === 1);
  const tier2 = verticals.filter((v) => v.tier === 2);

  return (
    <>
      <Nav />

      <PageHero
        eyebrow="INDUSTRIES WE SERVE"
        title="Vertical-focused. Never generalist."
        subhead="We work deeply in seven luxury categories — building the kind of category expertise generalist agencies can't replicate."
      />

      {/* Featured (Tier 1) verticals */}
      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12">
            <p className="caption text-gold mb-4">FEATURED VERTICALS</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance max-w-3xl">
              Where we go deepest.
            </h2>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {tier1.map((v) => (
              <VerticalRow key={v.slug} vertical={v} featured />
            ))}
          </ul>
        </div>
      </section>

      {/* Tier 2 verticals */}
      <section className="bg-neutral-50 py-16 lg:py-24 px-6 lg:px-12 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12">
            <p className="caption text-gold mb-4">ALSO SERVING</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance max-w-3xl">
              Categories where we&apos;re building category specialists.
            </h2>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tier2.map((v) => (
              <VerticalRow key={v.slug} vertical={v} />
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}

function VerticalRow({
  vertical,
  featured = false,
}: {
  vertical: (typeof verticals)[number];
  featured?: boolean;
}) {
  return (
    <li>
      <Link
        href={vertical.href}
        className="group block bg-ink text-canvas p-6 lg:p-8 h-full transition-transform duration-500 hover:scale-[1.01]"
      >
        {featured && (
          <p className="caption text-gold mb-4">FEATURED</p>
        )}
        <h3 className="font-sans font-extrabold text-2xl lg:text-3xl leading-tight mb-3 text-balance">
          {vertical.name}
        </h3>
        <p className="text-sm lg:text-base text-canvas/70 leading-relaxed mb-6">
          {vertical.tagline}
        </p>
        <span className="caption inline-flex items-center gap-2 group-hover:text-gold transition-colors duration-300">
          Explore
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden
          >
            <path
              d="M1 5h12m0 0L9 1m4 4L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </span>
      </Link>
    </li>
  );
}
