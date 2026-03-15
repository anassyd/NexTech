"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-products";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ArrowRight } from "lucide-react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const { results } = useSearch(query);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setFocused(false);
      setQuery("");
    }
  }

  return (
    <div ref={ref} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            className="pl-9 pr-4"
          />
        </div>
      </form>

      <AnimatePresence>
        {focused && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full z-50 mt-2 w-full rounded-xl border bg-card p-2 shadow-xl"
          >
            {results.suggestions.length > 0 && (
              <div className="mb-2">
                <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-muted-foreground">
                  <Sparkles className="size-3" />
                  AI Suggestions
                </div>
                {results.suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      router.push(`/search?q=${encodeURIComponent(s)}`);
                      setFocused(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-muted"
                  >
                    {s}
                    <ArrowRight className="size-3 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}

            {results.products.length > 0 && (
              <div>
                <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
                  Products
                </div>
                {results.products.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      router.push(`/products/${p.id}`);
                      setFocused(false);
                      setQuery("");
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-muted"
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-br text-xs font-bold text-white ${p.color}`}
                    >
                      {p.brand.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">
                        {p.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ${p.price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {results.products.length === 0 &&
              results.suggestions.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-muted-foreground">
                  No results found for &quot;{query}&quot;
                </div>
              )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
