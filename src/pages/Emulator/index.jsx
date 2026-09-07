import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useEmulators } from "../../hooks/useGames";
import { AdCluster } from "../../components/ads";
import EmulatorSeo from "./EmulatorSeo";
import EmulatorHero from "./EmulatorHero";
import EmulatorFilters from "./EmulatorFilters";
import EmulatorGrid, {
  EmulatorSkeleton,
  EmulatorEmptyState,
} from "./EmulatorGrid";
import { SHELL, HOST_LABEL, HOST_ORDER } from "./constants";

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
      <EmulatorSeo />

      <EmulatorHero />

      <div className={`${SHELL} py-12`}>
        {/* FILTER */}
        {!isError && (hasAnyOptions || isLoading) && (
          <EmulatorFilters
            consoleOptions={consoleOptions}
            hostOptions={hostOptions}
            forConsole={forConsole}
            onHost={onHost}
            setParam={setParam}
            resetAll={resetAll}
            hasFilter={hasFilter}
            consoleName={consoleName}
            hostName={hostName}
            totalCount={emulators?.length}
            isLoading={isLoading}
          />
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
          <EmulatorGrid
            emulators={filtered}
            forConsole={forConsole}
            onHost={onHost}
          />
        ) : (
          <EmulatorEmptyState onReset={resetAll} />
        )}

        <AdCluster className="mt-16" />
      </div>
    </div>
  );
}
