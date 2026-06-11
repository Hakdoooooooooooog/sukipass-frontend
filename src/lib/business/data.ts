import { cashierCampaigns, cashierCustomers, cashierStore } from '@/lib/cashier/data'

export type OwnerKpi = {
  label: string
  shortLabel: string
  value: string
  delta: string
  shortDelta: string
  tone: 'terra' | 'forest' | 'gold'
}

export type OwnerChartBar = {
  date: string
  label: string
  sales: number
  newCustomers: number
  stamps: number
}

export type OwnerActivity = {
  id: string
  customer: string
  action: string
  detail: string
  at: string
}

export type OwnerCampaignPerformance = {
  title: string
  enrolled: number
  readyToClaim: number
  tone: 'terra' | 'forest' | 'gold'
}

export type BusinessCampaignStatus = 'active' | 'paused' | 'draft'

export type BusinessCampaignSummary = {
  id: string
  title: string
  description: string
  reward: string
  goal: number
  tone: 'terra' | 'forest' | 'gold'
  status: BusinessCampaignStatus
  enrolled: number
  readyToClaim: number
  totalStamps: number
  updatedAt: string
}

export type BusinessCustomerStatus = 'claimed' | 'temporary'

export type BusinessCustomerSummary = {
  id: string
  name: string
  code: string
  status: BusinessCustomerStatus
  email?: string
  phone?: string
  claimToken: string
  totalStamps: number
  activeCards: number
  readyRewards: number
  lastActivityAt: string
  campaigns: Array<{
    id: string
    title: string
    reward: string
    stamps: number
    goal: number
    tone: 'terra' | 'forest' | 'gold'
  }>
  recentActivity: OwnerActivity[]
}

export type BusinessStaffRole = 'owner' | 'cashier'
export type BusinessStaffStatus = 'active' | 'invited' | 'disabled'

export type BusinessStaffAccount = {
  id: string
  name: string
  contact: string
  role: BusinessStaffRole
  status: BusinessStaffStatus
  branch: string
  lastActive: string
}

export type BusinessSettings = {
  profile: {
    name: string
    branch: string
    address: string
    phone: string
    email: string
    displayName: string
  }
}

const pesoCompact = new Intl.NumberFormat('en-PH', {
  currency: 'PHP',
  maximumFractionDigits: 0,
  notation: 'compact',
  style: 'currency',
})

export const businessProfile = {
  name: cashierStore.name,
  slug: 'suki-cafe',
  owner: 'Tala Reyes',
  branch: cashierStore.branch,
  plan: 'Owner workspace',
}

export const businessSettings: BusinessSettings = {
  profile: {
    name: cashierStore.name,
    branch: cashierStore.branch,
    address: '123 Mabini St, San Juan City',
    phone: '+63 917 123 4567',
    email: 'owner@sukicafe.test',
    displayName: cashierStore.name,
  },
}

export const businessStaffAccounts: BusinessStaffAccount[] = [
  {
    id: 'staff-tala',
    name: 'Tala Reyes',
    contact: 'owner@sukicafe.test',
    role: 'owner',
    status: 'active',
    branch: cashierStore.branch,
    lastActive: '2026-06-11T04:10:00.000Z',
  },
  {
    id: 'staff-mika',
    name: 'Mika Santos',
    contact: '+63 917 230 4100',
    role: 'cashier',
    status: 'active',
    branch: cashierStore.branch,
    lastActive: '2026-06-10T08:30:00.000Z',
  },
  {
    id: 'staff-nico',
    name: 'Nico Cruz',
    contact: 'nico@sukicafe.test',
    role: 'cashier',
    status: 'invited',
    branch: cashierStore.branch,
    lastActive: '2026-06-08T02:20:00.000Z',
  },
]

const claimedProfiles = cashierCustomers.filter((customer) => customer.status === 'claimed').length
export const ownerDailyPerformance: OwnerChartBar[] = [
  { date: '2026-05-13', label: 'May 13', sales: 2910, newCustomers: 1, stamps: 7 },
  { date: '2026-05-14', label: 'May 14', sales: 3440, newCustomers: 1, stamps: 8 },
  { date: '2026-05-15', label: 'May 15', sales: 4020, newCustomers: 2, stamps: 10 },
  { date: '2026-05-16', label: 'May 16', sales: 4860, newCustomers: 2, stamps: 12 },
  { date: '2026-05-17', label: 'May 17', sales: 5120, newCustomers: 3, stamps: 14 },
  { date: '2026-05-18', label: 'May 18', sales: 3680, newCustomers: 1, stamps: 8 },
  { date: '2026-05-19', label: 'May 19', sales: 3310, newCustomers: 1, stamps: 7 },
  { date: '2026-05-20', label: 'May 20', sales: 3920, newCustomers: 2, stamps: 9 },
  { date: '2026-05-21', label: 'May 21', sales: 4210, newCustomers: 2, stamps: 11 },
  { date: '2026-05-22', label: 'May 22', sales: 4670, newCustomers: 2, stamps: 12 },
  { date: '2026-05-23', label: 'May 23', sales: 5380, newCustomers: 3, stamps: 15 },
  { date: '2026-05-24', label: 'May 24', sales: 6020, newCustomers: 4, stamps: 18 },
  { date: '2026-05-25', label: 'May 25', sales: 3840, newCustomers: 1, stamps: 9 },
  { date: '2026-05-26', label: 'May 26', sales: 3240, newCustomers: 1, stamps: 8 },
  { date: '2026-05-27', label: 'May 27', sales: 4180, newCustomers: 2, stamps: 11 },
  { date: '2026-05-28', label: 'May 28', sales: 3720, newCustomers: 1, stamps: 9 },
  { date: '2026-05-29', label: 'May 29', sales: 5250, newCustomers: 3, stamps: 15 },
  { date: '2026-05-30', label: 'May 30', sales: 4860, newCustomers: 2, stamps: 13 },
  { date: '2026-05-31', label: 'May 31', sales: 6420, newCustomers: 4, stamps: 19 },
  { date: '2026-06-01', label: 'Jun 1', sales: 3950, newCustomers: 1, stamps: 10 },
  { date: '2026-06-02', label: 'Jun 2', sales: 3560, newCustomers: 1, stamps: 9 },
  { date: '2026-06-03', label: 'Jun 3', sales: 4510, newCustomers: 2, stamps: 12 },
  { date: '2026-06-04', label: 'Jun 4', sales: 3890, newCustomers: 1, stamps: 10 },
  { date: '2026-06-05', label: 'Jun 5', sales: 5480, newCustomers: 3, stamps: 16 },
  { date: '2026-06-06', label: 'Jun 6', sales: 4970, newCustomers: 2, stamps: 14 },
  { date: '2026-06-07', label: 'Jun 7', sales: 6810, newCustomers: 4, stamps: 21 },
  { date: '2026-06-08', label: 'Jun 8', sales: 4220, newCustomers: 2, stamps: 11 },
  { date: '2026-06-09', label: 'Jun 9', sales: 4360, newCustomers: 2, stamps: 12 },
  { date: '2026-06-10', label: 'Jun 10', sales: 5120, newCustomers: 3, stamps: 15 },
  { date: '2026-06-11', label: 'Jun 11', sales: 5740, newCustomers: 3, stamps: 17 },
]

export function getOwnerRangeData(days: number) {
  const daily = ownerDailyPerformance.slice(-days)
  const totalSales = daily.reduce((sum, day) => sum + day.sales, 0)
  const totalNewCustomers = daily.reduce((sum, day) => sum + day.newCustomers, 0)
  const totalStamps = daily.reduce((sum, day) => sum + day.stamps, 0)
  const averageDailySales = Math.round(totalSales / Math.max(daily.length, 1))

  return {
    daily,
    kpis: [
      { label: 'Sales', shortLabel: 'Sales', value: pesoCompact.format(totalSales), delta: `Last ${days} days`, shortDelta: `${days} days`, tone: 'forest' },
      { label: 'New sukis', shortLabel: 'New', value: String(totalNewCustomers), delta: 'Created by cashier', shortDelta: 'Sukis', tone: 'terra' },
      { label: 'Stamps added', shortLabel: 'Stamps', value: String(totalStamps), delta: 'Across campaigns', shortDelta: 'Added', tone: 'gold' },
      { label: 'Avg. daily sales', shortLabel: 'Avg/day', value: pesoCompact.format(averageDailySales), delta: `${claimedProfiles} claimed profiles`, shortDelta: 'Sales', tone: 'forest' },
    ] satisfies OwnerKpi[],
  }
}

export const ownerFunnel = [
  { label: 'Stamped customers', value: cashierCustomers.filter((customer) => customer.totalStamps > 0).length },
  { label: 'Claimed profiles', value: claimedProfiles },
  { label: 'Reward-ready', value: cashierCustomers.filter((customer) =>
    customer.activeCampaigns.some((progress) => {
      const campaign = cashierCampaigns.find((item) => item.id === progress.campaignId)
      return campaign ? progress.stamps >= campaign.goal : false
    }),
  ).length },
]

export const ownerCampaignPerformance: OwnerCampaignPerformance[] = cashierCampaigns.map((campaign) => {
  const matchingProgress = cashierCustomers.flatMap((customer) =>
    customer.activeCampaigns.filter((progress) => progress.campaignId === campaign.id && progress.stamps > 0),
  )

  return {
    title: campaign.title,
    enrolled: matchingProgress.length,
    readyToClaim: matchingProgress.filter((progress) => progress.stamps >= campaign.goal).length,
    tone: campaign.accent,
  }
})

export const businessCampaigns: BusinessCampaignSummary[] = cashierCampaigns.map((campaign, index) => {
  const matchingProgress = cashierCustomers.flatMap((customer) =>
    customer.activeCampaigns.filter((progress) => progress.campaignId === campaign.id && progress.stamps > 0),
  )

  return {
    id: campaign.id,
    title: campaign.title,
    description: campaign.description,
    reward: campaign.reward,
    goal: campaign.goal,
    tone: campaign.accent,
    status: campaign.active ? 'active' : 'paused',
    enrolled: matchingProgress.length,
    readyToClaim: matchingProgress.filter((progress) => progress.stamps >= campaign.goal).length,
    totalStamps: matchingProgress.reduce((sum, progress) => sum + progress.stamps, 0),
    updatedAt: `2026-06-${String(9 - index).padStart(2, '0')}T04:30:00.000Z`,
  }
})

export const businessCustomers: BusinessCustomerSummary[] = cashierCustomers.map((customer) => {
  const campaigns = customer.activeCampaigns
    .map((progress) => {
      const campaign = cashierCampaigns.find((item) => item.id === progress.campaignId)
      if (!campaign) return null
      return {
        id: campaign.id,
        title: campaign.title,
        reward: campaign.reward,
        stamps: progress.stamps,
        goal: campaign.goal,
        tone: campaign.accent,
      }
    })
    .filter((campaign): campaign is NonNullable<typeof campaign> => Boolean(campaign))

  return {
    id: customer.id,
    name: customer.fullName || customer.nickname,
    code: customer.code,
    status: customer.status,
    email: customer.email,
    phone: customer.phone,
    claimToken: customer.claimToken,
    totalStamps: customer.totalStamps,
    activeCards: campaigns.filter((campaign) => campaign.stamps > 0).length,
    readyRewards: campaigns.filter((campaign) => campaign.stamps >= campaign.goal).length,
    lastActivityAt: customer.recentActivity[0]?.at ?? customer.joinedAt,
    campaigns,
    recentActivity: customer.recentActivity.map((activity) => {
      const campaign = cashierCampaigns.find((item) => item.id === activity.campaignId)
      return {
        id: activity.id,
        customer: customer.nickname,
        action: activity.type === 'join' ? 'Card created' : `Added ${activity.stamps ?? 1} stamp${activity.stamps === 1 ? '' : 's'}`,
        detail: campaign?.title ?? 'SukiPass card',
        at: activity.at,
      }
    }),
  }
})

export const businessCustomerTotals = {
  total: businessCustomers.length,
  claimed: businessCustomers.filter((customer) => customer.status === 'claimed').length,
  temporary: businessCustomers.filter((customer) => customer.status === 'temporary').length,
  ready: businessCustomers.filter((customer) => customer.readyRewards > 0).length,
}

export const ownerActivity: OwnerActivity[] = cashierCustomers.flatMap((customer) =>
  customer.recentActivity.map((activity) => {
    const campaign = cashierCampaigns.find((item) => item.id === activity.campaignId)
    return {
      id: activity.id,
      customer: customer.nickname,
      action: activity.type === 'join' ? 'Card created' : `Added ${activity.stamps ?? 1} stamp${activity.stamps === 1 ? '' : 's'}`,
      detail: campaign?.title ?? 'SukiPass card',
      at: activity.at,
    }
  }),
).sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())

export function getBusinessDisplayName(slug?: string) {
  if (!slug || slug === businessProfile.slug) return businessProfile.name
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(' ')
}
