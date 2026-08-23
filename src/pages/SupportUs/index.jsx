import { useEffect } from "react";
import { Heart, Shield } from "lucide-react";
import { useSupporters } from "../../hooks/useGames";
import { Helmet } from "react-helmet-async";

export default function SupportUs() {
  const { supporters, isLoading, isError } = useSupporters();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col gap-16 pb-16">
      <Helmet>
        <title>Last Boss Games | Support Us</title>
        <meta
          name="description"
          content="Katalog game pilihan dengan tautan unduhan langsung. Temukan file, jalankan emulator, dan hancurkan skor tertinggi."
        />
        <link rel="canonical" href="https://last-bos-games.vercel.app/" />
        <meta property="og:title" content="Last Boss Games | Support Us" />
        <meta
          property="og:description"
          content="Katalog game pilihan dengan tautan unduhan langsung."
        />
        <meta
          property="og:image"
          content="https://last-bos-games.vercel.app/icon.jpg"
        />
      </Helmet>

      {/* HEADER & DONATION CTA */}
      <section className="pt-8 flex flex-col md:flex-row gap-12 items-center">
        {/* Teks Informasi - Clean Modern */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-display font-black text-ink uppercase mb-6 tracking-tight">
            DUKUNG <span className="text-primary">KAMI</span>
          </h1>
          <p className="text-ink/80 font-body text-lg leading-relaxed mb-6">
            Menjaga agar server tetap menyala, tautan tetap aktif, dan sistem
            terbebas dari iklan intrusif membutuhkan sumber daya. Jika website
            ini membantumu menemukan game mu, pertimbangkan untuk mengirimkan
            suplai.
          </p>
          <div className="flex items-center gap-3 text-ink/60 font-body font-bold text-sm bg-border-subtle/30 p-4 rounded-md border border-border-subtle">
            <Shield size={20} className="text-primary" />
            100% dana digunakan untuk operasional server & penyimpanan.
          </div>
        </div>

        {/* Kotak Donasi - Neo Brutalist */}
        <div className="w-full md:w-1/2">
          <div className="bg-surface border-4 border-ink shadow-[8px_8px_0px_#8A1010] p-8 md:p-10 transform md:rotate-2">
            <h2 className="font-display font-black text-2xl uppercase text-ink border-b-4 border-ink pb-4 mb-6 flex items-center gap-3">
              <Heart size={28} className="text-primary fill-primary" /> KIRIM
              SUPLAI
            </h2>
            <p className="font-body text-ink font-medium mb-8">
              Dukunganmu memastikan Last Boss Game tetap menjadi direktori murni
              tanpa gangguan. Pilih jalur pengiriman suplai di bawah ini.
            </p>

            {/* TODO: Ganti '#' dengan link donasi asli Anda (Saweria, Ko-fi, dll) */}
            <a
              href="https://saweria.co/lastbosgames"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brutal w-full text-xl py-4 flex items-center justify-center gap-2"
            >
              DONASI VIA SAWERIA
            </a>
          </div>
        </div>
      </section>

      {/* SUPPORTERS HALL OF FAME */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-black text-ink uppercase tracking-wide">
            VANGUARD (HALL OF FAME)
          </h2>
          <p className="text-ink/60 font-body mt-2">
            Agen yang telah mengirimkan suplai untuk keberlangsungan sistem.
          </p>
        </div>

        {isError && (
          <div className="text-center text-primary font-display font-bold">
            Gagal memuat data pendukung.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center font-display animate-pulse">
              Memindai data...
            </div>
          ) : supporters?.length > 0 ? (
            supporters.map((supporter) => (
              <div
                key={supporter._id}
                className="bg-white border-2 border-ink p-5 shadow-[4px_4px_0px_#0F0F0F] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#2C3E50] transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display font-bold text-xl uppercase text-primary line-clamp-1">
                    {supporter.username}
                  </h3>
                  <span className="text-[10px] font-bold font-body text-ink/50 uppercase tracking-widest shrink-0">
                    {new Date(supporter.donationDate).toLocaleDateString(
                      "id-ID",
                    )}
                  </span>
                </div>
                {supporter.optionalMessage && (
                  <p className="font-body text-sm text-ink italic border-l-2 border-border-subtle pl-3">
                    "{supporter.optionalMessage}"
                  </p>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full text-center border-2 border-dashed border-border-subtle p-10 bg-white">
              <p className="font-body text-ink/60 mb-2">
                Belum ada data pendukung yang terdaftar.
              </p>
              <p className="font-display text-primary font-bold uppercase tracking-widest">
                JADILAH YANG PERTAMA.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
