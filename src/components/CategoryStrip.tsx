interface CategoryStripProps {
  name: string;
  description?: string;
  productCount: number;
}

export function CategoryStrip({
  name,
  description,
  productCount,
}: CategoryStripProps) {
  return (
    <section className="bg-surface-container-lowest">
      <div className="mx-auto flex max-w-container flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-8 py-8">
        <div>
          <h1 className="text-headline-md text-on-surface">{name}</h1>
          {description && (
            <p className="mt-1 text-sm text-on-surface-variant">
              {description}
            </p>
          )}
        </div>
        <span className="text-sm text-on-surface-variant">
          {productCount} {productCount === 1 ? "product" : "products"}
        </span>
      </div>
    </section>
  );
}
