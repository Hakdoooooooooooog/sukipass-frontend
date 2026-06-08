import { activity, customer, type RewardActivity, type StampCard } from '@/customerData'
import { getCustomerStampCards } from './stamp-cards'

const ALMOST_THRESHOLD = 2

export type CustomerRewardHistoryItem = {
  id: string
  rewardName: string
  campaignName: string
  redeemedAt: string
}

export type CustomerRewardsData = {
  ready: StampCard[]
  almost: StampCard[]
  history: CustomerRewardHistoryItem[]
}

function toRewardHistoryItem(record: RewardActivity): CustomerRewardHistoryItem {
  return {
    id: record.id,
    rewardName: record.reward ?? 'Reward na-claim',
    campaignName: record.campaignName ?? 'Reward',
    redeemedAt: record.at,
  }
}

export function getCustomerRewardHistory(customerId = customer.id) {
  return activity
    .filter((record) => record.customerId === customerId && record.type === 'redeem')
    .map(toRewardHistoryItem)
}

export function getCustomerRewardsData(customerId = customer.id): CustomerRewardsData {
  const stampCards = getCustomerStampCards(customerId)

  return {
    ready: stampCards.filter((card) => card.filled >= card.goal),
    almost: stampCards
      .filter((card) => card.filled < card.goal && card.goal - card.filled <= ALMOST_THRESHOLD)
      .sort((a, b) => a.goal - a.filled - (b.goal - b.filled)),
    history: getCustomerRewardHistory(customerId),
  }
}
