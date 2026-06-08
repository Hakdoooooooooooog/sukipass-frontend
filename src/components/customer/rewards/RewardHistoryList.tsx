import { Gift } from 'lucide-react'
import type { CustomerRewardHistoryItem } from '@/lib/customer/rewards'
import { timeAgo } from '@/lib/customer/date'
import { RewardsSectionEmpty } from './RewardsSection'

export function RewardHistoryList({ items }: { items: CustomerRewardHistoryItem[] }) {
  if (!items.length) {
    return <RewardsSectionEmpty>Wala pang na-claim na reward. Soon ka na!</RewardsSectionEmpty>
  }

  return (
    <ul className="m-0 overflow-hidden rounded-[22px] border border-border bg-card/70 p-0 shadow-[0_18px_40px_rgba(120,72,44,0.08)]">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-3.5 border-t border-border p-4 first:border-t-0">
          <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground">
            <Gift size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="m-0 font-extrabold text-foreground">{item.rewardName}</p>
            <small className="mt-0.5 block overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">{item.campaignName}</small>
          </div>
          <time className="font-mono text-xs text-muted-foreground" dateTime={item.redeemedAt}>
            {timeAgo(item.redeemedAt)}
          </time>
        </li>
      ))}
    </ul>
  )
}
