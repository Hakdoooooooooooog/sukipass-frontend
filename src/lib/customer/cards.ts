import { customer, store, type StampCard } from '@/customerData'
import { getCustomerStampCards } from './stamp-cards'

const memberCodeCard: StampCard = {
  id: 'member-code',
  store: store.name,
  title: 'SukiPass',
  description: 'Member QR code',
  filled: 0,
  goal: 0,
  reward: 'Collect stamps after purchase',
  accent: customer.accent,
}

export function getCustomerCard(id?: string) {
  return getCustomerStampCards(customer.id).find((card) => card.id === id) ?? memberCodeCard
}
