import { X } from "lucide-react";
import FilterFields from "./FilterFields";

export default function FilterDrawer({
  open,
  onClose,
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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] isolate lg:hidden">
      <div
        className="absolute inset-0 bg-void/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-line bg-panel p-6 animate-fade-up">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-head text-base font-semibold uppercase tracking-[0.16em] text-ink">
            Filter
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink"
            aria-label="Tutup filter"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-col gap-4">
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
        <div className="mt-6 flex gap-3">
          {hasActive && (
            <button onClick={resetFilters} className="btn-outline flex-1">
              Reset
            </button>
          )}
          <button onClick={onClose} className="btn-primary flex-1">
            Terapkan
          </button>
        </div>
      </div>
    </div>
  );
}
