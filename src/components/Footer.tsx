import { Info, Instagram, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { DISCORD_URL, INSTAGRAM_URL } from "@/lib/site";

const supportLinks = [
  { label: "Refunds & Cancellations", href: "/legal/returns-policy" },
  { label: "Preorder Policy", href: "/legal/preorder-policy" },
  { label: "Shipping Policy", href: "/legal/shipping-policy" },
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
];

const communityLinks = [
  { label: "About Us", href: "/about", icon: Info, external: false },
  { label: "Contact Us", href: "/contact", icon: Mail, external: false },
  {
    label: "Discord Server",
    href: DISCORD_URL,
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: Instagram,
    external: true,
  },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Returns Policy", href: "/legal/returns-policy" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-container-lowest">
      <div className="mx-auto max-w-container px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold text-on-surface">
              X-Spelled
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-surface-variant">
              Sealed booster boxes and packs, checked before they ship.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-on-surface">More Info</h4>
            <ul className="mt-4 space-y-2">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-on-surface">Community</h4>
            <ul className="mt-4 space-y-2">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                  >
                    <link.icon className="size-4" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p className="text-sm text-outline">
              © 2026 X-Spelled. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-outline transition-colors hover:text-on-surface-variant"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-3 text-outline">
            <ShieldCheck className="size-5" aria-hidden="true" />
            <span className="text-sm">Verified secure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
