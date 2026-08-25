import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { HoloCard } from "@/components/HoloCard";

const MAGIC_HERO_IMAGE =
  "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1786048222554-MTG-Reality-Fracture-Desktop-PO.jpg";

const PALWORLD_HERO_IMAGE =
  "https://s3-us-west-1.amazonaws.com/5cc.images/games/userfiles/1783364140189-Palworld-TCG-Banner-desktop.jpg";

interface HomeHeroProps {
  featuredProduct: Product | null;
}

export function HomeHero({ featuredProduct }: HomeHeroProps) {
  return (
    <section className="relative overflow-hidden bg-surface-container-lowest">
      <div className="absolute inset-0">
        <Image
          src={PALWORLD_HERO_IMAGE}
          alt=""
          fill
          priority
          className="hero-crossfade-a object-cover"
          sizes="100vw"
        />
        <Image
          src={MAGIC_HERO_IMAGE}
          alt=""
          fill
          className="hero-crossfade-b object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/85 to-surface-container-lowest/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-container flex-col items-center gap-12 px-8 py-20 lg:flex-row lg:py-28">
        <div className="max-w-xl text-center lg:text-left">
          <p className="text-eyebrow text-primary">
            Sealed, authenticated, yours to open
          </p>
          <h1 className="mt-3 text-display-lg text-on-surface">
            Every pack is a possibility.
          </h1>
          <p className="mt-5 text-body-lg text-on-surface-variant">
            Booster boxes and packs for Magic: The Gathering, Palworld TCG,
            and more — checked before it ships, tracked until it&apos;s
            yours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Link
              href="/magic"
              className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dim"
            >
              Shop Magic
            </Link>
            <Link
              href="/palworld"
              className="rounded-full border border-outline-variant px-7 py-3 text-sm font-semibold text-on-surface transition-colors hover:border-primary-dim"
            >
              Shop Palworld
            </Link>
          </div>
        </div>

        {featuredProduct?.image && (
          <div className="flex w-full justify-center lg:w-auto">
            <HoloCard image={featuredProduct.image} alt={featuredProduct.alt} />
          </div>
        )}
      </div>
    </section>
  );
}
