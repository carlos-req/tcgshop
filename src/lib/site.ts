// Single source of truth for the company/brand name — change it here and it
// updates everywhere it's referenced (site title, footer, legal pages, etc.).
export const COMPANY_NAME = "X-Spelled";

// Canonical origin used for metadataBase, the sitemap, and robots.txt.
// Falls back to localhost for local dev; set NEXT_PUBLIC_SITE_URL in the
// deployed environment once a production domain exists (tracked in TODO.md).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
