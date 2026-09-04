import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { imgFor } from "../../services/sanity";

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
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNavigate]);

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] isolate flex flex-col items-center justify-center bg-void/95 p-4 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-void/60 text-ink transition-colors hover:bg-white/[0.06] md:right-6 md:top-6"
        aria-label="Tutup"
      >
        <X size={20} />
      </button>

      <div
        className="relative z-10 mb-6 mt-12 flex min-h-0 w-full max-w-5xl flex-grow items-center justify-center md:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imgFor(images[currentIndex], 80).width(1400).url()}
          alt={`Tangkapan layar ${currentIndex + 1}`}
          className="max-h-[75vh] max-w-full rounded-lg border border-line object-contain"
        />
      </div>

      <div
        className="relative z-20 flex shrink-0 items-center justify-center gap-5 md:gap-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onNavigate("prev")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-void/60 text-ink transition-colors hover:border-accent/50"
          aria-label="Sebelumnya"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-mono text-xs tracking-[0.3em] text-ink-dim">
          {String(currentIndex + 1).padStart(2, "0")} /{" "}
          {String(images.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => onNavigate("next")}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-void/60 text-ink transition-colors hover:border-accent/50"
          aria-label="Berikutnya"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
