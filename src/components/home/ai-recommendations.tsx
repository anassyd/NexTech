"use client";

import { useRecommendations } from "@/hooks/use-products";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function AiRecommendations() {
  const { products, loading } = useRecommendations();

  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI Powered
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Recommended for You
            </h2>
            <p className="mt-2 text-muted-foreground">
              Personalized picks based on trending products
            </p>
          </div>
          <Link href="/recommendations">
            <Button variant="ghost" className="gap-1.5">
              See All
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </motion.div>

        <ProductGrid products={products.slice(0, 4)} loading={loading} />
      </div>
    </section>
  );
}
