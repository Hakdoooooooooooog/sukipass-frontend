import { CampaignCard } from '@/components/cashier/ui/CashierCards'
import { useCashier } from '@/lib/cashier/useCashier'

export function ActiveCampaignsMeta() {
  const { campaigns } = useCashier()
  const activeCampaigns = campaigns.filter((campaign) => campaign.active)
  return <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{activeCampaigns.length} live</span>
}

function ActiveCampaignsData() {
  const { campaigns } = useCashier()
  const activeCampaigns = campaigns.filter((campaign) => campaign.active)

  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {activeCampaigns.map((campaign) => (
        <CampaignCard key={campaign.id} campaign={campaign} compact />
      ))}
    </div>
  )
}

export default ActiveCampaignsData
