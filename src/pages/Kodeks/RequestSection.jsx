import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SHELL } from "./constants";

export default function RequestSection() {
  return (
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
  );
}
