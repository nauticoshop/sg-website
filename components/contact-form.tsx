"use client";

import { useState, useTransition } from "react";
import { submitContact } from "@/app/contact/actions";
import { trackEvent } from "@/lib/analytics";
import { verticals } from "@/lib/verticals";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    state: "idle" | "ok" | "error";
    message?: string;
  }>({ state: "idle" });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await submitContact(formData);
      if (res.ok) {
        trackEvent("contact_form_submit", {
          vertical: String(formData.get("vertical") ?? ""),
        });
        setResult({ state: "ok" });
        (e.target as HTMLFormElement).reset();
      } else {
        setResult({ state: "error", message: res.error });
      }
    });
  }

  if (result.state === "ok") {
    return (
      <div className="bg-canvas border border-neutral-200 p-10 lg:p-12 text-center">
        <p className="caption text-neutral-500 mb-4">◆ RECEIVED</p>
        <h3 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink mb-4">
          Thanks. We&apos;ll be in touch shortly.
        </h3>
        <p className="text-neutral-600 leading-relaxed">
          Most inquiries get a response within one business day. If you need to
          reach us faster, give us a call.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Honeypot — bots fill it, humans don't see it. Hidden via
          inline style so screen readers don't announce it either. */}
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

      <Field label="Your name" name="name" required />
      <Field label="Email" name="email" type="email" required />
      <Field label="Company" name="company" />

      <div>
        <label htmlFor="vertical" className="caption text-neutral-600 mb-2 block">
          Industry (optional)
        </label>
        <select
          id="vertical"
          name="vertical"
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
          defaultValue=""
        >
          <option value="">Select an industry…</option>
          {verticals.map((v) => (
            <option key={v.slug} value={v.name}>
              {v.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="caption text-neutral-600 mb-2 block">
          Tell us what you&apos;re working on
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors resize-none"
          placeholder="A few sentences about your project, timeline, and what you're hoping to accomplish."
        />
      </div>

      {result.state === "error" && (
        <p className="text-sm text-error">{result.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-deep transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : "Send message"}
      </button>
      <p className="text-sm text-neutral-600">
        We reply within one business day.
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
        {required && <span className="text-neutral-500 ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={name === "email" ? "email" : name === "name" ? "name" : "off"}
        className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  );
}
