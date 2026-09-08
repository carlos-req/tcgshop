"use client";

import { useEffect, useReducer } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie-notice-dismissed";

function visibilityReducer(_state: boolean, action: boolean) {
  return action;
}

export function CookieNotice() {
  const [visible, setVisible] = useReducer(visibilityReducer, false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== "true");
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // localStorage unavailable — banner will just reappear next visit
    }
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/5 bg-surface-container-lowest"
    >
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <p className="max-w-2xl text-sm text-on-surface-variant">
          We use essential cookies to keep your account and cart working. We
          don&apos;t use tracking or advertising cookies. See our{" "}
          <Link
            href="/legal/privacy-policy"
            className="text-on-surface underline underline-offset-2 hover:text-primary"
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="bg-primary text-on-primary shrink-0 rounded-lg px-4 py-2 text-sm font-semibold"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
