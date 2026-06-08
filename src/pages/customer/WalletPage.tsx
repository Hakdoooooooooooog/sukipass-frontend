import { lazy, Suspense } from 'react'
import { CustomerPageLayout } from '@/components/customer/layout/CustomerPageLayout'
import { CustomerHeader } from '@/components/customer/wallet/CustomerHeader'
import { StampCardsSkeleton } from '@/components/customer/wallet/StampCardsSkeleton'

const CustomerStampCards = lazy(() => import('@/components/customer/wallet/CustomerStampCards'))

export function WalletPage() {
  return (
    <CustomerPageLayout label="Customer wallet">
      <CustomerHeader />

      <Suspense fallback={<StampCardsSkeleton />}>
        <CustomerStampCards />
      </Suspense>
    </CustomerPageLayout>
  )
}
