import { useState, useEffect } from "react";
import { useFilteredGames, useFilterOptions } from "../../hooks/useGames";
import GameCard from "../../components/game/GameCard";
import SkeletonCard from "../../components/common/SkeletonCard";
import { Search, X } from "lucide-react";
import AdBanner from "../../components/common/AdBanner";
import { Helmet } from "react-helmet-async";

export default function Games() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [region, setRegion] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // PERBAIKAN 1: Menambahkan 'page' ke dalam parameter hook
  const { games, isLoading, isError } = useFilteredGames(
    search,
    platform,
    genre,
    region,
    page,
    isPopular,
  );

  const { options } = useFilterOptions();

  const resetFilters = () => {
    setSearch("");
    setSearchInput(""); // Pastikan input visual juga ikut ter-reset
    setPlatform("");
    setGenre("");
    setRegion("");
    setPage(0);
    setIsPopular(false);
  };

  return (
    <div className="flex flex-col gap-10 pb-16">
      <Helmet>
        <title>LBG | Games</title>
        <meta
          name="description"
          content="Katalog game pilihan dengan tautan unduhan langsung. Temukan file, jalankan emulator, dan hancurkan skor tertinggi."
        />
        <link rel="canonical" href="https://last-bos-games.vercel.app/" />
        <meta property="og:title" content="Last Bos Games | Games" />
        <meta
          property="og:description"
          content="Katalog game pilihan dengan tautan unduhan langsung."
        />
        <meta
          property="og:image"
          content="https://last-bos-games.vercel.app/icon.webp"
        />
      </Helmet>

      {/* HEADER SECTION */}
      <section className="pt-8">
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink uppercase mb-4 tracking-wide">
          KATALOG <span className="text-primary">SISTEM</span>
        </h1>
        <p className="text-ink/75 font-body text-lg max-w-2xl">
          Gunakan filter di bawah untuk menyaring data berdasarkan platform,
          genre, atau wilayah rilis.
        </p>
      </section>

      {/* FILTER CONTROLS */}
      <section className="bg-surface border border-border-subtle rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Input Pencarian */}
          <div className="flex flex-col gap-2 md:col-span-4 lg:col-span-1">
            <label className="font-display font-bold text-ink text-sm tracking-widest uppercase">
              Pencarian
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari target operasi..."
                aria-label="Cari judul game"
                className="border-4 border-ink p-3 w-full bg-surface font-body outline-none focus:bg-white"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 rotate-z-90 text-ink/50"
              />
            </div>
          </div>

          {/* Platform Select */}
          <div className="flex flex-col gap-2">
            <label className="font-display font-bold text-ink text-sm tracking-widest uppercase">
              Platform
            </label>
            <select
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
                setPage(0);
              }}
              className="w-full bg-white border-2 border-border-subtle rounded-md px-4 py-2 font-body text-ink focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="">Semua Platform</option>
              {options?.platforms?.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Genre Select */}
          <div className="flex flex-col gap-2">
            <label className="font-display font-bold text-ink text-sm tracking-widest uppercase">
              Genre
            </label>
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
                setPage(0);
              }}
              className="w-full bg-white border-2 border-border-subtle rounded-md px-4 py-2 font-body text-ink focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="">Semua Genre</option>
              {options?.genres?.map((g) => (
                <option key={g.slug} value={g.slug}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region Select */}
          <div className="flex flex-col gap-2">
            <label className="font-display font-bold text-ink text-sm tracking-widest uppercase">
              Wilayah
            </label>
            <select
              value={region}
              onChange={(e) => {
                setRegion(e.target.value);
                setPage(0);
              }}
              className="w-full bg-white border-2 border-border-subtle rounded-md px-4 py-2 font-body text-ink focus:border-primary focus:outline-none cursor-pointer"
            >
              <option value="">Semua Wilayah</option>
              {options?.regions?.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name} ({r.code})
                </option>
              ))}
            </select>
          </div>

          {/* AREA TOMBOL AKSI (TERPOPULER & RESET) */}
          <div className="md:col-span-4 lg:col-span-4 mt-2 flex flex-wrap items-center gap-4">
            {/* Tombol Terpopuler */}
            <button
              onClick={() => {
                setIsPopular(!isPopular);
                setPage(0);
              }}
              className={`flex items-center justify-center gap-2 px-4 py-2 font-display font-bold text-sm tracking-widest uppercase border-2 border-ink transition-all ${
                isPopular
                  ? "bg-primary text-white shadow-[1px_1px_0px_#0F0F0F] translate-y-1 translate-x-1"
                  : "bg-white text-ink shadow-[4px_4px_0px_#0F0F0F] hover:-translate-y-0.5 hover:-translate-x-0.5"
              }`}
            >
              🔥 TERPOPULER
            </button>

            {/* Tombol Reset (Muncul jika ada filter aktif) */}
            {(search || platform || genre || region || isPopular) && (
              <button
                onClick={resetFilters}
                className="flex items-center justify-center gap-2 text-primary font-display font-bold hover:text-ink transition-colors uppercase tracking-widest text-sm"
              >
                <X size={16} /> Reset Semua Filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* GAMES GRID SECTION */}
      <section>
        {isError ? (
          <div className="bg-red-50 text-primary p-6 border-l-4 border-primary font-body rounded-r-md">
            <span className="font-bold">CRITICAL ERROR:</span> Koneksi ke basis
            data terputus.
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {!isLoading && games?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {games.map((game) => (
                  <GameCard key={game._id} game={game} />
                ))}
              </div>
            )}

            {!isLoading && games?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-border-subtle rounded-xl bg-white">
                <div className="text-4xl mb-4 opacity-50">📡</div>
                <h3 className="font-display text-2xl font-bold text-ink uppercase mb-2">
                  TARGET TIDAK DITEMUKAN
                </h3>
                <p className="font-body text-ink/75 mb-6 max-w-md">
                  Sistem tidak dapat menemukan file yang cocok dengan kriteria
                  filter Anda. Coba kurangi filter atau periksa ejaan pencarian.
                </p>
                <button onClick={resetFilters} className="btn-brutal">
                  RESET FILTER
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* KONTROL PAGINATION */}
      {!isLoading && !isError && games.length > 0 && (
        <div className="flex justify-center items-center gap-6 mt-16 pb-8">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="btn-brutal px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            SEBELUMNYA
          </button>

          <span className="font-display text-2xl font-black text-ink">
            HAL {page + 1}
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={games.length < 12}
            className="btn-brutal px-4 py-2 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            SELANJUTNYA
          </button>
        </div>
      )}

      {/* BANNER IKLAN */}
      <AdBanner
        dataKey={import.meta.env.VITE_AD_BANNER_728}
        width={728}
        height={90}
      />
    </div>
  );
}
