"use client";

import Link from "next/link";

export type WooImage = {
  id: number;
  src: string;
  alt?: string;
};

export type WooProduct = {
  id: number;
  name: string;
  slug: string;
  price?: string;
  regular_price?: string;
  sale_price?: string;
  images?: WooImage[];
};

type ProductCardProps = {
  product: WooProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images && product.images.length > 0 ? product.images[0] : undefined;
  const displayPrice = product.price ?? product.sale_price ?? product.regular_price ?? "";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-lg border border-black/10 bg-white hover:shadow-md transition-shadow"
    
    >
      <div className="aspect-[4/3] w-full bg-black/5">
        {image ? (
          // Using img instead of next/image to avoid remotePatterns setup for now
          <img
            src={image.src}
            alt={image.alt || product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/50">
            No image
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-medium text-foreground">{product.name}</h3>
        {displayPrice && (
          <p className="mt-1 text-sm font-semibold tracking-wide">₹ {displayPrice}</p>
        )}
      </div>
    </Link>
  );
}


