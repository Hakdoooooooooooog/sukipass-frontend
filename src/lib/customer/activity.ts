import { activity, cards, customer, type Accent, type RewardActivity } from '@/customerData'

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export type ActivityDayGroup = {
  key: string
  label: string
  items: RewardActivity[]
}

export type CustomerActivityData = {
  items: RewardActivity[]
  stampCount: number
  rewardCount: number
  totalSpent: number
  groups: ActivityDayGroup[]
}

function dayKey(iso: string) {
  return iso.slice(0, 10)
}

function dayLabel(key: string) {
  const date = new Date(`${key}T00:00:00Z`)
  return `${weekdays[date.getUTCDay()]} - ${months[date.getUTCMonth()]} ${date.getUTCDate()}`
}

function groupByDay(items: RewardActivity[]) {
  const groups: ActivityDayGroup[] = []
  let current: ActivityDayGroup | null = null

  for (const item of items) {
    const key = dayKey(item.at)
    if (!current || current.key !== key) {
      current = { key, label: dayLabel(key), items: [] }
      groups.push(current)
    }
    current.items.push(item)
  }

  return groups
}

export function activityLine(item: RewardActivity) {
  switch (item.type) {
    case 'stamp': {
      const count = item.stamps ?? 1
      return `+${count} stamp${count > 1 ? 's' : ''} sa ${item.campaignName ?? 'card'}`
    }
    case 'redeem':
      return `Na-claim: ${item.reward ?? item.campaignName ?? 'reward'}`
    case 'join':
      return 'Sumali ka sa SukiPass!'
    case 'campaign':
      return item.campaignName ?? 'Bagong campaign'
  }
}

export function activityItemsPreview(item: RewardActivity) {
  const receiptItems = item.receipt?.items
  if (!receiptItems?.length) return null
  return receiptItems.map((receiptItem) => (receiptItem.qty > 1 ? `${receiptItem.qty}x ${receiptItem.name}` : receiptItem.name)).join(' - ')
}

export function activityAccent(item: RewardActivity): Accent {
  if (item.type === 'redeem') return 'gold'
  if (item.type === 'join' || item.type === 'campaign') return 'forest'
  return cards.find((card) => card.id === item.campaignId)?.accent ?? 'terra'
}

export function getCustomerActivityData(customerId = customer.id): CustomerActivityData {
  const items = activity.filter((item) => item.customerId === customerId)

  return {
    items,
    stampCount: items.filter((item) => item.type === 'stamp').reduce((sum, item) => sum + (item.stamps ?? 1), 0),
    rewardCount: items.filter((item) => item.type === 'redeem').length,
    totalSpent: items.reduce((sum, item) => sum + (item.amount ?? 0), 0),
    groups: groupByDay(items),
  }
}
