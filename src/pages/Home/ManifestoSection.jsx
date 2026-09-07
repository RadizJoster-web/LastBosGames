import { Link } from "react-router-dom";
import { ArrowRight, Cpu, Link2, ScrollText, ShieldCheck } from "lucide-react";
import SakuraField from "../../components/common/SakuraField";
import ScrollColorText from "../../components/common/ScrollColorText";
import { SHELL } from "./constants";

const PRINCIPLES = [
  {
    icon: Link2,
    title: "Tautan Langsung",
    body: "Unduhan direct. Tanpa maze redirect, tanpa survey, tanpa shortener beracun.",
  },
  {
    icon: ShieldCheck,
    title: "Kurasi Manual",
    body: "Setiap judul dipilih dan diperiksa satu per satu sebelum masuk arsip.",
  },
  {
    icon: Cpu,
    title: "Emulator",
    body: "Emulator yang cocok untuk tiap platform — hanya dari sumber resmi pengembang.",
  },
  {
    icon: ScrollText,
    title: "Kodeks Terbuka",
    body: "Metadata lengkap: region, tahun rilis, ukuran file, bahasa, dan developer.",
  },
];

export default function ManifestoSection() {
  return (
    <section className="relative overflow-hidden bg-bone text-sumi">
      <SakuraField count={16} />
      <div className={`${SHELL} relative z-10 py-20 md:py-28`}>
        <p className="kicker !text-sumi-dim">
          <span>Kodeks</span>
          <span className="font-jp not-italic">掟</span>
        </p>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <ScrollColorText
              className="font-head text-2xl font-medium leading-[1.35] tracking-tight sm:text-3xl md:text-[2.4rem]"
              segments={[
                { t: "Last Bos Games adalah" },
                { t: "arsip digital", tone: "accent" },
                { t: "para Bos terakhir — perpaduan" },
                { t: "nostalgia konsol klasik", tone: "muted" },
                { t: "dengan semangat" },
                { t: "武士道.", tone: "jp" },
                { t: "Setiap judul" },
                { t: "dikurasi manual,", tone: "accent" },
                { t: "setiap tautan" },
                { t: "diverifikasi,", tone: "accent" },
                { t: "setiap unduhan" },
                { t: "langsung ke sasaran.", tone: "muted" },
              ]}
            />

            <p className="mt-8 max-w-md text-sm leading-relaxed text-sumi-dim">
              Kami tidak mengejar jumlah. Kami mengejar judul yang benar-benar
              layak disimpan — lengkap dengan region, versi, ukuran file, dan
              emulator yang cocok.
            </p>

            <Link
              to="/kodeks"
              className={`mt-8 inline-flex items-center gap-2 border-b border-sumi/30 pb-1 font-head text-xs
                font-semibold uppercase tracking-[0.2em] text-sumi transition-colors hover:border-accent
                hover:text-accent`}
            >
              Selengkapnya tentang kami
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* portrait */}
          <div className="relative overflow-hidden rounded-2xl border border-sumi/10">
            <img
              src="/samurai.webp"
              alt="samurai"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-[53%_center]"
            />
            <div className="absolute inset-0 mix-blend-multiply [background:radial-gradient(circle_at_60%_40%,rgba(224,29,29,0.35),transparent_55%)]" />
            <span className="absolute bottom-4 left-4 font-jp text-xs tracking-[0.3em] text-white/80">
              最終ボス · No.001
            </span>
          </div>
        </div>

        {/* prinsip */}
        <div className="mt-16 grid gap-x-10 gap-y-10 border-t border-sumi/12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map(({ icon: Icon, title, body }) => (
            <div key={title}>
              <Icon size={20} className="text-accent" strokeWidth={1.75} />
              <h3 className="mt-4 font-head text-base font-semibold text-sumi">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sumi-dim">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
