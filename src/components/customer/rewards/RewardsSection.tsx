import type { ReactNode } from 'react'

export function RewardsSection({ title, meta, children }: { title: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <section className="grid gap-3.5">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="m-0 font-[var(--heading)] text-xl leading-none tracking-normal">{title}</h2>
        {meta && <span className="text-sm text-muted-foreground">{meta}</span>}
      </div>
      {children}
    </section>
  )
}

export function RewardsSectionEmpty({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[22px] border border-dashed border-[#c8543a]/30 bg-card/60 p-[22px] text-center text-muted-foreground">
      {children}
    </div>
  )
}
