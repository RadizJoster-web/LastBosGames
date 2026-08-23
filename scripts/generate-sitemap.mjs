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
  const DOMAIN = "https://last-bos-games.vercel.app/";

  // Query seluruh slug game yang ada di Sanity
  const games = await client.fetch(
    `*[_type == "game"]{ "slug": slug.current, _updatedAt }`,
  );

  // Halaman statis utama
  const staticPages = ["", "/games", "/emulator", "/support"];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
  <!-- Halaman Statis -->
  ${staticPages
    .map(
      (page) => `
    <url>
      <loc>${DOMAIN}${page}</loc>
      <changefreq>daily</changefreq>
      <priority>${page === "" ? "1.0" : "0.8"}</priority>
    </url>`,
    )
    .join("")}

  <!-- Halaman Game Dinamis -->
  ${games
    .map(
      (game) => `
    <url>
      <loc>${DOMAIN}/game/${game.slug}</loc>
      <lastmod>${new Date(game._updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>`,
    )
    .join("")}
</urlset>`;

  // Simpan file ke folder public agar bisa diakses Google di domain.com/sitemap.xml
  fs.writeFileSync("./public/sitemap.xml", sitemap);
  console.log("✅ Sitemap.xml berhasil diperbarui dengan game terbaru!");
}

generateSitemap();
