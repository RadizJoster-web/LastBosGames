import { Link } from "react-router-dom";
import { urlFor } from "../../services/sanity";

export default function GameCard({ game }) {
  if (!game) return null;

  return (
    <article className="group bg-surface border-4 border-ink flex flex-col h-full shadow-[6px_6px_0px_#0F0F0F] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[10px_10px_0px_#8A1010] transition-all duration-200">
      <Link
        to={`/game/${game.slug?.current}`}
        className="block relative overflow-hidden aspect-[16/9] border-b-4 border-ink"
      >
        {game.thumbnail ? (
          <img
            src={urlFor(game.thumbnail).width(600).height(338).url()}
            alt={`Cover ${game.title}`}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full bg-border-subtle flex items-center justify-center font-display text-ink text-xl font-bold uppercase">
            NO DATA
          </div>
        )}

        {/* Label Platform bentuk blok */}
        {game.platform?.[0] && (
          <div className="absolute top-0 right-0 bg-primary text-white text-sm font-display font-bold px-3 py-1 border-b-4 border-l-4 border-ink uppercase">
            {game.platform[0].name}
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow bg-surface relative">
        <h3 className="font-display text-2xl font-black text-ink leading-none mb-3 uppercase group-hover:text-primary transition-colors line-clamp-1">
          <Link to={`/game/${game.slug?.current}`}>{game.title}</Link>
        </h3>

        <p className="text-sm font-body text-ink font-medium line-clamp-2 mb-6 flex-grow border-l-2 border-primary pl-3">
          {game.shortDescription}
        </p>

        <div className="mt-auto flex items-center justify-between text-xs font-display font-bold text-ink uppercase tracking-widest border-t-2 border-ink border-dashed pt-4">
          <span className="bg-ink text-white px-2 py-1">
           {game.genre?.map(g => g.name).join(', ') || 'UNKNOWN'}
          </span>
          <span>{game.region?.name || "GLOBAL"}</span>
        </div>
      </div>
    </article>
  );
}
