# Dokumentasi Sanity Dashboard

Dokumen ini menjelaskan cara kerja schema Sanity di proyek LastBossGame dan bagaimana cara memasukkan data di dashboard Sanity agar dapat tampil di website.

---

## 1. Gambaran umum

Proyek ini menggunakan Sanity sebagai headless CMS. Data utama disimpan di dataset `production` dengan project ID `liftuy21`.

Konfigurasi Sanity berada di:

- `studio/sanity.config.js`
- `studio/schemaTypes/index.js`

Berikut konfigurasi utama:

```js
export default defineConfig({
  name: "default",
  title: "LastBosGames",

  projectId: "liftuy21",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
```

Artinya:

- Studio Sanity ini bernama `LastBosGames`
- Dataset yang dipakai adalah `production`
- Tipe schema yang aktif dipanggil dari `schemaTypes`

---

## 2. Struktur schema utama

Semua schema di-register di file `studio/schemaTypes/index.js`:

```js
import game from "./game";
import platform from "./platform";
import genre from "./genre";
import region from "./region";
import emulator from "./emulator";
import supporter from "./supporter";
import downloadLink from "./downloadLink";

export const schemaTypes = [
  region,
  genre,
  platform,
  emulator,
  supporter,
  downloadLink,
  game,
];
```

Urutan ini penting karena beberapa tipe seperti `game` menggunakan referensi ke tipe lain, misalnya `platform`, `genre`, dan `region`.

### Jenis tipe data yang digunakan

- `document` = entitas utama seperti `game`, `platform`, `genre`, `emulator`, `supporter`
- `object` = struktur kecil yang dipakai di dalam field lain, misalnya `downloadLink`
- `reference` = hubungkan satu dokumen ke dokumen lain
- `array` = kumpulan nilai atau referensi
- `image` = upload media gambar
- `url` = link eksternal
- `slug` = URL-friendly identifier

---

## 3. Schema per tipe

### 3.1. `region`

File: `studio/schemaTypes/region.js`

```js
export default {
  name: "region",
  title: "Region",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    {
      name: "code",
      title: "Region Code (e.g., USA, JPN, EUR)",
      type: "string",
    },
  ],
};
```

Fungsinya:

- Menyimpan wilayah game, misalnya `USA`, `JPN`, `EUR`
- Dipakai di field `region` pada dokumen game

Contoh data:

- `name`: `USA`
- `code`: `USA`

---

### 3.2. `genre`

File: `studio/schemaTypes/genre.js`

```js
export default {
  name: "genre",
  title: "Genre",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
  ],
};
```

Fungsinya:

- Menyimpan kategori game seperti Action, RPG, Adventure
- Data ini dipakai untuk filtering di halaman list game

Contoh data:

- `name`: `Action`
- `slug`: `action`

---

### 3.3. `platform`

File: `studio/schemaTypes/platform.js`

```js
export default {
  name: "platform",
  title: "Platform",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
  ],
};
```

Fungsinya:

- Menyimpan platform game seperti `PS2`, `Nintendo Switch`, `PC`
- Data ini dipakai untuk filter dan relasi game

Contoh:

- `name`: `PS2`
- `slug`: `ps2`

---

### 3.4. `emulator`

File: `studio/schemaTypes/emulator.js`

```js
export default {
  name: "emulator",
  title: "Emulator",
  type: "document",
  fields: [
    { name: "name", title: "Emulator Name", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
    { name: "logo", title: "Logo", type: "image" },
    {
      name: "supportedPlatform",
      title: "Supported Platform",
      type: "reference",
      to: [{ type: "platform" }],
    },
    { name: "downloadUrl", title: "Official Download URL", type: "url" },
  ],
};
```

Fungsinya:

- Menyimpan rekomendasi emulator yang bisa dipakai untuk game tertentu
- Setiap emulator terhubung ke satu platform tertentu

Contoh isi:

- `name`: `PCSX2`
- `supportedPlatform`: referensi ke `PS2`
- `downloadUrl`: URL resmi download emulator

---

### 3.5. `supporter`

File: `studio/schemaTypes/supporter.js`

```js
export default {
  name: "supporter",
  title: "Supporter",
  type: "document",
  fields: [
    { name: "username", title: "Username / Display Name", type: "string" },
    { name: "optionalMessage", title: "Optional Message", type: "text" },
    { name: "donationDate", title: "Donation Date", type: "datetime" },
    {
      name: "displayStatus",
      title: "Display on Website?",
      type: "boolean",
      initialValue: true,
    },
  ],
};
```

Fungsinya:

- Menampilkan nama supporter yang menyumbang
- Hanya data yang `displayStatus == true` yang ditampilkan di website

---

### 3.6. `downloadLink`

File: `studio/schemaTypes/downloadLink.js`

```js
export default {
  name: "downloadLink",
  title: "Download Link",
  type: "object",
  fields: [
    {
      name: "sourceName",
      title: "Source Name",
      type: "string",
      description: 'e.g., "Google Drive"',
      initialValue: "Google Drive",
    },
    {
      name: "sourceType",
      title: "Source Type",
      type: "string",
      description: 'System identifier, e.g., "google-drive"',
      initialValue: "google-drive",
    },
    { name: "url", title: "Download URL", type: "url" },
    {
      name: "optionalLabel",
      title: "Optional Label",
      type: "string",
      description: 'e.g., "Part 1", "Mirror"',
    },
    {
      name: "fileSize",
      title: "File Size",
      type: "string",
      description: 'e.g., "4.2 GB"',
    },
  ],
};
```

Fungsinya:

- Berperan sebagai substruktur dalam dokumen game
- Menampung daftar link unduhan per game, misalnya Google Drive, MediaFire, mirror, dll.

Contoh:

- `sourceName`: `Google Drive`
- `sourceType`: `google-drive`
- `url`: `https://...`
- `optionalLabel`: `Part 1`
- `fileSize`: `4.2 GB`

---

### 3.7. `game` (schema paling penting)

File: `studio/schemaTypes/game.js`

```js
export default {
  name: "game",
  title: "Game",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "thumbnail",
      title: "Thumbnail / Cover",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "genre",
      title: "Genres",
      type: "array",
      of: [{ type: "reference", to: [{ type: "genre" }] }],
    },
    {
      name: "platform",
      title: "Platforms",
      type: "array",
      of: [{ type: "reference", to: [{ type: "platform" }] }],
    },
    {
      name: "region",
      title: "Region",
      type: "reference",
      to: [{ type: "region" }],
    },
    {
      name: "language",
      title: "Languages",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "screenshots",
      title: "Screenshots",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.max(5),
    },
    {
      name: "fileSize",
      title: "Total File Size",
      type: "string",
      description: 'e.g., "4.5 GB"',
    },
    { name: "releaseYear", title: "Release Year", type: "number" },
    { name: "developer", title: "Developer", type: "string" },
    { name: "publisher", title: "Publisher", type: "string" },
    {
      name: "downloadLinks",
      title: "Download Links",
      type: "array",
      of: [{ type: "downloadLink" }],
    },
    {
      name: "popularityScore",
      title: "Popularity Score",
      type: "number",
      initialValue: 0,
    },
  ],
};
```

Ini adalah schema paling penting karena semua data game yang ditampilkan di website berasal dari sini.

#### Field-field yang wajib dipahami

- `title`: Judul game
- `slug`: URL yang dibuat otomatis dari judul game
- `thumbnail`: Gambar utama cover game
- `fullDescription`: Deskripsi detail dengan blok rich text
- `genre`: Referensi ke genre
- `platform`: Referensi ke platform
- `region`: Referensi ke region
- `language`: Array bahasa, misalnya `["English", "Japanese"]`
- `screenshots`: Maksimal 5 gambar tambahan
- `fileSize`: Ukuran total file game
- `releaseYear`: Tahun rilis game
- `developer`: Developer game
- `publisher`: Publisher game
- `downloadLinks`: List link unduhan berbentuk objek `downloadLink`
- `popularityScore`: Skor popularitas untuk sorting halaman populer

Catatan penting:

- `title` wajib diisi
- `slug` di-generate dari `title`
- `screenshots` dibatasi maksimal 5

---

## 4. Hubungan antar schema

Diagram relasi data secara sederhana:

```text
Game
├── genre[] -> Genre
├── platform[] -> Platform
├── region -> Region
├── downloadLinks[] -> DownloadLink object
└── screenshots[] -> Image

Emulator
└── supportedPlatform -> Platform
```

### Contoh hubungan yang sering dipakai

- Satu game bisa punya banyak genre
- Satu game bisa punya banyak platform
- Satu game punya satu region
- Satu game punya banyak link download
- Satu emulator terhubung ke satu platform

Ini adalah alasan mengapa data di Sanity menggunakan banyak `reference` dan `array`.

---

## 5. Cara input data di dashboard Sanity

### Langkah 1: Buka Studio Sanity

Jalankan Sanity Studio di folder `studio`:

```bash
cd studio
npm install
npm run dev
```

Setelah itu, buka URL lokal dari terminal untuk masuk ke dashboard.

### Langkah 2: Buat data master terlebih dahulu

Sebelum membuat `Game`, biasakan membuat data master dulu:

1. `Region`
2. `Genre`
3. `Platform`

Tujuannya agar saat membuat `Game`, field `genre` dan `platform` bisa dipilih dari daftar yang sudah ada.

### Langkah 3: Input `Region`

Masuk ke menu `Region` lalu buat dokumen baru.

Contoh:

- `Name`: `USA`
- `Code`: `USA`

### Langkah 4: Input `Genre`

Masuk ke menu `Genre` lalu buat dokumen baru.

Contoh:

- `Name`: `Action`
- slug otomatis dibuat dari `name`

### Langkah 5: Input `Platform`

Masuk ke menu `Platform` lalu buat dokumen baru.

Contoh:

- `Name`: `PS2`
- slug otomatis dibuat dari `name`

### Langkah 6: Input `Game`

Masuk ke menu `Game` dan buat dokumen baru.

Isi field berikut:

- `Title`: Nama game
- `Slug`: otomatis dibuat, biasanya dari judul game
- `Thumbnail / Cover`: upload cover utama
- `Full Description`: isi deskripsi game dengan rich text
- `Genres`: pilih satu atau beberapa genre
- `Platforms`: pilih satu atau beberapa platform
- `Region`: pilih region yang sesuai
- `Languages`: masukkan bahasa yang tersedia, misalnya `English`, `Japanese`
- `Screenshots`: upload maksimal 5 gambar
- `Total File Size`: contoh `4.5 GB`
- `Release Year`: tahun rilis
- `Developer`: nama developer
- `Publisher`: nama publisher
- `Download Links`: tambah link unduhan satu per satu
- `Popularity Score`: angka untuk sorting populer

### Langkah 7: Input `Download Links`

Untuk setiap item `Download Links`, isi:

- `Source Name`: misalnya `Google Drive`
- `Source Type`: misalnya `google-drive`
- `Download URL`: link unduhan aktif
- `Optional Label`: bagian, mirror, atau label tambahan
- `File Size`: ukuran file per link

### Langkah 8: Input `Emulator`

Jika ingin menampilkan emulator tertentu:

- `Emulator Name`: nama emulator
- `Slug`: dibuat otomatis
- `Logo`: upload logo emulator
- `Supported Platform`: pilih platform yang didukung
- `Official Download URL`: masukkan URL resmi

### Langkah 9: Input `Supporter`

Masuk ke menu `Supporter` lalu isi:

- `Username / Display Name`
- `Optional Message`
- `Donation Date`
- `Display on Website?`: aktifkan jika ingin ditampilkan di website

---

## 6. Cara kerja data di frontend

Frontend mengambil data dari Sanity menggunakan client di `src/services/sanity.js`:

```js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "liftuy21",
  dataset: "production",
  useCdn: true,
  apiVersion: "2026-08-21",
});
```

Setiap query data menggunakan `sanityClient.fetch(...)`.

### Contoh GROQ untuk list game

Di `src/hooks/useGames.js` ada beberapa query seperti:

```js
const query = `*[_type == "game"] | order(_createdAt desc)[0...4] {
  _id,
  title,
  slug,
  thumbnail,
  platform[]->{name},
  genre[]->{name},
  region->{name}
}`;
```

Arti query:

- Ambil semua dokumen dengan tipe `game`
- Urutkan berdasarkan tanggal pembuatan terbaru
- Batasi 4 item pertama
- Ambil `title`, `slug`, `thumbnail`, `platform`, `genre`, dan `region`

### Contoh GROQ untuk detail game

```js
const query = `*[_type == "game" && slug.current == "${slug}"][0] {
  _id, title, slug, thumbnail, fullDescription,
  platform[]->{name}, genre[]->{name}, region->{name},
  language, fileSize, releaseYear, developer, publisher,
  screenshots, downloadLinks
}`;
```

Ini artinya:

- Data game detail diambil berdasarkan `slug`
- Kalau slug cocok, maka semua data detail game ditampilkan

---

## 7. Penggunaan referensi dan array

Struktur ini dirancang agar data tidak duplikasi. Misalnya:

- `genre` tidak disimpan di tiap game sebagai teks mentah
- `platform` tidak disimpan manual di tiap game
- `region` tidak ditulis berulang-ulang

Alih-alih, Sanity menyimpan relasi:

- `genre`: array of references
- `platform`: array of references
- `region`: single reference

Keuntungan:

- data lebih rapi
- update master data lebih cepat
- filtering lebih mudah
- halaman website dapat menampilkan data yang konsisten

---

## 8. Best practice saat mengisi data

### Untuk game

- Pastikan title tidak terlalu pendek dan jelas
- Pastikan `slug` valid dan unik
- Upload `thumbnail` dengan komposisi yang bagus
- Isi `fullDescription` dengan narasi lengkap
- Jika game multi-platform, pilih semua platform relevan
- Jika game punya banyak genre, pilih semua genre yang sesuai
- Gunakan `downloadLinks` dengan label jelas agar user mudah memilih mirror

### Untuk link download

- Pakai `sourceName` yang umum dipahami seperti `Google Drive`, `MEGA`, `Mirror`, `MediaFire`
- Isi `sourceType` konsisten, misalnya `google-drive`
- Pastikan URL valid dan dapat dibuka
- `optionalLabel` bisa diisi `Part 1`, `Part 2`, `Mirror`

### Untuk screenshots

- Maksimal 5 gambar
- Gunakan gambar yang relevan dengan gameplay / UI
- Pilih kualitas yang cukup jelas untuk user

### Untuk supporter

- `displayStatus` harus diaktifkan untuk supporter yang mau tampil di website
- `donationDate` gunakan format tanggal yang benar

---

## 9. Contoh data lengkap satu game

```json
{
  "_type": "game",
  "title": "Final Fantasy VII",
  "slug": {
    "_type": "slug",
    "current": "final-fantasy-vii"
  },
  "thumbnail": "image-field",
  "fullDescription": [
    {
      "_type": "block",
      "children": [
        {
          "_type": "span",
          "text": "Game klasik RPG dengan cerita epik..."
        }
      ]
    }
  ],
  "genre": [{ "_ref": "genre-id-1" }, { "_ref": "genre-id-2" }],
  "platform": [{ "_ref": "platform-id-1" }],
  "region": { "_ref": "region-id-1" },
  "language": ["English", "Japanese"],
  "screenshots": ["image-1", "image-2", "image-3"],
  "fileSize": "4.5 GB",
  "releaseYear": 1997,
  "developer": "Square",
  "publisher": "Square",
  "downloadLinks": [
    {
      "sourceName": "Google Drive",
      "sourceType": "google-drive",
      "url": "https://example.com/download",
      "optionalLabel": "Part 1",
      "fileSize": "2.2 GB"
    }
  ],
  "popularityScore": 95
}
```

---

## 10. Kesalahan yang sering terjadi saat input data

1. Membuat `Game` sebelum membuat `Genre` atau `Platform`
   - hasilnya field referensi akan kosong atau sulit dipilih

2. Mengisi `slug` manual tanpa mengikuti format yang benar
   - bisa memengaruhi URL page dan pencarian data

3. Menambahkan lebih dari 5 screenshot
   - validasi akan menolak jika lebih dari 5

4. Link download tidak valid atau mati
   - user akan kesulitan mengunduh game

5. Tidak menambahkan `popularityScore`
   - sorting game populer bisa tidak sesuai harapan

---

## 11. Ringkasan cara kerja sistem

Sistem ini bekerja seperti berikut:

1. Admin membuka Sanity Studio
2. Admin membuat data master seperti `genre`, `platform`, `region`
3. Admin membuat dokumen `game` dan menghubungkannya ke master data
4. Website membaca data tersebut melalui GROQ query
5. Data ditampilkan di halaman list game, detail game, emulator, dan supporter

Jadi, Sanity di sini berperan sebagai sumber data utama untuk seluruh website.

---

## 12. Checklist cepat untuk admin

Sebelum publish data game, cek poin berikut:

- [ ] Judul game sudah diisi
- [ ] Slug sudah otomatis dibuat
- [ ] Cover thumbnail berhasil diupload
- [ ] Genre sudah dipilih
- [ ] Platform sudah dipilih
- [ ] Region sudah dipilih
- [ ] Deskripsi sudah lengkap
- [ ] Screenshot maksimal 5
- [ ] File size sudah diisi
- [ ] Download link aktif dan valid
- [ ] Popularity score sudah diatur jika dibutuhkan

---

## 13. Kesimpulan

Schema Sanity di proyek ini dibuat untuk mengelola data game secara terstruktur dan scalable. Struktur yang paling penting adalah:

- `game` sebagai data utama
- `platform` dan `genre` sebagai master data
- `region` sebagai kategori wilayah
- `downloadLink` sebagai objek link unduhan
- `emulator` untuk data emulator
- `supporter` untuk data pendukung

Dengan pola seperti ini, admin dapat menambah data game dengan cepat, konsisten, dan mudah dipelihara di dashboard Sanity.
