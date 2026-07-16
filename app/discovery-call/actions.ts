"use server";

import { Resend } from "resend";

/**
 * Server action for the discovery-call qualifying form.
 *
 * A visitor answers a few qualifying questions BEFORE the Calendly
 * calendar is revealed, so the team walks into every call knowing who
 * they're talking to — and we capture the lead even if the booking is
 * never completed.
 *
 * Leads route to billy@, phallon@, and info@surroundingsgroup.com by
 * default. Override with DISCOVERY_TO_EMAIL (comma-separated) if the
 * routing ever changes. From/API key are shared with the contact form:
 *   RESEND_API_KEY, CONTACT_FROM_EMAIL.
 */

export interface DiscoveryResult {
  ok: boolean;
  error?: string;
}

const DEFAULT_TO =
  "billy@surroundingsgroup.com,phallon@surroundingsgroup.com,info@surroundingsgroup.com";
const DEFAULT_FROM = "Surroundings Group <interested@surroundingsgroup.com>";

function parseRecipients(value: string | undefined): string[] {
  const raw = (value ?? DEFAULT_TO).split(",");
  const list = raw.map((s) => s.trim()).filter(Boolean);
  return list.length > 0 ? list : [DEFAULT_TO];
}

interface DiscoveryFields {
  name: string;
  email: string;
  company: string;
  industry: string;
  services: string[];
  timeline: string;
  message: string;
}

export async function submitDiscovery(
  formData: FormData,
): Promise<DiscoveryResult> {
  // Honeypot — bots fill hidden fields, real users don't. Silent accept.
  const honeypot = String(formData.get("website") ?? "").trim();
  if (honeypot) return { ok: true };

  const data: DiscoveryFields = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    industry: String(formData.get("industry") ?? "").trim(),
    services: formData
      .getAll("services")
      .map((s) => String(s).trim())
      .filter(Boolean),
    timeline: String(formData.get("timeline") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!data.name) return { ok: false, error: "Please enter your name." };
  if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!data.company) {
    return { ok: false, error: "Please add your company or brand." };
  }
  if (data.message.length > 5000) {
    return { ok: false, error: "Message is too long. Please trim it." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[Discovery] Missing RESEND_API_KEY env var");
    return {
      ok: false,
      error:
        "Something went wrong on our side. You can still pick a time below, or email us directly.",
    };
  }

  const resend = new Resend(apiKey);
  const to = parseRecipients(process.env.DISCOVERY_TO_EMAIL);
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Discovery request — ${data.name} (${data.company})`,
      html: renderHtml(data),
      text: renderText(data),
    });

    if (result.error) {
      console.error("[Discovery] Resend error:", result.error);
      return {
        ok: false,
        error:
          "We couldn't send that just now — but you can still pick a time below.",
      };
    }

    console.log("[Discovery] Sent", {
      timestamp: new Date().toISOString(),
      name: data.name,
      company: data.company,
      messageId: result.data?.id,
    });

    return { ok: true };
  } catch (err) {
    console.error("[Discovery] Unexpected error:", err);
    return {
      ok: false,
      error:
        "Something went wrong — but you can still pick a time below, or email us directly.",
    };
  }
}

function renderHtml(f: DiscoveryFields): string {
  const rows: { label: string; value: string }[] = [
    { label: "Name", value: f.name },
    { label: "Email", value: f.email },
    { label: "Company", value: f.company },
  ];
  if (f.industry) rows.push({ label: "Industry", value: f.industry });
  if (f.services.length)
    rows.push({ label: "Looking for", value: f.services.join(", ") });
  if (f.timeline) rows.push({ label: "Timeline", value: f.timeline });

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
        <p style="margin: 0 0 8px 0; color: #6d6760; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Notes</p>
        <div style="background-color: #faf8f5; border-left: 3px solid #0f0f0f; padding: 16px 20px; color: #2e2b27; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(f.message)}</div>
      </td></tr>`
    : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Discovery request — Surroundings Group</title></head>
<body style="margin: 0; padding: 24px; background-color: #f7f4f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #0f0f0f;">
  <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e5e1da;">
    <tr>
      <td style="padding: 32px 32px 16px 32px;">
        <p style="margin: 0 0 8px 0; color: #6e4d12; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">Discovery request</p>
        <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 800; line-height: 1.2; color: #0f0f0f;">${escapeHtml(f.name)} wants to book.</h1>
        <p style="margin: 0; color: #6d6760; font-size: 15px;">${escapeHtml(f.company)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 16px 32px 24px 32px;">
        <table cellpadding="0" cellspacing="0" style="width: 100%;">${rowsHtml}</table>
      </td>
    </tr>
    ${messageBlock}
    <tr>
      <td style="padding: 16px 32px 32px 32px; border-top: 1px solid #e5e1da;">
        <p style="margin: 0; color: #6d6760; font-size: 13px; line-height: 1.5;">
          Reply directly to reach ${escapeHtml(f.name)}. They were sent to the Calendly calendar after submitting — check Calendly to confirm whether they booked a time.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function renderText(f: DiscoveryFields): string {
  const lines = [
    `DISCOVERY REQUEST — Surroundings Group`,
    ``,
    `Name:       ${f.name}`,
    `Email:      ${f.email}`,
    `Company:    ${f.company}`,
  ];
  if (f.industry) lines.push(`Industry:   ${f.industry}`);
  if (f.services.length) lines.push(`Looking for: ${f.services.join(", ")}`);
  if (f.timeline) lines.push(`Timeline:   ${f.timeline}`);
  if (f.message) lines.push(``, `Notes:`, f.message);
  lines.push(``, `--`, `Reply to ${f.email} to respond. Check Calendly to see if they booked.`);
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
