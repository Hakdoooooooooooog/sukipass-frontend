export type Accent = 'gold' | 'terra' | 'forest'

export type StampCard = {
  id: string
  store: string
  title: string
  description: string
  filled: number
  goal: number
  reward: string
  accent: Accent
}

export type RewardActivity = {
  id: string
  type: 'redeem' | 'stamp' | 'join' | 'campaign'
  customerId: string
  campaignId?: string
  campaignName?: string
  reward?: string
  stamps?: number
  amount?: number
  receipt?: {
    items: Array<{
      name: string
      qty: number
    }>
  }
  at: string
}

export type ReceiptData = {
  id: string
  type: 'stamp' | 'redeem'
  store: {
    name: string
    address: string
    phone: string
  }
  ref: string
  date: string
  customerName: string
  cashier: string
  items: Array<{
    name: string
    qty: number
    unitPrice: number
    earnsStamp?: boolean
  }>
  subtotal: number
  discount: number
  total: number
  method: string
  stamps?: number
  reward?: string
  campaignName?: string
}

export const customer = {
  id: 'customer-andrea',
  name: 'Andrea',
  code: 'SUKI-7F3K9A',
  accent: 'gold' as Accent,
}

export const store = {
  name: 'Suki Cafe',
}

export const cards: StampCard[] = [
  {
    id: 'pastry',
    store: 'Suki Cafe',
    title: 'Pastry Lover',
    description: 'Sweet tooth ka ba? Kolekta na ng treats!',
    filled: 10,
    goal: 10,
    reward: 'Free croissant + brewed coffee',
    accent: 'gold',
  },
  {
    id: 'kape',
    store: 'Suki Cafe',
    title: 'Kape Club',
    description: 'Bawat kape, isang stamp. Kolektahin ang walo!',
    filled: 7,
    goal: 8,
    reward: 'Free 12oz latte',
    accent: 'terra',
  },
  {
    id: 'brew',
    store: 'Suki Cafe',
    title: 'Morning Brew',
    description: 'Start strong. Complete six visits this week.',
    filled: 2,
    goal: 6,
    reward: 'Free upgrade',
    accent: 'forest',
  },
]

export const activity: RewardActivity[] = [
  {
    id: 'act-5',
    type: 'stamp',
    customerId: customer.id,
    campaignId: 'kape',
    campaignName: 'Kape Club',
    stamps: 2,
    amount: 185,
    receipt: {
      items: [
        { name: 'Iced latte', qty: 1 },
        { name: 'Ensaymada', qty: 1 },
      ],
    },
    at: '2026-06-08T01:45:00.000Z',
  },
  {
    id: 'act-4',
    type: 'stamp',
    customerId: customer.id,
    campaignId: 'pastry',
    campaignName: 'Pastry Lover',
    stamps: 1,
    amount: 120,
    receipt: {
      items: [{ name: 'Butter croissant', qty: 1 }],
    },
    at: '2026-06-07T03:12:00.000Z',
  },
  {
    id: 'act-1',
    type: 'redeem',
    customerId: customer.id,
    campaignId: 'kape',
    campaignName: 'Kape Club',
    reward: 'Free vanilla cold brew',
    receipt: {
      items: [{ name: 'Vanilla cold brew', qty: 1 }],
    },
    at: '2026-06-06T08:30:00.000Z',
  },
  {
    id: 'act-2',
    type: 'redeem',
    customerId: customer.id,
    campaignId: 'pastry',
    campaignName: 'Pastry Lover',
    reward: 'Free butter croissant',
    at: '2026-05-29T10:15:00.000Z',
  },
  {
    id: 'act-3',
    type: 'join',
    customerId: customer.id,
    at: '2026-05-25T02:00:00.000Z',
  },
]

export const receipts: ReceiptData[] = [
  {
    id: 'act-5',
    type: 'stamp',
    store: {
      name: store.name,
      address: '123 Mabini St, San Juan City',
      phone: '+63 917 123 4567',
    },
    ref: 'SP-0608-1042',
    date: '2026-06-08T01:45:00.000Z',
    customerName: customer.name,
    cashier: 'Mika',
    items: [
      { name: 'Iced latte', qty: 1, unitPrice: 135, earnsStamp: true },
      { name: 'Ensaymada', qty: 1, unitPrice: 50 },
    ],
    subtotal: 185,
    discount: 0,
    total: 185,
    method: 'GCash',
    stamps: 2,
    campaignName: 'Kape Club',
  },
  {
    id: 'act-4',
    type: 'stamp',
    store: {
      name: store.name,
      address: '123 Mabini St, San Juan City',
      phone: '+63 917 123 4567',
    },
    ref: 'SP-0607-0918',
    date: '2026-06-07T03:12:00.000Z',
    customerName: customer.name,
    cashier: 'Nico',
    items: [{ name: 'Butter croissant', qty: 1, unitPrice: 120, earnsStamp: true }],
    subtotal: 120,
    discount: 0,
    total: 120,
    method: 'Cash',
    stamps: 1,
    campaignName: 'Pastry Lover',
  },
  {
    id: 'act-1',
    type: 'redeem',
    store: {
      name: store.name,
      address: '123 Mabini St, San Juan City',
      phone: '+63 917 123 4567',
    },
    ref: 'SP-0606-0771',
    date: '2026-06-06T08:30:00.000Z',
    customerName: customer.name,
    cashier: 'Mika',
    items: [{ name: 'Vanilla cold brew', qty: 1, unitPrice: 155 }],
    subtotal: 155,
    discount: 155,
    total: 0,
    method: 'Reward',
    reward: 'Free vanilla cold brew',
    campaignName: 'Kape Club',
  },
]
