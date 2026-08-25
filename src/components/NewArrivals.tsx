import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  if (products.length === 0) return null;

  return (
    <section className="bg-surface-container-lowest py-16">
      <div className="mx-auto max-w-container px-8">
        <p className="text-eyebrow text-primary">Just landed</p>
        <h2 className="mt-1 text-headline-md text-on-surface">
          New arrivals
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
