interface PageHeroProps {
  /** Small uppercase eyebrow label */
  eyebrow: string;
  /** Page H1 — heavy display sans */
  title: string;
  /** Optional subhead under the title */
  subhead?: string;
  /** Visual tone */
  tone?: "light" | "dark";
}

/**
 * Reusable inner-page hero. Sits at the top of every non-homepage route
 * after the fixed Nav. Offsets for nav height with pt-36 (mobile) / pt-44 (lg).
 *
 * Tone:
 *  - light: cream canvas background, ink text (default for most inner pages)
 *  - dark: ink background, canvas text (use for dramatic moments)
 */
export function PageHero({
  eyebrow,
  title,
  subhead,
  tone = "light",
}: PageHeroProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={`pt-36 lg:pt-44 pb-16 lg:pb-24 px-6 lg:px-12 ${
        isDark ? "bg-ink text-canvas" : "bg-canvas text-ink"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <p className={`caption mb-6 ${isDark ? "text-gold" : "text-neutral-500"}`}>{eyebrow}</p>
        <h1 className="font-sans font-extrabold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl text-balance">
          {title}
        </h1>
        {subhead && (
          <p
            className={`text-lg lg:text-xl mt-6 max-w-2xl leading-relaxed ${
              isDark ? "text-canvas/70" : "text-neutral-700"
            }`}
          >
            {subhead}
          </p>
        )}
      </div>
    </section>
  );
}
