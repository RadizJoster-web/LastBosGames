import useSWR from "swr";
import { sanityClient } from "../services/sanity";

// Fungsi dasar untuk mengambil data dari Sanity menggunakan GROQ query
const fetcher = (query) => sanityClient.fetch(query);

// Mengubah parameter order menjadi _createdAt desc (waktu pembuatan terbaru)
export function useRecentGames() {
  const query = `*[_type == "game"] | order(_createdAt desc)[0...4] {
    _id,
    title,  
    slug,
    thumbnail,
    platform->{name}, 
    genre[]->{name},
    region->{name}
  }`;

  const { data, error, isLoading } = useSWR(query, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
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
const PAGE_SIZE = 8;

export function useFilteredGames(
  search,
  platform,
  genre,
  region,
  page = 0,
  isPopular = false,
) {
  const sortOrder = isPopular ? "popularityScore desc" : "_createdAt desc";

  // 1. Query untuk mengambil data game
  const gamesQuery = `*[_type == "game" && title match $search
    && ($platform == "" || platform->slug.current == $platform) // REVISI: Logika filter diubah dari 'in' menjadi '=='
    && ($genre == "" || $genre in genre[]->slug.current)
    && ($region == "" || region->code == $region)]
    | order(${sortOrder}) [$start...$end] {
      _id, title, slug, thumbnail,
      platform->{name}, genre[]->{name}, region->{name} // REVISI: Hapus []
    }`;

  // 2. Query tambahan count() untuk menghitung TOTAL item tanpa dibatasi pagination
  const countQuery = `count(*[_type == "game" && title match $search
    && ($platform == "" || platform->slug.current == $platform) // REVISI: Logika filter disamakan dengan gamesQuery
    && ($genre == "" || $genre in genre[]->slug.current)
    && ($region == "" || region->code == $region)])`;

  // Gabungkan query menjadi satu kali fetch agar hemat request
  const combinedQuery = `{
    "games": ${gamesQuery},
    "total": ${countQuery}
  }`;

  const params = {
    search: search ? `*${search}*` : "*",
    platform: platform || "",
    genre: genre || "",
    region: region || "",
    start: page * PAGE_SIZE,
    end: (page + 1) * PAGE_SIZE,
  };

  const { data, error, isLoading } = useSWR(
    [combinedQuery, params],
    ([groq, groqParams]) => sanityClient.fetch(groq, groqParams),
    { revalidateOnFocus: false },
  );

  const totalGames = data?.total || 0;
  // REVISI BUG PAGINATION: Gunakan PAGE_SIZE, bukan angka statis 12
  const totalPages = Math.ceil(totalGames / PAGE_SIZE);

  return {
    games: data?.games || [],
    totalPages,
    totalGames,
    isLoading,
    isError: error,
  };
}

export function useGameDetail(slug) {
  // Query spesifik mengambil 1 game berdasarkan slug
  const query = `*[_type == "game" && slug.current == "${slug}"][0] {
    _id, title, slug, thumbnail, fullDescription,
    platform->{name}, genre[]->{name}, region->{name}, // REVISI: Hapus []
    language, fileSize, releaseYear, developer, publisher,
    screenshots, downloadLinks
  }`;

  // Hanya jalankan fetch jika slug tersedia
  const { data, error, isLoading } = useSWR(slug ? query : null, fetcher, {
    revalidateOnFocus: false,
  });

  return { game: data, isLoading, isError: error };
}

// Hook untuk mengambil daftar Emulator
export function useEmulators() {
  const query = `*[_type == "emulator"] | order(name asc) {
    _id, name, slug, logo, downloadUrl, sourceType,
    supportedPlatform->{name}
  }`;

  const { data, error, isLoading } = useSWR(query, fetcher, {
    revalidateOnFocus: false,
  });

  return { emulators: data, isLoading, isError: error };
}

// Hook untuk mengambil daftar Supporter (hanya yang displayStatus-nya true)
export function useSupporters() {
  const query = `*[_type == "supporter" && displayStatus == true] | order(donationDate desc) {
    _id, username, optionalMessage, donationDate
  }`;

  const { data, error, isLoading } = useSWR(query, fetcher, {
    revalidateOnFocus: false,
  });

  return { supporters: data, isLoading, isError: error };
}
