import type { Metadata } from "next";

import { COMPANY_NAME } from "@/lib/site";
import { LegalSection } from "../LegalSection";

export const metadata: Metadata = {
  title: `Privacy Policy | ${COMPANY_NAME}`,
};

const LAST_UPDATED = "September 5, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <p className="text-label-mono text-primary">Legal</p>
      <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
        Privacy Policy
      </h1>
      <p className="text-on-surface-variant mt-3 text-sm">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <LegalSection title="Introduction">
          <p>
            {COMPANY_NAME} operates this store and website, including all
            related information, content, features, tools, products and
            services, in order to provide you, the customer, with a curated
            shopping experience (the &ldquo;Services&rdquo;). This Privacy
            Policy describes how we collect, use, and disclose your personal
            information when you visit, use, or make a purchase or other
            transaction using the Services or otherwise communicate with us.
            If there is a conflict between our Terms of Service and this
            Privacy Policy, this Privacy Policy controls with respect to the
            collection, processing, and disclosure of your personal
            information.
          </p>
          <p>
            Please read this Privacy Policy carefully. By using and
            accessing any of the Services, you acknowledge that you have
            read this Privacy Policy and understand the collection, use, and
            disclosure of your information as described in this Privacy
            Policy.
          </p>
        </LegalSection>

        <LegalSection title="Personal information we collect or process">
          <p>
            When we use the term &ldquo;personal information,&rdquo; we are
            referring to information that identifies or can reasonably be
            linked to you or another person. Personal information does not
            include information that is collected anonymously or that has
            been de-identified, so that it cannot identify or be reasonably
            linked to you. We may collect or process the following
            categories of personal information, including inferences drawn
            from this personal information, depending on how you interact
            with the Services, where you live, and as permitted or required
            by applicable law:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-on-surface font-medium">
                Contact details
              </span>{" "}
              including your name, address, billing address, shipping
              address, phone number, and email address.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Financial information
              </span>{" "}
              including payment card information, transaction details, form
              of payment, and payment confirmation. Full payment card
              details are collected and processed directly by our payment
              processor, Stripe, and are not stored on our own servers.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Account information
              </span>{" "}
              including your username, password, security questions,
              preferences and settings.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Transaction information
              </span>{" "}
              including the items you view, put in your cart, add to your
              wishlist, or purchase, return, exchange or cancel and your
              past transactions.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Communications with us
              </span>{" "}
              including the information you include in communications with
              us, for example, when sending a customer support inquiry.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Device information
              </span>{" "}
              including information about your device, browser, or network
              connection, your IP address, and other unique identifiers.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Usage information
              </span>{" "}
              including information regarding your interaction with the
              Services, including how and when you interact with or
              navigate the Services.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Personal information sources">
          <p>We may collect personal information from the following sources:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-on-surface font-medium">
                Directly from you
              </span>{" "}
              including when you create an account, visit or use the
              Services, communicate with us, or otherwise provide us with
              your personal information;
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Automatically through the Services
              </span>{" "}
              including from your device when you use our products or
              services or visit our websites, and through the use of
              cookies and similar technologies;
            </li>
            <li>
              <span className="text-on-surface font-medium">
                From our service providers
              </span>{" "}
              including when we engage them to enable certain technology and
              when they collect or process your personal information on our
              behalf;
            </li>
            <li>
              <span className="text-on-surface font-medium">
                From our partners or other third parties.
              </span>
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="How we use your personal information">
          <p>
            Depending on how you interact with us or which of the Services
            you use, we may use personal information for the following
            purposes:
          </p>
          <p>
            <span className="text-on-surface font-medium">
              Provide, tailor, and improve the Services.
            </span>{" "}
            We use your personal information to provide you with the
            Services, including to perform our contract with you, to
            process your payments, to fulfill your orders, to remember your
            preferences and items you are interested in, to send
            notifications to you related to your account, to process
            purchases, returns, exchanges or other transactions, to create,
            maintain and otherwise manage your account, to arrange for
            shipping, to facilitate any returns and exchanges, to enable you
            to post reviews, and to create a customized shopping experience
            for you, such as recommending products related to your
            purchases. This may include using your personal information to
            better tailor and improve the Services.
          </p>
          <p>
            <span className="text-on-surface font-medium">
              Marketing and advertising.
            </span>{" "}
            We use your personal information for marketing and promotional
            purposes, such as to send marketing, advertising and promotional
            communications by email, text message or postal mail, and to
            show you online advertisements for products or services on the
            Services or other websites, including based on items you
            previously have purchased or added to your cart and other
            activity on the Services.
          </p>
          <p>
            <span className="text-on-surface font-medium">
              Security and fraud prevention.
            </span>{" "}
            We use your personal information to authenticate your account,
            to provide a secure payment and shopping experience, detect,
            investigate or take action regarding possible fraudulent,
            illegal, unsafe, or malicious activity, protect public safety,
            and to secure our services. We also use error monitoring tools,
            such as Sentry, to help us identify, diagnose, and fix technical
            issues with the Services; this may involve processing limited
            technical information about your device and how the error
            occurred. If you choose to use the Services and register an
            account, you are responsible for keeping your account
            credentials safe. We highly recommend that you do not share your
            username, password or other access details with anyone else.
          </p>
          <p>
            <span className="text-on-surface font-medium">
              Communicating with you.
            </span>{" "}
            We use your personal information to provide you with customer
            support, to be responsive to you, to provide effective services
            to you and to maintain our business relationship with you.
          </p>
          <p>
            <span className="text-on-surface font-medium">
              Legal reasons.
            </span>{" "}
            We use your personal information to comply with applicable law
            or respond to valid legal process, including requests from law
            enforcement or government agencies, to investigate or
            participate in civil discovery, potential or actual litigation,
            or other adversarial legal proceedings, and to enforce or
            investigate potential violations of our terms or policies.
          </p>
        </LegalSection>

        <LegalSection title="How we disclose personal information">
          <p>
            In certain circumstances, we may disclose your personal
            information to third parties for legitimate purposes subject to
            this Privacy Policy. Such circumstances may include:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              With service providers who support our technology and
              operations, including Supabase (our database and backend
              infrastructure provider), Stripe (our payment processor, which
              collects and processes your payment information directly to
              complete transactions), and Sentry (our error monitoring
              provider, used to detect and resolve technical issues), as
              well as other vendors who perform services on our behalf such
              as data analytics, customer support, cloud storage,
              fulfillment and shipping.
            </li>
            <li>
              With business and marketing partners to provide marketing
              services and advertise to you. Our business and marketing
              partners will use your information in accordance with their
              own privacy notices. Depending on where you reside, you may
              have a right to direct us not to share information about you
              to show you targeted advertisements and marketing based on
              your online activity with different merchants and websites.
              You can exercise your rights to opt-out of those uses by
              contacting us using the details below.
            </li>
            <li>
              When you direct, request us or otherwise consent to our
              disclosure of certain information to third parties, such as to
              ship you products or through your use of social media widgets
              or login integrations.
            </li>
            <li>With our affiliates or otherwise within our corporate group.</li>
            <li>
              In connection with a business transaction such as a merger or
              bankruptcy, to comply with any applicable legal obligations
              (including to respond to subpoenas, search warrants and
              similar requests), to enforce any applicable terms of service
              or policies, and to protect or defend the Services, our
              rights, and the rights of our users or others.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Third party websites and links">
          <p>
            The Services may provide links to websites or other online
            platforms operated by third parties. If you follow links to
            sites not affiliated or controlled by us, you should review
            their privacy and security policies and other terms and
            conditions. We do not guarantee and are not responsible for the
            privacy or security of such sites, including the accuracy,
            completeness, or reliability of information found on these
            sites. Information you provide on public or semi-public venues,
            including information you share on third-party social
            networking platforms may also be viewable by other users of the
            Services and/or users of those third-party platforms without
            limitation as to its use by us or by a third party. Our
            inclusion of such links does not, by itself, imply any
            endorsement of the content on such platforms or of their owners
            or operators, except as disclosed on the Services.
          </p>
        </LegalSection>

        <LegalSection title="Children's data">
          <p>
            The Services are not intended to be used by children, and we do
            not knowingly collect any personal information about children
            under the age of majority in your jurisdiction. If you are the
            parent or guardian of a child who has provided us with their
            personal information, you may contact us using the contact
            details set out below to request that it be deleted. As of the
            effective date of this Privacy Policy, we do not have actual
            knowledge that we &ldquo;share&rdquo; or &ldquo;sell&rdquo; (as
            those terms are defined in applicable law) personal information
            of individuals under 16 years of age.
          </p>
        </LegalSection>

        <LegalSection title="Security and retention of your information">
          <p>
            Please be aware that no security measures are perfect or
            impenetrable, and we cannot guarantee &ldquo;perfect
            security.&rdquo; In addition, any information you send to us may
            not be secure while in transit. We recommend that you do not use
            unsecure channels to communicate sensitive or confidential
            information to us.
          </p>
          <p>
            How long we retain your personal information depends on
            different factors, such as whether we need the information to
            maintain your account, to provide you with Services, comply
            with legal obligations, resolve disputes or enforce other
            applicable contracts and policies.
          </p>
        </LegalSection>

        <LegalSection title="Your rights and choices">
          <p>
            Depending on where you live, you may have some or all of the
            rights listed below in relation to your personal information.
            However, these rights are not absolute, may apply only in
            certain circumstances and, in certain cases, we may decline your
            request as permitted by law.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-on-surface font-medium">
                Right to access / know.
              </span>{" "}
              You may have a right to request access to personal information
              that we hold about you.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Right to delete.
              </span>{" "}
              You may have a right to request that we delete personal
              information we maintain about you.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Right to correct.
              </span>{" "}
              You may have a right to request that we correct inaccurate
              personal information we maintain about you.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Right of portability.
              </span>{" "}
              You may have a right to receive a copy of the personal
              information we hold about you and to request that we transfer
              it to a third party, in certain circumstances and with certain
              exceptions.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Right to opt out of sale or sharing for targeted
                advertising.
              </span>{" "}
              Depending on where you reside, you may have a right to opt out
              of the &ldquo;sale&rdquo; or &ldquo;share&rdquo; of your
              personal information or to opt out of the processing of your
              personal information for purposes considered to be
              &ldquo;targeted advertising,&rdquo; as defined in applicable
              privacy laws. You can exercise your rights to opt-out of those
              uses by contacting us using the details below. Please note
              that if you visit our website with the Global Privacy Control
              opt-out preference signal enabled, depending on where you are,
              we will automatically treat this as a request to opt-out for
              the device and browser that you use to visit the website. To
              learn more about Global Privacy Control, you can visit{" "}
              <a
                href="https://globalprivacycontrol.org/"
                className="text-primary underline underline-offset-2"
              >
                globalprivacycontrol.org
              </a>
              . Other than the Global Privacy Control, we do not recognize
              other &ldquo;Do Not Track&rdquo; signals that may be sent from
              your web browser or device.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Managing communication preferences.
              </span>{" "}
              We may send you promotional emails, and you may opt out of
              receiving these at any time by using the unsubscribe option
              displayed in our emails to you. If you opt out, we may still
              send you non-promotional emails, such as those about your
              account or orders that you have made.
            </li>
          </ul>
          <p>
            If you reside in the UK or European Economic Area, and subject
            to exceptions and limitations provided by local law, you may
            exercise the following rights in addition to the rights
            outlined above:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <span className="text-on-surface font-medium">
                Objection to processing and restriction of processing:
              </span>{" "}
              You may have the right to ask us to stop or restrict our
              processing of personal information for certain purposes.
            </li>
            <li>
              <span className="text-on-surface font-medium">
                Withdrawal of consent:
              </span>{" "}
              Where we rely on consent to process your personal information,
              you have the right to withdraw this consent. If you withdraw
              your consent, this will not affect the lawfulness of any
              processing based on your consent before its withdrawal.
            </li>
          </ul>
          <p>
            You may exercise any of these rights where indicated on the
            Services or by contacting us using the contact details provided
            below.
          </p>
          <p>
            We will not discriminate against you for exercising any of these
            rights. We may need to verify your identity before we can
            process your requests, as permitted or required under
            applicable law. In accordance with applicable laws, you may
            designate an authorized agent to make requests on your behalf to
            exercise your rights. Before accepting such a request from an
            agent, we will require that the agent provide proof you have
            authorized them to act on your behalf, and we may need you to
            verify your identity directly with us. We will respond to your
            request in a timely manner as required under applicable law.
          </p>
        </LegalSection>

        <LegalSection title="Complaints">
          <p>
            If you have complaints about how we process your personal
            information, please contact us using the contact details
            provided below. Depending on where you live, you may have the
            right to appeal our decision by contacting us using the contact
            details set out below, or lodge your complaint with your local
            data protection authority. For the EEA, you can find a list of
            the responsible data protection supervisory authorities on the
            European Commission&rsquo;s website.
          </p>
        </LegalSection>

        <LegalSection title="International transfers">
          <p>
            Please note that we may transfer, store and process your
            personal information outside the country you live in.
          </p>
          <p>
            If we transfer your personal information out of the European
            Economic Area or the United Kingdom, we will rely on recognized
            transfer mechanisms like the European Commission&rsquo;s
            Standard Contractual Clauses, or any equivalent contracts issued
            by the relevant competent authority of the UK, as relevant,
            unless the data transfer is to a country that has been
            determined to provide an adequate level of protection.
          </p>
        </LegalSection>

        <LegalSection title="Changes to this Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time, including
            to reflect changes to our practices or for other operational,
            legal, or regulatory reasons. We will post the revised Privacy
            Policy on this website, update the &ldquo;Last updated&rdquo;
            date and provide notice as required by applicable law.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            Should you have any questions about our privacy practices or
            this Privacy Policy, or if you would like to exercise any of the
            rights available to you, please email us at{" "}
            <a
              href="mailto:support@xspelled.com"
              className="text-primary underline underline-offset-2"
            >
              support@xspelled.com
            </a>
            . For the purpose of applicable data protection laws, we are the
            data controller of your personal information.
          </p>
        </LegalSection>
      </div>
    </div>
  );
}
