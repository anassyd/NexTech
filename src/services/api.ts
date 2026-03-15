import { Product, SearchResult, ApiResponse } from "@/lib/types";

const BASE_URL = "/api";

export async function fetchProducts(params?: {
  category?: string;
  brand?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
}): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
    });
  }
  const res = await fetch(`${BASE_URL}/products?${searchParams.toString()}`);
  const json: ApiResponse<Product[]> = await res.json();
  return json.data;
}

export async function fetchProduct(id: string): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/products/${encodeURIComponent(id)}`);
  if (!res.ok) return null;
  const json: ApiResponse<Product> = await res.json();
  return json.data;
}

export async function searchProducts(query: string): Promise<SearchResult> {
  const res = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}`
  );
  const json: ApiResponse<SearchResult> = await res.json();
  return json.data;
}

export async function fetchRecommendations(params?: {
  productId?: string;
  category?: string;
}): Promise<Product[]> {
  const searchParams = new URLSearchParams();
  if (params?.productId) searchParams.set("productId", params.productId);
  if (params?.category) searchParams.set("category", params.category);
  const res = await fetch(
    `${BASE_URL}/recommendations?${searchParams.toString()}`
  );
  const json: ApiResponse<Product[]> = await res.json();
  return json.data;
}
