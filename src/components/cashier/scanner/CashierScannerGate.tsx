import { lazy, Suspense } from 'react'
import { useSearchParams } from 'react-router-dom'

const CashierScanner = lazy(() => import('./CashierScanner'))

export function CashierScannerGate() {
  const [searchParams] = useSearchParams()

  if (searchParams.get('scan') !== '1') return null

  return (
    <Suspense fallback={null}>
      <CashierScanner />
    </Suspense>
  )
}
