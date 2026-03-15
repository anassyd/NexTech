"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.1),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm"
            >
              <Sparkles className="size-3.5 text-primary" />
              AI-Powered Recommendations
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              The Future of{" "}
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Tech Shopping
              </span>{" "}
              is Here
            </h1>

            <p className="max-w-lg text-lg text-muted-foreground">
              Discover premium smartphones, laptops, and cutting-edge devices.
              Powered by AI to find exactly what you need.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="gap-2">
                  Shop Now
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/recommendations">
                <Button size="lg" variant="outline" className="gap-2">
                  <Sparkles className="size-4" />
                  AI Picks
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto aspect-square max-w-md">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-600/20 blur-3xl" />
              <div className="relative flex h-full items-center justify-center rounded-3xl border bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-center"
                >
                  <Zap className="mx-auto mb-4 size-16 text-primary" />
                  <div className="text-2xl font-bold text-white">NexTech</div>
                  <div className="mt-1 text-sm text-white/60">
                    Premium Tech Store
                  </div>
                </motion.div>
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-4 -top-4 size-24 rounded-full border border-primary/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-4 -left-4 size-32 rounded-full border border-purple-500/20"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
