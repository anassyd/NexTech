"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  product: Product;
}

export function ImageGallery({ product }: ImageGalleryProps) {
  const images = product.images.length > 0 ? product.images : [];
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div
        className={cn(
          "flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br",
          product.color
        )}
      >
        <div className="text-center">
          <div className="text-6xl font-bold text-white/90">
            {product.brand.charAt(0)}
          </div>
          <div className="mt-2 text-lg font-medium text-white/60">
            {product.name}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative aspect-square overflow-hidden rounded-2xl bg-muted"
        >
          <Image
            src={images[selected]}
            alt={`${product.name} - Image ${selected + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={selected === 0}
          />
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={cn(
              "relative size-16 overflow-hidden rounded-lg transition-all",
              selected === i
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "opacity-60 hover:opacity-80"
            )}
          >
            <Image
              src={img}
              alt={`${product.name} thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
