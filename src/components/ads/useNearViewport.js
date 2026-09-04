import { useEffect, useRef, useState } from "react";

// ============================================================
// useNearViewport — menunda pemuatan iklan sampai elemennya (hampir)
// terlihat di layar. Begitu true, tetap true (iklan tidak di-unmount).
//
// Dipakai <AdFrame /> & <NativeAd /> supaya script iframe pihak ketiga
// TIDAK dieksekusi saat load awal halaman (menekan TBT / FCP / LCP).
// Struktur kotak anti-CLS tidak berubah — hanya WAKTU muatnya.
// ============================================================
export default function useNearViewport(rootMargin = "400px") {
  const ref = useRef(null);
  // Fallback: kalau IntersectionObserver tak ada, langsung muat.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setInView(true);
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, rootMargin]);

  return [ref, inView];
}
