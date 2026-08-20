import type { Metadata } from "next";
import { ArrowLeft, Check, ShoppingCart, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Palworld | Crown & Card",
  description: "Pre-Order the next Palworld drop",
};

export default function ModernHorizons3Page() {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-container px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl glass-card">
            <Image
              src="https://images.unsplash.com/photo-1606166188505-ee770d478c0d?w=600&h=600&fit=crop"
              alt="Modern Horizons 3 Play Booster Box"
              fill
              className="object-contain p-8"
              sizes="600px"
            />
          </div>

          <div>
            <span className="text-label-mono text-primary-dim">
              Magic: The Gathering
            </span>
            <h1 className="mt-2 text-display-lg text-on-surface">
              Modern Horizons 3
            </h1>
            <p className="mt-1 text-body-lg text-on-surface-variant">
              Play Booster Box — 30 Packs
            </p>

            <p className="mt-6 font-display text-4xl font-bold text-on-surface">
              $289.99
            </p>
            <p className="mt-1 text-label-mono text-on-surface-variant">
              Pre-order · Ships June 2024
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Guaranteed allocation from Wizards distributor",
                "Factory sealed with authenticity verification",
                "Free tracked shipping on orders over $150",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-on-surface-variant"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-primary-dim" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-display text-sm font-bold text-on-primary transition-all hover:bg-primary-dim glow-primary"
              >
                <ShoppingCart className="size-4" />
                Add to Pre-order
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-lg border border-outline-variant/30 bg-surface-container-low p-4">
              <Truck className="size-5 text-primary-dim" />
              <div>
                <p className="text-sm font-medium text-on-surface">
                  Estimated Delivery
                </p>
                <p className="text-sm text-on-surface-variant">
                  June 14 – June 21, 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
