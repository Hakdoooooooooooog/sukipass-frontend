import { ArrowLeft, Minus, Plus, Stamp, UserPlus } from 'lucide-react'
import { lazy, Suspense, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CashierPageLayout } from '@/components/cashier/layout/CashierPageLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCashier } from '@/lib/cashier/useCashier'

const NewCustomerCampaignSelect = lazy(() => import('@/components/cashier/customers/NewCustomerCampaignSelect'))

function CampaignSelectSkeleton() {
  return (
    <div className="grid gap-2">
      <span className="h-3 w-20 rounded-full bg-card/70" />
      <span className="relative h-12 overflow-hidden rounded-[14px] border border-input bg-background before:absolute before:inset-y-0 before:w-1/2 before:-translate-x-full before:animate-[skeleton-shimmer_1.35s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent" />
    </div>
  )
}

export function CashierNewCustomerPage() {
  const navigate = useNavigate()
  const { addCustomer, addProgress, campaigns } = useCashier()
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const activeCampaigns = useMemo(() => campaigns.filter((campaign) => campaign.active), [campaigns])
  const [campaignId, setCampaignId] = useState(activeCampaigns[0]?.id || '')
  const [stamps, setStamps] = useState(1)
  const [error, setError] = useState('')
  const selectedCampaign = activeCampaigns.find((campaign) => campaign.id === campaignId)

  return (
    <CashierPageLayout label="Add cashier customer">
      <div className="mx-auto grid max-w-[620px] gap-5">
        <Link to="/cashier/customers" className="inline-flex w-fit items-center gap-2 rounded-full bg-card/70 px-3 py-2 text-sm font-bold text-foreground no-underline">
          <ArrowLeft size={16} />
          Customers
        </Link>

        <section className="rounded-[30px] border border-border/80 bg-card/70 p-6 shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <div className="mb-6 flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-[#2f4f3e] text-[#eaf3ec]">
              <UserPlus size={24} />
            </span>
            <div>
              <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c8543a]">New suki</p>
              <h1 className="mb-0 mt-1 font-[var(--heading)] text-4xl leading-none tracking-normal">Add customer</h1>
            </div>
          </div>

          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              if (nickname.trim().length < 2) {
                setError('Nickname must be at least 2 characters.')
                return
              }
              if (!selectedCampaign) {
                setError('Choose a campaign.')
                return
              }
              const customer = addCustomer({ nickname, email, phone })
              addProgress(customer.id, selectedCampaign.id, stamps)
              navigate(`/cashier/customers/${customer.id}/share`)
            }}
          >
            <div className="grid gap-2">
              <label htmlFor="nickname" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Nickname
              </label>
              <Input id="nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} autoComplete="name" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Email optional
              </label>
              <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Phone optional
              </label>
              <Input id="phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" />
            </div>
            <Suspense fallback={<CampaignSelectSkeleton />}>
              <NewCustomerCampaignSelect value={campaignId} onChange={setCampaignId} />
            </Suspense>
            <div className="flex items-end justify-between gap-4 rounded-[20px] bg-background p-3">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Stamps</label>
                <strong className="flex items-center gap-2 font-[var(--heading)] text-4xl leading-none tracking-normal">
                  <Stamp size={24} />
                  {stamps}
                </strong>
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
            {error && <p className="m-0 text-sm font-bold text-destructive">{error}</p>}
            <Button type="submit" className="mt-2 h-12 rounded-[16px] bg-[#c8543a] text-card hover:bg-[#b94831]">
              Create and add stamp
            </Button>
          </form>
        </section>
      </div>
    </CashierPageLayout>
  )
}
