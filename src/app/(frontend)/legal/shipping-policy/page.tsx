import type { Metadata } from "next";

import { COMPANY_NAME } from "@/lib/site";
import { LegalSection } from "../LegalSection";

export const metadata: Metadata = {
  title: `Shipping Policy | ${COMPANY_NAME}`,
};

export default function ShippingPolicyPage() {
  return (
    <div>
      <p className="text-label-mono text-primary">Legal</p>
      <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
        Shipping Policy
      </h1>
      <p className="text-on-surface-variant mt-3 text-sm">
        How orders are packaged, shipped, and tracked.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <LegalSection title="Where we ship">
          <p>
            Needs to state which countries/regions are currently served —
            checkout is currently limited to US shipping addresses, so this
            should stay in sync with that.
          </p>
        </LegalSection>

        <LegalSection title="Shipping rates and speed">
          <p>
            Needs to cover the shipping options offered at checkout, their
            cost, and estimated transit time once a package ships.
          </p>
        </LegalSection>

        <LegalSection title="Processing time">
          <p>
            Needs to state how long after an order is placed it actually
            ships (order processing time, separate from transit time).
          </p>
        </LegalSection>

        <LegalSection title="Packaging">
          <p>
            Needs to describe how sealed product is packaged/protected in
            transit, since this is part of the &ldquo;factory-sealed and
            verified&rdquo; promise made on product pages.
          </p>
        </LegalSection>

        <LegalSection title="Tracking">
          <p>
            Needs to state when and how tracking information is sent to the
            customer once a package ships.
          </p>
        </LegalSection>

        <LegalSection title="Lost or damaged in transit">
          <p>
            Needs to cover how to report a package that never arrives or
            arrives damaged, and how that&apos;s resolved — should stay
            consistent with the Refunds &amp; Cancellations policy.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>[insert contact details]</p>
        </LegalSection>
      </div>
    </div>
  );
}
