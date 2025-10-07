import React from "react";
import ProductGrid from "../components/ProductGrid";
import { fetchProductsNoStore } from "../lib/woo";
import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import { fetchCategoriesNoStore } from "../lib/woo";

export const revalidate = 0; // no-store behavior for live updates

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    fetchProductsNoStore(),
    fetchCategoriesNoStore(),
  ]);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <Hero />
      <CategoryGrid categories={categories.slice(0, 8)} />
      <section id="products" className="mb-6 mt-4">
        <h2 className="text-xl font-semibold tracking-tight">Latest Products</h2>
        <p className="text-sm text-black/60">Updated directly from WooCommerce</p>
      </section>
      <ProductGrid products={products} />
    </main>
  );
}

