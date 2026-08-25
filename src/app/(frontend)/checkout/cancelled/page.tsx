import Link from "next/link";
import type { Metadata } from "next";

import { COMPANY_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Checkout cancelled | ${COMPANY_NAME}`,
};

export default function CheckoutCancelledPage() {
  return (
    <div className="bg-surface-container-lowest">
      <div className="max-w-container mx-auto flex flex-col items-center px-8 py-24 text-center">
        <h1 className="font-display text-on-surface text-3xl font-semibold italic">
          Checkout cancelled
        </h1>
        <p className="text-on-surface-variant mt-3 max-w-md text-sm">
          You have not been charged, and your cart is still here — pick up
          where you left off whenever you&apos;re ready.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="bg-primary text-on-primary hover:bg-primary-dim rounded-full px-6 py-3 text-sm font-semibold transition-colors"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
