"use client";

import { useProducts } from "@/hooks/use-products";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
  const { products, loading } = useProducts({ sort: "rating" });

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 flex items-end justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Featured Products
          </h2>
          <p className="mt-2 text-muted-foreground">
            Top-rated devices loved by our customers
          </p>
        </div>
        <Link href="/products">
          <Button variant="ghost" className="gap-1.5">
            View All
            <ArrowRight className="size-4" />
          </Button>
        </Link>
      </motion.div>

      <ProductGrid products={products.slice(0, 8)} loading={loading} />
    </section>
  );
}
