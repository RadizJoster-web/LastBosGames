// Ladang kelopak sakura dekoratif. Dinonaktifkan otomatis lewat CSS
// pada prefers-reduced-motion (lihat index.css).
export default function SakuraField({ count = 14, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 97) % 100;
        const delay = -(i * 1.37) % 11;
        const duration = 9 + ((i * 7) % 8);
        return (
          <span
            key={i}
            className="petal"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
