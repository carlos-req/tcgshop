import type { Category } from "@/types/product";
import { getPayloadClient } from "@/lib/payload";

interface PayloadCategoryDoc {
  id: string | number;
  name: string;
  slug: string;
  description?: string | null;
}

function mapToCategory(doc: PayloadCategoryDoc): Category {
  return {
    id: String(doc.id),
    name: doc.name,
    slug: doc.slug,
    description: doc.description ?? undefined,
  };
}

export async function getCategoryBySlug(
  slug: string,
): Promise<Category | null> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "categories",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const doc = result.docs[0] as PayloadCategoryDoc | undefined;
  return doc ? mapToCategory(doc) : null;
}

export async function getAllCategories(): Promise<Category[]> {
  const payload = await getPayloadClient();

  const result = await payload.find({
    collection: "categories",
    sort: "name",
    limit: 100,
  });

  return (result.docs as PayloadCategoryDoc[]).map(mapToCategory);
}
