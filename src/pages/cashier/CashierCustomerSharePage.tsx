import { ArrowLeft, CheckCircle2, Copy, Mail, MessageCircle, QrCode } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { CashierPageLayout } from '@/components/cashier/layout/CashierPageLayout'
import { ProgressCard } from '@/components/cashier/ui/CashierCards'
import { Button } from '@/components/ui/button'
import { cashierStore } from '@/lib/cashier/data'
import { useCashier } from '@/lib/cashier/useCashier'

export function CashierCustomerSharePage() {
  const { customerId } = useParams()
  const { campaigns, getCustomer } = useCashier()
  const customer = customerId ? getCustomer(customerId) : undefined
  const [copied, setCopied] = useState(false)

  const latestStamp = useMemo(() => customer?.recentActivity.find((activity) => activity.type === 'stamp'), [customer])
  const campaign = campaigns.find((item) => item.id === latestStamp?.campaignId)
  const progress = customer?.activeCampaigns.find((item) => item.campaignId === campaign?.id)
  const claimUrl = customer ? `${window.location.origin}/claim/${customer.claimToken}` : ''
  const hasDeliveryTarget = Boolean(customer?.email || customer?.phone)

  async function copyClaimUrl() {
    await navigator.clipboard?.writeText(claimUrl)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  if (!customer) {
    return (
      <CashierPageLayout label="Share customer claim link">
        <div className="mx-auto grid max-w-[520px] gap-4 rounded-[28px] border border-border bg-card/70 p-6 text-center shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <h1 className="m-0 font-[var(--heading)] text-4xl leading-none tracking-normal">Suki not found</h1>
          <Link to="/cashier/customers" className="font-bold text-[#c8543a]">Back to customers</Link>
        </div>
      </CashierPageLayout>
    )
  }

  return (
    <CashierPageLayout label={`${customer.nickname} claim handoff`}>
      <div className="mx-auto grid max-w-[980px] gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <section className="rounded-[30px] border border-border/80 bg-card/70 p-6 shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <Link to={`/cashier/customers/${customer.id}`} className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-background px-3 py-2 text-sm font-bold text-foreground no-underline">
            <ArrowLeft size={16} />
            Customer
          </Link>

          <div className="mb-6 flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-[#2f4f3e] text-[#eaf3ec]">
              <CheckCircle2 size={26} />
            </span>
            <div>
              <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c8543a]">Stamp saved</p>
              <h1 className="mb-2 mt-1 font-[var(--heading)] text-4xl leading-none tracking-normal">{customer.nickname}</h1>
              <p className="m-0 text-sm text-muted-foreground">Progress is already attached to this temporary account.</p>
            </div>
          </div>

          {campaign && progress && <ProgressCard campaign={campaign} stamps={progress.stamps} />}

          <div className="mt-5 rounded-[22px] border border-border/80 bg-background p-4">
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[14px] bg-card text-[#c8543a]">
                {hasDeliveryTarget ? <Mail size={18} /> : <QrCode size={18} />}
              </span>
              <div>
                <strong className="block text-sm">
                  {hasDeliveryTarget ? 'Claim link ready to send' : 'Ask customer to scan or take a photo'}
                </strong>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {hasDeliveryTarget
                    ? 'Use this same link for email or SMS delivery.'
                    : 'This QR is their easiest way to finish setup later.'}
                </span>
              </div>
            </div>
          </div>

          <Button asChild className="mt-5 h-12 w-full rounded-[16px] bg-[#c8543a] text-card hover:bg-[#b94831]">
            <Link to={`/cashier/customers/${customer.id}`}>Done</Link>
          </Button>
        </section>

        <aside className="rounded-[30px] border border-border/80 bg-card/70 p-5 text-center shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{cashierStore.name}</p>
          <div className="mx-auto mt-4 grid h-64 w-64 max-w-full place-items-center rounded-[28px] bg-background p-4">
            <QRCodeSVG value={claimUrl} size={218} fgColor="#241d18" bgColor="transparent" level="M" marginSize={2} title={`Claim SukiPass for ${customer.nickname}`} />
          </div>
          <p className="mb-0 mt-4 break-all rounded-[16px] bg-background px-3 py-2 font-mono text-xs text-muted-foreground">{claimUrl}</p>
          <button
            type="button"
            onClick={copyClaimUrl}
            className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[15px] border border-border bg-background px-4 text-sm font-bold text-foreground"
          >
            {copied ? <CheckCircle2 size={17} /> : <Copy size={17} />}
            {copied ? 'Copied' : 'Copy link'}
          </button>
          {(customer.email || customer.phone) && (
            <div className="mt-4 grid gap-2 text-left text-sm text-muted-foreground">
              {customer.email && <span className="inline-flex items-center gap-2"><Mail size={15} /> {customer.email}</span>}
              {customer.phone && <span className="inline-flex items-center gap-2"><MessageCircle size={15} /> {customer.phone}</span>}
            </div>
          )}
        </aside>
      </div>
    </CashierPageLayout>
  )
}
