import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { imgFor } from "../../services/sanity";

export default function FeaturedCard({ game, loading, error }) {
  if (loading) {
    return (
      <div className="panel-glass w-full p-6 lg:max-w-sm">
        <div className="skeleton h-3 w-16 bg-white/10" />
        <div className="mt-5 flex gap-4">
          <div className="skeleton h-24 w-20 bg-white/10" />
          <div className="flex-1 space-y-3 pt-2">
            <div className="skeleton h-4 w-3/4 bg-white/10" />
            <div className="skeleton h-3 w-1/2 bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="panel-glass w-full p-7 lg:max-w-sm">
        <p className="kicker">Kurasi ketat</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-dim">
          Setiap judul diperiksa manual. Tautan diverifikasi. Tanpa survey,
          tanpa jebakan — hanya Bos yang layak.
        </p>
      </div>
    );
  }

  return (
    <Link
      to={`/game/${game.slug?.current}`}
      className="panel-glass group block w-full p-5 transition-colors hover:border-accent/40 lg:max-w-sm"
    >
      <div className="flex items-center justify-between">
        <span className="kicker">
          <span className="font-jp not-italic">最新</span>
          <span>Sorotan</span>
        </span>
        <ArrowUpRight
          size={16}
          className="text-ink-faint transition-colors group-hover:text-accent"
        />
      </div>

      <div className="mt-5 flex gap-4">
        <div className="h-28 w-[84px] shrink-0 overflow-hidden rounded-lg border border-white/10 bg-carbon">
          {game.thumbnail ? (
            <img
              src={imgFor(game.thumbnail, 72)
                .width(180)
                .height(240)
                .fit("crop")
                .url()}
              alt={game.title}
              loading="eager"
              decoding="async"
              width={84}
              height={112}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-jp text-xs text-ink-faint">
              画像なし
            </div>
          )}
        </div>
        <div className="min-w-0 pt-1">
          <h3 className="line-clamp-2 font-head text-base font-semibold leading-snug text-ink">
            {game.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {game.platform?.name && (
              <span className="chip-tag">{game.platform.name}</span>
            )}
            {game.region?.name && (
              <span className="text-[11px] text-ink-faint">
                {game.region.name}
              </span>
            )}
          </div>
          <span className="mt-3 inline-block font-head text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Lihat Bos
          </span>
        </div>
      </div>
    </Link>
  );
}
