import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { verticals } from "@/lib/verticals";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/components/json-ld";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return verticals.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const vertical = verticals.find((v) => v.slug === slug);
  if (!vertical) return {};
  return {
    title: vertical.name,
    description: vertical.tagline,
  };
}

export default async function VerticalDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const vertical = verticals.find((v) => v.slug === slug);
  if (!vertical) notFound();

  const currentIndex = verticals.findIndex((v) => v.slug === slug);
  const next = verticals[(currentIndex + 1) % verticals.length];

  // Filter services to only the ones most relevant to this vertical
  const relatedServices = vertical.relatedServiceSlugs
    .map((s) => services.find((svc) => svc.slug === s))
    .filter((svc): svc is NonNullable<typeof svc> => Boolean(svc));

  const fullUrl = `${site.url.replace(/\/$/, "")}${vertical.href}`;

  return (
    <>
      <Nav />

      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Industries", url: `${site.url.replace(/\/$/, "")}/verticals` },
          { name: vertical.name, url: fullUrl },
        ])}
      />

      <PageHero
        eyebrow={
          vertical.tier === 1
            ? `FEATURED VERTICAL / ${String(currentIndex + 1).padStart(2, "0")}`
            : `VERTICAL / ${String(currentIndex + 1).padStart(2, "0")}`
        }
        title={vertical.name}
        subhead={vertical.tagline}
        tone="dark"
      />

      {/* Intro / positioning */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="caption text-gold-deep mb-4">THE CATEGORY</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.1] text-balance">
                Built specifically for {vertical.name.toLowerCase()}.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                {vertical.intro}
              </p>
              {vertical.slug === "marine" && (
                <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                  Marine clients also get direct access to{" "}
                  <Link
                    href="/about/nautical-network"
                    className="text-ink underline hover:text-gold-deep transition-colors"
                  >
                    Nautical Network distribution
                  </Link>
                  . The largest multi-platform boating outlet, 180M+ annual
                  viewers, owned media reach baked into every engagement.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Who we serve — audience segments */}
      <section className="bg-ink text-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold mb-4">WHO WE SERVE</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-canvas leading-[1.1] text-balance">
              The full ecosystem around the category.
            </h2>
          </header>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-canvas/15">
            {vertical.audienceSegments.map((segment, i) => (
              <li
                key={i}
                className="bg-ink p-8 lg:p-10 flex flex-col"
              >
                <p className="caption text-gold mb-5">
                  {String(i + 1).padStart(2, "0")} / SEGMENT
                </p>
                <h3 className="font-sans font-extrabold text-2xl lg:text-3xl text-canvas leading-tight mb-4 text-balance">
                  {segment.name}
                </h3>
                <p className="text-base text-canvas/75 leading-relaxed">
                  {segment.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Signature work — recurring plays */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="mb-12 lg:mb-16 max-w-3xl">
            <p className="caption text-gold-deep mb-4">SIGNATURE WORK</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.1] text-balance">
              The kinds of work we deliver for this category.
            </h2>
          </header>

          <ul className="space-y-px bg-neutral-200 border-y border-neutral-200">
            {vertical.signaturePlays.map((play, i) => (
              <li key={i} className="bg-canvas">
                <div className="py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  <div className="lg:col-span-1">
                    <span className="caption text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-ink leading-tight text-balance">
                      {play.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-base lg:text-lg text-neutral-700 leading-relaxed">
                      {play.copy}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities tuned to this category */}
      <section className="bg-neutral-50 py-20 lg:py-28 px-6 lg:px-12 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <header className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
            <p className="caption text-gold-deep mb-4">CAPABILITIES</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              The disciplines that move the work here.
            </h2>
          </header>

          <ul
            className={`grid grid-cols-1 gap-4 lg:gap-6 ${
              relatedServices.length === 4
                ? "md:grid-cols-2 lg:grid-cols-4"
                : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {relatedServices.map((s) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="group block bg-canvas p-6 lg:p-8 hover:bg-ink hover:text-canvas transition-colors duration-300 h-full"
                >
                  <h3 className="font-sans font-extrabold text-2xl lg:text-3xl mb-2">
                    {s.name}
                  </h3>
                  <p className="text-sm text-neutral-600 group-hover:text-canvas/70 transition-colors duration-300 leading-relaxed mb-4">
                    {s.tagline}
                  </p>
                  <span className="caption inline-flex items-center gap-2 text-neutral-500 group-hover:text-gold transition-colors duration-300">
                    Explore
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured journal entries / case studies for this vertical */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="caption text-gold-deep mb-4">SELECTED WORK</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
                Recent {vertical.name.toLowerCase()} work.
              </h2>
            </div>
            <Link
              href="/journal"
              className="caption inline-flex items-center gap-2 text-ink hover:text-gold-deep transition-colors shrink-0"
            >
              All entries
              <Arrow />
            </Link>
          </header>

          <div className="bg-neutral-100 border border-neutral-200 p-12 lg:p-20 text-center">
            <p className="caption text-neutral-500 mb-4">COMING SOON</p>
            <p className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance">
              Case studies for {vertical.name.toLowerCase()} are being
              packaged.
            </p>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              In the meantime, the work informs every brief.{" "}
              <Link
                href="/contact"
                className="underline hover:text-ink transition-colors"
              >
                Talk to us
              </Link>{" "}
              to see relevant projects.
            </p>
          </div>
        </div>
      </section>

      {/* Next vertical */}
      <section className="bg-canvas py-16 lg:py-20 px-6 lg:px-12 border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <Link href={next.href} className="group block">
            <p className="caption text-gold-deep mb-4">NEXT VERTICAL</p>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl text-ink leading-tight tracking-tight group-hover:text-gold-deep transition-colors duration-300 text-balance">
                {next.name}
              </h3>
              <svg
                width="32"
                height="20"
                viewBox="0 0 14 10"
                fill="none"
                className="text-ink group-hover:text-gold-deep transition-all duration-300 group-hover:translate-x-2 shrink-0"
                aria-hidden
              >
                <path
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </div>
            <p className="text-base lg:text-lg text-neutral-600 mt-3 max-w-2xl">
              {next.tagline}
            </p>
          </Link>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}

function Arrow() {
  return (
    <svg
      width="12"
      height="9"
      viewBox="0 0 14 10"
      fill="none"
      aria-hidden
      className="transition-transform duration-300 group-hover:translate-x-1"
    >
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
