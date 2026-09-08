export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
        <div>{children}</div>
      </div>
    </div>
  );
}
