"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();
  const hasImage = item.product.images.length > 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex gap-4 rounded-xl border bg-card p-4"
    >
      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
        {hasImage ? (
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div
            className={`flex size-full items-center justify-center bg-gradient-to-br ${item.product.color}`}
          >
            <span className="text-xl font-bold text-white/90">
              {item.product.brand.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="text-xs font-medium text-muted-foreground">
            {item.product.brand}
          </div>
          <h3 className="font-semibold">{item.product.name}</h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-xs"
              onClick={() =>
                updateQuantity(item.product.id, item.quantity - 1)
              }
            >
              <Minus className="size-3" />
            </Button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon-xs"
              onClick={() =>
                updateQuantity(item.product.id, item.quantity + 1)
              }
            >
              <Plus className="size-3" />
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold">
              ${(item.product.price * item.quantity).toLocaleString()}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => removeItem(item.product.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
