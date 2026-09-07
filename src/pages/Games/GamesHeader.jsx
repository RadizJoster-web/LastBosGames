import { SHELL } from "./constants";

export default function GamesHeader({ totalGames }) {
  return (
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
  );
}
