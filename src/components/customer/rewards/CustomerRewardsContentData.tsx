import { customer } from '@/customerData'
import { getCustomerRewardsData } from '@/lib/customer/rewards'
import { RewardsContent } from './RewardsContent'

export default function CustomerRewardsContentData() {
  const { ready, almost, history } = getCustomerRewardsData(customer.id)

  return <RewardsContent ready={ready} almost={almost} history={history} />
}
