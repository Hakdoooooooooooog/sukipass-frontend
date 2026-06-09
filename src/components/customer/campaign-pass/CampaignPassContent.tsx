import { ScanLine } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { getCustomerCard } from '@/lib/customer/cards'
import { CampaignPass } from './CampaignPass'

export function CampaignPassContent() {
  const { campaignId } = useParams()
  const card = getCustomerCard(campaignId)

  return (
    <div className="flex min-h-[calc(100svh-96px)] flex-col items-center justify-center gap-6 px-6 pb-[118px] pt-7">
      <div className="animate-in fade-in slide-in-from-bottom-3 duration-500 text-center">
        <p className="m-0 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Your SukiPass</p>
        <h1 className="mb-0 mt-1 font-[var(--heading)] text-[26px] leading-none tracking-normal text-foreground">Ipakita sa cashier</h1>
      </div>

      <CampaignPass card={card} />

      <p className="m-0 flex animate-in items-center gap-2 fade-in slide-in-from-bottom-3 font-medium text-muted-foreground duration-500">
        <ScanLine size={16} aria-hidden="true" />
        I-scan ito para makakuha ng stamp.
      </p>
    </div>
  )
}
