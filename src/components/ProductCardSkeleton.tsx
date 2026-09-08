export function ProductCardSkeleton() {
  return (
    <div className="tcg-card flex flex-col overflow-hidden rounded-xl">
      <div className="bg-surface-container-low aspect-square animate-pulse" />
      <div className="flex flex-col gap-1.5 p-2.5">
        <div className="bg-surface-container h-4 w-4/5 animate-pulse rounded" />
        <div className="bg-surface-container h-4 w-1/3 animate-pulse rounded" />
        <div className="bg-surface-container mt-0.5 h-6 w-full animate-pulse rounded-full" />
      </div>
    </div>
  );
}

export function ProductCardSkeletonGrid({
  count,
  className,
}: {
  count: number;
  className: string;
}) {
  return (
    <div className={className}>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
