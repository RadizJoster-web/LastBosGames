import useSWR from "swr";
import { sanityClient } from "../services/sanity";

// Fungsi dasar untuk mengambil data dari Sanity menggunakan GROQ query
const fetcher = (query) => sanityClient.fetch(query);

// Hook untuk mengambil game populer/unggulan (maksimal 4 untuk di beranda)
export function usePopularGames() {
  const query = `*[_type == "game" && featuredStatus == true] | order(popularityScore desc)[0...4] {
    _id,
    title,
    slug,
    thumbnail,
    shortDescription,
    platform[]->{name},
    genre[]->{name},
    region->{name}
  }`;

  const { data, error, isLoading } = useSWR(query, fetcher, {
    revalidateOnFocus: false, // Mencegah fetch saat user kembali ke tab browser
    revalidateOnReconnect: false, // Mencegah fetch saat koneksi internet putus-nyambung
    revalidateIfStale: false, // Gunakan data cache jika sudah ada
  });

  return {
    games: data,
    isLoading,
    isError: error,
  };
}

// Hook untuk mengambil opsi filter secara dinamis
export function useFilterOptions() {
  const query = `{
    "platforms": *[_type == "platform"] | order(name asc) {name, "slug": slug.current},
    "genres": *[_type == "genre"] | order(name asc) {name, "slug": slug.current},
    "regions": *[_type == "region"] | order(name asc) {name, code}
  }`;

  const { data, error, isLoading } = useSWR(query, fetcher, {
    revalidateOnFocus: false,
  });

  return { options: data, isLoading, isError: error };
}

// Hook untuk mengambil game dengan parameter filter
export function useFilteredGames(search, platform, genre, region) {
  // Membangun query GROQ secara dinamis berdasarkan state filter
  let queryConditions = `_type == "game"`;

  if (search) {
    // Sanity match operator untuk pencarian teks case-insensitive
    queryConditions += ` && title match "*${search}*"`;
  }
  if (platform) {
    queryConditions += ` && "${platform}" in platform[]->slug.current`;
  }
  if (genre) {
    queryConditions += ` && "${genre}" in genre[]->slug.current`;
  }
  if (region) {
    queryConditions += ` && region->code == "${region}"`;
  }

  const query = `*[${queryConditions}] | order(createdAt desc) {
    _id,
    title,
    slug,
    thumbnail,
    shortDescription,
    platform[]->{name},
    genre[]->{name},
    region->{name}
  }`;

  const { data, error, isLoading } = useSWR(query, fetcher, {
    revalidateOnFocus: false,
  });

  return { games: data, isLoading, isError: error };
}

export function useGameDetail(slug) {
  // Query spesifik mengambil 1 game berdasarkan slug
  const query = `*[_type == "game" && slug.current == "${slug}"][0] {
    _id, title, slug, thumbnail, shortDescription, fullDescription,
    platform[]->{name}, genre[]->{name}, region->{name},
    language, fileSize, releaseYear, developer, publisher,
    screenshots, downloadLinks
  }`;

  // Hanya jalankan fetch jika slug tersedia
  const { data, error, isLoading } = useSWR(slug ? query : null, fetcher, {
    revalidateOnFocus: false,
  });

  return { game: data, isLoading, isError: error };
}
