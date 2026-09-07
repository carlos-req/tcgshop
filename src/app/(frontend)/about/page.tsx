import type { Metadata } from "next";

import { COMPANY_NAME, DISCORD_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `About Us | ${COMPANY_NAME}`,
};

export default function AboutPage() {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-8 py-16">
        <p className="text-label-mono text-primary">About</p>
        <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
          Our Core Values
        </h1>

        <div className="text-on-surface-variant mt-8 flex flex-col gap-6 text-sm leading-relaxed">
          <p>
            We&apos;re {COMPANY_NAME} and we pride ourselves on being the{" "}
            {COMPANY_NAME} our customers recommend when asked for a safe,
            reliable place to purchase sealed trading card products.
          </p>

          <div>
            <h2 className="font-display text-on-surface text-lg font-semibold">
              We make it easy!
            </h2>
            <p className="mt-2">
              Our inventory online is everything we have so our catalogue is
              right at your fingertips.
            </p>
          </div>

          <div>
            <h2 className="font-display text-on-surface text-lg font-semibold">
              We make it fast!
            </h2>
            <p className="mt-2">
              If you need anything shipped, we&apos;ll have it on your way
              within one or two business days (with the exception of
              preorders). We understand the excitement of wanting to rip
              open a set you&apos;ve been really looking forward to, so we
              really care about getting your packages delivered to you as
              quickly as possible. We also take pride in meticulously
              packaging your order so it arrives to you safely.
            </p>
          </div>

          <p>
            {COMPANY_NAME} specializes in good vibes and community. We pride
            ourselves on cultivating community and being a safe haven for
            collectors.
          </p>

          <p>
            Join our{" "}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              Discord
            </a>{" "}
            to stay up to date on all events, the latest news, preorders,
            product releases, our latest shipments, and talk to others in
            our community.
          </p>

          <div>
            <h2 className="font-display text-on-surface text-lg font-semibold">
              Things We Don&apos;t
            </h2>
            <p className="mt-2">
              We believe if you want to specialize in something, you
              can&apos;t spread yourself thin. Because we are so focused on
              sealed product, we choose not to focus on singles. We do not
              purchase singles and we do not sell singles in-store. If you
              are interested in our small selection of singles, please visit
              our site or our TCGPlayer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
