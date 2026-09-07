import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSupporters } from "../../hooks/useGames";
import DonationHero from "./DonationHero";
import SupportersList from "./SupportersList";

export default function SupportUs() {
  const { supporters, isLoading, isError } = useSupporters();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="border-b border-line-soft">
      <Helmet>
        <title>Dukung Arsip — Last Bos Games</title>
        <meta
          name="description"
          content={
            "Bantu Last Bos Games tetap menyala — menjaga server aktif, tautan tetap hidup, dan arsip " +
            "bebas dari iklan intrusif. Setiap dukungan digunakan penuh untuk operasional server dan " +
            "penyimpanan."
          }
        />
        <link rel="canonical" href="https://lastbosgames.vercel.app/support" />
        <meta property="og:title" content="Dukung Arsip · Last Bos Games" />
        <meta
          property="og:description"
          content="Bantu kami menjaga server tetap menyala dan arsip tetap bersih."
        />
        <meta
          property="og:image"
          content="https://lastbosgaames.vercel.app/icon.webp"
        />
      </Helmet>

      <DonationHero />
      <SupportersList
        supporters={supporters}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}
