"use client";

import { useActionState, useEffect, useRef } from "react";

import { sendContactMessageAction } from "./actions";

const fieldClassName =
  "border-outline-variant/60 text-on-surface placeholder:text-outline/70 focus-visible:border-primary-dim focus-visible:ring-primary-dim/30 rounded-lg border bg-transparent px-4 py-2.5 text-sm focus-visible:ring-1 focus-visible:outline-none";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactMessageAction,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5">
      {/* Honeypot — hidden from real visitors, left blank by them. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <label className="flex flex-col gap-1.5">
        <span className="text-on-surface-variant text-sm font-medium">
          Name
        </span>
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-on-surface-variant text-sm font-medium">
          Email
        </span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClassName}
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-on-surface-variant text-sm font-medium">
          Message
        </span>
        <textarea
          name="message"
          rows={5}
          required
          maxLength={5000}
          className={`${fieldClassName} resize-y`}
        />
      </label>

      {state?.error ? (
        <p role="alert" className="text-error text-sm font-medium">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p role="status" className="text-tertiary text-sm font-medium">
          Thanks — your message is on its way. We&apos;ll get back to you
          soon.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-on-primary hover:bg-primary-dim mt-2 cursor-pointer self-start rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
