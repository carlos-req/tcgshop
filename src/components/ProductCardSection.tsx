"use client";

import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { getProductsByCategory } from "@/data/products";
import type { ProductCategory } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

const categoryTitles: Record<ProductCategory, string> = {
  palworld: "Palworld",
  magic: "Magic: The Gathering",
  pokemon: "Pokemon",
};

function getCategoryFromPath(pathname: string | null): ProductCategory {
  if (pathname?.startsWith("/magic")) return "magic";
  if (pathname?.startsWith("/pokemon")) return "pokemon";
  return "palworld";
}

export function ProductCardSection() {
  const pathname = usePathname();
  const category = getCategoryFromPath(pathname);

  const [searchQuery, setSearchQuery] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"sales" | "price-asc" | "price-desc">(
    "sales",
  );

  const filteredProducts = useMemo(() => {
    let items = getProductsByCategory(category);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
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
  }, [category, searchQuery, inStockOnly, sortBy]);

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
            options={[
              { value: "sales", label: "Sort: Sales" },
              { value: "price-asc", label: "Price: Low to High" },
              { value: "price-desc", label: "Price: High to Low" },
            ]}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

function FilterSelect({ value, onChange, options }: FilterSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-outline-variant/60 bg-surface-container-low py-2 pl-4 pr-10 text-sm text-on-surface-variant focus:border-primary-dim focus:outline-none focus:ring-1 focus:ring-primary-dim/30"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-outline"
        aria-hidden
      />
    </div>
  );
}
