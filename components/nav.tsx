import Link from "next/link";
import { site } from "@/lib/site";

interface NavProps {
  /** Color treatment: "light" for cream backgrounds, "dark" for video/dark hero overlays */
  variant?: "light" | "dark";
}

/**
 * Top navigation. Sits at top of page, transparent over the hero,
 * solid cream on inner pages.
 */
export function Nav({ variant = "dark" }: NavProps) {
  const isDark = variant === "dark";

  return (
    <nav
      className={`absolute top-0 inset-x-0 z-30 ${
        isDark ? "text-canvas" : "text-ink"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="caption tracking-[0.18em] font-medium hover:opacity-80 transition-opacity"
          aria-label={site.name}
        >
          {site.wordmark}
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-medium hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={site.cta.primary.href}
          className={`text-sm font-medium px-5 py-2.5 border transition-colors duration-300 ${
            isDark
              ? "border-canvas/30 text-canvas hover:bg-canvas hover:text-ink"
              : "border-ink text-ink hover:bg-ink hover:text-canvas"
          }`}
        >
          Book
        </Link>
      </div>
    </nav>
  );
}
