import { useEffect } from "react";

export default function NativeBanner() {
  useEffect(() => {
    // Memuat script native banner hanya sekali
    const scriptId = "adsterra-native-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.async = true;
      script.dataset.cfasync = "false";
      script.src =
        "https://temptedrecognise.com/907c3f9501e527d753aa90d171feed31/invoke.js";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full my-10 p-4 border-4 border-ink bg-surface shadow-[6px_6px_0px_#0F0F0F] relative overflow-hidden">
      <div className="mt-4 flex justify-center w-full">
        {/* Container div wajib yang diminta Adsterra */}
        <div id="container-907c3f9501e527d753aa90d171feed31"></div>
      </div>
    </div>
  );
}
