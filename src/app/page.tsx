"use client";

import { HeroSection } from "@/components/home/hero-section";
import { Categories } from "@/components/home/categories";
import { FeaturedProducts } from "@/components/home/featured-products";
import { AiRecommendations } from "@/components/home/ai-recommendations";
import { Testimonials } from "@/components/home/testimonials";
import { StatsSection } from "@/components/home/stats-section";
import { Newsletter } from "@/components/home/newsletter";
import { ContactForm } from "@/components/forms/contact-form";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <Categories />
      <FeaturedProducts />
      <AiRecommendations />
      <Testimonials />
      <Newsletter />

      <section className="border-t">
        <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 text-center"
          >
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-2 text-muted-foreground">
              Have a question? We&apos;d love to hear from you.
            </p>
          </motion.div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
