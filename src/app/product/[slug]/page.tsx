import { fetchProductBySlug } from "../../../lib/woo";

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

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
          <div className="aspect-square bg-black/5">
            {image ? (
              <img src={image.src} alt={image.alt || product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-black/50">No image</div>
            )}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
          {price && <p className="mt-2 text-xl font-bold">₹ {price}</p>}
          {product.short_description && (
            <div className="prose prose-sm mt-4 max-w-none" dangerouslySetInnerHTML={{ __html: product.short_description }} />
          )}
          <form action="/api/checkout" method="POST" className="mt-6">
            <input type="hidden" name="product_id" value={product.id} />
            <button
              type="submit"
              className="rounded-md bg-black px-4 py-2 text-white hover:bg-black/90"
            >
              Buy Now
            </button>
          </form>
        </div>
      </div>

      {product.description && (
        <section className="prose prose-sm mt-12 max-w-none" dangerouslySetInnerHTML={{ __html: product.description }} />
      )}
    </main>
  );
}


