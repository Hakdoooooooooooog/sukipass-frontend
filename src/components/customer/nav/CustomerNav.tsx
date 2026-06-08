import { Activity, Gift, QrCode, WalletCards } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Wallet', href: '/customer', Icon: WalletCards },
  { label: 'Code', href: '/customer/pastry', Icon: QrCode },
  { label: 'Rewards', href: '/customer/rewards', Icon: Gift },
  { label: 'Activity', href: '/customer/activity', Icon: Activity },
]

function isActive(pathname: string, href: string) {
  if (href === '/customer') return pathname === '/customer'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function CustomerNav() {
  const { pathname } = useLocation()

  return (
    <nav aria-label="Customer navigation" className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto w-full max-w-[430px] px-[17px] pb-[calc(10px+env(safe-area-inset-bottom))] pt-3 md:max-w-[520px] lg:max-w-[760px] lg:px-0 lg:pb-8 xl:max-w-[860px]">
        <ul className="pointer-events-auto relative flex min-h-[66px] items-stretch justify-around gap-1 rounded-[28px] border border-white/70 bg-white/40 p-1.5 shadow-[0_20px_50px_rgba(47,74,60,0.24),inset_0_1px_0_rgba(255,255,255,0.82),inset_0_-16px_30px_rgba(47,74,60,0.12)] backdrop-blur-2xl before:pointer-events-none before:absolute before:inset-0 before:rounded-[28px] before:bg-gradient-to-b before:from-white/55 before:via-white/10 before:to-transparent after:pointer-events-none after:absolute after:left-7 after:right-7 after:top-0 after:h-px after:rounded-full after:bg-gradient-to-r after:from-transparent after:via-white/90 after:to-transparent md:min-h-[70px] lg:min-h-[66px]">
          {tabs.map(({ label, href, Icon }) => {
            const active = isActive(pathname, href)
            return (
              <li key={href} className="relative z-[1] flex-1">
                <Link
                  to={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex min-h-[54px] flex-col items-center justify-center gap-1 rounded-[20px] text-muted-foreground no-underline transition-[color,transform] duration-200 active:scale-95',
                    'hover:text-[#c8543a]',
                    active && 'text-[#c8543a]',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-1 h-9 w-9 rounded-full bg-[#c8543a]/30 opacity-0 blur-[10px] transition-opacity duration-300',
                      active && 'opacity-100',
                    )}
                  />
                  <Icon size={22} strokeWidth={active ? 2.3 : 1.8} />
                  <span className="font-mono text-[10px] leading-none tracking-normal">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
