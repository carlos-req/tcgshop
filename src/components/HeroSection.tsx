"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MAGIC_HERO_IMAGE =
  "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1786048222554-MTG-Reality-Fracture-Desktop-PO.jpg";

const HERO_IMAGE =
  "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg";

export function HeroSection() {
  const pathname = usePathname();
  const isMagic = pathname?.startsWith("/magic");

  const imageSrc = isMagic ? MAGIC_HERO_IMAGE : HERO_IMAGE;
  const ctaHref = isMagic
    ? "/products/palworld-base-set"
    : "/products/modern-horizons-3";

  return (
    <section className="relative w-full leading-none">
      <section className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-surface-container-lowest via-surface-container-lowest/30 to-surface-container-lowest/20" />

        <Image
          src={imageSrc}
          alt={
            isMagic
              ? "Magic: The Gathering Reality Fracture — Preorder Now"
              : "Palworld TCG — Preorder Now"
          }
          width={1920}
          height={600}
          priority
          className="h-auto w-full"
          sizes="100vw"
        />
        <Link
          href={ctaHref}
          className="absolute inset-0"
          aria-label={
            isMagic ? "Preorder Reality Fracture" : "Preorder Palworld TCG"
          }
        />
      </section>
    </section>
  );
}
