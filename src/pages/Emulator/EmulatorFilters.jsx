import { Gamepad2, MonitorSmartphone, X } from "lucide-react";

export default function EmulatorFilters({
  consoleOptions,
  hostOptions,
  forConsole,
  onHost,
  setParam,
  resetAll,
  hasFilter,
  consoleName,
  hostName,
  totalCount,
  isLoading,
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-line-soft bg-panel p-5">
      <FilterRow
        icon={Gamepad2}
        label="Untuk game (konsol)"
        options={consoleOptions.map((o) => ({
          key: o.slug,
          name: o.name,
          count: o.count,
        }))}
        active={forConsole}
        onPick={(v) => setParam("for", v)}
        totalCount={totalCount}
        loading={isLoading}
      />
      <div className="border-t border-line-soft" />
      <FilterRow
        icon={MonitorSmartphone}
        label="Berjalan di (perangkat)"
        options={hostOptions.map((o) => ({
          key: o.value,
          name: o.name,
          count: o.count,
        }))}
        active={onHost}
        onPick={(v) => setParam("on", v)}
        totalCount={totalCount}
        loading={isLoading}
      />

      {hasFilter && (
        <div className="flex items-center gap-3 pt-1 text-sm text-ink-dim">
          <span>
            {forConsole && (
              <>
                Untuk <span className="text-ink">{consoleName}</span>
              </>
            )}
            {forConsole && onHost && " · "}
            {onHost && (
              <>
                di <span className="text-ink">{hostName}</span>
              </>
            )}
          </span>
          <button
            onClick={resetAll}
            className="inline-flex items-center gap-1 font-head text-[11px] font-semibold uppercase tracking-widest text-accent"
          >
            <X size={12} /> Reset
          </button>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  icon: Icon,
  label,
  options,
  active,
  onPick,
  totalCount,
  loading,
}) {
  return (
    <div>
      <span className="flex items-center gap-2 font-head text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
        <Icon size={13} className="text-accent" />
        {label}
      </span>
      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        <Chip
          active={!active}
          onClick={() => onPick("")}
          label="Semua"
          count={totalCount}
        />
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className="skeleton h-8 w-20 shrink-0 rounded-full"
              />
            ))
          : options.map((o) => (
              <Chip
                key={o.key}
                active={active === o.key}
                onClick={() => onPick(o.key)}
                label={o.name}
                count={o.count}
              />
            ))}
      </div>
    </div>
  );
}

function Chip({ active, onClick, label, count }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 font-head text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
        active
          ? "border-accent bg-accent text-white"
          : "border-line bg-carbon text-ink-dim hover:border-accent/40 hover:text-ink"
      }`}
    >
      {label}
      {typeof count === "number" && (
        <span
          className={`text-[10px] font-normal ${active ? "text-white/70" : "text-ink-faint"}`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
