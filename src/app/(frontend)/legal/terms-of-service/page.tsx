import type { Metadata } from "next";

import { COMPANY_NAME } from "@/lib/site";
import { LegalSection } from "../LegalSection";

export const metadata: Metadata = {
  title: `Terms of Service | ${COMPANY_NAME}`,
};

export default function TermsOfServicePage() {
  return (
    <div>
      <p className="text-label-mono text-primary">Legal</p>
      <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
        Terms of Service
      </h1>
      <p className="text-on-surface-variant mt-3 text-sm">
        These terms govern your use of {COMPANY_NAME} and any purchase made
        through it.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <LegalSection title="Acceptance of terms">
          <p>
            Needs to state that placing an order or creating an account means
            agreeing to these terms, and to the Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection title="Accounts">
          <p>
            Needs to cover: accuracy of account information, responsibility
            for keeping login credentials secure, and grounds on which{" "}
            {COMPANY_NAME} may suspend or terminate an account (e.g. fraud,
            abuse, chargebacks).
          </p>
        </LegalSection>

        <LegalSection title="Orders, pricing, and payment">
          <p>
            Needs to cover: that prices and stock are subject to change,
            that an order confirmation isn&apos;t a guarantee of availability
            until payment is captured, how pricing errors are handled, and
            that payment is processed by Stripe under its own terms.
          </p>
        </LegalSection>

        <LegalSection title="Preorders">
          <p>
            Needs its own clear terms: estimated ship dates aren&apos;t
            guaranteed, how customers are notified of delays, and whether
            preorders can be cancelled for a refund before they ship.
          </p>
        </LegalSection>

        <LegalSection title="Shipping and risk of loss">
          <p>
            Needs to cover: carriers used, estimated timelines, and at what
            point risk transfers to the customer (typically on handoff to the
            carrier) — this should stay consistent with the Returns Policy.
          </p>
        </LegalSection>

        <LegalSection title="Product authenticity">
          <p>
            Needs to state the authenticity/sealed-product guarantee that&apos;s
            already implied on the storefront (&ldquo;factory-sealed and verified
            before it ships&rdquo;) as an actual contractual commitment, with
            whatever verification process backs it up.
          </p>
        </LegalSection>

        <LegalSection title="Intellectual property">
          <p>
            Needs to cover: {COMPANY_NAME}&apos;s ownership of site content and
            branding, and a note that product names/artwork belong to their
            respective publishers (Wizards of the Coast, Pokémon,
            Palworld&apos;s rights holder, etc.) and are used for
            identification only.
          </p>
        </LegalSection>

        <LegalSection title="Prohibited use">
          <p>
            Needs to cover: no reselling through automated/bot purchasing, no
            fraudulent payment methods, no abuse of the preorder or returns
            process.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of liability">
          <p>
            Needs standard limitation-of-liability language — this section
            in particular should not go live without an actual attorney
            drafting it.
          </p>
        </LegalSection>

        <LegalSection title="Governing law">
          <p>
            Needs the jurisdiction whose law governs these terms, based on
            where {COMPANY_NAME} is legally registered.
          </p>
        </LegalSection>

        <LegalSection title="Changes to these terms">
          <p>
            Needs to cover how customers are notified of material changes.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>[insert contact details]</p>
        </LegalSection>
      </div>
    </div>
  );
}
