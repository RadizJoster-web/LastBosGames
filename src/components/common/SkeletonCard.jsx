export default function SkeletonCard() {
  return (
    <div className="aspect-[3/4] border-4 border-ink shadow-[6px_6px_0px_#0F0F0F] bg-border-subtle animate-pulse relative overflow-hidden flex items-center justify-center">
      {/* Ornamen Loading Brutalist */}
      <div className="w-16 h-16 border-4 border-ink border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}
