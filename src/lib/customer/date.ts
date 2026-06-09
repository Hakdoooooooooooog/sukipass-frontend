export function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const days = Math.max(1, Math.round(diffMs / 86_400_000))
  if (days < 2) return '1d ago'
  if (days < 30) return `${days}d ago`
  return `${Math.round(days / 30)}mo ago`
}
