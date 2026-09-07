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
        <LegalSection title="Where we ship to">
          <p>
            We ship everywhere within the United States, United States
            Territories, and military bases. We also offer international
            shipping to select countries — read on to learn more.
          </p>
        </LegalSection>

        <LegalSection title="International shipping">
          <p>
            International customers from select countries may purchase from
            us directly through our website. Our website will automatically
            charge you for duties and taxes that will be remitted to your
            country for easy customs clearance.
          </p>
          <p>
            Customers using a freight forwarding service, or any third party
            fulfillment service, for purchases from our website do so at
            their own risk. We are not responsible for any problems that
            happen after your order leaves our warehouse, including problems
            you may have using your freight forwarder.
          </p>
          <p>
            International customers are expected to abide by their
            country&rsquo;s import laws. Any packages returned to us due to
            customs clearance problems are the sole responsibility of the
            customer.
          </p>
        </LegalSection>

        <LegalSection title="Shipping time">
          <p>
            As a small team, we work to fulfill your order as quickly as
            possible. We typically process and ship your order within 1-2
            business days.
          </p>
        </LegalSection>

        <LegalSection title="Buy online, pickup in-store">
          <p>
            If you live locally and if shipping costs and time are a
            concern, we suggest purchasing items online and picking up
            in-store. This will guarantee the items you&rsquo;d like before
            they potentially sell out.
          </p>
        </LegalSection>

        <LegalSection title="How do I check the status of my order?">
          <p>
            When your order has shipped, you will receive an email
            notification from us which will include a tracking number you
            can use to check its status. Please allow 48 hours for the
            tracking information to become available.
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
