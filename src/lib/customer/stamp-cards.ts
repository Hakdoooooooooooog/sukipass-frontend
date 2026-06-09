import { customer, type Accent, type StampCard } from '@/customerData'

export type CustomerStampCardRecord = {
  id: string
  customer_id: string
  business: {
    id: string
    name: string
  }
  campaign: {
    id: string
    name: string
    description: string
    reward_name: string
    required_stamps: number
    accent: Accent
  }
  progress: {
    collected_stamps: number
  }
}

export const customerStampCardRecords: CustomerStampCardRecord[] = [
  {
    id: 'customer-card-001',
    customer_id: customer.id,
    business: {
      id: 'business-suki-cafe',
      name: 'Suki Cafe',
    },
    campaign: {
      id: 'pastry',
      name: 'Pastry Lover',
      description: 'Sweet tooth ka ba? Kolekta na ng treats!',
      reward_name: 'Free croissant + brewed coffee',
      required_stamps: 10,
      accent: 'gold',
    },
    progress: {
      collected_stamps: 10,
    },
  },
  {
    id: 'customer-card-002',
    customer_id: customer.id,
    business: {
      id: 'business-suki-cafe',
      name: 'Suki Cafe',
    },
    campaign: {
      id: 'kape',
      name: 'Kape Club',
      description: 'Bawat kape, isang stamp. Kolektahin ang walo!',
      reward_name: 'Free 12oz latte',
      required_stamps: 8,
      accent: 'terra',
    },
    progress: {
      collected_stamps: 7,
    },
  },
  {
    id: 'customer-card-003',
    customer_id: customer.id,
    business: {
      id: 'business-suki-cafe',
      name: 'Suki Cafe',
    },
    campaign: {
      id: 'brew',
      name: 'Morning Brew',
      description: 'Start strong. Complete six visits this week.',
      reward_name: 'Free upgrade',
      required_stamps: 6,
      accent: 'forest',
    },
    progress: {
      collected_stamps: 2,
    },
  },
]

export function toStampCard(record: CustomerStampCardRecord): StampCard {
  return {
    id: record.campaign.id,
    store: record.business.name,
    title: record.campaign.name,
    description: record.campaign.description,
    filled: record.progress.collected_stamps,
    goal: record.campaign.required_stamps,
    reward: record.campaign.reward_name,
    accent: record.campaign.accent,
  }
}

export function getCustomerStampCards(customerId = customer.id) {
  return customerStampCardRecords.filter((record) => record.customer_id === customerId).map(toStampCard)
}
