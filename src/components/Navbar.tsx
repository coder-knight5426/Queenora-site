"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import { useCart } from "./CartProvider";
import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/85 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3">
        {/* Top row desktop */}
        <div className="hidden items-center gap-4 md:flex">
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

        {/* Top row mobile: rounded navbar with hamburger and cart */}
        <div className="md:hidden">
          <div className="flex items-center justify-between rounded-full border border-black/10 bg-white px-3 py-2 shadow-sm">
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen(true)}
              className="rounded-full border border-black/10 px-3 py-2 text-sm hover:bg-black/5"
            >
              ☰
            </button>
            <Link href="/" className="text-base font-semibold tracking-tight text-[#2b211b]" style={{ fontFamily: 'var(--font-display, serif)' }}>
              Queenora
            </Link>
            <div className="flex items-center gap-2">
              <button aria-label="Cart" onClick={() => setOpen(true)} className="relative rounded-full border border-black/15 p-2 text-xs">
                🛒
                {count > 0 && (
                  <span className="absolute -right-1 -top-1 rounded-full bg-black px-1.5 text-[10px] leading-4 text-white">{count}</span>
                )}
              </button>
            </div>
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

      {/* Mobile dropdown menu (centered under rounded navbar) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-70 md:hidden">
          <div className="absolute inset-0" onClick={() => setMobileOpen(false)} />
          <div className="pointer-events-none absolute left-0 right-0 top-0 flex justify-center">
            <div className="pointer-events-auto mx-4 mt-[72px] w-full max-w-xl rounded-3xl glass-card p-5 text-center animate-slow-pop">
              <nav>
                <ul className="space-y-4">
                  {links
                    .filter(l => ["/categories", "/about", "/blog", "/contact"].includes(l.href))
                    .map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={() => setMobileOpen(false)}>
                          <span className="glass-pill inline-block w-full rounded-full px-6 py-3 text-base font-medium tracking-wider">
                            {l.label.toUpperCase()}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


