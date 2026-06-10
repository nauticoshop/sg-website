import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { workCollections, collectionCover } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Surroundings Group — superyacht charter campaigns, estate and residential shoots, private aviation, resorts, hospitality, and luxury goods.",
};

export default function WorkIndexPage() {
  return (
    <>
      <Nav />

      <PageHero
        eyebrow="THE PORTFOLIO"
        title="Work that speaks for itself."
        subhead="Selected collections across marine, real estate, aviation, hospitality, and the categories around them. Shot, cut, and shipped by our in-house team."
      />

      <section className="bg-canvas pb-16 lg:pb-24 px-6 lg:px-12">
        <div className="max-w-[1200px] mx-auto">
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 lg:gap-x-8 lg:gap-y-16">
            {workCollections.map((collection) => {
              const cover = collectionCover(collection);
              return (
                <li key={collection.slug}>
                  <Link href={collection.href} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                      <Image
                        src={cover.src}
                        alt={cover.alt}
                        fill
                        sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p className="caption text-gold-deep mt-5 mb-2">
                      {collection.vertical}
                    </p>
                    <h2 className="font-sans font-extrabold text-xl lg:text-2xl tracking-tight text-ink leading-tight">
                      {collection.title}
                    </h2>
                    <span className="caption inline-flex items-center gap-2 mt-3 text-neutral-500 group-hover:text-gold-deep transition-colors duration-300">
                      View collection
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
            })}
          </ul>
        </div>
      </section>

      <CtaBanner />
      <Footer />
    </>
  );
}
