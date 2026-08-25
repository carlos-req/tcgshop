import type { Metadata } from "next";

import { COMPANY_NAME } from "@/lib/site";
import { LegalSection } from "../LegalSection";

export const metadata: Metadata = {
  title: `Returns Policy | ${COMPANY_NAME}`,
};

export default function ReturnsPolicyPage() {
  return (
    <div>
      <p className="text-label-mono text-primary">Legal</p>
      <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
        Returns &amp; Refund Policy
      </h1>
      <p className="text-on-surface-variant mt-3 text-sm">
        What to expect if something arrives wrong, damaged, or you change
        your mind.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <LegalSection title="Sealed product policy">
          <p>
            Trading card products lose their resale value once opened, so
            this needs to state clearly whether opened/unsealed product can
            be returned at all, or only unopened/factory-sealed items — this
            is the single most important decision in this whole policy and
            should be made deliberately, not left as a placeholder.
          </p>
        </LegalSection>

        <LegalSection title="Return window">
          <p>
            Needs a specific number of days from delivery within which a
            return or exchange can be requested.
          </p>
        </LegalSection>

        <LegalSection title="Damaged, missing, or incorrect items">
          <p>
            Needs to cover: how to report a damaged shipment (ideally with
            photo evidence), the timeframe to report it in, and whether{" "}
            {COMPANY_NAME} covers replacement shipping in these cases.
          </p>
        </LegalSection>

        <LegalSection title="Authenticity guarantee">
          <p>
            Needs to state what happens if a customer believes they received
            a non-authentic or previously-opened-and-resealed product —
            this should tie back to the &ldquo;factory-sealed and
            verified&rdquo; promise made on product pages.
          </p>
        </LegalSection>

        <LegalSection title="How to request a return">
          <p>
            Needs the actual process: contact method, whether a return
            authorization is required before shipping anything back, and who
            pays return shipping in each scenario.
          </p>
        </LegalSection>

        <LegalSection title="Refunds">
          <p>
            Needs to cover: refund method (original payment method via
            Stripe), processing time once a return is received, and whether
            original shipping costs are refunded.
          </p>
        </LegalSection>

        <LegalSection title="Preorder cancellations">
          <p>
            Needs to cover whether and until when a preorder can be
            cancelled for a full refund before it ships — should stay
            consistent with the Preorders section of the Terms of Service.
          </p>
        </LegalSection>

        <LegalSection title="Non-returnable items">
          <p>
            Needs an explicit list, once one exists (e.g. opened packs,
            clearance/final-sale items if those are ever introduced).
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>[insert contact details]</p>
        </LegalSection>
      </div>
    </div>
  );
}
