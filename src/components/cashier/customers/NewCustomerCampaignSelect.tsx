import { useEffect, useMemo } from 'react'
import { useCashier } from '@/lib/cashier/useCashier'

export default function NewCustomerCampaignSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const { campaigns } = useCashier()
  const activeCampaigns = useMemo(() => campaigns.filter((campaign) => campaign.active), [campaigns])

  useEffect(() => {
    if (!value && activeCampaigns[0]) {
      onChange(activeCampaigns[0].id)
    }
  }, [activeCampaigns, onChange, value])

  return (
    <div className="grid gap-2">
      <label htmlFor="campaign" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        Campaign
      </label>
      <select
        id="campaign"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 rounded-[14px] border border-input bg-background px-4 text-base shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        required
        disabled={activeCampaigns.length === 0}
      >
        {activeCampaigns.length === 0 ? (
          <option value="">No active campaigns</option>
        ) : (
          activeCampaigns.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
          ))
        )}
      </select>
    </div>
  )
}
