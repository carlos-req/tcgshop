import Link from "next/link";
import type { Category } from "@/types/product";

interface ShopByGameProps {
  categories: Category[];
}

export function ShopByGame({ categories }: ShopByGameProps) {
  if (categories.length === 0) return null;

  return (
    <section className="bg-surface py-14">
      <div className="mx-auto max-w-container px-8">
        <p className="text-eyebrow text-primary">Shop by game</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group flex items-center justify-between rounded-xl bg-surface-container-low px-6 py-5 transition-colors hover:bg-surface-container"
            >
              <span className="text-lg font-semibold text-on-surface group-hover:text-primary">
                {category.name}
              </span>
              <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
