export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-outline-variant/40 border-t pt-6 first:border-t-0 first:pt-0">
      <h2 className="font-display text-on-surface text-lg font-semibold">
        {title}
      </h2>
      <div className="text-on-surface-variant mt-2 flex flex-col gap-2 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}
