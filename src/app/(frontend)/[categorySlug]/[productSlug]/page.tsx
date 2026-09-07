import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import { JsonLd } from "@/components/JsonLd";
import { getCategoryBySlug } from "@/data/categories";
import { getProductBySlug } from "@/data/products";
import { formatPrice, getButtonConfig } from "@/lib/product-display";
import { COMPANY_NAME, SITE_URL } from "@/lib/site";
import {
  buildBreadcrumbJsonLd,
  buildProductJsonLd,
  truncateForMeta,
} from "@/lib/seo";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

interface ProductPageProps {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const product = await getProductBySlug(categorySlug, productSlug);

  if (!product) return {};

  const category = await getCategoryBySlug(categorySlug);
  const categoryName = category?.name ?? "Sealed Product";

  const title =
    product.metaTitle || `${product.name} | ${categoryName} | ${COMPANY_NAME}`;
  const description =
    product.metaDescription ||
    (product.description
      ? truncateForMeta(product.description)
      : `Buy ${product.name} — factory-sealed and verified authentic, ships fast. ${categoryName} from ${COMPANY_NAME}.`);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${categorySlug}/${productSlug}`,
    },
    openGraph: {
      title,
      description,
      images: product.image
        ? [{ url: product.image, alt: product.alt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { categorySlug, productSlug } = await params;

  const category = await getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const product = await getProductBySlug(categorySlug, productSlug);
  if (!product) notFound();

  const button = getButtonConfig(product.status);

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: category.name, url: `${SITE_URL}/${category.slug}` },
    {
      name: product.name,
      url: `${SITE_URL}/${category.slug}/${product.slug}`,
    },
  ];

  return (
    <div className="bg-surface">
      <JsonLd data={buildProductJsonLd(product, category)} />
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />
      <div className="mx-auto max-w-container px-8 py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-on-surface-variant">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-on-surface">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/${category.slug}`}
                className="hover:text-on-surface"
              >
                {category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-on-surface">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl tcg-card">
            {product.image && (
              <Image
                src={product.image}
                alt={product.alt}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 600px"
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
              <AddToCartButton
                product={product}
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
