import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice, getButtonConfig } from "@/lib/product-display";

interface ProductCardProps {
  product: Product;
}

function ProductCardComponent({ product }: ProductCardProps) {
  const button = getButtonConfig(product.status);

  const href = `/${product.category}/${product.slug}`;

  return (
    <article className="tcg-card tcg-card-hover flex flex-col overflow-hidden rounded-xl">
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

      <div className="flex flex-col gap-1.5 p-2.5">
        <Link href={href}>
          <h3 className="line-clamp-1 text-sm leading-snug text-on-surface hover:text-primary-dim">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="font-display text-base font-semibold text-primary-dim">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-on-surface-variant line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <AddToCartButton
          product={product}
          label={button.label}
          disabled={button.disabled}
          showIcon={false}
          className={`w-full rounded-full py-1.5 text-xs font-semibold transition-colors ${button.className}`}
        />
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardComponent);
