"use client";

import { useCart } from "@/lib/cart-context";

// Makes the rest of the page inert (unfocusable, unclickable, hidden from
// assistive tech) while the cart drawer is open, so it behaves like a real
// modal — keyboard/screen-reader users can't tab or navigate into content
// behind it.
export function AppShell({ children }: { children: React.ReactNode }) {
  const { isOpen } = useCart();
  return (
    <div inert={isOpen} className="flex min-h-screen flex-1 flex-col">
      {children}
    </div>
  );
}
