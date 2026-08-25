export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-3xl px-8 py-16">
        <div className="border-outline-variant/60 bg-surface-container-low rounded-lg border px-5 py-4">
          <p className="text-on-surface-variant text-sm">
            <span className="text-on-surface font-semibold">Draft placeholder.</span>{" "}
            This page outlines what the policy needs to cover — it is not
            binding legal text. It needs review by an actual lawyer before
            launch.
          </p>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
