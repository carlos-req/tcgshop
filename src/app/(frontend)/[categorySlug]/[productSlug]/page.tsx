import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BuyButton } from "@/components/BuyButton";
import { getCategoryBySlug } from "@/data/categories";
import { getProductBySlug } from "@/data/products";
import { formatPrice, getButtonConfig } from "@/lib/product-display";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

interface ProductPageProps {
  params: Promise<{ categorySlug: string; productSlug: string }>;
  searchParams: Promise<{ checkout?: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const product = await getProductBySlug(categorySlug, productSlug);

  if (!product) return {};

  return {
    title: `${product.name} | X-Spelled`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: ProductPageProps) {
  const { categorySlug, productSlug } = await params;
  const { checkout } = await searchParams;

  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const product = await getProductBySlug(categorySlug, productSlug);
  if (!product) notFound();

  const button = getButtonConfig(product.status);

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-container px-8 py-12">
        {checkout === "success" && (
          <p className="mb-6 rounded-lg border border-primary-dim/40 bg-primary-dim/10 px-4 py-3 text-sm text-primary-dim">
            Payment successful — thanks for your order! You&apos;ll receive a
            confirmation email shortly.
          </p>
        )}
        {checkout === "cancelled" && (
          <p className="mb-6 rounded-lg border border-outline-variant/40 bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
            Checkout was cancelled — you have not been charged.
          </p>
        )}

        <Link
          href={`/${category.slug}`}
          className="inline-flex items-center gap-2 text-sm text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to {category.name}
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl tcg-card">
            {product.image && (
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-contain p-8"
                sizes="600px"
              />
            )}
          </div>

          <div>
            <span className="text-eyebrow text-primary-dim">
              {category.name}
            </span>
            <h1 className="mt-2 text-display-lg text-on-surface">
              {product.name}
            </h1>
            {product.sku && (
              <p className="mt-1 text-label-mono text-on-surface-variant">
                SKU: {product.sku}
              </p>
            )}

            <p className="mt-6 font-display text-4xl font-bold text-on-surface">
              {formatPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="mt-1 text-sm text-on-surface-variant line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}

            {product.description && (
              <p className="mt-6 text-body-md text-on-surface-variant">
                {product.description}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <BuyButton
                categorySlug={category.slug}
                productSlug={product.slug}
                label={button.label}
                className={`inline-flex items-center gap-2 rounded-lg px-8 py-3.5 font-display text-sm font-bold uppercase tracking-wide transition-colors ${button.className}`}
                disabled={button.disabled}
              />
            </div>

            <div className="mt-8 flex items-center gap-3 rounded-lg border border-outline-variant/30 bg-surface-container-low p-4">
              <Truck className="size-5 text-primary-dim" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-on-surface">
                  {product.status === "in_stock"
                    ? `${product.stock} in stock`
                    : "Stock updates on order"}
                </p>
                <p className="text-sm text-on-surface-variant">
                  Ships after order confirmation
                </p>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 rounded-lg border border-outline-variant/30 bg-surface-container-low p-4">
              <ShieldCheck
                className="size-5 text-primary-dim"
                aria-hidden="true"
              />
              <p className="text-sm text-on-surface-variant">
                Factory-sealed and verified before it ships — never opened,
                never resealed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
