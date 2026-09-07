import { Helmet } from "react-helmet-async";

export default function GamesSeo() {
  return (
    <Helmet>
      <title>Games — Katalog Game · Last Bos Games</title>
      <meta
        name="description"
        content="Seluruh bos dalam arsip Last Bos Games. Saring berdasarkan platform, genre, dan wilayah rilis, lalu ambil tautan unduhan langsung yang sudah diverifikasi."
      />
      <link rel="canonical" href="https://lastbosgames.vercel.app/games" />
      <meta
        property="og:title"
        content="Games — Katalog Game · Last Bos Games"
      />
      <meta
        property="og:description"
        content="Seluruh bos dalam arsip. Saring dan unduh dengan tautan langsung."
      />
      <meta
        property="og:image"
        content="https://lastbosgaames.vercel.app/icon.webp"
      />
    </Helmet>
  );
}
