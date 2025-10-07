import { fetchPostBySlug } from "../../../lib/woo";

export const revalidate = 0;

type Props = { params: { slug: string } };

export default async function BlogDetailPage({ params }: Props) {
  const post = await fetchPostBySlug(params.slug);
  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-center text-sm text-black/60">Post not found.</p>
      </main>
    );
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <article className="prose prose-sm mt-6 max-w-none" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </main>
  );
}


