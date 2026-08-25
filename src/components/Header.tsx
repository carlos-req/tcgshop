"use client";

import { Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, type ChangeEvent, type SubmitEvent } from "react";
import { useCart } from "@/lib/cart-context";

const navLinks: Array<{ label: string; href: string }> = [
  { label: "Palworld", href: "/palworld" },
  { label: "Magic", href: "/magic" },
  { label: "Pokemon", href: "/pokemon" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    [],
  );

  // Site search isn't built yet — this form exists so Enter submits
  // properly (rather than doing nothing) instead of a bare, unlabeled input.
  // TODO: wire to a real /search route once that feature exists.
  function handleSearchSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <header className="bg-surface-container-lowest/90 sticky top-0 z-50 border-b border-white/5 backdrop-blur-md">
      <div className="max-w-container mx-auto flex items-center gap-6 px-8 py-4">
        <Link
          href="/"
          className="font-display text-on-surface shrink-0 text-lg font-semibold"
        >
          X-Spelled
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active = pathname?.startsWith(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`hover:text-primary-dim text-sm font-medium transition-colors ${
                  active
                    ? "border-primary-dim text-on-surface border-b-2 pb-0.5"
                    : "text-on-surface-variant"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <form
          role="search"
          onSubmit={handleSearchSubmit}
          className="relative mx-auto hidden max-w-md flex-1 md:block"
        >
          <label htmlFor="site-search" className="sr-only">
            Search for cards or sets
          </label>
          <Search
            className="text-outline absolute top-1/2 left-4 size-4 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            id="site-search"
            type="search"
            name="q"
            autoComplete="off"
            placeholder="Search for cards or sets…"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border-outline-variant/60 text-on-surface placeholder:text-outline/70 focus-visible:border-primary-dim focus-visible:ring-primary-dim/30 w-full rounded-full border bg-transparent py-2.5 pr-4 pl-11 font-mono text-sm focus-visible:ring-1 focus-visible:outline-none"
          />
        </form>

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            onClick={openCart}
            className="text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface relative cursor-pointer rounded-full p-2 transition-colors"
            aria-label={`Cart${itemCount > 0 ? `, ${itemCount} item${itemCount === 1 ? "" : "s"}` : ""}`}
          >
            <ShoppingBag className="size-5" />
            {itemCount > 0 && (
              <span
                aria-hidden="true"
                className="bg-primary text-on-primary absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-semibold"
              >
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </button>
          <Link
            href="/account"
            className="text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface rounded-full p-2 transition-colors"
            aria-label="Account"
          >
            <User className="size-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
