import { customer } from '@/customerData'
import { getCustomerActivityData } from '@/lib/customer/activity'
import { ActivityContent } from './ActivityContent'

export default function ActivityContentData() {
  const data = getCustomerActivityData(customer.id)

  return <ActivityContent data={data} />
}
