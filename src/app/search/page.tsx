"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/hooks/use-products";
import { ProductGrid } from "@/components/products/product-grid";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { results, loading } = useSearch(query);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
          <Search className="size-4" />
          <span className="text-sm">Search results for</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          &quot;{query}&quot;
        </h1>
        {!loading && (
          <p className="mt-2 text-muted-foreground">
            {results.products.length}{" "}
            {results.products.length === 1 ? "result" : "results"} found
          </p>
        )}
      </motion.div>

      <ProductGrid products={results.products} loading={loading} />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
