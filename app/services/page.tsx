import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six disciplines, one in-house team. Studio, Social, Digital, Growth, Experiences, and Intelligence — built specifically for premium brands.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="WHAT WE DO"
        title="Six disciplines, one in-house team."
        subhead="Every campaign moves through our studio under one roof — strategy, production, distribution, and measurement working as a single team."
      />

      <section className="bg-canvas py-16 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link
                  href={s.href}
                  className="group block bg-ink text-canvas p-8 lg:p-12 h-full transition-transform duration-500 hover:scale-[1.01]"
                >
                  <p className="caption text-canvas/40 mb-6">
                    {String(i + 1).padStart(2, "0")} / Service
                  </p>
                  <h2 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight mb-6">
                    {s.name}
                  </h2>
                  <p className="text-base lg:text-lg leading-snug mb-3">
                    {s.tagline}
                  </p>
                  <p className="text-sm text-canvas/70 leading-relaxed mb-6 line-clamp-3">
                    {s.description}
                  </p>
                  <span className="caption inline-flex items-center gap-2 group-hover:text-gold-deep transition-colors duration-300">
                    Explore {s.name}
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
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}
