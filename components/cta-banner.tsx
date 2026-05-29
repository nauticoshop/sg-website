import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Closing CTA banner — full-bleed dark section pushing toward the
 * primary conversion (book a discovery call).
 */
export function CtaBanner() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-gold text-ink">
      <div className="max-w-[1000px] mx-auto text-center">
        <p className="caption text-ink mb-6">READY WHEN YOU ARE</p>
        <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6 text-balance text-ink">
          Let&apos;s build something worth talking about.
        </h2>
        <p className="text-base lg:text-lg text-ink/75 max-w-2xl mx-auto leading-relaxed mb-10">
          We work with a small roster of premium brands at a time. If
          you&apos;re one of them, we should talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={site.cta.primary.href}
            className="bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-300"
          >
            {site.cta.primary.label}
          </Link>
          <Link
            href="/contact"
            className="border border-ink/40 text-ink px-8 py-4 text-sm font-medium tracking-wide hover:bg-ink hover:text-canvas hover:border-ink transition-colors duration-300"
          >
            Or send us a note
          </Link>
        </div>
      </div>
    </section>
  );
}
