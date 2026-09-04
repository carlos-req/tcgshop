import type { Metadata } from "next";

import { COMPANY_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY_NAME}`,
};

export default function AboutPage() {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-8 py-16">
        <p className="text-label-mono text-primary">About</p>
        <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
          About {COMPANY_NAME}
        </h1>

        <div className="text-on-surface-variant mt-8 flex flex-col gap-4 text-sm leading-relaxed">
          <p>
            {COMPANY_NAME} sells sealed, authenticated trading card game
            product — booster boxes and packs for Magic: The Gathering,
            Palworld TCG, and more.
          </p>
          <p>
            [Placeholder — needs the actual story: who&apos;s behind{" "}
            {COMPANY_NAME}, why it exists, and what &ldquo;checked before it
            ships&rdquo; means in practice (e.g. how authenticity is
            verified before an order goes out).]
          </p>
        </div>
      </div>
    </div>
  );
}
