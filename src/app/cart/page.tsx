"use client";

import Link from "next/link";
import { useCart } from "../../components/CartProvider";

export default function CartPage() {
  const { items, total, removeItem, updateQty } = useCart();
  return (
    <main className="mx-auto max-w-7xl bg-[#fff0f7] px-4 py-12">
      <h1 className="mb-4 text-2xl font-semibold">Your Cart</h1>
      {items.length === 0 ? (
        <p className="text-black/70">Your cart is empty.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((it) => (
              <div key={`${it.productId}-${it.variantKey || "_"}`} className="flex items-center gap-4 rounded-md border border-black/10 p-4">
                <div className="h-16 w-16 overflow-hidden rounded bg-black/5">
                  {it.image && <img src={it.image} alt={it.name} className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${it.slug}`} className="truncate text-sm font-medium hover:underline">{it.name}</Link>
                  {it.variantKey && <p className="text-xs text-black/60">{it.variantKey}</p>}
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <input
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) => updateQty(it.productId, Number(e.target.value || 1), it.variantKey)}
                      className="w-16 rounded border border-black/15 px-2 py-1"
                    />
                    <button onClick={() => removeItem(it.productId, it.variantKey)} className="text-xs text-red-600">Remove</button>
                  </div>
                </div>
                <div className="text-sm font-semibold">₹ {it.price}</div>
              </div>
            ))}
          </div>
          <div className="rounded-md border border-black/10 p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">₹ {total.toFixed(2)}</span>
            </div>
            <form action="/api/checkout" method="POST">
              <button type="submit" className="w-full rounded-md bg-black px-4 py-2 text-white">Checkout</button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}


