# SEO and Frontend Performance Audit

Audit scope: `src/`, `index.html`, `package.json`, `vite.config.js`, `scripts/generate-sitemap.mjs`, and the generated `public/sitemap.xml`. No existing source files were modified.

## 1. SEO Standards Verification

### Semantic HTML

The application has a reasonable semantic foundation:

- `src/components/layout/MainLayout.jsx` supplies one shared `<header>`, `<main>`, and `<footer>`, with route content rendered through `<Outlet />`.
- `src/components/game/GameCard.jsx` uses `<article>` for individual game records.
- Each major page has one visible `<h1>`: Home, Games, Emulator, SupportUs, and GameDetail.
- Page sections use `<h2>` and card/detail headings use `<h3>`. The hierarchy is generally logical, although content is client-rendered after the initial HTML shell.
- Navigation uses real React Router `<Link>` elements, which is crawlable after JavaScript execution.

Missing or incomplete standards:

- Home, Games, Emulator, and SupportUs do not render route-specific `<title>` or meta description tags. They inherit the static title from `index.html`.
- GameDetail uses `Helmet`, but only sets `title` and `description`; it has no canonical URL, Open Graph, Twitter Card, robots, or structured data.
- There is no site-wide canonical link. A SPA can otherwise expose duplicate URL variants through query strings, trailing slashes, or alternate hostnames.
- `index.html` has `lang="id"`, which is correct if the content is Indonesian. The static title contains the apparent typo `Last Bos Games` rather than `Last Boss Game`.
- Image alt text exists for the reviewed `<img>` elements, but several values are generic (`Screen 1`, `Screenshot 1`) and do not describe the game or screenshot content. Decorative imagery should use `alt=""`; meaningful imagery should use descriptive text.
- Icon-only controls in `ScreenshotLightbox` and the close button in `ReportModal` have no `aria-label`. The visual icon is not sufficient for screen readers.
- The lightbox backdrop is a clickable non-button `<div>`, and the modal/lightbox has no dialog semantics, focus management, or focus return. This is primarily accessibility, but poor accessibility can reduce usable engagement and quality signals.
- No `BreadcrumbList`, `VideoGame`, or `SoftwareApplication` JSON-LD is emitted for game detail pages.
- No `og:image` or Twitter image is emitted, despite every detail page having a Sanity thumbnail.

### Metadata recommendations

Use a shared metadata component for static routes and a data-driven version for GameDetail. The detail page should use a stable absolute site URL from an environment variable rather than hard-coding a deployment hostname:

```jsx
import { Helmet } from "react-helmet-async";

const siteUrl =
  import.meta.env.VITE_SITE_URL || "https://last-bos-games.vercel.app";
const canonicalUrl = `${siteUrl}/game/${game.slug.current}`;
const description =
  game.shortDescription || `Download information for ${game.title}.`;
const imageUrl = game.thumbnail
  ? urlFor(game.thumbnail).width(1200).height(630).format("jpg").url()
  : `${siteUrl}/icon.jpg`;

<Helmet>
  <html lang="id" />
  <title>{`${game.title} | Last Boss Game`}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalUrl} />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Last Boss Game" />
  <meta property="og:title" content={`${game.title} | Last Boss Game`} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:image" content={imageUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`${game.title} | Last Boss Game`} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={imageUrl} />
</Helmet>;
```

For the static pages, use unique titles and descriptions such as `Last Boss Game | Game Download Catalog`, `Games | Last Boss Game`, `Emulators | Last Boss Game`, and `Support Last Boss Game`. Do not use the same generic description on every route.

Recommended accessible icon controls:

```jsx
<button type="button" aria-label="Tutup galeri" onClick={onClose}>
  <X aria-hidden="true" size={28} />
</button>

<button type="button" aria-label="Screenshot sebelumnya" onClick={() => onNavigate("prev")}>
  <ChevronLeft aria-hidden="true" size={28} />
</button>

<button type="button" aria-label="Screenshot berikutnya" onClick={() => onNavigate("next")}>
  <ChevronRight aria-hidden="true" size={28} />
</button>
```

Recommended game structured data, rendered only when `game` exists:

```jsx
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description,
    image: imageUrl,
    url: canonicalUrl,
    operatingSystem: game.platform?.map((item) => item.name),
    datePublished: game.releaseYear ? `${game.releaseYear}-01-01` : undefined,
    author: game.developer
      ? { "@type": "Organization", name: game.developer }
      : undefined,
  })}
</script>
```

Validate structured data with Google's Rich Results Test and validate canonical behavior on the deployed hostname.

## 2. Crawling Bot Mechanism and Ranking Strategy

This is a client-rendered Vite SPA. The initial response contains the `#root` element, the static `index.html` title, and JavaScript/CSS references. Googlebot can fetch the HTML, then fetch and execute the JavaScript in a later rendering phase. React Router reads `/game/:slug`, `useGameDetail(slug)` queries Sanity, and the rendered page then contains the game title, description, links, and images. Other crawlers and social preview bots may not execute JavaScript reliably, so they can see only the generic shell metadata.

When a new game is uploaded to Sanity:

1. A Sanity webhook should trigger the Vercel deployment/build.
2. `npm run build` runs `scripts/generate-sitemap.mjs` before `vite build`.
3. The script queries all game slugs and writes `public/sitemap.xml`.
4. Vercel serves the rebuilt SPA and sitemap.
5. Google discovers the new URL from the sitemap or internal links, fetches the SPA, and schedules JavaScript rendering.

This is a valid baseline strategy, but the current implementation has important defects:

- `DOMAIN` ends with `/`, while generated paths begin with `/`, producing URLs such as `https://last-bos-games.vercel.app//game/god-hand`.
- The sitemap namespace is `http://www.sitemap.org/schemas/sitemap/0.9`; the standard namespace is `http://www.sitemaps.org/schemas/sitemap/0.9`.
- The generated static sitemap shown in the repository contains the double-slash defect, so it should be corrected and regenerated.
- The sitemap is generated only during a successful build. A webhook that does not trigger a build, or a failed Sanity query, leaves the deployed sitemap stale.
- The sitemap does not include image metadata, although this is optional and not required for ordinary page discovery.
- Vercel SPA fallback behavior must rewrite `/game/:slug` to `index.html`; otherwise direct bot requests can return a 404 before React Router runs. This is not configured in the shown `vite.config.js`, so verify the Vercel deployment configuration.
- A crawler may discover a newly uploaded game quickly from the sitemap, but indexing and ranking are not immediate guarantees. Rendering cost, missing server-rendered metadata, crawl demand, content uniqueness, internal links, and site authority still determine timing and ranking.

Recommended sitemap construction:

```js
const DOMAIN = "https://last-bos-games.vercel.app";
const normalizePath = (path) => `${DOMAIN}${path === "" ? "/" : path}`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map((page) => `  <url><loc>${normalizePath(page)}</loc></url>`)
  .join("\n")}
${games
  .map(
    (game) =>
      `  <url><loc>${normalizePath(`/game/${encodeURIComponent(game.slug)}`)}</loc><lastmod>${new Date(game._updatedAt).toISOString()}</lastmod></url>`,
  )
  .join("\n")}
</urlset>`;
```

Use a Sanity webhook on publish/create/update events to trigger the Vercel deploy hook. Submit the sitemap once in Google Search Console and keep it available at `/sitemap.xml`; repeated manual pings for every game are unnecessary. Search Console URL Inspection can request indexing for a small number of important URLs or when debugging, but it is not a substitute for a correct sitemap, crawlable links, and renderable metadata. Google Search Console's sitemap processing is the supported recurring discovery mechanism.

## 3. Data Pagination and Fetching Efficiency

`src/hooks/useGames.js` uses SWR correctly as a cache/revalidation layer, but it does not currently implement pagination or infinite scrolling:

- `usePopularGames` is bounded to four records and is appropriate for the home page.
- `useFilteredGames` returns every matching game with no slice, limit, cursor, or total count.
- `useEmulators` and `useSupporters` also fetch their complete collections.
- Changing any filter creates a new query string and therefore a new SWR cache key. Search input triggers a request on every keystroke, with no debounce.
- `useGameDetail` fetches one game, but interpolates `slug` and filter values directly into GROQ strings. Besides robustness concerns, values containing quotes can produce malformed queries. Use GROQ parameters.

For a catalog that may grow to hundreds or thousands of records, use offset pagination initially or cursor pagination for larger collections. A focused offset-based replacement can use `useSWR` with a page key:

```jsx
const PAGE_SIZE = 24;

export function useFilteredGames(search, platform, genre, region, page = 0) {
  const query = `*[_type == "game" && title match $search
    && ($platform == "" || $platform in platform[]->slug.current)
    && ($genre == "" || $genre in genre[]->slug.current)
    && ($region == "" || region->code == $region)]
    | order(createdAt desc) [$start...$end] {
      _id, title, slug, thumbnail, shortDescription,
      platform[]->{name}, genre[]->{name}, region->{name}
    }`;
  const params = {
    search: search ? `*${search}*` : "*",
    platform,
    genre,
    region,
    start: page * PAGE_SIZE,
    end: (page + 1) * PAGE_SIZE,
  };

  const { data, error, isLoading } = useSWR(
    [query, params],
    ([groq, groqParams]) => sanityClient.fetch(groq, groqParams),
    { revalidateOnFocus: false },
  );

  return { games: data || [], isLoading, isError: error };
}
```

For infinite scrolling, use SWR Infinite with a stable filter key and a `hasMore` signal. A visible paginated control is usually more crawlable and more accessible than an automatically loading-only list. Add `aria-label` and a disabled state to pagination controls.

Debounce search before changing the SWR key:

```jsx
const [searchInput, setSearchInput] = useState("");
const [search, setSearch] = useState("");

useEffect(() => {
  const timer = setTimeout(() => setSearch(searchInput.trim()), 300);
  return () => clearTimeout(timer);
}, [searchInput]);
```

The current unbounded `useFilteredGames`, `useEmulators`, and `useSupporters` responses can become large JSON payloads. JSON parsing, React reconciliation, card creation, and image layout all compete on the main thread. The initial four-card home query is small, but the catalog and other list routes are not protected from growth. Pagination, projection of only required fields, and lazy image loading reduce transfer and rendering work. Virtualization is only needed if a page intentionally keeps many hundreds of mounted cards.

## 4. Performance Bottlenecks and Solutions

The following findings use the requested format. Snippets are taken from the current implementation; replacement snippets are manual recommendations because this audit is read-only.

### Unbounded catalog query

- **File:** [src/hooks/useGames.js](src/hooks/useGames.js)
- **Problematic Code:**

```js
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
```

- **Issue:** Every matching game is transferred and mounted at once. As the catalog grows, this increases Sanity response time, JSON parsing, React work, memory use, and time to interactive. It also makes the catalog route less resilient on mobile connections.
- **Solution:** Add a bounded page window and GROQ parameters, then render a next/previous or load-more control:

```js
const PAGE_SIZE = 24;
const query = `*[${queryConditions}] | order(createdAt desc) [$start...$end] {
  _id, title, slug, thumbnail, shortDescription,
  platform[]->{name}, genre[]->{name}, region->{name}
}`;
const params = { start: page * PAGE_SIZE, end: (page + 1) * PAGE_SIZE };
const data = await sanityClient.fetch(query, params);
```

### Search request on every keystroke

- **File:** [src/pages/Games/index.jsx](src/pages/Games/index.jsx)
- **Problematic Code:**

```jsx
onChange={(e) => setSearch(e.target.value)}
```

- **Issue:** `useFilteredGames` uses `search` as part of its SWR key, so each typed character starts another Sanity request and can produce unnecessary server work and UI churn.
- **Solution:** Keep an input value separate and debounce the query value:

```jsx
const [searchInput, setSearchInput] = useState("");
const [search, setSearch] = useState("");

useEffect(() => {
  const timer = setTimeout(() => setSearch(searchInput.trim()), 300);
  return () => clearTimeout(timer);
}, [searchInput]);

<input
  value={searchInput}
  onChange={(event) => setSearchInput(event.target.value)}
  aria-label="Cari judul game"
/>;
```

### Fixed-size image URLs without responsive sources

- **File:** [src/components/game/GameCard.jsx](src/components/game/GameCard.jsx)
- **Problematic Code:**

```jsx
<img
  src={urlFor(game.thumbnail).width(600).height(338).url()}
  alt={`Cover ${game.title}`}
  loading="lazy"
  className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-300"
/>
```

- **Issue:** Every card requests a 600px image even when the rendered card is much narrower on mobile. There is no `srcSet`, `sizes`, explicit format, or decoding hint. This increases image bytes and can delay image rendering. Sanity can optimize transforms and deliver AVIF/WebP where supported.
- **Solution:** Provide responsive widths and reserve the aspect-ratio space already used by the card:

```jsx
const image = urlFor(game.thumbnail).auto("format").fit("crop");

<img
  src={image.width(600).height(338).url()}
  srcSet={[320, 480, 600, 900]
    .map(
      (width) =>
        `${image
          .width(width)
          .height(Math.round((width * 338) / 600))
          .url()} ${width}w`,
    )
    .join(", ")}
  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
  alt={`${game.title} cover`}
  loading="lazy"
  decoding="async"
  width="600"
  height="338"
  className="w-full h-full object-cover"
/>;
```

### Detail and gallery images are larger than necessary and lack decoding hints

- **File:** [src/pages/GameDetail/index.jsx](src/pages/GameDetail/index.jsx)
- **Problematic Code:**

```jsx
<img
  src={urlFor(game.thumbnail).width(600).url()}
  alt={game.title}
  className="w-full aspect-[3/4] object-cover"
/>

<img
  src={urlFor(img).width(300).height(200).url()}
  alt={`Screen ${idx + 1}`}
  className="w-full h-full object-cover"
/>
```

- **Issue:** The cover and gallery requests do not specify an optimized format or responsive variants. Gallery alt text is not meaningful to users or search engines, and the cover has no explicit intrinsic dimensions. The gallery can also load many images immediately on a detail page.
- **Solution:** Use Sanity format negotiation, intrinsic dimensions, lazy loading for gallery items, and descriptive alt text:

```jsx
<img
  src={urlFor(game.thumbnail).auto("format").fit("crop").width(800).height(1067).url()}
  alt={`${game.title} cover art`}
  width="800"
  height="1067"
  decoding="async"
  fetchPriority="high"
  className="w-full aspect-[3/4] object-cover"
/>

<img
  src={urlFor(img).auto("format").fit("crop").width(600).height(400).url()}
  alt={`${game.title} gameplay screenshot ${idx + 1}`}
  width="600"
  height="400"
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover"
/>
```

### Lightbox loads a large image without a stable width/height

- **File:** [src/components/game/ScreenshotLightbox.jsx](src/components/game/ScreenshotLightbox.jsx)
- **Problematic Code:**

```jsx
<img
  src={urlFor(images[currentIndex]).width(1200).url()}
  alt={`Screenshot ${currentIndex + 1}`}
  className="max-w-full max-h-[75vh] object-contain border-4 border-ink shadow-[8px_8px_0px_#0F0F0F] bg-black"
/>
```

- **Issue:** The lightbox always requests a 1200px image, even on small screens. Intrinsic dimensions are absent, so the browser has less information for layout and decoding. Generic alt text is weak for accessibility.
- **Solution:** Use an optimized image URL, dimensions from the Sanity asset when available, and a descriptive label:

```jsx
<img
  src={urlFor(images[currentIndex]).auto("format").width(1200).url()}
  alt={`${gameTitle} gameplay screenshot ${currentIndex + 1}`}
  loading="eager"
  decoding="async"
  className="max-w-full max-h-[75vh] object-contain border-4 border-ink shadow-[8px_8px_0px_#0F0F0F] bg-black"
/>
```

Pass `game.title` as `gameTitle` from GameDetail.

### Ad slots can cause layout shift and load third-party JavaScript

- **File:** [src/components/common/AdBanner.jsx](src/components/common/AdBanner.jsx)
- **Problematic Code:**

```jsx
<div className="flex justify-center items-center my-8 w-full overflow-hidden">
  <div
    className="bg-surface border-4 border-ink shadow-[4px_4px_0px_#0F0F0F] flex items-center justify-center relative overflow-hidden"
    style={{ width: width, height: height, maxWidth: "100%" }}
  >
```

- **Issue:** A fixed desktop width can overflow or be constrained on narrow screens, while third-party ad code may change its contents after the page is painted. Repeated ads and popunder/social scripts can compete for main-thread time, hurt interaction latency, and create CLS if the final rendered content does not match the reserved box. Third-party scripts are also a trust and crawl-quality risk.
- **Solution:** Reserve a responsive aspect-ratio slot with `minHeight`, load ads only after the primary content when possible, and keep the slot dimensions stable:

```jsx
<div
  className="flex justify-center items-center my-8 w-full overflow-hidden"
  style={{ minHeight: height, contain: "layout paint" }}
>
  <div
    ref={bannerRef}
    className="relative flex w-full max-w-full items-center justify-center overflow-hidden"
    style={{
      aspectRatio: `${width} / ${height}`,
      maxWidth: width,
      minHeight: height,
    }}
    aria-label="Ruang iklan"
  />
</div>
```

Audit the Adsterra scripts with a performance trace and consent/privacy review. Avoid injecting popunder/social scripts in the critical path. `NativeBanner` has the same third-party execution concern and should also reserve a known height before its script runs.

### Hero image is above-the-fold but not prioritized or dimensioned

- **File:** [src/pages/Home/index.jsx](src/pages/Home/index.jsx)
- **Problematic Code:**

```jsx
<img
  src="/hero section.jpg"
  alt="Nostalgic Boss Characters"
  className="w-full h-full object-cover object-right md:object-contain"
/>
```

- **Issue:** This is a large above-the-fold image, but it has no explicit dimensions, responsive source, `fetchPriority`, or decoding hint. It can become the Largest Contentful Paint element and compete with the initial JavaScript bundle.
- **Solution:** Export appropriately sized hero assets and provide intrinsic sizing and priority:

```jsx
<img
  src="/hero-section-1280.webp"
  srcSet="/hero-section-768.webp 768w, /hero-section-1280.webp 1280w, /hero-section-1920.webp 1920w"
  sizes="100vw"
  alt="Nostalgic game boss characters"
  width="1920"
  height="1080"
  fetchPriority="high"
  decoding="async"
  className="w-full h-full object-cover object-right md:object-contain"
/>
```

The asset filenames above are examples; generate the corresponding optimized bitmap files during the asset pipeline rather than pointing to files that do not exist.

### Missing page metadata causes poor previews and weak SPA indexing

- **File:** [src/pages/Home/index.jsx](src/pages/Home/index.jsx)
- **Problematic Code:**

```jsx
export default function Home() {
  const { games, isLoading, isError } = usePopularGames();

  return (
```

- **Issue:** Home has no `Helmet` metadata, and the same omission exists in Games, Emulator, and SupportUs. Crawlers and social bots may receive only the generic `index.html` title before or without client rendering. This weakens title relevance, snippets, and link previews.
- **Solution:** Add a route-specific metadata block near the page root:

```jsx
<Helmet>
  <title>Last Boss Game | Game Download Catalog</title>
  <meta
    name="description"
    content="Temukan katalog game, emulator, dan informasi unduhan di Last Boss Game."
  />
  <link rel="canonical" href="https://last-bos-games.vercel.app/" />
  <meta property="og:title" content="Last Boss Game | Game Download Catalog" />
  <meta
    property="og:description"
    content="Katalog game dan emulator Last Boss Game."
  />
  <meta property="og:url" content="https://last-bos-games.vercel.app/" />
</Helmet>
```

### Direct deep-link rendering must be verified

- **File:** [src/App.jsx](src/App.jsx)
- **Problematic Code:**

```jsx
<Route path="/game/:slug" element={<GameDetail />} />
```

- **Issue:** The client route is correct for in-app navigation, but a bot or user requesting `/game/example` directly needs the hosting platform to serve `index.html`. No rewrite configuration is present in the shown Vite config. A server 404 prevents both crawling and client rendering.
- **Solution:** Add a Vercel rewrite configuration outside the React route, for example in `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Verify that static assets and `/sitemap.xml` remain directly accessible and that the deployed deep link returns HTTP 200 before relying on this rule.

## Priority Order

1. Fix sitemap URLs and namespace, then verify direct deep-link HTTP 200 responses.
2. Add unique metadata, canonical URLs, Open Graph/Twitter tags, and `VideoGame` JSON-LD to GameDetail and static routes.
3. Paginate `useFilteredGames`, parameterize GROQ, and debounce search.
4. Optimize Sanity image transforms and add responsive `srcSet`, dimensions, and descriptive alt text.
5. Measure and defer third-party ads; reserve stable slots and inspect Core Web Vitals in Lighthouse and PageSpeed Insights.

Recommended validation after manual implementation: `npm run lint`, `npm run build`, XML validation for `/sitemap.xml`, Google Search Console URL Inspection, Rich Results Test, and Lighthouse mobile runs on `/`, `/games`, and a representative `/game/:slug` URL.
