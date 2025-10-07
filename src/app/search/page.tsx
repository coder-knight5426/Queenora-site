import SearchClient from "../../components/SearchClient";

export const revalidate = 0;

type Props = { searchParams: { q?: string } };

export default function SearchPage({ searchParams }: Props) {
  const q = (searchParams.q || "").trim();
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-xl font-semibold">Search</h1>
      <SearchClient initialQuery={q} />
    </main>
  );
}


