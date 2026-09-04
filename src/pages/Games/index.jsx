import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Search,
  X,
  SlidersHorizontal,
  Flame,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useFilteredGames, useFilterOptions } from "../../hooks/useGames";
import GameCard from "../../components/game/GameCard";
import SkeletonCard from "../../components/common/SkeletonCard";
import { AdCluster } from "../../components/ads";

const SHELL = "mx-auto max-w-[1400px] px-5 md:px-8";

export default function Games() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [region, setRegion] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) - 1 : 0;

  const setPage = (updater) => {
    setSearchParams((prevParams) => {
      const currentPage = prevParams.get("page")
        ? parseInt(prevParams.get("page"), 10) - 1
        : 0;
      const newPage =
        typeof updater === "function" ? updater(currentPage) : updater;

      const newUrlParams = new URLSearchParams(prevParams);
      if (newPage === 0) {
        newUrlParams.delete("page");
      } else {
        newUrlParams.set("page", newPage + 1);
      }
      return newUrlParams;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const { games, totalPages, totalGames, isLoading, isError } =
    useFilteredGames(search, platform, genre, region, page, isPopular);

  const { options } = useFilterOptions();

  const resetFilters = () => {
    setSearch("");
    setSearchInput("");
    setPlatform("");
    setGenre("");
    setRegion("");
    setIsPopular(false);
    setSearchParams(new URLSearchParams());
  };

  const activeCount =
    (platform ? 1 : 0) +
    (genre ? 1 : 0) +
    (region ? 1 : 0) +
    (isPopular ? 1 : 0);
  const hasActive = !!search || activeCount > 0;

  const selectClass =
    "field cursor-pointer appearance-none bg-[length:0.9rem] bg-[right_0.85rem_center] bg-no-repeat pr-10 " +
    "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%235c5c66%22%20stroke-width%3D%222%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M19%209l-7%207-7-7%22/%3E%3C/svg%3E')]";

  const renderFilterFields = () => (
    <>
      <label className="flex flex-col gap-1.5">
        <span className="font-head text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Platform
        </span>
        <select
          value={platform}
          onChange={(e) => {
            setPlatform(e.target.value);
            setPage(0);
          }}
          className={selectClass}
        >
          <option value="">Semua platform</option>
          {options?.platforms?.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-head text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Genre
        </span>
        <select
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
            setPage(0);
          }}
          className={selectClass}
        >
          <option value="">Semua genre</option>
          {options?.genres?.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="font-head text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Wilayah
        </span>
        <select
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setPage(0);
          }}
          className={selectClass}
        >
          <option value="">Semua wilayah</option>
          {options?.regions?.map((r) => (
            <option key={r.code} value={r.code}>
              {r.name} ({r.code})
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => {
          setIsPopular(!isPopular);
          setPage(0);
        }}
        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-head text-xs font-semibold uppercase tracking-[0.16em] transition-colors ${
          isPopular
            ? "border-accent bg-accent text-white"
            : "border-line bg-carbon text-ink-dim hover:border-accent/40 hover:text-ink"
        }`}
      >
        <Flame size={15} />
        Terpopuler
      </button>
    </>
  );

  return (
    <div className="border-b border-line-soft">
      <Helmet>
        <title>Games — Katalog Game · Last Bos Games</title>
        <meta
          name="description"
          content="Seluruh bos dalam arsip Last Bos Games. Saring berdasarkan platform, genre, dan wilayah rilis, lalu ambil tautan unduhan langsung yang sudah diverifikasi."
        />
        <link rel="canonical" href="https://lastbosgames.vercel.app/games" />
        <meta
          property="og:title"
          content="Games — Katalog Game · Last Bos Games"
        />
        <meta
          property="og:description"
          content="Seluruh bos dalam arsip. Saring dan unduh dengan tautan langsung."
        />
        <meta
          property="og:image"
          content="https://lastbosgaames.vercel.app/icon.webp"
        />
      </Helmet>

      {/* HEADER */}
      <section className="border-b border-line-soft bg-carbon">
        <div className={`${SHELL} py-16 md:py-20`}>
          <p className="kicker">
            <span className="font-jp not-italic">武器庫</span>
            <span>Games</span>
          </p>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <h1 className="display text-[15vw] text-ink sm:text-6xl md:text-7xl">
              Katalog bos
            </h1>
            {typeof totalGames === "number" && (
              <span className="pb-2 font-mono text-xs uppercase tracking-widest text-ink-faint">
                {totalGames} entri
              </span>
            )}
          </div>
          <p className="mt-4 max-w-xl text-sm text-ink-dim">
            Setiap judul dalam arsip. Saring berdasarkan platform, genre, atau
            wilayah rilis — lalu ambil tautan langsung.
          </p>
        </div>
      </section>

      <div className={`${SHELL} py-10`}>
        {/* SEARCH + FILTER */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint"
              />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari judul…"
                aria-label="Cari judul game"
                className="field pl-11"
              />
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="relative inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-carbon px-4 font-head text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:border-accent/40 lg:hidden"
            >
              <SlidersHorizontal size={15} />
              Filter
              {activeCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter inline (desktop) */}
          <div className="hidden rounded-2xl border border-line-soft bg-panel p-5 lg:block">
            <div className="grid grid-cols-4 items-end gap-4">
              {renderFilterFields()}
            </div>
            {hasActive && (
              <button onClick={resetFilters} className="btn-ghost mt-4">
                <X size={14} /> Reset filter
              </button>
            )}
          </div>

          {/* Chip aktif (mobile) */}
          {hasActive && (
            <div className="flex flex-wrap items-center gap-2 lg:hidden">
              {isPopular && <span className="chip">Terpopuler</span>}
              {platform && (
                <span className="chip">
                  {options?.platforms?.find((p) => p.slug === platform)?.name ||
                    platform}
                </span>
              )}
              {genre && (
                <span className="chip">
                  {options?.genres?.find((g) => g.slug === genre)?.name ||
                    genre}
                </span>
              )}
              {region && <span className="chip">{region}</span>}
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1 font-head text-[11px] font-semibold uppercase tracking-widest text-accent"
              >
                <X size={12} /> Reset
              </button>
            </div>
          )}
        </div>

        {/* GRID */}
        <div className="mt-10">
          {isError ? (
            <p className="rounded-xl border border-accent/30 bg-accent/[0.05] p-5 text-sm text-ink-dim">
              Koneksi ke basis data terputus. Coba muat ulang halaman.
            </p>
          ) : isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : games?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {games.map((g, i) => (
                <GameCard
                  key={g._id}
                  game={g}
                  index={page * 10 + i}
                  priority={i < 4}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-4 py-20 text-center">
              <span className="font-jp text-3xl text-ink-faint">該当なし</span>
              <h3 className="mt-4 font-head text-lg font-semibold text-ink">
                Bos tidak ditemukan
              </h3>
              <p className="mt-2 max-w-md text-sm text-ink-dim">
                Tidak ada judul yang cocok dengan kriteria filter. Coba kurangi
                filter atau periksa ejaan.
              </p>
              <button onClick={resetFilters} className="btn-outline mt-6">
                Reset filter
              </button>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        {!isLoading && !isError && totalPages > 1 && (
          <nav
            className="mt-14 flex items-center justify-center gap-1.5 sm:gap-2"
            aria-label="Navigasi halaman"
          >
            <button
              onClick={() => {
                setPage((p) => Math.max(0, p - 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page === 0}
              aria-label="Halaman sebelumnya"
              className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-line bg-carbon px-2.5 font-head text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:border-accent/40 disabled:pointer-events-none disabled:opacity-30 sm:px-3"
            >
              <ChevronLeft size={15} />
              <span className="hidden sm:inline">Prev</span>
            </button>

            <div className="no-scrollbar flex items-center gap-1 overflow-x-auto sm:gap-1.5">
              {Array.from({ length: totalPages }).map((_, index) => {
                const pageNumber = index;
                const isActive = page === pageNumber;
                const isNearCurrent = Math.abs(pageNumber - page) <= 1;
                const isFirstOrLast =
                  pageNumber === 0 || pageNumber === totalPages - 1;

                if (!isNearCurrent && !isFirstOrLast) {
                  if (pageNumber === 1 || pageNumber === totalPages - 2) {
                    return (
                      <span
                        key={pageNumber}
                        className="px-0.5 font-head text-sm text-ink-faint"
                      >
                        …
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => {
                      setPage(pageNumber);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg px-1.5 font-head text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-accent text-white"
                        : "border border-line bg-carbon text-ink-dim hover:border-accent/40 hover:text-ink"
                    }`}
                  >
                    {pageNumber + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setPage((p) => Math.min(totalPages - 1, p + 1));
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              disabled={page >= totalPages - 1}
              aria-label="Halaman berikutnya"
              className="inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-line bg-carbon px-2.5 font-head text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:border-accent/40 disabled:pointer-events-none disabled:opacity-30 sm:px-3"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={15} />
            </button>
          </nav>
        )}

        {/* Kluster iklan tepat di atas footer */}
        <AdCluster className="mt-16" />
      </div>

      {/* DRAWER FILTER (mobile) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[70] isolate lg:hidden">
          <div
            className="absolute inset-0 bg-void/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-line bg-panel p-6 animate-fade-up">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-head text-base font-semibold uppercase tracking-[0.16em] text-ink">
                Filter
              </h2>
              <button
                onClick={() => setDrawerOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink"
                aria-label="Tutup filter"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex flex-col gap-4">{renderFilterFields()}</div>
            <div className="mt-6 flex gap-3">
              {hasActive && (
                <button onClick={resetFilters} className="btn-outline flex-1">
                  Reset
                </button>
              )}
              <button
                onClick={() => setDrawerOpen(false)}
                className="btn-primary flex-1"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
