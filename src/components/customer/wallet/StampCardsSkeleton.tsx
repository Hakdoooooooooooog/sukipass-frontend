export function StampCardsSkeleton() {
  return (
    <>
      <div className="mb-[18px] mt-2.5 flex min-h-[30px] items-center justify-between lg:col-start-2 lg:row-start-1 lg:m-0 lg:pt-1" aria-hidden="true">
        <span className="relative block h-[30px] w-[210px] overflow-hidden rounded-[10px] bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
        <span className="relative block h-[18px] w-[62px] overflow-hidden rounded-full bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
      </div>
      <p className="mb-2.5 ml-1 mt-0 flex h-4 items-center gap-[7px] font-mono text-xs leading-none tracking-[0.14em] text-[#c8543a] lg:col-start-2 lg:row-start-2 lg:m-0 lg:mt-0.5" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-[#c8543a]" />
        <span className="relative block h-3 w-[210px] overflow-hidden rounded-full bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
      </p>
      <section className="grid gap-4 lg:col-start-2 lg:row-start-3 lg:gap-[18px] xl:grid-cols-2" aria-label="Loading stamp cards">
        {[0, 1, 2].map((index) => (
          <article
            key={index}
            className="relative flex h-64 max-h-64 flex-col overflow-hidden rounded-[23px] border border-border/70 bg-card/50 bg-[radial-gradient(circle_at_88%_0%,rgba(216,162,74,0.16),transparent_32%)] p-5 shadow-[0_20px_38px_rgba(120,72,44,0.08)] xl:first:col-span-2"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="relative block h-2.5 w-[86px] overflow-hidden rounded-full bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
              <span className="relative block h-[27px] w-[58px] overflow-hidden rounded-full bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
            </div>
            <span className="relative mt-7 block h-7 w-[58%] max-w-[220px] overflow-hidden rounded-[10px] bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
            <span className="relative mt-[9px] block h-3.5 w-[74%] max-w-[320px] overflow-hidden rounded-full bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
            <div className="mt-[22px] flex gap-[9px]">
              {Array.from({ length: 6 }).map((_, stampIndex) => (
                <span key={stampIndex} className="relative block h-9 w-9 overflow-hidden rounded-full bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
              ))}
            </div>
            <div className="mt-auto flex items-center justify-between gap-3">
              <div className="grid gap-2">
                <span className="relative block h-3.5 w-28 overflow-hidden rounded-full bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
                <span className="relative block h-[15px] w-[190px] overflow-hidden rounded-full bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
              </div>
              <span className="relative block h-[60px] w-[60px] shrink-0 overflow-hidden rounded-[15px] bg-card/70 after:absolute after:inset-0 after:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent" />
            </div>
          </article>
        ))}
      </section>
    </>
  )
}
