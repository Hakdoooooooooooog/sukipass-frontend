import { createContext } from 'react'
import type { CashierCampaign, CashierCustomer, ClaimCustomerProfileInput, NewCashierCustomer } from './types'

export type CashierContextValue = {
  campaigns: CashierCampaign[]
  customers: CashierCustomer[]
  addCustomer: (input: NewCashierCustomer) => CashierCustomer
  addProgress: (customerId: string, campaignId: string, stamps: number) => void
  completeCustomerProfile: (claimToken: string, input: ClaimCustomerProfileInput) => CashierCustomer | undefined
  findCustomerByClaimToken: (claimToken: string) => CashierCustomer | undefined
  findCustomerByCode: (code: string) => CashierCustomer | undefined
  getCustomer: (customerId: string) => CashierCustomer | undefined
  searchCustomers: (query: string) => CashierCustomer[]
}

export const CashierContext = createContext<CashierContextValue | null>(null)
