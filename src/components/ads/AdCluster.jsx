import RectangleAd from "./RectangleAd";
import LeaderboardAd from "./LeaderboardAd";

// ============================================================
// AdCluster — kluster iklan "di atas footer".
//
// - Layar sangat lebar (2xl / >=1536px): 2 rectangle mengapit 2 leaderboard
//   yang ditumpuk, rata kanan-bawah (desain desktop).
// - Di bawah itu (laptop, tablet, mobile): semua ditumpuk vertikal & rata
//   tengah — tidak berdesakan, tidak ada scroll horizontal.
// ============================================================
export default function AdCluster({ className = "" }) {
  return (
    <div
      className={`flex flex-col items-center gap-4 2xl:flex-row 2xl:items-end 2xl:justify-end ${className}`}
    >
      <RectangleAd />
      <div className="flex flex-col items-center gap-4">
        <LeaderboardAd />
        <LeaderboardAd />
      </div>
      <RectangleAd />
    </div>
  );
}
