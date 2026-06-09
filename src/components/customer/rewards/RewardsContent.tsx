import type { StampCard } from '@/customerData'
import type { CustomerRewardHistoryItem } from '@/lib/customer/rewards'
import { AlmostRewardsList } from './AlmostRewardsList'
import { ReadyRewardsGrid } from './ReadyRewardsGrid'
import { RewardHistoryList } from './RewardHistoryList'
import { RewardsHero } from './RewardsHero'
import { RewardsSection } from './RewardsSection'

export function RewardsContent({
  ready,
  almost,
  history,
}: {
  ready: StampCard[]
  almost: StampCard[]
  history: CustomerRewardHistoryItem[]
}) {
  return (
    <section className="grid gap-6 lg:col-start-2 lg:row-span-3 lg:row-start-1">
      <RewardsHero />

      <RewardsSection title="Ready to claim" meta={ready.length > 0 ? `${ready.length} ready` : undefined}>
        <ReadyRewardsGrid cards={ready} />
      </RewardsSection>

      {almost.length > 0 && (
        <RewardsSection title="Almost there">
          <AlmostRewardsList cards={almost} />
        </RewardsSection>
      )}

      <RewardsSection title="History">
        <RewardHistoryList items={history} />
      </RewardsSection>
    </section>
  )
}
