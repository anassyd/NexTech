"use client";

import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { toast } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Truck, Shield, RotateCcw, Heart } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary">{product.category}</Badge>
          <Badge variant="outline">{product.brand}</Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < Math.floor(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground"
              )}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{product.rating}</span>
        <span className="text-sm text-muted-foreground">
          ({Math.floor(product.rating * 50)} reviews)
        </span>
      </div>

      <div className="text-3xl font-bold">${product.price}</div>

      <p className="leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <div className="flex items-center gap-2">
        <span
          className={`size-2 rounded-full ${
            product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"
          }`}
        />
        <span className="text-sm">
          {product.stock > 10
            ? "In Stock"
            : product.stock > 0
              ? `Only ${product.stock} left`
              : "Out of Stock"}
        </span>
      </div>

      <div className="flex gap-3">
        <Button
          size="lg"
          className="flex-1 gap-2"
          onClick={() => {
            addItem(product);
            toast(`${product.name} added to cart`, "cart");
          }}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="size-4" />
          Add to Cart
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            toggleWishlist(product);
            toast(
              isInWishlist ? "Removed from wishlist" : "Added to wishlist",
              "wishlist"
            );
          }}
        >
          <Heart
            className={`size-4 ${isInWishlist ? "fill-rose-500 text-rose-500" : ""}`}
          />
        </Button>
      </div>

      <Separator />

      <div className="space-y-6">
        <h3 className="font-semibold">Specifications</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Object.entries(product.specifications).map(([key, value]) => (
            <div key={key} className="rounded-lg bg-muted/50 p-3">
              <div className="text-xs font-medium text-muted-foreground">
                {key}
              </div>
              <div className="mt-0.5 text-sm font-medium">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <Truck className="size-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Free Shipping</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <Shield className="size-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">2 Year Warranty</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-center">
          <RotateCcw className="size-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">30 Day Returns</span>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
