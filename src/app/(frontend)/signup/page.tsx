import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getCurrentCustomer } from "@/lib/auth";
import { COMPANY_NAME } from "@/lib/site";
import { signupAction } from "../(account)/actions";
import { AuthField, AuthForm } from "../(account)/AuthForm";

export const metadata: Metadata = {
  title: `Create account | ${COMPANY_NAME}`,
};

export default function SignupPage() {
  return (
    <div className="max-w-container mx-auto px-8 py-16">
      <div className="mx-auto w-full max-w-sm">
        <Suspense>
          <RedirectIfLoggedIn />
        </Suspense>

        <h1 className="font-display text-on-surface text-3xl font-semibold">
          Create your account
        </h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          Track orders and check out faster next time.
        </p>

        <div className="mt-8">
          <AuthForm
            action={signupAction}
            submitLabel="Create account"
            pendingLabel="Creating account…"
          >
            <div className="grid grid-cols-2 gap-4">
              <AuthField label="First name" name="firstName" autoComplete="given-name" required />
              <AuthField label="Last name" name="lastName" autoComplete="family-name" required />
            </div>
            <AuthField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <AuthField
              label="Mobile phone"
              name="phone"
              type="tel"
              autoComplete="tel"
            />
            <AuthField
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
            />
          </AuthForm>
        </div>

        <p className="text-on-surface-variant mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:text-primary-dim font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

async function RedirectIfLoggedIn() {
  const customer = await getCurrentCustomer();
  if (customer) {
    redirect("/account");
  }
  return null;
}
