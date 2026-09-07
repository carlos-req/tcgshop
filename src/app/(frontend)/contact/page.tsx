import type { Metadata } from "next";
import { Instagram, Mail, MessageCircle } from "lucide-react";

import { COMPANY_NAME, DISCORD_URL, INSTAGRAM_URL, SUPPORT_EMAIL } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: `Contact Us | ${COMPANY_NAME}`,
};

const otherWaysToReachUs = [
  {
    label: "Email",
    detail: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
    icon: Mail,
    external: false,
  },
  {
    label: "Discord",
    detail: "Join the community",
    href: DISCORD_URL,
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Instagram",
    detail: "@xspelled",
    href: INSTAGRAM_URL,
    icon: Instagram,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-8 py-16">
        <p className="text-label-mono text-primary">Support</p>
        <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
          Contact Us
        </h1>
        <p className="text-on-surface-variant mt-3 text-sm">
          Questions about an order, a preorder, or anything else — send us a
          message or reach out directly below.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <ContactForm />
          </div>

          <div
            aria-hidden="true"
            className="border-outline-variant/40 hidden border-l md:block"
          />

          <div>
            <h2 className="font-display text-on-surface text-lg font-semibold">
              Other ways to reach us
            </h2>
            <ul className="mt-4 flex flex-col gap-4">
              {otherWaysToReachUs.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="border-outline-variant/60 bg-surface-container-low hover:border-primary-dim flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors"
                  >
                    <item.icon
                      className="text-primary size-5 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="flex flex-col">
                      <span className="text-on-surface text-sm font-medium">
                        {item.label}
                      </span>
                      <span className="text-on-surface-variant text-sm">
                        {item.detail}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
