import { ProductCardSkeletonGrid } from "@/components/ProductCardSkeleton";

export default function HomeLoading() {
  return (
    <>
      <section className="bg-surface-container-lowest relative overflow-hidden">
        <div className="mx-auto flex max-w-container flex-col items-center gap-12 px-4 py-20 sm:px-8 lg:flex-row lg:py-28">
          <div className="flex w-full max-w-xl flex-col items-center gap-4 lg:items-start">
            <div className="bg-surface-container h-4 w-56 animate-pulse rounded" />
            <div className="bg-surface-container h-10 w-full max-w-md animate-pulse rounded" />
            <div className="bg-surface-container h-16 w-full animate-pulse rounded" />
            <div className="mt-2 flex gap-3">
              <div className="bg-surface-container h-11 w-32 animate-pulse rounded-full" />
              <div className="bg-surface-container h-11 w-32 animate-pulse rounded-full" />
            </div>
          </div>
          <div className="bg-surface-container aspect-square w-full max-w-sm animate-pulse rounded-xl" />
        </div>
      </section>

      <div className="border-b border-white/5 bg-surface-container-low">
        <div className="mx-auto flex max-w-container items-center justify-center gap-10 px-4 py-3.5 sm:px-8">
          <div className="bg-surface-container-lowest h-3.5 w-40 animate-pulse rounded" />
          <div className="bg-surface-container-lowest h-3.5 w-52 animate-pulse rounded" />
          <div className="bg-surface-container-lowest h-3.5 w-44 animate-pulse rounded" />
        </div>
      </div>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="bg-surface-container h-4 w-28 animate-pulse rounded" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="bg-surface-container-low h-16 animate-pulse rounded-xl"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-16">
        <div className="mx-auto max-w-container px-4 sm:px-8">
          <div className="bg-surface-container h-4 w-24 animate-pulse rounded" />
          <div className="bg-surface-container mt-2 h-7 w-48 animate-pulse rounded" />
          <ProductCardSkeletonGrid
            count={6}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-5"
          />
        </div>
      </section>
    </>
  );
}
