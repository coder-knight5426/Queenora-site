import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-2 bg-[#0f0f0f] text-[#cfcfcf]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 text-center md:grid-cols-4 md:text-left">
        <div>
          <h3 className="text-lg font-semibold text-white">Queenora</h3>
          <p className="mt-2 text-sm">© {new Date().getFullYear()} Queenora. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-3 md:justify-start">
            <a
              href="https://www.instagram.com/queenoraofficial/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded p-1 hover:bg-white/10"
              title="Instagram"
            >
              <img src="/socialmediaIcon/instagram.png" alt="Instagram" className="h-6 w-6" />
            </a>
            <a
              href="https://www.youtube.com/@queenora_official"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="rounded p-1 hover:bg-white/10"
              title="YouTube"
            >
              <img src="/socialmediaIcon/youtube.png" alt="YouTube" className="h-6 w-6" />
            </a>
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


