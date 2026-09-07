import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Cpu, ImageOff } from "lucide-react";
import { imgFor } from "../../services/sanity";
import { SHELL } from "./utils";

export default function GameHero({ game, onBack }) {
  return (
    <div className="relative overflow-hidden border-b border-line-soft bg-carbon">
      {game.thumbnail && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 blur-2xl"
          style={{
            backgroundImage: `url(${imgFor(game.thumbnail, 30).width(400).url()})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-carbon/60 to-carbon" />

      <div className={`${SHELL} relative z-10 py-8 md:py-12`}>
        <nav className="flex items-center gap-2 font-head text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          <Link to="/games" className="transition-colors hover:text-ink">
            Arsenal
          </Link>
          <span>/</span>
          <span className="text-ink-dim">
            {game.platform?.name || "Game"}
          </span>
        </nav>

        <button onClick={onBack} className="btn-ghost -ml-4 mt-3">
          <ArrowLeft size={15} /> Kembali
        </button>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start">
          <div className="relative mx-auto w-full max-w-[240px] shrink-0 overflow-hidden rounded-xl border border-line bg-void sm:max-w-[280px] lg:mx-0 lg:w-[300px] lg:max-w-none">
            {game.thumbnail ? (
              <img
                src={imgFor(game.thumbnail, 80).width(600).url()}
                alt={`Sampul ${game.title}`}
                fetchPriority="high"
                decoding="sync"
                width={600}
                height={800}
                className="aspect-[3/4] w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-2 text-ink-faint">
                <ImageOff size={26} />
                <span className="font-jp text-sm">画像なし</span>
              </div>
            )}
            <span className="absolute inset-x-0 bottom-0 h-px bg-accent" />
          </div>

          <div className="flex-1">
            {game.platform?.name && (
              <span className="chip-tag">{game.platform.name}</span>
            )}
            <h1 className="display mt-4 text-[13vw] leading-[0.95] text-ink sm:text-5xl md:text-6xl">
              {game.title}
            </h1>

            {game.genre?.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {game.genre.map((g) => (
                  <span key={g.name} className="chip">
                    {g.name}
                  </span>
                ))}
              </div>
            )}

            <dl className="mt-7 grid grid-cols-2 gap-x-8 border-t border-line-soft sm:grid-cols-3">
              <MetaItem label="Region" value={game.region?.name} />
              <MetaItem label="Tahun" value={game.releaseYear} />
              <MetaItem label="Ukuran" value={game.fileSize} />
              <MetaItem label="Bahasa" value={game.language} />
              <MetaItem label="Developer" value={game.developer} />
              <MetaItem label="Publisher" value={game.publisher} />
            </dl>

            {game.platform?.slug && (
              <Link
                to={`/emulator?for=${game.platform.slug}`}
                className={`mt-6 inline-flex items-center gap-2 rounded-lg border border-line-soft bg-carbon px-3.5
                  py-2.5 font-head text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-dim
                  transition-colors hover:border-accent/40 hover:text-ink`}
              >
                <Cpu size={13} className="text-accent" />
                Butuh emulator {game.platform.name}
                <ArrowUpRight size={13} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex flex-col gap-1 border-b border-line-soft py-3">
      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
        {label}
      </dt>
      <dd className="font-head text-sm font-medium text-ink">{value}</dd>
    </div>
  );
}
