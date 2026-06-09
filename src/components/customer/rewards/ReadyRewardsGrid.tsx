import type { StampCard } from '@/customerData'
import { ReadyRewardCard } from './ReadyRewardCard'
import { RewardsSectionEmpty } from './RewardsSection'

export function ReadyRewardsGrid({ cards }: { cards: StampCard[] }) {
  if (!cards.length) {
    return <RewardsSectionEmpty>Wala pang handang reward. Mag-ipon pa ng stamps!</RewardsSectionEmpty>
  }

  return (
    <div className="grid gap-3.5 xl:grid-cols-2">
      {cards.map((card) => (
        <ReadyRewardCard key={card.id} card={card} />
      ))}
    </div>
  )
}
