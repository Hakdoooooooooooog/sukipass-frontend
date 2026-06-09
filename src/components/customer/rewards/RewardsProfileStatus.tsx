export function RewardsProfileStatus({ readyCount, almostCount }: { readyCount: number; almostCount: number }) {
  return (
    <p className="m-0 max-w-[270px] text-sm text-muted-foreground">
      {readyCount > 0 ? (
        <>
          <strong className="text-[#c8543a]">{readyCount === 1 ? '1 handa na' : `${readyCount} handa na`}</strong> - ipakita sa cashier
        </>
      ) : almostCount > 0 ? (
        `${almostCount} card na malapit nang maging reward`
      ) : (
        'Mag-ipon ng stamps sa bawat bisita.'
      )}
    </p>
  )
}
