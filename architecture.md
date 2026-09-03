# LBG (Last Boss Games) - System Architecture & Developer Guide

Dokumentasi arsitektur website ini mencakup panduan Color Scheme, Typography, Layout Structure, Individual Pages, State Management, dan Relationship with Sanity CMS. Dokumen ini dirancang sebagai panduan dasar bagi developer atau AI agent untuk merombak UI/UX menjadi **Clean, Modern, Interactive, dan Mobile-First**.

## 1. Tech Stack & Libraries

Website ini dibangun dengan pendekatan JAMstack modern:

- **Frontend Framework:** React.js (menggunakan Vite).
- **Styling:** Tailwind CSS (untuk utilitas) & CSS Modules/Global (untuk animasi khusus).
- **Routing:** `react-router-dom` (termasuk manipulasi URL Search Params).
- **Data Fetching:** `swr` (Stale-While-Revalidate untuk _caching_ dan performa).
- **Headless CMS:** Sanity (`@sanity/client`).
- **SEO & Meta:** `react-helmet-async`.
- **Icons:** `lucide-react`.

## 2. Design System: Clean & Modern (Perubahan Target)

Desain _Neo-Brutalism_ (border tebal, bayangan tajam, warna mencolok) **TELAH DITINGGALKAN**. UI harus mengutamakan kebersihan, _white space_, _glassmorphism_ (opsional), dan bayangan lembut (_soft drop shadows_).

### A. Color Scheme

Warna spesifik dapat disesuaikan, namun harus mengikuti prinsip berikut:

- **Primary Color:** Warna modern dan memikat (misal: _Electric Blue_ atau _Deep Purple_).
- **Background Color:** Warna terang dan bersih (misal: `#F9FAFB` atau _Off-white_).
- **Surface Color:** Putih bersih (`#FFFFFF`) untuk kartu (_cards_) agar menonjol dari _background_.
- **Text Color:** Abu-abu gelap (`#1F2937`) untuk teks utama, dan abu-abu medium (`#4B5563`) untuk deskripsi pendukung.
- **Accent Color:** Warna yang lembut untuk label _genre_ atau _platform_.

### B. Typography

- **Primary Font:** Sans-serif modern seperti _Inter_, _Poppins_, atau _Plus Jakarta Sans_.
- **Hierarki:** Gunakan _font-weight_ (Bold/Semibold) untuk judul, dan reguler untuk paragraf. Hindari penggunaan teks _uppercase_ (huruf kapital semua) yang berlebihan kecuali untuk label kecil.

### C. Layout Structure & UI Elements

- **Cards (GameCard):** Sudut membulat (_rounded-xl_), transisi halus saat di-_hover_ (`hover:-translate-y-1 hover:shadow-lg`), poster _game_ menggunakan `object-contain` dengan rasio `3:4`.
- **Interaktivitas:** Gunakan _loading skeleton_ (SkeletonCard) yang modern dan halus (efek _shimmer_).
- **Mobile-First:** Pastikan filter pencarian di _mobile_ bisa disembunyikan dalam _drawer_ atau _dropdown_ agar tidak memakan ruang.

## 3. Individual Pages

- **Home Page:** Menampilkan _Hero Section_ modern, integrasi `<AdBanner>`, dan daftar _game_ terbaru (`useRecentGames`).
- **Games (Catalog) Page:** Grid _game_ yang responsif dengan sistem filter (Pencarian, Platform, Genre, Region, Terpopuler) dan penomoran halaman dinamis.
- **Game Detail Page:** Menampilkan poster, spesifikasi lengkap, _screenshots_ (maksimal 5), deskripsi (_Rich Text Block_), dan daftar tautan unduhan.
- **Emulators Page:** Daftar emulator yang di-_fetch_ dari Sanity.
- **404 Page:** Halaman _error_ interaktif untuk mengarahkan pengguna kembali ke beranda.

## 4. State Management & Pagination

State management menggunakan pendekatan gabungan antara state lokal dan state berbasis URL:

- **Filter (Local State):** Pencarian, platform, genre, dan region disimpan dalam `useState` dengan efek _debounce_ (`setTimeout` 300ms) menggunakan `useEffect` dan `useRef` agar tidak mereset secara tidak sengaja saat inisialisasi (_initial mount_).
- **Pagination (URL State):** Nomor halaman wajib disimpan di dalam URL parameter menggunakan `useSearchParams` (contoh: `?page=2`).
- **Logika Halaman:** `PAGE_SIZE` dikunci di angka **8**. Tombol navigasi mencakup penomoran langsung (1, 2, 3... dengan _ellipsis_ `...` untuk halaman panjang) dan fitur auto _scroll-to-top_ saat berpindah halaman.

## 5. Relationship with Sanity CMS (Database)

Website mengambil data menggunakan bahasa kueri GROQ melalui Sanity API.

### A. Skema Game (`game.js`) - Versi Final

Pemetaan UI harus didasarkan pada tipe data _field_ terbaru ini:

- `title` (string)
- `slug` (slug)
- `thumbnail` (image)
- `fullDescription` (array of block / Rich Text)
- `genre` (array of references)
- `platform` (**SINGLE reference** - bukan array)
- `region` (single reference)
- `language` (**SINGLE string** - bukan array)
- `screenshots` (array of images, max 5)
- `fileSize` (string)
- `releaseYear` (number)
- `developer` (string)
- `publisher` (string)
- `downloadLinks` (array of reference/object)
- `popularityScore` (number)

### B. Daftar Hooks (`useGames.js`)

- `useRecentGames()`: Mengambil 4 _game_ terbaru (sort by `_createdAt desc`).
- `useFilteredGames(search, platform, genre, region, page, isPopular)`: Mengambil 8 _game_ berdasarkan parameter, sekaligus menghitung `totalGames` dan `totalPages` dalam satu _combined GROQ query_.
- `useGameDetail(slug)`: Mengambil 1 dokumen _game_ spesifik.
- `useFilterOptions()`: Mengambil daftar master `platform`, `genre`, dan `region`.
- `useEmulators()`: Mengambil daftar emulator.
- `useSupporters()`: Mengambil daftar pendukung dengan `displayStatus == true`.

## 6. External Integrations (Ads & Vercel)

### A. Adsterra Advertising (Terpusat)

Semua konfigurasi iklan menggunakan variabel lingkungan (`.env`) agar mematuhi prinsip DRY (_Don't Repeat Yourself_):

- **Script Global:** `VITE_AD_POPUNDER_URL` dan `VITE_AD_SOCIALBAR_URL` disuntikkan secara dinamis di `index.html` menggunakan sintaks Vite (contoh: `%VITE_AD_POPUNDER_URL%`).
- **Banner Ads:** Di-_render_ menggunakan komponen React `<AdBanner dataKey="{import.meta.env.VITE_AD_BANNER_728}" height="{90}" width="{728}"/>`. Desain UI harus menyediakan ruang khusus agar _banner_ tidak merusak _layout_.

### B. Vercel CI/CD & Sitemap

- Website di-_host_ di Vercel dengan domain `lastbosgaames.vercel.app`.
- Vercel dikonfigurasi menggunakan **Deploy Webhooks** yang terhubung dengan Sanity. Setiap kali ada penambahan konten di Sanity, Vercel akan otomatis melakukan _rebuild_ di latar belakang untuk memperbarui file `sitemap.xml`.

## 7. SEO & Metadata

- Semua halaman harus dibungkus dengan komponen `<Helmet>`.
- Wajib menyediakan Canonical URL, meta deskripsi (minimal 150 karakter yang menarik), serta Open Graph (`og:title`, `og:image`, `og:description`).
- File `index.html` utama telah disuntikkan dengan skrip **JSON-LD Schema** bertipe `WebSite` untuk memaksa mesin pencari mengenali "Last Boss Games" sebagai entitas properti (bukan sekadar tautan Vercel).

---

**Instruksi Khusus untuk AI Agent:**
Gunakan dokumentasi di atas sebagai referensi mutlak saat merender ulang komponen seperti `GameCard.jsx`, `Games/index.jsx`, atau `GameDetail.jsx`. Fokus pada transisi CSS dari _brutalism_ ke _modern styling_ (Tailwind), **tanpa** mengubah struktur logika Hooks, Pagination (URL parameter), variabel Env, dan kueri GROQ yang sudah stabil.
