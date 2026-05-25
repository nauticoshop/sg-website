import Link from "next/link";
import { featuredProjects } from "@/lib/featured-work";

/**
 * "What We're Up To" — featured projects/work section.
 *
 * 3-card asymmetric grid: one large lead card + two stacked smaller cards.
 * Image placeholders are intentional dark blocks with the client name —
 * to be replaced with real project hero imagery as case studies ship.
 */
export function FeaturedWork() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16 max-w-5xl">
          <div>
            <p className="caption text-gold mb-4">WHAT WE&apos;RE UP TO</p>
            <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-ink text-balance">
              Recent work for brands at the top of their categories.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="caption inline-flex items-center gap-2 text-ink hover:text-gold transition-colors duration-300 shrink-0"
          >
            View all case studies
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
          </Link>
        </header>

        {/* Asymmetric grid: lead card 7/12, two stacked 5/12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7">
            <ProjectCard project={lead} variant="lead" />
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 gap-6 lg:gap-8">
            {rest.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                variant="stacked"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  variant,
}: {
  project: (typeof featuredProjects)[number];
  variant: "lead" | "stacked";
}) {
  const isLead = variant === "lead";

  return (
    <Link href={project.href} className="group block h-full">
      <div
        className={`relative overflow-hidden bg-ink text-canvas transition-transform duration-500 group-hover:scale-[1.01] flex flex-col justify-end ${
          isLead ? "aspect-[7/6] lg:aspect-auto lg:h-full lg:min-h-[640px]" : "aspect-[5/3] lg:aspect-auto lg:min-h-[308px]"
        } p-8 lg:p-10`}
      >
        {/* Subtle gold accent line top-right */}
        <div
          className="absolute top-0 right-0 w-24 h-px bg-gold/40"
          aria-hidden
        />

        {/* Vertical + service tag */}
        <div className="caption text-canvas/50 mb-3 flex items-center gap-3 flex-wrap">
          <span>{project.vertical}</span>
          {project.tag && (
            <>
              <span className="opacity-50">·</span>
              <span>{project.tag}</span>
            </>
          )}
        </div>

        {/* Client name + headline */}
        <h3
          className={`font-sans font-extrabold leading-[1.1] tracking-tight text-balance mb-4 ${
            isLead ? "text-3xl lg:text-5xl" : "text-2xl lg:text-3xl"
          }`}
        >
          {project.client}
        </h3>

        <p
          className={`text-canvas/80 leading-snug ${
            isLead ? "text-lg lg:text-xl max-w-xl" : "text-sm lg:text-base"
          } mb-6`}
        >
          {project.headline}
        </p>

        <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold transition-colors duration-300">
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
  );
}
