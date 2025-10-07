"use client";

import { useEffect, useState } from "react";
import type { WooProduct } from "../../../../lib/woo";

type Props = { images: NonNullable<WooProduct["images"]> };

export default function Gallery({ images }: Props) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const safeImages = images?.length ? images : [];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') setIdx((i) => (i + 1) % safeImages.length);
      if (e.key === 'ArrowLeft') setIdx((i) => (i - 1 + safeImages.length) % safeImages.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, safeImages.length]);

  if (!safeImages.length) return null;

  return (
    <div>
      {/* Main image */}
      <div className="relative overflow-hidden rounded-lg border border-black/10 bg-white">
        <img
          src={safeImages[idx]?.src}
          alt={safeImages[idx]?.alt || "Product image"}
          className="h-full w-full cursor-zoom-in object-cover"
          onClick={() => setOpen(true)}
        />
        {safeImages.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={() => setIdx((i) => (i - 1 + safeImages.length) % safeImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white hover:bg-black/70"
            >
              ‹
            </button>
            <button
              aria-label="Next image"
              onClick={() => setIdx((i) => (i + 1) % safeImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-2 py-1 text-white hover:bg-black/70"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {safeImages.map((im, i) => (
            <button key={`${i}-${im.id ?? 'x'}-${im.src}`} onClick={() => setIdx(i)} className={`overflow-hidden rounded border ${i === idx ? 'border-black' : 'border-black/10'}`}>
              <img src={im.src} alt={im.alt || "Thumb"} className="h-16 w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4" onClick={() => setOpen(false)}>
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img src={safeImages[idx]?.src} alt="Zoomed" className="max-h-[90vh] max-w-[90vw] object-contain" />
            <button
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-2 top-2 rounded bg-white/90 px-2 py-1 text-sm hover:bg-white"
            >
              Close
            </button>
            <button
              aria-label="Prev"
              onClick={() => setIdx((i) => (i - 1 + safeImages.length) % safeImages.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded bg-white/90 px-2 py-1 text-sm hover:bg-white"
            >
              ‹
            </button>
            <button
              aria-label="Next"
              onClick={() => setIdx((i) => (i + 1) % safeImages.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded bg-white/90 px-2 py-1 text-sm hover:bg-white"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


