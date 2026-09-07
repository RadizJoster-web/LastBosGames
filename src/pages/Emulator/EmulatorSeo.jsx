import { Helmet } from "react-helmet-async";

export default function EmulatorSeo() {
  return (
    <Helmet>
      <title>
        Emulator — Berjalan di &amp; Untuk Game Apa · Last Bos Games
      </title>
      <meta
        name="description"
        content={
          "Kumpulan emulator untuk menjalankan ROM dari arsip Last Bos Games. Tiap emulator diberi " +
          "label perangkat (PC / Mobile) dan konsol yang didukung (PS2, PSP, dst), lengkap dengan " +
          "filter."
        }
      />
      <link rel="canonical" href="https://lastbosgames.vercel.app/emulator" />
      <meta property="og:title" content="Emulator · Last Bos Games" />
      <meta
        property="og:description"
        content="Emulator dengan label perangkat & konsol yang didukung — plus filter."
      />
      <meta
        property="og:image"
        content="https://lastbosgaames.vercel.app/icon.webp"
      />
    </Helmet>
  );
}
