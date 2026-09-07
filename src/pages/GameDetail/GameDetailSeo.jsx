import { Helmet } from "react-helmet-async";
import { urlFor } from "../../services/sanity";
import { toPlainText } from "./utils";

export default function GameDetailSeo({ game }) {
  const siteUrl =
    import.meta.env.VITE_SITE_URL || "https://lastbosgames.vercel.app";
  const canonicalUrl = `${siteUrl}/game/${game?.slug?.current}`;

  const descriptionText = toPlainText(game?.fullDescription);
  const description =
    descriptionText.length >= 80
      ? descriptionText.slice(0, 300)
      : `Unduh ${game?.title}${
          game?.platform?.name ? ` untuk ${game.platform.name}` : ""
        } di Last Boss Games — metadata lengkap, screenshot, dan tautan unduhan langsung yang sudah diverifikasi.`;

  const imageUrl = game?.thumbnail
    ? urlFor(game.thumbnail)
        .width(1200)
        .height(630)
        .format("jpg")
        .quality(80)
        .url()
    : `${siteUrl}/icon.webp`;

  return (
    <Helmet>
      <title>{`${game.title} — Last Boss Games`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Last Boss Games" />
      <meta property="og:title" content={`${game.title} — Last Boss Games`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${game.title} — Last Boss Games`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoGame",
          name: game.title,
          description,
          image: imageUrl,
          url: canonicalUrl,
          operatingSystem: game.platform?.name || undefined,
          datePublished: game.releaseYear
            ? `${game.releaseYear}-01-01`
            : undefined,
          author: game.developer
            ? { "@type": "Organization", name: game.developer }
            : undefined,
        })}
      </script>
    </Helmet>
  );
}
