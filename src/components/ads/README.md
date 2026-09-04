# Iklan (Adsterra) — cara mengelola

Semua iklan **di-hardcode** (tidak pakai `.env`). Satu file = satu unit iklan.

## Ganti kode / key iklan

| Unit                    | File                  | Ukuran           | Key ada di                |
| ----------------------- | --------------------- | ---------------- | ------------------------- |
| Leaderboard             | `LeaderboardAd.jsx`   | 728×90 + 300×250 | `KEY_728`, `KEY_300`      |
| Rectangle               | `RectangleAd.jsx`     | 300×250          | `KEY`                     |
| Banner tipis            | `BannerAd.jsx`        | 468×60           | `KEY`                     |
| Skyscraper              | `SkyscraperAd.jsx`    | 160×300          | `KEY`                     |
| Native                  | `NativeAd.jsx`        | dinamis          | `NATIVE_ID`, `NATIVE_SRC` |
| Popunder + SocialBar    | `../../../index.html` | —                | `<script src="...">`      |
| Host `invoke.js` banner | `AdFrame.jsx`         | —                | `BANNER_HOST`             |

Cukup ubah konstanta di paling atas file terkait.

## Memasang iklan di halaman

```jsx
import { LeaderboardAd, RectangleAd, BannerAd, NativeAd, AdRow } from "../../components/ads";

<LeaderboardAd className="mt-16" />          // 1 leaderboard
<AdRow><RectangleAd /><RectangleAd /></AdRow> // 2 iklan bersampingan
<NativeAd className="col-span-full" />        // native, membaur dgn konten
<BannerAd className="mb-10" />                // strip 468x60 (auto sembunyi di HP)
```

`SkyscraperAd` sudah otomatis muncul di semua halaman (dirender di `MainLayout`,
melayang kiri & kanan, hanya layar ≥ 1600px, bisa ditutup pengunjung).

## Kalau iklan tidak muncul

1. **Adsterra tidak menayangkan iklan di `localhost`.** Tes di domain live
   (`lastbosgames.vercel.app`).
2. Unit iklan baru butuh **~24–48 jam** untuk aktif di panel Adsterra.
3. Adblocker aktif di browser.
4. Host salah → coba ubah `BANNER_HOST` di `AdFrame.jsx` ke
   `https://www.highrevenueformat.com`. (`public/ad-banner.html` sudah otomatis
   mencoba host cadangan bila 4 detik iklan belum muncul.)
