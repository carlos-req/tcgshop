export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-8 py-16">
        <div>{children}</div>
      </div>
    </div>
  );
}
