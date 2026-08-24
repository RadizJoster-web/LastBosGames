import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Download, AlertTriangle } from "lucide-react";
import { useGameDetail } from "../../hooks/useGames";
import { urlFor } from "../../services/sanity";
import ScreenshotLightbox from "../../components/game/ScreenshotLightbox";
import ReportModal from "../../components/common/ReportModal";
import AdBanner from "../../components/common/AdBanner";
import NativeBanner from "../../components/common/NativeBanner";

export default function GameDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { game, isLoading, isError } = useGameDetail(slug);

  // State untuk Lightbox
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

  // Menyiapkan variabel SEO
  const siteUrl =
    import.meta.env.VITE_SITE_URL || "https://last-bos-games.vercel.app";
  const canonicalUrl = `${siteUrl}/game/${game?.slug?.current}`;
  const description =
    game?.shortDescription ||
    `Download informasi dan file untuk ${game?.title}.`;

  // Mengambil URL gambar dengan resolusi standar Open Graph (1200x630)
  const imageUrl = game?.thumbnail
    ? urlFor(game.thumbnail).width(1200).height(630).format("jpg").url()
    : `${siteUrl}/icon.webp`;

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
      {game && (
        <Helmet>
          <title>{`${game.title} | LBG`}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonicalUrl} />

          {/* Open Graph / Facebook / WhatsApp */}
          <meta property="og:type" content="article" />
          <meta property="og:site_name" content="Last Boss Game" />
          <meta
            property="og:title"
            content={`${game.title} | Last Bos Games`}
          />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content={imageUrl} />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content={`${game.title} | Last Bos Games`}
          />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={imageUrl} />

          {/* Structured Data (JSON-LD) khusus Video Game */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoGame",
              name: game.title,
              description: description,
              image: imageUrl,
              url: canonicalUrl,
              operatingSystem: game.platform?.map((item) => item.name),
              datePublished: game.releaseYear
                ? `${game.releaseYear}-01-01`
                : undefined,
              author: game.developer
                ? { "@type": "Organization", name: game.developer }
                : undefined,
            })}
          </script>
        </Helmet>
      )}

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

          <div className="flex flex-col gap-0 bg-white border border-border-subtle p-5 rounded-xl shadow-sm">
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

          <AdBanner
            dataKey="6df18de5456453f3bbfa52c33bf2bad6"
            width={728}
            height={90}
          />
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
      <div className="bg-surface border border-border-subtle rounded-xl shadow-sm p-6 md:p-8 mt-4">
        <h2 className="text-2xl font-display font-black text-ink uppercase mb-6 border-b border-border-subtle pb-4 flex items-center gap-3">
          <Download size={24} className="text-primary" /> DOWNLOAD
        </h2>

        {game.downloadLinks?.length > 0 ? (
          <div className="flex flex-col gap-3">
            {game.downloadLinks.map((link, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white border border-border-subtle rounded-lg p-4 gap-4 hover:border-primary transition-colors"
              >
                <div>
                  <h3 className="font-display font-bold text-lg uppercase text-ink leading-tight">
                    {link.sourceName}{" "}
                    {link.optionalLabel && (
                      <span className="text-ink/60">
                        - {link.optionalLabel}
                      </span>
                    )}
                  </h3>
                </div>

                {link.status === "active" ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white font-display text-sm font-bold px-6 py-3 rounded uppercase tracking-widest hover:bg-primary-hover transition-colors w-full sm:w-auto text-center shrink-0"
                  >
                    DOWNLOAD{" "}
                    <span className="opacity-75 font-normal ml-1">
                      ({link.fileSize || "Unknown"})
                    </span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="bg-border-subtle text-ink/50 font-display text-sm font-bold px-6 py-3 rounded uppercase w-full sm:w-auto cursor-not-allowed shrink-0"
                  >
                    TIDAK TERSEDIA
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-ink/60">
            Tautan unduhan belum tersedia untuk game ini.
          </p>
        )}

        {/* Tombol Report Data yang lebih clean */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex justify-end">
          <button
            onClick={() => setIsReportModalOpen(true)} // Tambahkan onClick ini
            className="flex items-center gap-2 text-ink/50 hover:text-primary font-body font-bold text-sm transition-colors"
          >
            <AlertTriangle size={16} /> Laporkan Informasi Salah
          </button>
        </div>

        <AdBanner
          dataKey="cae8e1487980ee0ded892fe6f32df4b0"
          width={468}
          height={60}
        />
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

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        gameTitle={game.title}
      />

      {/* NATIVE BANNER (Akan menampilkan grid artikel sponsor) */}
      <NativeBanner />
    </div>
  );
}

// Komponen helper kecil untuk metadata
function MetaItem({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-3 border-b border-border-subtle last:border-0 last:pb-0">
      <span className="text-xs font-display font-bold text-secondary uppercase tracking-widest">
        {label}
      </span>
      <span className="font-body text-ink font-medium text-right text-sm">
        {value}
      </span>
    </div>
  );
}
