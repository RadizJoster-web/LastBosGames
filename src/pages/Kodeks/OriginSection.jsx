import SakuraField from "../../components/common/SakuraField";
import { SHELL } from "./constants";

export default function OriginSection() {
  return (
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
  );
}
