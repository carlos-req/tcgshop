import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getCurrentCustomer } from "@/lib/auth";
import { COMPANY_NAME } from "@/lib/site";
import { loginAction } from "../(account)/actions";
import { AuthField, AuthForm } from "../(account)/AuthForm";

export const metadata: Metadata = {
  title: `Log in | ${COMPANY_NAME}`,
};

export default function LoginPage() {
  return (
    <div className="max-w-container mx-auto px-8 py-16">
      <div className="mx-auto w-full max-w-sm">
        <Suspense>
          <RedirectIfLoggedIn />
        </Suspense>

        <h1 className="font-display text-on-surface text-3xl font-semibold">
          Log in
        </h1>
        <p className="text-on-surface-variant mt-2 text-sm">
          Welcome back. Enter your details to continue.
        </p>

        <div className="mt-8">
          <AuthForm
            action={loginAction}
            submitLabel="Log in"
            pendingLabel="Logging in…"
          >
            <AuthField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <AuthField
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </AuthForm>
        </div>

        <p className="text-on-surface-variant mt-6 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:text-primary-dim font-medium">
            Sign up
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
