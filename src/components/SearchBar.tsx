"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Product = { id: number; name: string; slug: string; images?: { src: string }[]; price?: string };

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setTimeout(async () => {
      if (!q) { setResults([]); return; }
      const res = await fetch(`/api/products?search=${encodeURIComponent(q)}&per_page=8`, { cache: 'no-store' });
      if (!res.ok) return;
      setResults(await res.json());
      setOpen(true);
    }, 250);
    return () => clearTimeout(id);
  }, [q]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-md border border-black/20 px-4 py-2"
      />
      {open && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-md border border-black/10 bg-white shadow-lg">
          <ul>
            {results.map((p) => (
              <li key={p.id} className="flex items-center gap-3 border-b border-black/5 px-3 py-2 last:border-none hover:bg-black/5">
                <Link href={`/product/${p.slug}`} className="flex w-full items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded bg-black/5">
                    {p.images?.[0]?.src ? (
                      <img src={p.images[0].src} alt={p.name} className="h-full w-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">{p.name}</p>
                    {p.price && <p className="text-xs text-black/60">₹ {p.price}</p>}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-black/5 p-2 text-right text-xs">
            <Link href={`/search?q=${encodeURIComponent(q)}`} className="underline">See all results</Link>
          </div>
        </div>
      )}
    </div>
  );
}


