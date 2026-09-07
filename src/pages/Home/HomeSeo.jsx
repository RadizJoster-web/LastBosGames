import { Helmet } from "react-helmet-async";

export default function HomeSeo() {
  return (
    <Helmet>
      <title>
        Last Bos Games — Arsip Cyber Samurai · ROM &amp; Game Pilihan
      </title>
      <meta
        name="description"
        content={
          "Arsip cyber-samurai berisi ROM & game pilihan yang dikurasi manual. Tautan unduhan " +
          "langsung terverifikasi, emulator sumber resmi, metadata lengkap. Setiap judul adalah bos " +
          "terakhir yang menunggu untuk ditaklukkan."
        }
      />
      <link rel="canonical" href="https://lastbosgames.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lastbosgames.vercel.app/" />
      <meta
        property="og:title"
        content="Last Bos Games — Arsip Cyber Samurai"
      />
      <meta
        property="og:description"
        content="ROM & game pilihan yang dikurasi manual. Tautan langsung terverifikasi, tanpa jebakan."
      />
      <meta
        property="og:image"
        content="https://lastbosgaames.vercel.app/icon.webp"
      />
    </Helmet>
  );
}
