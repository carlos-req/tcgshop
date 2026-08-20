"use client";

import { Bell, Search, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Palworld", href: "/palworld", active: true },
  { label: "Magic", href: "/magic" },
  { label: "Pokemon", href: "/pokemon" },
  { label: "Sets", href: "/sets" },
];

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-surface-container-lowest/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-container items-center gap-6 px-8 py-4">
        <Link
          href="/"
          className="shrink-0 font-display text-sm font-extrabold tracking-[0.15em] text-on-surface"
        >
          X-SPELLED
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary-dim ${
                link.active
                  ? "border-b-2 border-primary-dim pb-0.5 text-on-surface"
                  : "text-on-surface-variant"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative mx-auto hidden max-w-md flex-1 md:block">
          <Search
            className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-outline"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search for cards or sets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-outline-variant/60 bg-transparent py-2.5 pl-11 pr-4 font-mono text-sm text-on-surface placeholder:text-outline/70 focus:border-primary-dim focus:outline-none focus:ring-1 focus:ring-primary-dim/30"
          />
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
            aria-label="Account"
          >
            <User className="size-5" />
          </button>
          <Link
            href="/pre-orders"
            className="hidden text-sm font-medium text-on-surface-variant transition-colors hover:text-on-surface sm:block"
          >
            My Pre-orders
          </Link>
        </div>
      </div>
    </header>
  );
}
