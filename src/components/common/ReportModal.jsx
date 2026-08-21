import { useState } from "react";
import { X, Send, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ReportModal({ isOpen, onClose, gameTitle }) {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason) return;

    setStatus("loading");

    try {
      // TODO: Ganti nilainya dengan Credentials dari Dashboard EmailJS Anda
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          game_title: gameTitle,
          report_reason: reason,
          message: message || "Tidak ada pesan tambahan.",
        },
        "YOUR_PUBLIC_KEY",
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 backdrop-blur-sm p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={status !== "loading" ? onClose : undefined}
      ></div>

      {/* Modal Content - Neo Brutalist */}
      <div className="relative z-10 w-full max-w-md bg-surface border-4 border-ink shadow-[8px_8px_0px_#0F0F0F] flex flex-col">
        {/* Header Modal */}
        <div className="bg-ink text-white p-4 flex items-center justify-between">
          <h3 className="font-display font-bold text-xl uppercase tracking-widest flex items-center gap-2">
            <AlertCircle size={20} className="text-primary" /> LAPORAN TARGET
          </h3>
          <button
            onClick={onClose}
            disabled={status === "loading"}
            className="hover:text-primary transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-6">
          {status === "success" ? (
            <div className="bg-green-100 border-2 border-green-800 text-green-800 p-4 text-center font-display font-bold uppercase tracking-widest">
              Laporan berhasil dikirim. Terima kasih atas intelnya.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="font-body text-sm text-ink/75 mb-2">
                Melaporkan masalah pada:{" "}
                <span className="font-bold text-ink">{gameTitle}</span>
              </p>

              <div className="flex flex-col gap-2">
                <label className="font-display font-bold text-ink text-sm uppercase tracking-widest">
                  Alasan Laporan *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="w-full bg-white border-2 border-ink p-3 font-body text-ink focus:border-primary focus:outline-none transition-colors"
                >
                  <option value="" disabled>
                    Pilih Alasan...
                  </option>
                  <option value="Broken Link">
                    Tautan Unduhan Mati / Rusak
                  </option>
                  <option value="Incorrect Information">
                    Informasi Metadata Salah
                  </option>
                  <option value="Wrong Game">
                    File Unduhan Berbeda dengan Judul
                  </option>
                  <option value="Other">Lainnya</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-display font-bold text-ink text-sm uppercase tracking-widest">
                  Keterangan Tambahan
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === "loading"}
                  rows={3}
                  placeholder="Opsional: Berikan detail spesifik..."
                  className="w-full bg-white border-2 border-ink p-3 font-body text-ink focus:border-primary focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {status === "error" && (
                <div className="text-primary font-body text-sm font-bold bg-red-50 p-2 border border-primary">
                  Gagal mengirim laporan. Periksa koneksi atau coba lagi nanti.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || !reason}
                className="mt-2 btn-brutal w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[4px_4px_0px_#0F0F0F]"
              >
                {status === "loading" ? (
                  "MENGIRIM..."
                ) : (
                  <>
                    KIRIM LAPORAN <Send size={18} />
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
