import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

const MAGIC_HERO_IMAGE =
  "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1786048222554-MTG-Reality-Fracture-Desktop-PO.jpg";

const HERO_IMAGE =
  "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg";

interface HeroSectionProps {
  categorySlug: string;
  categoryName: string;
  featuredProduct: Product | null;
}

export function HeroSection({
  categorySlug,
  categoryName,
  featuredProduct,
}: HeroSectionProps) {
  const isMagic = categorySlug === "magic";
  const imageSrc = isMagic ? MAGIC_HERO_IMAGE : HERO_IMAGE;

  const ctaHref = featuredProduct
    ? `/${categorySlug}/${featuredProduct.slug}`
    : `/${categorySlug}`;

  const ctaLabel = featuredProduct
    ? `Preorder ${featuredProduct.name}`
    : `Browse ${categoryName}`;

  return (
    <section className="relative w-full leading-none">
      <section className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-surface-container-lowest via-surface-container-lowest/30 to-surface-container-lowest/20" />

        <Image
          src={imageSrc}
          alt={`${categoryName} — Preorder Now`}
          width={1920}
          height={600}
          priority
          className="h-auto w-full"
          sizes="100vw"
        />
        <Link
          href={ctaHref}
          className="absolute inset-0"
          aria-label={ctaLabel}
        />
      </section>
    </section>
  );
}
