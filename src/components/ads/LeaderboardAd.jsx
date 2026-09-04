import AdFrame from "./AdFrame";

// ============================================================
// LeaderboardAd — slot lebar "di atas footer / di bawah hero".
// Desktop (lg+): 728x90.  Di bawah lg: 300x250 (728 tidak dipaksakan ke mobile).
//
// GANTI KEY DI SINI untuk mengelola unit iklan ini.
// ============================================================
const KEY_728 = "b7bbce8413a0352f77ccd779ba193a61"; // Adsterra 728x90
const KEY_300 = "15f3025432f4873e780149c8ad7d739a"; // Adsterra 300x250

export default function LeaderboardAd({ className = "" }) {
  return (
    <div className={`flex justify-center ${className}`} aria-label="Iklan">
      <div className="hidden lg:block">
        <AdFrame adKey={KEY_728} w={728} h={90} />
      </div>
      <div className="lg:hidden">
        <AdFrame adKey={KEY_300} w={300} h={250} />
      </div>
    </div>
  );
}
