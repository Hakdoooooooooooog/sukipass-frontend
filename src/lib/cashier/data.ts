import type { CashierCampaign, CashierCustomer } from './types'

export const cashierStore = {
  name: 'Suki Cafe',
  monogram: 'SC',
  cashierName: 'Mika',
  branch: 'San Juan',
}

export const cashierCampaigns: CashierCampaign[] = [
  {
    id: 'pastry',
    title: 'Pastry Lover',
    description: 'Sweet treats, morning visits, and quick repeat rewards.',
    reward: 'Free croissant + brewed coffee',
    goal: 10,
    accent: 'gold',
    active: true,
    customerCount: 84,
  },
  {
    id: 'kape',
    title: 'Kape Club',
    description: 'A stamp for every coffee purchase.',
    reward: 'Free 12oz latte',
    goal: 8,
    accent: 'terra',
    active: true,
    customerCount: 127,
  },
  {
    id: 'brew',
    title: 'Morning Brew',
    description: 'A weekly card for early regulars.',
    reward: 'Free size upgrade',
    goal: 6,
    accent: 'forest',
    active: true,
    customerCount: 46,
  },
]

export const cashierCustomers: CashierCustomer[] = [
  {
    id: 'cashier-andrea',
    status: 'claimed',
    nickname: 'Andrea',
    fullName: 'Andrea Reyes',
    email: 'andrea@example.com',
    phone: '+63 917 230 4100',
    code: 'SUKI-7F3K9A',
    claimToken: 'claim-andrea',
    claimedAt: '2026-05-25T02:08:00.000Z',
    joinedAt: '2026-05-25T02:00:00.000Z',
    totalStamps: 19,
    activeCampaigns: [
      { campaignId: 'pastry', stamps: 10 },
      { campaignId: 'kape', stamps: 7 },
      { campaignId: 'brew', stamps: 2 },
    ],
    recentActivity: [
      { id: 'andrea-3', customerId: 'cashier-andrea', campaignId: 'kape', type: 'stamp', stamps: 2, at: '2026-06-08T01:45:00.000Z' },
      { id: 'andrea-2', customerId: 'cashier-andrea', campaignId: 'pastry', type: 'stamp', stamps: 1, at: '2026-06-07T03:12:00.000Z' },
      { id: 'andrea-1', customerId: 'cashier-andrea', campaignId: 'brew', type: 'join', at: '2026-05-25T02:00:00.000Z' },
    ],
  },
  {
    id: 'cashier-nico',
    status: 'claimed',
    nickname: 'Nico',
    fullName: 'Nico Santos',
    phone: '+63 918 555 1122',
    code: 'SUKI-4M8P2C',
    claimToken: 'claim-nico',
    claimedAt: '2026-06-01T05:24:00.000Z',
    joinedAt: '2026-06-01T05:20:00.000Z',
    totalStamps: 8,
    activeCampaigns: [
      { campaignId: 'kape', stamps: 5 },
      { campaignId: 'brew', stamps: 3 },
    ],
    recentActivity: [
      { id: 'nico-2', customerId: 'cashier-nico', campaignId: 'kape', type: 'stamp', stamps: 1, at: '2026-06-09T02:18:00.000Z' },
      { id: 'nico-1', customerId: 'cashier-nico', campaignId: 'brew', type: 'stamp', stamps: 2, at: '2026-06-06T00:41:00.000Z' },
    ],
  },
  {
    id: 'cashier-ella',
    status: 'claimed',
    nickname: 'Ella',
    fullName: 'Ella Cruz',
    email: 'ella@example.com',
    code: 'SUKI-8Q1B6L',
    claimToken: 'claim-ella',
    claimedAt: '2026-05-30T08:18:00.000Z',
    joinedAt: '2026-05-30T08:11:00.000Z',
    totalStamps: 11,
    activeCampaigns: [
      { campaignId: 'pastry', stamps: 4 },
      { campaignId: 'kape', stamps: 7 },
    ],
    recentActivity: [
      { id: 'ella-2', customerId: 'cashier-ella', campaignId: 'pastry', type: 'stamp', stamps: 1, at: '2026-06-08T07:45:00.000Z' },
      { id: 'ella-1', customerId: 'cashier-ella', campaignId: 'kape', type: 'stamp', stamps: 1, at: '2026-06-04T04:23:00.000Z' },
    ],
  },
  {
    id: 'cashier-jo',
    status: 'claimed',
    nickname: 'Jo',
    fullName: 'Jo Lim',
    phone: '+63 905 442 7719',
    code: 'SUKI-2N5V8R',
    claimToken: 'claim-jo',
    claimedAt: '2026-06-04T01:10:00.000Z',
    joinedAt: '2026-06-04T01:03:00.000Z',
    totalStamps: 3,
    activeCampaigns: [{ campaignId: 'brew', stamps: 3 }],
    recentActivity: [
      { id: 'jo-1', customerId: 'cashier-jo', campaignId: 'brew', type: 'stamp', stamps: 3, at: '2026-06-04T01:03:00.000Z' },
    ],
  },
]
