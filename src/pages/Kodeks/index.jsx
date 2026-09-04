import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, Plus } from "lucide-react";
import SakuraField from "../../components/common/SakuraField";
import { LeaderboardAd, RectangleAd, AdRow } from "../../components/ads";

const SHELL = "mx-auto max-w-[880px] px-5 md:px-8";

const PRINCIPLES = [
  {
    n: "壱",
    t: "Kurasi di atas kuantitas",
    d: "Arsip ini tidak berusaha memuat segalanya. Setiap judul dipilih karena benar-benar layak disimpan dan dimainkan ulang.",
  },
  {
    n: "弐",
    t: "Tautan yang jujur",
    d: "Unduhan selalu direct. Tidak ada survey, tidak ada shortener beracun, tidak ada halaman jebakan sebelum file.",
  },
  {
    n: "参",
    t: "Metadata lengkap",
    d: "Region, versi, tahun rilis, ukuran file, bahasa, developer — semua dicatat agar kamu tahu persis apa yang kamu unduh.",
  },
  {
    n: "肆",
    t: "Sumber resmi untuk emulator",
    d: "Kami tidak pernah menghosting ulang emulator. Setiap tautan mengarah langsung ke situs pengembangnya.",
  },
  {
    n: "伍",
    t: "Transparan soal iklan",
    d: "Iklan menjaga server tetap hidup, tapi tidak boleh merusak pengalaman. Slotnya jelas dan bisa dilewati.",
  },
];

const FAQ = [
  {
    q: "Apakah ini legal?",
    a: "Last Bos Games adalah direktori — kami mengumpulkan informasi dan tautan, bukan menghosting file game. Legalitas mengunduh ROM bergantung pada hukum di wilayahmu dan apakah kamu memiliki salinan asli game tersebut. Gunakan dengan bijak.",
  },
  {
    q: "Amankah file-nya?",
    a: "Kami memeriksa setiap tautan sebelum masuk arsip dan mengutamakan sumber yang dikenal komunitas. Tetap disarankan memindai file dengan antivirus dan hanya menjalankan emulator dari halaman Emulator kami.",
  },
  {
    q: "Bagaimana cara menjalankan game yang sudah diunduh?",
    a: "Buka halaman Emulator, unduh emulator yang sesuai dengan platform game (misalnya PS2 atau PSP), lalu buka file game dari dalam emulator tersebut. Setiap emulator punya panduan singkat di situs resminya.",
  },
  {
    q: "Kenapa game yang saya cari tidak ada?",
    a: "Arsip bertambah secara bertahap dan setiap judul melewati kurasi manual. Kalau judul favoritmu belum ada, ajukan lewat bagian di bawah — daftar permintaan kami tinjau berkala.",
  },
  {
    q: "Tautan unduhan mati, apa yang harus saya lakukan?",
    a: "Buka halaman game tersebut dan klik “Laporkan info salah”. Sertakan detail singkat. Kami mengganti atau menghapus tautan yang rusak secepatnya.",
  },
];

export default function Kodeks() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [hash]);

  return (
    <div className="border-b border-line-soft">
      <Helmet>
        <title>Kodeks — Prinsip &amp; Pertanyaan Umum · Last Bos Games</title>
        <meta
          name="description"
          content="Kodeks Last Bos Games: asal usul arsip cyber-samurai, lima prinsip yang kami pegang, dan jawaban atas pertanyaan umum soal legalitas, keamanan file, dan cara menjalankan game."
        />
        <link rel="canonical" href="https://lastbosgames.vercel.app/kodeks" />
        <meta property="og:title" content="Kodeks · Last Bos Games" />
        <meta
          property="og:description"
          content="Asal usul, prinsip, dan pertanyaan umum tentang arsip."
        />
        <meta
          property="og:image"
          content="https://lastbosgaames.vercel.app/icon.webp"
        />
      </Helmet>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line-soft bg-carbon">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-6 select-none font-jp text-[34vw] leading-none text-white/[0.03] md:text-[16rem]"
        >
          掟
        </span>
        <div className={`${SHELL} relative z-10 py-16 md:py-24`}>
          <p className="kicker">
            <span className="font-jp not-italic">掟</span>
            <span>Kodeks</span>
          </p>
          <h1 className="display mt-6 text-[16vw] text-ink sm:text-6xl md:text-7xl">
            Aturan main
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-dim">
            Cara kami membangun dan menjaga arsip ini — supaya kamu tahu persis
            apa yang kamu hadapi setiap kali menekan tombol unduh.
          </p>
        </div>
      </section>

      {/* ASAL USUL */}
      <section id="asal" className="relative overflow-hidden bg-bone text-sumi">
        <SakuraField count={12} />
        <div className={`${SHELL} relative z-10 py-20 md:py-24`}>
          <p className="kicker !text-sumi-dim">
            <span>Asal usul</span>
            <span className="font-jp not-italic">起源</span>
          </p>
          <div className="mt-8 space-y-6 text-lg leading-relaxed md:text-xl">
            <p>
              Last Bos Games lahir dari kebiasaan lama: menyimpan game yang
              pernah{" "}
              <span className="text-accent">menahan kami berjam-jam</span> di
              depan layar, lalu kembali menaklukkannya bertahun-tahun kemudian.
            </p>
            <p className="text-sumi-dim">
              Internet penuh dengan situs ROM yang menguburmu di bawah pop-up
              dan tautan palsu. Kami menyediakan{" "}
              <span className="text-sumi">arsip yang tenang</span>, tertata, dan
              jujur. Setiap judul di sini punya alasan untuk ada.
            </p>
            <p>
              Estetikanya kami pinjam dari{" "}
              <span className="font-jp">武士道</span> — bushido, jalan sang
              samurai. Bukan sekadar gaya: disiplin, kurasi, dan rasa hormat
              pada karya orang lain adalah inti dari cara kami bekerja.
            </p>
          </div>
        </div>
      </section>

      {/* PRINSIP */}
      <section id="prinsip" className={`${SHELL} py-20 md:py-24`}>
        <p className="kicker">
          <span className="font-jp not-italic">五箇条</span>
          <span>Lima prinsip</span>
        </p>
        <ol className="mt-10 divide-y divide-line-soft border-y border-line-soft">
          {PRINCIPLES.map((p) => (
            <li key={p.n} className="flex gap-6 py-7">
              <span className="font-jp text-3xl text-accent">{p.n}</span>
              <div>
                <h3 className="font-head text-lg font-semibold text-ink">
                  {p.t}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                  {p.d}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <AdRow className="mt-14">
          <RectangleAd />
          <RectangleAd />
        </AdRow>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-y border-line-soft bg-carbon">
        <div className={`${SHELL} py-20 md:py-24`}>
          <p className="kicker">
            <span>Pertanyaan umum</span>
            <span className="font-jp not-italic">問答</span>
          </p>
          <div className="mt-10 space-y-3">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-line-soft bg-panel px-5 open:border-accent/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-head text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <Plus
                    size={16}
                    className="shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-45 group-open:text-accent"
                  />
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-ink-dim">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <LeaderboardAd className="mt-14" />
        </div>
      </section>

      {/* REQUEST */}
      <section id="request" className={`${SHELL} py-20 text-center md:py-24`}>
        <span className="font-jp text-sm tracking-[0.3em] text-ink-faint">
          リクエスト
        </span>
        <h2 className="mx-auto mt-4 max-w-lg font-head text-2xl font-medium tracking-tight md:text-3xl">
          Ada bos yang harus masuk arsip?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-dim">
          Ajukan judul lewat halaman game mana pun — tombol{" "}
          <span className="text-ink">“Laporkan info salah”</span> juga menerima
          permintaan. Kami meninjau daftar secara berkala.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/games" className="btn-primary">
            Telusuri arsenal
            <ArrowUpRight size={14} />
          </Link>
          <Link to="/support" className="btn-outline">
            Dukung arsip
          </Link>
        </div>
      </section>
    </div>
  );
}
