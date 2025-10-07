"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export default function MiniCart() {
  const { items, total, removeItem, updateQty, open, setOpen } = useCart();
  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={
          `absolute right-0 top-0 h-full w-full max-w-md transform bg-[#fff0f7] shadow-xl transition-transform ` +
          (open ? `translate-x-0` : `translate-x-full`)
        }
      >
        <div className="flex items-center justify-between border-b border-black/10 p-4">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="cursor-pointer rounded border border-black/10 px-2 py-1 text-sm transition-colors hover:bg-black/10 active:bg-black/20"
          >
            Close
          </button>
        </div>
        <div className="max-h-[70vh] overflow-auto p-4">
          {items.length === 0 ? (
            <p className="text-sm text-black/60">Your cart is empty.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((it) => (
                <li key={`${it.productId}-${it.variantKey || "_"}`} className="flex gap-3">
                  <div className="h-16 w-16 overflow-hidden rounded bg-black/5">
                    {it.image && <img src={it.image} alt={it.name} className="h-full w-full object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{it.name}</p>
                    {it.variantKey && <p className="text-xs text-black/60">{it.variantKey}</p>}
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(it.productId, Math.max(1, it.quantity - 1), it.variantKey)}
                          className="h-8 w-8 rounded border border-black/15 text-sm transition-colors hover:bg-black/5"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={1}
                          value={it.quantity}
                          onChange={(e) => updateQty(it.productId, Number(e.target.value || 1), it.variantKey)}
                          className="w-16 rounded border border-black/15 px-2 py-1 transition-colors hover:border-black/30"
                        />
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQty(it.productId, it.quantity + 1, it.variantKey)}
                          className="h-8 w-8 rounded border border-black/15 text-sm transition-colors hover:bg-black/5"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(it.productId, it.variantKey)}
                        className="cursor-pointer rounded px-2 py-1 text-xs text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-semibold">₹ {it.price}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="border-t border-black/10 p-4">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span className="font-semibold">₹ {total.toFixed(2)}</span>
          </div>
          <Link href="/cart" onClick={() => setOpen(false)} className="block rounded-md bg-black px-4 py-2 text-center text-white">View Cart</Link>
        </div>
      </aside>
    </div>
  );
}


