"use client";

import { useState, useEffect } from "react";
import { Product, SearchResult } from "@/lib/types";
import {
  fetchProducts,
  fetchProduct,
  searchProducts,
  fetchRecommendations,
} from "@/services/api";

export function useProducts(params?: {
  category?: string;
  brand?: string;
  sort?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts(params)
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params?.category, params?.brand, params?.sort]);

  return { products, loading, error };
}

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProduct(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { product, loading, error };
}

export function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult>({
    products: [],
    query: "",
    suggestions: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setResults({ products: [], query: "", suggestions: [] });
      return;
    }
    setLoading(true);
    searchProducts(query)
      .then(setResults)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [query]);

  return { results, loading, error };
}

export function useRecommendations(params?: {
  productId?: string;
  category?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchRecommendations(params)
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [params?.productId, params?.category]);

  return { products, loading, error };
}
