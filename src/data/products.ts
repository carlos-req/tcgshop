import type { Product, ProductDetail, StockStatus } from "@/types/product";
import { getPayloadClient } from "@/lib/payload";
import { getCategoryBySlug } from "@/data/categories";

interface PayloadMediaDoc {
  url?: string | null;
  alt?: string | null;
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

export async function getProductBySlug(
  categorySlug: string,
  productSlug: string,
): Promise<ProductDetail | null> {
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
  if (!doc) return null;

  return {
    ...mapToProduct(doc, categorySlug),
    description: doc.description ?? undefined,
    sku: doc.sku ?? "",
    stock: doc.stock ?? 0,
  };
}
