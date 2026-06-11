import { Building2, Plus, Save, UserPlus, X } from 'lucide-react'
import { useState } from 'react'
import { BusinessPageLayout } from '@/components/business/layout/BusinessPageLayout'
import { businessSettings, businessStaffAccounts, type BusinessSettings, type BusinessStaffAccount, type BusinessStaffRole, type BusinessStaffStatus } from '@/lib/business/data'
import { cn } from '@/lib/utils'

type InviteDraft = {
  name: string
  contact: string
  role: BusinessStaffRole
  branch: string
}

const roleStyles = {
  owner: 'bg-[#2f4f3e] text-[#eaf3ec]',
  cashier: 'bg-[#dda947] text-foreground',
}

const statusStyles = {
  active: 'bg-[#2f4f3e] text-[#eaf3ec]',
  invited: 'bg-[#dda947] text-foreground',
  disabled: 'bg-background text-muted-foreground',
}

function Badge({ children, className }: { children: string; className: string }) {
  return <span className={cn('rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]', className)}>{children}</span>
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="grid gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <input className="h-11 rounded-[12px] border border-border bg-background/70 px-3 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function SettingsCard({ children, icon: Icon, title }: { children: React.ReactNode; icon: typeof Building2; title: string }) {
  return (
    <section className="h-fit rounded-[24px] border border-border/80 bg-card/70 p-5 shadow-[0_22px_55px_rgba(120,72,44,0.1)] backdrop-blur-md">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-[#2f4f3e] text-[#eaf3ec]">
          <Icon size={20} />
        </span>
        <h2 className="m-0 font-[var(--heading)] text-2xl leading-none tracking-normal">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function SectionSaveButton({ children }: { children: string }) {
  return (
    <button className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#c8543a] px-4 font-bold text-card shadow-[0_14px_30px_rgba(200,84,58,0.18)] transition-colors hover:bg-[#b94831] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" type="button">
      <Save size={18} />
      {children}
    </button>
  )
}

function InviteStaffSheet({
  draft,
  onChange,
  onClose,
  onInvite,
}: {
  draft: InviteDraft
  onChange: (draft: InviteDraft) => void
  onClose: () => void
  onInvite: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 grid bg-foreground/18 p-4 backdrop-blur-sm sm:place-items-center">
      <section className="mt-auto w-full rounded-[22px] border border-border bg-card p-5 shadow-[0_28px_70px_rgba(36,29,24,0.18)] sm:mt-0 sm:max-w-[520px]" role="dialog" aria-modal="true" aria-labelledby="invite-title">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p className="m-0 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c8543a]">Staff access</p>
            <h2 id="invite-title" className="mb-0 mt-1 font-[var(--heading)] text-3xl leading-none tracking-normal">Invite staff</h2>
          </div>
          <button className="grid h-10 w-10 cursor-pointer place-items-center rounded-[12px] border border-border bg-background text-foreground" type="button" onClick={onClose} aria-label="Close invite staff">
            <X size={18} />
          </button>
        </div>

        <div className="grid gap-3">
          <Field label="Name" value={draft.name} onChange={(value) => onChange({ ...draft, name: value })} />
          <Field label="Email or phone" value={draft.contact} onChange={(value) => onChange({ ...draft, contact: value })} />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Role</span>
              <select className="h-11 rounded-[12px] border border-border bg-background/70 px-3 text-sm outline-none focus:border-[#c8543a] focus:ring-2 focus:ring-ring/30" value={draft.role} onChange={(event) => onChange({ ...draft, role: event.target.value as BusinessStaffRole })}>
                <option value="cashier">Cashier</option>
                <option value="owner">Owner</option>
              </select>
            </label>
            <Field label="Branch" value={draft.branch} onChange={(value) => onChange({ ...draft, branch: value })} />
          </div>
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button className="min-h-11 cursor-pointer rounded-[14px] border border-border bg-background px-4 font-bold text-foreground transition-colors hover:bg-card" type="button" onClick={onClose}>Cancel</button>
          <button className="min-h-11 cursor-pointer rounded-[14px] bg-[#c8543a] px-4 font-bold text-card shadow-[0_14px_30px_rgba(200,84,58,0.2)] transition-colors hover:bg-[#b94831]" type="button" onClick={onInvite}>Send invite</button>
        </div>
      </section>
    </div>
  )
}

function StaffCard({
  staff,
  onRoleChange,
  onStatusChange,
}: {
  staff: BusinessStaffAccount
  onRoleChange: (role: BusinessStaffRole) => void
  onStatusChange: (status: BusinessStaffStatus) => void
}) {
  return (
    <article className="rounded-[18px] border border-border/70 bg-background/55 p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="m-0 truncate font-bold leading-tight">{staff.name}</h3>
          <p className="mb-0 mt-1 truncate text-sm text-muted-foreground">{staff.contact}</p>
        </div>
        <Badge className={statusStyles[staff.status]}>{staff.status}</Badge>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="flex flex-wrap gap-2">
          <Badge className={roleStyles[staff.role]}>{staff.role}</Badge>
          <span className="rounded-full bg-card/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{staff.branch}</span>
        </div>
        <div className="flex gap-2">
          <select className="h-9 rounded-[11px] border border-border bg-card/70 px-2 text-xs font-bold outline-none" value={staff.role} onChange={(event) => onRoleChange(event.target.value as BusinessStaffRole)}>
            <option value="owner">Owner</option>
            <option value="cashier">Cashier</option>
          </select>
          <button className="h-9 cursor-pointer rounded-[11px] border border-border bg-card/70 px-3 text-xs font-bold text-foreground transition-colors hover:text-[#c8543a]" type="button" onClick={() => onStatusChange(staff.status === 'disabled' ? 'active' : 'disabled')}>
            {staff.status === 'disabled' ? 'Enable' : 'Disable'}
          </button>
        </div>
      </div>
    </article>
  )
}

export function BusinessSettingsPage() {
  const [settings, setSettings] = useState<BusinessSettings>(businessSettings)
  const [staff, setStaff] = useState<BusinessStaffAccount[]>(businessStaffAccounts)
  const [inviteOpen, setInviteOpen] = useState(false)
  const [invite, setInvite] = useState<InviteDraft>({
    name: '',
    contact: '',
    role: 'cashier',
    branch: businessSettings.profile.branch,
  })

  function updateProfile(key: keyof BusinessSettings['profile'], value: string) {
    setSettings((current) => ({ ...current, profile: { ...current.profile, [key]: value } }))
  }

  function inviteStaff() {
    if (!invite.name.trim() || !invite.contact.trim()) return
    setStaff((current) => [
      {
        id: `staff-${Date.now()}`,
        name: invite.name.trim(),
        contact: invite.contact.trim(),
        role: invite.role,
        status: 'invited',
        branch: invite.branch.trim() || settings.profile.branch,
        lastActive: new Date().toISOString(),
      },
      ...current,
    ])
    setInvite({ name: '', contact: '', role: 'cashier', branch: settings.profile.branch })
    setInviteOpen(false)
  }

  return (
    <BusinessPageLayout>
      <div className="grid gap-5 lg:gap-6">
        <header className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="m-0 font-mono text-xs uppercase tracking-[0.16em] text-[#c8543a]">Owner workspace</p>
            <h1 className="mb-2 mt-2 font-[var(--heading)] text-[38px] leading-[0.98] tracking-normal md:text-5xl">Settings</h1>
            <p className="m-0 max-w-[620px] text-sm text-muted-foreground">Manage business details and staff access.</p>
          </div>
        </header>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]">
          <div className="grid gap-5">
            <SettingsCard icon={Building2} title="Business info">
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Business name" value={settings.profile.name} onChange={(value) => updateProfile('name', value)} />
                <Field label="Display name" value={settings.profile.displayName} onChange={(value) => updateProfile('displayName', value)} />
                <Field label="Branch" value={settings.profile.branch} onChange={(value) => updateProfile('branch', value)} />
                <Field label="Phone" value={settings.profile.phone} onChange={(value) => updateProfile('phone', value)} />
                <Field label="Email" value={settings.profile.email} onChange={(value) => updateProfile('email', value)} />
                <Field label="Address" value={settings.profile.address} onChange={(value) => updateProfile('address', value)} />
              </div>
              <div className="mt-5 flex justify-end">
                <SectionSaveButton>Save business info</SectionSaveButton>
              </div>
            </SettingsCard>
          </div>

          <SettingsCard icon={UserPlus} title="Staff accounts">
            <button className="mb-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-[#c8543a] px-4 font-bold text-card shadow-[0_14px_30px_rgba(200,84,58,0.18)] transition-colors hover:bg-[#b94831]" type="button" onClick={() => setInviteOpen(true)}>
              <Plus size={18} />
              Invite staff
            </button>
            <div className="scrollbar-reveal grid max-h-[620px] gap-3 overflow-y-auto pr-1">
              {staff.map((item) => (
                <StaffCard
                  key={item.id}
                  staff={item}
                  onRoleChange={(role) => setStaff((current) => current.map((staffItem) => (staffItem.id === item.id ? { ...staffItem, role } : staffItem)))}
                  onStatusChange={(status) => setStaff((current) => current.map((staffItem) => (staffItem.id === item.id ? { ...staffItem, status } : staffItem)))}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end">
              <SectionSaveButton>Save staff changes</SectionSaveButton>
            </div>
          </SettingsCard>
        </div>
      </div>

      {inviteOpen && <InviteStaffSheet draft={invite} onChange={setInvite} onClose={() => setInviteOpen(false)} onInvite={inviteStaff} />}
    </BusinessPageLayout>
  )
}
