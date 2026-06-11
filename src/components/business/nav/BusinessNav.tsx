import { BarChart3, LogOut, Megaphone, Settings, UsersRound } from 'lucide-react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'

const tabs = [
  { label: 'Dashboard', segment: '', Icon: BarChart3 },
  { label: 'Campaigns', segment: 'campaigns', Icon: Megaphone },
  { label: 'Customers', segment: 'customers', Icon: UsersRound },
  { label: 'Settings', segment: 'settings', Icon: Settings },
]

export function BusinessNav() {
  const { pathname } = useLocation()
  const { businessName = 'suki-cafe' } = useParams()
  const basePath = `/business/${businessName}`

  return (
    <>
      <aside className="hidden lg:fixed lg:bottom-8 lg:left-8 lg:top-8 lg:z-30 lg:block lg:w-[248px]">
        <nav className="flex h-full flex-col rounded-[22px] border border-white/70 bg-card/55 p-4 shadow-[0_28px_70px_rgba(120,72,44,0.14)] backdrop-blur-xl" aria-label="Business owner navigation">
          <Link to={basePath} className="mb-7 flex items-center gap-3 rounded-[16px] px-2 py-2 text-foreground no-underline">
            <span className="grid h-11 w-11 place-items-center rounded-[13px] bg-[#2f4f3e] font-[var(--heading)] text-[#eaf3ec]">SP</span>
            <span>
              <strong className="block font-[var(--heading)] text-lg leading-none">SukiPass</strong>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Owner</span>
            </span>
          </Link>

          <ul className="m-0 grid list-none gap-1 p-0">
            {tabs.map(({ label, segment, Icon }) => {
              const href = segment ? `${basePath}/${segment}` : basePath
              const active = pathname === href || (segment !== '' && pathname.startsWith(`${href}/`))
              return (
                <li key={label}>
                  <Link
                    to={href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-12 items-center gap-3 rounded-[14px] px-4 text-sm font-bold text-muted-foreground no-underline transition-colors duration-200 hover:bg-[#f5efe6] hover:text-[#c8543a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      active && 'bg-[#c8543a] text-card shadow-[0_14px_30px_rgba(200,84,58,0.2)] hover:bg-[#c8543a] hover:text-card',
                    )}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <footer className="mt-auto grid gap-3 border-t border-border/70 pt-4">
            <div className="rounded-[14px] bg-background/60 p-3">
              <p className="m-0 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Signed in</p>
              <strong className="mt-1 block truncate text-sm leading-tight text-foreground">Tala Reyes</strong>
              <span className="mt-1 block truncate text-xs text-muted-foreground">Suki Cafe · San Juan</span>
            </div>
            <Link
              to="/login"
              className="flex min-h-11 items-center justify-center gap-2 rounded-[14px] border border-border bg-card/70 px-4 text-sm font-bold text-foreground no-underline transition-colors duration-200 hover:border-[#c8543a]/40 hover:text-[#c8543a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <LogOut size={17} />
              Logout
            </Link>
          </footer>
        </nav>
      </aside>

      <nav aria-label="Business owner navigation" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 overflow-hidden lg:hidden">
        <div className="mx-auto w-full max-w-[430px] px-3 pb-[calc(8px+env(safe-area-inset-bottom))] pt-3">
          <ul className="pointer-events-auto flex min-h-[64px] w-full items-stretch justify-around gap-1 rounded-[22px] border border-white/70 bg-white/45 p-1.5 shadow-[0_20px_50px_rgba(47,74,60,0.2)] backdrop-blur-2xl">
            {tabs.map(({ label, segment, Icon }) => {
              const href = segment ? `${basePath}/${segment}` : basePath
              const active = pathname === href || (segment !== '' && pathname.startsWith(`${href}/`))
              return (
                <li key={label} className="flex-1">
                  <Link
                    to={href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-[52px] flex-col items-center justify-center gap-1 rounded-[16px] text-muted-foreground no-underline transition-colors duration-200 hover:text-[#c8543a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      active && 'bg-card/80 text-[#c8543a]',
                    )}
                  >
                    <Icon size={20} strokeWidth={active ? 2.35 : 1.8} />
                    <span className="max-w-full truncate font-mono text-[9px] leading-none tracking-normal">{label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}
