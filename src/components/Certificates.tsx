import { useEffect, useRef, useState } from 'react'
import { CERTIFICATES } from '../data'
import { AWARD_ART } from '../data/art'
import { Carousel, type CarouselHandle } from './Carousel'
import { PixelArt } from './PixelArt'
import type { RegisterFn } from './actions'

export function Certificates({ active, register }: { active: boolean; register: RegisterFn }) {
  const carouselRef = useRef<CarouselHandle>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!active) return
    register({
      left: () => carouselRef.current?.scrollPrev(),
      right: () => carouselRef.current?.scrollNext(),
      primary: () => {
        const c = CERTIFICATES[activeIndex]
        if (c && c.url && c.url !== '#') window.open(c.url, '_blank', 'noopener')
      },
    })
    return () => register(null)
  }, [active, register, activeIndex])

  return (
    <div className="h-full overflow-y-auto px-6 py-4 flex flex-col">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-end justify-between gap-4">
          <h2 className="h-section">CERTIFICATES</h2>
          <p className="pixel text-[9px]" style={{ color: 'var(--gba-dim)' }}>
            ACHIEVEMENTS
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full mt-3 flex-1">
        <Carousel
          ref={carouselRef}
          label="Certificates"
          hintKey="gba-certs-hint"
          onIndexChange={setActiveIndex}
        >
          {CERTIFICATES.map((c) => (
            <article key={c.id} className="card h-full flex flex-col items-center text-center p-4">
              <PixelArt rows={AWARD_ART} className="w-20 h-20" />
              <h3 className="pixel text-sm mt-3">{c.title}</h3>
              <p className="mt-2 text-sm font-semibold" style={{ color: 'var(--gba-em)' }}>
                {c.issuer}
              </p>
              <p className="mt-1 text-xs" style={{ color: 'var(--gba-dim)' }}>
                {c.date} · {c.category}
              </p>
              <a
                className="btn btn-accent btn-sm focus-ring mt-3"
                href={c.url}
                target="_blank"
                rel="noreferrer"
              >
                VIEW CERTIFICATE
              </a>
            </article>
          ))}
        </Carousel>
      </div>
    </div>
  )
}
