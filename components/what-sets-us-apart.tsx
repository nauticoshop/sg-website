"use client";

import { useState } from "react";

/**
 * Combined "What Sets Us Apart / Why It Matters / Proven Results"
 * accordion section.
 *
 * Three expandable chapters — collapsed by default so the section stays
 * dense. Click a headline to expand its body. Multiple can be open at
 * once. Replaces three separate full-bleed sections with a single
 * editorial accordion.
 */

interface Chapter {
  num: string;
  eyebrow: string;
  headline: string;
  body: React.ReactNode;
}

const chapters: Chapter[] = [
  {
    num: "01",
    eyebrow: "What sets us apart",
    headline: "Vertical-fluent. In-house. No handoffs.",
    body: (
      <>
        <p>
          We&apos;re a senior, in-house team of category practitioners — not a
          layered agency staffed with outsourced juniors. Strategy, production,
          and distribution live under one roof, on one timeline, with one
          accountable lead per engagement.
        </p>
        <p>
          We work deeply in seven luxury verticals — Marine, Real Estate,
          Multifamily, Aviation, Resorts, Automotive, and Luxury Goods — and we
          turn down work outside that lane. Category fluency is the reason
          premium brands hire us over a generalist shop with a bigger logo.
        </p>
      </>
    ),
  },
  {
    num: "02",
    eyebrow: "Why it matters",
    headline: "Owned audience changes the math.",
    body: (
      <>
        <p>
          When the distribution channel is owned, every dollar of creative
          investment compounds. The film commissioned for a launch isn&apos;t
          just a hero asset on a brand&apos;s site — it runs across an editorial
          ecosystem reaching the exact audience that buys what they sell.
        </p>
        <p>
          Most agencies have to buy reach. We own it. That gap is the difference
          between a campaign that ends when the media plan ends, and a brand
          that compounds quarter over quarter.
        </p>
      </>
    ),
  },
  {
    num: "03",
    eyebrow: "Proven results",
    headline: "Numbers behind the work.",
    body: (
      <>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
          <Result value="255M+" label="Annual reach across our owned network" />
          <Result value="4.75M" label="Followers across editorial channels" />
          <Result value="10" label="Branded channels publishing daily" />
          <Result value="$100M+" label="Client transaction volume influenced" />
          <Result value="62M" label="Annual watch minutes on owned video" />
          <Result value="100%" label="Creative production in-house" />
        </ul>
      </>
    ),
  },
];

export function WhatSetsUsApart() {
  // Default: all collapsed. Stores set of open chapter nums.
  const [open, setOpen] = useState<Set<string>>(new Set());

  function toggle(num: string) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  }

  return (
    <section className="bg-canvas py-20 lg:py-28 px-6 lg:px-12">
      <div className="max-w-[1200px] mx-auto">
        <header className="text-center mb-12 lg:mb-16 max-w-3xl mx-auto">
          <p className="caption text-gold-deep mb-4">WHY SURROUNDINGS GROUP</p>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink text-balance">
            What sets us apart, why it matters, and the proof.
          </h2>
        </header>

        <ul className="border-t border-neutral-200">
          {chapters.map((chapter) => {
            const isOpen = open.has(chapter.num);
            return (
              <li key={chapter.num} className="border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => toggle(chapter.num)}
                  aria-expanded={isOpen}
                  aria-controls={`chapter-body-${chapter.num}`}
                  className="w-full text-left py-7 lg:py-9 flex items-center gap-6 lg:gap-10 group cursor-pointer"
                >
                  <span className="caption text-gold-deep shrink-0 w-10">
                    {chapter.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="caption text-neutral-500 mb-1.5">
                      {chapter.eyebrow}
                    </p>
                    <h3 className="font-sans font-extrabold text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight text-ink text-balance group-hover:text-gold-deep transition-colors duration-300">
                      {chapter.headline}
                    </h3>
                  </div>
                  <span
                    aria-hidden
                    className={`shrink-0 w-10 h-10 lg:w-12 lg:h-12 border border-neutral-300 flex items-center justify-center text-ink group-hover:border-gold-deep group-hover:text-gold-deep transition-all duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="square"
                      />
                    </svg>
                  </span>
                </button>

                {/* Expandable body */}
                <div
                  id={`chapter-body-${chapter.num}`}
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="pl-16 lg:pl-20 pr-16 lg:pr-24 pb-8 lg:pb-10 max-w-3xl space-y-5 text-base lg:text-lg text-neutral-700 leading-relaxed">
                      {chapter.body}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Result({ value, label }: { value: string; label: string }) {
  return (
    <li>
      <p className="font-sans font-extrabold text-3xl lg:text-4xl text-ink leading-none mb-2 tracking-tight">
        {value}
      </p>
      <p className="text-sm text-neutral-600 leading-snug">{label}</p>
    </li>
  );
}
