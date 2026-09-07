import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GameCard from "../../components/game/GameCard";
import SkeletonCard from "../../components/common/SkeletonCard";
import { AdCluster } from "../../components/ads";
import { SHELL } from "./constants";

export default function LatestDropsSection({ games, isLoading, isError }) {
  return (
    <section className={`${SHELL} py-20 md:py-28`}>
      <div className="flex items-end justify-between gap-4 border-b border-line-soft pb-6">
        <div>
          <p className="kicker">
            <span className="font-jp not-italic">最新</span>
            <span>Drop terbaru</span>
          </p>
          <h2 className="mt-5 font-head text-3xl font-medium tracking-tight md:text-[2.6rem]">
            Game terbaru yang masuk arsip
          </h2>
        </div>
        <Link
          to="/games"
          className="hidden shrink-0 items-center gap-2 font-head text-xs font-semibold uppercase tracking-[0.2em] text-ink-dim transition-colors hover:text-accent md:inline-flex"
        >
          Seluruh games
          <ArrowRight size={14} />
        </Link>
      </div>

      {isError ? (
        <p className="mt-10 rounded-xl border border-accent/30 bg-accent/[0.05] p-5 text-sm text-ink-dim">
          Gagal terhubung ke basis data. Coba muat ulang halaman.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : games?.map((g, i) => <GameCard key={g._id} game={g} index={i} />)}
        </div>
      )}

      <Link to="/games" className="btn-outline mt-8 w-full md:hidden">
        Seluruh games
        <ArrowRight size={14} />
      </Link>

      {/* ================= IKLAN ================= */}
      <AdCluster className="mt-16" />
    </section>
  );
}
