"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { toast } from "@/components/ui/toaster";
import { Star, ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10">
        <Link href={`/products/${product.id}`}>
          <div className="relative overflow-hidden">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <ProductImage product={product} size="md" className="rounded-none" />
            </motion.div>
            <Badge className="absolute left-3 top-3" variant="secondary">
              {product.category}
            </Badge>
            {product.stock < 10 && (
              <Badge className="absolute right-3 top-3" variant="destructive">
                Low Stock
              </Badge>
            )}
          </div>
        </Link>

        <button
          onClick={() => {
            toggleWishlist(product);
            toast(
              isInWishlist ? "Removed from wishlist" : "Added to wishlist",
              "wishlist"
            );
          }}
          className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart
            className={`size-4 transition-colors ${
              isInWishlist
                ? "fill-rose-500 text-rose-500"
                : "text-muted-foreground"
            }`}
          />
        </button>

        <CardContent className="p-4">
          <div className="mb-1 text-xs font-medium text-muted-foreground">
            {product.brand}
          </div>
          <Link href={`/products/${product.id}`}>
            <h3 className="mb-2 line-clamp-1 font-semibold transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>
          <div className="mb-3 flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">${product.price}</span>
            <Button
              size="sm"
              onClick={() => {
                addItem(product);
                toast(`${product.name} added to cart`, "cart");
              }}
              className="gap-1.5"
            >
              <ShoppingCart className="size-3.5" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
