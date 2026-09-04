import { useEffect, useMemo, useRef, useState } from "react";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Teks yang "diwarnai" mengikuti scroll: mulai abu-abu, lalu tiap kata berubah
 * ke warna aslinya (hitam / merah / abu-hantu) saat section melewati viewport.
 *
 * segments: [{ t: "teks", tone?: "accent" | "muted" | "jp" }]
 *   - tanpa tone  -> hitam pekat
 *   - "accent"    -> merah
 *   - "muted"     -> abu-abu hantu (kata pendukung)
 *   - "jp"        -> hitam + font Jepang
 */
export default function ScrollColorText({ segments, className = "" }) {
  const ref = useRef(null);
  // reduced-motion: langsung tampilkan keadaan akhir (progress = 1)
  const [progress, setProgress] = useState(() =>
    prefersReducedMotion() ? 1 : 0,
  );

  const words = useMemo(() => {
    const out = [];
    segments.forEach((seg) => {
      seg.t
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w) => out.push({ w, tone: seg.tone || null }));
    });
    return out;
  }, [segments]);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    let frame = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // mulai saat teks masuk dari bawah (top = 82% vh),
      // selesai setelah teks naik melewati tengah layar.
      const span = vh * 0.55 + rect.height * 0.6;
      const p = (vh * 0.82 - rect.top) / span;
      setProgress(Math.max(0, Math.min(1, p)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const total = words.length;
  // beberapa kata "di depan" ikut menyala lebih dulu -> tepi transisi lebih lembut
  const shown = progress * (total + 3);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          data-lit={i < shown ? "true" : "false"}
          data-tone={word.tone || undefined}
          className={`scroll-reveal-word${word.tone === "jp" ? " font-jp" : ""}`}
        >
          {word.w}
          {i < total - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
