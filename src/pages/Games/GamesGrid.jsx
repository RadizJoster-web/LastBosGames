import GameCard from "../../components/game/GameCard";
import SkeletonCard from "../../components/common/SkeletonCard";

export default function GamesGrid({
  isError,
  isLoading,
  games,
  page,
  resetFilters,
}) {
  if (isError) {
    return (
      <p className="rounded-xl border border-accent/30 bg-accent/[0.05] p-5 text-sm text-ink-dim">
        Koneksi ke basis data terputus. Coba muat ulang halaman.
      </p>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (games?.length > 0) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-4 py-20 text-center">
      <span className="font-jp text-3xl text-ink-faint">該当なし</span>
      <h3 className="mt-4 font-head text-lg font-semibold text-ink">
        Bos tidak ditemukan
      </h3>
      <p className="mt-2 max-w-md text-sm text-ink-dim">
        Tidak ada judul yang cocok dengan kriteria filter. Coba kurangi filter
        atau periksa ejaan.
      </p>
      <button onClick={resetFilters} className="btn-outline mt-6">
        Reset filter
      </button>
    </div>
  );
}
