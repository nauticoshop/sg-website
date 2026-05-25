import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Closing CTA banner — full-bleed dark section pushing toward the
 * primary conversion (book a discovery call).
 */
export function CtaBanner() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-ink text-canvas">
      <div className="max-w-[1000px] mx-auto text-center">
        <p className="caption text-gold mb-6">READY WHEN YOU ARE</p>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6 text-balance">
          Let&apos;s build something worth talking about.
        </h2>
        <p className="text-base lg:text-lg text-canvas/70 max-w-2xl mx-auto leading-relaxed mb-10">
          We work with a small number of premium brands at a time. If
          you&apos;re building something at the top of your category, we should
          talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={site.cta.primary.href}
            className="bg-gold text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas transition-colors duration-300"
          >
            {site.cta.primary.label}
          </Link>
          <Link
            href="/contact"
            className="border border-canvas/40 text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-canvas hover:text-ink hover:border-canvas transition-colors duration-300"
          >
            Or send us a note
          </Link>
        </div>
      </div>
    </section>
  );
}
