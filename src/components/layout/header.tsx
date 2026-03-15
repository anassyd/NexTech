"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { SearchBar } from "@/components/search/search-bar";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Menu,
  Sun,
  Moon,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/recommendations", label: "AI Picks", icon: Sparkles },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const totalItems = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 30 }}
      className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="size-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight">NexTech</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <Button variant="ghost" size="sm" className="gap-1.5">
                  {link.icon && <link.icon className="size-3.5" />}
                  {link.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>

        <div className="hidden flex-1 justify-center px-8 md:flex">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="size-4" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="size-4" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      <div className="border-t px-4 py-2 md:hidden">
        <SearchBar />
      </div>

      <Sheet open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="mt-8 flex flex-col gap-2">
          <h2 className="mb-4 text-lg font-semibold">Menu</h2>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start gap-2">
                {link.icon && <link.icon className="size-4" />}
                {link.label}
              </Button>
            </Link>
          ))}
          <Link href="/cart" onClick={() => setMobileOpen(false)}>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <ShoppingCart className="size-4" />
              Cart ({totalItems})
            </Button>
          </Link>
        </div>
      </Sheet>
    </motion.header>
  );
}
