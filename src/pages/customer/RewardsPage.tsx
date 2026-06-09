import { lazy, Suspense } from 'react'
import { CustomerPageLayout } from '@/components/customer/layout/CustomerPageLayout'
import { RewardsProfile } from '@/components/customer/rewards/RewardsProfile'
import { RewardsContentSkeleton, RewardsProfileStatusSkeleton } from '@/components/customer/rewards/RewardsPageSkeleton'

const CustomerRewardsContentData = lazy(() => import('@/components/customer/rewards/CustomerRewardsContentData'))
const RewardsProfileStatusData = lazy(() => import('@/components/customer/rewards/RewardsProfileStatusData'))

export function RewardsPage() {
  return (
    <CustomerPageLayout label="Customer rewards">
      <RewardsProfile
        status={
          <Suspense fallback={<RewardsProfileStatusSkeleton />}>
            <RewardsProfileStatusData />
          </Suspense>
        }
      />

      <Suspense fallback={<RewardsContentSkeleton />}>
        <CustomerRewardsContentData />
      </Suspense>
    </CustomerPageLayout>
  )
}
