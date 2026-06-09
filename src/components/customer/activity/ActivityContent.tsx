import type { CustomerActivityData } from '@/lib/customer/activity'
import { ActivityStats } from './ActivityStats'
import { ActivityTimeline } from './ActivityTimeline'

export function ActivityContent({ data }: { data: CustomerActivityData }) {
  return (
    <section className="grid gap-6 lg:col-start-2 lg:row-span-3 lg:row-start-1">
      <ActivityStats stampCount={data.stampCount} rewardCount={data.rewardCount} totalSpent={data.totalSpent} />
      <ActivityTimeline groups={data.groups} />
    </section>
  )
}
