import { ArrowLeft, CheckCircle2, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cashierStore } from '@/lib/cashier/data'
import { useCashier } from '@/lib/cashier/useCashier'

export function ClaimCustomerSetupPage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { completeCustomerProfile, findCustomerByClaimToken } = useCashier()
  const customer = token ? findCustomerByClaimToken(token) : undefined
  const [fullName, setFullName] = useState(customer?.fullName || '')
  const [email, setEmail] = useState(customer?.email || '')
  const [phone, setPhone] = useState(customer?.phone || '')
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [dirty, setDirty] = useState(false)
  const [showExitWarning, setShowExitWarning] = useState(false)

  useEffect(() => {
    if (!dirty) return

    function warnBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', warnBeforeUnload)
    return () => window.removeEventListener('beforeunload', warnBeforeUnload)
  }, [dirty])

  function markDirty(setter: (value: string) => void, value: string) {
    setter(value)
    setDirty(true)
  }

  function continueLater() {
    if (dirty) {
      setShowExitWarning(true)
      return
    }
    navigate(token ? `/claim/${token}` : '/')
  }

  if (!customer || !token) {
    return (
      <main className="grid min-h-svh place-items-center bg-background px-5 py-10 text-foreground">
        <section className="grid max-w-[460px] gap-4 rounded-[28px] border border-border bg-card/70 p-6 text-center shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <h1 className="m-0 font-[var(--heading)] text-4xl leading-none tracking-normal">Claim link not found</h1>
          <p className="m-0 text-sm text-muted-foreground">Ask the cashier to open your customer profile or create a new claim QR.</p>
          <Button asChild className="h-12 rounded-[16px] bg-[#c8543a] text-card hover:bg-[#b94831]">
            <Link to="/">Go home</Link>
          </Button>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-svh bg-background bg-[radial-gradient(circle_at_8%_0%,rgba(216,162,74,0.18),transparent_32%),radial-gradient(circle_at_96%_8%,rgba(200,84,58,0.12),transparent_28%)] px-5 py-8 text-foreground">
      <section className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-[620px] content-center">
        <div className="rounded-[30px] border border-border/80 bg-card/70 p-6 shadow-[0_24px_70px_rgba(120,72,44,0.1)]">
          <button type="button" onClick={continueLater} className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-background px-3 py-2 text-sm font-bold text-foreground">
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="mb-6 flex items-start gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[20px] bg-[#2f4f3e] text-[#eaf3ec]">
              <CheckCircle2 size={26} />
            </span>
            <div>
              <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c8543a]">{cashierStore.name}</p>
              <h1 className="mb-2 mt-1 font-[var(--heading)] text-4xl leading-none tracking-normal">Finish account setup</h1>
              <p className="m-0 text-sm text-muted-foreground">This saves {customer.nickname}'s progress under your real details.</p>
            </div>
          </div>

          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault()
              if (fullName.trim().length < 2) {
                setError('Full name must be at least 2 characters.')
                return
              }
              if (pin.trim().length < 4) {
                setError('PIN must be at least 4 digits.')
                return
              }

              completeCustomerProfile(token, { fullName, email, phone, pin })
              setDirty(false)
              navigate('/customer')
            }}
          >
            <div className="grid gap-2">
              <label htmlFor="fullName" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Full name</label>
              <div className="flex h-12 items-center gap-2 rounded-[14px] border border-input bg-background px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
                <UserRound size={18} className="text-muted-foreground" />
                <Input id="fullName" value={fullName} onChange={(event) => markDirty(setFullName, event.target.value)} className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" autoComplete="name" />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="claimEmail" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Email optional</label>
              <div className="flex h-12 items-center gap-2 rounded-[14px] border border-input bg-background px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
                <Mail size={18} className="text-muted-foreground" />
                <Input id="claimEmail" type="email" value={email} onChange={(event) => markDirty(setEmail, event.target.value)} className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" autoComplete="email" />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="claimPhone" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">Phone optional</label>
              <div className="flex h-12 items-center gap-2 rounded-[14px] border border-input bg-background px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
                <Phone size={18} className="text-muted-foreground" />
                <Input id="claimPhone" value={phone} onChange={(event) => markDirty(setPhone, event.target.value)} className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" autoComplete="tel" inputMode="tel" />
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="pin" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">PIN</label>
              <div className="flex h-12 items-center gap-2 rounded-[14px] border border-input bg-background px-3 shadow-sm focus-within:ring-1 focus-within:ring-ring">
                <LockKeyhole size={18} className="text-muted-foreground" />
                <Input id="pin" type="password" value={pin} onChange={(event) => markDirty(setPin, event.target.value)} className="h-10 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" autoComplete="new-password" inputMode="numeric" />
              </div>
            </div>
            {error && <p className="m-0 text-sm font-bold text-destructive">{error}</p>}
            <Button type="submit" className="mt-2 h-12 rounded-[16px] bg-[#c8543a] text-card hover:bg-[#b94831]">
              Save account
            </Button>
          </form>
        </div>
      </section>

      <AlertDialog open={showExitWarning} onOpenChange={setShowExitWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave setup?</AlertDialogTitle>
            <AlertDialogDescription>
              Your stamp is saved, but finishing setup helps the store find your account next time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep editing</AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate(`/claim/${token}`)}>Leave setup</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}
