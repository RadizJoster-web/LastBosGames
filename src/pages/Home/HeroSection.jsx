import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import FeaturedCard from "./FeaturedCard";
import { SHELL } from "./constants";

export default function HeroSection({ featured, isLoading, isError, gameCount }) {
  // Parallax hero halus
  const [scrollY, setScrollY] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() =>
        setScrollY(Math.min(window.scrollY, 700)),
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-line-soft">
      {/* gambar */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-[0.18] md:w-[62%] md:opacity-100"
        style={{
          transform: `translateY(${scrollY * 0.06}px)`,
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 46%, #000)",
          maskImage: "linear-gradient(to right, transparent, #000 46%, #000)",
        }}
      >
        <img
          src="/hero section.webp"
          alt="Prajurit cyber-samurai"
          fetchPriority="high"
          decoding="sync"
          className="h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
      </div>

      {/* katakana raksasa */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-24 hidden select-none font-jp text-7xl font-bold text-white/[0.05] lg:block xl:text-8xl"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      >
        最終
        <br />
        ボス
      </span>

      <div className={`${SHELL} relative z-10`}>
        <div className="grid gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:py-28">
          <div className="max-w-2xl">
            <p className="kicker">
              <span className="font-jp not-italic">アーカイブ</span>
              <span>Arsip Cyber Samurai</span>
            </p>

            <h1 className="mt-7">
              <span className="display block text-[19vw] text-ink sm:text-[13vw] lg:text-[8.5rem]">
                Last
              </span>
              <span className="display block text-[19vw] text-accent glow-accent sm:text-[13vw] lg:text-[8.5rem]">
                Bos
              </span>
            </h1>

            <p className="mt-4 font-jp text-sm tracking-[0.2em] text-ink-dim">
              サイバー時代の武士道
            </p>

            <p className="mt-7 max-w-lg text-base leading-relaxed text-ink-dim md:text-lg">
              Gudang game penghancur mental. Setiap judul adalah Bos terakhir
              yang menunggu untuk ditaklukkan — tautan langsung,
              terverifikasi, tanpa jebakan.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/games" className="btn-primary">
                Telusuri game
                <ArrowUpRight size={14} />
              </Link>
              <Link to="/kodeks" className="btn-outline">
                Baca Kodeks
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <p className="mt-10 flex items-center gap-2.5 font-head text-[11px] uppercase tracking-[0.24em] text-ink-faint">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              {gameCount
                ? `${gameCount} Bos dalam arsip`
                : "Dikurasi manual · tanpa kompromi"}
            </p>
          </div>

          {/* Kartu sorotan */}
          <div className="lg:flex lg:items-end lg:justify-end">
            <FeaturedCard game={featured} loading={isLoading} error={isError} />
          </div>
        </div>
      </div>
    </section>
  );
}
