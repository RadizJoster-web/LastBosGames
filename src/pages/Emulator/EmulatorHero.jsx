import { SHELL } from "./constants";

export default function EmulatorHero() {
  return (
    <section className="border-b border-line-soft bg-carbon">
      <div className={`${SHELL} py-16 md:py-20`}>
        <p className="kicker">
          <span className="font-jp not-italic">装備</span>
          <span>Emulator</span>
        </p>
        <h1 className="display mt-6 text-[15vw] text-ink sm:text-6xl md:text-7xl">
          Senjata
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim">
          Tiap emulator punya dua label:{" "}
          <span className="text-ink">berjalan di</span> perangkat apa, dan{" "}
          <span className="text-ink">untuk game konsol</span> apa. Pilih yang
          cocok lewat filter di bawah — semua tautan mengarah ke situs resmi
          pengembang.
        </p>
      </div>
    </section>
  );
}
