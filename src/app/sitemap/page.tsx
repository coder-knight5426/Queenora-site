export default function HtmlSitemapPage() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/new-in', label: 'New In' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Use' },
    { href: '/refund', label: 'Refund Policy' },
    { href: '/shipping', label: 'Shipping Policy' },
  ];
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-4 text-2xl font-semibold">Sitemap</h1>
      <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}><a href={l.href} className="text-blue-700 hover:underline">{l.label}</a></li>
        ))}
      </ul>
    </main>
  );
}


