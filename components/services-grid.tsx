import Link from "next/link";
import { services } from "@/lib/services";

/**
 * Six-service grid for the homepage. 3 cols desktop, 2 tablet, 1 mobile.
 *
 * Card design: editorial chapter-number style. Large numeric mark in
 * an ink-colored hero area at top, service name in Castoro, tagline + CTA.
 * Image placeholders are intentional (premium-restrained) until real
 * service photography exists.
 */
export function ServicesGrid() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <header className="text-center mb-16 lg:mb-24 max-w-3xl mx-auto">
          <p className="caption text-gold mb-6">WHAT WE DO</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-ink mb-6 text-balance">
            Six disciplines, one in-house team.
          </h2>
          <p className="text-base lg:text-lg text-neutral-600 leading-relaxed">
            Every campaign moves through our studio under one roof — strategy,
            production, distribution, and measurement working as a single team.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 lg:gap-y-16">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const num = String(index).padStart(2, "0");

  return (
    <Link href={service.href} className="group block">
      {/* Chapter-number hero area (image will replace later) */}
      <div className="aspect-[4/5] mb-6 overflow-hidden bg-ink relative flex items-end p-8 lg:p-10 transition-transform duration-500 group-hover:scale-[1.01]">
        {/* Subtle texture: gold diagonal accent line top-right */}
        <div
          className="absolute top-0 right-0 w-24 h-px bg-gold/40"
          aria-hidden
        />
        {/* Tiny service marker top-left */}
        <span className="absolute top-8 left-8 caption text-canvas/40">
          {num} / Service
        </span>
        {/* Large chapter number bottom-left */}
        <span className="font-serif text-7xl lg:text-8xl text-canvas/90 leading-none">
          {service.name}
        </span>
      </div>

      {/* Card content below image area */}
      <div className="px-1">
        <p className="text-lg lg:text-xl text-ink leading-snug mb-3">
          {service.tagline}
        </p>
        <p className="text-sm text-neutral-600 leading-relaxed mb-5 line-clamp-3">
          {service.description}
        </p>
        <span className="caption text-ink inline-flex items-center gap-2 group-hover:text-gold transition-colors duration-300">
          Explore {service.name}
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
