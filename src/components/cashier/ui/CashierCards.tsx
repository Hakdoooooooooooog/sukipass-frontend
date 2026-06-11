import { Check, Coffee, Mail, Phone, Stamp, UserRound } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { CashierCampaign, CashierCustomer } from '@/lib/cashier/types'
import { cn } from '@/lib/utils'

const accentCard = {
  gold: 'bg-[#dda947] text-foreground',
  terra: 'bg-[#cf553d] text-[#fff3e5]',
  forest: 'bg-[#2f4f3e] text-[#eaf3ec]',
}

const accentDot = {
  gold: 'bg-[#dda947]',
  terra: 'bg-[#cf553d]',
  forest: 'bg-[#2f4f3e]',
}

export function CashierSection({
  title,
  meta,
  children,
  className,
}: {
  title: string
  meta?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('grid gap-3.5', className)}>
      <div className="flex items-end justify-between gap-3">
        <h2 className="m-0 font-[var(--heading)] text-xl leading-none tracking-normal text-foreground lg:text-2xl">{title}</h2>
        {meta && <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{meta}</span>}
      </div>
      {children}
    </section>
  )
}

export function CustomerAvatar({ name }: { name: string }) {
  return (
    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[17px] bg-[#2f4f3e] font-[var(--heading)] text-lg text-[#eaf3ec] shadow-[0_14px_28px_rgba(47,79,62,0.18)]">
      {name.trim().slice(0, 1).toUpperCase() || <UserRound size={18} />}
    </span>
  )
}

export function CustomerListCard({ customer }: { customer: CashierCustomer }) {
  return (
    <Link
      to={`/cashier/customers/${customer.id}`}
      className="group flex items-center gap-3 rounded-[22px] border border-border/80 bg-card/70 p-3.5 text-foreground no-underline shadow-[0_18px_42px_rgba(120,72,44,0.1)] transition-[background,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-[#c8543a]/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <CustomerAvatar name={customer.nickname} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-bold leading-tight">{customer.nickname}</span>
        <span className="mt-1 block truncate font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{customer.code}</span>
      </span>
      <span className="grid min-w-14 justify-items-end">
        <span className="font-mono text-lg font-bold tabular-nums">{customer.totalStamps}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">stamps</span>
      </span>
    </Link>
  )
}

export function CustomerContact({ customer }: { customer: CashierCustomer }) {
  return (
    <div className="grid gap-2">
      {customer.phone && (
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Phone size={15} />
          {customer.phone}
        </span>
      )}
      {customer.email && (
        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Mail size={15} />
          {customer.email}
        </span>
      )}
    </div>
  )
}

export function CampaignCard({ campaign, compact = false }: { campaign: CashierCampaign; compact?: boolean }) {
  return (
    <article className={cn('relative overflow-hidden rounded-[24px] p-5 shadow-[0_20px_38px_rgba(120,72,44,0.13)]', accentCard[campaign.accent], compact && 'p-4')}>
      <span className="pointer-events-none absolute right-[-28px] top-[-42px] h-36 w-36 rounded-full bg-foreground/10" aria-hidden="true" />
      <div className="relative z-[1] flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="m-0 font-mono text-[10px] uppercase tracking-[0.14em] opacity-75">{campaign.customerCount} sukis</p>
          <h3 className="mb-1 mt-2 font-[var(--heading)] text-2xl leading-[1.02] tracking-normal">{campaign.title}</h3>
          {!compact && <p className="m-0 text-sm opacity-75">{campaign.description}</p>}
        </div>
        <strong className="inline-grid h-10 min-w-14 shrink-0 place-items-center rounded-full border border-current bg-card/15 font-mono text-sm">
          {campaign.goal}
        </strong>
      </div>
      <div className="relative z-[1] mt-5 flex items-center gap-2 text-sm font-extrabold opacity-80">
        <Check size={15} />
        {campaign.reward}
      </div>
    </article>
  )
}

export function ProgressCard({
  campaign,
  stamps,
}: {
  campaign: CashierCampaign
  stamps: number
}) {
  const capped = Math.min(stamps, campaign.goal)
  const ready = capped >= campaign.goal

  return (
    <article className="rounded-[23px] border border-border/80 bg-card/70 p-4 shadow-[0_18px_42px_rgba(120,72,44,0.1)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={cn('mb-2 block h-2 w-8 rounded-full', accentDot[campaign.accent])} />
          <h3 className="m-0 font-[var(--heading)] text-xl leading-none tracking-normal">{campaign.title}</h3>
          <p className="mb-0 mt-1.5 text-sm text-muted-foreground">{campaign.reward}</p>
        </div>
        <span className="font-mono text-sm font-bold tabular-nums">{capped}/{campaign.goal}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2" aria-label={`${capped} of ${campaign.goal} stamps`}>
        {Array.from({ length: campaign.goal }).map((_, index) => {
          const filled = index < capped
          return (
            <span
              key={index}
              className={cn(
                'grid h-8 w-8 place-items-center rounded-full border-2 text-[11px]',
                filled ? 'border-transparent bg-[#c8543a] text-card' : 'border-dashed border-border bg-background text-muted-foreground',
                ready && filled && 'bg-[#2f4f3e]',
              )}
            >
              {filled ? <Coffee size={14} /> : index + 1}
            </span>
          )
        })}
      </div>
    </article>
  )
}

export function MetricPill({ label, value, Icon }: { label: string; value: string; Icon: typeof Stamp }) {
  return (
    <div className="rounded-[22px] border border-border/80 bg-card/70 p-4 shadow-[0_18px_42px_rgba(120,72,44,0.08)]">
      <Icon className="mb-3 h-5 w-5 text-[#c8543a]" />
      <strong className="block font-[var(--heading)] text-3xl leading-none tracking-normal">{value}</strong>
      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
    </div>
  )
}
