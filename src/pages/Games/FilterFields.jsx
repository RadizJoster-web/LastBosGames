import { Flame } from "lucide-react";
import { SELECT_CLASS } from "./constants";

export default function FilterFields({
  options,
  platform,
  genre,
  region,
  isPopular,
  onChangePlatform,
  onChangeGenre,
  onChangeRegion,
  onTogglePopular,
}) {
  return (
    <>
      <label className="flex flex-col gap-1.5">
        <span className="font-head text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
          Platform
        </span>
        <select
          value={platform}
          onChange={(e) => onChangePlatform(e.target.value)}
          className={SELECT_CLASS}
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
          onChange={(e) => onChangeGenre(e.target.value)}
          className={SELECT_CLASS}
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
          onChange={(e) => onChangeRegion(e.target.value)}
          className={SELECT_CLASS}
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
        onClick={onTogglePopular}
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
}
