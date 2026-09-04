// ============================================================
// AdRow — menata beberapa unit iklan BERSAMPINGAN.
// Sampingan di layar cukup lebar, menumpuk di layar sempit.
//
// Contoh:
//   <AdRow><RectangleAd /><RectangleAd /></AdRow>
// ============================================================
export default function AdRow({ children, className = "" }) {
  return (
    <div
      className={`flex flex-wrap items-start justify-center gap-4 ${className}`}
      aria-label="Iklan"
    >
      {children}
    </div>
  );
}
