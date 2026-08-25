import type { Product, ProductDetail, StockStatus } from "@/types/product";
import { getPayloadClient } from "@/lib/payload";
import { getCategoryBySlug } from "@/data/categories";

interface PayloadMediaDoc {
  url?: string | null;
  alt?: string | null;
}

interface PayloadCategoryRef {
  slug?: string;
}

interface PayloadProductDoc {
  id: string | number;
  name: string;
  slug: string;
  sku?: string | null;
  description?: string | null;
  price: number;
  originalPrice?: number | null;
  stock?: number | null;
  status: StockStatus;
  images?: (PayloadMediaDoc | string | number)[] | null;
  stripePriceId?: string | null;
  category?: PayloadCategoryRef | string | number | null;
  updatedAt?: string;
}

async function findProductDoc(
  categorySlug: string,
  productSlug: string,
): Promise<{ categoryId: string; doc: PayloadProductDoc } | null> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return null;

  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: {
      and: [
        { category: { equals: category.id } },
        { slug: { equals: productSlug } },
      ],
    },
    depth: 1,
    limit: 1,
  });

  const doc = result.docs[0] as PayloadProductDoc | undefined;
  return doc ? { categoryId: category.id, doc } : null;
}

function firstImage(doc: PayloadProductDoc) {
  const image = doc.images?.[0];
  const url = typeof image === "object" && image?.url ? image.url : "";
  const alt = (typeof image === "object" && image?.alt) || doc.name;
  return { url, alt };
}

function mapToProduct(doc: PayloadProductDoc, categorySlug: string): Product {
  const { url, alt } = firstImage(doc);

  return {
    id: String(doc.id),
    name: doc.name,
    price: doc.price,
    originalPrice: doc.originalPrice ?? undefined,
    image: url,
    alt,
    status: doc.status,
    category: categorySlug,
    slug: doc.slug,
  };
}

export async function getProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: { category: { equals: category.id } },
    depth: 1,
    limit: 100,
  });

  return (result.docs as unknown as PayloadProductDoc[]).map((doc) =>
    mapToProduct(doc, categorySlug),
  );
}

export async function getRecentProducts(limit = 8): Promise<Product[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    sort: "-createdAt",
    depth: 1,
    limit,
  });

  return (result.docs as unknown as PayloadProductDoc[]).flatMap((doc) => {
    const categorySlug =
      typeof doc.category === "object" ? doc.category?.slug : undefined;
    return categorySlug ? [mapToProduct(doc, categorySlug)] : [];
  });
}

export async function getGlobalFeaturedProduct(): Promise<Product | null> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    where: { featured: { equals: true } },
    sort: "-createdAt",
    depth: 1,
    limit: 1,
  });

  const doc = result.docs[0] as PayloadProductDoc | undefined;
  if (!doc) return null;

  const categorySlug =
    typeof doc.category === "object" ? doc.category?.slug : undefined;
  return categorySlug ? mapToProduct(doc, categorySlug) : null;
}

export async function getProductBySlug(
  categorySlug: string,
  productSlug: string,
): Promise<ProductDetail | null> {
  const found = await findProductDoc(categorySlug, productSlug);
  if (!found) return null;

  const { doc } = found;

  return {
    ...mapToProduct(doc, categorySlug),
    description: doc.description ?? undefined,
    sku: doc.sku ?? "",
    stock: doc.stock ?? 0,
  };
}

export interface SitemapProduct {
  categorySlug: string;
  productSlug: string;
  updatedAt: string;
}

/** Server-only accessor for sitemap.ts — every product, across all categories. */
export async function getAllProductsForSitemap(): Promise<SitemapProduct[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    depth: 1,
    limit: 1000,
  });

  return (result.docs as unknown as PayloadProductDoc[]).flatMap((doc) => {
    const categorySlug =
      typeof doc.category === "object" ? doc.category?.slug : undefined;
    if (!categorySlug) return [];
    return [
      {
        categorySlug,
        productSlug: doc.slug,
        updatedAt: doc.updatedAt ?? new Date().toISOString(),
      },
    ];
  });
}

export interface CheckoutProduct {
  id: string;
  name: string;
  status: StockStatus;
  stock: number;
  stripePriceId: string | null;
}

/**
 * Server-only accessor for the Stripe-specific fields (stripePriceId, stock)
 * needed to create a Checkout Session. Kept separate from getProductBySlug so
 * the public-facing Product/ProductDetail shape never carries Stripe internals.
 */
export async function getProductForCheckout(
  categorySlug: string,
  productSlug: string,
): Promise<CheckoutProduct | null> {
  const found = await findProductDoc(categorySlug, productSlug);
  if (!found) return null;

  const { doc } = found;

  return {
    id: String(doc.id),
    name: doc.name,
    status: doc.status,
    stock: doc.stock ?? 0,
    stripePriceId: doc.stripePriceId ?? null,
  };
}
