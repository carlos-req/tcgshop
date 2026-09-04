import type { Metadata } from "next";

import { COMPANY_NAME } from "@/lib/site";
import { LegalSection } from "../LegalSection";

export const metadata: Metadata = {
  title: `Preorder Policy | ${COMPANY_NAME}`,
};

export default function PreorderPolicyPage() {
  return (
    <div>
      <p className="text-label-mono text-primary">Legal</p>
      <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
        Preorder Policy
      </h1>
      <p className="text-on-surface-variant mt-3 text-sm">
        What to expect when you preorder sealed product ahead of release.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <LegalSection title="What a preorder guarantees">
          <p>
            Needs to state clearly what placing a preorder actually secures
            (allocation at the listed price) versus what it doesn&apos;t
            (a specific ship date isn&apos;t a guarantee if the underlying
            product is delayed by the manufacturer/distributor).
          </p>
        </LegalSection>

        <LegalSection title="Payment timing">
          <p>
            Needs to state whether the customer is charged in full at
            checkout or only when the item ships — this should match how
            checkout is actually implemented, not be decided independently
            of it.
          </p>
        </LegalSection>

        <LegalSection title="Estimated ship dates">
          <p>
            Needs to state that dates shown on product pages are estimates
            from the manufacturer/distributor and may shift, and how
            customers are notified if a date changes materially.
          </p>
        </LegalSection>

        <LegalSection title="Cancelling a preorder">
          <p>
            Needs to cover whether and until when a preorder can be
            cancelled for a full refund before it ships — should stay
            consistent with the Preorders section of the Terms of Service
            and with the Refunds &amp; Cancellations policy.
          </p>
        </LegalSection>

        <LegalSection title="If a preorder is delayed or cancelled by us">
          <p>
            Needs to cover what happens if {COMPANY_NAME} itself has to
            delay or cancel a preorder (e.g. the distributor never
            delivers) — refund timing and whether customers are notified
            proactively.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>[insert contact details]</p>
        </LegalSection>
      </div>
    </div>
  );
}
