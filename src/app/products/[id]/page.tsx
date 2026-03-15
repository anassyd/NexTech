"use client";

import { use } from "react";
import { useProduct, useRecommendations } from "@/hooks/use-products";
import { ImageGallery } from "@/components/product-detail/image-gallery";
import { ProductInfo } from "@/components/product-detail/product-info";
import { ProductGrid } from "@/components/products/product-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { product, loading } = useProduct(id);
  const { products: related, loading: relatedLoading } = useRecommendations({
    productId: id,
  });

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-80" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <p className="mt-2 text-muted-foreground">
          The product you&apos;re looking for doesn&apos;t exist.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ImageGallery product={product} />
        </motion.div>
        <ProductInfo product={product} />
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <span className="text-sm font-medium text-primary">
                AI Recommended
              </span>
            </div>
            <h2 className="text-2xl font-bold">You Might Also Like</h2>
          </motion.div>
          <ProductGrid
            products={related.slice(0, 4)}
            loading={relatedLoading}
          />
        </section>
      )}
    </main>
  );
}
