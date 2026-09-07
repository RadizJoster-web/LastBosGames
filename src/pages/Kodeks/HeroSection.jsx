import { SHELL } from "./constants";

export default function HeroSection() {
  return (
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
  );
}
