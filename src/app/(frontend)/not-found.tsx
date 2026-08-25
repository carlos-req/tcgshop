import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-surface">
      <div className="mx-auto flex max-w-container flex-col items-center px-8 py-24 text-center">
        <p className="text-label-mono text-primary-dim">404</p>
        <h1 className="mt-2 text-display-lg text-on-surface">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-3 max-w-md text-body-md text-on-surface-variant">
          The category or product you&apos;re looking for doesn&apos;t exist
          or may have been removed.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dim"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
