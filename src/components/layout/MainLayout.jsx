import { Suspense, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const RouteFallback = () => (
  <div className="flex min-h-[60vh] w-full items-center justify-center">
    <span className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-accent" />
  </div>
);

const NAV_LINKS = [
  { to: "/", label: "Beranda", jp: "始", end: true },
  { to: "/games", label: "Games", jp: "武器庫" },
  { to: "/emulator", label: "Emulator", jp: "装備" },
  { to: "/kodeks", label: "Kodeks", jp: "掟" },
  { to: "/support", label: "Dukung", jp: "支援" },
];

const MARQUEE_ITEMS = [
  "武士道",
  "Tautan langsung terverifikasi",
  "Tanpa survey · tanpa jebakan",
  "Emulator sumber resmi",
  "Metadata lengkap",
  "アーカイブ",
  "Dikurasi manual",
];

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-void">
      <header className="sticky top-0 z-40 border-b border-line-soft bg-void/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[76px] md:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={close}
            className="group flex items-center gap-3"
            aria-label="Last Bos Games — beranda"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-carbon">
              <img
                src="/icon.webp"
                alt=""
                className="h-5 w-5 object-contain"
                aria-hidden="true"
              />
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-head text-[15px] font-bold tracking-[0.12em] text-ink">
                LAST&nbsp;BOS&nbsp;GAMES
              </span>
              <span className="font-jp text-[10px] tracking-[0.3em] text-ink-faint">
                ラストボス・アーカイブ
              </span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `group relative flex items-center gap-2 rounded-full px-4 py-2 font-head text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-ink-dim hover:text-ink"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`h-1 w-1 rounded-full transition-colors ${
                        isActive
                          ? "bg-accent"
                          : "bg-transparent group-hover:bg-line"
                      }`}
                    />
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA + menu */}
          <div className="flex items-center gap-3">
            <Link to="/games" className="hidden btn-primary sm:inline-flex">
              Jelajahi
              <ArrowUpRight size={14} />
            </Link>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-white/[0.04] lg:hidden"
              aria-label="Buka menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="overflow-hidden border-t border-line-soft bg-carbon/60">
          <div className="marquee-track py-1.5">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
                {MARQUEE_ITEMS.map((item, i) => (
                  <span
                    key={`${dup}-${i}`}
                    className="flex items-center gap-4 whitespace-nowrap px-4 font-head text-[10px] uppercase tracking-[0.34em] text-ink-faint"
                  >
                    {item}
                    <span className="text-accent">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Overlay menu mobile */}
      {menuOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-void isolate lg:hidden">
          <div className="flex h-16 items-center justify-between border-b border-line-soft px-5">
            <span className="font-jp text-xs tracking-[0.3em] text-ink-faint">
              メニュー
            </span>
            <button
              onClick={close}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink"
              aria-label="Tutup menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {NAV_LINKS.map((link, i) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={close}
                className={({ isActive }) =>
                  `flex items-baseline justify-between border-b border-line-soft py-5 ${
                    isActive ? "text-ink" : "text-ink-dim"
                  }`
                }
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-head text-xs tabular-nums text-ink-faint">
                    0{i + 1}
                  </span>
                  <span className="display text-4xl">{link.label}</span>
                </span>
                <span className="font-jp text-sm text-ink-faint">
                  {link.jp}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="p-6">
            <Link to="/games" onClick={close} className="btn-primary w-full">
              Cari game
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}

      <main className="flex-grow">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
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
              { to: "/", label: "Beranda" },
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
