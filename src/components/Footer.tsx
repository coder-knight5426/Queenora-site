export default function Footer() {
  return (
    <footer className="mt-12 border-t border-black/10">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-black/60">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} Queenora. All rights reserved.</p>
          <nav className="flex gap-4">
            <a href="/about" className="hover:text-black">About</a>
            <a href="/blog" className="hover:text-black">Blog</a>
            <a href="/categories" className="hover:text-black">Categories</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}


