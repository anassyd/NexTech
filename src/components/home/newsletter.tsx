"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toaster";
import { Send, Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast("Thanks for subscribing!", "success");
      setEmail("");
    }
  };

  return (
    <section className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-8 sm:p-12"
        >
          <div className="absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-12 -left-12 size-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3">
              <Mail className="size-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Stay in the Loop
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Get the latest tech deals, product launches, and exclusive offers
              delivered to your inbox.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-6 flex max-w-md gap-2"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="gap-1.5">
                <Send className="size-3.5" />
                Subscribe
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              No spam, unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
