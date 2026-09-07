export type StockStatus = "in_stock" | "coming_soon" | "out_of_stock";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  alt: string;
  status: StockStatus;
  category: string;
  slug: string;
}

export interface ProductDetail extends Product {
  description?: string;
  sku: string;
  stock: number;
  metaTitle?: string;
  metaDescription?: string;
}
