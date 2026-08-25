import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";

import { ClearCartOnMount } from "@/components/ClearCartOnMount";
import { COMPANY_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Order confirmed | ${COMPANY_NAME}`,
};

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-surface-container-lowest">
      <ClearCartOnMount />
      <div className="max-w-container mx-auto flex flex-col items-center px-8 py-24 text-center">
        <ShieldCheck className="text-primary size-12" aria-hidden="true" />
        <h1 className="font-display text-on-surface mt-6 text-3xl font-semibold italic">
          Payment successful
        </h1>
        <p className="text-on-surface-variant mt-3 max-w-md text-sm">
          Thanks for your order — you&apos;ll receive a confirmation email
          shortly, and it&apos;ll show up in your order history once it&apos;s
          processed.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/account/orders"
            className="bg-primary text-on-primary hover:bg-primary-dim rounded-full px-6 py-3 text-sm font-semibold transition-colors"
          >
            View order history
          </Link>
          <Link
            href="/"
            className="border-outline-variant text-on-surface-variant hover:border-outline hover:text-on-surface rounded-full border px-6 py-3 text-sm font-semibold transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
