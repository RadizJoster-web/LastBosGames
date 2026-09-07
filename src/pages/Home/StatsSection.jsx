import { SkyscraperAd } from "../../components/ads";
import { SHELL, fmt } from "./constants";

export default function StatsSection({ stats }) {
  return (
    <section className="relative overflow-hidden border-y border-line-soft bg-carbon">
      <div className="grid-lines absolute inset-0 opacity-60" />
      <div className={`${SHELL} relative z-10 py-20 md:py-28`}>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">Statistik</p>
            <h2 className="mt-5 max-w-lg font-head text-3xl font-medium tracking-tight md:text-[2.6rem] md:leading-[1.1]">
              Angka yang mendefinisikan arsip
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* chart card */}
          <div className="panel flex flex-col justify-between p-6 lg:row-span-2">
            <div className="flex items-center justify-between">
              <span className="font-head text-xs font-semibold uppercase tracking-[0.18em] text-ink-dim">
                Setiap Bos diperiksa
              </span>
              <span className="chip">manual</span>
            </div>
            <FauxChart />
            <p className="text-xs leading-relaxed text-ink-faint">
              Tidak ada judul yang masuk arsip tanpa lewat pemeriksaan tautan,
              versi, dan metadata.
            </p>
          </div>

          <StatCard
            label="Judul terkurasi"
            value={fmt(stats?.games)}
            jp="作品"
          />
          <StatCard
            label="Platform didukung"
            value={fmt(stats?.platforms)}
            jp="機種"
          />
          <StatCard
            label="Emulator terverifikasi"
            value={fmt(stats?.emulators)}
            jp="装備"
          />
          <StatCard label="Tautan diverifikasi" value="100%" jp="検証済" />
        </div>
      </div>

      {/* Skyscraper melayang di white space kiri/kanan (layar >= 1600px) */}
      <SkyscraperAd side="left" />
      <SkyscraperAd side="right" />
    </section>
  );
}

function StatCard({ label, value, jp }) {
  return (
    <div className="panel flex flex-col justify-between p-6">
      <div className="flex items-start justify-between">
        <span className="font-head text-xs font-medium uppercase tracking-[0.16em] text-ink-dim">
          {label}
        </span>
        <span className="font-jp text-[11px] text-ink-faint">{jp}</span>
      </div>
      <span className="display mt-8 text-5xl text-ink md:text-6xl">
        {value}
      </span>
    </div>
  );
}

function FauxChart() {
  return (
    <div className="my-6">
      <svg viewBox="0 0 300 120" className="h-28 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e01d1d" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e01d1d" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 30, 60, 90, 120].map((y) => (
          <line
            key={y}
            x1="0"
            x2="300"
            y1={y}
            y2={y}
            stroke="#ffffff"
            strokeOpacity="0.05"
          />
        ))}
        <path
          d="M0 100 C 40 96, 60 70, 95 74 S 150 40, 185 48 260 8, 300 14"
          fill="none"
          stroke="#ff3a3a"
          strokeWidth="2"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,58,58,0.6))" }}
        />
        <path
          d="M0 100 C 40 96, 60 70, 95 74 S 150 40, 185 48 260 8, 300 14 L300 120 L0 120 Z"
          fill="url(#lg)"
        />
        <circle cx="300" cy="14" r="3.5" fill="#ff3a3a" />
      </svg>
    </div>
  );
}
