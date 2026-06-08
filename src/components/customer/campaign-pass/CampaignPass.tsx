import { QRCodeSVG } from 'qrcode.react'
import mascotQr from '@/assets/mascot/mascot-qr.png'
import { customer, store, type StampCard } from '@/customerData'
import { cn } from '@/lib/utils'

const bandByAccent = {
  gold: 'bg-[#dda947] text-foreground',
  terra: 'bg-[#cf553d] text-card',
  forest: 'bg-[#2f4f3e] text-card',
}

export function CampaignPass({ card }: { card: StampCard }) {
  return (
    <div className="relative w-full max-w-80 rounded-3xl bg-card shadow-[0_28px_60px_rgba(120,72,44,0.22)] animate-in fade-in slide-in-from-bottom-6 zoom-in-95 duration-500">
      <div className={cn('relative min-h-32 overflow-hidden rounded-t-3xl px-5 pb-6 pt-[22px]', bandByAccent[card.accent])}>
        <span className="absolute right-[-44px] top-[-48px] h-40 w-40 rounded-full bg-foreground/10" aria-hidden="true" />
        <span className="absolute right-[-8px] top-[-16px] h-24 w-24 rounded-full bg-foreground/10" aria-hidden="true" />
        <div className="relative z-[1] pr-28">
          <p className="m-0 font-mono text-[10px] uppercase tracking-[0.18em] opacity-70">{store.name}</p>
          <strong className="mt-2 block font-[var(--heading)] text-[22px] leading-[1.05]">{customer.name}</strong>
          <span className="mt-1 block font-mono text-sm opacity-70">Suki member</span>
        </div>
      </div>

      <img
        className="pointer-events-none absolute right-1 top-2 z-[2] w-32 drop-shadow-[0_8px_11px_rgba(36,29,24,0.22)]"
        src={mascotQr}
        alt=""
        aria-hidden="true"
      />

      <div className="relative">
        <span className="absolute left-[-14px] top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-background" aria-hidden="true" />
        <span className="absolute right-[-14px] top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-background" aria-hidden="true" />
        <div className="border-t-2 border-dashed border-border" />
      </div>

      <div className="grid justify-items-center px-5 pb-[22px] pt-6">
        <div className="grid h-56 w-56 place-items-center rounded-3xl bg-card p-2 text-foreground shadow-[inset_0_0_0_1px_hsl(var(--border))]" aria-label={`SukiPass code ${customer.code}`}>
          <QRCodeSVG
            value={`${customer.code}:${card.id}`}
            size={208}
            fgColor="#241d18"
            bgColor="transparent"
            level="M"
            marginSize={2}
            title={`SukiPass code ${customer.code}`}
          />
        </div>
        <p className="mb-0 mt-3 font-mono text-sm tracking-[0.18em] text-muted-foreground">{customer.code}</p>
      </div>
    </div>
  )
}
