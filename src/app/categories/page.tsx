import { fetchCategoriesNoStore } from "../../lib/woo";
import CategoryGrid from "../../components/CategoryGrid";

export const revalidate = 0;

export default async function CategoriesPage() {
  const categories = await fetchCategoriesNoStore();
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold">All Categories</h1>
      <CategoryGrid categories={categories} />
    </main>
  );
}


