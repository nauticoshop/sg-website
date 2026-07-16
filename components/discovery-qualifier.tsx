"use client";

import { useRef, useState, useTransition } from "react";
import { submitDiscovery } from "@/app/discovery-call/actions";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { trackEvent } from "@/lib/analytics";
import { verticals } from "@/lib/verticals";
import { services } from "@/lib/services";

/**
 * Discovery qualifier — a few quick questions gate the Calendly
 * calendar. On submit the answers email the team (billy@ / phallon@ /
 * info@) and the live calendar is revealed in place, so a lead is
 * captured even if the booking is never completed.
 */

const TIMELINES = [
  "As soon as possible",
  "Next 1–3 months",
  "3–6 months",
  "Just exploring",
];

export function DiscoveryQualifier() {
  const [isPending, startTransition] = useTransition();
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const res = await submitDiscovery(formData);
        if (res.ok) {
          trackEvent("discovery_qualifier_submit", {});
          setBooked(true);
          // Let the calendar mount, then bring it into view.
          requestAnimationFrame(() =>
            calendarRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            }),
          );
        } else {
          setError(res.error ?? "Something went wrong. Please try again.");
        }
      } catch {
        setError(
          "We couldn't send that just now. Please try again in a moment.",
        );
      }
    });
  }

  if (booked) {
    return (
      <div ref={calendarRef} className="scroll-mt-24">
        <header className="mb-8 lg:mb-10">
          <p className="caption text-neutral-500 mb-4">◆ LAST STEP</p>
          <h2 className="font-sans font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight text-ink text-balance">
            Pick a time.
          </h2>
          <p className="text-base lg:text-lg text-neutral-700 mt-4 max-w-2xl leading-relaxed">
            Thanks — your details are on their way to the team. Grab whatever
            slot works below and you&apos;re set.
          </p>
        </header>
        <CalendlyEmbed />
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Your name" name="name" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <Field label="Company or brand" name="company" required />

      <div>
        <label htmlFor="industry" className="caption text-neutral-600 mb-2 block">
          Industry
        </label>
        <select
          id="industry"
          name="industry"
          defaultValue=""
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
        >
          <option value="">Select an industry…</option>
          {verticals.map((v) => (
            <option key={v.slug} value={v.name}>
              {v.name}
            </option>
          ))}
          <option value="Other / not listed">Other / not listed</option>
        </select>
      </div>

      <fieldset>
        <legend className="caption text-neutral-600 mb-3">
          What are you looking for? <span className="text-neutral-400">(select all that apply)</span>
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {services.map((s) => (
            <Checkbox key={s.slug} value={s.name} label={s.name} />
          ))}
          <Checkbox value="Other / not listed" label="Other / not listed" />
        </div>
      </fieldset>

      <div>
        <label htmlFor="timeline" className="caption text-neutral-600 mb-2 block">
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          defaultValue=""
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
        >
          <option value="">Select a timeline…</option>
          {TIMELINES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="caption text-neutral-600 mb-2 block">
          Anything you want us to know? <span className="text-neutral-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors resize-none"
          placeholder="A few lines about the project, goals, or anything you'd want us to prep before the call."
        />
      </div>

      {error && <p className="text-sm text-error">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto inline-flex items-center gap-3 bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : "Continue to the calendar"}
        {!isPending && (
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path
              d="M1 5h12m0 0L9 1m4 4L9 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        )}
      </button>
      <p className="text-sm text-neutral-600">
        Takes 30 seconds. The calendar opens on the next step.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="caption text-neutral-600 mb-2 block">
        {label}
        {required && <span className="text-neutral-400 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={
          name === "email" ? "email" : name === "name" ? "name" : "organization"
        }
        className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}

function Checkbox({ value, label }: { value: string; label: string }) {
  return (
    <label className="flex items-center justify-between gap-3 bg-canvas border border-neutral-300 px-4 py-3 cursor-pointer select-none hover:border-ink transition-colors has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-canvas">
      <input
        type="checkbox"
        name="services"
        value={value}
        className="peer sr-only"
      />
      <span className="text-sm font-medium">{label}</span>
      <svg
        aria-hidden
        width="12"
        height="9"
        viewBox="0 0 10 8"
        fill="none"
        className="shrink-0 opacity-0 peer-checked:opacity-100 text-canvas transition-opacity"
      >
        <path
          d="M1 4l2.5 2.5L9 1"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
}
