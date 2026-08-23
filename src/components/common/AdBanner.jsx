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
    <div className="flex justify-center items-center my-8 w-full overflow-hidden">
      <div
        className="bg-surface border-4 border-ink shadow-[4px_4px_0px_#0F0F0F] flex items-center justify-center relative overflow-hidden"
        style={{ width: width, height: height, maxWidth: "100%" }}
      >
        <span className="absolute text-ink/20 font-display font-bold uppercase tracking-widest text-[10px] text-center px-2">
          TRANSMISI <br /> IKLAN
        </span>
        <div
          ref={bannerRef}
          className="relative z-10 w-full h-full flex justify-center"
        ></div>
      </div>
    </div>
  );
}
