import { Copy, Mail, Phone, Search, Stamp, UserRound } from 'lucide-react'
import { useMemo, useState } from 'react'
import { BusinessPageLayout } from '@/components/business/layout/BusinessPageLayout'
import { businessCustomerTotals, businessCustomers, type BusinessCustomerStatus, type BusinessCustomerSummary } from '@/lib/business/data'
import { cn } from '@/lib/utils'

type SegmentFilter = 'all' | 'ready' | 'setup' | 'active'

const statusStyles = {
  claimed: 'bg-[#2f4f3e] text-[#eaf3ec]',
  temporary: 'bg-[#dda947] text-foreground',
}

const toneDots = {
  terra: 'bg-[#c8543a]',
  forest: 'bg-[#2f4f3e]',
  gold: 'bg-[#dda947]',
}

function CustomerStatusBadge({ status }: { status: BusinessCustomerStatus }) {
  return (
    <span className={cn('rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]', statusStyles[status])}>
      {status === 'temporary' ? 'Needs setup' : 'Claimed'}
    </span>
  )
}

function CustomerAvatar({ name }: { name: string }) {
  return (
    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[15px] bg-[#2f4f3e] font-[var(--heading)] text-lg text-[#eaf3ec] shadow-[0_14px_28px_rgba(47,79,62,0.16)]">
      {name.trim().slice(0, 1).toUpperCase() || <UserRound size={18} />}
    </span>
  )
}

function MetricCard({ label, value, tone }: { label: string; value: number; tone: 'forest' | 'gold' | 'terra' }) {
  const styles = {
    forest: 'bg-[#2f4f3e] text-[#eaf3ec]',
    gold: 'bg-[#dda947] text-foreground',
    terra: 'bg-[#c8543a] text-card',
  }

  return (
    <article className={cn('relative min-h-[118px] overflow-hidden rounded-[22px] p-4 shadow-[0_20px_42px_rgba(120,72,44,0.12)]', styles[tone])}>
      <span className="pointer-events-none absolute right-[-34px] top-[-48px] h-32 w-32 rounded-full bg-current opacity-10" />
      <strong className="relative z-[1] block font-[var(--heading)] text-4xl leading-none tracking-normal">{value}</strong>
      <span className="relative z-[1] mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] opacity-75">{label}</span>
    </article>
  )
}

function CustomerCard({
  customer,
  selected,
  onSelect,
}: {
  customer: BusinessCustomerSummary
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      className={cn(
        'grid w-full cursor-pointer gap-3 rounded-[20px] border border-border/70 bg-background/55 p-3.5 text-left transition-colors hover:border-[#c8543a]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        selected && 'border-[#c8543a]/45 ring-2 ring-[#c8543a]/20',
      )}
      type="button"
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <CustomerAvatar name={customer.name} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="m-0 truncate font-bold leading-tight">{customer.name}</h2>
              <p className="mb-0 mt-1 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{customer.code}</p>
            </div>
            <CustomerStatusBadge status={customer.status} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-[13px] bg-card/70 px-3 py-2">
          <strong className="block font-[var(--heading)] text-2xl leading-none">{customer.totalStamps}</strong>
          <span className="text-xs text-muted-foreground">stamps</span>
        </div>
        <div className="rounded-[13px] bg-card/70 px-3 py-2">
          <strong className="block font-[var(--heading)] text-2xl leading-none">{customer.activeCards}</strong>
          <span className="text-xs text-muted-foreground">cards</span>
        </div>
        <div className="rounded-[13px] bg-card/70 px-3 py-2">
          <strong className="block font-[var(--heading)] text-2xl leading-none">{customer.readyRewards}</strong>
          <span className="text-xs text-muted-foreground">ready</span>
        </div>
      </div>
    </button>
  )
}

function CustomerDetailPanel({ customer }: { customer: BusinessCustomerSummary }) {
  const claimUrl = `${window.location.origin}/claim/${customer.claimToken}`

  async function copy(text: string) {
    await navigator.clipboard?.writeText(text)
  }

  return (
    <aside className="rounded-[24px] border border-border/80 bg-card/70 p-5 shadow-[0_22px_55px_rgba(120,72,44,0.1)] backdrop-blur-md xl:sticky xl:top-8 xl:self-start">
      <div className="mb-5 flex items-start gap-3">
        <CustomerAvatar name={customer.name} />
        <div className="min-w-0 flex-1">
          <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c8543a]">Selected suki</p>
          <h2 className="mb-2 mt-1 truncate font-[var(--heading)] text-3xl leading-none tracking-normal">{customer.name}</h2>
          <CustomerStatusBadge status={customer.status} />
        </div>
      </div>

      <div className="grid gap-2">
        <button className="inline-flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-[14px] border border-border bg-background px-3 text-left font-mono text-xs text-foreground" type="button" onClick={() => copy(customer.code)}>
          {customer.code}
          <Copy size={15} />
        </button>
        {customer.email && (
          <span className="inline-flex min-h-10 items-center gap-2 rounded-[14px] bg-background px-3 text-sm text-muted-foreground">
            <Mail size={15} />
            <span className="truncate">{customer.email}</span>
          </span>
        )}
        {customer.phone && (
          <span className="inline-flex min-h-10 items-center gap-2 rounded-[14px] bg-background px-3 text-sm text-muted-foreground">
            <Phone size={15} />
            <span className="truncate">{customer.phone}</span>
          </span>
        )}
        {customer.status === 'temporary' && (
          <button className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#c8543a] px-3 text-sm font-bold text-card transition-colors hover:bg-[#b94831]" type="button" onClick={() => copy(claimUrl)}>
            <Copy size={15} />
            Copy claim link
          </button>
        )}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-[14px] bg-background px-3 py-3">
          <strong className="block font-[var(--heading)] text-2xl leading-none">{customer.totalStamps}</strong>
          <span className="text-xs text-muted-foreground">stamps</span>
        </div>
        <div className="rounded-[14px] bg-background px-3 py-3">
          <strong className="block font-[var(--heading)] text-2xl leading-none">{customer.activeCards}</strong>
          <span className="text-xs text-muted-foreground">cards</span>
        </div>
        <div className="rounded-[14px] bg-background px-3 py-3">
          <strong className="block font-[var(--heading)] text-2xl leading-none">{customer.readyRewards}</strong>
          <span className="text-xs text-muted-foreground">ready</span>
        </div>
      </div>

      <section className="mt-5">
        <h3 className="m-0 font-[var(--heading)] text-xl leading-none tracking-normal">Campaign progress</h3>
        <div className="mt-3 grid gap-2">
          {customer.campaigns.map((campaign) => (
            <article key={campaign.id} className="rounded-[16px] border border-border/70 bg-background/55 p-3">
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className={cn('mb-2 block h-2 w-8 rounded-full', toneDots[campaign.tone])} />
                  <strong className="block truncate text-sm leading-tight">{campaign.title}</strong>
                  <span className="mt-1 block truncate text-xs text-muted-foreground">{campaign.reward}</span>
                </div>
                <span className="font-mono text-xs font-bold">{Math.min(campaign.stamps, campaign.goal)}/{campaign.goal}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-card">
                <span className={cn('block h-full rounded-full', toneDots[campaign.tone])} style={{ width: `${Math.min((campaign.stamps / campaign.goal) * 100, 100)}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <h3 className="m-0 font-[var(--heading)] text-xl leading-none tracking-normal">Recent activity</h3>
        <div className="scrollbar-reveal mt-3 grid max-h-[220px] gap-2 overflow-y-auto pr-1">
          {customer.recentActivity.map((activity) => (
            <article key={activity.id} className="grid grid-cols-[36px_minmax(0,1fr)] items-center gap-2 rounded-[14px] bg-background/70 p-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-[12px] bg-[#2f4f3e] text-[#eaf3ec]">
                <Stamp size={15} />
              </span>
              <span className="min-w-0">
                <strong className="block truncate text-xs leading-tight">{activity.action}</strong>
                <span className="mt-1 block truncate text-xs text-muted-foreground">{activity.detail}</span>
              </span>
            </article>
          ))}
        </div>
      </section>
    </aside>
  )
}

export function BusinessCustomersPage() {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | BusinessCustomerStatus>('all')
  const [segment, setSegment] = useState<SegmentFilter>('all')
  const [selectedId, setSelectedId] = useState(businessCustomers[0]?.id ?? '')

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return businessCustomers
      .filter((customer) => status === 'all' || customer.status === status)
      .filter((customer) => {
        if (segment === 'ready') return customer.readyRewards > 0
        if (segment === 'setup') return customer.status === 'temporary'
        if (segment === 'active') return customer.recentActivity.some((activity) => new Date(activity.at) >= new Date('2026-06-04T00:00:00.000Z'))
        return true
      })
      .filter((customer) => !normalized || [customer.name, customer.code, customer.email || '', customer.phone || ''].some((value) => value.toLowerCase().includes(normalized)))
      .sort((a, b) => new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime())
  }, [query, segment, status])

  const selected = businessCustomers.find((customer) => customer.id === selectedId) ?? filtered[0] ?? businessCustomers[0]

  return (
    <BusinessPageLayout>
      <div className="grid gap-5 lg:gap-6">
        <header>
          <p className="m-0 font-mono text-xs uppercase tracking-[0.16em] text-[#c8543a]">Owner workspace</p>
          <h1 className="mb-2 mt-2 font-[var(--heading)] text-[38px] leading-[0.98] tracking-normal md:text-5xl">Customers</h1>
          <p className="m-0 max-w-[620px] text-sm text-muted-foreground">Inspect suki profiles, card progress, and reward-ready customers.</p>
        </header>

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Customer totals">
          <MetricCard label="total sukis" value={businessCustomerTotals.total} tone="forest" />
          <MetricCard label="claimed" value={businessCustomerTotals.claimed} tone="terra" />
          <MetricCard label="needs setup" value={businessCustomerTotals.temporary} tone="gold" />
          <MetricCard label="reward-ready" value={businessCustomerTotals.ready} tone="forest" />
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.8fr)]">
          <section className="rounded-[24px] border border-border/80 bg-card/70 p-4 shadow-[0_22px_55px_rgba(120,72,44,0.1)] backdrop-blur-md sm:p-5">
            <div className="mb-4 grid gap-3">
              <div className="relative min-w-0">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input className="h-11 w-full rounded-[12px] border border-border bg-background/70 pl-10 pr-3 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, code, email, phone" />
              </div>
              <div className="scrollbar-reveal flex gap-1 overflow-x-auto pb-1">
                {(['all', 'claimed', 'temporary'] as const).map((item) => (
                  <button key={item} className={cn('h-10 shrink-0 cursor-pointer rounded-[12px] border border-border px-3 text-sm font-bold capitalize transition-colors hover:text-[#c8543a]', status === item ? 'bg-[#2f4f3e] text-[#eaf3ec] hover:text-[#eaf3ec]' : 'bg-background text-muted-foreground')} type="button" onClick={() => setStatus(item)}>
                    {item === 'temporary' ? 'Needs setup' : item}
                  </button>
                ))}
              </div>
              <div className="scrollbar-reveal flex gap-1 overflow-x-auto pb-1">
                {[
                  ['all', 'All'],
                  ['ready', 'Reward-ready'],
                  ['setup', 'Needs setup'],
                  ['active', 'Active week'],
                ].map(([value, label]) => (
                  <button key={value} className={cn('h-10 shrink-0 cursor-pointer rounded-[12px] border border-border px-3 text-sm font-bold transition-colors hover:text-[#c8543a]', segment === value ? 'bg-[#c8543a] text-card hover:text-card' : 'bg-background text-muted-foreground')} type="button" onClick={() => setSegment(value as SegmentFilter)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {filtered.length > 0 ? (
                filtered.map((customer) => (
                  <CustomerCard key={customer.id} customer={customer} selected={selected?.id === customer.id} onSelect={() => setSelectedId(customer.id)} />
                ))
              ) : (
                <p className="rounded-[18px] border border-border bg-background/70 px-4 py-8 text-center text-sm text-muted-foreground">No matching customers.</p>
              )}
            </div>
          </section>

          {selected && <CustomerDetailPanel customer={selected} />}
        </div>
      </div>
    </BusinessPageLayout>
  )
}
