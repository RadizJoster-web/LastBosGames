import { Heart, ShieldCheck, ArrowUpRight } from "lucide-react";

const SHELL = "mx-auto max-w-[1200px] px-5 md:px-8";

export default function DonationHero() {
  return (
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
  );
}
