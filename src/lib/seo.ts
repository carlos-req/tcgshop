import type { Category, ProductDetail, StockStatus } from "@/types/product";
import { COMPANY_NAME, SITE_URL } from "@/lib/site";

const SCHEMA_AVAILABILITY: Record<StockStatus, string> = {
  in_stock: "https://schema.org/InStock",
  out_of_stock: "https://schema.org/OutOfStock",
  coming_soon: "https://schema.org/PreOrder",
};

/** Truncates on a word boundary near `maxLength` — never cuts mid-word. */
export function truncateForMeta(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildProductJsonLd(product: ProductDetail, category: Category) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image ? [product.image] : undefined,
    description: product.description,
    sku: product.sku,
    category: category.name,
    brand: { "@type": "Brand", name: COMPANY_NAME },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/${category.slug}/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability: SCHEMA_AVAILABILITY[product.status],
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function buildOrganizationJsonLd(sameAs: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "WebSite"],
    name: COMPANY_NAME,
    url: SITE_URL,
    sameAs,
  };
}
