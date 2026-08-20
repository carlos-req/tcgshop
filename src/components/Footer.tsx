import { MessageCircle, Newspaper, ShieldCheck } from "lucide-react";
import Link from "next/link";

const supportLinks = [
  { label: "Pre-order Policy & Guarantees", href: "/support/pre-order-policy" },
  { label: "Shipping & Tracking Info", href: "/support/shipping" },
  { label: "Returns & Authenticity", href: "/support/returns" },
];

const communityLinks = [
  { label: "Discord Server", href: "https://discord.gg", icon: MessageCircle },
  { label: "Collector's Blog", href: "/blog", icon: Newspaper },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-container-lowest">
      <div className="mx-auto max-w-[var(--spacing-container)] px-8 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-[family-name:var(--font-display)] text-sm font-extrabold tracking-[0.15em] text-on-surface">
              MYTHIC MARKET
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-on-surface-variant">
              The premier destination for high-end TCG collectors. Authentic
              products, secure shipping.
            </p>
          </div>

          <div>
            <h4 className="text-label-mono text-on-surface">Support</h4>
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
            <h4 className="text-label-mono text-on-surface">Community</h4>
            <ul className="mt-4 space-y-2">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                  >
                    <link.icon className="size-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6">
          <p className="text-label-mono text-outline">
            © 2024 MYTHIC MARKET TCG. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-3 text-outline">
            <ShieldCheck className="size-5" aria-label="Verified secure" />
            <div className="flex size-5 items-center justify-center rounded-full border border-outline-variant">
              <span className="text-[10px] font-bold">✓</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
