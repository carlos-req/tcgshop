"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/product-display";

export function CartDrawer() {
  const { items, isOpen, subtotal, closeCart, removeItem, setQuantity } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCart();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (isOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      closeButtonRef.current?.focus();
    } else {
      previouslyFocusedRef.current?.focus();
    }
  }, [isOpen]);

  async function handleCheckout() {
    setError(null);
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            categorySlug: item.categorySlug,
            productSlug: item.productSlug,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setIsCheckingOut(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setIsCheckingOut(false);
    }
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`bg-surface-container-lowest fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="border-outline-variant/60 flex items-center justify-between border-b px-6 py-5">
          <h2 className="font-display text-on-surface text-xl font-semibold">
            Your cart
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface cursor-pointer rounded-full p-2 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag
              className="text-outline size-10"
              aria-hidden="true"
            />
            <p className="text-on-surface-variant text-sm">
              Your cart is empty.
            </p>
            <Link
              href="/"
              onClick={closeCart}
              className="text-primary hover:text-primary-dim text-sm font-medium"
            >
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-outline-variant/60 flex-1 divide-y overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.productId} className="flex gap-4 py-5">
                  <div className="bg-surface-container-low relative size-20 shrink-0 overflow-hidden rounded-lg">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    )}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/${item.categorySlug}/${item.productSlug}`}
                        onClick={closeCart}
                        className="text-on-surface hover:text-primary-dim line-clamp-2 text-sm font-medium"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Remove ${item.name} from cart`}
                        className="text-on-surface-variant hover:text-error shrink-0 cursor-pointer transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="border-outline-variant/60 flex items-center rounded-full border">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="text-on-surface-variant hover:text-on-surface cursor-pointer p-1.5 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="text-on-surface w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(item.productId, item.quantity + 1)
                          }
                          aria-label={`Increase quantity of ${item.name}`}
                          className="text-on-surface-variant hover:text-on-surface cursor-pointer p-1.5"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="font-display text-on-surface text-sm font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-outline-variant/60 border-t px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-display text-on-surface text-base font-semibold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-on-surface-variant mt-1 text-xs">
                Shipping and taxes calculated at checkout.
              </p>

              {error ? (
                <p role="alert" className="text-error mt-3 text-sm font-medium">
                  {error}
                </p>
              ) : null}

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="bg-primary text-on-primary hover:bg-primary-dim mt-4 w-full cursor-pointer rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCheckingOut ? "Redirecting to checkout…" : "Checkout"}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
