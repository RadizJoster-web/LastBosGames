import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, X, Gamepad2, MonitorSmartphone } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useEmulators } from "../../hooks/useGames";
import { imgFor } from "../../services/sanity";
import { LeaderboardAd, RectangleAd } from "../../components/ads";

const SHELL = "mx-auto max-w-[1400px] px-5 md:px-8";

const HOST_LABEL = {
  pc: "PC",
  mobile: "Mobile",
  ios: "iOS",
  linux: "Linux",
  macos: "macOS",
};
const HOST_ORDER = ["pc", "mobile", "ios", "linux", "macos"];

function EmulatorSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line-soft bg-panel p-6">
      <div className="skeleton h-14 w-14 rounded-lg" />
      <div className="skeleton h-4 w-20" />
      <div className="skeleton h-3 w-28" />
      <div className="skeleton h-3 w-20" />
      <div className="skeleton mt-2 h-9 w-full" />
    </div>
  );
}

export default function Emulator() {
  const { emulators, isLoading, isError } = useEmulators();
  const [searchParams, setSearchParams] = useSearchParams();

  const forConsole = searchParams.get("for") || ""; // slug platform
  const onHost = searchParams.get("on") || ""; // "pc" | "mobile" | ...

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const setParam = (key, value) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (!value) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );
  };
  const resetAll = () =>
    setSearchParams(new URLSearchParams(), { replace: true });

  // Opsi filter diturunkan dari emulator yang ada.
  const consoleOptions = useMemo(() => {
    const map = new Map();
    (emulators || []).forEach((e) =>
      (e.emulates || []).forEach((p) => {
        if (!p?.slug) return;
        map.set(p.slug, {
          name: p.name,
          count: (map.get(p.slug)?.count || 0) + 1,
        });
      }),
    );
    return [...map.entries()]
      .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [emulators]);

  const hostOptions = useMemo(() => {
    const map = new Map();
    (emulators || []).forEach((e) =>
      (e.runsOn || []).forEach((h) => {
        if (!h) return;
        map.set(h, (map.get(h) || 0) + 1);
      }),
    );
    return HOST_ORDER.filter((h) => map.has(h)).map((h) => ({
      value: h,
      name: HOST_LABEL[h] || h,
      count: map.get(h),
    }));
  }, [emulators]);

  const filtered = useMemo(() => {
    // Filter jadi inert jika labelnya memang belum pernah diisi di CMS,
    // supaya tautan "Butuh emulator PS2" dari halaman game tidak mengosongkan daftar.
    const consoleConfigured = consoleOptions.length > 0;
    const hostConfigured = hostOptions.length > 0;
    return (emulators || []).filter((e) => {
      const okConsole =
        !forConsole ||
        !consoleConfigured ||
        (e.emulates || []).some((p) => p?.slug === forConsole);
      const okHost =
        !onHost || !hostConfigured || (e.runsOn || []).includes(onHost);
      return okConsole && okHost;
    });
  }, [
    emulators,
    forConsole,
    onHost,
    consoleOptions.length,
    hostOptions.length,
  ]);

  const hasFilter = !!forConsole || !!onHost;
  const consoleName =
    consoleOptions.find((p) => p.slug === forConsole)?.name ||
    forConsole.toUpperCase();
  const hostName = HOST_LABEL[onHost] || onHost;
  const hasAnyOptions = consoleOptions.length > 0 || hostOptions.length > 0;

  return (
    <div className="border-b border-line-soft">
      <Helmet>
        <title>
          Emulator — Berjalan di &amp; Untuk Game Apa · Last Bos Games
        </title>
        <meta
          name="description"
          content="Kumpulan emulator untuk menjalankan ROM dari arsip Last Bos Games. Tiap emulator diberi label perangkat (PC / Mobile) dan konsol yang didukung (PS2, PSP, dst), lengkap dengan filter."
        />
        <link rel="canonical" href="https://lastbosgames.vercel.app/emulator" />
        <meta property="og:title" content="Emulator · Last Bos Games" />
        <meta
          property="og:description"
          content="Emulator dengan label perangkat & konsol yang didukung — plus filter."
        />
        <meta
          property="og:image"
          content="https://lastbosgaames.vercel.app/icon.webp"
        />
      </Helmet>

      <section className="border-b border-line-soft bg-carbon">
        <div className={`${SHELL} py-16 md:py-20`}>
          <p className="kicker">
            <span className="font-jp not-italic">装備</span>
            <span>Emulator</span>
          </p>
          <h1 className="display mt-6 text-[15vw] text-ink sm:text-6xl md:text-7xl">
            Senjata
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim">
            Tiap emulator punya dua label:{" "}
            <span className="text-ink">berjalan di</span> perangkat apa, dan{" "}
            <span className="text-ink">untuk game konsol</span> apa. Pilih yang
            cocok lewat filter di bawah — semua tautan mengarah ke situs resmi
            pengembang.
          </p>
        </div>
      </section>

      <div className={`${SHELL} py-12`}>
        {/* FILTER */}
        {!isError && (hasAnyOptions || isLoading) && (
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
              totalCount={emulators?.length}
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
              totalCount={emulators?.length}
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
        )}

        {isError && (
          <p className="rounded-xl border border-accent/30 bg-accent/[0.05] p-5 text-sm text-ink-dim">
            Gagal memuat data emulator dari server.
          </p>
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <EmulatorSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filtered.map((emulator) => (
              <EmulatorCard
                key={emulator._id}
                emulator={emulator}
                forConsole={forConsole}
                onHost={onHost}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-4 py-16 text-center">
            <span className="font-jp text-2xl text-ink-faint">該当なし</span>
            <p className="mt-4 max-w-md text-sm text-ink-dim">
              Belum ada emulator yang cocok dengan filter itu.
            </p>
            <button onClick={resetAll} className="btn-outline mt-6">
              Lihat semua emulator
            </button>
          </div>
        )}

        <div className="flex justify-end items-end gap-4 mt-15">
          <RectangleAd />
          <div className="flex flex-col gap-4">
            <LeaderboardAd />
            <LeaderboardAd />
          </div>
          <RectangleAd />
        </div>
      </div>
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

function EmulatorCard({ emulator, forConsole, onHost }) {
  const consoles = emulator.emulates || [];
  const hosts = emulator.runsOn || [];

  return (
    <article className="group flex flex-col rounded-xl border border-line-soft bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center">
          {emulator.logo ? (
            <img
              src={imgFor(emulator.logo).width(96).url()}
              alt={`Logo ${emulator.name}`}
              loading="lazy"
              decoding="async"
              width={44}
              height={44}
              className="h-full w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-carbon font-jp text-base text-ink-faint">
              ？
            </div>
          )}
        </div>
        <h2 className="line-clamp-2 font-head text-sm font-semibold leading-tight text-ink">
          {emulator.name}
        </h2>
      </div>

      <div className="mb-auto mt-4 space-y-3">
        <LabelBlock title="Untuk game">
          {consoles.length ? (
            consoles.map((p) => (
              <span
                key={p.slug || p.name}
                className={`chip-tag ${
                  p.slug === forConsole
                    ? "!bg-accent/15 !text-accent-bright"
                    : ""
                }`}
              >
                {p.name}
              </span>
            ))
          ) : (
            <span className="text-[11px] text-ink-faint">belum dilabeli</span>
          )}
        </LabelBlock>

        <LabelBlock title="Berjalan di">
          {hosts.length ? (
            hosts.map((h) => (
              <span
                key={h}
                className={`chip-tag ${
                  h === onHost ? "!bg-accent/15 !text-accent-bright" : ""
                }`}
              >
                {HOST_LABEL[h] || h}
              </span>
            ))
          ) : (
            <span className="text-[11px] text-ink-faint">belum dilabeli</span>
          )}
        </LabelBlock>
      </div>

      <a
        href={emulator.downloadUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-outline mt-5 w-full !px-3 !py-2.5 !text-[11px]"
      >
        Situs resmi
        <ExternalLink size={13} />
      </a>
    </article>
  );
}

function LabelBlock({ title, children }) {
  return (
    <div>
      <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-faint">
        {title}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
