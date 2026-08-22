import { HeroSection } from "@/components/HeroSection";
import { ProductCardSection } from "@/components/ProductCardSection";
import { TrustBar } from "@/components/TrustBar";
import { getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

export const instant = false;

const HOME_CATEGORY_SLUG = "palworld";

export default async function Home() {
  const [category, products] = await Promise.all([
    getCategoryBySlug(HOME_CATEGORY_SLUG),
    getProductsByCategory(HOME_CATEGORY_SLUG),
  ]);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductCardSection
        categoryName={category?.name ?? "Featured"}
        products={products}
      />
    </>
  );
}
