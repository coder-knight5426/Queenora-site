import Link from "next/link";
import { WooCategory } from "../lib/woo";

type Props = { categories: WooCategory[] };

export default function CategoryGrid({ categories }: Props) {
  if (!categories || categories.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <h2 className="mb-4 text-2xl font-semibold tracking-tight">Shop by Category</h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.id} href={`/categories/${c.slug}`} className="rounded-xl border border-black/10 bg-[rgba(245,240,236,0.6)] p-4 text-center shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:shadow-md">
            <div className="mx-auto aspect-square w-full overflow-hidden rounded-md bg-black/5">
              {c.image?.src ? (
                <img src={c.image.src} alt={c.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-black/40">No Image</div>
              )}
            </div>
            <div className="mt-2 text-sm font-medium">{c.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}


