"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

/**
 * Site navigation — solid black bar fixed at top of every page.
 *
 * Inspired by Billy's current site: black header, wordmark left,
 * phone CTA + hamburger right. Hamburger opens a full-screen menu
 * with the complete sitemap (services, verticals, company, contact).
 */
export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-40 bg-ink text-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="caption tracking-[0.18em] font-medium hover:text-gold transition-colors"
            aria-label={site.name}
          >
            {site.wordmark}
          </Link>

          {/* Right side: phone + hamburger */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Phone CTA (pill button with icon) */}
            <a
              href={`tel:${site.contact.phone.replace(/-/g, "")}`}
              className="hidden sm:inline-flex items-center gap-2 bg-canvas/5 hover:bg-gold hover:text-ink border border-canvas/15 hover:border-gold text-canvas px-4 lg:px-5 py-2.5 text-sm font-medium tracking-wide rounded-full transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M13 9.8v2.1c0 .55-.45 1-1 1-6.4 0-11.6-5.2-11.6-11.6 0-.55.45-1 1-1h2.1c.55 0 1 .45 1 1 0 .8.14 1.6.4 2.4.07.25-.03.55-.23.7L3.2 5.7C4.4 8 6 9.6 8.3 10.8l1.3-1.5c.2-.2.45-.3.7-.23.8.26 1.6.4 2.4.4.55 0 .9.45.9 1z"
                  fill="currentColor"
                />
              </svg>
              <span>{site.contact.phone}</span>
            </a>

            {/* Mobile: tap-to-call icon-only button */}
            <a
              href={`tel:${site.contact.phone.replace(/-/g, "")}`}
              aria-label={`Call ${site.contact.phone}`}
              className="sm:hidden w-10 h-10 flex items-center justify-center rounded-full bg-canvas/5 border border-canvas/15 hover:bg-gold hover:text-ink hover:border-gold transition-colors duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M13 9.8v2.1c0 .55-.45 1-1 1-6.4 0-11.6-5.2-11.6-11.6 0-.55.45-1 1-1h2.1c.55 0 1 .45 1 1 0 .8.14 1.6.4 2.4.07.25-.03.55-.23.7L3.2 5.7C4.4 8 6 9.6 8.3 10.8l1.3-1.5c.2-.2.45-.3.7-.23.8.26 1.6.4 2.4.4.55 0 .9.45.9 1z"
                  fill="currentColor"
                />
              </svg>
            </a>

            {/* Hamburger menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="w-10 h-10 lg:w-11 lg:h-11 flex items-center justify-center rounded-full bg-gold text-ink hover:bg-canvas transition-colors duration-300"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
                <path
                  d="M0 1h16M0 6h16M0 11h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
