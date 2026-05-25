import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { services } from "@/lib/services";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/** Pre-render all 6 service pages at build time */
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }: RouteParams) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  // Find adjacent services for the "next" link
  const currentIndex = services.findIndex((s) => s.slug === slug);
  const next = services[(currentIndex + 1) % services.length];

  return (
    <>
      <Nav />

      <PageHero
        eyebrow={`SERVICE / ${String(currentIndex + 1).padStart(2, "0")}`}
        title={service.name}
        subhead={service.tagline}
        tone="dark"
      />

      {/* What's included */}
      <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="caption text-gold mb-4">WHAT&apos;S INCLUDED</p>
              <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink leading-[1.1] text-balance">
                Built around what {service.name.toLowerCase()} actually
                requires.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="space-y-4 lg:space-y-5">
                {service.capabilities.map((cap, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-4 pb-4 lg:pb-5 border-b border-neutral-200 last:border-b-0"
                  >
                    <span className="caption text-gold pt-1 shrink-0 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base lg:text-lg text-ink">{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-neutral-50 py-20 lg:py-28 px-6 lg:px-12 border-y border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <header className="text-center mb-12 lg:mb-16 max-w-2xl mx-auto">
            <p className="caption text-gold mb-4">HOW WE WORK</p>
            <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
              A four-step process. Every time.
            </h2>
          </header>

          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                copy: "We learn the brand, the audience, and the constraints. Then we tell you whether we're the right fit.",
              },
              {
                step: "02",
                title: "Strategy",
                copy: "We translate the brief into a measurable plan with deliverables, timelines, and a clear definition of success.",
              },
              {
                step: "03",
                title: "Execution",
                copy: "In-house production. No handoffs. The team that planned it is the team that ships it.",
              },
              {
                step: "04",
                title: "Iteration",
                copy: "We measure, learn, and refine. Premium brand work compounds over time, not in a single campaign burst.",
              },
            ].map((step) => (
              <li key={step.step} className="bg-canvas p-6 lg:p-8">
                <p className="caption text-gold mb-4">{step.step}</p>
                <h3 className="font-sans font-extrabold text-xl lg:text-2xl text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Next service navigation */}
      <section className="bg-canvas py-16 lg:py-20 px-6 lg:px-12 border-b border-neutral-200">
        <div className="max-w-[1200px] mx-auto">
          <Link href={next.href} className="group block">
            <p className="caption text-gold mb-4">NEXT SERVICE</p>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-7xl text-ink leading-none tracking-tight group-hover:text-gold transition-colors duration-300">
                {next.name}
              </h3>
              <svg
                width="32"
                height="20"
                viewBox="0 0 14 10"
                fill="none"
                className="text-ink group-hover:text-gold transition-all duration-300 group-hover:translate-x-2 shrink-0"
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
