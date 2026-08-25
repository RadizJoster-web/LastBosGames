import fs from "fs";
import { createClient } from "@sanity/client";

// Inisialisasi client Sanity khusus script build
const client = createClient({
  projectId: "liftuy21", // Ganti dengan Project ID Anda
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function generateSitemap() {
  // Pastikan tidak ada tanda '/' di akhir URL domain Anda
  const DOMAIN = "https://lastbosgames.vercel.app";

  // Fungsi penyeimbang URL untuk mencegah garis miring ganda[cite: 1]
  const normalizePath = (path) => `${DOMAIN}${path === "" ? "/" : path}`;

  // Mengambil data slug dari Sanity
  const games = await client.fetch(
    `*[_type == "game"]{ "slug": slug.current, _updatedAt }`,
  );

  // Daftar halaman statis
  const staticPages = ["", "/games", "/emulator", "/support"];

  // Merakit kerangka sitemap dengan namespace yang benar (sitemaps.org)[cite: 1]
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map(
    (page) =>
      `  <url><loc>${normalizePath(page)}</loc><changefreq>daily</changefreq><priority>${page === "" ? "1.0" : "0.8"}</priority></url>`,
  )
  .join("\n")}
${games
  .map(
    (game) =>
      `  <url><loc>${normalizePath(`/game/${encodeURIComponent(game.slug)}`)}</loc><lastmod>${new Date(game._updatedAt).toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`,
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync("./public/sitemap.xml", sitemap);
  console.log("✅ Sitemap.xml berhasil diperbarui dengan sempurna!");
}

generateSitemap();
