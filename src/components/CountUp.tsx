import { useEffect, useState } from 'react'

const NUMERIC = /^(\d+)(.*)$/

/**
 * Counts up the leading number of a stat value (e.g. "3", "4 yrs") after an
 * optional delay. Non-numeric values ("Entry") render untouched, and
 * reduced-motion users jump straight to the final number.
 */
export function CountUp({
  value,
  duration = 800,
  delay = 0,
}: {
  value: string
  duration?: number
  delay?: number
}) {
  const match = NUMERIC.exec(value)
  const target = match ? Number(match[1]) : null
  const suffix = match ? match[2] : ''
  const [n, setN] = useState(0)

  useEffect(() => {
    if (target == null) return
    if (document.documentElement.classList.contains('reduce')) {
      setN(target)
      return
    }
    let frame = 0
    const start = () => {
      const t0 = performance.now()
      const step = (now: number) => {
        const p = Math.min(1, (now - t0) / duration)
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) frame = requestAnimationFrame(step)
      }
      frame = requestAnimationFrame(step)
    }
    setN(0)
    const timer = window.setTimeout(start, delay)
    return () => {
      window.clearTimeout(timer)
      cancelAnimationFrame(frame)
    }
  }, [target, duration, delay])

  if (target == null) return <>{value}</>
  return <>{`${n}${suffix}`}</>
}
