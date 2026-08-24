import { useEffect, useRef } from "react";

export default function AdBanner({ dataKey, width, height }) {
  // Kita menembakkan data kunci Adsterra ke file HTML pancingan melalui URL
  const iframeSrc = `/ad-banner.html?key=${dataKey}&w=${width}&h=${height}`;

  return (
    <div
      className="flex justify-center items-center my-8 w-full overflow-hidden"
      style={{ minHeight: height, contain: "layout paint" }}
    >
      <div
        className="relative flex w-full max-w-full items-center justify-center overflow-hidden bg-surface border-4 border-ink shadow-[4px_4px_0px_#0F0F0F]"
        style={{
          aspectRatio: `${width} / ${height}`,
          maxWidth: width,
          minHeight: height,
        }}
      >
        {/* Teks neo-brutalist cadangan jika iklan lambat dimuat */}
        <span className="absolute text-ink/20 font-display font-bold uppercase tracking-widest text-[10px] text-center px-2">
          TRANSMISI <br /> IKLAN
        </span>

        {/* Iframe murni, bebas dari konflik React dan terbaca sah oleh Adsterra */}
        <iframe
          title="Adsterra Banner"
          src={iframeSrc}
          width={width}
          height={height}
          frameBorder="0"
          scrolling="no"
          className="relative z-10"
          style={{ display: "block", maxWidth: "100%" }}
        />
      </div>
    </div>
  );
}
