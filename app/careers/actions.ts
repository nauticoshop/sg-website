"use server";

import { Resend } from "resend";

/**
 * Server action for job applications.
 *
 * Validates the applicant's details + attached CV, then emails the
 * application (with the CV attached) to the same inbox(es) the
 * contact form uses. Env vars are shared with the contact action:
 *   RESEND_API_KEY, CONTACT_FROM_EMAIL. Talent-pool applications route
 *   to info@ and billy@ by default (override with CAREERS_TO_EMAIL).
 *
 * File constraints: PDF or Word docs only, max 4MB (Vercel caps
 * request bodies at ~4.5MB at the platform edge; next.config.ts
 * raises the framework's own action body limit to match).
 */

export interface ApplicationResult {
  ok: boolean;
  error?: string;
}

const DEFAULT_TO = "info@surroundingsgroup.com,billy@surroundingsgroup.com";
const DEFAULT_FROM = "Surroundings Group <interested@surroundingsgroup.com>";

// Vercel rejects request bodies over ~4.5MB at the platform edge, so
// anything above 4MB would 413 before this code runs anyway.
const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_MIME_PREFIXES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function parseRecipients(value: string | undefined): string[] {
  const raw = (value ?? DEFAULT_TO).split(",");
  const list = raw.map((s) => s.trim()).filter(Boolean);
  return list.length > 0 ? list : [DEFAULT_TO];
}

export async function submitApplication(
  formData: FormData,
): Promise<ApplicationResult> {
  // Honeypot — bots fill hidden fields, real users don't. Silent accept.
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) return { ok: true };

  const role = String(formData.get("role") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const portfolio = String(formData.get("portfolio") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const file = formData.get("cv");

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "Please attach your resume or CV." };
  }
  if (file.size > MAX_FILE_BYTES) {
    return { ok: false, error: "File is too large. Please keep it under 4MB." };
  }
  const lowerName = file.name.toLowerCase();
  const extOk = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  const mimeOk = ALLOWED_MIME_PREFIXES.some((m) => file.type.startsWith(m));
  if (!extOk && !mimeOk) {
    return { ok: false, error: "Please attach a PDF or Word document." };
  }
  if (message.length > 5000) {
    return { ok: false, error: "Message is too long. Please trim it." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[Careers] Missing RESEND_API_KEY env var");
    return {
      ok: false,
      error:
        "Something went wrong on our side. Please email us your resume directly.",
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const resend = new Resend(apiKey);
  const to = parseRecipients(process.env.CAREERS_TO_EMAIL);
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Talent pool — ${role || "General"} — ${name}`,
      html: renderHtml({ role, name, email, portfolio, message, fileName: file.name }),
      text: renderText({ role, name, email, portfolio, message, fileName: file.name }),
      attachments: [{ filename: file.name, content: buffer }],
    });

    if (result.error) {
      console.error("[Careers] Resend error:", result.error);
      return {
        ok: false,
        error:
          "We couldn't deliver your application right now. Please try again in a moment.",
      };
    }

    console.log("[Careers] Application sent", {
      timestamp: new Date().toISOString(),
      role,
      name,
      email,
      messageId: result.data?.id,
    });

    return { ok: true };
  } catch (err) {
    console.error("[Careers] Unexpected error:", err);
    return {
      ok: false,
      error:
        "Something went wrong. Please try again or email us your resume directly.",
    };
  }
}

interface ApplicationFields {
  role: string;
  name: string;
  email: string;
  portfolio: string;
  message: string;
  fileName: string;
}

function renderHtml(f: ApplicationFields): string {
  const rows: { label: string; value: string }[] = [
    { label: "Role", value: f.role || "General application" },
    { label: "Name", value: f.name },
    { label: "Email", value: f.email },
  ];
  if (f.portfolio) rows.push({ label: "Portfolio", value: f.portfolio });
  rows.push({ label: "Attached", value: f.fileName });

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding: 8px 16px 8px 0; color: #6d6760; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top; white-space: nowrap;">${escapeHtml(r.label)}</td>
        <td style="padding: 8px 0; color: #0f0f0f; font-size: 16px;">${escapeHtml(r.value)}</td>
      </tr>`,
    )
    .join("");

  const messageBlock = f.message
    ? `<tr><td style="padding: 0 32px 32px 32px;">
        <p style="margin: 0 0 8px 0; color: #6d6760; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Note from the applicant</p>
        <div style="background-color: #faf8f5; border-left: 3px solid #0f0f0f; padding: 16px 20px; color: #2e2b27; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(f.message)}</div>
      </td></tr>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Application — Surroundings Group</title></head>
<body style="margin: 0; padding: 24px; background-color: #f7f4f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f0f0f;">
  <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e1da;">
    <tr>
      <td style="padding: 32px 32px 16px 32px;">
        <p style="margin: 0 0 8px 0; color: #0f0f0f; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">New application</p>
        <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 800; line-height: 1.2; color: #0f0f0f;">${escapeHtml(f.name)} applied for ${escapeHtml(f.role || "a role")}.</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 32px 24px 32px;">
        <table cellpadding="0" cellspacing="0" style="width: 100%;">${rowsHtml}</table>
      </td>
    </tr>
    ${messageBlock}
    <tr>
      <td style="padding: 16px 32px 32px 32px; border-top: 1px solid #e5e1da;">
        <p style="margin: 0; color: #6d6760; font-size: 13px; line-height: 1.5;">
          The resume is attached to this email. Reply directly to respond to ${escapeHtml(f.name)}.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderText(f: ApplicationFields): string {
  const lines = [
    `NEW APPLICATION — Surroundings Group`,
    ``,
    `Role:     ${f.role || "General application"}`,
    `Name:     ${f.name}`,
    `Email:    ${f.email}`,
  ];
  if (f.portfolio) lines.push(`Portfolio: ${f.portfolio}`);
  lines.push(`Attached: ${f.fileName}`);
  if (f.message) lines.push(``, `Note:`, f.message);
  lines.push(``, `--`, `Reply to ${f.email} to respond.`);
  return lines.join("\n");
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
