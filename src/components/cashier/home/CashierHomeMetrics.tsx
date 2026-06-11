import { ScrollText, Stamp, UsersRound } from 'lucide-react'
import { MetricPill } from '@/components/cashier/ui/CashierCards'
import { useCashier } from '@/lib/cashier/useCashier'

function CashierHomeMetrics() {
  const { campaigns, customers } = useCashier()
  const activeCampaigns = campaigns.filter((campaign) => campaign.active)
  const stampsToday = customers.reduce((total, customer) => total + customer.recentActivity.filter((activity) => activity.type === 'stamp').reduce((sum, activity) => sum + (activity.stamps || 0), 0), 0)

  return (
    <div className="mt-5 grid grid-cols-3 gap-2">
      <MetricPill label="Sukis" value={String(customers.length)} Icon={UsersRound} />
      <MetricPill label="Cards" value={String(activeCampaigns.length)} Icon={ScrollText} />
      <MetricPill label="Stamps" value={String(stampsToday)} Icon={Stamp} />
    </div>
  )
}

export default CashierHomeMetrics
