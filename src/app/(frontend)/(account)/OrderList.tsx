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
        const badge = getOrderStatusBadge(order.status);
        const itemCount = order.lineItems.reduce(
          (sum, item) => sum + item.quantity,
          0,
        );

        return (
          <li key={order.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <p className="text-on-surface-variant text-xs">
                {dateFormatter.format(new Date(order.createdAt))} · {itemCount}{" "}
                item{itemCount === 1 ? "" : "s"}
              </p>
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
            </div>

            <ul className="mt-2 flex flex-col gap-1">
              {order.lineItems.map((lineItem) => {
                const product =
                  typeof lineItem.product === "object"
                    ? lineItem.product
                    : null;
                const category =
                  product && typeof product.category === "object"
                    ? product.category
                    : null;
                const href =
                  product && category
                    ? `/${category.slug}/${product.slug}`
                    : undefined;
                const name = product?.name ?? "Item unavailable";

                return (
                  <li
                    key={lineItem.id ?? `${order.id}-${lineItem.product}`}
                    className="text-on-surface-variant flex items-baseline justify-between gap-4 text-sm"
                  >
                    {href ? (
                      <Link
                        href={href}
                        className="hover:text-primary-dim line-clamp-1"
                      >
                        {name}
                      </Link>
                    ) : (
                      <span className="line-clamp-1">{name}</span>
                    )}
                    <span className="shrink-0">×{lineItem.quantity}</span>
                  </li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
