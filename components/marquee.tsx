interface MarqueeProps {
  /** Items to scroll through — duplicated automatically for seamless loop */
  items: string[];
  /** Speed in seconds for a full loop (lower = faster). Default 30s. */
  duration?: number;
  /** Reverse direction */
  reverse?: boolean;
  /** Visual tone */
  tone?: "light" | "dark";
}

/**
 * Infinite-scroll marquee strip — premium agency signature device.
 * Pure CSS animation, no JS. Pauses on hover for accessibility/readability.
 *
 * The items array is rendered twice back-to-back so the animation can
 * translate -50% and create a perfect seamless loop.
 */
export function Marquee({
  items,
  duration = 40,
  reverse = false,
  tone = "light",
}: MarqueeProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={`relative overflow-hidden border-y py-8 lg:py-10 ${
        isDark
          ? "bg-ink text-canvas border-canvas/10"
          : "bg-canvas text-ink border-neutral-200"
      }`}
      aria-label="Industries we serve"
    >
      <div
        className="flex whitespace-nowrap hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${duration}s linear infinite`,
          width: "max-content",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight px-6 lg:px-10 inline-flex items-center gap-6 lg:gap-10"
          >
            {item}
            <span
              className="inline-block w-2 h-2 rounded-full bg-gold shrink-0"
              aria-hidden
            />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
