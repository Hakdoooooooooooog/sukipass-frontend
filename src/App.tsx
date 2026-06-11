import {
  ArrowRight,
  BadgeCheck,
  Gift,
  LockKeyhole,
  QrCode,
  Stamp,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import mascotLanding from './assets/mascot/mascot-landing.png'
import mascotWelcome from './assets/mascot/mascot-welcome.png'
import { BusinessCampaignsPage } from '@/pages/business/BusinessCampaignsPage'
import { BusinessCustomersPage } from '@/pages/business/BusinessCustomersPage'
import { BusinessOwnerDashboardPage } from '@/pages/business/BusinessOwnerDashboardPage'
import { BusinessSettingsPage } from '@/pages/business/BusinessSettingsPage'
import { CampaignPassModal, CampaignPassPage } from '@/pages/customer/CampaignPassPage'
import { CashierAccountPage } from '@/pages/cashier/CashierAccountPage'
import { CashierCampaignsPage } from '@/pages/cashier/CashierCampaignsPage'
import { CashierCustomerDetailPage } from '@/pages/cashier/CashierCustomerDetailPage'
import { CashierCustomerSharePage } from '@/pages/cashier/CashierCustomerSharePage'
import { CashierCustomersPage } from '@/pages/cashier/CashierCustomersPage'
import { CashierHomePage } from '@/pages/cashier/CashierHomePage'
import { CashierNewCustomerPage } from '@/pages/cashier/CashierNewCustomerPage'
import { ActivityPage } from '@/pages/customer/ActivityPage'
import { ClaimCustomerPage } from '@/pages/customer/ClaimCustomerPage'
import { ClaimCustomerSetupPage } from '@/pages/customer/ClaimCustomerSetupPage'
import { ReceiptModal, ReceiptPage } from '@/pages/customer/ReceiptPage'
import { RewardsPage } from '@/pages/customer/RewardsPage'
import type { ModalLocationState } from '@/pages/customer/types'
import { WalletPage } from '@/pages/customer/WalletPage'
import './App.css'

type LoginValues = {
  username: string
  pin: string
}

function Home() {
  return (
    <main className="landing-shell">
      <header className="site-navbar" aria-label="Main navigation">
        <Link className="brand-logo" to="/" aria-label="SukiPass home">
          <span>Suki</span>Pass
        </Link>
        <Button asChild variant="ghost" className="login-button">
          <Link to="/login">Login</Link>
        </Button>
      </header>

      <section className="hero-section poster-scene" aria-labelledby="hero-title">
        <h1 className="poster-type" id="hero-title">
          <span className="poster-desktop-word">SUKI</span>
          <span className="poster-desktop-word">PASS</span>
          <span className="poster-mobile-word">SukiPass</span>
        </h1>

        <div className="hero-copy poster-copy">
          <div className="hero-actions" aria-label="Primary actions">
            <Link className="primary-action" to="/login">
              Start free
              <ArrowRight size={18} strokeWidth={2.4} />
            </Link>
            <Link className="ghost-action" to="/customer">
              View wallet
            </Link>
          </div>
        </div>

        <div className="hero-visual poster-stack" id="card" aria-label="SukiPass app preview">
          <article className="receipt-slab receipt-back" aria-hidden="true">
            <span>MT-014</span>
            <strong>suki paid</strong>
          </article>

          <article className="receipt-slab receipt-main">
            <div className="receipt-topline">
              <span>Milk Tea Social</span>
              <QrCode size={34} strokeWidth={1.8} />
            </div>
            <div className="receipt-total">
              <span>Current card</span>
              <strong>07/10</strong>
            </div>
            <div className="stamp-grid" aria-hidden="true">
              {Array.from({ length: 10 }).map((_, index) => (
                <span key={index} className={index < 7 ? 'is-filled' : ''}>
                  <Stamp size={16} strokeWidth={2.3} />
                </span>
              ))}
            </div>
            <div className="reward-ticket">
              <Gift size={20} />
              <div>
                <span>Next reward</span>
                <strong>3 stamps left</strong>
              </div>
            </div>
          </article>

          <div className="mascot-cutout">
            <img
              className="mascot-hero"
              src={mascotLanding}
              alt="SukiPass mascot"
            />
          </div>

          <div className="social-proof poster-proof" id="proof" aria-label="Social proof">
            <div>
              <strong>8.4k</strong>
              <span>stamps</span>
            </div>
            <div>
              <strong>37%</strong>
              <span>return lift</span>
            </div>
            <div>
              <strong>4.8</strong>
              <span>rating</span>
            </div>
          </div>
        </div>
      </section>

      <section className="made-for-strip" id="shops" aria-label="Made for businesses">
        <span>Made for</span>
        <p>milk tea shops</p>
        <p>cafes</p>
        <p>bakeries</p>
        <p>stalls</p>
        <p>sari-sari</p>
      </section>
    </main>
  )
}

function Login() {
  const form = useForm<LoginValues>({
    defaultValues: {
      username: '',
      pin: '',
    },
  })

  function onSubmit(values: LoginValues) {
    if (values.username.trim().length < 2) {
      form.setError('username', {
        type: 'server',
        message: 'Username was not found.',
      })
      return
    }

    if (values.pin.trim().length < 4) {
      form.setError('pin', {
        type: 'server',
        message: 'PIN must be at least 4 digits.',
      })
      return
    }
  }

  return (
    <div className="login-modal-route">
      <div className="login-modal-background" aria-hidden="true">
        <Home />
      </div>

      <div className="login-modal-overlay">
        <Link className="login-modal-close" to="/" aria-label="Close login">
          <X size={18} />
        </Link>

        <section className="login-modal-stage" aria-labelledby="login-title">
          <div className="login-modal-card" role="dialog" aria-modal="true">
            <div className="login-modal-art" aria-hidden="true">
              <div className="login-modal-mascot">
                <img src={mascotWelcome} alt="" />
              </div>
            </div>

            <div className="login-modal-content">
              <div className="login-card-heading">
                <BadgeCheck size={22} strokeWidth={2.2} />
                <div>
                  <span className="receipt-kicker">Customer access</span>
                  <h2 id="login-title">Enter your card</h2>
                </div>
              </div>

              <Form {...form}>
                <form className="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <div className="input-shell">
                          <UserRound size={18} aria-hidden="true" />
                          <FormControl>
                            <Input
                              autoComplete="username"
                              placeholder="juan.delacruz"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIN</FormLabel>
                        <div className="input-shell">
                          <LockKeyhole size={18} aria-hidden="true" />
                          <FormControl>
                            <Input
                              type="password"
                              inputMode="numeric"
                              autoComplete="current-password"
                              placeholder="0000"
                              {...field}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="login-submit">
                    Enter
                    <ArrowRight size={18} strokeWidth={2.4} />
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function App() {
  const location = useLocation()
  const state = location.state as ModalLocationState | null
  const backgroundLocation = state?.backgroundLocation

  useEffect(() => {
    if (!backgroundLocation) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [backgroundLocation, location.pathname])

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customer" element={<WalletPage />} />
        <Route path="/customer/:campaignId" element={<CampaignPassPage />} />
        <Route path="/customer/rewards" element={<RewardsPage />} />
        <Route path="/customer/activity" element={<ActivityPage />} />
        <Route path="/customer/activity/:activityId" element={<ReceiptPage />} />
        <Route path="/claim/:token" element={<ClaimCustomerPage />} />
        <Route path="/claim/:token/setup" element={<ClaimCustomerSetupPage />} />
        <Route path="/cashier" element={<CashierHomePage />} />
        <Route path="/cashier/customers" element={<CashierCustomersPage />} />
        <Route path="/cashier/customers/new" element={<CashierNewCustomerPage />} />
        <Route path="/cashier/customers/:customerId/share" element={<CashierCustomerSharePage />} />
        <Route path="/cashier/customers/:customerId" element={<CashierCustomerDetailPage />} />
        <Route path="/cashier/campaigns" element={<CashierCampaignsPage />} />
        <Route path="/cashier/account" element={<CashierAccountPage />} />
        <Route path="/business/:businessName" element={<BusinessOwnerDashboardPage />} />
        <Route path="/business/:businessName/campaigns" element={<BusinessCampaignsPage />} />
        <Route path="/business/:businessName/customers" element={<BusinessCustomersPage />} />
        <Route path="/business/:businessName/settings" element={<BusinessSettingsPage />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route path="/customer/:campaignId" element={<CampaignPassModal />} />
          <Route path="/customer/activity/:activityId" element={<ReceiptModal />} />
        </Routes>
      )}
    </>
  )
}

export default App
