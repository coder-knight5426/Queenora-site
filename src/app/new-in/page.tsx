import { fetchProductsNoStore } from "../../lib/woo";
import ProductGrid from "../../components/ProductGrid";

export const revalidate = 0;

export default async function NewInPage() {
  const products = await fetchProductsNoStore();
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold">New In</h1>
      <ProductGrid products={products.slice(0, 12)} />
    </main>
  );
}


