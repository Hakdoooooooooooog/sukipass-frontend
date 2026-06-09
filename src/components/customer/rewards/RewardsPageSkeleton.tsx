function SkeletonLine({ className }: { className: string }) {
  return (
    <span
      className={`relative block overflow-hidden bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent ${className}`}
      aria-hidden="true"
    />
  )
}

function SkeletonPanel({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-3xl border border-border/70 bg-card/50 p-5 shadow-[0_20px_44px_rgba(120,72,44,0.08)] ${className}`}>
      <SkeletonLine className="h-3 w-28 rounded-full" />
      <SkeletonLine className="mt-4 h-8 w-3/4 rounded-[10px]" />
      <SkeletonLine className="mt-2 h-4 w-1/2 rounded-full" />
    </div>
  )
}

export function RewardsProfileStatusSkeleton() {
  return <SkeletonLine className="mt-1 h-4 w-52 rounded-full" />
}

export function RewardsContentSkeleton() {
  return (
    <section className="grid gap-6 lg:col-start-2 lg:row-span-3 lg:row-start-1" aria-label="Loading rewards">
      <SkeletonPanel />
      <div className="grid gap-3.5">
        <div className="flex items-center justify-between">
          <SkeletonLine className="h-6 w-36 rounded-[8px]" />
          <SkeletonLine className="h-4 w-16 rounded-full" />
        </div>
        <div className="grid gap-3.5 xl:grid-cols-2">
          <SkeletonPanel className="min-h-[156px]" />
          <SkeletonPanel className="min-h-[156px]" />
        </div>
      </div>
      <div className="grid gap-3.5">
        <SkeletonLine className="h-6 w-24 rounded-[8px]" />
        <SkeletonPanel />
      </div>
    </section>
  )
}
