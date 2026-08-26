import { useEffect } from "react";
import { Download, Cpu } from "lucide-react";
import { useEmulators } from "../../hooks/useGames";
import { urlFor } from "../../services/sanity";
import SkeletonCard from "../../components/common/SkeletonCard";
import AdBanner from "../../components/common/AdBanner";
import { Helmet } from "react-helmet-async";

export default function Emulator() {
  const { emulators, isLoading, isError } = useEmulators();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-10 pb-16">
      <Helmet>
        <title>LBG | Emulators</title>
        <meta
          name="description"
          content="Katalog game pilihan dengan tautan unduhan langsung. Temukan file, jalankan emulator, dan hancurkan skor tertinggi."
        />
        <link rel="canonical" href="https://last-bos-games.vercel.app/" />
        <meta property="og:title" content="Last Bos Games | Emulators" />
        <meta
          property="og:description"
          content="Katalog game pilihan dengan tautan unduhan langsung."
        />
        <meta
          property="og:image"
          content="https://last-bos-games.vercel.app/icon.webp"
        />
      </Helmet>

      {/* HEADER SECTION - Clean & Modern */}
      <section className="pt-8 border-b border-border-subtle pb-8">
        <h1 className="text-4xl md:text-5xl font-display font-black text-ink uppercase mb-4 tracking-wide flex items-center gap-4">
          <Cpu size={40} className="text-primary" /> ARSENAL EMULATOR
        </h1>
        <p className="text-ink/75 font-body text-lg max-w-3xl leading-relaxed">
          Perangkat lunak esensial untuk menjalankan target operasi Anda. Kami
          hanya mengarahkan ke situs unduhan resmi pengembang untuk memastikan
          keamanan sistem Anda dari perangkat lunak berbahaya.
        </p>
      </section>

      {/* EMULATOR GRID */}
      <section>
        {isError && (
          <div className="bg-red-50 text-primary p-6 border-l-4 border-primary font-body rounded-r-md">
            <span className="font-bold">CRITICAL ERROR:</span> Gagal memuat data
            emulator dari server.
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : emulators?.map((emulator) => (
                /* Emulator Card - Neo Brutalist */
                <article className="group bg-surface border-4 border-ink flex flex-col items-center justify-center text-center p-8 aspect-square shadow-[4px_4px_0px_#0F0F0F] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#8A1010] transition-all duration-300">
                  {/* LOGO (Grayscale Default -> Full Color on Hover) */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mb-4 flex-shrink-0">
                    {emulator.logo ? (
                      <img
                        src={urlFor(emulator.logo).width(160).url()}
                        alt={`Logo ${emulator.title}`}
                        loading="lazy"
                        className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    ) : (
                      <div className="w-full h-full border-2 border-ink flex items-center justify-center font-display font-black text-2xl text-ink">
                        ?
                      </div>
                    )}
                  </div>

                  {/* TEKS (Tanpa Background) */}
                  <h3 className="font-display text-lg sm:text-xl font-black text-ink uppercase line-clamp-1 w-full">
                    {emulator.name}
                  </h3>
                  <p className="font-body text-xs font-bold text-ink/60 uppercase tracking-widest mt-1 mb-auto">
                    untuk {emulator.supportedPlatform.name}
                  </p>

                  {/* TOMBOL UNDUH (Kecil, Ikon Samping, Neo-Brutalist) */}
                  <a
                    href={emulator.downloadUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-primary text-white font-display font-bold text-sm px-4 py-2 border-2 border-ink shadow-[3px_3px_0px_#0F0F0F] hover:bg-white hover:text-ink active:translate-y-0.5 active:translate-x-0.5 active:shadow-[1px_1px_0px_#0F0F0F] transition-all uppercase"
                  >
                    DOWNLOAD
                    <Download size={16} strokeWidth={2.5} />
                  </a>
                </article>
              ))}
        </div>
      </section>

      <AdBanner
        dataKey={import.meta.env.VITE_AD_BANNER_728}
        width={728}
        height={90}
      />
    </div>
  );
}
