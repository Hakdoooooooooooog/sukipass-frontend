import { Trophy } from 'lucide-react'

export function RewardsHero() {
  return (
    <div className="flex items-center justify-between gap-5 rounded-3xl bg-card/60 bg-[radial-gradient(circle_at_90%_12%,rgba(216,162,74,0.22),transparent_36%)] p-5 shadow-[0_20px_50px_rgba(120,72,44,0.1)]">
      <div>
        <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c8543a]">Rewards</p>
        <h2 className="mb-0 mt-1.5 max-w-[360px] font-[var(--heading)] text-3xl leading-[1.04] tracking-normal">Claim what you earned.</h2>
      </div>
      <Trophy className="h-[54px] w-[54px] shrink-0 rounded-[18px] bg-[#dda947] p-[13px] text-foreground" size={30} />
    </div>
  )
}
