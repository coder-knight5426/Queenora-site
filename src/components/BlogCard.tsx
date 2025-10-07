import Link from "next/link";
import type { WPPost } from "../lib/woo";

function getThumb(post: WPPost): string | undefined {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return media?.source_url as string | undefined;
}

export default function BlogCard({ post }: { post: WPPost }) {
  const img = getThumb(post);
  const date = new Date(post.date);
  const dateStr = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  const readMins = Math.max(3, Math.floor((post.content?.rendered?.length || 500) / 1200)) + " MIN READ";

  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white">
      {img && (
        <div className="aspect-[4/3] w-full overflow-hidden">
          <img src={img} alt={post.title.rendered} className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#fff0f7] px-3 py-1 text-xs">
          <span className="h-2 w-2 rounded-full bg-[#9dc44b]" />
          NEWS
        </span>
        <h3 className="mt-3 text-lg font-semibold" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <div className="mt-2 text-sm text-black/70" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        <div className="mt-4 text-xs text-black/60">
          {dateStr} | {readMins}
        </div>
        <Link href={`/blog/${post.slug}`} className="mt-4 inline-block rounded-full bg-black px-4 py-2 text-xs text-white hover:bg-black/90">Read More</Link>
      </div>
    </article>
  );
}


