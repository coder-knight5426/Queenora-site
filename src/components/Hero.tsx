export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="flex h-auto flex-col justify-center rounded-xl border border-black/10 bg-white p-8 md:h-[520px]">
          <h2 className="text-4xl font-semibold leading-tight text-[#2b211b]" style={{ fontFamily: 'var(--font-display, serif)' }}>It’s all About New Year</h2>
          <p className="mt-3 text-[15px] text-black/70">
            Discover your iconic style. Ethically sourced, consciously crafted.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#products" className="rounded-full bg-[#1a1a1a] px-5 py-2 text-white hover:bg-black">Shop Now</a>
            <a href="/about" className="rounded-full border border-black/20 px-5 py-2 hover:bg-black/5">About Us</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl border border-black/10 md:h-[520px]">
          <div className="mask-fade-left h-full w-full bg-[url('/hero-1.jpg')] bg-cover bg-center" />
        </div>
        <div className="overflow-hidden rounded-xl border border-black/10 md:h-[520px]">
          <div className="h-full w-full bg-[url('/hero-2.jpg')] bg-cover bg-center" />
        </div>
        <div className="overflow-hidden rounded-xl border border-black/10 md:h-[520px]">
          <div className="mask-fade-right h-full w-full bg-[url('/hero-3.jpg')] bg-cover bg-center" />
        </div>
      </div>
    </section>
  );
}


