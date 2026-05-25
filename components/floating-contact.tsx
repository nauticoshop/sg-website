"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Floating contact widget — bottom-right of every page.
 *
 * Mimics the visual pattern of a chat widget (rounded button, animated
 * drawer) but funnels visitors to real contact channels (call, email,
 * book a call, contact form). More useful than a chat widget on day one
 * because no staffed agent is needed.
 *
 * Real chat (Crisp / Intercom / Chatwoot) can replace this later by
 * swapping the drawer content for the third-party widget embed.
 */
export function FloatingContact() {
  const [open, setOpen] = useState(false);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Drawer */}
      <div
        className={`fixed bottom-24 right-6 lg:bottom-28 lg:right-10 z-50 w-[calc(100vw-3rem)] max-w-sm bg-ink text-canvas shadow-2xl transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div className="p-6 lg:p-7">
          <p className="caption text-gold mb-2">GET IN TOUCH</p>
          <h3 className="font-serif text-2xl mb-2">How can we help?</h3>
          <p className="text-sm text-canvas/70 leading-relaxed mb-6">
            Real humans, fast responses. Pick whatever&apos;s easiest.
          </p>

          <ul className="space-y-3">
            <ContactOption
              href={`tel:${site.contact.phone.replace(/-/g, "")}`}
              label="Call us"
              detail={site.contact.phone}
            />
            <ContactOption
              href={`mailto:${site.contact.email}`}
              label="Email us"
              detail={site.contact.email}
            />
            <ContactOption
              href={site.cta.primary.href}
              label="Book a discovery call"
              detail="Schedule a time that works"
              onClick={() => setOpen(false)}
              isInternal
            />
            <ContactOption
              href="/contact"
              label="Send us a note"
              detail="Project briefs & inquiries"
              onClick={() => setOpen(false)}
              isInternal
            />
          </ul>
        </div>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close contact" : "Get in touch"}
        aria-expanded={open}
        className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-gold text-ink shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200 flex items-center justify-center"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M2 2L18 18M18 2L2 18"
              stroke="currentColor"
              strokeWidth="1.75"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </>
  );
}

function ContactOption({
  href,
  label,
  detail,
  onClick,
  isInternal = false,
}: {
  href: string;
  label: string;
  detail: string;
  onClick?: () => void;
  isInternal?: boolean;
}) {
  const className =
    "group flex items-center justify-between gap-4 p-3 -mx-3 hover:bg-canvas/5 transition-colors duration-200 cursor-pointer";
  const content = (
    <>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-canvas group-hover:text-gold transition-colors">
          {label}
        </p>
        <p className="text-xs text-canvas/60 truncate">{detail}</p>
      </div>
      <svg
        width="12"
        height="12"
        viewBox="0 0 14 10"
        fill="none"
        className="shrink-0 text-canvas/50 group-hover:text-gold transition-colors"
        aria-hidden
      >
        <path
          d="M1 5h12m0 0L9 1m4 4L9 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </>
  );

  return (
    <li>
      {isInternal ? (
        <Link href={href} onClick={onClick} className={className}>
          {content}
        </Link>
      ) : (
        <a href={href} onClick={onClick} className={className}>
          {content}
        </a>
      )}
    </li>
  );
}
