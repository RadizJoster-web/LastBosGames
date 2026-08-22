import { Link } from "react-router-dom";
import { usePopularGames } from "../../hooks/useGames";
import GameCard from "../../components/game/GameCard";
import SkeletonCard from "../../components/common/SkeletonCard";

export default function Home() {
  const { games, isLoading, isError } = usePopularGames();

  return (
    <div className="flex flex-col gap-20 md:gap-32 pb-16 overflow-x-hidden">
      {/* HERO SECTION - Clean & Modern */}
      <section className="relative pt-12 md:pt-24 flex flex-col justify-center min-h-[60vh]">
        {/* Efek glow modern yang halus sebagai background */}
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-[100px] -z-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-3 text-primary font-display font-bold tracking-widest mb-6 text-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            SISTEM AKTIF. SIAP DIUNDUH.
          </div>

          <h1 className="text-5xl md:text-8xl font-display font-black text-ink leading-[1.05] mb-8 tracking-tight">
            HANCURKAN MUSUH <br />
            <span className="text-primary">TERKUATMU!</span>
          </h1>

          <p className="text-lg md:text-xl font-body text-ink/75 max-w-2xl mb-12 leading-relaxed">
            Katalog game pilihan dengan tautan unduhan langsung. Tanpa
            basa-basi, langsung main. Temukan file, jalankan emulator, dan
            hancurkan skor tertinggi.
          </p>

          <div className="flex flex-wrap gap-5 items-center">
            {/* Reusable Brutalist Component */}
            <Link to="/games" className="btn-brutal">
              LIHAT GAME
            </Link>

            {/* Secondary Button - tetap brutalist agar konsisten dengan UI Kit */}
            <Link
              to="/support"
              className="bg-white text-ink font-display text-lg px-6 py-3 border-3 border-ink uppercase tracking-widest transition-all duration-75 block text-center shadow-[4px_4px_0px_#0F0F0F] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_#2C3E50] hover:bg-surface active:translate-y-1 active:translate-x-1 active:shadow-none"
            >
              DUKUNG KAMI
            </Link>
          </div>
        </div>  
      </section>

      {/* POPULAR GAMES SECTION */}
      <section>
        {/* Header section modern tanpa border tebal */}
        <div className="flex items-end justify-between mb-10 border-b border-border-subtle pb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-ink tracking-wide">
              TARGET UTAMA
            </h2>
            <p className="text-ink/60 font-body mt-2 text-sm md:text-base">
              Game paling banyak diincar saat ini
            </p>
          </div>
          <Link
            to="/games"
            className="hidden md:flex items-center gap-2 font-display font-bold text-primary hover:text-primary-hover transition-colors"
          >
            LIHAT SEMUA
            <span className="text-xl">&rarr;</span>
          </Link>
        </div>

        {/* Kondisi Error (Clean Notification) */}
        {isError ? (
          <div className="bg-red-50 text-primary p-6 border-l-4 border-primary font-body text-center rounded-r-md mb-8">
            <span className="font-bold">CRITICAL ERROR:</span> Gagal memuat data
            dari server.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              : games?.map((game) => <GameCard key={game._id} game={game} />)}
          </div>
        )}

        {/* Tombol Mobile 'Lihat Semua' */}
        <div className="mt-10 md:hidden">
          <Link to="/games" className="btn-brutal w-full">
            LIHAT SEMUA GAME
          </Link>
        </div>
      </section>

      {/* SYSTEM UPDATE BANNER - Clean & Modern Card */}
      <section className="bg-surface rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-border-subtle shadow-sm">
        <div className="max-w-2xl">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-ink mb-3 uppercase">
            PEMBARUAN BASIS DATA: <span className="text-primary">BERJALAN</span>
          </h3>
          <p className="font-body text-ink/75 leading-relaxed text-lg">
            Koleksi game kami terus diperbarui secara berkala. Jika targetmu
            belum ada, pastikan untuk kembali lagi nanti.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <Link
            to="/support"
            className="text-primary font-display font-bold hover:text-ink transition-colors uppercase tracking-widest text-sm flex items-center gap-2"
          >
            BANTU SERVER KAMI <span className="text-lg">&rarr;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
