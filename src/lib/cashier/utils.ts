import type { CashierCustomer } from './types'

export function normalizeCashierSearch(value: string) {
  return value.trim().toLowerCase()
}

export function parseSukiCode(value: string) {
  const raw = value.trim()
  if (!raw) return ''

  try {
    const url = new URL(raw)
    return (url.searchParams.get('code') || url.pathname.split('/').pop() || '').trim().toUpperCase()
  } catch {
    return raw.trim().toUpperCase()
  }
}

export function generateCustomerCode(customers: CashierCustomer[]) {
  const fragment = Math.random().toString(36).slice(2, 8).toUpperCase()
  const code = `SUKI-${fragment}`
  if (customers.some((customer) => customer.code === code)) {
    return generateCustomerCode(customers)
  }
  return code
}
