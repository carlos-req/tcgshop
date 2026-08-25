import { HomeHero } from "@/components/HomeHero";
import { ShopByGame } from "@/components/ShopByGame";
import { NewArrivals } from "@/components/NewArrivals";
import { TrustBar } from "@/components/TrustBar";
import { getAllCategories } from "@/data/categories";
import { getGlobalFeaturedProduct, getRecentProducts } from "@/data/products";

export const instant = false;

export default async function Home() {
  const [categories, recentProducts, featuredProduct] = await Promise.all([
    getAllCategories(),
    getRecentProducts(),
    getGlobalFeaturedProduct(),
  ]);

  return (
    <>
      <HomeHero featuredProduct={featuredProduct} />
      <TrustBar />
      <ShopByGame categories={categories} />
      <NewArrivals products={recentProducts} />
    </>
  );
}
