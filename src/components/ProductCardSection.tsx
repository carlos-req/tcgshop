"use client";

import { Search } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";
import { FilterSelect } from "@/components/FilterSelect";

const sortOptions: { value: string; label: string }[] = [
  { value: "sales", label: "Sort: Sales" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const priceRanges: { value: string; label: string; min: number; max: number | null }[] = [
  { value: "all", label: "Price", min: 0, max: null },
  { value: "0-20", label: "$0 – $20", min: 0, max: 20 },
  { value: "21-50", label: "$21 – $50", min: 21, max: 50 },
  { value: "51-100", label: "$51 – $100", min: 51, max: 100 },
  { value: "101-150", label: "$101 – $150", min: 101, max: 150 },
  { value: "150+", label: "$150+", min: 150, max: null },
];

interface ProductCardSectionProps {
  products: Product[];
}

export function ProductCardSection({ products }: ProductCardSectionProps) {
  const [searchInput, setSearchInput] = useState("");
  const deferredSearchQuery = useDeferredValue(searchInput);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState<"sales" | "price-asc" | "price-desc">(
    "sales",
  );

  const filteredProducts = useMemo(() => {
    let items = products;

    if (deferredSearchQuery.trim()) {
      const query = deferredSearchQuery.toLowerCase();
      items = items.filter((product) =>
        product.name.toLowerCase().includes(query),
      );
    }

    if (inStockOnly) {
      items = items.filter((product) => product.status === "in_stock");
    }

    if (priceRange !== "all") {
      const range = priceRanges.find((option) => option.value === priceRange);
      if (range) {
        items = items.filter(
          (product) =>
            product.price >= range.min &&
            (range.max === null || product.price <= range.max),
        );
      }
    }

    if (sortBy === "price-asc") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      items = [...items].sort((a, b) => b.price - a.price);
    }

    return items;
  }, [products, deferredSearchQuery, inStockOnly, priceRange, sortBy]);

  return (
    <section className="bg-surface py-10 lg:py-14">
      <div className="mx-auto max-w-container px-8">
        <div className="sticky top-16 z-10 -mx-8 flex flex-wrap items-center gap-3 border-b border-outline-variant bg-surface/95 px-8 py-4 backdrop-blur-sm">
          <FilterSelect
            label="Sort: Sales"
            value={sortBy}
            onChange={(value) =>
              setSortBy(value as "sales" | "price-asc" | "price-desc")
            }
            options={sortOptions}
          />

          <button
            type="button"
            onClick={() => setInStockOnly((current) => !current)}
            aria-pressed={inStockOnly}
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
            value={priceRange}
            onChange={setPriceRange}
            options={priceRanges}
          />

          <div className="relative ml-auto w-full sm:w-64">
            <label htmlFor="product-search" className="sr-only">
              Search products
            </label>
            <Search
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-outline"
              aria-hidden="true"
            />
            <input
              id="product-search"
              type="search"
              name="q"
              autoComplete="off"
              placeholder="Search…"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low py-2 pl-10 pr-4 font-mono text-sm text-on-surface placeholder:text-outline/70 focus-visible:border-primary-dim focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-dim/30"
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
