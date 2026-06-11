import { lazy, Suspense } from 'react'
import { ArrowRight, QrCode } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CashierPageLayout } from '@/components/cashier/layout/CashierPageLayout'
import { ActiveCampaignsSkeleton, CashierHomeMetaSkeleton, CashierMetricsSkeleton, RecentSukisSkeleton } from '@/components/cashier/home/CashierHomeSkeletons'
import { cashierStore } from '@/lib/cashier/data'

const CashierHomeMetrics = lazy(() => import('@/components/cashier/home/CashierHomeMetrics'))
const RecentSukisData = lazy(() => import('@/components/cashier/home/RecentSukisData'))
const ActiveCampaignsData = lazy(() => import('@/components/cashier/home/ActiveCampaignsData'))
const RecentSukisMeta = lazy(() => import('@/components/cashier/home/RecentSukisData').then((module) => ({ default: module.RecentSukisMeta })))
const ActiveCampaignsMeta = lazy(() => import('@/components/cashier/home/ActiveCampaignsData').then((module) => ({ default: module.ActiveCampaignsMeta })))

export function CashierHomePage() {
  return (
    <CashierPageLayout label="Cashier dashboard">
      <div className="grid gap-6 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(32px,5vw,72px)]">
        <header className="relative overflow-hidden rounded-[30px] border border-border/80 bg-card/60 p-6 shadow-[0_24px_70px_rgba(120,72,44,0.1)] backdrop-blur-md lg:sticky lg:top-12 lg:min-h-[560px] lg:p-[30px]">
          <span className="pointer-events-none absolute right-[-48px] top-[-48px] h-44 w-44 rounded-full bg-[#dda947]/25" aria-hidden="true" />
          <p className="m-0 font-mono text-xs uppercase tracking-[0.16em] text-[#c8543a]">Today at {cashierStore.branch}</p>
          <h1 className="mb-3 mt-3 font-[var(--heading)] text-[42px] leading-[0.96] tracking-normal text-foreground lg:text-[clamp(48px,5vw,66px)]">
            {cashierStore.name}
          </h1>
          <p className="m-0 max-w-[280px] text-sm text-muted-foreground">Scan a SukiPass, find a customer, then add progress to the right campaign.</p>

          <Link
            to="/cashier?scan=1"
            className="mt-8 grid min-h-[170px] place-items-center rounded-[26px] bg-[#c8543a] p-5 text-center text-card no-underline shadow-[0_22px_46px_rgba(200,84,58,0.26)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <QrCode size={54} strokeWidth={1.8} />
            <span>
              <strong className="block font-[var(--heading)] text-3xl leading-none tracking-normal">Open scanner</strong>
              <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.14em] opacity-80">Camera or manual lookup</span>
            </span>
          </Link>

          <Suspense fallback={<CashierMetricsSkeleton />}>
            <CashierHomeMetrics />
          </Suspense>
        </header>

        <div className="grid gap-6 lg:pt-1">
          <section className="grid gap-3.5">
            <div className="flex items-end justify-between gap-3">
              <h2 className="m-0 font-[var(--heading)] text-xl leading-none tracking-normal text-foreground lg:text-2xl">Recent sukis</h2>
              <Suspense fallback={<CashierHomeMetaSkeleton />}>
                <RecentSukisMeta />
              </Suspense>
            </div>
            <Suspense fallback={<RecentSukisSkeleton />}>
              <RecentSukisData />
            </Suspense>
            <Link to="/cashier/customers" className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-border bg-card/70 px-4 py-3 text-sm font-bold text-foreground no-underline transition-colors hover:bg-card">
              View all customers
              <ArrowRight size={16} />
            </Link>
          </section>

          <section className="grid gap-3.5">
            <div className="flex items-end justify-between gap-3">
              <h2 className="m-0 font-[var(--heading)] text-xl leading-none tracking-normal text-foreground lg:text-2xl">Active campaigns</h2>
              <Suspense fallback={<CashierHomeMetaSkeleton />}>
                <ActiveCampaignsMeta />
              </Suspense>
            </div>
            <Suspense fallback={<ActiveCampaignsSkeleton />}>
              <ActiveCampaignsData />
            </Suspense>
          </section>
        </div>
      </div>
    </CashierPageLayout>
  )
}
