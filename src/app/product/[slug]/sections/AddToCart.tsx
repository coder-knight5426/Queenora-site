"use client";

import { WooProduct, WooVariation } from "../../../../lib/woo";
import { useMemo, useState } from "react";
import { useCart } from "../../../../components/CartProvider";

type Props = { product: WooProduct; variations: WooVariation[] };

function buildVariantKey(attrs: Record<string, string>): string {
  const pairs = Object.entries(attrs).filter(([, v]) => v);
  return pairs.map(([k, v]) => `${k}:${v}`).sort().join(" | ");
}

export default function AddToCart({ product, variations }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [selected, setSelected] = useState<Record<string, string>>({});

  const variationAttributes = useMemo(() =>
    (product.attributes || []).filter((a) => a.variation && (a.options?.length || 0) > 0),
  [product.attributes]);

  const activeVariation = useMemo(() => {
    if (!variations.length) return undefined;
    const key = buildVariantKey(selected);
    return variations.find((v) => buildVariantKey(Object.fromEntries(v.attributes.map(a => [a.name, a.option]))) === key);
  }, [variations, selected]);

  const price = activeVariation?.price || product.price || product.sale_price || product.regular_price || "";
  const isInStock = (activeVariation?.stock_status || product.stock_status) !== 'outofstock';

  function onAdd() {
    const variantKey = buildVariantKey(selected) || undefined;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images?.[0]?.src,
      price: String(price || "0"),
      quantity: qty,
      variantKey,
    });
  }

  return (
    <div className="mt-6 space-y-4">
      {variationAttributes.map((attr) => (
        <div key={attr.id}>
          <label className="mb-1 block text-sm font-medium">{attr.name}</label>
          <select
            className="w-full rounded-md border border-black/15 px-3 py-2"
            value={selected[attr.name] || ""}
            onChange={(e) => setSelected((s) => ({ ...s, [attr.name]: e.target.value }))}
          >
            <option value="">Select {attr.name}</option>
            {attr.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}

      <div className="flex items-center gap-3">
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
          className="w-20 rounded-md border border-black/15 px-3 py-2"
        />
        <button
          disabled={!isInStock}
          onClick={onAdd}
          className="rounded-md bg-black px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-black/40"
        >
          {isInStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>

      {price && <p className="text-sm text-black/70">Current price: ₹ {price}</p>}
    </div>
  );
}


