import AdFrame from "./AdFrame";

// ============================================================
// BannerAd — strip tipis 468x60. Cocok untuk sela paragraf / di bawah
// judul section. Otomatis disembunyikan di bawah sm (468px terlalu lebar
// untuk HP kecil).
//
// GANTI KEY DI SINI untuk mengelola unit iklan ini.
// ============================================================
const KEY = "ed01f10c39d356f0d3799ba29b010315"; // Adsterra 468x60

export default function BannerAd({ className = "" }) {
  return (
    <div
      className={`hidden justify-center sm:flex ${className}`}
      aria-label="Iklan"
    >
      <AdFrame adKey={KEY} w={468} h={60} />
    </div>
  );
}
