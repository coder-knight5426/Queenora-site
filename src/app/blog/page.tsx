import { fetchPostsNoStore } from "../../lib/woo";
import BlogCard from "../../components/BlogCard";

export const revalidate = 0;

export default async function BlogIndexPage() {
  const posts = await fetchPostsNoStore();
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-6 text-center text-4xl font-semibold" style={{ fontFamily: 'var(--font-display, serif)' }}>All posts.</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <BlogCard key={p.id} post={p} />
        ))}
      </div>
    </main>
  );
}


