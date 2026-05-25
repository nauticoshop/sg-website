"use server";

/**
 * Server action for the contact form.
 *
 * Tonight: validates input + logs to server console + returns success.
 * Next session: wire to Resend (or similar) to actually email Billy.
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

export async function submitContact(
  formData: FormData
): Promise<ContactFormResult> {
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

  // TODO: Wire to Resend / email delivery service.
  // For now, log to server so Billy can see submissions in `vercel logs`.
  console.log("[Contact submission]", {
    timestamp: new Date().toISOString(),
    ...data,
  });

  return { ok: true };
}
