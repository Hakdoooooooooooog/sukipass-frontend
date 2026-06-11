import { ScrollText } from 'lucide-react'
import { CashierPageLayout } from '@/components/cashier/layout/CashierPageLayout'
import { CampaignCard, CashierSection } from '@/components/cashier/ui/CashierCards'
import { useCashier } from '@/lib/cashier/useCashier'

export function CashierCampaignsPage() {
  const { campaigns } = useCashier()
  const active = campaigns.filter((campaign) => campaign.active)

  return (
    <CashierPageLayout label="Cashier campaigns">
      <div className="grid gap-6 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(32px,5vw,72px)]">
        <header className="rounded-[30px] border border-border/80 bg-card/60 p-6 shadow-[0_24px_70px_rgba(120,72,44,0.1)] backdrop-blur-md lg:sticky lg:top-12 lg:min-h-[520px] lg:p-[30px]">
          <span className="grid h-14 w-14 place-items-center rounded-[20px] bg-[#dda947] text-foreground">
            <ScrollText size={25} />
          </span>
          <p className="mb-0 mt-7 font-mono text-xs uppercase tracking-[0.16em] text-[#c8543a]">View only</p>
          <h1 className="mb-3 mt-3 font-[var(--heading)] text-[42px] leading-[0.96] tracking-normal">Campaigns</h1>
          <p className="m-0 text-sm text-muted-foreground">Select these cards when adding progress from a customer profile.</p>
        </header>

        <CashierSection title="Active cards" meta={`${active.length} live`} className="lg:pt-1">
          <div className="grid gap-4 md:grid-cols-2">
            {active.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        </CashierSection>
      </div>
    </CashierPageLayout>
  )
}
