import { fetchCategoriesNoStore, fetchProductsByCategoryNoStore, WooCategory } from "../../../lib/woo";
import ProductGrid from "../../../components/ProductGrid";

export const revalidate = 0;

type Props = { params: { slug: string } };

export default async function CategoryDetailPage({ params }: Props) {
  const categories = await fetchCategoriesNoStore();
  const category = categories.find((c: WooCategory) => c.slug === params.slug);
  const products = category ? await fetchProductsByCategoryNoStore(category.id) : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold">{category?.name}</h1>
      <ProductGrid products={products} />
    </main>
  );
}


