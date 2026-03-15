"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/use-products";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { categories, brands } from "@/lib/data";
import { SlidersHorizontal, X } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const params = useMemo(
    () => ({
      category: category || undefined,
      brand: brand || undefined,
      sort: sort || undefined,
    }),
    [category, brand, sort]
  );

  const { products, loading } = useProducts(params);

  const hasFilters = category || brand || sort;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our collection of premium tech devices
        </p>
      </motion.div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="size-3.5" />
          Filters
        </Button>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            onClick={() => {
              setCategory("");
              setBrand("");
              setSort("");
            }}
          >
            <X className="size-3.5" />
            Clear All
          </Button>
        )}

        {category && (
          <Badge variant="secondary" className="gap-1">
            {category}
            <button onClick={() => setCategory("")}>
              <X className="size-3" />
            </button>
          </Badge>
        )}
        {brand && (
          <Badge variant="secondary" className="gap-1">
            {brand}
            <button onClick={() => setBrand("")}>
              <X className="size-3" />
            </button>
          </Badge>
        )}

        <div className="ml-auto">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border bg-transparent px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 rounded-xl border bg-card p-4"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-sm font-medium">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Button
                    key={cat.id}
                    variant={category === cat.id ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setCategory(category === cat.id ? "" : cat.id)
                    }
                  >
                    {cat.icon} {cat.name}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium">Brand</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((b) => (
                  <Button
                    key={b}
                    variant={brand === b ? "default" : "outline"}
                    size="sm"
                    onClick={() => setBrand(brand === b ? "" : b)}
                  >
                    {b}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <ProductGrid products={products} loading={loading} />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense>
      <ProductsContent />
    </Suspense>
  );
}
