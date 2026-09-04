import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { PortableText } from "@portabletext/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Cpu,
  Download,
  TriangleAlert,
  ImageOff,
} from "lucide-react";
import { useGameDetail } from "../../hooks/useGames";
import { urlFor, imgFor } from "../../services/sanity";
import ScreenshotLightbox from "../../components/game/ScreenshotLightbox";
import ReportModal from "../../components/common/ReportModal";
import {
  LeaderboardAd,
  RectangleAd,
  BannerAd,
  NativeAd,
} from "../../components/ads";

const SHELL = "mx-auto max-w-[1200px] px-5 md:px-8";

function toPlainText(blocks) {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((b) => b._type === "block" && Array.isArray(b.children))
    .map((b) => b.children.map((c) => c.text).join(""))
    .join(" ")
    .trim();
}

export default function GameDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { game, isLoading, isError } = useGameDetail(slug);

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

  const siteUrl =
    import.meta.env.VITE_SITE_URL || "https://lastbosgames.vercel.app";
  const canonicalUrl = `${siteUrl}/game/${game?.slug?.current}`;

  const descriptionText = toPlainText(game?.fullDescription);
  const description =
    descriptionText.length >= 80
      ? descriptionText.slice(0, 300)
      : `Unduh ${game?.title}${
          game?.platform?.name ? ` untuk ${game.platform.name}` : ""
        } di Last Boss Games — metadata lengkap, screenshot, dan tautan unduhan langsung yang sudah diverifikasi.`;

  const imageUrl = game?.thumbnail
    ? urlFor(game.thumbnail)
        .width(1200)
        .height(630)
        .format("jpg")
        .quality(80)
        .url()
    : `${siteUrl}/icon.webp`;

  if (isLoading) {
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

  if (isError || !game) {
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
        <button onClick={() => navigate("/games")} className="btn-primary mt-7">
          Kembali ke arsenal
        </button>
      </div>
    );
  }

  return (
    <article className="border-b border-line-soft">
      <Helmet>
        <title>{`${game.title} — Last Boss Games`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Last Boss Games" />
        <meta property="og:title" content={`${game.title} — Last Boss Games`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${game.title} — Last Boss Games`}
        />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGame",
            name: game.title,
            description,
            image: imageUrl,
            url: canonicalUrl,
            operatingSystem: game.platform?.name || undefined,
            datePublished: game.releaseYear
              ? `${game.releaseYear}-01-01`
              : undefined,
            author: game.developer
              ? { "@type": "Organization", name: game.developer }
              : undefined,
          })}
        </script>
      </Helmet>

      {/* backdrop kabur dari cover */}
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

          <button onClick={() => navigate(-1)} className="btn-ghost -ml-4 mt-3">
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
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line-soft bg-carbon px-3.5 py-2.5 font-head text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-dim transition-colors hover:border-accent/40 hover:text-ink"
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

      <div className={`${SHELL} py-14`}>
        <BannerAd className="mb-12" />
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* deskripsi */}
          <div>
            <h2 className="font-head text-xl font-semibold uppercase tracking-[0.1em] text-ink">
              Deskripsi
            </h2>
            <div className="rich-text mt-5">
              {game.fullDescription ? (
                <PortableText value={game.fullDescription} />
              ) : (
                <p>Informasi detail belum tersedia untuk judul ini.</p>
              )}
            </div>
          </div>

          {/* screenshot */}
          <div>
            <h2 className="font-head text-xl font-semibold uppercase tracking-[0.1em] text-ink">
              Galeri
            </h2>
            {game.screenshots?.length > 0 ? (
              <div className="mt-5 grid grid-cols-2 gap-3">
                {game.screenshots.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => openLightbox(idx)}
                    className="group overflow-hidden rounded-lg border border-line-soft transition-colors hover:border-accent/50"
                  >
                    <img
                      src={imgFor(img, 72).width(400).height(260).url()}
                      alt={`Tangkapan layar ${idx + 1} dari ${game.title}`}
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={260}
                      className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm italic text-ink-faint">
                Tidak ada screenshot tersedia.
              </p>
            )}

            {/* iklan mengisi white space di kolom galeri */}
            <RectangleAd className="mt-6 lg:justify-start" />
          </div>
        </div>

        {/* Native banner tepat di bawah deskripsi — format membaur dengan konten */}
        <NativeAd className="mt-10" />

        {/* DOWNLOAD */}
        <section className="panel mt-14 p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-line-soft pb-5">
            <h2 className="flex items-center gap-2.5 font-head text-lg font-semibold uppercase tracking-[0.1em] text-ink">
              <Download size={18} className="text-accent" /> Download Game
            </h2>
            <span className="font-jp text-xs text-ink-faint">武器</span>
          </div>

          {game.downloadLinks?.length > 0 ? (
            <ul className="mt-5 flex flex-col gap-3">
              {game.downloadLinks.map((link, idx) => (
                <li
                  key={idx}
                  className="flex flex-col items-start justify-between gap-3 rounded-xl border border-line-soft bg-carbon p-4 transition-colors hover:border-accent/40 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-ink-faint">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-head text-sm font-semibold text-ink">
                      {link.sourceName}
                      {link.optionalLabel && (
                        <span className="font-normal text-ink-dim">
                          {" "}
                          — {link.optionalLabel}
                        </span>
                      )}
                    </h3>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full shrink-0 sm:w-auto"
                  >
                    <Download size={14} />
                    Unduh
                    <span className="font-normal opacity-70">
                      {link.fileSize || "?"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-ink-dim">
              Tautan unduhan belum tersedia untuk judul ini.
            </p>
          )}

          <div className="mt-6 flex justify-end border-t border-line-soft pt-5">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-1.5 font-head text-xs font-medium uppercase tracking-widest text-ink-faint transition-colors hover:text-accent"
            >
              <TriangleAlert size={14} /> Laporkan info salah
            </button>
          </div>
        </section>

        {/* Leaderboard tepat di atas footer — 728x90 desktop, 300x250 mobile */}
        <LeaderboardAd className="mt-12" />
      </div>

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
    </article>
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
