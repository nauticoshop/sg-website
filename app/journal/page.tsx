import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import {
  featuredProjects,
  journalTypeLabel,
  type JournalType,
} from "@/lib/featured-work";

export const metadata: Metadata = {
  title: "The Studio Journal",
  description:
    "Case studies, behind-the-scenes, client updates, and studio news from Surroundings Group — a premium creative agency for luxury brands.",
};

/** Filter chip categories shown at top of the feed */
const filters: { type: JournalType; label: string }[] = [
  { type: "case-study", label: "Case Studies" },
  { type: "bts", label: "Behind the Scenes" },
  { type: "client-update", label: "Client Updates" },
  { type: "studio-news", label: "Studio News" },
];

export default function JournalPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="THE STUDIO JOURNAL"
        title="Inside the studio."
        subhead="Case studies, behind-the-scenes, client updates, and studio news. Where the work and the story behind it live."
      />

      {/* Filter chips — non-functional for now, render placeholder labels */}
      <section className="bg-canvas px-6 lg:px-12 pt-12 lg:pt-16">
        <div className="max-w-[1200px] mx-auto">
          <ul className="flex flex-wrap items-center gap-3 lg:gap-4 border-b border-neutral-200 pb-6 lg:pb-8">
            <li>
              <span className="caption text-ink px-4 py-2 bg-ink/5">
                ALL
              </span>
            </li>
            {filters.map((f) => {
              const count = featuredProjects.filter(
                (p) => p.type === f.type,
              ).length;
              return (
                <li key={f.type}>
                  <span className="caption text-neutral-500 px-4 py-2">
                    {f.label.toUpperCase()}{" "}
                    <span className="text-neutral-400">({count})</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Feed grid */}
      <section className="bg-canvas py-12 lg:py-16 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.map((entry) => (
              <li key={entry.slug}>
                <Link href={entry.href} className="group block h-full">
                  <article className="relative h-full bg-ink text-canvas p-8 lg:p-10 flex flex-col transition-colors duration-500 group-hover:bg-neutral-800 min-h-[360px]">
                    <p className="caption text-gold mb-6">
                      {journalTypeLabel(entry.type)}
                    </p>
                    <div className="caption text-canvas/50 mb-3 flex items-center gap-3 flex-wrap">
                      <span>{entry.vertical}</span>
                      {entry.tag && (
                        <>
                          <span className="opacity-50">·</span>
                          <span>{entry.tag}</span>
                        </>
                      )}
                    </div>
                    <h2 className="font-sans font-extrabold text-2xl lg:text-3xl leading-tight mb-4 text-balance group-hover:text-gold-deep transition-colors duration-300">
                      {entry.client}
                    </h2>
                    <p className="text-base text-canvas/75 leading-snug mb-6 flex-1">
                      {entry.headline}
                    </p>
                    <span className="caption inline-flex items-center gap-2 text-canvas group-hover:text-gold-deep transition-colors duration-300">
                      Read entry
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
                  </article>
                </Link>
              </li>
            ))}
          </ul>

          {/* Coming-soon strip for the other categories */}
          <div className="mt-16 lg:mt-20 max-w-2xl mx-auto text-center">
            <p className="caption text-neutral-500 mb-4">MORE COMING</p>
            <h2 className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance">
              The full journal is being built out.
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed mb-6">
              Behind-the-scenes posts, client updates, and studio news join
              the feed as work ships. For our published editorial work in
              marine, follow{" "}
              <a
                href="https://nauticalnetwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-ink transition-colors"
              >
                Nautical Network
              </a>
              .
            </p>
            <Link
              href="/contact"
              className="caption inline-flex items-center gap-2 text-ink hover:text-gold-deep transition-colors"
            >
              Pitch a story or contribute
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
          </div>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}
