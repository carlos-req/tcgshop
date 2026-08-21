"use client";

import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { getProductsByCategory } from "@/data/products";
import type { ProductCategory } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { FilterSelect } from "@/components/FilterSelect";

const categoryTitles: Record<ProductCategory, string> = {
  palworld: "Palworld",
  magic: "Magic: The Gathering",
  pokemon: "Pokemon",
};

const sortOptions: { value: string; label: string }[] = [
  { value: "sales", label: "Sort: Sales" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

function getCategoryFromPath(pathname: string | null): ProductCategory {
  if (pathname?.startsWith("/magic")) return "magic";
  if (pathname?.startsWith("/pokemon")) return "pokemon";
  return "palworld";
}

export function ProductCardSection() {
  const pathname = usePathname();
  const category = getCategoryFromPath(pathname);

  const [searchInput, setSearchInput] = useState("");
  const deferredSearchQuery = useDeferredValue(searchInput);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"sales" | "price-asc" | "price-desc">(
    "sales",
  );

  const filteredProducts = useMemo(() => {
    let items = getProductsByCategory(category);

    if (deferredSearchQuery.trim()) {
      const query = deferredSearchQuery.toLowerCase();
      items = items.filter((product) =>
        product.name.toLowerCase().includes(query),
      );
    }

    if (inStockOnly) {
      items = items.filter((product) => product.status === "in_stock");
    }

    if (sortBy === "price-asc") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      items = [...items].sort((a, b) => b.price - a.price);
    }

    return items;
  }, [category, deferredSearchQuery, inStockOnly, sortBy]);

  return (
    <section className="bg-surface py-10 lg:py-14">
      <div className="mx-auto max-w-container px-8">
        <h2 className="text-headline-md text-on-surface">
          {categoryTitles[category]}
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <FilterSelect
            label="Sort: Sales"
            value={sortBy}
            onChange={(value) =>
              setSortBy(value as "sales" | "price-asc" | "price-desc")
            }
            options={sortOptions}
          />

          <FilterSelect
            label="Subcategories"
            value="all"
            onChange={() => {}}
            options={[{ value: "all", label: "Subcategories" }]}
          />

          <button
            type="button"
            onClick={() => setInStockOnly((current) => !current)}
            className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
              inStockOnly
                ? "border-primary-dim/50 bg-primary-dim/10 text-primary-dim"
                : "border-outline-variant/60 text-on-surface-variant hover:border-outline hover:text-on-surface"
            }`}
          >
            {inStockOnly ? "In Stock Only" : "Show In Stock"}
          </button>

          <FilterSelect
            label="Price"
            value="all"
            onChange={() => {}}
            options={[{ value: "all", label: "Price" }]}
          />

          <div className="relative ml-auto w-full sm:w-64">
            <Search
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-outline"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low py-2 pl-10 pr-4 font-mono text-sm text-on-surface placeholder:text-outline/70 focus:border-primary-dim focus:outline-none focus:ring-1 focus:ring-primary-dim/30"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p className="mt-12 text-center text-body-md text-on-surface-variant">
            No products match your filters.
          </p>
        )}
      </div>
    </section>
  );
}
