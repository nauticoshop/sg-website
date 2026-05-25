"use client";

import { useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { verticals } from "@/lib/verticals";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen overlay menu triggered by the nav hamburger.
 * Shows full navigation tree (services + verticals + company),
 * plus contact info + CTAs.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Close on Esc + lock body scroll while open
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-ink text-canvas transition-opacity duration-300 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div className="h-full overflow-y-auto">
        {/* Top bar with logo + close */}
        <div className="px-6 lg:px-12 py-6 flex items-center justify-between border-b border-canvas/10">
          <Link
            href="/"
            onClick={onClose}
            className="caption tracking-[0.18em] font-medium"
          >
            {site.wordmark}
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="w-12 h-12 flex items-center justify-center hover:text-gold transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M2 2L18 18M18 2L2 18"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>

        {/* Menu grid */}
        <div className="px-6 lg:px-12 py-12 lg:py-16 max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <MenuColumn title="Services">
            {services.map((s) => (
              <MenuLink key={s.slug} href={s.href} onClick={onClose}>
                {s.name}
              </MenuLink>
            ))}
          </MenuColumn>

          <MenuColumn title="Industries">
            {verticals.map((v) => (
              <MenuLink key={v.slug} href={v.href} onClick={onClose}>
                {v.name}
              </MenuLink>
            ))}
          </MenuColumn>

          <MenuColumn title="Company">
            <MenuLink href="/about" onClick={onClose}>About</MenuLink>
            <MenuLink href="/about/team" onClick={onClose}>Team</MenuLink>
            <MenuLink href="/about/nautical-network" onClick={onClose}>Nautical Network</MenuLink>
            <MenuLink href="/case-studies" onClick={onClose}>Case Studies</MenuLink>
            <MenuLink href="/editorial" onClick={onClose}>Editorial</MenuLink>
            <MenuLink href="/careers" onClick={onClose}>Careers</MenuLink>
            <MenuLink href="/contact" onClick={onClose}>Contact</MenuLink>
          </MenuColumn>
        </div>

        {/* Bottom contact bar */}
        <div className="border-t border-canvas/10 px-6 lg:px-12 py-8 lg:py-10">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
              <a
                href={`tel:${site.contact.phone.replace(/-/g, "")}`}
                className="caption hover:text-gold transition-colors"
              >
                {site.contact.phone}
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="caption hover:text-gold transition-colors"
              >
                {site.contact.email}
              </a>
              <span className="caption text-canvas/50">{site.contact.city}</span>
            </div>
            <div className="flex justify-start md:justify-end">
              <Link
                href={site.cta.primary.href}
                onClick={onClose}
                className="bg-gold text-ink px-6 py-3 text-sm font-medium tracking-wide hover:bg-canvas transition-colors duration-300"
              >
                {site.cta.primary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="caption text-gold mb-6">{title}</h3>
      <ul className="space-y-4">{children}</ul>
    </div>
  );
}

function MenuLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="font-sans font-extrabold text-2xl lg:text-3xl text-canvas hover:text-gold transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
}
