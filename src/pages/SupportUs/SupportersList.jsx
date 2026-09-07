const SHELL = "mx-auto max-w-[1200px] px-5 md:px-8";

export default function SupportersList({ supporters, isLoading, isError }) {
  return (
    <div className={`${SHELL} py-16 md:py-20`}>
      <div className="text-center">
        <p className="kicker justify-center">
          <span>Hall of Fame</span>
          <span className="font-jp not-italic">殿堂</span>
        </p>
        <h2 className="mt-5 font-head text-3xl font-medium tracking-tight md:text-4xl">
          Para penakluk
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-ink-dim">
          Terima kasih kepada semua yang telah mengirim suplai. Nama kalian
          terukir di sini.
        </p>
      </div>

      {isError && (
        <p className="mt-10 rounded-xl border border-accent/30 bg-accent/[0.05] p-5 text-center text-sm text-ink-dim">
          Gagal memuat data pendukung.
        </p>
      )}

      {isLoading ? (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-28" />
          ))}
        </div>
      ) : supporters?.length > 0 ? (
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {supporters.map((supporter) => (
            <li
              key={supporter._id}
              className="panel p-5 transition-colors hover:border-accent/30"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="line-clamp-1 font-head text-base font-semibold text-accent-bright">
                  {supporter.username}
                </h3>
                {supporter.donationDate && (
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                    {new Date(supporter.donationDate).toLocaleDateString(
                      "id-ID",
                    )}
                  </span>
                )}
              </div>
              {supporter.optionalMessage && (
                <p className="mt-3 border-l-2 border-line pl-3 text-sm italic text-ink-dim">
                  “{supporter.optionalMessage}”
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-12 text-center">
          <span className="font-jp text-2xl text-ink-faint">最初の一人</span>
          <p className="mt-3 text-sm text-ink-dim">
            Belum ada pendukung terdaftar. Jadilah yang pertama.
          </p>
        </div>
      )}
    </div>
  );
}
