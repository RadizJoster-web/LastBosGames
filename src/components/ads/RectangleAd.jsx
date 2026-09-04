import AdFrame from "./AdFrame";

// ============================================================
// RectangleAd — medium rectangle 300x250. Serba guna: di sela kartu,
// di kolom galeri, dipasang berpasangan di dalam <AdRow>, dll.
//
// Lebar mengikuti isinya (300px) supaya bisa berjajar di <AdRow>.
// GANTI KEY DI SINI untuk mengelola unit iklan ini.
// ============================================================
const KEY = "15f3025432f4873e780149c8ad7d739a"; // Adsterra 300x250

export default function RectangleAd({ className = "", label = "iklan" }) {
  return (
    <div className={`flex justify-center ${className}`} aria-label="Iklan">
      <AdFrame adKey={KEY} w={300} h={250} label={label} />
    </div>
  );
}
