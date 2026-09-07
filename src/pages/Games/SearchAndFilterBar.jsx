import { Search, SlidersHorizontal, X } from "lucide-react";
import FilterFields from "./FilterFields";

export default function SearchAndFilterBar({
  searchInput,
  setSearchInput,
  activeCount,
  onOpenDrawer,
  options,
  platform,
  genre,
  region,
  isPopular,
  onChangePlatform,
  onChangeGenre,
  onChangeRegion,
  onTogglePopular,
  hasActive,
  resetFilters,
}) {
  return (
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
          onClick={onOpenDrawer}
          className={`relative inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-carbon px-4
            font-head text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors
            hover:border-accent/40 lg:hidden`}
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
          <FilterFields
            options={options}
            platform={platform}
            genre={genre}
            region={region}
            isPopular={isPopular}
            onChangePlatform={onChangePlatform}
            onChangeGenre={onChangeGenre}
            onChangeRegion={onChangeRegion}
            onTogglePopular={onTogglePopular}
          />
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
              {options?.genres?.find((g) => g.slug === genre)?.name || genre}
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
  );
}
