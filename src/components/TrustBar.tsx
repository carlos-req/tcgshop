import { Headphones, ShieldCheck, Truck } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    label: "100% Verified Authenticity",
  },
  {
    icon: Truck,
    label: "Secure, Tracked Shipping on All Orders",
  },
  {
    icon: Headphones,
    label: "Dedicated Collector Support",
  },
];

export function TrustBar() {
  return (
    <div className="border-b border-white/5 bg-surface-container-low">
      <div className="mx-auto flex max-w-[var(--spacing-container)] flex-wrap items-center justify-center gap-x-10 gap-y-2 px-8 py-2.5">
        {trustItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 text-sm text-on-surface-variant"
          >
            <item.icon className="size-3.5 shrink-0 text-primary-dim" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
