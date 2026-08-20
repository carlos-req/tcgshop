export type StockStatus = "in_stock" | "coming_soon" | "out_of_stock";

export type ProductCategory = "magic" | "palworld" | "pokemon";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  status: StockStatus;
  category: ProductCategory;
  slug: string;
}
