import { lazy, Suspense } from 'react'
import { ActivityContentSkeleton } from '@/components/customer/activity/ActivityContentSkeleton'
import { ActivityProfile } from '@/components/customer/activity/ActivityProfile'
import { CustomerPageLayout } from '@/components/customer/layout/CustomerPageLayout'

const ActivityContentData = lazy(() => import('@/components/customer/activity/ActivityContentData'))

export function ActivityPage() {
  return (
    <CustomerPageLayout label="Customer activity">
      <ActivityProfile />

      <Suspense fallback={<ActivityContentSkeleton />}>
        <ActivityContentData />
      </Suspense>
    </CustomerPageLayout>
  )
}
