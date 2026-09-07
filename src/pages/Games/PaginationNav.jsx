import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationNav({ page, totalPages, setPage }) {
  const goTo = (pageNumber) => {
    setPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className="mt-14 flex items-center justify-center gap-1.5 sm:gap-2"
      aria-label="Navigasi halaman"
    >
      <button
        onClick={() => goTo(Math.max(0, page - 1))}
        disabled={page === 0}
        aria-label="Halaman sebelumnya"
        className={`inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-line bg-carbon px-2.5
          font-head text-xs font-semibold uppercase tracking-widest text-ink transition-colors
          hover:border-accent/40 disabled:pointer-events-none disabled:opacity-30 sm:px-3`}
      >
        <ChevronLeft size={15} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      <div className="no-scrollbar flex items-center gap-1 overflow-x-auto sm:gap-1.5">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index;
          const isActive = page === pageNumber;
          const isNearCurrent = Math.abs(pageNumber - page) <= 1;
          const isFirstOrLast =
            pageNumber === 0 || pageNumber === totalPages - 1;

          if (!isNearCurrent && !isFirstOrLast) {
            if (pageNumber === 1 || pageNumber === totalPages - 2) {
              return (
                <span
                  key={pageNumber}
                  className="px-0.5 font-head text-sm text-ink-faint"
                >
                  …
                </span>
              );
            }
            return null;
          }

          return (
            <button
              key={pageNumber}
              onClick={() => goTo(pageNumber)}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg px-1.5 font-head text-sm font-bold transition-colors ${
                isActive
                  ? "bg-accent text-white"
                  : "border border-line bg-carbon text-ink-dim hover:border-accent/40 hover:text-ink"
              }`}
            >
              {pageNumber + 1}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => goTo(Math.min(totalPages - 1, page + 1))}
        disabled={page >= totalPages - 1}
        aria-label="Halaman berikutnya"
        className={`inline-flex h-9 shrink-0 items-center gap-1 rounded-lg border border-line bg-carbon px-2.5
          font-head text-xs font-semibold uppercase tracking-widest text-ink transition-colors
          hover:border-accent/40 disabled:pointer-events-none disabled:opacity-30 sm:px-3`}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={15} />
      </button>
    </nav>
  );
}
