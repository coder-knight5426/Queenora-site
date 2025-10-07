"use client";

import Link from "next/link";
import Image from "next/image";

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
  const salePrice = product.sale_price && product.sale_price !== "0" ? product.sale_price : undefined;
  const regularPrice = product.regular_price && product.regular_price !== "0" ? product.regular_price : undefined;
  const displayPrice = product.price ?? salePrice ?? regularPrice ?? "";
  const onSale = salePrice && regularPrice && parseFloat(salePrice) < parseFloat(regularPrice);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-[4/3] w-full bg-white">
        {onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-[#b3c24b] px-2 py-0.5 text-[10px] font-semibold text-black shadow">ON SALE</span>
        )}
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            width={600}
            height={450}
            className="h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/50">
            No image
          </div>
        )}
      </div>
      <div className="px-4 pb-4">
        <h3 className="line-clamp-2 text-sm font-medium text-foreground">{product.name}</h3>
        {onSale ? (
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-sm font-semibold">₹ {salePrice}</span>
            <span className="text-xs text-black/50 line-through">₹ {regularPrice}</span>
          </div>
        ) : (
          displayPrice && <p className="mt-1 text-sm font-semibold tracking-wide">₹ {displayPrice}</p>
        )}
        <button className="mt-3 w-full rounded-full bg-[#b3c24b] px-4 py-2 text-xs font-semibold text-black hover:bg-[#a2b13f]">Shop Now</button>
      </div>
    </Link>
  );
}


