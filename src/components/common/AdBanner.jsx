import { useEffect, useRef } from "react";

export default function AdBanner({ dataKey, width, height }) {
  const bannerRef = useRef(null);

  useEffect(() => {
    // Mencegah render ganda bawaan React StrictMode
    if (bannerRef.current && bannerRef.current.innerHTML !== "") return;

    const conf = document.createElement("script");
    conf.type = "text/javascript";
    conf.innerHTML = `
      atOptions = {
        'key' : '${dataKey}',
        'format' : 'iframe',    
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `;

    const script = document.createElement("script");
    script.type = "text/javascript";
    // Menggunakan domain spesifik dari Adsterra Anda
    script.src = `https://www.highrevenueformat.com/${dataKey}/invoke.js`;

    if (bannerRef.current) {
      bannerRef.current.appendChild(conf);
      bannerRef.current.appendChild(script);
    }
  }, [dataKey, height, width]);

  return (
    <div
      className="flex justify-center items-center my-8 w-full overflow-hidden"
      style={{ minHeight: height, contain: "layout paint" }} // Mengisolasi proses render[cite: 1]
    >
      <div
        ref={bannerRef}
        className="relative flex w-full max-w-full items-center justify-center overflow-hidden bg-surface border-4 border-ink shadow-[4px_4px_0px_#0F0F0F]"
        style={{
          aspectRatio: `${width} / ${height}`, // Menjaga rasio aspek di layar kecil[cite: 1]
          maxWidth: width, //[cite: 1]
          minHeight: height, //[cite: 1]
        }}
        aria-label="Ruang iklan" // Aksesibilitas SEO[cite: 1]
      >
        {/* Teks cadangan jika iklan diblokir AdBlocker */}
        <span className="absolute text-ink/20 font-display font-bold uppercase tracking-widest text-[10px] text-center px-2">
          TRANSMISI <br /> IKLAN
        </span>
      </div>
    </div>
  );
}
