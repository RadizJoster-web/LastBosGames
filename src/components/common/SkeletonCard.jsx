export default function SkeletonCard() {
  return (
    <div className="bg-surface border-4 border-ink shadow-[6px_6px_0px_#0F0F0F] flex flex-col h-full animate-pulse">
      {/* Gambar Skeleton */}
      <div className="w-full aspect-[16/9] bg-border-subtle border-b-4 border-ink"></div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Judul Skeleton */}
        <div className="h-8 bg-border-subtle mb-4 w-3/4 border-2 border-ink"></div>

        {/* Deskripsi Skeleton */}
        <div className="space-y-2 mb-6 flex-grow">
          <div className="h-4 bg-border-subtle w-full border border-ink"></div>
          <div className="h-4 bg-border-subtle w-5/6 border border-ink"></div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-between border-t-2 border-ink border-dashed pt-4 mt-auto">
          <div className="h-6 bg-border-subtle w-20 border border-ink"></div>
          <div className="h-6 bg-border-subtle w-16 border border-ink"></div>
        </div>
      </div>
    </div>
  );
}
