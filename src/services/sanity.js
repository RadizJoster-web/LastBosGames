import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "liftuy21", // Ganti dengan Project ID Anda
  dataset: "production",
  useCdn: true, // Menggunakan CDN agar load data lebih cepat
  apiVersion: "2026-08-21", // Gunakan tanggal hari ini atau versi API terbaru
});

// Setup builder untuk mengambil URL gambar dari CDN Sanity
const builder = imageUrlBuilder(sanityClient);  

export function urlFor(source) {
  return builder.image(source);
}
