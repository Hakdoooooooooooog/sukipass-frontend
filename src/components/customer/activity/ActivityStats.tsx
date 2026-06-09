import { CircleDollarSign, Coffee, Gift } from 'lucide-react'
import { peso } from '@/lib/customer/format'

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="grid justify-items-center gap-1.5 border-l border-border px-2 py-[17px] text-center text-muted-foreground first:border-l-0">
      <span aria-hidden="true">{icon}</span>
      <p className="m-0 font-[var(--heading)] text-[22px] leading-none text-foreground">{value}</p>
      <small className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{label}</small>
    </div>
  )
}

export function ActivityStats({
  stampCount,
  rewardCount,
  totalSpent,
}: {
  stampCount: number
  rewardCount: number
  totalSpent: number
}) {
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded-3xl border border-border bg-card/70 shadow-[0_18px_44px_rgba(120,72,44,0.08)]">
      <Stat icon={<Coffee size={18} />} value={stampCount} label="Stamps" />
      <Stat icon={<Gift size={18} />} value={rewardCount} label="Rewards" />
      <Stat icon={<CircleDollarSign size={18} />} value={peso(totalSpent)} label="Spent" />
    </div>
  )
}
