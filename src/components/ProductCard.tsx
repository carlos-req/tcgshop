import Image from "next/image";
import type { Product, StockStatus } from "@/types/product";

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function getButtonConfig(status: StockStatus) {
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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const button = getButtonConfig(product.status);

  return (
    <article className="glass-card glass-card-hover flex flex-col overflow-hidden rounded-lg">
      <div className="relative aspect-square bg-surface-container-low">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex flex-wrap items-baseline gap-2">
          <span className="font-display text-lg font-bold text-primary-dim">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-on-surface-variant line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <h3 className="line-clamp-3 flex-1 text-sm leading-snug text-on-surface">
          {product.name}
        </h3>

        <button
          type="button"
          disabled={button.disabled}
          className={`mt-4 w-full rounded-lg px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wide transition-all ${button.className}`}
        >
          {button.label}
        </button>
      </div>
    </article>
  );
}
