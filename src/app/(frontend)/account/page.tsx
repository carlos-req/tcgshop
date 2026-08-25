import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getCurrentCustomer } from "@/lib/auth";
import { getCustomerOrders } from "@/data/orders";
import { logoutAction } from "../(account)/actions";
import { OrderList } from "../(account)/OrderList";
import { ProfileForm } from "../(account)/ProfileForm";

const ORDER_PREVIEW_COUNT = 3;

export const metadata: Metadata = {
  title: "My account | X-Spelled",
};

export default function AccountPage() {
  return (
    <div className="bg-surface-container-lowest">
      <div className="max-w-container mx-auto px-8 py-16">
        <Suspense fallback={<AccountFallback />}>
          <AccountContent />
        </Suspense>
      </div>
    </div>
  );
}

function AccountFallback() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="bg-surface-container h-40 animate-pulse rounded-xl" />
      <div className="bg-surface-container h-96 animate-pulse rounded-xl" />
      <div className="bg-surface-container h-28 animate-pulse rounded-xl" />
    </div>
  );
}

async function AccountContent() {
  const customer = await getCurrentCustomer();
  if (!customer) {
    redirect("/login");
  }

  const collectorNo = String(customer.id).padStart(6, "0");
  const memberSince = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  })
    .format(new Date(customer.createdAt))
    .toUpperCase();

  const orders = await getCustomerOrders(customer.id, ORDER_PREVIEW_COUNT);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      {/* Collector card — the account page's one signature flourish: an
          identity block styled like a membership/authentication card
          rather than a generic profile header, with a quiet static foil
          glow (not the mouse-tracked holo effect, which stays exclusive
          to the homepage hero). */}
      <section className="tcg-card relative overflow-hidden rounded-xl px-7 py-6 sm:px-9 sm:py-7">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(200,155,60,0.35), transparent 70%)",
          }}
        />
        <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-label-mono text-primary">Collector card</p>
            <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
              {customer.firstName} {customer.lastName}
            </h1>
            <p className="text-on-surface-variant mt-1 text-sm">
              {customer.email}
            </p>
          </div>
          <div className="text-label-mono text-on-surface-variant flex shrink-0 flex-col gap-1.5 sm:items-end sm:text-right">
            <span>
              Collector no.{" "}
              <span className="text-on-surface">{collectorNo}</span>
            </span>
            <span>
              Member since{" "}
              <span className="text-on-surface">{memberSince}</span>
            </span>
          </div>
        </div>
      </section>

      <section className="tcg-card rounded-xl px-6 py-5">
        <h2 className="text-label-mono text-on-surface-variant">
          Profile details
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm">
          Email <span className="text-on-surface">{customer.email}</span> —
          contact us to change the address you log in with.
        </p>
        <div className="mt-5">
          <ProfileForm customer={customer} />
        </div>
      </section>

      <section className="tcg-card rounded-xl px-6 py-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-label-mono text-on-surface-variant">
            Order history
          </h2>
          {orders.length > 0 ? (
            <Link
              href="/account/orders"
              className="text-primary hover:text-primary-dim text-sm font-medium"
            >
              View all
            </Link>
          ) : null}
        </div>

        {orders.length > 0 ? (
          <div className="mt-4">
            <OrderList orders={orders} />
          </div>
        ) : (
          <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-on-surface-variant text-sm">
              Nothing in your binder yet — once you check out, your orders
              will show up here.
            </p>
            <Link
              href="/"
              className="bg-primary text-on-primary hover:bg-primary-dim shrink-0 rounded-full px-5 py-2 text-sm font-semibold whitespace-nowrap transition-colors"
            >
              Browse the shop
            </Link>
          </div>
        )}
      </section>

      <form action={logoutAction} className="self-start">
        <button
          type="submit"
          className="border-outline-variant text-on-surface-variant hover:border-outline hover:text-on-surface cursor-pointer rounded-full border px-6 py-2.5 text-sm font-semibold transition-colors"
        >
          Log out
        </button>
      </form>
    </div>
  );
}
