import { fetchProductBySlug, fetchVariationsNoStore, type WooVariation } from "../../../lib/woo";
import Gallery from "./sections/Gallery";
import AddToCart from "./sections/AddToCart";

export const revalidate = 0;

type PageProps = {
  params: { slug: string };
};

export default async function ProductPage({ params }: PageProps) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-center text-sm text-black/60">Product not found.</p>
      </main>
    );
  }

  const image = product.images && product.images.length > 0 ? product.images[0] : undefined;
  const price = product.price ?? product.sale_price ?? product.regular_price ?? "";
  const onSale = product.sale_price && product.regular_price && parseFloat(product.sale_price) < parseFloat(product.regular_price);
  const variations: WooVariation[] = product.type === 'variable' ? await fetchVariationsNoStore(product.id) : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Gallery images={product.images || []} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
          {/* Rating */}
          <div className="mt-2 flex items-center gap-2 text-sm">
            {Array.from({ length: 5 }).map((_, i) => {
              const avg = Number(product.average_rating || 0);
              const filled = i + 1 <= Math.round(avg);
              return (
                <span key={i} className={filled ? 'text-yellow-500' : 'text-black/30'}>★</span>
              );
            })}
            <span className="text-black/70">{product.average_rating || '4.5'}/5</span>
          </div>

          {onSale ? (
            <div className="mt-2 flex items-baseline gap-3">
              <p className="text-xl font-bold">₹ {product.sale_price}</p>
              <p className="text-sm text-black/60 line-through">₹ {product.regular_price}</p>
            </div>
          ) : (
            price && <p className="mt-2 text-xl font-bold">₹ {price}</p>
          )}
          <p className="mt-1 text-sm text-black/60">
            {product.stock_status === 'instock' ? 'In stock' : product.stock_status === 'outofstock' ? 'Out of stock' : 'On backorder'}
            {typeof product.stock_quantity === 'number' ? ` · ${product.stock_quantity} available` : ''}
          </p>
          {product.short_description && (
            <div className="prose prose-sm mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: product.short_description }} />
          )}
          <AddToCart product={product} variations={variations} />
        </div>
      </div>

      {product.description && (
        <section className="prose prose-sm mt-12 max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
      )}
    </main>
  );
}


