import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeftIcon, ArrowRightIcon } from './icons'

export interface CarouselHandle {
  scrollPrev(): void
  scrollNext(): void
  scrollTo(i: number): void
}

interface Props {
  children: ReactNode
  label?: string
  hintKey?: string
  onIndexChange?: (index: number, count: number) => void
  className?: string
}

export const Carousel = forwardRef<CarouselHandle, Props>(function Carousel(
  { children, label, hintKey, onIndexChange, className = '' },
  ref,
) {
  const [emblaRef, api] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    duration: 24,
    skipSnaps: false,
  })
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const [hint, setHint] = useState(false)
  const [bounce, setBounce] = useState(false)

  const triggerBounce = () => {
    setBounce(false)
    requestAnimationFrame(() => setBounce(true))
    window.setTimeout(() => setBounce(false), 240)
  }

  const scrollPrev = useCallback(() => {
    if (!api) return
    if (api.canScrollPrev()) api.scrollPrev()
    else triggerBounce()
  }, [api])
  const scrollNext = useCallback(() => {
    if (!api) return
    if (api.canScrollNext()) api.scrollNext()
    else triggerBounce()
  }, [api])
  const scrollTo = useCallback((i: number) => api?.scrollTo(i), [api])
  useImperativeHandle(ref, () => ({ scrollPrev, scrollNext, scrollTo }), [scrollPrev, scrollNext, scrollTo])

  useEffect(() => {
    if (!api) return
    const onSelect = () => {
      setIndex(api.selectedScrollSnap())
      onIndexChange?.(api.selectedScrollSnap(), api.scrollSnapList().length)
    }
    onSelect()
    api.on('select', onSelect)
    api.on('reInit', onSelect)
    return () => {
      api.off('select', onSelect)
      api.off('reInit', onSelect)
    }
  }, [api, onIndexChange])

  useEffect(() => {
    setCount(api?.scrollSnapList().length ?? 0)
  }, [api, index])

  useEffect(() => {
    if (!hintKey) return
    try {
      if (localStorage.getItem(hintKey)) return
    } catch {
      return
    }
    setHint(true)
    const t = setTimeout(() => {
      setHint(false)
      try {
        localStorage.setItem(hintKey, '1')
      } catch {
        /* ignore */
      }
    }, 1800)
    return () => clearTimeout(t)
  }, [hintKey])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollPrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollNext()
    }
  }

  return (
    <div
      className={`w-full ${className}`}
      onKeyDown={onKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <div className={`embla ${hint ? 'nudge' : ''} ${bounce ? 'bounce' : ''}`} ref={emblaRef}>
        <div className="embla__container">
          {Children.map(children, (child, i) => (
            <div className="embla__slide" key={i}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-ui">
        <button
          type="button"
          className="arrow-btn focus-ring"
          onClick={scrollPrev}
          disabled={index === 0}
          aria-label="Previous item"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <div className="dots">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              className={`dot focus-ring ${i === index ? 'dot-active' : ''}`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to item ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
        <button
          type="button"
          className="arrow-btn focus-ring"
          onClick={scrollNext}
          disabled={index === count - 1}
          aria-label="Next item"
        >
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="counter pixel">
        {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </div>
    </div>
  )
})
