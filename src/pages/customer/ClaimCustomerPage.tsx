import { ArrowRight, BadgeCheck, Clock, Gift } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { ProgressCard } from '@/components/cashier/ui/CashierCards'
import { Button } from '@/components/ui/button'
import { cashierStore } from '@/lib/cashier/data'
import { useCashier } from '@/lib/cashier/useCashier'

export function ClaimCustomerPage() {
  const { token } = useParams()
  const { campaigns, findCustomerByClaimToken } = useCashier()
  const customer = token ? findCustomerByClaimToken(token) : undefined
  const latestStamp = customer?.recentActivity.find((activity) => activity.type === 'stamp')
  const campaign = campaigns.find((item) => item.id === latestStamp?.campaignId)
  const progress = customer?.activeCampaigns.find((item) => item.campaignId === campaign?.id)

  if (!customer) {
    return (
      <main className="grid min-h-svh place-items-center bg-background px-5 py-10 text-foreground">
        <section className="grid max-w-[460px] gap-4 rounded-[28px] border border-border bg-card/70 p-6 text-center shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <h1 className="m-0 font-[var(--heading)] text-4xl leading-none tracking-normal">Claim link not found</h1>
          <p className="m-0 text-sm text-muted-foreground">Ask the cashier to open your customer profile or create a new claim QR.</p>
          <Button asChild className="h-12 rounded-[16px] bg-[#c8543a] text-card hover:bg-[#b94831]">
            <Link to="/">Go home</Link>
          </Button>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-svh bg-background bg-[radial-gradient(circle_at_8%_0%,rgba(216,162,74,0.18),transparent_32%),radial-gradient(circle_at_96%_8%,rgba(200,84,58,0.12),transparent_28%)] px-5 py-8 text-foreground">
      <section className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-[900px] content-center gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-center">
        <div className="rounded-[30px] border border-border/80 bg-card/70 p-6 shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <div className="mb-6 flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-[#2f4f3e] text-[#eaf3ec]">
              <BadgeCheck size={26} />
            </span>
            <div>
              <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c8543a]">{cashierStore.name}</p>
              <h1 className="mb-2 mt-1 font-[var(--heading)] text-4xl leading-none tracking-normal">Your stamp is saved</h1>
              <p className="m-0 text-sm text-muted-foreground">Finish setup so the store can find this account next time.</p>
            </div>
          </div>

          <div className="mb-5 rounded-[22px] bg-background p-4">
            <p className="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Temporary account</p>
            <strong className="mt-1 block font-[var(--heading)] text-3xl leading-none tracking-normal">{customer.nickname}</strong>
            <span className="mt-2 block font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{customer.code}</span>
          </div>

          {campaign && progress && <ProgressCard campaign={campaign} stamps={progress.stamps} />}

          <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
            <Button asChild className="h-12 rounded-[16px] bg-[#c8543a] text-card hover:bg-[#b94831]">
              <Link to={`/claim/${customer.claimToken}/setup`}>
                Finish account setup
                <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-[16px]">
              <Link to="/">Continue later</Link>
            </Button>
          </div>
        </div>

        <aside className="rounded-[30px] border border-border/80 bg-card/70 p-5 shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <Gift className="mb-4 h-8 w-8 text-[#c8543a]" />
          <h2 className="m-0 font-[var(--heading)] text-3xl leading-none tracking-normal">Progress stays here</h2>
          <p className="mb-0 mt-3 text-sm text-muted-foreground">The stamp was added before this page opened. Setup only adds your real account details.</p>
          <div className="mt-5 flex items-center gap-2 rounded-[18px] bg-background p-3 text-sm text-muted-foreground">
            <Clock size={17} />
            You can finish after leaving the counter.
          </div>
        </aside>
      </section>
    </main>
  )
}
