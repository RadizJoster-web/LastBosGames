import { Link } from "react-router-dom";
import { urlFor } from "../../services/sanity";

export default function GameCard({ game }) {
  if (!game) return null;

  // Kembali menggunakan fit("crop") karena sekarang seluruh kartu adalah posternya
  const image = urlFor(game.thumbnail).auto("format").fit("crop");

  return (
    <Link
      to={`/game/${game.slug?.current}`}
      className="group block relative overflow-hidden aspect-[3/4] border-4 border-ink shadow-[6px_6px_0px_#0F0F0F] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_#8A1010] transition-all duration-300 bg-ink"
    >
      {/* 1. LAYER BAWAH: Poster Penuh */}
      {game.thumbnail ? (
        <img
          src={image.width(600).height(800).url()}
          srcSet={[320, 480, 600]
            .map(
              (w) =>
                `${image
                  .width(w)
                  .height(Math.round((w * 4) / 3))
                  .url()} ${w}w`,
            )
            .join(", ")}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          alt={`${game.title} cover`}
          loading="lazy"
          decoding="async"
          // Poster membesar sedikit saat di-hover
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      ) : (
        <div className="w-full h-full bg-border-subtle flex items-center justify-center font-display text-white text-2xl font-bold uppercase">
          NO DATA
        </div>
      )}

      {/* 2. LAYER ATAS (HOVER OVERLAY): Muncul dari bawah */}
      <div className="absolute inset-0 bg-surface translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col z-10 border-t-8 border-transparent group-hover:border-primary">
        {/* Bagian Judul (Tengah) */}
        <div className="p-4 flex-grow flex flex-col justify-center items-center text-center">
          <h3 className="font-display text-2xl sm:text-3xl font-black text-ink uppercase leading-none mb-4 line-clamp-3 drop-shadow-sm">
            {game.title}
          </h3>

          {/* Label Platform ala Neo-Brutalist */}
          {game.platform?.[0] && (
            <span className="bg-primary text-white text-sm font-display font-bold px-4 py-1 border-2 border-ink shadow-[3px_3px_0px_#0F0F0F] uppercase tracking-wider translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              {game.platform[0].name}
            </span>
          )}
        </div>

        {/* Bagian Footer Meta Data (Bawah) */}
        <div className="bg-white border-t-4 border-ink p-4 flex flex-col gap-3 font-display text-xs font-bold uppercase tracking-widest text-ink">
          <div className="flex justify-between items-center w-full border-b-2 border-ink border-dashed pb-2">
            <span className="text-left truncate bg-ink text-white px-2 py-0.5 max-w-[60%]">
              {game.genre?.map((g) => g.name).join(", ") || "UNKNOWN"}
            </span>

            <span className="text-right text-primary text-sm font-black">
              {game.region?.name || "GLOBAL"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
