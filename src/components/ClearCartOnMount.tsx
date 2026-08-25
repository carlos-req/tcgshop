"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

export function ClearCartOnMount() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
    // Runs once on mount, right after a successful checkout redirect — not a
    // response to cart state changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
