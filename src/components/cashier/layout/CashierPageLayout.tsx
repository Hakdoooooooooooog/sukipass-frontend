import type { ReactNode } from 'react'
import { CashierNav } from '@/components/cashier/nav/CashierNav'
import { CashierScannerGate } from '@/components/cashier/scanner/CashierScannerGate'

export function CashierPageLayout({ children, label }: { children: ReactNode; label: string }) {
  return (
    <main className="min-h-svh bg-background bg-[radial-gradient(circle_at_8%_0%,rgba(216,162,74,0.18),transparent_32%),radial-gradient(circle_at_96%_8%,rgba(200,84,58,0.12),transparent_28%)] text-foreground lg:bg-[radial-gradient(circle_at_12%_8%,rgba(216,162,74,0.2),transparent_28%),radial-gradient(circle_at_84%_12%,rgba(200,84,58,0.14),transparent_30%),linear-gradient(90deg,rgba(36,29,24,0.035)_0_1px,transparent_1px)] lg:bg-[length:auto,auto,96px_100%]">
      <section
        className="mx-auto min-h-svh w-full max-w-[430px] px-5 pb-[128px] pt-[30px] max-[380px]:px-3.5 md:max-w-[720px] md:px-0 md:pt-[42px] lg:w-[calc(100%-64px)] lg:max-w-[1120px] lg:px-0 lg:pb-32 lg:pt-14 xl:w-[calc(100%-96px)] xl:max-w-[1220px]"
        aria-label={label}
      >
        {children}
      </section>
      <CashierNav />
      <CashierScannerGate />
    </main>
  )
}
