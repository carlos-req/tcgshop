"use client";

import { useActionState } from "react";

import type { AuthActionState } from "./actions";

export function AuthForm({
  action,
  submitLabel,
  pendingLabel,
  successMessage,
  buttonClassName,
  children,
}: {
  action: (
    prevState: AuthActionState,
    formData: FormData,
  ) => Promise<AuthActionState>;
  submitLabel: string;
  pendingLabel: string;
  successMessage?: string;
  buttonClassName?: string;
  children: React.ReactNode;
}) {
  const [state, formAction, isPending] = useActionState<AuthActionState, FormData>(
    action,
    null,
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      {children}
      {state?.error ? (
        <p role="alert" className="text-error text-sm font-medium">
          {state.error}
        </p>
      ) : null}
      {state?.success && successMessage ? (
        <p role="status" className="text-tertiary text-sm font-medium">
          {successMessage}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className={
          buttonClassName ??
          "bg-primary text-on-primary hover:bg-primary-dim mt-2 cursor-pointer rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {isPending ? pendingLabel : submitLabel}
      </button>
    </form>
  );
}

export function AuthField({
  label,
  name,
  type = "text",
  autoComplete,
  required,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-on-surface-variant text-sm font-medium">
        {label}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        defaultValue={defaultValue}
        className="border-outline-variant/60 text-on-surface placeholder:text-outline/70 focus-visible:border-primary-dim focus-visible:ring-primary-dim/30 rounded-lg border bg-transparent px-4 py-2.5 text-sm focus-visible:ring-1 focus-visible:outline-none"
      />
    </label>
  );
}
