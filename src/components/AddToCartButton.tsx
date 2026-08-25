"use client";

import { ShoppingCart } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/lib/cart-context";

interface AddToCartButtonProps {
  product: Product;
  label: string;
  className: string;
  disabled: boolean;
  showIcon?: boolean;
}

export function AddToCartButton({
  product,
  label,
  className,
  disabled,
  showIcon = true,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      disabled={disabled}
      className={className}
    >
      {showIcon && <ShoppingCart className="size-4" aria-hidden="true" />}
      {label}
    </button>
  );
}
