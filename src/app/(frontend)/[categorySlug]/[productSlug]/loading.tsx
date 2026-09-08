export default function ProductLoading() {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-container px-4 py-12 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="bg-surface-container h-4 w-10 animate-pulse rounded" />
          <span aria-hidden="true" className="text-on-surface-variant">
            /
          </span>
          <div className="bg-surface-container h-4 w-20 animate-pulse rounded" />
          <span aria-hidden="true" className="text-on-surface-variant">
            /
          </span>
          <div className="bg-surface-container h-4 w-32 animate-pulse rounded" />
        </div>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="bg-surface-container-low aspect-square animate-pulse rounded-xl" />

          <div className="flex flex-col gap-4">
            <div className="bg-surface-container h-3.5 w-24 animate-pulse rounded" />
            <div className="bg-surface-container h-9 w-full max-w-md animate-pulse rounded" />
            <div className="bg-surface-container h-3.5 w-28 animate-pulse rounded" />
            <div className="bg-surface-container mt-2 h-9 w-32 animate-pulse rounded" />
            <div className="bg-surface-container mt-2 h-20 w-full animate-pulse rounded" />
            <div className="bg-surface-container mt-4 h-12 w-48 animate-pulse rounded-lg" />
            <div className="bg-surface-container mt-4 h-16 w-full animate-pulse rounded-lg" />
            <div className="bg-surface-container h-16 w-full animate-pulse rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
