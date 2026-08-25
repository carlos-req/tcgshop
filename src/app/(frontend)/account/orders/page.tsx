import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getCurrentCustomer } from "@/lib/auth";
import { getCustomerOrders } from "@/data/orders";
import { COMPANY_NAME } from "@/lib/site";
import { OrderList } from "../../(account)/OrderList";

export const metadata: Metadata = {
  title: `Order history | ${COMPANY_NAME}`,
};

export default function OrderHistoryPage() {
  return (
    <div className="bg-surface-container-lowest">
      <div className="max-w-container mx-auto px-8 py-16">
        <Suspense fallback={<OrdersFallback />}>
          <OrdersContent />
        </Suspense>
      </div>
    </div>
  );
}

function OrdersFallback() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div className="bg-surface-container h-8 w-40 animate-pulse rounded" />
      <div className="bg-surface-container h-64 animate-pulse rounded-xl" />
    </div>
  );
}

async function OrdersContent() {
  const customer = await getCurrentCustomer();
  if (!customer) {
    redirect("/login");
  }

  const orders = await getCustomerOrders(customer.id);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <div>
        <Link
          href="/account"
          className="text-on-surface-variant hover:text-on-surface text-sm"
        >
          ← Back to account
        </Link>
        <h1 className="font-display text-on-surface mt-2 text-3xl font-semibold italic">
          Order history
        </h1>
      </div>

      <section className="tcg-card rounded-xl px-6 py-5">
        {orders.length > 0 ? (
          <OrderList orders={orders} />
        ) : (
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
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
    </div>
  );
}
