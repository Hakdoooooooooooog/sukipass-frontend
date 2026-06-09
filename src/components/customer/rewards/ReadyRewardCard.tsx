import { QrCode } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import type { StampCard } from '@/customerData'
import { cn } from '@/lib/utils'

const rewardByAccent = {
  gold: 'bg-[#dda947] text-foreground',
  terra: 'bg-[#cf553d] text-[#fff3e5]',
  forest: 'bg-[#2f4f3e] text-[#eaf3ec]',
}

export function ReadyRewardCard({ card }: { card: StampCard }) {
  const location = useLocation()

  return (
    <article className={cn('relative flex min-h-[156px] items-end justify-between gap-4 overflow-hidden rounded-3xl p-5 shadow-[0_20px_44px_rgba(120,72,44,0.12)] after:absolute after:right-[-42px] after:top-[-58px] after:h-[150px] after:w-[150px] after:rounded-full after:bg-foreground/10', rewardByAccent[card.accent])}>
      <div className="relative z-[1]">
        <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-inherit opacity-80">Ready - ipakita sa cashier</p>
        <h3 className="mb-1.5 mt-3 max-w-[360px] font-[var(--heading)] text-[26px] leading-none tracking-normal">{card.reward}</h3>
        <span className="text-sm opacity-75">{card.title}</span>
      </div>
      <Link
        to={`/customer/${card.id}`}
        state={{ backgroundLocation: location }}
        className="relative z-[1] grid h-[58px] w-[58px] shrink-0 place-items-center rounded-2xl bg-card text-foreground no-underline"
        aria-label={`Open ${card.title} QR`}
      >
        <QrCode size={22} />
      </Link>
    </article>
  )
}
