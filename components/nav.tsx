"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { MobileMenu } from "./mobile-menu";

/**
 * Site navigation — solid black bar fixed at top of every page.
 *
 * Black header, wordmark left, hamburger right. Hamburger opens a
 * full-screen menu with the complete sitemap (services, verticals,
 * company, contact). Phone lives in the menu and footer, not the bar.
 */
export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-40 bg-ink text-canvas">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
          {/* S mark + wordmark */}
          <Link
            href="/"
            className="caption tracking-[0.18em] font-medium hover:text-gold transition-colors inline-flex items-center gap-1"
            aria-label={site.name}
          >
            {/* Mark PNG has built-in transparent padding — negative
                margins pull the wordmark in tight */}
            <Image
              src="/images/brand/s-mark-white.png"
              alt=""
              width={500}
              height={500}
              priority
              className="h-14 w-14 lg:h-16 lg:w-16 object-contain -m-3 lg:-m-3.5"
              aria-hidden
            />
            <span>{site.wordmark}</span>
          </Link>

          {/* Right side: hamburger (phone lives in the menu + footer) */}
          <div className="flex items-center gap-3 lg:gap-4">
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
