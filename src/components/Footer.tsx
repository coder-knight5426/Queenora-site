import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-black/60">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} Queenora. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="/about" className="hover:text-black">About</Link>
            <Link href="/blog" className="hover:text-black">Blog</Link>
            <Link href="/categories" className="hover:text-black">Categories</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}


