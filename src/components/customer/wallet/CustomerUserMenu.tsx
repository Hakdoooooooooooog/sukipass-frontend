import { LogOut, UserRound } from 'lucide-react'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { customer } from '@/customerData'

export function CustomerUserMenu() {
  const [signOutOpen, setSignOutOpen] = useState(false)

  return (
    <div className="absolute right-0 top-[-12px] z-10 lg:right-6 lg:top-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="grid h-[42px] w-[42px] cursor-pointer place-items-center rounded-full border border-border/90 bg-card/90 text-muted-foreground shadow-[0_18px_36px_rgba(120,72,44,0.11)] transition-colors hover:bg-card hover:text-[#c8543a] data-[state=open]:bg-card data-[state=open]:text-[#c8543a]"
            type="button"
            aria-label="Customer menu"
          >
            <UserRound size={18} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="min-w-[190px] rounded-2xl border-border/90 bg-card/95 p-1 shadow-[0_20px_48px_rgba(120,72,44,0.16)] backdrop-blur-md"
        >
          <DropdownMenuLabel className="grid px-[11px] pb-[9px] pt-[11px]">
            <span className="font-[var(--heading)] text-base leading-none text-foreground">Hi, {customer.name}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="mx-1 mb-1 mt-0.5 bg-border" />
          <DropdownMenuItem
            className="min-h-10 cursor-pointer gap-[9px] rounded-xl font-extrabold text-foreground focus:bg-secondary/70 focus:text-[#c8543a]"
            onSelect={(event) => {
              event.preventDefault()
              setSignOutOpen(true)
            }}
          >
            <LogOut size={16} />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
        <AlertDialogContent className="rounded-[22px] border-border/90 bg-card text-foreground shadow-[0_30px_80px_rgba(36,29,24,0.24)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-[var(--heading)] text-2xl tracking-normal">Sign out?</AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This action is not connected yet, but this is where sign out confirmation will happen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Sign out</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
