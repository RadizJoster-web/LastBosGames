import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "../../services/sanity";

export default function ScreenshotLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) {
  // Tutup dengan tombol Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate("prev");
      if (e.key === "ArrowRight") onNavigate("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigate]);

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Brutalist Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 bg-surface border-4 border-ink p-2 shadow-[4px_4px_0px_#8A1010] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_#8A1010] transition-all"
      >
        <X size={32} className="text-ink" />
      </button>

      {/* Navigasi Kiri */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("prev");
        }}
        className="absolute left-4 md:left-10 z-10 bg-surface border-4 border-ink p-3 shadow-[4px_4px_0px_#8A1010] hover:-translate-y-1 hover:-translate-x-1 transition-all"
      >
        <ChevronLeft size={32} className="text-ink" />
      </button>

      {/* Gambar Utama */}
      <div
        className="relative z-0 max-w-5xl max-h-[80vh] border-4 border-ink shadow-[8px_8px_0px_#0F0F0F] bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={urlFor(images[currentIndex]).width(1200).url()}
          alt={`Screenshot ${currentIndex + 1}`}
          className="w-full h-full max-h-[80vh] object-contain"
        />
        <div className="absolute bottom-4 right-4 bg-ink text-white font-display px-3 py-1 text-sm border-2 border-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Navigasi Kanan */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNavigate("next");
        }}
        className="absolute right-4 md:right-10 z-10 bg-surface border-4 border-ink p-3 shadow-[4px_4px_0px_#8A1010] hover:-translate-y-1 hover:-translate-x-1 transition-all"
      >
        <ChevronRight size={32} className="text-ink" />
      </button>
    </div>
  );
}
