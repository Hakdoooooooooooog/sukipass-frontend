import type { ReactNode } from 'react'
import { BusinessNav } from '@/components/business/nav/BusinessNav'

export function BusinessPageLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-svh max-w-full overflow-x-hidden bg-background bg-[radial-gradient(circle_at_10%_0%,rgba(216,162,74,0.18),transparent_32%),radial-gradient(circle_at_92%_10%,rgba(200,84,58,0.12),transparent_30%)] text-foreground lg:bg-[radial-gradient(circle_at_12%_8%,rgba(216,162,74,0.18),transparent_28%),radial-gradient(circle_at_86%_12%,rgba(47,79,62,0.12),transparent_30%),linear-gradient(90deg,rgba(36,29,24,0.035)_0_1px,transparent_1px)] lg:bg-[length:auto,auto,96px_100%]">
      <BusinessNav />
      <section className="mx-auto min-h-svh w-full max-w-[430px] overflow-x-hidden px-4 pb-[112px] pt-6 max-[380px]:px-3 md:max-w-[760px] md:px-6 lg:ml-[296px] lg:mr-8 lg:w-auto lg:max-w-none lg:px-0 lg:pb-12 lg:pt-8 xl:ml-[328px] xl:mr-12" aria-label="Business owner dashboard">
        {children}
      </section>
    </main>
  )
}
