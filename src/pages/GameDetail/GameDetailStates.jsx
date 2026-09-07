import { SHELL } from "./utils";

export function GameDetailSkeleton() {
  return (
    <div className={`${SHELL} py-16`}>
      <div className="skeleton h-8 w-40" />
      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="skeleton aspect-[3/4] w-full max-w-[300px] lg:w-1/3" />
        <div className="flex-1 space-y-4">
          <div className="skeleton h-12 w-3/4" />
          <div className="skeleton h-40 w-full" />
        </div>
      </div>
    </div>
  );
}

export function GameDetailNotFound({ onBackToGames }) {
  return (
    <div className="flex flex-col items-center justify-center px-5 py-32 text-center">
      <span className="font-jp text-4xl text-ink-faint">敗北</span>
      <h1 className="mt-5 font-head text-2xl font-semibold text-ink">
        Boss tidak ditemukan
      </h1>
      <p className="mt-2 text-ink-dim">
        Target yang kamu cari mungkin sudah dipindahkan atau dihapus dari
        arsip.
      </p>
      <button onClick={onBackToGames} className="btn-primary mt-7">
        Kembali ke arsenal
      </button>
    </div>
  );
}
