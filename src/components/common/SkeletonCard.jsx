export default function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line-soft bg-panel">
      <div className="skeleton aspect-[3/4] w-full rounded-none" />
      <div className="flex flex-col gap-3 p-4">
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-4 w-2/5" />
        <div className="mt-1 flex justify-between border-t border-line-soft pt-3">
          <div className="skeleton h-3 w-24" />
          <div className="skeleton h-3 w-10" />
        </div>
      </div>
    </div>
  );
}
