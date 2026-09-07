import { Download, TriangleAlert } from "lucide-react";
import { LeaderboardAd } from "../../components/ads";

export default function DownloadSection({ game, onReport }) {
  return (
    <>
      <section className="panel mt-14 p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-line-soft pb-5">
          <h2 className="flex items-center gap-2.5 font-head text-lg font-semibold uppercase tracking-[0.1em] text-ink">
            <Download size={18} className="text-accent" /> Download Game
          </h2>
          <span className="font-jp text-xs text-ink-faint">武器</span>
        </div>

        {game.downloadLinks?.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-3">
            {game.downloadLinks.map((link, idx) => (
              <li
                key={idx}
                className={`flex flex-col items-start justify-between gap-3 rounded-xl border border-line-soft
                  bg-carbon p-4 transition-colors hover:border-accent/40 sm:flex-row sm:items-center`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-ink-faint">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-head text-sm font-semibold text-ink">
                    {link.sourceName}
                    {link.optionalLabel && (
                      <span className="font-normal text-ink-dim">
                        {" "}
                        — {link.optionalLabel}
                      </span>
                    )}
                  </h3>
                </div>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full shrink-0 sm:w-auto"
                >
                  {/^\d+([.,]\d+)?\s*(b|kb|mb|gb|tb)$/i.test(
                    String(link.fileSize || "").trim(),
                  ) ? (
                    <>
                      <Download size={14} />
                      Unduh
                      <span className="font-normal opacity-70">
                        {link.fileSize}
                      </span>
                    </>
                  ) : (
                    <span>{link.fileSize}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-sm text-ink-dim">
            Tautan unduhan belum tersedia untuk judul ini.
          </p>
        )}

        <div className="mt-6 flex justify-end border-t border-line-soft pt-5">
          <button
            onClick={onReport}
            className="inline-flex items-center gap-1.5 font-head text-xs font-medium uppercase tracking-widest text-ink-faint transition-colors hover:text-accent"
          >
            <TriangleAlert size={14} /> Laporkan info salah
          </button>
        </div>
      </section>

      {/* Leaderboard tepat di atas footer — 728x90 desktop, 300x250 mobile */}
      <LeaderboardAd className="mt-12" />
    </>
  );
}
