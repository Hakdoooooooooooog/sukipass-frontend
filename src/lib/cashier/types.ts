import type { Accent } from '@/customerData'

export type CashierCampaign = {
  id: string
  title: string
  description: string
  reward: string
  goal: number
  accent: Accent
  active: boolean
  customerCount: number
}

export type CustomerCampaignProgress = {
  campaignId: string
  stamps: number
}

export type CashierActivity = {
  id: string
  customerId: string
  campaignId: string
  type: 'stamp' | 'join'
  stamps?: number
  at: string
}

export type CashierCustomer = {
  id: string
  status: 'temporary' | 'claimed'
  nickname: string
  fullName?: string
  email?: string
  phone?: string
  code: string
  claimToken: string
  claimedAt?: string
  joinedAt: string
  totalStamps: number
  activeCampaigns: CustomerCampaignProgress[]
  recentActivity: CashierActivity[]
}

export type NewCashierCustomer = {
  nickname: string
  email?: string
  phone?: string
}

export type ClaimCustomerProfileInput = {
  fullName: string
  email?: string
  phone?: string
  pin: string
}
