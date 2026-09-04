import { useState } from "react";
import { X } from "lucide-react";
import AdFrame from "./AdFrame";

// ============================================================
// SkyscraperAd — banner vertikal 160x300 yang MELAYANG di sisi layar.
//
// - position: fixed, ditaruh di white space kiri/kanan.
// - Hanya muncul di layar sangat lebar (>= 1600px) supaya tidak menimpa konten.
// - Bergerak lembut naik-turun (kelas .ad-bob, mati saat prefers-reduced-motion).
// - Bisa ditutup pengunjung (tombol X).
//
// GANTI KEY DI SINI untuk mengelola unit iklan ini.
// ============================================================
const KEY = "18654a2bdde09c38a880a308713e6290"; // Adsterra 160x300

export default function SkyscraperAd({ side = "right" }) {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div
      className={`absolute top-1/2 z-30 hidden -translate-y-1/2 min-[1600px]:block ${
        side === "right" ? "right-6" : "left-6"
      }`}
      aria-label="Iklan"
    >
      <div className="ad-bob relative">
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Tutup iklan"
          className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-void text-ink-dim transition-colors hover:text-ink"
        >
          <X size={12} />
        </button>
        <AdFrame adKey={KEY} w={160} h={300} />
      </div>
    </div>
  );
}
