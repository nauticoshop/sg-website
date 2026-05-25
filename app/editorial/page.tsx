import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";

export const metadata: Metadata = {
  title: "Editorial",
  description:
    "Original reporting, weekly industry briefs, and quarterly deep dives on the luxury categories Surroundings Group serves.",
};

const categories = [
  {
    name: "Client Stories",
    description:
      "Case studies as editorial features — the work, the why, and what we learned shipping it.",
    eyebrow: "01 / CATEGORY",
  },
  {
    name: "Industry Briefs",
    description:
      "Weekly curated reporting across the seven luxury verticals we serve — what moved, what matters.",
    eyebrow: "02 / CATEGORY",
  },
  {
    name: "Deep Dives",
    description:
      "Quarterly original long-form on the trends, brands, and category shifts reshaping luxury markets.",
    eyebrow: "03 / CATEGORY",
  },
];

export default function EditorialPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="EDITORIAL"
        title="Insights from inside the luxury market."
        subhead="Original reporting, weekly industry briefs, and quarterly deep dives on the categories we serve."
      />

      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((c) => (
              <li
                key={c.name}
                className="bg-ink text-canvas p-8 lg:p-10 flex flex-col justify-between min-h-[320px]"
              >
                <div>
                  <p className="caption text-canvas/40 mb-6">{c.eyebrow}</p>
                  <h2 className="font-sans font-extrabold text-3xl lg:text-4xl leading-tight mb-4">
                    {c.name}
                  </h2>
                  <p className="text-sm lg:text-base text-canvas/70 leading-relaxed">
                    {c.description}
                  </p>
                </div>
                <p className="caption text-gold/70 mt-8">COMING SOON</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 lg:mt-20 max-w-2xl mx-auto text-center">
            <p className="caption text-neutral-500 mb-4">EDITORIAL HUB</p>
            <h2 className="font-sans font-extrabold text-2xl lg:text-3xl text-ink mb-4 text-balance">
              Our editorial program is launching soon.
            </h2>
            <p className="text-base text-neutral-700 leading-relaxed mb-6">
              We&apos;re hiring a dedicated editor to lead the editorial
              program across all seven verticals. Until then, follow{" "}
              <a
                href="https://nauticalnetwork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-ink transition-colors"
              >
                Nautical Network
              </a>{" "}
              for our published work in marine.
            </p>
            <Link
              href="/contact"
              className="caption inline-flex items-center gap-2 text-ink hover:text-gold transition-colors"
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
