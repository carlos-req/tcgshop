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
        We offer preorders for most products from the titles we carry.
        Please review this policy to understand how the process works.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <LegalSection title="Preorder terms & payment">
          <p>
            When you preorder from us, you are agreeing to purchase products
            ahead of their release date at the price advertised at the time
            of purchase. Preorder items may be purchased through our website
            or in-store.
          </p>
          <p>
            Payment for preorder items is required at the time of purchase.
            Your payment method will be charged immediately upon completing
            an order containing preorder items, but those items will not be
            fulfilled until a later date.
          </p>
        </LegalSection>

        <LegalSection title="Preorder fulfillment">
          <p>
            We ask that you do not combine in-stock and preorder items, or
            preorder items with different release dates, into a single
            order. Orders containing preorder items will not be fulfilled
            until all items in that order have been released and are in our
            possession. If an order includes both in-stock and preorder
            items, the entire order will be held until all products are
            ready to ship. Requests to split an order into multiple
            shipments will incur an additional shipping fee, even if the
            original order qualified for free shipping.
          </p>
          <p>
            We adhere to the publisher&rsquo;s guidelines when fulfilling
            preorder items. This may result in shipping preorders ahead of,
            on, or shortly after the release date. In-store orders, or
            online orders with in-store pickup selected, will be fulfilled
            on the release day. For titles where we qualify as an Organized
            Play store with early release privileges, preorder items will be
            available at the earliest date authorized by the publisher.
          </p>
          <p>
            Please note that all release dates and fulfillment timelines are
            estimates. In the event of delays, we will fulfill your
            preordered items as soon as possible. However, we are not
            responsible for delays caused by the manufacturer, publisher,
            distributor, courier, shipping service, or any other party
            involved in the fulfillment process.
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
                via email, and the fee must be accepted in writing before
                the cancellation is finalized.
              </li>
            </ul>
          </div>

          <div>
            <p className="text-on-surface font-medium">
              After the cancellation deadline
            </p>
            <p className="mt-2">
              Preorder cancellations are not accepted. Customers assume and
              accept all risks when purchasing unreleased products,
              including but not limited to delays, quality issues, price
              fluctuations, changes in interest, or financial hardship.
              Exceptions may be made on a case-by-case basis, but approved
              cancellations after the deadline will be subject to a 35%
              cancellation fee.
            </p>
          </div>

          <p>
            If we must cancel your preorder (without your request), you will
            receive a full refund with no cancellation fees.
          </p>
        </LegalSection>

        <LegalSection title="Preorder cancellations (international orders)">
          <p>
            Preordering products before their release date involves certain
            risks. By placing a preorder, you agree to a binding purchase
            agreement for the product at the advertised price.
          </p>
          <p>
            We cannot accept cancellations for orders from customers
            residing outside of the US.
          </p>
        </LegalSection>

        <LegalSection title="Preorder availability & allocations">
          <p>
            Not all titles are eligible for preorder, and some products may
            only become available for preorder closer to their release date
            or in limited quantities. Availability is not guaranteed.
          </p>
          <p>
            In the event of product shortages beyond our control, we may
            cancel orders in full or in part to manage inventory. If an
            order is canceled due to shortages, no cancellation fees will be
            charged.
          </p>
          <p>
            We reserve the right to modify or cancel preorders at any time,
            for any reason, without prior notice.
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
