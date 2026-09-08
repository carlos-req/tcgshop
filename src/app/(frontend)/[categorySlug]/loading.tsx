import { ProductCardSkeletonGrid } from "@/components/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <>
      <section className="bg-surface-container-lowest">
        <div className="mx-auto flex max-w-container flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-4 py-8 sm:px-8">
          <div className="bg-surface-container h-7 w-48 animate-pulse rounded" />
          <div className="bg-surface-container h-4 w-24 animate-pulse rounded" />
        </div>
      </section>

      <section className="bg-surface py-10 lg:py-14">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-3 border-b border-outline-variant px-0 py-4">
            <div className="bg-surface-container-low h-9 w-32 animate-pulse rounded-lg" />
            <div className="bg-surface-container-low h-9 w-32 animate-pulse rounded-lg" />
            <div className="bg-surface-container-low h-9 w-24 animate-pulse rounded-lg" />
            <div className="bg-surface-container-low ml-auto h-9 w-full animate-pulse rounded-lg sm:w-64" />
          </div>

          <ProductCardSkeletonGrid
            count={10}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5"
          />
        </div>
      </section>
    </>
  );
}
