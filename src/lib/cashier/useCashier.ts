import { useContext } from 'react'
import { CashierContext } from './context'

export function useCashier() {
  const context = useContext(CashierContext)
  if (!context) {
    throw new Error('useCashier must be used within CashierProvider')
  }
  return context
}
