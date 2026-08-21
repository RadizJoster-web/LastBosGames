import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "../../services/sanity";

export default function ScreenshotLightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}) {
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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 backdrop-blur-md p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Tombol Tutup di pojok atas */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-surface border-2 border-ink p-2 hover:bg-white transition-colors rounded-sm"
      >
        <X size={28} className="text-ink" />
      </button>

      {/* Kontainer Gambar Utama */}
      <div
        className="relative z-10 w-full max-w-5xl flex-grow flex items-center justify-center min-h-0 mb-6 mt-12 md:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={urlFor(images[currentIndex]).width(1200).url()}
          alt={`Screenshot ${currentIndex + 1}`}
          className="max-w-full max-h-[75vh] object-contain border-4 border-ink shadow-[8px_8px_0px_#0F0F0F] bg-black"
        />
      </div>

      {/* Control Bar Navigasi (Selalu di bawah gambar, aman dari touch overlap) */}
      <div
        className="relative z-20 flex items-center justify-center gap-6 md:gap-10 shrink-0 mb-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onNavigate("prev")}
          className="bg-surface border-4 border-ink p-3 shadow-[4px_4px_0px_#8A1010] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
        >
          <ChevronLeft size={28} className="text-ink" />
        </button>

        <div className="bg-ink text-white font-display px-6 py-2 border-2 border-white text-lg tracking-widest">
          {currentIndex + 1} / {images.length}
        </div>

        <button
          onClick={() => onNavigate("next")}
          className="bg-surface border-4 border-ink p-3 shadow-[4px_4px_0px_#8A1010] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
        >
          <ChevronRight size={28} className="text-ink" />
        </button>
      </div>
    </div>
  );
}
