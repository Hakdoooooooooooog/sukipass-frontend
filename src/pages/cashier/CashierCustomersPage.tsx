import { Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CashierPageLayout } from '@/components/cashier/layout/CashierPageLayout'
import { CashierSection, CustomerListCard } from '@/components/cashier/ui/CashierCards'
import { Input } from '@/components/ui/input'
import { useCashier } from '@/lib/cashier/useCashier'

export function CashierCustomersPage() {
  const { searchCustomers } = useCashier()
  const [query, setQuery] = useState('')
  const customers = useMemo(() => searchCustomers(query), [query, searchCustomers])

  return (
    <CashierPageLayout label="Cashier customers">
      <div className="grid gap-6 lg:grid-cols-[minmax(300px,360px)_minmax(0,1fr)] lg:items-start lg:gap-x-[clamp(32px,5vw,72px)]">
        <header className="rounded-[30px] border border-border/80 bg-card/60 p-6 shadow-[0_24px_70px_rgba(120,72,44,0.1)] backdrop-blur-md lg:sticky lg:top-12 lg:min-h-[520px] lg:p-[30px]">
          <p className="m-0 font-mono text-xs uppercase tracking-[0.16em] text-[#c8543a]">Directory</p>
          <h1 className="mb-3 mt-3 font-[var(--heading)] text-[42px] leading-[0.96] tracking-normal">Suki list</h1>
          <p className="m-0 text-sm text-muted-foreground">Search by nickname, SukiPass code, email, or phone.</p>
          <Link to="/cashier/customers/new" className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] bg-[#c8543a] px-4 font-bold text-card no-underline shadow-[0_16px_34px_rgba(200,84,58,0.22)] transition-transform duration-200 hover:-translate-y-0.5">
            <Plus size={18} />
            Add customer
          </Link>
        </header>

        <CashierSection title="Customers" meta={`${customers.length} shown`} className="lg:pt-1">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customers" className="pl-11" autoComplete="off" />
          </div>
          <div className="grid gap-2.5">
            {customers.length > 0 ? (
              customers.map((customer) => <CustomerListCard key={customer.id} customer={customer} />)
            ) : (
              <p className="rounded-[22px] border border-border bg-card/70 px-5 py-8 text-center text-sm text-muted-foreground">No matching suki.</p>
            )}
          </div>
        </CashierSection>
      </div>
    </CashierPageLayout>
  )
}
