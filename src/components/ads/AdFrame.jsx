import useNearViewport from "./useNearViewport";

// ============================================================
// <AdFrame /> — mesin bersama untuk semua banner iframe Adsterra.
//
// Bukan "unit iklan" — ini hanya kotak + iframe. Tiap unit iklan
// (LeaderboardAd, RectangleAd, dst) memberikan key + ukurannya sendiri.
//
// - Script Adsterra di-sandbox di dalam iframe /ad-banner.html supaya
//   document.write miliknya tidak bentrok dengan React.
// - Anti-CLS: kotak punya width/height + min-width/min-height tetap
//   (dipesan SEBELUM iklan dimuat, jadi tidak ada layout shift).
// - PERF: iframe (dan script pihak ketiga di dalamnya) baru dimuat saat
//   kotak hampir masuk viewport — lihat useNearViewport.
// - key & host di-HARDCODE (bukan .env) — lihat masing-masing file *Ad.jsx.
// ============================================================

// Host tempat invoke.js banner diambil.
// Kalau iklan tidak muncul, coba ganti ke "https://www.highrevenueformat.com".
export const BANNER_HOST = "https://producercoconutgroup.com";

export default function AdFrame({ adKey, w, h, label = "iklan", className = "" }) {
  const [ref, inView] = useNearViewport("400px");

  if (!adKey) return null;

  const params = new URLSearchParams({
    key: adKey,
    w: String(w),
    h: String(h),
    host: BANNER_HOST,
  });

  return (
    <div
      ref={ref}
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line-soft bg-carbon ${className}`}
      style={{
        width: w,
        height: h,
        minWidth: `min(${w}px, 100%)`,
        minHeight: h,
        maxWidth: "100%",
      }}
    >
      <span className="pointer-events-none absolute font-mono text-[9px] uppercase tracking-[0.3em] text-ink-faint/50">
        {label}
      </span>
      {inView && (
        <iframe
          title={`Iklan ${w}x${h}`}
          src={`/ad-banner.html?${params.toString()}`}
          width={w}
          height={h}
          loading="lazy"
          scrolling="no"
          frameBorder="0"
          className="relative z-10 block border-0"
        />
      )}
    </div>
  );
}
