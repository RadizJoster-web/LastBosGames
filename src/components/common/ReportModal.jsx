import { useState, useEffect } from "react";
import { X, Send, TriangleAlert, Check } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ReportModal({ isOpen, onClose, gameTitle }) {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) return;

    setStatus("loading");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          game_title: gameTitle,
          report_reason: reason,
          message: message || "Tidak ada pesan tambahan.",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setTimeout(() => {
        onClose();
        setStatus("idle");
        setReason("");
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] isolate flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-void/80 backdrop-blur-sm"
        onClick={status !== "loading" ? onClose : undefined}
      />

      <div className="panel relative z-10 flex w-full max-w-md flex-col overflow-hidden animate-fade-up">
        <div className="flex items-center justify-between border-b border-line-soft px-5 py-4">
          <h3 className="flex items-center gap-2 font-head text-sm font-semibold uppercase tracking-[0.16em] text-ink">
            <TriangleAlert size={16} className="text-accent" /> Laporkan Info
          </h3>
          <button
            onClick={onClose}
            disabled={status === "loading"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-dim transition-colors hover:bg-white/[0.05] hover:text-ink disabled:opacity-40"
            aria-label="Tutup"
          >
            <X size={17} />
          </button>
        </div>

        <div className="p-5">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-accent/30 bg-accent/[0.06] p-6 text-center">
              <Check size={26} className="text-accent-bright" />
              <p className="font-head text-sm font-medium text-ink">
                Laporan terkirim. Terima kasih atas intelnya.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-ink-dim">
                Melaporkan masalah pada{" "}
                <span className="font-semibold text-ink">{gameTitle}</span>
              </p>

              <div className="flex flex-col gap-1.5">
                <label className="font-head text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                  Alasan *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="field cursor-pointer"
                >
                  <option value="" disabled>
                    Pilih alasan…
                  </option>
                  <option value="Broken Link">Tautan unduhan mati / rusak</option>
                  <option value="Incorrect Information">
                    Metadata salah
                  </option>
                  <option value="Wrong Game">
                    File berbeda dengan judul
                  </option>
                  <option value="Other">Lainnya</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-head text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                  Keterangan
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === "loading"}
                  rows={3}
                  placeholder="Opsional — detail spesifik…"
                  className="field resize-none"
                />
              </div>

              {status === "error" && (
                <div className="rounded-lg border border-accent/40 bg-accent/[0.06] p-2.5 text-sm text-ink">
                  Gagal mengirim. Periksa koneksi atau coba lagi nanti.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !reason}
                className="btn-primary mt-1 w-full"
              >
                {status === "loading" ? (
                  "Mengirim…"
                ) : (
                  <>
                    Kirim laporan <Send size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
