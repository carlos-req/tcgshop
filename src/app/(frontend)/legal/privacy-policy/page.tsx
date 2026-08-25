import type { Metadata } from "next";

import { COMPANY_NAME } from "@/lib/site";
import { LegalSection } from "../LegalSection";

export const metadata: Metadata = {
  title: `Privacy Policy | ${COMPANY_NAME}`,
};

export default function PrivacyPolicyPage() {
  return (
    <div>
      <p className="text-label-mono text-primary">Legal</p>
      <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
        Privacy Policy
      </h1>
      <p className="text-on-surface-variant mt-3 text-sm">
        This policy explains what information {COMPANY_NAME} collects when
        you use this site, and how it&apos;s used.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <LegalSection title="Information we collect">
          <p>
            Needs to cover: account details (name, email, phone) collected at
            signup; shipping addresses; order and payment history (payment
            card data itself is handled by Stripe, not stored by{" "}
            {COMPANY_NAME} directly); and basic technical data collected
            automatically (IP address, browser/device info, pages visited).
          </p>
        </LegalSection>

        <LegalSection title="How we use information">
          <p>
            Needs to cover: fulfilling and shipping orders; account
            authentication; customer support; fraud prevention and stock
            management; and any marketing communications, with an explicit
            statement on whether those are opt-in or opt-out.
          </p>
        </LegalSection>

        <LegalSection title="Cookies and tracking">
          <p>
            Needs to cover: what cookies are set (session/auth cookies at
            minimum), and disclosure of any analytics or advertising tools if
            they&apos;re ever added. No analytics are in use as of this draft — if
            that changes, this section and a separate cookie notice need to
            be written before launch.
          </p>
        </LegalSection>

        <LegalSection title="Third-party services">
          <p>
            Needs to name every processor customer data actually passes
            through — at minimum: Stripe (payments), the hosting provider,
            and the database provider — with a short note on what each one
            sees.
          </p>
        </LegalSection>

        <LegalSection title="Data retention">
          <p>
            Needs to cover: how long account and order records are kept, and
            what happens to data after account deletion, if account deletion
            is offered.
          </p>
        </LegalSection>

        <LegalSection title="Your rights">
          <p>
            Needs to cover: how a customer can request access to, correction
            of, or deletion of their data, and which regional frameworks
            apply (e.g. GDPR, CCPA) based on where {COMPANY_NAME} actually
            ships and does business.
          </p>
        </LegalSection>

        <LegalSection title="Children's privacy">
          <p>
            Needs a statement on the minimum age to use the site and place
            orders.
          </p>
        </LegalSection>

        <LegalSection title="Changes to this policy">
          <p>
            Needs to cover: how customers are notified of material changes,
            and where the current version is always available.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Needs a real contact method (support email or mailing address)
            for privacy-related requests. [insert contact details]
          </p>
        </LegalSection>
      </div>
    </div>
  );
}
