import type { StockStatus } from "@/types/product";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value: number) {
  return priceFormatter.format(value);
}

export function getButtonConfig(status: StockStatus) {
  switch (status) {
    case "in_stock":
      return {
        label: "Add to Cart",
        className: "bg-primary text-on-primary hover:bg-primary-dim",
        disabled: false,
      };
    case "coming_soon":
      return {
        label: "Preorder",
        className: "bg-secondary text-on-secondary hover:bg-secondary/90",
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
