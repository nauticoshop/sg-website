import Link from "next/link";
import { featuredProjects } from "@/lib/featured-work";

/**
 * "What We're Up To" — featured projects/work section.
 *
 * Uniform 3-col grid — all cards equal size and weight.
 * Replaces the previous asymmetric 7/12 + 5/12 split which created
 * unbalanced proportions (per Billy's feedback).
 *
 * Image placeholders are intentional dark blocks with the client name.
 * Will be replaced with real project hero imagery as case studies ship.
 */
export function FeaturedWork() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16 max-w-5xl">
          <div>
            <p className="caption text-gold-deep mb-4">WHAT WE&apos;RE UP TO</p>
            <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight text-ink text-balance">
              Recent work for brands at the top of their categories.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="caption inline-flex items-center gap-2 text-ink hover:text-gold-deep transition-colors duration-300 shrink-0"
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

        {/* Uniform 3-col grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredProjects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof featuredProjects)[number];
}) {
  return (
    <Link href={project.href} className="group block h-full">
      <article className="relative h-full overflow-hidden bg-ink text-canvas transition-all duration-500 group-hover:bg-neutral-800 flex flex-col">
        {/* Image area — placeholder with client name */}
        <div className="aspect-[4/3] relative overflow-hidden border-b border-canvas/10">
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <span className="font-sans font-extrabold text-3xl lg:text-4xl text-canvas/25 text-center leading-tight">
              {project.client}
            </span>
          </div>
          {/* Subtle gold accent corner */}
          <div
            className="absolute top-0 right-0 w-16 h-px bg-gold-deep/40"
            aria-hidden
          />
        </div>

        {/* Content */}
        <div className="p-8 lg:p-10 flex-1 flex flex-col">
          <div className="caption text-canvas/50 mb-3 flex items-center gap-3 flex-wrap">
            <span>{project.vertical}</span>
            {project.tag && (
              <>
                <span className="opacity-50">·</span>
                <span>{project.tag}</span>
              </>
            )}
          </div>

          <h3 className="font-sans font-extrabold text-2xl lg:text-3xl leading-tight mb-4 text-balance group-hover:text-gold-deep transition-colors duration-300">
            {project.client}
          </h3>

          <p className="text-base lg:text-lg text-canvas/80 leading-snug mb-6 flex-1">
            {project.headline}
          </p>

          <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold-deep transition-colors duration-300">
            Read case study
            <svg
              width="14"
              height="10"
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
          </span>
        </div>
      </article>
    </Link>
  );
}
