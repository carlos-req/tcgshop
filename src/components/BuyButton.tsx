"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface BuyButtonProps {
  categorySlug: string;
  productSlug: string;
  label: string;
  className: string;
  disabled: boolean;
  showIcon?: boolean;
}

export function BuyButton({
  categorySlug,
  productSlug,
  label,
  className,
  disabled,
  showIcon = true,
}: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categorySlug, productSlug }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled || loading}
        className={className}
      >
        {showIcon && <ShoppingCart className="size-4" aria-hidden="true" />}
        {loading ? "Redirecting…" : label}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-500" aria-live="polite">
          {error}
        </p>
      )}
    </div>
  );
}
