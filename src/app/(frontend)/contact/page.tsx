import type { Metadata } from "next";

import { COMPANY_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY_NAME}`,
};

export default function ContactPage() {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-8 py-16">
        <p className="text-label-mono text-primary">Support</p>
        <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
          Contact Us
        </h1>
        <p className="text-on-surface-variant mt-3 text-sm">
          Questions about an order, a preorder, or anything else — here&apos;s
          how to reach us.
        </p>

        <div className="text-on-surface-variant mt-8 flex flex-col gap-4 text-sm leading-relaxed">
          <p>
            [Placeholder — needs a real support email and/or contact form,
            plus expected response time.]
          </p>
        </div>
      </div>
    </div>
  );
}
