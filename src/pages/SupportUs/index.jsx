import { useEffect } from "react";
import { Heart, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useSupporters } from "../../hooks/useGames";

const SHELL = "mx-auto max-w-[1200px] px-5 md:px-8";

export default function SupportUs() {
  const { supporters, isLoading, isError } = useSupporters();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="border-b border-line-soft">
      <Helmet>
        <title>Dukung Arsip — Last Bos Games</title>
        <meta
          name="description"
          content="Bantu Last Bos Games tetap menyala — menjaga server aktif, tautan tetap hidup, dan arsip bebas dari iklan intrusif. Setiap dukungan digunakan penuh untuk operasional server dan penyimpanan."
        />
        <link rel="canonical" href="https://lastbosgames.vercel.app/support" />
        <meta property="og:title" content="Dukung Arsip · Last Bos Games" />
        <meta
          property="og:description"
          content="Bantu kami menjaga server tetap menyala dan arsip tetap bersih."
        />
        <meta
          property="og:image"
          content="https://lastbosgaames.vercel.app/icon.webp"
        />
      </Helmet>

      <section className="border-b border-line-soft bg-carbon">
        <div className={`${SHELL} py-16 md:py-20`}>
          <p className="kicker">
            <span className="font-jp not-italic">支援</span>
            <span>Dukung arsip</span>
          </p>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <h1 className="display text-[15vw] text-ink sm:text-6xl md:text-7xl">
                Kirim
                <br />
                <span className="text-accent">suplai</span>
              </h1>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-dim">
                Menjaga server menyala, tautan tetap aktif, dan arsip bebas dari
                iklan intrusif membutuhkan sumber daya. Jika arsip ini membantu
                kamu menemukan bos-mu, pertimbangkan untuk mengirim suplai.
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-line-soft bg-panel p-4 text-sm text-ink-dim">
                <ShieldCheck size={18} className="shrink-0 text-accent" />
                100% dana untuk operasional server &amp; penyimpanan.
              </div>
            </div>

            <div className="panel-glass flex flex-col p-8">
              <h2 className="flex items-center gap-2.5 font-head text-lg font-semibold text-ink">
                <Heart size={20} className="fill-accent text-accent" /> Jalur
                dukungan
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-dim">
                Dukunganmu memastikan Last Bos Games tetap menjadi arsip murni
                tanpa gangguan.
              </p>
              <a
                href="https://saweria.co/lastbosgames"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-auto w-full"
              >
                Donasi via Saweria
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className={`${SHELL} py-16 md:py-20`}>
        <div className="text-center">
          <p className="kicker justify-center">
            <span>Hall of Fame</span>
            <span className="font-jp not-italic">殿堂</span>
          </p>
          <h2 className="mt-5 font-head text-3xl font-medium tracking-tight md:text-4xl">
            Para penakluk
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-dim">
            Terima kasih kepada semua yang telah mengirim suplai. Nama kalian
            terukir di sini.
          </p>
        </div>

        {isError && (
          <p className="mt-10 rounded-xl border border-accent/30 bg-accent/[0.05] p-5 text-center text-sm text-ink-dim">
            Gagal memuat data pendukung.
          </p>
        )}

        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-28" />
            ))}
          </div>
        ) : supporters?.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supporters.map((supporter) => (
              <li
                key={supporter._id}
                className="panel p-5 transition-colors hover:border-accent/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="line-clamp-1 font-head text-base font-semibold text-accent-bright">
                    {supporter.username}
                  </h3>
                  {supporter.donationDate && (
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                      {new Date(supporter.donationDate).toLocaleDateString(
                        "id-ID",
                      )}
                    </span>
                  )}
                </div>
                {supporter.optionalMessage && (
                  <p className="mt-3 border-l-2 border-line pl-3 text-sm italic text-ink-dim">
                    “{supporter.optionalMessage}”
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-line p-12 text-center">
            <span className="font-jp text-2xl text-ink-faint">最初の一人</span>
            <p className="mt-3 text-sm text-ink-dim">
              Belum ada pendukung terdaftar. Jadilah yang pertama.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
