import { useEffect, useState } from 'react'

type Props = {
  title: string
  meta?: string
  /** When provided, the boot animation replays each time the section becomes active. */
  active?: boolean
}

export function SectionHeader({ title, meta, active }: Props) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (active === false) return
    setTick((t) => t + 1)
  }, [active])

  return (
    <div className="sec-head">
      <div className="sec-head__row">
        {/* key remount replays the boot animation on section enter */}
        <h2 key={tick} className="h-section sec-boot" aria-label={title}>
          <span className="sec-caret" aria-hidden="true">
            &#9654;
          </span>
          <span className="sec-text">{title}</span>
          <span className="sec-cursor" aria-hidden="true" />
        </h2>
        {meta && (
          <p className="pixel sec-meta" aria-hidden="true">
            {meta}
          </p>
        )}
      </div>
      <div className="sec-rule" aria-hidden="true">
        <span key={`r-${tick}`} className="sec-rule__fill" />
      </div>
    </div>
  )
}
