import type { StockStatus } from "@/types/product";

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export function getButtonConfig(status: StockStatus) {
  switch (status) {
    case "in_stock":
      return {
        label: "Add to Cart",
        className:
          "bg-primary text-on-primary hover:bg-primary-dim hover:glow-primary",
        disabled: false,
      };
    case "coming_soon":
      return {
        label: "Preorder",
        className:
          "bg-secondary text-white preorder-pulse hover:bg-secondary/90",
        disabled: false,
      };
    case "out_of_stock":
      return {
        label: "Out of Stock",
        className:
          "cursor-not-allowed bg-surface-container-highest text-on-surface-variant",
        disabled: true,
      };
  }
}
