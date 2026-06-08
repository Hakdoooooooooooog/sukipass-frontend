import { Check, Coffee, Gift, QrCode } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import { customer, type StampCard } from '@/customerData'
import { getCustomerStampCards } from '@/lib/customer/stamp-cards'
import { cn } from '@/lib/utils'

const cardByAccent = {
  gold: 'bg-[#dda947] text-foreground',
  terra: 'bg-[#cf553d] text-[#fff3e5]',
  forest: 'bg-[#2f4f3e] text-[#eaf3ec]',
}

const filledStampByAccent = {
  gold: 'bg-[#cf553d] text-[#ffeecf]',
  terra: 'bg-[#dda947] text-foreground',
  forest: 'bg-[#dda947] text-foreground',
}

function StampGrid({ filled, goal, accent }: Pick<StampCard, 'filled' | 'goal' | 'accent'>) {
  const ready = filled >= goal
  const maxVisibleSlots = 6
  const visibleSlots = Math.min(goal, maxVisibleSlots)
  const compacted = goal > maxVisibleSlots
  const shownFilled = ready ? visibleSlots : compacted ? Math.min(filled, visibleSlots - 1) : Math.min(filled, visibleSlots)
  const latestIndex = ready ? -1 : shownFilled - 1

  return (
    <div
      className={cn('flex max-w-full flex-wrap gap-[7px]', ready && 'is-ready')}
      aria-label={`${Math.min(filled, goal)} of ${goal} stamps collected`}
    >
      {Array.from({ length: visibleSlots }).map((_, index) => {
        const filledSlot = index < shownFilled
        const latest = index === latestIndex
        const stampNumber = compacted && !ready && !filledSlot ? Math.min(filled + 1, goal) : index + 1

        return (
          <span
            key={index}
            className={cn(
              'inline-grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full font-mono text-[11px] leading-none transition-[transform,background,border-color] duration-200',
              filledSlot ? filledStampByAccent[accent] : 'border-2 border-dashed border-card/70 bg-transparent text-foreground/50 shadow-[inset_0_0_0_1px_rgba(36,29,24,0.08)]',
              !filledSlot && accent !== 'gold' && 'text-card/70 shadow-[inset_0_0_0_1px_rgba(36,29,24,0.12)]',
              latest && 'outline outline-2 outline-offset-2 outline-card',
              ready && 'bg-card text-foreground',
            )}
            aria-label={filledSlot ? 'Stamp marker collected' : `Stamp ${stampNumber} empty`}
            role="img"
          >
            {filledSlot && (latest ? <Check size={16} /> : <Coffee size={14} />)}
            {!filledSlot && <span>{stampNumber}</span>}
          </span>
        )
      })}
    </div>
  )
}

function stampStatus(card: StampCard) {
  const ready = card.filled >= card.goal
  const remaining = Math.max(card.goal - card.filled, 0)

  if (ready) {
    return {
      progress: `${card.goal} of ${card.goal} complete`,
      primary: 'Ready to claim',
      rewardLabel: `Claim now: ${card.reward}`,
    }
  }

  return {
    progress: `${card.filled} of ${card.goal} stamps`,
    primary: `${remaining} stamp${remaining === 1 ? '' : 's'} left`,
    rewardLabel: `Reward: ${card.reward}`,
  }
}

function ClaimBadge() {
  return (
    <span className="inline-flex min-h-[34px] shrink-0 items-center gap-1 rounded-full bg-card px-[11px] text-[11px] font-black uppercase text-foreground shadow-[0_10px_18px_rgba(36,29,24,0.14)]">
      <Check size={13} />
      Claim
    </span>
  )
}

function RewardCard({ card }: { card: StampCard }) {
  const ready = card.filled >= card.goal
  const status = stampStatus(card)
  const location = useLocation()

  return (
    <article className={cn('relative flex min-h-64 flex-col overflow-hidden rounded-[23px] p-5 shadow-[0_20px_38px_rgba(120,72,44,0.13)] xl:first:col-span-2', cardByAccent[card.accent])}>
      <span className="pointer-events-none absolute right-[-29px] top-[-44px] h-[156px] w-[156px] rounded-full bg-foreground/10" aria-hidden="true" />
      <span className="pointer-events-none absolute right-px top-[-14px] h-24 w-24 rounded-full border-[32px] border-card/10" aria-hidden="true" />

      <div className="relative z-[1] flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em]">{card.store}</span>
        <strong
          className={cn(
            'inline-grid h-[27px] min-w-[58px] place-items-center rounded-full border border-current font-mono text-[13px] font-normal opacity-70',
            ready && 'border-card/80 bg-card/20 font-extrabold opacity-100',
          )}
          aria-label={status.progress}
        >
          {card.filled}/{card.goal}
        </strong>
      </div>

      <h2 className="relative z-[1] mb-0.5 mt-3.5 font-[var(--heading)] text-[26px] leading-[1.05] tracking-normal">{card.title}</h2>
      <p className="relative z-[1] mb-[18px] mt-0 text-sm opacity-70">{card.description}</p>

      <div className="relative z-[1] flex items-start gap-2.5">
        <StampGrid filled={card.filled} goal={card.goal} accent={card.accent} />
        {ready && <ClaimBadge />}
      </div>

      <div className="relative z-[1] mt-auto flex items-end justify-between gap-3">
        <div>
          <strong className="mb-1.5 block text-sm">{status.primary}</strong>
          <p className={cn('m-0 flex items-center gap-1.5 text-sm font-extrabold text-foreground/65', card.accent !== 'gold' && 'text-card/75', ready && card.accent === 'gold' && 'text-[#c8543a]', ready && card.accent === 'terra' && 'text-[#ffe0a6]', ready && card.accent === 'forest' && 'text-[#d8eadc]')}>
            <Gift size={14} />
            {status.rewardLabel}
          </p>
        </div>
        <Link
          to={`/customer/${card.id}`}
          state={{ backgroundLocation: location }}
          className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-[15px] bg-card text-foreground no-underline transition-transform duration-200 hover:-translate-y-0.5"
          aria-label={`Open ${card.title} QR code`}
        >
          <QRCodeSVG value={customer.code} size={44} fgColor="#241d18" bgColor="transparent" level="M" marginSize={1} />
        </Link>
      </div>
    </article>
  )
}

function EmptyStampCards() {
  const location = useLocation()

  return (
    <section className="grid justify-items-start gap-[18px] rounded-[28px] border border-dashed border-[#c8543a]/30 bg-card/60 bg-[radial-gradient(circle_at_82%_12%,rgba(216,162,74,0.2),transparent_34%)] p-7 shadow-[0_24px_70px_rgba(120,72,44,0.1)] lg:col-start-2 lg:row-start-3 lg:min-h-[420px] lg:content-center lg:justify-items-center lg:text-center" aria-label="No stamp cards">
      <div className="relative grid h-[104px] w-[104px] place-items-center rounded-full bg-card text-[#c8543a] shadow-[inset_0_0_0_1px_hsl(var(--border)),0_18px_40px_rgba(120,72,44,0.12)]" aria-hidden="true">
        <span className="absolute left-5 top-5 h-[17px] w-[17px] rounded-full border-2 border-dashed border-[#d8a24a]" />
        <span className="absolute right-[18px] top-7 h-[17px] w-[17px] rounded-full border-2 border-dashed border-[#d8a24a]" />
        <span className="absolute bottom-[18px] right-8 h-[17px] w-[17px] rounded-full border-2 border-dashed border-[#d8a24a]" />
        <Coffee size={28} strokeWidth={1.9} />
      </div>
      <div>
        <p className="mb-2 mt-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c8543a]">No stamp cards yet</p>
        <h2 className="m-0 max-w-[360px] font-[var(--heading)] text-[28px] leading-[1.05] tracking-normal">Start with your first suki visit.</h2>
        <span className="mt-2.5 block max-w-[420px] text-[15px] leading-[1.45] text-muted-foreground">Ask the cashier to scan your code after purchase. Your first card will appear here.</span>
      </div>
      <Link to="/customer/member-code" state={{ backgroundLocation: location }} className="inline-flex min-h-[46px] items-center justify-center gap-[9px] rounded-[14px] bg-[#c8543a] px-4 font-extrabold text-card no-underline shadow-[0_16px_34px_rgba(200,84,58,0.22)] transition-[transform,background] duration-200 hover:-translate-y-0.5 hover:bg-[#b94831]">
        Show my code
        <QrCode size={17} />
      </Link>
    </section>
  )
}

export default function CustomerStampCards() {
  const stampCards = getCustomerStampCards(customer.id)
  const readyCount = stampCards.filter((card) => card.filled >= card.goal).length

  return (
    <>
      <div className="mb-[18px] mt-2.5 flex items-center justify-between lg:col-start-2 lg:row-start-1 lg:m-0 lg:pt-1">
        <h2 className="m-0 font-[var(--heading)] text-lg tracking-normal lg:text-3xl">Your stamp cards</h2>
        <span className="font-mono text-sm tracking-[0.14em] text-foreground/80 lg:text-base">{readyCount} ready</span>
      </div>

      {stampCards.length > 0 && (
        <p className="mb-2.5 ml-1 mt-0 flex items-center gap-[7px] font-mono text-xs leading-none tracking-[0.14em] text-[#c8543a] lg:col-start-2 lg:row-start-2 lg:m-0 lg:mt-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8543a]" /> READY - IPAKITA SA CASHIER
        </p>
      )}

      {stampCards.length > 0 ? (
        <section className="grid gap-4 lg:col-start-2 lg:row-start-3 lg:gap-[18px] xl:grid-cols-2" aria-label="Stamp cards">
          {stampCards.map((card) => (
            <RewardCard key={card.id} card={card} />
          ))}
        </section>
      ) : (
        <EmptyStampCards />
      )}
    </>
  )
}
