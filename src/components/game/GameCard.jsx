import { Link } from "react-router-dom";
import { imgFor } from "../../services/sanity";

export default function GameCard({ game, index, priority = false }) {
  if (!game) return null;

  const image = game.thumbnail ? imgFor(game.thumbnail, 75) : null;
  const genres = game.genre?.map((g) => g.name).filter(Boolean) || [];

  return (
    <Link
      to={`/game/${game.slug?.current}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-line-soft bg-panel transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_0_50px_-14px_rgba(224,29,29,0.45)]"
    >
      {/* Cover */}
      <div className="relative aspect-[3/4] overflow-hidden bg-carbon">
        {image ? (
          <img
            src={image.width(600).height(800).fit("crop").url()}
            srcSet={[240, 360, 480, 600]
              .map(
                (w) =>
                  `${image
                    .width(w)
                    .height(Math.round((w * 4) / 3))
                    .fit("crop")
                    .url()} ${w}w`,
              )
              .join(", ")}
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 45vw"
            alt={`Sampul ${game.title}`}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            width={600}
            height={800}
            className="h-full w-full object-cover object-top grayscale-[0.25] transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-jp text-sm text-ink-faint">
            画像なし
          </div>
        )}

        {/* gradient bawah */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-panel to-transparent" />

        {/* index kill-mark */}
        {typeof index === "number" && (
          <span className="absolute left-3 top-3 font-mono text-[10px] font-medium tracking-widest text-ink-faint">
            {String(index + 1).padStart(3, "0")}
          </span>
        )}

        {game.platform?.name && (
          <span className="chip-tag absolute right-3 top-3 bg-void/70 backdrop-blur-sm">
            {game.platform.name}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-head text-[15px] font-semibold leading-snug text-ink transition-colors group-hover:text-accent-bright">
          <span className="line-clamp-2">{game.title}</span>
        </h3>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-line-soft pt-3">
          <span className="truncate text-xs text-ink-dim">
            {genres.slice(0, 2).join(" · ") || "—"}
          </span>
          {game.region?.name && (
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
              {game.region.name}
            </span>
          )}
        </div>
      </div>

      {/* garis merah dasar */}
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}
