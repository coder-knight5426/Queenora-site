import React from "react";
import Link from "next/link";
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
    <main className="mx-auto max-w-7xl px-4 pt-8 pb-0">
      {/* Mobile-first hero video banner */}
      <section className="mb-8 md:hidden">
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="h-[380px] w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-1_model.png')" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/25 p-6 text-center">
            <h1 className="text-3xl font-semibold text-white" style={{ fontFamily: 'var(--font-display, serif)' }}>
              Breathtaking jewelry, just around the corner. 👑
            </h1>
            <a href="/categories" className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow hover:bg-white/90">
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* Desktop hero retained */}
      <div className="hidden md:block">
        <Hero />
      </div>

      {/* As seen in section */}
      <section className="mx-auto mt-6 max-w-4xl text-center md:max-w-5xl">
        <p className="text-xs tracking-widest text-black/60">SHOP BY STYLE</p>
        <div className="mt-3 grid grid-cols-2 gap-4 text-lg text-black/80 md:grid-cols-6 md:text-xl">
          {[
            { label: 'Traditional', slug: 'traditional' },
            { label: 'Wedding', slug: 'wedding' },
            { label: 'Casual Wear', slug: 'casual-wear' },
            { label: 'Festivals', slug: 'festivals' },
            { label: 'Party Wear', slug: 'party-wear' },
            { label: 'Office Wear', slug: 'office-wear' },
          ].map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="rounded-full border border-black/10 bg-white/60 px-4 py-2 backdrop-blur transition hover:bg-white"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>
      <CategoryGrid categories={categories.slice(0, 8)} />

      {/* Crazy deals banner */}
      <section className="my-8">
        <div className="overflow-hidden rounded-2xl border border-black/10">
          <img src="/crazydeal_banner.png" alt="Crazy Deals" className="h-28 w-full object-cover md:h-40" />
        </div>
      </section>

      <section id="products" className="mb-6 mt-8">
        <h2 className="text-xl font-semibold tracking-tight">Featured products</h2>
        {/* description removed as requested */}
      </section>
      <ProductGrid products={products} />
    </main>
  );
}

