"use client";

import { useState, useTransition } from "react";
import { submitApplication } from "@/app/careers/actions";
import { trackEvent } from "@/lib/analytics";

/**
 * Job application form — name, email, optional portfolio link and
 * note, plus a required CV upload (PDF/Word, max 5MB). Submissions
 * email the team via the submitApplication server action with the
 * CV attached.
 */
export function ApplicationForm({ roleTitle }: { roleTitle: string }) {
  const [isPending, startTransition] = useTransition();
  const [fileName, setFileName] = useState<string | null>(null);
  const [result, setResult] = useState<{
    state: "idle" | "ok" | "error";
    message?: string;
  }>({ state: "idle" });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("role", roleTitle);

    startTransition(async () => {
      const res = await submitApplication(formData);
      if (res.ok) {
        trackEvent("job_application_submit", { role: roleTitle });
        setResult({ state: "ok" });
      } else {
        setResult({ state: "error", message: res.error });
      }
    });
  }

  if (result.state === "ok") {
    return (
      <div className="bg-canvas border border-neutral-200 p-10 lg:p-12 text-center">
        <p className="caption text-gold-deep mb-4">RECEIVED</p>
        <h3 className="font-sans font-extrabold text-3xl lg:text-4xl text-ink mb-4">
          Application in. Thanks.
        </h3>
        <p className="text-neutral-600 leading-relaxed max-w-md mx-auto">
          We read every application. Hiring runs on a rolling basis, so
          when the need opens for this role, we&apos;ll reach out.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Honeypot — hidden from humans and screen readers */}
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
        <div>
          <label htmlFor="name" className="caption text-neutral-600 mb-2 block">
            Your name <span className="text-gold-deep">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="caption text-neutral-600 mb-2 block">
            Email <span className="text-gold-deep">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="portfolio" className="caption text-neutral-600 mb-2 block">
          Portfolio or LinkedIn (optional)
        </label>
        <input
          id="portfolio"
          name="portfolio"
          type="url"
          placeholder="https://"
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors"
        />
      </div>

      <div>
        <label htmlFor="cv" className="caption text-neutral-600 mb-2 block">
          Resume / CV <span className="text-gold-deep">*</span>
        </label>
        <label
          htmlFor="cv"
          className="flex items-center justify-between gap-4 w-full bg-canvas border border-dashed border-neutral-400 px-4 py-4 cursor-pointer hover:border-ink transition-colors"
        >
          <span className="text-sm text-neutral-700 truncate">
            {fileName ?? "Choose a file (PDF or Word, max 5MB)"}
          </span>
          <span className="caption text-gold-deep shrink-0">
            {fileName ? "CHANGE" : "BROWSE"}
          </span>
        </label>
        <input
          id="cv"
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </div>

      <div>
        <label htmlFor="message" className="caption text-neutral-600 mb-2 block">
          Anything you want us to know (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full bg-canvas border border-neutral-300 px-4 py-3 text-base text-ink focus:outline-none focus:border-ink transition-colors resize-none"
          placeholder="A few lines about what you'd bring to the room."
        />
      </div>

      {result.state === "error" && (
        <p className="text-sm text-error">{result.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full sm:w-auto bg-ink text-canvas px-8 py-4 text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Sending…" : `Apply — ${roleTitle}`}
      </button>
    </form>
  );
}
