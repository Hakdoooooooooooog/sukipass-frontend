import { customer } from '@/customerData'
import { getCustomerRewardsData } from '@/lib/customer/rewards'
import { RewardsProfileStatus } from './RewardsProfileStatus'

export default function RewardsProfileStatusData() {
  const { ready, almost } = getCustomerRewardsData(customer.id)

  return <RewardsProfileStatus readyCount={ready.length} almostCount={almost.length} />
}
