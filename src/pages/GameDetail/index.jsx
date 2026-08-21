import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Download, AlertTriangle } from "lucide-react";
import { useGameDetail } from "../../hooks/useGames";
import { urlFor } from "../../services/sanity";
import ScreenshotLightbox from "../../components/game/ScreenshotLightbox";

export default function GameDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { game, isLoading, isError } = useGameDetail(slug);

  // State untuk Lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = (direction) => {
    if (!game?.screenshots) return;
    if (direction === "next") {
      setLightboxIndex((prev) => (prev + 1) % game.screenshots.length);
    } else {
      setLightboxIndex(
        (prev) =>
          (prev - 1 + game.screenshots.length) % game.screenshots.length,
      );
    }
  };

  if (isLoading)
    return (
      <div className="py-20 text-center font-display text-2xl animate-pulse">
        MEMUAT DATA SISTEM...
      </div>
    );
  if (isError || !game)
    return (
      <div className="py-20 text-center font-display text-2xl text-primary">
        ERROR: TARGET TIDAK DITEMUKAN.
      </div>
    );

  return (
    <div className="flex flex-col gap-12 pb-16">
      <Helmet>
        <title>{game.title} - Last Boss Game</title>
        <meta name="description" content={game.shortDescription} />
      </Helmet>

      {/* Navigasi Kembali */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 font-display font-bold text-ink hover:text-primary transition-colors uppercase tracking-widest text-sm"
        >
          <ArrowLeft size={18} /> Kembali ke Library
        </button>
      </div>

      {/* Header Info - Clean & Modern Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Cover Image - Brutalist Element */}
        <div className="w-full lg:w-1/3 shrink-0 border-4 border-ink shadow-[8px_8px_0px_#0F0F0F] bg-surface relative">
          {game.thumbnail ? (
            <img
              src={urlFor(game.thumbnail).width(600).url()}
              alt={game.title}
              className="w-full aspect-[3/4] object-cover"
            />
          ) : (
            <div className="w-full aspect-[3/4] flex items-center justify-center font-display text-xl">
              NO COVER
            </div>
          )}
          {game.platform?.[0] && (
            <div className="absolute top-0 right-0 bg-primary text-white font-display px-4 py-2 border-b-4 border-l-4 border-ink text-xl">
              {game.platform[0].name}
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-black text-ink uppercase leading-none mb-4">
              {game.title}
            </h1>
            <p className="text-xl font-body text-ink/80 leading-relaxed border-l-4 border-primary pl-4">
              {game.shortDescription}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white border border-border-subtle p-6 rounded-lg">
            <MetaItem
              label="Genre"
              value={game.genre?.map((g) => g.name).join(", ")}
            />
            <MetaItem label="Region" value={game.region?.name} />
            <MetaItem label="Tahun Rilis" value={game.releaseYear} />
            <MetaItem label="Ukuran File" value={game.fileSize} />
            <MetaItem label="Bahasa" value={game.language?.join(", ")} />
            <MetaItem label="Developer" value={game.developer} />
          </div>
        </div>
      </div>

      <hr className="border-border-subtle" />

      {/* Deskripsi & Screenshot */}
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-display font-black text-ink uppercase mb-6">
            INFORMASI TARGET
          </h2>
          <div className="font-body text-ink/85 prose prose-lg prose-headings:font-display prose-headings:uppercase max-w-none">
            {game.fullDescription ? (
              <PortableText value={game.fullDescription} />
            ) : (
              <p>Informasi detail tidak tersedia.</p>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/3">
          <h2 className="text-3xl font-display font-black text-ink uppercase mb-6">
            INTEL (GALLERY)
          </h2>
          {game.screenshots?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {game.screenshots.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="cursor-pointer border-2 border-ink shadow-[3px_3px_0px_#0F0F0F] hover:-translate-y-1 hover:shadow-[5px_5px_0px_#8A1010] transition-all overflow-hidden"
                >
                  <img
                    src={urlFor(img).width(300).height(200).url()}
                    alt={`Screen ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="font-body text-ink/60 italic">
              Tidak ada screenshot tersedia.
            </p>
          )}
        </div>
      </div>

      {/* AREA UNDUHAN - Brutalist Call to Action */}
      <div className="bg-surface border-4 border-ink shadow-[8px_8px_0px_#0F0F0F] p-8 md:p-12 mt-8">
        <h2 className="text-4xl font-display font-black text-ink uppercase mb-8 border-b-4 border-ink pb-4 flex items-center gap-3">
          <Download size={36} className="text-primary" /> JALUR UNDUHAN
        </h2>

        {game.downloadLinks?.length > 0 ? (
          <div className="flex flex-col gap-4">
            {game.downloadLinks.map((link, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-center justify-between bg-white border-2 border-ink p-4 gap-4"
              >
                <div className="text-center md:text-left">
                  <h3 className="font-display font-bold text-xl uppercase">
                    {link.sourceName}{" "}
                    {link.optionalLabel && `- ${link.optionalLabel}`}
                  </h3>
                  <span
                    className={`text-sm font-bold uppercase tracking-widest ${link.status === "active" ? "text-green-600" : "text-red-600"}`}
                  >
                    Status: {link.status}
                  </span>
                </div>

                {link.status === "active" ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal w-full md:w-auto flex items-center justify-center gap-2"
                  >
                    MUNDUR & UNDUH{" "}
                    <span className="text-sm">
                      ({link.fileSize || "Unknown"})
                    </span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="bg-border-subtle text-ink/50 font-display text-lg px-6 py-3 border-2 border-ink uppercase cursor-not-allowed"
                  >
                    TIDAK TERSEDIA
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="font-display text-xl text-ink/60">
            Tautan unduhan belum tersedia untuk target ini.
          </p>
        )}

        {/* Tombol Report Data */}
        <div className="mt-12 flex justify-end">
          <button className="flex items-center gap-2 text-ink/60 hover:text-primary font-display font-bold uppercase tracking-widest transition-colors text-sm underline decoration-2 underline-offset-4">
            <AlertTriangle size={16} /> Lapor Data Rusak / Salah
          </button>
        </div>
      </div>

      {/* Render Lightbox jika aktif */}
      {lightboxIndex !== null && (
        <ScreenshotLightbox
          images={game.screenshots}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}
    </div>
  );
}

// Komponen helper kecil untuk metadata
function MetaItem({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col">
      <span className="text-xs font-display font-bold text-secondary uppercase tracking-widest mb-1">
        {label}
      </span>
      <span className="font-body text-ink font-medium">{value}</span>
    </div>
  );
}
