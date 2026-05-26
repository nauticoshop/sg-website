import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { featuredProjects } from "@/lib/featured-work";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Recent work from Surroundings Group — campaigns, content programs, and digital builds for brands at the top of their categories.",
};

export default function CaseStudiesPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="CASE STUDIES"
        title="Recent work for brands at the top of their categories."
        subhead="Each engagement is built for the specific dynamics of its vertical. Below are projects we're publishing as full case studies — more are in progress."
      />

      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={p.href}
                  className="group block bg-ink text-canvas overflow-hidden h-full transition-transform duration-500 hover:scale-[1.005]"
                >
                  <div className="aspect-[16/10] bg-deep relative">
                    {/* Placeholder image area */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-sans font-extrabold text-3xl lg:text-4xl text-canvas/30 text-center px-6">
                        {p.client}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 lg:p-8">
                    <div className="caption text-canvas/50 mb-3 flex items-center gap-3 flex-wrap">
                      <span>{p.vertical}</span>
                      {p.tag && (
                        <>
                          <span className="opacity-50">·</span>
                          <span>{p.tag}</span>
                        </>
                      )}
                    </div>
                    <h2 className="font-sans font-extrabold text-2xl lg:text-3xl leading-tight mb-3 group-hover:text-gold-deep transition-colors duration-300 text-balance">
                      {p.client}
                    </h2>
                    <p className="text-sm lg:text-base text-canvas/80 leading-snug mb-4">
                      {p.headline}
                    </p>
                    <span className="caption inline-flex items-center gap-2 group-hover:text-gold-deep transition-colors duration-300">
                      Read case study
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
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-16 lg:mt-20 bg-neutral-100 border border-neutral-200 p-12 lg:p-16 text-center">
            <p className="caption text-neutral-500 mb-4">MORE COMING</p>
            <p className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance max-w-2xl mx-auto">
              We&apos;re packaging additional case studies from across our
              seven verticals.
            </p>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              In the meantime, the work informs every brief.{" "}
              <Link
                href="/contact"
                className="underline hover:text-ink transition-colors"
              >
                Talk to us
              </Link>{" "}
              to see relevant projects for your category.
            </p>
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}
