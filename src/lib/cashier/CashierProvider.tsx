import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { CashierContext, type CashierContextValue } from './context'
import { cashierCampaigns, cashierCustomers } from './data'
import type { CashierCustomer, ClaimCustomerProfileInput, NewCashierCustomer } from './types'
import { generateCustomerCode, normalizeCashierSearch, parseSukiCode } from './utils'

export function CashierProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState<CashierCustomer[]>(cashierCustomers)

  const addCustomer = useCallback((input: NewCashierCustomer) => {
    const now = new Date().toISOString()
    const id = `cashier-${crypto.randomUUID()}`
    const customer: CashierCustomer = {
      id,
      status: 'temporary',
      nickname: input.nickname.trim(),
      email: input.email?.trim() || undefined,
      phone: input.phone?.trim() || undefined,
      code: generateCustomerCode(customers),
      claimToken: `claim-${crypto.randomUUID()}`,
      joinedAt: now,
      totalStamps: 0,
      activeCampaigns: cashierCampaigns.filter((campaign) => campaign.active).map((campaign) => ({ campaignId: campaign.id, stamps: 0 })),
      recentActivity: cashierCampaigns.filter((campaign) => campaign.active).slice(0, 1).map((campaign) => ({
        id: `activity-${crypto.randomUUID()}`,
        customerId: '',
        campaignId: campaign.id,
        type: 'join' as const,
        at: now,
      })),
    }
    customer.recentActivity = customer.recentActivity.map((activity) => ({ ...activity, customerId: customer.id }))
    setCustomers((current) => [customer, ...current])
    return customer
  }, [customers])

  const addProgress = useCallback((customerId: string, campaignId: string, stamps: number) => {
    setCustomers((current) =>
      current.map((customer) => {
        if (customer.id !== customerId) return customer

        const nextProgress = [...customer.activeCampaigns]
        const index = nextProgress.findIndex((progress) => progress.campaignId === campaignId)
        if (index >= 0) {
          nextProgress[index] = {
            ...nextProgress[index],
            stamps: nextProgress[index].stamps + stamps,
          }
        } else {
          nextProgress.push({ campaignId, stamps })
        }

        const activity = {
          id: `activity-${crypto.randomUUID()}`,
          customerId,
          campaignId,
          type: 'stamp' as const,
          stamps,
          at: new Date().toISOString(),
        }

        return {
          ...customer,
          activeCampaigns: nextProgress,
          totalStamps: customer.totalStamps + stamps,
          recentActivity: [activity, ...customer.recentActivity].slice(0, 6),
        }
      }),
    )
  }, [])

  const completeCustomerProfile = useCallback((claimToken: string, input: ClaimCustomerProfileInput) => {
    let updated: CashierCustomer | undefined

    setCustomers((current) =>
      current.map((customer) => {
        if (customer.claimToken !== claimToken) return customer

        updated = {
          ...customer,
          status: 'claimed',
          fullName: input.fullName.trim(),
          email: input.email?.trim() || customer.email,
          phone: input.phone?.trim() || customer.phone,
          claimedAt: new Date().toISOString(),
        }

        return updated
      }),
    )

    return updated
  }, [])

  const value = useMemo<CashierContextValue>(() => {
    function findCustomerByCode(code: string) {
      const parsed = parseSukiCode(code)
      return customers.find((customer) => normalizeCashierSearch(customer.code) === normalizeCashierSearch(parsed))
    }

    function findCustomerByClaimToken(claimToken: string) {
      return customers.find((customer) => customer.claimToken === claimToken)
    }

    function getCustomer(customerId: string) {
      return customers.find((customer) => customer.id === customerId)
    }

    function searchCustomers(query: string) {
      const q = normalizeCashierSearch(query)
      if (!q) return customers
      return customers.filter((customer) =>
        [customer.nickname, customer.code, customer.email || '', customer.phone || ''].some((value) => normalizeCashierSearch(value).includes(q)),
      )
    }

    return {
      campaigns: cashierCampaigns,
      customers,
      addCustomer,
      addProgress,
      completeCustomerProfile,
      findCustomerByClaimToken,
      findCustomerByCode,
      getCustomer,
      searchCustomers,
    }
  }, [addCustomer, addProgress, completeCustomerProfile, customers])

  return <CashierContext.Provider value={value}>{children}</CashierContext.Provider>
}
