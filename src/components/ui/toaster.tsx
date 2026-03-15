"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X, ShoppingCart, Heart } from "lucide-react";

export interface Toast {
  id: string;
  message: string;
  type?: "success" | "error" | "cart" | "wishlist";
  duration?: number;
}

const toastListeners: Set<(toast: Toast) => void> = new Set();

export function toast(message: string, type: Toast["type"] = "success", duration = 3000) {
  const t: Toast = { id: crypto.randomUUID(), message, type, duration };
  toastListeners.forEach((fn) => fn(t));
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((t: Toast) => {
    setToasts((prev) => [...prev.slice(-4), t]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== t.id));
    }, t.duration ?? 3000);
  }, []);

  useEffect(() => {
    toastListeners.add(addToast);
    return () => { toastListeners.delete(addToast); };
  }, [addToast]);

  const icons = {
    success: <CheckCircle2 className="size-4 text-emerald-500" />,
    error: <XCircle className="size-4 text-red-500" />,
    cart: <ShoppingCart className="size-4 text-primary" />,
    wishlist: <Heart className="size-4 text-rose-500" />,
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            className="flex items-center gap-3 rounded-xl border bg-background/95 px-4 py-3 shadow-lg backdrop-blur-sm"
          >
            {icons[t.type ?? "success"]}
            <span className="text-sm font-medium">{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              className="ml-2 rounded-md p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
