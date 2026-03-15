"use client";

import { useState } from "react";
import { useRecommendations } from "@/hooks/use-products";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import { Sparkles } from "lucide-react";

export default function RecommendationsPage() {
  const [category, setCategory] = useState("");
  const { products, loading } = useRecommendations({
    category: category || undefined,
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <span className="text-sm font-medium text-primary">AI Powered</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          AI Recommendations
        </h1>
        <p className="mt-2 text-muted-foreground">
          Smart picks curated by our AI based on trending products and ratings
        </p>
      </motion.div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Button
          variant={category === "" ? "default" : "outline"}
          size="sm"
          onClick={() => setCategory("")}
        >
          All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={category === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </Button>
        ))}
      </div>

      <ProductGrid products={products} loading={loading} />
    </main>
  );
}
