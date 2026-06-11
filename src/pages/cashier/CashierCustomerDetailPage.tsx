import { ArrowLeft, CalendarDays, Minus, Plus, Stamp } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CashierPageLayout } from '@/components/cashier/layout/CashierPageLayout'
import { CashierSection, CustomerAvatar, CustomerContact, ProgressCard } from '@/components/cashier/ui/CashierCards'
import { Button } from '@/components/ui/button'
import { useCashier } from '@/lib/cashier/useCashier'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-PH', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat('en-PH', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value))
}

export function CashierCustomerDetailPage() {
  const { customerId } = useParams()
  const { campaigns, getCustomer, addProgress } = useCashier()
  const customer = customerId ? getCustomer(customerId) : undefined
  const [campaignId, setCampaignId] = useState(campaigns[0]?.id || '')
  const [stamps, setStamps] = useState(1)

  const activeCampaigns = useMemo(() => campaigns.filter((campaign) => campaign.active), [campaigns])
  const selectedCampaign = activeCampaigns.find((campaign) => campaign.id === campaignId)

  if (!customer) {
    return (
      <CashierPageLayout label="Customer not found">
        <div className="mx-auto grid max-w-[520px] gap-4 rounded-[28px] border border-border bg-card/70 p-6 text-center shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <h1 className="m-0 font-[var(--heading)] text-4xl leading-none tracking-normal">Suki not found</h1>
          <Link to="/cashier/customers" className="font-bold text-[#c8543a]">Back to customers</Link>
        </div>
      </CashierPageLayout>
    )
  }

  return (
    <CashierPageLayout label={`${customer.nickname} cashier profile`}>
      <div className="grid gap-6 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(32px,5vw,72px)]">
        <header className="rounded-[30px] border border-border/80 bg-card/60 p-6 shadow-[0_24px_70px_rgba(120,72,44,0.1)] backdrop-blur-md lg:sticky lg:top-12 lg:min-h-[560px] lg:p-[30px]">
          <Link to="/cashier/customers" className="mb-6 inline-flex items-center gap-2 rounded-full bg-background px-3 py-2 text-sm font-bold text-foreground no-underline">
            <ArrowLeft size={16} />
            Customers
          </Link>
          <CustomerAvatar name={customer.nickname} />
          <p className="mb-0 mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c8543a]">{customer.code}</p>
          <h1 className="mb-3 mt-2 font-[var(--heading)] text-[46px] leading-[0.96] tracking-normal">{customer.nickname}</h1>
          <CustomerContact customer={customer} />
          <div className="mt-6 grid grid-cols-2 gap-2">
            <div className="rounded-[20px] bg-background p-4">
              <strong className="block font-[var(--heading)] text-3xl leading-none tracking-normal">{customer.totalStamps}</strong>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">total stamps</span>
            </div>
            <div className="rounded-[20px] bg-background p-4">
              <strong className="block font-[var(--heading)] text-3xl leading-none tracking-normal">{customer.activeCampaigns.length}</strong>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">cards</span>
            </div>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays size={16} />
            Joined {formatDate(customer.joinedAt)}
          </p>
        </header>

        <div className="grid gap-6 lg:pt-1">
          <section className="rounded-[28px] border border-border/80 bg-card/70 p-5 shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
            <div className="mb-5 flex items-start gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-[17px] bg-[#c8543a] text-card">
                <Stamp size={22} />
              </span>
              <div>
                <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c8543a]">Add progress</p>
                <h2 className="mb-0 mt-1 font-[var(--heading)] text-3xl leading-none tracking-normal">Choose campaign</h2>
              </div>
            </div>

            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault()
                if (!selectedCampaign) return
                addProgress(customer.id, selectedCampaign.id, stamps)
              }}
            >
              <div className="grid gap-2">
                <label htmlFor="campaign" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Campaign</label>
                <select
                  id="campaign"
                  value={campaignId}
                  onChange={(event) => setCampaignId(event.target.value)}
                  className="h-12 rounded-[14px] border border-input bg-background px-4 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  {activeCampaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end justify-between gap-4 rounded-[20px] bg-background p-3">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Stamps</label>
                  <strong className="block font-[var(--heading)] text-4xl leading-none tracking-normal">{stamps}</strong>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="grid h-11 w-11 place-items-center rounded-[15px] bg-card text-foreground" onClick={() => setStamps((value) => Math.max(1, value - 1))} aria-label="Remove one stamp">
                    <Minus size={18} />
                  </button>
                  <button type="button" className="grid h-11 w-11 place-items-center rounded-[15px] bg-card text-foreground" onClick={() => setStamps((value) => Math.min(10, value + 1))} aria-label="Add one stamp">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              <Button type="submit" className="h-12 rounded-[16px] bg-[#c8543a] text-card hover:bg-[#b94831]">
                Add progress
              </Button>
            </form>
          </section>

          <CashierSection title="Campaign progress">
            <div className="grid gap-3 md:grid-cols-2">
              {customer.activeCampaigns.map((progress) => {
                const campaign = campaigns.find((item) => item.id === progress.campaignId)
                if (!campaign) return null
                return <ProgressCard key={progress.campaignId} campaign={campaign} stamps={progress.stamps} />
              })}
            </div>
          </CashierSection>

          <CashierSection title="Recent activity">
            <div className="grid gap-2.5">
              {customer.recentActivity.map((activity) => {
                const campaign = campaigns.find((item) => item.id === activity.campaignId)
                return (
                  <div key={activity.id} className="flex items-center justify-between gap-3 rounded-[20px] border border-border/80 bg-card/70 p-4">
                    <span>
                      <strong className="block text-sm">{activity.type === 'join' ? 'Joined campaign' : `Added ${activity.stamps} stamp${activity.stamps === 1 ? '' : 's'}`}</strong>
                      <span className="block text-sm text-muted-foreground">{campaign?.title || 'Campaign'}</span>
                    </span>
                    <time className="text-right font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{formatTime(activity.at)}</time>
                  </div>
                )
              })}
            </div>
          </CashierSection>
        </div>
      </div>
    </CashierPageLayout>
  )
}
