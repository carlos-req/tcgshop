import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryStrip } from "@/components/CategoryStrip";
import { JsonLd } from "@/components/JsonLd";
import { ProductCardSection } from "@/components/ProductCardSection";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { COMPANY_NAME, SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd, truncateForMeta } from "@/lib/seo";

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

  const title =
    category.metaTitle ||
    `Shop ${category.name} Sealed Product | ${COMPANY_NAME}`;
  const description =
    category.metaDescription ||
    (category.description
      ? truncateForMeta(category.description)
      : `Browse factory-sealed ${category.name} — verified authentic, tracked shipping, from ${COMPANY_NAME}.`);

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${categorySlug}`,
    },
    openGraph: { title, description },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  if (!category) notFound();

  const products = await getProductsByCategory(categorySlug);

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: category.name, url: `${SITE_URL}/${category.slug}` },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbJsonLd(breadcrumbItems)} />
      <CategoryStrip
        name={category.name}
        description={category.description}
        productCount={products.length}
      />
      <ProductCardSection products={products} />
    </>
  );
}
