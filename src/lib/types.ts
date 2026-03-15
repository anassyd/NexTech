export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  images: string[];
  specifications: Record<string, string>;
  category: string;
  description: string;
  stock: number;
  color: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SearchResult {
  products: Product[];
  query: string;
  suggestions: string[];
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
