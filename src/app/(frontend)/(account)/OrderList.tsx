import Link from "next/link";

import type { Order } from "@/payload-types";
import { formatCents } from "@/lib/format";
import { getOrderStatusBadge } from "@/lib/order-display";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function OrderList({ orders }: { orders: Order[] }) {
  return (
    <ul className="divide-outline-variant/60 flex flex-col divide-y">
      {orders.map((order) => {
        const product =
          typeof order.product === "object" ? order.product : null;
        const category =
          product && typeof product.category === "object"
            ? product.category
            : null;
        const badge = getOrderStatusBadge(order.status);
        const href =
          product && category
            ? `/${category.slug}/${product.slug}`
            : undefined;

        return (
          <li
            key={order.id}
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-4 first:pt-0 last:pb-0"
          >
            <div className="min-w-0">
              {href ? (
                <Link
                  href={href}
                  className="text-on-surface hover:text-primary-dim line-clamp-1 text-sm font-medium"
                >
                  {product?.name}
                </Link>
              ) : (
                <p className="text-on-surface line-clamp-1 text-sm font-medium">
                  {product?.name ?? "Item unavailable"}
                </p>
              )}
              <p className="text-on-surface-variant mt-0.5 text-xs">
                {dateFormatter.format(new Date(order.createdAt))} · Qty{" "}
                {order.quantity}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`text-label-mono rounded-full px-2.5 py-1 ${badge.className}`}
              >
                {badge.label}
              </span>
              <span className="font-display text-on-surface w-20 text-right text-sm font-semibold">
                {formatCents(order.amountTotal)}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
