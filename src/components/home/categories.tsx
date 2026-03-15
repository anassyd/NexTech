"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Shop by Category
        </h2>
        <p className="mt-2 text-muted-foreground">
          Browse our curated collection of tech devices
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <Link
              href={`/products?category=${cat.id}`}
              className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-md"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="text-3xl"
              >
                {cat.icon}
              </motion.div>
              <span className="text-sm font-medium">{cat.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
