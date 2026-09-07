import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import HeroSection from "./HeroSection";
import OriginSection from "./OriginSection";
import PrinciplesSection from "./PrinciplesSection";
import FaqSection from "./FaqSection";
import RequestSection from "./RequestSection";

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
          content={
            "Kodeks Last Bos Games: asal usul arsip cyber-samurai, lima prinsip yang kami pegang, dan " +
            "jawaban atas pertanyaan umum soal legalitas, keamanan file, dan cara menjalankan game."
          }
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

      <HeroSection />
      <OriginSection />
      <PrinciplesSection />
      <FaqSection />
      <RequestSection />
    </div>
  );
}
