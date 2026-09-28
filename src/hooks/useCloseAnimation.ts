import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Plays the modal exit animation before unmounting. Reduced-motion users close
 * immediately, and repeat requests are ignored while the exit is in flight.
 */
export function useCloseAnimation(onClose: () => void, ms = 170) {
  const [closing, setClosing] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const done = useRef(onClose)
  const started = useRef(false)

  useEffect(() => {
    done.current = onClose
  })

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const requestClose = useCallback(() => {
    if (started.current) return
    if (document.documentElement.classList.contains('reduce')) {
      done.current()
      return
    }
    started.current = true
    setClosing(true)
    timer.current = window.setTimeout(() => done.current(), ms)
  }, [ms])

  return { closing, requestClose }
}
