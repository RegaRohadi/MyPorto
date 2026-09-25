import { useEffect, useRef, useState } from 'react'
import { ORGANIZATIONS } from '../data'
import { AWARD_ART } from '../data/art'
import { Carousel, type CarouselHandle } from './Carousel'
import { CertificateModal } from './CertificateModal'
import { PixelArt } from './PixelArt'
import { SectionHeader } from './SectionHeader'
import type { RegisterFn } from './actions'

export function Organizations({ active, register }: { active: boolean; register: RegisterFn }) {
  const carouselRef = useRef<CarouselHandle>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    if (!active) {
      setOpenId(null)
      return
    }
    register({
      left: () => carouselRef.current?.scrollPrev(),
      right: () => carouselRef.current?.scrollNext(),
      primary: () => setOpenId(ORGANIZATIONS[activeIndex]?.id ?? null),
    })
    return () => register(null)
  }, [active, register, activeIndex])

  const open = openId ? ORGANIZATIONS.find((o) => o.id === openId) : null

  return (
    <div className="min-h-full px-6 py-4 flex flex-col">
      <div className="w-full">
        <SectionHeader
          title="ORGANIZATIONS"
          meta={`${ORGANIZATIONS.length} ROLES`}
          active={active}
        />
      </div>

      <div className="w-full mt-3 flex-1">
        {ORGANIZATIONS.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="pixel text-[10px]" style={{ color: 'var(--gba-em)' }}>
              NO EXPERIENCE YET
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--gba-dim)' }}>
              Organization experience is being added — check back soon.
            </p>
          </div>
        ) : (
          <Carousel
            ref={carouselRef}
            label="Organization experience"
            hintKey="gba-orgs-hint"
            onIndexChange={setActiveIndex}
          >
          {ORGANIZATIONS.map((o, i) => {
            const near = Math.abs(i - activeIndex) <= 1
            return (
              <article key={o.id} className="card h-full flex flex-col p-3">
                <div className="cert-thumb" aria-hidden="true">
                  {o.preview && near ? (
                    <img
                      src={o.preview}
                      alt=""
                      className="cert-thumb__img"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="cert-thumb__empty">
                      <PixelArt rows={AWARD_ART} className="w-16 h-16" />
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-center text-center mt-3">
                  <h3 className="pixel text-sm">{o.title}</h3>
                  <p className="mt-2 text-sm font-semibold" style={{ color: 'var(--gba-em)' }}>
                    {o.issuer}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: 'var(--gba-dim)' }}>
                    {o.date} · {o.category}
                  </p>
                  {o.credentialId && (
                    <p className="mt-1 text-[11px] break-all" style={{ color: 'var(--gba-muted)' }}>
                      ID {o.credentialId}
                    </p>
                  )}
                  <button
                    type="button"
                    className="btn btn-accent btn-sm focus-ring mt-3"
                    onClick={() => setOpenId(o.id)}
                  >
                    VIEW CERTIFICATE
                  </button>
                </div>
              </article>
            )
          })}
        </Carousel>
        )}
      </div>

      {open && <CertificateModal cert={open} onClose={() => setOpenId(null)} />}
    </div>
  )
}
