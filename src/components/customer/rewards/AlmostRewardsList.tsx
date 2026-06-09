import type { StampCard } from '@/customerData'
import { cn } from '@/lib/utils'

const dotByAccent = {
  gold: 'bg-[#dda947]',
  terra: 'bg-[#dda947]',
  forest: 'bg-[#dda947]',
}

export function AlmostRewardsList({ cards }: { cards: StampCard[] }) {
  if (!cards.length) return null

  return (
    <ul className="m-0 overflow-hidden rounded-[22px] border border-border bg-card/70 p-0 shadow-[0_18px_40px_rgba(120,72,44,0.08)]">
      {cards.map((card) => {
        const remaining = card.goal - card.filled
        return (
          <li key={card.id} className="flex items-center gap-3.5 border-t border-border p-4 first:border-t-0">
            <div className="min-w-0 flex-1">
              <p className="m-0 font-extrabold text-foreground">{card.title}</p>
              <div className="mt-2 flex gap-1" aria-hidden="true">
                {Array.from({ length: card.goal }).map((_, index) => (
                  <span key={index} className={cn('h-[7px] w-[7px] rounded-full bg-border', index < card.filled && dotByAccent[card.accent])} />
                ))}
              </div>
            </div>
            <strong className="grid justify-items-end font-mono text-sm font-normal text-muted-foreground">
              {card.filled}/{card.goal}
              <span className="mt-0.5 font-sans text-xs font-extrabold text-[#c8543a]">
                {remaining === 1 ? '1 na lang' : `${remaining} pa`}
              </span>
            </strong>
          </li>
        )
      })}
    </ul>
  )
}
