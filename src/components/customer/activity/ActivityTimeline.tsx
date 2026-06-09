import { ChevronRight, Coffee, Gift, Sparkles } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { RewardActivity } from '@/customerData'
import { activityAccent, activityItemsPreview, activityLine, type ActivityDayGroup } from '@/lib/customer/activity'
import { peso } from '@/lib/customer/format'
import { timeAgo } from '@/lib/customer/date'
import { cn } from '@/lib/utils'

const iconByType = {
  stamp: Coffee,
  redeem: Gift,
  join: Sparkles,
  campaign: Sparkles,
}

const chipByAccent = {
  gold: 'bg-[#d8a24a]/25 text-foreground',
  terra: 'bg-[#c8543a]/15 text-[#b94831]',
  forest: 'bg-[#2f4f3e]/15 text-[#2f4f3e]',
}

function ActivityRow({ item }: { item: RewardActivity }) {
  const location = useLocation()
  const Icon = iconByType[item.type]
  const preview = activityItemsPreview(item)
  const clickable = (item.type === 'stamp' || item.type === 'redeem') && !!item.receipt
  const line = activityLine(item)
  const content = (
    <>
      <span className={cn('relative z-[1] grid h-[42px] w-[42px] shrink-0 place-items-center rounded-full', chipByAccent[activityAccent(item)])}>
        <Icon size={20} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap font-extrabold text-foreground">{line}</p>
        {preview && <small className="mt-0.5 block overflow-hidden text-ellipsis whitespace-nowrap text-sm text-muted-foreground">{preview}</small>}
      </div>
      <div className="grid shrink-0 justify-items-end gap-0.5">
        {typeof item.amount === 'number' && <strong className="font-mono text-sm text-foreground">{peso(item.amount)}</strong>}
        <span className="flex items-center gap-0.5 font-mono text-xs text-muted-foreground">
          {timeAgo(item.at)}
          {clickable && <ChevronRight size={16} aria-hidden="true" />}
        </span>
      </div>
    </>
  )

  return (
    <li className="border-t border-border first:border-t-0">
      {clickable ? (
        <Link
          to={`/customer/activity/${item.id}`}
          state={{ backgroundLocation: location }}
          className="flex min-h-[74px] items-center gap-[13px] p-4 text-inherit no-underline transition-colors duration-200 hover:bg-secondary/60"
          aria-label={`Tingnan ang resibo - ${line}`}
        >
          {content}
        </Link>
      ) : (
        <div className="flex min-h-[74px] items-center gap-[13px] p-4">{content}</div>
      )}
    </li>
  )
}

export function ActivityTimeline({ groups }: { groups: ActivityDayGroup[] }) {
  if (!groups.length) {
    return (
      <div className="grid justify-items-center rounded-3xl border border-dashed border-[#c8543a]/30 bg-card/60 px-6 py-[38px] text-center">
        <span className="grid h-[54px] w-[54px] place-items-center rounded-full bg-secondary text-muted-foreground">
          <Sparkles size={26} />
        </span>
        <h2 className="mb-1 mt-3.5 font-[var(--heading)] text-[22px] tracking-normal">Wala pang activity</h2>
        <p className="m-0 text-sm text-muted-foreground">Lalabas dito ang iyong mga stamp at reward.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {groups.map((group) => (
        <section key={group.key} className="grid gap-2.5">
          <h2 className="m-0 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.13em] text-muted-foreground">
            <span className="h-[7px] w-[7px] rounded-full bg-border" />
            {group.label}
          </h2>

          <ul className="relative m-0 overflow-hidden rounded-3xl border border-border bg-card/70 p-0 shadow-[0_18px_44px_rgba(120,72,44,0.08)]">
            {group.items.length > 1 && <span className="absolute bottom-8 left-9 top-8 w-px bg-border" aria-hidden="true" />}
            {group.items.map((item) => (
              <ActivityRow key={item.id} item={item} />
            ))}
          </ul>
        </section>
      ))}
      <div className="flex items-center justify-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
        <span className="h-px w-[34px] bg-border" />
        Iyan na muna
        <span className="h-px w-[34px] bg-border" />
      </div>
    </div>
  )
}
