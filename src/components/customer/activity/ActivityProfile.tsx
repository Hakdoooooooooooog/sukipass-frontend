import mascotHistory from '@/assets/mascot/mascot-history.png'

export function ActivityProfile() {
  return (
    <header className="relative min-h-44 lg:sticky lg:top-12 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:flex lg:min-h-[560px] lg:items-start lg:rounded-[28px] lg:border lg:border-border/80 lg:bg-card/50 lg:p-[30px] lg:shadow-[0_24px_70px_rgba(120,72,44,0.1)] lg:backdrop-blur-md">
      <div>
        <p className="mb-7 mt-0 font-mono text-xs tracking-[0.14em] text-muted-foreground lg:mb-11">ACTIVITY</p>
        <p className="m-0 text-sm text-muted-foreground">Ang iyong mga galaw</p>
        <h1 className="mb-2.5 mt-0.5 font-[var(--heading)] text-[42px] leading-[0.96] tracking-normal text-foreground lg:text-[clamp(48px,5vw,66px)]">
          Activity
        </h1>
        <p className="m-0 max-w-[270px] text-sm text-muted-foreground">Bawat stamp, reward, at resibo - nasa isang lugar.</p>
      </div>
      <img
        className="absolute right-2.5 top-[50px] w-[126px] drop-shadow-[0_10px_12px_rgba(36,29,24,0.2)] max-[380px]:right-0.5 max-[380px]:w-[94px] lg:bottom-9 lg:right-6 lg:top-auto lg:w-[min(46%,172px)]"
        src={mascotHistory}
        alt=""
        aria-hidden="true"
      />
    </header>
  )
}
