import { useEffect, useRef } from "react";
import useNearViewport from "./useNearViewport";

// ============================================================
// NativeAd — Native Banner Adsterra (grid artikel sponsor).
//
// Native menyuntik DOM ke <div id="container-<ID>"> lewat invoke.js.
// Di SPA React rawan ketimpa: render host <div> KOSONG (tanpa anak di JSX),
// lalu tambahkan container + script secara imperatif, bersihkan saat unmount.
//
// PERF: script baru disuntik saat komponen hampir masuk viewport
// (useNearViewport). Struktur & min-height (anti-CLS) tidak berubah.
//
// ID & SRC di-HARDCODE di sini (bukan .env). Ganti di file ini untuk mengelola.
// ============================================================
const NATIVE_ID = "907c3f9501e527d753aa90d171feed31";
const NATIVE_SRC =
  "https://producercoconutgroup.com/907c3f9501e527d753aa90d171feed31/invoke.js";

export default function NativeAd({ className = "" }) {
  const [rootRef, inView] = useNearViewport("400px");
  const hostRef = useRef(null);

  useEffect(() => {
    if (!inView) return;
    const host = hostRef.current;
    if (!host) return;

    const container = document.createElement("div");
    container.id = `container-${NATIVE_ID}`;
    host.appendChild(container);

    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = NATIVE_SRC;
    host.appendChild(script);

    return () => {
      host.replaceChildren();
    };
  }, [inView]);

  return (
    <aside
      ref={rootRef}
      className={`overflow-hidden rounded-xl border border-line-soft bg-carbon p-4 ${className}`}
      aria-label="Konten sponsor"
    >
      <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.3em] text-ink-faint/60">
        konten sponsor
      </p>
      <div
        ref={hostRef}
        className="flex w-full justify-center"
        style={{ minHeight: 240 }}
      />
    </aside>
  );
}
