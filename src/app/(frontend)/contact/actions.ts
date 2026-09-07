"use server";

import * as Sentry from "@sentry/nextjs";

import { getPayloadClient } from "@/lib/payload";
import { SUPPORT_EMAIL } from "@/lib/site";

export type ContactActionState = { error?: string; success?: boolean } | null;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContactMessageAction(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Honeypot: real visitors never fill this hidden field in. Bots that fill
  // in every field do — pretend success without sending anything.
  if (String(formData.get("company") ?? "").trim()) {
    return { success: true };
  }

  if (!name || !email || !message) {
    return { error: "Please fill in your name, email, and message." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Enter a valid email address." };
  }

  if (message.length > 5000) {
    return { error: "Message is too long." };
  }

  try {
    const payload = await getPayloadClient();
    await payload.sendEmail({
      to: SUPPORT_EMAIL,
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (error) {
    Sentry.captureException(error, {
      tags: { area: "contact-form" },
    });
    return {
      error: "Something went wrong sending your message. Please try again.",
    };
  }

  return { success: true };
}
