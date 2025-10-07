import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#0f0f0f] text-[#cfcfcf]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Queenora</h3>
          <p className="mt-2 text-sm">© {new Date().getFullYear()} Queenora. All rights reserved.</p>
          <div className="mt-4 flex gap-3 text-sm">
            <a href="#" aria-label="Facebook" className="rounded p-1 hover:bg-white/10">Fb</a>
            <a href="#" aria-label="Instagram" className="rounded p-1 hover:bg-white/10">Ig</a>
            <a href="#" aria-label="X" className="rounded p-1 hover:bg-white/10">X</a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link href="/new-in" className="hover:text-white">New In</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Use</Link></li>
            <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
            <li><Link href="/shipping" className="hover:text-white">Shipping Policy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold text-white">Sitemap</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/sitemap" className="hover:text-white">HTML Sitemap</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white">XML Sitemap</Link></li>
            <li><Link href="/robots.txt" className="hover:text-white">Robots.txt</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}


