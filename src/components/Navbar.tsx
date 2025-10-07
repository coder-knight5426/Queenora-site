"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { useCart } from "./CartProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/new-in", label: "New in" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3">
        {/* Top row: Logo, Search, Right actions */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-[#2b211b]" style={{ fontFamily: 'var(--font-display, serif)' }}>
            Queenora
          </Link>
          <div className="hidden flex-1 md:block">
            <SearchBar />
          </div>
          <div className="flex items-center gap-3">
            <button aria-label="Cart" onClick={() => setOpen(true)} className="relative rounded-full border border-black/15 p-2 text-xs">
              🛒
              {count > 0 && (
                <span className="absolute -right-1 -top-1 rounded-full bg-black px-1.5 text-[10px] leading-4 text-white">{count}</span>
              )}
            </button>
            <Link aria-label="Login" href="/login" className="rounded-full border border-black/15 p-2 text-xs">👤</Link>
          </div>
        </div>
        {/* Bottom row: Nav links */}
        <nav className="mt-3 hidden gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm transition-colors hover:text-[#2b211b] ${
                pathname === l.href ? "text-[#2b211b]" : "text-black/60"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}


