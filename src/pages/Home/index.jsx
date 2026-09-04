import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  Cpu,
  ScrollText,
  Link2,
} from "lucide-react";
import { useRecentGames, useCollectionStats } from "../../hooks/useGames";
import { imgFor } from "../../services/sanity";
import GameCard from "../../components/game/GameCard";
import SkeletonCard from "../../components/common/SkeletonCard";
import SakuraField from "../../components/common/SakuraField";
import ScrollColorText from "../../components/common/ScrollColorText";
import {
  SkyscraperAd,
  LeaderboardAd,
  RectangleAd,
} from "../../components/ads";

const SHELL = "mx-auto max-w-[1400px] px-5 md:px-8";

export default function Home() {
  const { games, isLoading, isError } = useRecentGames();
  const { stats } = useCollectionStats();
  const featured = games?.[0];

  // Parallax hero halus
  const [scrollY, setScrollY] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() =>
        setScrollY(Math.min(window.scrollY, 700)),
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const gameCount = stats?.games;

  return (
    <>
      <Helmet>
        <title>
          Last Bos Games — Arsip Cyber Samurai · ROM &amp; Game Pilihan
        </title>
        <meta
          name="description"
          content="Arsip cyber-samurai berisi ROM & game pilihan yang dikurasi manual. Tautan unduhan langsung terverifikasi, emulator sumber resmi, metadata lengkap. Setiap judul adalah bos terakhir yang menunggu untuk ditaklukkan."
        />
        <link rel="canonical" href="https://lastbosgames.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lastbosgames.vercel.app/" />
        <meta
          property="og:title"
          content="Last Bos Games — Arsip Cyber Samurai"
        />
        <meta
          property="og:description"
          content="ROM & game pilihan yang dikurasi manual. Tautan langsung terverifikasi, tanpa jebakan."
        />
        <meta
          property="og:image"
          content="https://lastbosgaames.vercel.app/icon.webp"
        />
      </Helmet>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-line-soft">
        {/* gambar */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-[0.18] md:w-[62%] md:opacity-100"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
            WebkitMaskImage:
              "linear-gradient(to right, transparent, #000 46%, #000)",
            maskImage: "linear-gradient(to right, transparent, #000 46%, #000)",
          }}
        >
          <img
            src="/hero section.webp"
            alt="Prajurit cyber-samurai"
            fetchPriority="high"
            decoding="sync"
            className="h-full w-full object-cover object-[70%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
        </div>

        {/* katakana raksasa */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-24 hidden select-none font-jp text-7xl font-bold text-white/[0.05] lg:block xl:text-8xl"
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        >
          最終
          <br />
          ボス
        </span>

        <div className={`${SHELL} relative z-10`}>
          <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:py-28">
            <div className="max-w-2xl">
              <p className="kicker">
                <span className="font-jp not-italic">アーカイブ</span>
                <span>Arsip Cyber Samurai</span>
              </p>

              <h1 className="mt-7">
                <span className="display block text-[19vw] text-ink sm:text-[13vw] lg:text-[8.5rem]">
                  Last
                </span>
                <span className="display block text-[19vw] text-accent glow-accent sm:text-[13vw] lg:text-[8.5rem]">
                  Bos
                </span>
              </h1>

              <p className="mt-4 font-jp text-sm tracking-[0.2em] text-ink-dim">
                サイバー時代の武士道
              </p>

              <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-dim md:text-lg">
                Gudang game penghancur mental. Setiap judul adalah Bos terakhir
                yang menunggu untuk ditaklukkan — tautan langsung,
                terverifikasi, tanpa jebakan.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link to="/games" className="btn-primary">
                  Telusuri game
                  <ArrowUpRight size={14} />
                </Link>
                <Link to="/kodeks" className="btn-outline">
                  Baca Kodeks
                  <ArrowUpRight size={14} />
                </Link>
              </div>

              <p className="mt-10 flex items-center gap-2.5 font-head text-[11px] uppercase tracking-[0.24em] text-ink-faint">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                {gameCount
                  ? `${gameCount} Bos dalam arsip`
                  : "Dikurasi manual · tanpa kompromi"}
              </p>
            </div>

            {/* Kartu sorotan */}
            <div className="lg:flex lg:items-end lg:justify-end">
              <FeaturedCard
                game={featured}
                loading={isLoading}
                error={isError}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= MANIFESTO (kertas hangat) ================= */}
      <section className="relative overflow-hidden bg-bone text-sumi">
        <SakuraField count={16} />
        <div className={`${SHELL} relative z-10 py-20 md:py-28`}>
          <p className="kicker !text-sumi-dim">
            <span>Kodeks</span>
            <span className="font-jp not-italic">掟</span>
          </p>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <ScrollColorText
                className="font-head text-2xl font-medium leading-[1.35] tracking-tight sm:text-3xl md:text-[2.4rem]"
                segments={[
                  { t: "Last Bos Games adalah" },
                  { t: "arsip digital", tone: "accent" },
                  { t: "para Bos terakhir — perpaduan" },
                  { t: "nostalgia konsol klasik", tone: "muted" },
                  { t: "dengan semangat" },
                  { t: "武士道.", tone: "jp" },
                  { t: "Setiap judul" },
                  { t: "dikurasi manual,", tone: "accent" },
                  { t: "setiap tautan" },
                  { t: "diverifikasi,", tone: "accent" },
                  { t: "setiap unduhan" },
                  { t: "langsung ke sasaran.", tone: "muted" },
                ]}
              />

              <p className="mt-8 max-w-md text-sm leading-relaxed text-sumi-dim">
                Kami tidak mengejar jumlah. Kami mengejar judul yang benar-benar
                layak disimpan — lengkap dengan region, versi, ukuran file, dan
                emulator yang cocok.
              </p>

              <Link
                to="/kodeks"
                className="mt-8 inline-flex items-center gap-2 border-b border-sumi/30 pb-1 font-head text-xs font-semibold uppercase tracking-[0.2em] text-sumi transition-colors hover:border-accent hover:text-accent"
              >
                Selengkapnya tentang kami
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* portrait */}
            <div className="relative overflow-hidden rounded-2xl border border-sumi/10">
              <img
                src="/samurai.webp"
                alt="samurai"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-[53%_center]"
              />
              <div className="absolute inset-0 mix-blend-multiply [background:radial-gradient(circle_at_60%_40%,rgba(224,29,29,0.35),transparent_55%)]" />
              <span className="absolute bottom-4 left-4 font-jp text-xs tracking-[0.3em] text-white/80">
                最終ボス · No.001
              </span>
            </div>
          </div>

          {/* prinsip */}
          <div className="mt-16 grid gap-x-10 gap-y-10 border-t border-sumi/12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Link2,
                title: "Tautan Langsung",
                body: "Unduhan direct. Tanpa maze redirect, tanpa survey, tanpa shortener beracun.",
              },
              {
                icon: ShieldCheck,
                title: "Kurasi Manual",
                body: "Setiap judul dipilih dan diperiksa satu per satu sebelum masuk arsip.",
              },
              {
                icon: Cpu,
                title: "Emulator",
                body: "Emulator yang cocok untuk tiap platform — hanya dari sumber resmi pengembang.",
              },
              {
                icon: ScrollText,
                title: "Kodeks Terbuka",
                body: "Metadata lengkap: region, tahun rilis, ukuran file, bahasa, dan developer.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title}>
                <Icon size={20} className="text-accent" strokeWidth={1.75} />
                <h3 className="mt-4 font-head text-base font-semibold text-sumi">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sumi-dim">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STATISTIK ================= */}
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

      {/* ================= DROP TERBARU ================= */}
      <section className={`${SHELL} py-20 md:py-28`}>
        <div className="flex items-end justify-between gap-4 border-b border-line-soft pb-6">
          <div>
            <p className="kicker">
              <span className="font-jp not-italic">最新</span>
              <span>Drop terbaru</span>
            </p>
            <h2 className="mt-5 font-head text-3xl font-medium tracking-tight md:text-[2.6rem]">
              Game terbaru yang masuk arsip
            </h2>
          </div>
          <Link
            to="/games"
            className="hidden shrink-0 items-center gap-2 font-head text-xs font-semibold uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-accent md:inline-flex"
          >
            Seluruh games
            <ArrowRight size={14} />
          </Link>
        </div>

        {isError ? (
          <p className="mt-10 rounded-xl border border-accent/30 bg-accent/[0.05] p-5 text-sm text-ink-dim">
            Gagal terhubung ke basis data. Coba muat ulang halaman.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : games?.map((g, i) => (
                  <GameCard key={g._id} game={g} index={i} />
                ))}
          </div>
        )}

        <Link to="/games" className="btn-outline mt-8 w-full md:hidden">
          Seluruh games
          <ArrowRight size={14} />
        </Link>

        {/* ================= IKLAN ================= */}
        <div className="flex justify-end items-end gap-4 mt-15">
          <RectangleAd />
          <div className="flex flex-col gap-4">
            <LeaderboardAd />
            <LeaderboardAd />
          </div>
          <RectangleAd />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative overflow-hidden border-t border-line-soft">
        <div className="absolute inset-0 [background:radial-gradient(700px_300px_at_50%_120%,rgba(224,29,29,0.25),transparent)]" />
        <div className={`${SHELL} relative z-10 py-24 text-center md:py-32`}>
          <span className="font-jp text-sm tracking-[0.3em] text-ink-faint">
            準備はいいか
          </span>
          <h2 className="mx-auto mt-5 max-w-2xl font-head text-3xl font-medium tracking-tight md:text-5xl md:leading-[1.1]">
            Siap menghadapi Bos terakhir?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-ink-dim">
            Games terbuka. Pilih judulmu, ambil senjatanya, dan mulai
            pertarungan.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link to="/games" className="btn-primary">
              Telusuri Games
              <ArrowUpRight size={14} />
            </Link>
            <Link to="/support" className="btn-outline">
              Dukung arsip
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function fmt(n) {
  if (n === undefined || n === null) return "—";
  return String(n);
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

function FeaturedCard({ game, loading, error }) {
  if (loading) {
    return (
      <div className="panel-glass w-full p-6 lg:max-w-sm">
        <div className="skeleton h-3 w-16 bg-white/10" />
        <div className="mt-5 flex gap-4">
          <div className="skeleton h-24 w-20 bg-white/10" />
          <div className="flex-1 space-y-3 pt-2">
            <div className="skeleton h-4 w-3/4 bg-white/10" />
            <div className="skeleton h-3 w-1/2 bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="panel-glass w-full p-7 lg:max-w-sm">
        <p className="kicker">Kurasi ketat</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-dim">
          Setiap judul diperiksa manual. Tautan diverifikasi. Tanpa survey,
          tanpa jebakan — hanya Bos yang layak.
        </p>
      </div>
    );
  }

  return (
    <Link
      to={`/game/${game.slug?.current}`}
      className="panel-glass group block w-full p-5 transition-colors hover:border-accent/40 lg:max-w-sm"
    >
      <div className="flex items-center justify-between">
        <span className="kicker">
          <span className="font-jp not-italic">最新</span>
          <span>Sorotan</span>
        </span>
        <ArrowUpRight
          size={16}
          className="text-ink-faint transition-colors group-hover:text-accent"
        />
      </div>

      <div className="mt-5 flex gap-4">
        <div className="h-28 w-[84px] shrink-0 overflow-hidden rounded-lg border border-white/10 bg-carbon">
          {game.thumbnail ? (
            <img
              src={imgFor(game.thumbnail, 72)
                .width(180)
                .height(240)
                .fit("crop")
                .url()}
              alt={game.title}
              loading="eager"
              decoding="async"
              width={84}
              height={112}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-jp text-xs text-ink-faint">
              画像なし
            </div>
          )}
        </div>
        <div className="min-w-0 pt-1">
          <h3 className="line-clamp-2 font-head text-base font-semibold leading-snug text-ink">
            {game.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {game.platform?.name && (
              <span className="chip-tag">{game.platform.name}</span>
            )}
            {game.region?.name && (
              <span className="text-[11px] text-ink-faint">
                {game.region.name}
              </span>
            )}
          </div>
          <span className="mt-3 inline-block font-head text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Lihat Bos
          </span>
        </div>
      </div>
    </Link>
  );
}
