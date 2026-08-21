import { HeroSection } from "@/components/HeroSection";
import { ProductCardSection } from "@/components/ProductCardSection";
import { TrustBar } from "@/components/TrustBar";

export const instant = false;

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <ProductCardSection />
    </>
  );
}
