function Shimmer({ className }: { className: string }) {
  return (
    <span
      className={`relative overflow-hidden bg-card/70 before:absolute before:inset-y-0 before:w-1/2 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] ${className}`}
    />
  )
}

export function CashierHomeMetaSkeleton() {
  return <Shimmer className="h-4 w-16 rounded-full" />
}

export function CashierMetricsSkeleton() {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-[22px] border border-border/80 bg-card/70 p-4 shadow-[0_18px_42px_rgba(120,72,44,0.08)]">
          <Shimmer className="mb-3 block h-5 w-5 rounded-md" />
          <Shimmer className="block h-8 w-10 rounded-lg" />
          <Shimmer className="mt-2 block h-3 w-14 rounded-full" />
        </div>
      ))}
    </div>
  )
}

export function RecentSukisSkeleton() {
  return (
    <div className="grid gap-2.5">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 rounded-[22px] border border-border/80 bg-card/70 p-3.5 shadow-[0_18px_42px_rgba(120,72,44,0.1)]">
          <Shimmer className="block h-12 w-12 shrink-0 rounded-[17px]" />
          <span className="grid flex-1 gap-2">
            <Shimmer className="block h-4 w-28 rounded-full" />
            <Shimmer className="block h-3 w-24 rounded-full" />
          </span>
          <span className="grid justify-items-end gap-2">
            <Shimmer className="block h-5 w-7 rounded-full" />
            <Shimmer className="block h-3 w-12 rounded-full" />
          </span>
        </div>
      ))}
    </div>
  )
}

export function ActiveCampaignsSkeleton() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-[24px] border border-border/80 bg-card/70 p-4 shadow-[0_20px_38px_rgba(120,72,44,0.1)]">
          <div className="flex items-start justify-between gap-4">
            <span className="grid flex-1 gap-3">
              <Shimmer className="block h-3 w-16 rounded-full" />
              <Shimmer className="block h-7 w-32 rounded-lg" />
              <Shimmer className="block h-7 w-24 rounded-lg" />
            </span>
            <Shimmer className="block h-10 w-14 rounded-full" />
          </div>
          <Shimmer className="mt-5 block h-4 w-36 rounded-full" />
        </div>
      ))}
    </div>
  )
}
