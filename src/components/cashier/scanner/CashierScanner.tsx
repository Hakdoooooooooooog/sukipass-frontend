import { BrowserQRCodeReader, type IScannerControls } from '@zxing/browser'
import { Search, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CustomerListCard } from '@/components/cashier/ui/CashierCards'
import { parseSukiCode } from '@/lib/cashier/utils'
import { useCashier } from '@/lib/cashier/useCashier'

function CashierScanner() {
  const [searchParams, setSearchParams] = useSearchParams()
  const open = searchParams.get('scan') === '1'
  const navigate = useNavigate()
  const { findCustomerByCode, searchCustomers } = useCashier()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const controlsRef = useRef<IScannerControls | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const handledRef = useRef(false)
  const [manualCode, setManualCode] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('Point the camera at a SukiPass QR.')
  const [cameraReady, setCameraReady] = useState(false)

  const results = useMemo(() => searchCustomers(query).slice(0, 5), [query, searchCustomers])

  const close = useCallback(() => {
    controlsRef.current?.stop()
    controlsRef.current = null
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    handledRef.current = false
    const next = new URLSearchParams(searchParams)
    next.delete('scan')
    setSearchParams(next, { replace: true })
  }, [searchParams, setSearchParams])

  const goToCode = useCallback((value: string) => {
    const code = parseSukiCode(value)
    if (!code) return
    const customer = findCustomerByCode(code)
    if (!customer) {
      setMessage(`No suki found for ${code}.`)
      return
    }
    close()
    navigate(`/cashier/customers/${customer.id}`)
  }, [close, findCustomerByCode, navigate])

  useEffect(() => {
    if (!open) return undefined
    let cancelled = false
    const reader = new BrowserQRCodeReader()
    const previewVideo = videoRef.current
    handledRef.current = false
    window.setTimeout(() => {
      if (!cancelled) {
        setCameraReady(false)
        setMessage('Starting camera...')
      }
    }, 0)

    async function startScanner() {
      const video = previewVideo
      if (!video) return

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: 'environment' },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        })

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop())
          return
        }

        streamRef.current = stream
        video.srcObject = stream
        video.muted = true
        video.playsInline = true
        await video.play()

        if (!cancelled) {
          setCameraReady(true)
          setMessage('Camera ready. Hold the QR inside the frame.')
        }

        const controls = await reader.decodeFromStream(stream, video, (result, error, controls) => {
          if (cancelled || handledRef.current) return
          controlsRef.current = controls
          if (result) {
            handledRef.current = true
            goToCode(result.getText())
          } else if (error) {
            setMessage('Scanning...')
          }
        })

        if (cancelled) {
          controls.stop()
          return
        }

        controlsRef.current = controls
      } catch {
        if (!cancelled) {
          setCameraReady(false)
          setMessage('Camera unavailable. Enter the code or search below.')
        }
      }
    }

    startScanner()

    return () => {
      cancelled = true
      controlsRef.current?.stop()
      controlsRef.current = null
      streamRef.current?.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      if (previewVideo) {
        previewVideo.srcObject = null
      }
    }
  }, [goToCode, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-foreground/35 px-3 pb-3 pt-8 backdrop-blur-sm sm:place-items-center" role="dialog" aria-modal="true" aria-labelledby="cashier-scanner-title">
      <button className="absolute inset-0 cursor-default" type="button" aria-label="Close scanner" onClick={close} />
      <section className="relative max-h-[calc(100svh-40px)] w-full max-w-[430px] overflow-auto rounded-[30px] border border-white/70 bg-card/95 p-4 text-foreground shadow-[0_30px_90px_rgba(36,29,24,0.28)] backdrop-blur-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="m-0 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c8543a]">Cashier scan</p>
            <h2 id="cashier-scanner-title" className="mb-0 mt-1 font-[var(--heading)] text-3xl leading-none tracking-normal">
              Scan SukiPass
            </h2>
          </div>
          <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-background text-foreground transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" onClick={close} aria-label="Close scanner">
            <X size={18} />
          </button>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-[24px] border-2 border-dashed border-[#c8543a]/55 bg-foreground">
          <video ref={videoRef} className="h-full w-full object-cover" autoPlay muted playsInline />
          <div className="pointer-events-none absolute inset-8 rounded-[18px] border border-card/80 shadow-[0_0_0_999px_rgba(36,29,24,0.26)]" />
          <div className="pointer-events-none absolute inset-x-8 top-1/2 h-0.5 bg-[#dda947] shadow-[0_0_18px_rgba(221,169,71,0.8)]" />
          {!cameraReady && <div className="absolute inset-0 grid place-items-center bg-foreground/70 px-8 text-center text-sm font-bold text-card">{message}</div>}
        </div>
        <p className="mb-4 mt-3 text-center text-sm text-muted-foreground">{message}</p>

        <form
          className="grid gap-2"
          onSubmit={(event) => {
            event.preventDefault()
            goToCode(manualCode)
          }}
        >
          <label htmlFor="cashier-code" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Manual code
          </label>
          <div className="flex gap-2">
            <Input id="cashier-code" value={manualCode} onChange={(event) => setManualCode(event.target.value)} placeholder="SUKI-7F3K9A" className="font-mono uppercase" autoComplete="off" />
            <Button type="submit" disabled={!manualCode.trim()} className="h-12 rounded-[14px] px-5">
              Go
            </Button>
          </div>
        </form>

        <div className="mt-5 grid gap-3">
          <label htmlFor="cashier-search" className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Search suki
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="cashier-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, phone, email, or code" className="pl-11" autoComplete="off" />
          </div>
          {query.trim() && (
            <div className="grid gap-2">
              {results.length > 0 ? (
                results.map((customer) => <CustomerListCard key={customer.id} customer={customer} />)
              ) : (
                <p className="rounded-[20px] border border-border bg-background px-4 py-5 text-center text-sm text-muted-foreground">No matching suki.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default CashierScanner
