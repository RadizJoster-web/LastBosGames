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
