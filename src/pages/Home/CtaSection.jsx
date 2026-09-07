import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SHELL } from "./constants";

export default function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-line-soft">
      <div className="absolute inset-0 [background:radial-gradient(700px_300px_at_50%_120%,rgba(224,29,29,0.25),transparent)]" />
      <div className={`${SHELL} relative z-10 py-24 text-center md:py-32`}>
        <span className="font-jp text-sm tracking-[0.3em] text-ink-faint">
          準備はいいか
        </span>
        <h2 className="mx-auto mt-5 max-w-2xl font-head text-3xl font-medium tracking-tight md:text-5xl md:leading-[1.1]">
          Siap menghadapi Bos terakhir?
        </h2>
        <p className="mx-auto mt-5 max-w-md text-sm text-ink-dim">
          Games terbuka. Pilih judulmu, ambil senjatanya, dan mulai
          pertarungan.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/games" className="btn-primary">
            Telusuri Games
            <ArrowUpRight size={14} />
          </Link>
          <Link to="/support" className="btn-outline">
            Dukung arsip
          </Link>
        </div>
      </div>
    </section>
  );
}
