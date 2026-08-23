import { useState } from "react";
import { useFilteredGames, useFilterOptions } from "../../hooks/useGames";
import GameCard from "../../components/game/GameCard";
import SkeletonCard from "../../components/common/SkeletonCard";
import { Search, X } from "lucide-react";
import AdBanner from "../../components/common/AdBanner";

export default function Games() {
  // State untuk menyimpan nilai filter
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [region, setRegion] = useState("");

  // Fetch data berdasarkan state saat ini
  const { games, isLoading, isError } = useFilteredGames(
    search,
    platform,
    genre,
    region,
  );
  const { options } = useFilterOptions();

  // Fungsi untuk mereset semua filter
  const resetFilters = () => {
    setSearch("");
    setPlatform("");
    setGenre("");
    setRegion("");
  };

  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* HEADER SECTION - Clean Modern */}
      <section className="pt-8">
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink uppercase mb-4 tracking-wide">
          KATALOG <span className="text-primary">SISTEM</span>
        </h1>
        <p className="text-ink/75 font-body text-lg max-w-2xl">
          Temukan target operasimu. Gunakan filter di bawah untuk menyaring data
          berdasarkan platform, genre, atau wilayah rilis.
        </p>
      </section>

      {/* FILTER CONTROLS - Clean Form Layout */}
      <section className="bg-surface border border-border-subtle rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          {/* Search Input */}
          <div className="flex flex-col gap-2 md:col-span-4 lg:col-span-1">
            <label className="font-display font-bold text-ink text-sm tracking-widest uppercase">
              Pencarian
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Cari judul game..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border-2 border-border-subtle rounded-md pl-10 pr-4 py-2 font-body text-ink focus:border-primary focus:outline-none transition-colors"
              />
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/50"
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
              onChange={(e) => setPlatform(e.target.value)}
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
              onChange={(e) => setGenre(e.target.value)}
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
              onChange={(e) => setRegion(e.target.value)}
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

          {/* Reset Button (Tampil jika ada filter aktif) */}
          {(search || platform || genre || region) && (
            <button
              onClick={resetFilters}
              className="md:col-span-4 lg:col-span-4 mt-2 flex items-center justify-center gap-2 text-primary font-display font-bold hover:text-ink transition-colors uppercase tracking-widest text-sm"
            >
              <X size={16} /> Reset Semua Filter
            </button>
          )}
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
            {/* Indikator Loading */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* Jika Data Ditemukan */}
            {!isLoading && games?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {games.map((game) => (
                  <GameCard key={game._id} game={game} />
                ))}
              </div>
            )}

            {/* Empty State (Jika tidak ada game yang cocok) */}
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

      <AdBanner
        dataKey="6df18de5456453f3bbfa52c33bf2bad6"
        width={728}
        height={90}
      />
    </div>
  );
}
