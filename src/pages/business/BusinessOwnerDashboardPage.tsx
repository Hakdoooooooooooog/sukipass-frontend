import { CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Search, Stamp } from 'lucide-react'
import { useMemo, useState, useSyncExternalStore } from 'react'
import { useParams } from 'react-router-dom'
import { BusinessPageLayout } from '@/components/business/layout/BusinessPageLayout'
import { businessProfile, getBusinessDisplayName, getOwnerRangeData, ownerActivity, ownerCampaignPerformance, ownerFunnel, type OwnerChartBar, type OwnerKpi } from '@/lib/business/data'
import { cn } from '@/lib/utils'

const toneStyles = {
  terra: 'bg-[#c8543a] text-card',
  forest: 'bg-[#2f4f3e] text-[#eaf3ec]',
  gold: 'bg-[#dda947] text-foreground',
}

const toneDots = {
  terra: 'bg-[#c8543a]',
  forest: 'bg-[#2f4f3e]',
  gold: 'bg-[#dda947]',
}

const rangeOptions = [7, 14, 30]

function useDesktopChart() {
  return useSyncExternalStore(
    (callback) => {
      const query = window.matchMedia('(min-width: 1024px)')
      query.addEventListener('change', callback)
      return () => query.removeEventListener('change', callback)
    },
    () => window.matchMedia('(min-width: 1024px)').matches,
    () => true,
  )
}

function OwnerHeader({ days, onDaysChange }: { days: number; onDaysChange: (days: number) => void }) {
  const { businessName } = useParams()
  const displayName = getBusinessDisplayName(businessName)

  return (
    <header className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
      <div>
        <p className="m-0 font-mono text-xs uppercase tracking-[0.16em] text-[#c8543a]">{businessProfile.plan}</p>
        <h1 className="mb-2 mt-2 font-[var(--heading)] text-[38px] leading-[0.98] tracking-normal text-foreground md:text-5xl">Dashboard</h1>
        <p className="m-0 text-sm text-muted-foreground">Kumusta, {businessProfile.owner}. Here is how {displayName} sukis are moving this week.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            className="h-11 w-full rounded-[12px] border border-border bg-card/60 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30"
            placeholder="Search sukis"
          />
        </div>
        <div className="group relative shrink-0">
          <button
            className="flex h-11 cursor-pointer items-center gap-2 rounded-[12px] border border-[#c8543a]/30 bg-[#c8543a] px-3 text-sm font-bold text-card shadow-[0_14px_30px_rgba(200,84,58,0.18)] transition-colors hover:bg-[#b94831] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            type="button"
          >
            <CalendarDays size={16} />
            {days} days
            <ChevronDown size={15} />
          </button>
          <div className="pointer-events-none absolute right-0 top-[calc(100%+8px)] z-20 w-[150px] rounded-[14px] border border-border bg-card p-1 opacity-0 shadow-[0_18px_38px_rgba(120,72,44,0.16)] transition-opacity duration-150 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
            {rangeOptions.map((option) => (
              <button
                key={option}
                className="flex h-10 w-full cursor-pointer items-center justify-between rounded-[10px] px-3 text-left text-sm font-bold text-foreground transition-colors hover:bg-background focus-visible:bg-background focus-visible:outline-none"
                type="button"
                onClick={() => onDaysChange(option)}
              >
                {option} days
                {days === option && <Check size={15} className="text-[#c8543a]" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

function KpiStrip({ kpis }: { kpis: OwnerKpi[] }) {
  return (
    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Owner metrics">
      {kpis.map((kpi) => (
        <article key={kpi.label} className={cn('relative min-h-[128px] overflow-hidden rounded-[22px] p-4 shadow-[0_20px_42px_rgba(120,72,44,0.12)] sm:min-h-[142px] sm:rounded-[26px] sm:p-5', toneStyles[kpi.tone])}>
          <span className="pointer-events-none absolute right-[-34px] top-[-48px] h-32 w-32 rounded-full bg-current opacity-10 sm:right-[-26px] sm:top-[-42px] sm:h-36 sm:w-36" />
          <div className="relative z-[1] flex h-full flex-col justify-between">
            <div className="flex items-start justify-between gap-3">
              <p className="m-0 text-sm font-bold opacity-80">
                <span className="sm:hidden">{kpi.shortLabel}</span>
                <span className="hidden sm:inline">{kpi.label}</span>
              </p>
            </div>
            <div>
              <strong className="block font-[var(--heading)] text-[32px] leading-none tracking-normal sm:text-4xl">{kpi.value}</strong>
              <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.12em] opacity-75 sm:text-[10px]">
                <span className="sm:hidden">{kpi.shortDelta}</span>
                <span className="hidden sm:inline">{kpi.delta}</span>
              </span>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

function VisitChart({ daily, days }: { daily: OwnerChartBar[]; days: number }) {
  const isDesktopChart = useDesktopChart()
  const maxBars = isDesktopChart ? (days === 30 ? 15 : days > 7 ? 14 : 7) : days === 30 ? 6 : 7
  const maxPage = Math.max(0, Math.ceil(daily.length / maxBars) - 1)
  const [page, setPage] = useState(maxPage)
  const start = Math.min(page, maxPage) * maxBars
  const visibleDaily = daily.slice(start, start + maxBars)
  const maxSales = Math.max(...visibleDaily.map((item) => item.sales))
  const canPage = daily.length > maxBars
  const currentPage = Math.min(page, maxPage)
  const peso = new Intl.NumberFormat('en-PH', {
    currency: 'PHP',
    maximumFractionDigits: 0,
    style: 'currency',
  })

  return (
    <section className="overflow-hidden rounded-[28px] border border-border/80 bg-card/70 p-4 shadow-[0_22px_55px_rgba(120,72,44,0.1)] backdrop-blur-md sm:p-5">
      <div className="mb-6 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="m-0 font-[var(--heading)] text-2xl leading-none tracking-normal">Daily performance</h2>
          <p className="mb-0 mt-1 text-sm text-muted-foreground">Sales per day with new sukis and stamps added.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {canPage && (
            <div className="flex items-center gap-1">
              <button
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-[10px] border border-border bg-background text-muted-foreground transition-colors hover:text-[#c8543a] disabled:cursor-not-allowed disabled:opacity-35"
                type="button"
                disabled={currentPage === 0}
                onClick={() => setPage((value) => Math.max(0, value - 1))}
                aria-label="Previous chart range"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                className="grid h-8 w-8 cursor-pointer place-items-center rounded-[10px] border border-border bg-background text-muted-foreground transition-colors hover:text-[#c8543a] disabled:cursor-not-allowed disabled:opacity-35"
                type="button"
                disabled={currentPage === maxPage}
                onClick={() => setPage((value) => Math.min(maxPage, value + 1))}
                aria-label="Next chart range"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
          <span className="rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
            Last {days} days
          </span>
        </div>
      </div>

      <div
        className="grid h-[220px] min-w-0 grid-cols-7 items-end gap-1.5 sm:gap-3 lg:h-[230px] lg:gap-2 xl:gap-3"
        style={{ gridTemplateColumns: `repeat(${visibleDaily.length}, minmax(0, 1fr))` }}
      >
        {visibleDaily.map((item) => (
          <div key={item.date} className="group relative flex h-full min-w-0 flex-col items-center justify-end gap-2">
            <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-10 w-[150px] -translate-x-1/2 rounded-[14px] border border-border bg-card px-3 py-2 text-left text-xs opacity-0 shadow-[0_18px_38px_rgba(120,72,44,0.16)] transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
              <strong className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{item.label}</strong>
              <span className="mt-1 block font-bold text-foreground">{peso.format(item.sales)} sales</span>
              <span className="mt-1 block text-muted-foreground">{item.newCustomers} new suki{item.newCustomers === 1 ? '' : 's'}</span>
              <span className="block text-muted-foreground">{item.stamps} stamps added</span>
            </div>
            <div className="relative flex w-full max-w-[38px] flex-1 items-end rounded-[24px] bg-background/80 sm:max-w-[52px] lg:max-w-[32px] xl:max-w-[38px]">
              <span
                className={cn('block w-full rounded-b-[18px] rounded-t-[24px] transition-[height] duration-300', item.sales >= 5200 ? 'bg-[#c8543a]' : 'bg-[#2f4f3e]')}
                style={{ height: `${Math.max((item.sales / maxSales) * 100, 12)}%` }}
              />
            </div>
            <span className="text-center font-mono text-[10px] uppercase tracking-normal text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function FunnelCard() {
  return (
    <section className="rounded-[28px] border border-border/80 bg-card/70 p-5 shadow-[0_22px_55px_rgba(120,72,44,0.1)] backdrop-blur-md">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="m-0 font-[var(--heading)] text-2xl leading-none tracking-normal">Customer flow</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Current</span>
      </div>
      <div className="grid gap-2.5">
        {ownerFunnel.map((step) => (
          <article key={step.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[18px] border border-border/70 bg-background/55 p-3.5">
            <div className="min-w-0">
              <h3 className="m-0 truncate text-sm font-bold leading-tight">{step.label}</h3>
              <p className="mb-0 mt-1 text-xs text-muted-foreground">
                {step.label === 'Stamped customers' && 'Customers with at least one stamp.'}
                {step.label === 'Claimed profiles' && 'Customers who completed setup.'}
                {step.label === 'Reward-ready' && 'Customers with a card at goal.'}
              </p>
            </div>
            <strong className="font-[var(--heading)] text-3xl leading-none tracking-normal">{step.value}</strong>
          </article>
        ))}
      </div>
    </section>
  )
}

function CampaignPerformance() {
  return (
    <section className="rounded-[28px] border border-border/80 bg-card/70 p-5 shadow-[0_22px_55px_rgba(120,72,44,0.1)] backdrop-blur-md">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="m-0 font-[var(--heading)] text-2xl leading-none tracking-normal">Campaigns</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Live cards</span>
      </div>
      <div className="grid gap-3">
        {ownerCampaignPerformance.map((campaign) => (
          <article key={campaign.title} className="rounded-[22px] border border-border/70 bg-background/55 p-4">
            <div className="flex items-center justify-between gap-3">
              <span className={cn('block h-2 w-8 rounded-full', toneDots[campaign.tone])} />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Active campaign</span>
            </div>
            <h3 className="mb-4 mt-3 truncate font-bold leading-tight">{campaign.title}</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-[14px] bg-card/70 px-3 py-3">
                <strong className="block font-[var(--heading)] text-3xl leading-none tracking-normal">{campaign.enrolled}</strong>
                <span className="mt-1 block text-xs text-muted-foreground">enrolled customers</span>
              </div>
              <div className="rounded-[14px] bg-card/70 px-3 py-3">
                <strong className="block font-[var(--heading)] text-3xl leading-none tracking-normal">{campaign.readyToClaim}</strong>
                <span className="mt-1 block text-xs text-muted-foreground">ready to claim</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function RecentActivity() {
  return (
    <section className="rounded-[28px] border border-border/80 bg-card/70 p-5 shadow-[0_22px_55px_rgba(120,72,44,0.1)] backdrop-blur-md">
      <div className="mb-4 flex items-end justify-between gap-3">
        <h2 className="m-0 font-[var(--heading)] text-2xl leading-none tracking-normal">Recent activity</h2>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Latest 8</span>
      </div>
      <div className="scrollbar-reveal grid max-h-[420px] gap-2.5 overflow-y-auto pr-1">
        {ownerActivity.slice(0, 8).map((activity) => (
          <article key={activity.id} className="grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 rounded-[20px] border border-border/70 bg-background/55 p-3">
            <span className="grid h-11 w-11 place-items-center rounded-[16px] bg-[#2f4f3e] text-[#eaf3ec]">
              <Stamp size={18} />
            </span>
            <span className="min-w-0">
              <strong className="block truncate text-sm leading-tight">{activity.customer}</strong>
              <span className="mt-1 block truncate text-xs text-muted-foreground">{activity.action} · {activity.detail}</span>
            </span>
            <time className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground" dateTime={activity.at}>
              {new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(activity.at))}
            </time>
          </article>
        ))}
      </div>
    </section>
  )
}

export function BusinessOwnerDashboardPage() {
  const [days, setDays] = useState(14)
  const { daily, kpis } = useMemo(() => getOwnerRangeData(days), [days])

  return (
    <BusinessPageLayout>
      <div className="grid gap-5 lg:gap-6">
        <OwnerHeader days={days} onDaysChange={setDays} />
        <KpiStrip kpis={kpis} />
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.8fr)]">
          <div className="grid gap-5">
            <VisitChart key={days} daily={daily} days={days} />
            <RecentActivity />
          </div>
          <div className="grid gap-5 xl:content-start">
            <FunnelCard />
            <CampaignPerformance />
          </div>
        </div>
      </div>
    </BusinessPageLayout>
  )
}
