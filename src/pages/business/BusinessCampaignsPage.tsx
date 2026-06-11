import { Archive, Copy, Edit3, Megaphone, Pause, Play, Plus, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { BusinessPageLayout } from '@/components/business/layout/BusinessPageLayout'
import { businessCampaigns, type BusinessCampaignStatus, type BusinessCampaignSummary } from '@/lib/business/data'
import { cn } from '@/lib/utils'

type CampaignDraft = Pick<BusinessCampaignSummary, 'description' | 'goal' | 'reward' | 'status' | 'title' | 'tone'>

const toneDots = {
  terra: 'bg-[#c8543a]',
  forest: 'bg-[#2f4f3e]',
  gold: 'bg-[#dda947]',
}

const toneCards = {
  terra: 'border-[#c8543a]/30 bg-[#c8543a]/10',
  forest: 'border-[#2f4f3e]/30 bg-[#2f4f3e]/10',
  gold: 'border-[#dda947]/40 bg-[#dda947]/10',
}

const statusStyles = {
  active: 'bg-[#2f4f3e] text-[#eaf3ec]',
  paused: 'bg-[#dda947] text-foreground',
  draft: 'bg-background text-muted-foreground',
}

const emptyDraft: CampaignDraft = {
  title: '',
  description: '',
  reward: '',
  goal: 8,
  tone: 'forest',
  status: 'draft',
}

function campaignFormFrom(campaign: BusinessCampaignSummary): CampaignDraft {
  return {
    title: campaign.title,
    description: campaign.description,
    reward: campaign.reward,
    goal: campaign.goal,
    tone: campaign.tone,
    status: campaign.status,
  }
}

function CampaignStatusBadge({ status }: { status: BusinessCampaignStatus }) {
  return (
    <span className={cn('rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]', statusStyles[status])}>
      {status}
    </span>
  )
}

function CampaignMetric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[14px] bg-card/70 px-3 py-3">
      <strong className="block font-[var(--heading)] text-2xl leading-none tracking-normal">{value}</strong>
      <span className="mt-1 block text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

function CampaignSheet({
  draft,
  mode,
  onChange,
  onClose,
  onSave,
}: {
  draft: CampaignDraft
  mode: 'edit' | 'new'
  onChange: (draft: CampaignDraft) => void
  onClose: () => void
  onSave: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 grid bg-foreground/18 p-4 backdrop-blur-sm sm:place-items-center">
      <section className="mt-auto max-h-[calc(100svh-32px)] w-full overflow-y-auto rounded-[22px] border border-border bg-card p-5 shadow-[0_28px_70px_rgba(36,29,24,0.18)] sm:mt-0 sm:max-w-[540px]" role="dialog" aria-modal="true" aria-labelledby="campaign-form-title">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c8543a]">{mode === 'new' ? 'New campaign' : 'Edit campaign'}</p>
            <h2 id="campaign-form-title" className="mb-0 mt-1 font-[var(--heading)] text-3xl leading-none tracking-normal">
              {mode === 'new' ? 'Create card' : 'Update card'}
            </h2>
          </div>
          <button className="grid h-10 w-10 cursor-pointer place-items-center rounded-[12px] border border-border bg-background text-foreground" type="button" onClick={onClose} aria-label="Close campaign form">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-3">
          <label className="grid gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Name</span>
            <input className="h-11 rounded-[12px] border border-border bg-background px-3 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" value={draft.title} onChange={(event) => onChange({ ...draft, title: event.target.value })} />
          </label>
          <label className="grid gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Description</span>
            <textarea className="min-h-24 resize-none rounded-[12px] border border-border bg-background px-3 py-2 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" value={draft.description} onChange={(event) => onChange({ ...draft, description: event.target.value })} />
          </label>
          <label className="grid gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Reward</span>
            <input className="h-11 rounded-[12px] border border-border bg-background px-3 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" value={draft.reward} onChange={(event) => onChange({ ...draft, reward: event.target.value })} />
          </label>

          <div className="grid gap-3 sm:grid-cols-3">
            <label className="grid gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Stamps</span>
              <input className="h-11 rounded-[12px] border border-border bg-background px-3 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" min={1} max={30} type="number" value={draft.goal} onChange={(event) => onChange({ ...draft, goal: Number(event.target.value) })} />
            </label>
            <label className="grid gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Status</span>
              <select className="h-11 rounded-[12px] border border-border bg-background px-3 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" value={draft.status} onChange={(event) => onChange({ ...draft, status: event.target.value as BusinessCampaignStatus })}>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <label className="grid gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Color</span>
              <select className="h-11 rounded-[12px] border border-border bg-background px-3 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" value={draft.tone} onChange={(event) => onChange({ ...draft, tone: event.target.value as CampaignDraft['tone'] })}>
                <option value="forest">Forest</option>
                <option value="terra">Terra</option>
                <option value="gold">Gold</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button className="min-h-11 cursor-pointer rounded-[14px] border border-border bg-background px-4 font-bold text-foreground transition-colors hover:bg-card" type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="min-h-11 cursor-pointer rounded-[14px] bg-[#c8543a] px-4 font-bold text-card shadow-[0_14px_30px_rgba(200,84,58,0.2)] transition-colors hover:bg-[#b94831]" type="button" onClick={onSave}>
            Save campaign
          </button>
        </div>
      </section>
    </div>
  )
}

export function BusinessCampaignsPage() {
  const [campaigns, setCampaigns] = useState<BusinessCampaignSummary[]>(businessCampaigns)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | BusinessCampaignStatus>('all')
  const [selectedId, setSelectedId] = useState(campaigns[0]?.id ?? '')
  const [draft, setDraft] = useState<CampaignDraft>(emptyDraft)
  const [sheetMode, setSheetMode] = useState<'edit' | 'new' | null>(null)

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return campaigns
      .filter((campaign) => status === 'all' || campaign.status === status)
      .filter((campaign) => !normalized || [campaign.title, campaign.reward, campaign.description].some((value) => value.toLowerCase().includes(normalized)))
      .sort((a, b) => Number(b.status === 'active') - Number(a.status === 'active') || b.enrolled - a.enrolled)
  }, [campaigns, query, status])

  const selected = campaigns.find((campaign) => campaign.id === selectedId) ?? filtered[0] ?? campaigns[0]
  const totals = useMemo(() => ({
    active: campaigns.filter((campaign) => campaign.status === 'active').length,
    enrolled: campaigns.reduce((sum, campaign) => sum + campaign.enrolled, 0),
    ready: campaigns.reduce((sum, campaign) => sum + campaign.readyToClaim, 0),
    total: campaigns.length,
  }), [campaigns])

  function openNew() {
    setDraft(emptyDraft)
    setSheetMode('new')
  }

  function openEdit(campaign: BusinessCampaignSummary) {
    setSelectedId(campaign.id)
    setDraft(campaignFormFrom(campaign))
    setSheetMode('edit')
  }

  function saveCampaign() {
    if (!draft.title.trim() || !draft.reward.trim()) return

    if (sheetMode === 'new') {
      const id = `campaign-${Date.now()}`
      const campaign: BusinessCampaignSummary = {
        id,
        title: draft.title.trim(),
        description: draft.description.trim(),
        reward: draft.reward.trim(),
        goal: Math.max(1, draft.goal),
        tone: draft.tone,
        status: draft.status,
        enrolled: 0,
        readyToClaim: 0,
        totalStamps: 0,
        updatedAt: new Date().toISOString(),
      }
      setCampaigns((current) => [campaign, ...current])
      setSelectedId(id)
    } else if (selected) {
      setCampaigns((current) =>
        current.map((campaign) =>
          campaign.id === selected.id
            ? {
                ...campaign,
                title: draft.title.trim(),
                description: draft.description.trim(),
                reward: draft.reward.trim(),
                goal: Math.max(1, draft.goal),
                tone: draft.tone,
                status: draft.status,
                updatedAt: new Date().toISOString(),
              }
            : campaign,
        ),
      )
    }

    setSheetMode(null)
  }

  function togglePause(campaign: BusinessCampaignSummary) {
    const status: BusinessCampaignStatus = campaign.status === 'active' ? 'paused' : 'active'
    setCampaigns((current) => current.map((item) => (item.id === campaign.id ? { ...item, status, updatedAt: new Date().toISOString() } : item)))
  }

  function duplicate(campaign: BusinessCampaignSummary) {
    const id = `campaign-${Date.now()}`
    setCampaigns((current) => [
      {
        ...campaign,
        id,
        title: `${campaign.title} Copy`,
        status: 'draft',
        enrolled: 0,
        readyToClaim: 0,
        totalStamps: 0,
        updatedAt: new Date().toISOString(),
      },
      ...current,
    ])
    setSelectedId(id)
  }

  return (
    <BusinessPageLayout>
      <div className="grid gap-5 lg:gap-6">
        <header className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="m-0 font-mono text-xs uppercase tracking-[0.16em] text-[#c8543a]">Owner workspace</p>
            <h1 className="mb-2 mt-2 font-[var(--heading)] text-[38px] leading-[0.98] tracking-normal md:text-5xl">Campaigns</h1>
            <p className="m-0 max-w-[620px] text-sm text-muted-foreground">Create loyalty cards, pause promos, and check which rewards are ready to claim.</p>
          </div>
          <button className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#c8543a] px-4 font-bold text-card shadow-[0_14px_30px_rgba(200,84,58,0.18)] transition-colors hover:bg-[#b94831] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" type="button" onClick={openNew}>
            <Plus size={18} />
            New campaign
          </button>
        </header>

        <section className="grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Campaign totals">
          <article className="rounded-[22px] bg-[#2f4f3e] p-4 text-[#eaf3ec] shadow-[0_20px_42px_rgba(120,72,44,0.12)]">
            <strong className="block font-[var(--heading)] text-4xl leading-none">{totals.total}</strong>
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] opacity-75">Total cards</span>
          </article>
          <article className="rounded-[22px] bg-[#c8543a] p-4 text-card shadow-[0_20px_42px_rgba(120,72,44,0.12)]">
            <strong className="block font-[var(--heading)] text-4xl leading-none">{totals.active}</strong>
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] opacity-75">Active</span>
          </article>
          <article className="rounded-[22px] bg-[#dda947] p-4 text-foreground shadow-[0_20px_42px_rgba(120,72,44,0.12)]">
            <strong className="block font-[var(--heading)] text-4xl leading-none">{totals.enrolled}</strong>
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] opacity-75">Enrolled</span>
          </article>
          <article className="rounded-[22px] bg-[#2f4f3e] p-4 text-[#eaf3ec] shadow-[0_20px_42px_rgba(120,72,44,0.12)]">
            <strong className="block font-[var(--heading)] text-4xl leading-none">{totals.ready}</strong>
            <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.12em] opacity-75">Ready rewards</span>
          </article>
        </section>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.8fr)]">
          <section className="rounded-[24px] border border-border/80 bg-card/70 p-4 shadow-[0_22px_55px_rgba(120,72,44,0.1)] backdrop-blur-md sm:p-5">
            <div className="mb-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="relative min-w-0">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input className="h-11 w-full rounded-[12px] border border-border bg-background/70 pl-10 pr-3 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search campaigns" />
              </div>
              <div className="flex gap-1 overflow-x-auto">
                {(['all', 'active', 'paused', 'draft'] as const).map((item) => (
                  <button key={item} className={cn('h-10 cursor-pointer rounded-[12px] border border-border px-3 text-sm font-bold capitalize transition-colors hover:text-[#c8543a]', status === item ? 'bg-[#2f4f3e] text-[#eaf3ec] hover:text-[#eaf3ec]' : 'bg-background text-muted-foreground')} type="button" onClick={() => setStatus(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {filtered.map((campaign) => (
                <article key={campaign.id} className={cn('rounded-[20px] border p-4 transition-colors', toneCards[campaign.tone], selected?.id === campaign.id && 'ring-2 ring-[#c8543a]/25')}>
                  <button className="grid w-full cursor-pointer gap-3 text-left" type="button" onClick={() => setSelectedId(campaign.id)}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className={cn('mb-2 block h-2 w-8 rounded-full', toneDots[campaign.tone])} />
                        <h2 className="m-0 truncate font-[var(--heading)] text-2xl leading-none tracking-normal">{campaign.title}</h2>
                        <p className="mb-0 mt-1 line-clamp-2 text-sm text-muted-foreground">{campaign.description}</p>
                      </div>
                      <CampaignStatusBadge status={campaign.status} />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <CampaignMetric label="enrolled" value={campaign.enrolled} />
                      <CampaignMetric label="ready" value={campaign.readyToClaim} />
                      <CampaignMetric label="stamps" value={campaign.totalStamps} />
                    </div>
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-[12px] border border-border bg-card/70 px-3 text-sm font-bold text-foreground transition-colors hover:text-[#c8543a]" type="button" onClick={() => openEdit(campaign)}>
                      <Edit3 size={15} />
                      Edit
                    </button>
                    <button className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-[12px] border border-border bg-card/70 px-3 text-sm font-bold text-foreground transition-colors hover:text-[#c8543a]" type="button" onClick={() => togglePause(campaign)}>
                      {campaign.status === 'active' ? <Pause size={15} /> : <Play size={15} />}
                      {campaign.status === 'active' ? 'Pause' : 'Resume'}
                    </button>
                    <button className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-[12px] border border-border bg-card/70 px-3 text-sm font-bold text-foreground transition-colors hover:text-[#c8543a]" type="button" onClick={() => duplicate(campaign)}>
                      <Copy size={15} />
                      Duplicate
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {selected && (
            <aside className="rounded-[24px] border border-border/80 bg-card/70 p-5 shadow-[0_22px_55px_rgba(120,72,44,0.1)] backdrop-blur-md xl:sticky xl:top-8 xl:self-start">
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c8543a]">Selected card</p>
                  <h2 className="mb-0 mt-2 font-[var(--heading)] text-3xl leading-none tracking-normal">{selected.title}</h2>
                </div>
                <CampaignStatusBadge status={selected.status} />
              </div>

              <div className={cn('mb-4 rounded-[20px] border p-4', toneCards[selected.tone])}>
                <Megaphone className="mb-8 h-7 w-7 text-[#c8543a]" />
                <p className="m-0 text-sm text-muted-foreground">{selected.description}</p>
                <div className="mt-4 rounded-[14px] bg-card/70 p-3">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Reward</span>
                  <strong className="mt-1 block leading-tight">{selected.reward}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <CampaignMetric label="stamps needed" value={selected.goal} />
                <CampaignMetric label="total stamps" value={selected.totalStamps} />
                <CampaignMetric label="enrolled" value={selected.enrolled} />
                <CampaignMetric label="ready to claim" value={selected.readyToClaim} />
              </div>

              <div className="mt-4 grid gap-2">
                <button className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#c8543a] px-4 font-bold text-card transition-colors hover:bg-[#b94831]" type="button" onClick={() => openEdit(selected)}>
                  <Edit3 size={17} />
                  Edit campaign
                </button>
                <button className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-border bg-background px-4 font-bold text-foreground transition-colors hover:text-[#c8543a]" type="button">
                  <Archive size={17} />
                  Archive later
                </button>
              </div>
            </aside>
          )}
        </div>
      </div>

      {sheetMode && <CampaignSheet draft={draft} mode={sheetMode} onChange={setDraft} onClose={() => setSheetMode(null)} onSave={saveCampaign} />}
    </BusinessPageLayout>
  )
}
