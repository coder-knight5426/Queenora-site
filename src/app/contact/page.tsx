export const revalidate = 0;

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-semibold">Contact Us</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-medium">Address</h2>
            <p className="text-black/70">9/370, Khichripur Delhi 110091</p>
          </div>
          <div>
            <h2 className="text-lg font-medium">Phone</h2>
            <p className="text-black/70">+91 8800808452</p>
          </div>
          <div className="overflow-hidden rounded-lg border border-black/10">
            <iframe
              title="Map"
              width="100%"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=9/370%2C%20Khichripur%20Delhi%20110091&output=embed"
            />
          </div>
        </div>
        <form action="/api/contact" method="POST" className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Name</label>
            <input name="name" required className="w-full rounded-md border border-black/15 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <input name="email" type="email" required className="w-full rounded-md border border-black/15 px-3 py-2" />
          </div>
          <div>
            <label className="mb-1 block text-sm">Message</label>
            <textarea name="message" rows={5} required className="w-full rounded-md border border-black/15 px-3 py-2" />
          </div>
          <button className="rounded-md bg-black px-4 py-2 text-white">Send</button>
        </form>
      </div>
    </main>
  );
}


