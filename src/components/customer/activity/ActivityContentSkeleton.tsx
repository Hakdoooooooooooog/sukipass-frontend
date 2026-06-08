function SkeletonLine({ className }: { className: string }) {
  return (
    <span
      className={`relative block overflow-hidden bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent ${className}`}
      aria-hidden="true"
    />
  )
}

function ActivityRowSkeleton() {
  return (
    <div className="flex min-h-[74px] items-center gap-[13px] border-t border-border p-4 first:border-t-0">
      <SkeletonLine className="h-[42px] w-[42px] shrink-0 rounded-full" />
      <div className="min-w-0 flex-1">
        <SkeletonLine className="h-4 w-3/4 rounded-full" />
        <SkeletonLine className="mt-2 h-3 w-1/2 rounded-full" />
      </div>
      <SkeletonLine className="h-4 w-12 rounded-full" />
    </div>
  )
}

export function ActivityContentSkeleton() {
  return (
    <section className="grid gap-6 lg:col-start-2 lg:row-span-3 lg:row-start-1" aria-label="Loading activity">
      <div className="grid grid-cols-3 overflow-hidden rounded-3xl border border-border bg-card/70 shadow-[0_18px_44px_rgba(120,72,44,0.08)]">
        {[0, 1, 2].map((item) => (
          <div key={item} className="grid justify-items-center gap-1.5 border-l border-border px-2 py-[17px] first:border-l-0">
            <SkeletonLine className="h-5 w-5 rounded-full" />
            <SkeletonLine className="h-6 w-12 rounded-[8px]" />
            <SkeletonLine className="h-3 w-14 rounded-full" />
          </div>
        ))}
      </div>

      <div className="grid gap-6">
        <section className="grid gap-2.5">
          <SkeletonLine className="h-4 w-36 rounded-full" />
          <div className="overflow-hidden rounded-3xl border border-border bg-card/70 shadow-[0_18px_44px_rgba(120,72,44,0.08)]">
            <ActivityRowSkeleton />
            <ActivityRowSkeleton />
            <ActivityRowSkeleton />
          </div>
        </section>
      </div>
    </section>
  )
}
