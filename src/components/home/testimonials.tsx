"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Tech Enthusiast",
    content:
      "NexTech has the best prices and fastest shipping I've ever experienced. My iPhone 15 Pro arrived the next day!",
    rating: 5,
    avatar: "AT",
  },
  {
    name: "Sarah Chen",
    role: "Content Creator",
    content:
      "The AI recommendations found exactly what I needed. Ended up with the perfect MacBook Air for my workflow.",
    rating: 5,
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "Gamer",
    content:
      "Got my PS5 and Meta Quest 3 from here. Amazing product selection and the checkout process is seamless.",
    rating: 4,
    avatar: "MR",
  },
];

export function Testimonials() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            What Our Customers Say
          </h2>
          <p className="mt-2 text-muted-foreground">
            Trusted by thousands of tech lovers worldwide
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl border bg-background p-6"
            >
              <Quote className="absolute right-4 top-4 size-8 text-muted-foreground/20" />
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`size-3.5 ${
                      j < t.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
