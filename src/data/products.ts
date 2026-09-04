import type {
  Media as PayloadMedia,
  Product as PayloadProduct,
} from "@/payload-types";
import type { Product, ProductDetail, StockStatus } from "@/types/product";
import { getPayloadClient } from "@/lib/payload";
import { getCategoryBySlug } from "@/data/categories";

async function findProductDoc(
  categorySlug: string,
  productSlug: string,
): Promise<{ categoryId: string; doc: PayloadProduct } | null> {
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

  const doc = result.docs[0];
  return doc ? { categoryId: category.id, doc } : null;
}

function firstImage(doc: PayloadProduct) {
  const image = doc.images?.[0];
  const media: PayloadMedia | undefined =
    typeof image === "object" && image !== null ? image : undefined;
  return { url: media?.url ?? "", alt: media?.alt ?? doc.name };
}

function mapToProduct(doc: PayloadProduct, categorySlug: string): Product {
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

function categorySlugOf(doc: PayloadProduct): string | undefined {
  return typeof doc.category === "object" ? doc.category.slug : undefined;
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

  return result.docs.map((doc) => mapToProduct(doc, categorySlug));
}

export async function getRecentProducts(limit = 8): Promise<Product[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "products",
    sort: "-createdAt",
    depth: 1,
    limit,
  });

  return result.docs.flatMap((doc) => {
    const categorySlug = categorySlugOf(doc);
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

  const doc = result.docs[0];
  if (!doc) return null;

  const categorySlug = categorySlugOf(doc);
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
    sku: doc.sku,
    stock: doc.stock,
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

  return result.docs.flatMap((doc) => {
    const categorySlug = categorySlugOf(doc);
    if (!categorySlug) return [];
    return [
      {
        categorySlug,
        productSlug: doc.slug,
        updatedAt: doc.updatedAt,
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
    stock: doc.stock,
    stripePriceId: doc.stripePriceId ?? null,
  };
}
