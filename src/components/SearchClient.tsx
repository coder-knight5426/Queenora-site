"use client";

import { useEffect, useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";

type WooProduct = Parameters<typeof ProductGrid>[0]["products"][number];

export default function SearchClient({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [debounced, setDebounced] = useState(query);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<WooProduct[]>([]);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!debounced) {
        setProducts([]);
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`/api/products?search=${encodeURIComponent(debounced)}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Search failed");
        const data = await res.json();
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [debounced]);

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full rounded-md border border-black/15 px-3 py-2"
        />
      </div>
      {loading && <p className="mb-2 text-sm text-black/60">Searching…</p>}
      <ProductGrid products={products} />
    </div>
  );
}


