import { BadgeCheck, MapPin, Store, UserRound } from 'lucide-react'
import { CashierPageLayout } from '@/components/cashier/layout/CashierPageLayout'
import { cashierStore } from '@/lib/cashier/data'

export function CashierAccountPage() {
  return (
    <CashierPageLayout label="Cashier account">
      <div className="mx-auto grid max-w-[720px] gap-5">
        <section className="relative overflow-hidden rounded-[30px] border border-border/80 bg-card/70 p-6 shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <span className="pointer-events-none absolute right-[-52px] top-[-52px] h-44 w-44 rounded-full bg-[#2f4f3e]/15" aria-hidden="true" />
          <span className="grid h-16 w-16 place-items-center rounded-[22px] bg-[#2f4f3e] font-[var(--heading)] text-xl text-[#eaf3ec]">{cashierStore.monogram}</span>
          <p className="mb-0 mt-7 font-mono text-xs uppercase tracking-[0.16em] text-[#c8543a]">Cashier account</p>
          <h1 className="mb-2 mt-3 font-[var(--heading)] text-[44px] leading-none tracking-normal">{cashierStore.name}</h1>
          <p className="m-0 text-muted-foreground">Signed in as {cashierStore.cashierName}.</p>
        </section>

        <div className="grid gap-3 md:grid-cols-3">
          <article className="rounded-[22px] border border-border bg-card/70 p-5">
            <Store className="mb-4 text-[#c8543a]" size={22} />
            <strong className="block">Store role</strong>
            <span className="text-sm text-muted-foreground">Cashier</span>
          </article>
          <article className="rounded-[22px] border border-border bg-card/70 p-5">
            <MapPin className="mb-4 text-[#c8543a]" size={22} />
            <strong className="block">Branch</strong>
            <span className="text-sm text-muted-foreground">{cashierStore.branch}</span>
          </article>
          <article className="rounded-[22px] border border-border bg-card/70 p-5">
            <BadgeCheck className="mb-4 text-[#c8543a]" size={22} />
            <strong className="block">Status</strong>
            <span className="text-sm text-muted-foreground">Ready to scan</span>
          </article>
        </div>

        <section className="rounded-[24px] border border-border/80 bg-card/70 p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-[17px] bg-background text-foreground">
              <UserRound size={20} />
            </span>
            <div>
              <strong className="block">{cashierStore.cashierName}</strong>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Session only demo account</span>
            </div>
          </div>
        </section>
      </div>
    </CashierPageLayout>
  )
}
