import type { MetadataRoute } from "next";
import { getAllCategories } from "@/data/categories";
import { getAllProductsForSitemap } from "@/data/products";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProductsForSitemap(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/legal/privacy-policy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/legal/terms-of-service`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/legal/returns-policy`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/${category.slug}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/${product.categorySlug}/${product.productSlug}`,
    lastModified: product.updatedAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
