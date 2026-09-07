import { PortableText } from "@portabletext/react";
import { imgFor } from "../../services/sanity";
import { BannerAd, RectangleAd, NativeAd } from "../../components/ads";

export default function GameContent({ game, onOpenLightbox }) {
  return (
    <>
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
                  onClick={() => onOpenLightbox(idx)}
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
    </>
  );
}
