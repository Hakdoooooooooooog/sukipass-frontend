import { CustomerListCard } from '@/components/cashier/ui/CashierCards'
import { useCashier } from '@/lib/cashier/useCashier'

export function RecentSukisMeta() {
  const { customers } = useCashier()
  return <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">{customers.length} total</span>
}

function RecentSukisData() {
  const { customers } = useCashier()

  return (
    <div className="grid gap-2.5">
      {customers.slice(0, 4).map((customer) => (
        <CustomerListCard key={customer.id} customer={customer} />
      ))}
    </div>
  )
}

export default RecentSukisData
