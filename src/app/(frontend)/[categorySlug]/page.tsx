import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryStrip } from "@/components/CategoryStrip";
import { ProductCardSection } from "@/components/ProductCardSection";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) return {};

  return {
    title: `${category.name} | X-Spelled`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) notFound();

  const products = await getProductsByCategory(categorySlug);

  return (
    <>
      <CategoryStrip
        name={category.name}
        description={category.description}
        productCount={products.length}
      />
      <ProductCardSection products={products} />
    </>
  );
}
