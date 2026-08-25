import type { Order } from "@/payload-types";

export function getOrderStatusBadge(status: Order["status"]) {
  switch (status) {
    case "paid":
    case "fulfilled":
      return {
        label: status === "fulfilled" ? "Fulfilled" : "Paid",
        className: "bg-tertiary/15 text-tertiary-light",
      };
    case "pending":
      return {
        label: "Pending",
        className: "bg-primary/15 text-primary",
      };
    case "cancelled":
    case "failed":
      return {
        label: status === "failed" ? "Failed" : "Cancelled",
        className: "bg-error/15 text-error",
      };
  }
}
