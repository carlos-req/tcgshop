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
        What to expect if you need to make changes to an order.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <LegalSection title="All sales are final">
          <p>
            Due to the nature of our merchandise, we cannot accept returns,
            exchanges, or refunds. Please be very careful that you purchase
            the correct item and correct quantity of the item you would like.
          </p>
          <p>
            Once we ship your package, any damages are the responsibility of
            the shipping carrier.
          </p>
          <p>
            You can always contact us with any questions at{" "}
            <a
              href="mailto:support@xspelled.com"
              className="text-primary underline underline-offset-2"
            >
              support@xspelled.com
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="International orders">
          <p>
            We cannot accept cancellations for orders from customers residing
            outside of the US.
          </p>
        </LegalSection>

        <LegalSection title="Preorder cancellations">
          <p>
            Preordering products before their release date involves certain
            risks. By placing a preorder, you agree to a binding purchase
            agreement for the product at the advertised price.
          </p>

          <div>
            <p className="text-on-surface font-medium">
              Cancellation requests
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>
                <span className="text-on-surface font-medium">
                  Deadline —
                </span>{" "}
                cancellation requests must be made prior to the deadline
                stated on the product page. If no cancellation deadline is
                listed, the preorder is non-cancellable.
              </li>
              <li>
                <span className="text-on-surface font-medium">Fees —</span>{" "}
                approved cancellations will incur a fee of 10% of the total
                value of the items canceled. Partial cancellations are also
                subject to this fee. Cancellation requests must be submitted
                via email, and the fee must be accepted in writing before the
                cancellation is finalized.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-on-surface font-medium">
              After the cancellation deadline
            </p>
            <p className="mt-2">
              Preorder cancellations are not accepted. Customers assume and
              accept all risks when purchasing unreleased products, including
              but not limited to delays, quality issues, price fluctuations,
              changes in interest, or financial hardship. Exceptions may be
              made on a case-by-case basis, but approved cancellations after
              the deadline will be subject to a 35% cancellation fee.
            </p>
          </div>

          <p>
            If we must cancel your preorder (without your request), you will
            receive a full refund with no cancellation fees.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Questions about this policy can be sent to{" "}
            <a
              href="mailto:support@xspelled.com"
              className="text-primary underline underline-offset-2"
            >
              support@xspelled.com
            </a>
            .
          </p>
        </LegalSection>
      </div>
    </div>
  );
}
