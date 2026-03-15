"use client";

import { useCartStore } from "@/store/cart-store";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { ProductImage } from "@/components/ui/product-image";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">No items to checkout</h1>
        <p className="mt-2 text-muted-foreground">
          Add some products to your cart first.
        </p>
        <Link href="/products" className="mt-6 inline-block">
          <Button className="gap-2">
            <ArrowLeft className="size-4" />
            Browse Products
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href="/cart"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        <div>
          <div className="sticky top-24 rounded-xl border bg-card p-6">
            <h2 className="mb-4 font-semibold">Your Items</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3"
                >
                  <ProductImage
                    product={item.product}
                    size="sm"
                    className="!h-12 !w-12 shrink-0 rounded-md"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">
                      {item.product.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between text-sm font-semibold">
              <span>Items</span>
              <span>{items.reduce((t, i) => t + i.quantity, 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
