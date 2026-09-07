import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line-soft bg-carbon">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-panel">
                <img
                  src="/icon.webp"
                  alt=""
                  className="h-5 w-5 object-contain"
                  aria-hidden="true"
                />
              </span>
              <span className="font-head text-sm font-bold tracking-[0.12em] text-ink">
                LAST BOS GAMES
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-dim">
              Arsip cyber-samurai berisi ROM &amp; game pilihan yang dikurasi
              manual. Setiap judul adalah bos terakhir yang menunggu untuk
              ditaklukkan.
            </p>
            <p className="mt-5 text-xs leading-relaxed text-ink-faint">
              Tidak berafiliasi resmi dengan pihak mana pun. Seluruh merek
              dagang dan hak cipta adalah milik pemiliknya masing-masing.
            </p>
          </div>

          <FooterCol
            title="Navigasi"
            links={[
              { to: "/home", label: "Beranda" },
              { to: "/games", label: "Games" },
              { to: "/emulator", label: "Emulator" },
              { to: "/kodeks", label: "Kodeks" },
              { to: "/support", label: "Dukung" },
            ]}
          />
          <FooterCol
            title="Kodeks"
            links={[
              { to: "/kodeks#asal", label: "Asal usul" },
              { to: "/kodeks#prinsip", label: "Prinsip" },
              { to: "/kodeks#faq", label: "Pertanyaan umum" },
              { to: "/kodeks#request", label: "Ajukan judul" },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line-soft pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} Last Bos Games. Dibuat untuk para
            penakluk.
          </span>
          <span className="font-jp tracking-[0.3em]">最終ボスを倒せ</span>
        </div>
      </div>

      {/* watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-jp text-[22vw] leading-none text-white/[0.02] md:text-[16vw]"
      >
        最終ボス
      </span>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h3 className="font-head text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-faint">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link
              to={l.to}
              className="text-sm text-ink-dim transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
