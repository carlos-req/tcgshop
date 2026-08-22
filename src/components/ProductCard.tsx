import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { formatPrice, getButtonConfig } from "@/lib/product-display";

interface ProductCardProps {
  product: Product;
}

function ProductCardComponent({ product }: ProductCardProps) {
  const button = getButtonConfig(product.status);

  const href = `/${product.category}/${product.slug}`;

  return (
    <article className="glass-card glass-card-hover flex flex-col overflow-hidden rounded-lg">
      <Link
        href={href}
        className="relative block aspect-square bg-surface-container-low"
      >
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        )}
      </Link>

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

        <Link href={href} className="line-clamp-3 flex-1">
          <h3 className="text-sm leading-snug text-on-surface hover:text-primary-dim">
            {product.name}
          </h3>
        </Link>

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

export const ProductCard = memo(ProductCardComponent);
