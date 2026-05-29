"use server";

import { Resend } from "resend";

/**
 * Server action for the contact form.
 *
 * Validates input, runs a basic honeypot spam check, and emails
 * the submission to CONTACT_TO_EMAIL via Resend.
 *
 * Env vars required:
 *   RESEND_API_KEY       — from https://resend.com
 *   CONTACT_TO_EMAIL     — destination inbox (default: hello@surroundingsgroup.com)
 *   CONTACT_FROM_EMAIL   — sender address. Until the domain is verified
 *                          in Resend, use Resend's default (onboarding@resend.dev).
 *                          After verification, switch to hello@surroundingsgroup.com.
 */

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  vertical?: string;
  message: string;
}

export interface ContactFormResult {
  ok: boolean;
  error?: string;
}

const DEFAULT_TO = "hello@surroundingsgroup.com";
const DEFAULT_FROM = "Surroundings Group <onboarding@resend.dev>";

export async function submitContact(
  formData: FormData,
): Promise<ContactFormResult> {
  // Honeypot — bots fill hidden fields, real users don't. Silent reject.
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) {
    // Return "ok" so the bot moves on; we just don't email.
    return { ok: true };
  }

  const data: ContactFormData = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim() || undefined,
    vertical: String(formData.get("vertical") ?? "").trim() || undefined,
    message: String(formData.get("message") ?? "").trim(),
  };

  // Validation
  if (!data.name) return { ok: false, error: "Please enter your name." };
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!data.message) {
    return { ok: false, error: "Please tell us what you're working on." };
  }
  if (data.message.length > 5000) {
    return { ok: false, error: "Message is too long. Please trim it." };
  }

  // Send via Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[Contact] Missing RESEND_API_KEY env var");
    return {
      ok: false,
      error: "Something went wrong on our side. Please try again or email us directly.",
    };
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New inquiry — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      html: renderEmailHtml(data),
      text: renderEmailText(data),
    });

    if (result.error) {
      console.error("[Contact] Resend error:", result.error);
      return {
        ok: false,
        error: "We couldn't deliver your message right now. Please try again in a moment.",
      };
    }

    console.log("[Contact] Sent", {
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      messageId: result.data?.id,
    });

    return { ok: true };
  } catch (err) {
    console.error("[Contact] Unexpected error:", err);
    return {
      ok: false,
      error: "Something went wrong. Please try again or email us directly.",
    };
  }
}

function renderEmailHtml(data: ContactFormData): string {
  const rows: { label: string; value: string }[] = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
  ];
  if (data.company) rows.push({ label: "Company", value: data.company });
  if (data.vertical) rows.push({ label: "Industry", value: data.vertical });

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding: 8px 16px 8px 0; color: #6d6760; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top; white-space: nowrap;">${escape(r.label)}</td>
        <td style="padding: 8px 0; color: #0f0f0f; font-size: 16px;">${escape(r.value)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>New inquiry — Surroundings Group</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f7f4f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f0f0f;">
  <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e1da;">
    <tr>
      <td style="padding: 32px 32px 16px 32px;">
        <p style="margin: 0 0 8px 0; color: #6e4d12; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">New inquiry</p>
        <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 800; line-height: 1.2; color: #0f0f0f;">${escape(data.name)} got in touch.</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 32px 24px 32px;">
        <table cellpadding="0" cellspacing="0" style="width: 100%;">
          ${rowsHtml}
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 32px 32px 32px;">
        <p style="margin: 0 0 8px 0; color: #6d6760; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Message</p>
        <div style="background-color: #faf8f5; border-left: 3px solid #6e4d12; padding: 16px 20px; color: #2e2b27; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${escape(data.message)}</div>
      </td>
    </tr>
    <tr>
      <td style="padding: 16px 32px 32px 32px; border-top: 1px solid #e5e1da;">
        <p style="margin: 0; color: #6d6760; font-size: 13px; line-height: 1.5;">
          Reply directly to this email to respond to ${escape(data.name)}.<br />
          Submitted via surroundingsgroup.com on ${new Date().toLocaleString("en-US", { timeZone: "America/New_York" })} ET.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderEmailText(data: ContactFormData): string {
  const lines = [
    `NEW INQUIRY — Surroundings Group`,
    ``,
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
  ];
  if (data.company) lines.push(`Company: ${data.company}`);
  if (data.vertical) lines.push(`Industry: ${data.vertical}`);
  lines.push(``, `Message:`, data.message, ``, `--`, `Reply to ${data.email} to respond.`);
  return lines.join("\n");
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
