import { useEffect } from "react";
import { Download, Cpu } from "lucide-react";
import { useEmulators } from "../../hooks/useGames";
import { urlFor } from "../../services/sanity";
import SkeletonCard from "../../components/common/SkeletonCard";

export default function Emulator() {
  const { emulators, isLoading, isError } = useEmulators();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-10 pb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
            : emulators?.map((emu) => (
                /* Emulator Card - Neo Brutalist */
                <article
                  key={emu._id}
                  className="bg-white border-2 border-ink p-5 md:p-6 flex flex-col h-full shadow-[4px_4px_0px_#0F0F0F] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#8A1010] transition-all duration-200"
                >
                  {/* Header Card: Logo bersebelahan dengan Judul */}
                  <div className="flex items-center gap-4 mb-4">
                    {/* Kontainer Logo yang konsisten */}
                    <div className="shrink-0 w-16 h-16 bg-surface border border-border-subtle flex items-center justify-center p-2 rounded-sm">
                      {emu.logo ? (
                        <img
                          src={urlFor(emu.logo).width(150).url()}
                          alt={`Logo ${emu.name}`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span className="font-display text-[10px] text-secondary">
                          NO LOGO
                        </span>
                      )}
                    </div>

                    {/* Judul & Tag Platform */}
                    <div>
                      <h3 className="font-display text-xl font-bold text-ink uppercase leading-none mb-2">
                        {emu.name}
                      </h3>
                      <span className="inline-block bg-ink text-white font-display text-[10px] px-2 py-0.5 uppercase tracking-widest">
                        {emu.supportedPlatform?.name || "UMUM"}
                      </span>
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <p className="font-body text-ink/75 text-sm leading-relaxed mb-6 flex-grow">
                    {emu.description}
                  </p>

                  {/* Tombol Unduh yang lebih ramping */}
                  <div className="mt-auto pt-4 border-t border-border-subtle">
                    <a
                      href={emu.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-surface hover:bg-primary hover:text-white text-ink border-2 border-ink font-display font-bold text-sm px-4 py-2.5 uppercase tracking-widest transition-colors"
                    >
                      <Download size={16} /> DOWNLOAD DISINI
                    </a>
                  </div>
                </article>
              ))}
        </div>
      </section>
    </div>
  );
}
