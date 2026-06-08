import { ChevronLeft, Coffee, Gift, ReceiptText, X } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CustomerNav } from '@/components/customer/nav/CustomerNav'
import { receipts, type ReceiptData } from '@/customerData'
import '@/Customer.css'

function peso(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value)
}

function shortDateTime(iso: string) {
  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(iso))
}

function ReceiptEmpty() {
  return (
    <div className="receipt-empty">
      <span>
        <ReceiptText size={26} />
      </span>
      <h2>Walang resibo</h2>
      <p>Hindi mahanap ang transaksyon na ito.</p>
    </div>
  )
}

function Perforation() {
  return (
    <div className="receipt-perforation">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <div />
    </div>
  )
}

function ReceiptSlip({ data }: { data: ReceiptData }) {
  const earned = data.type === 'redeem' ? null : data.stamps ?? 0

  return (
    <article className="receipt-slip">
      <div className="receipt-inner">
        <div className="receipt-store">
          <p>{data.store.name}</p>
          <span>{data.store.address}</span>
          <span>{data.store.phone}</span>
        </div>

        <Perforation />

        <dl className="receipt-meta">
          <dt>Resibo</dt>
          <dd>{data.ref}</dd>
          <dt>Petsa</dt>
          <dd>{shortDateTime(data.date)}</dd>
          <dt>Suki</dt>
          <dd>{data.customerName}</dd>
          <dt>Cashier</dt>
          <dd>{data.cashier}</dd>
        </dl>

        <Perforation />

        <ul className="receipt-items">
          {data.items.map((item, index) => (
            <li key={index}>
              <span>
                <span>
                  <strong>{item.qty}x</strong>
                  {item.name}
                  {item.earnsStamp && <Coffee size={14} aria-label="earned a stamp" />}
                </span>
                {item.qty > 1 && <small>@ {peso(item.unitPrice)}</small>}
              </span>
              <em>{peso(item.qty * item.unitPrice)}</em>
            </li>
          ))}
        </ul>

        <Perforation />

        <div className="receipt-totals">
          <p>
            <span>Subtotal</span>
            <span>{peso(data.subtotal)}</span>
          </p>
          {data.discount > 0 && (
            <p className="receipt-discount">
              <span>Reward discount</span>
              <span>-{peso(data.discount)}</span>
            </p>
          )}
          <p className="receipt-total">
            <span>Total</span>
            <span>{peso(data.total)}</span>
          </p>
          <p>
            <span>Bayad</span>
            <span>{data.method}</span>
          </p>
        </div>

        <div className={`receipt-outcome receipt-outcome-${data.type}`}>
          <span>{data.type === 'redeem' ? <Gift size={20} /> : <Coffee size={20} />}</span>
          <div>
            {data.type === 'redeem' ? (
              <>
                <p>Reward claimed</p>
                <small>{data.reward ?? 'Reward'}</small>
              </>
            ) : (
              <>
                <p>
                  +{earned} stamp{earned === 1 ? '' : 's'} earned
                </p>
                <small>{data.campaignName ?? 'Loyalty card'}</small>
              </>
            )}
          </div>
        </div>

        <p className="receipt-footer">Salamat sa pagiging suki!</p>
        <p className="receipt-powered">Powered by SukiPass</p>
      </div>
    </article>
  )
}

function ReceiptContent() {
  const { activityId } = useParams()
  const receipt = receipts.find((item) => item.id === activityId)
  return receipt ? <ReceiptSlip data={receipt} /> : <ReceiptEmpty />
}

export function ReceiptPage() {
  return (
    <main className="customer-page">
      <section className="receipt-page">
        <Link to="/customer/activity" className="receipt-back">
          <ChevronLeft size={20} />
          Activity
        </Link>
        <div>
          <ReceiptContent />
        </div>
      </section>
      <CustomerNav />
    </main>
  )
}

export function ReceiptModal() {
  const navigate = useNavigate()
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    document.body.classList.add('customer-modal-open')
    return () => {
      document.body.classList.remove('customer-modal-open')
    }
  }, [])

  function close() {
    if (closing) return
    setClosing(true)
    window.setTimeout(() => navigate(-1), 260)
  }

  return (
    <div className={`receipt-modal ${closing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-label="Receipt">
      <button className="receipt-modal-backdrop" aria-label="Close receipt" onClick={close} />
      <div className="receipt-modal-panel">
        <button className="receipt-modal-close" aria-label="Close receipt" onClick={close}>
          <X size={18} />
        </button>
        <ReceiptContent />
      </div>
    </div>
  )
}
