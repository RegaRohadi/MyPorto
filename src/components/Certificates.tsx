import { useEffect, useRef, useState } from 'react'
import { CERTIFICATES } from '../data'
import { AWARD_ART } from '../data/art'
import { Carousel, type CarouselHandle } from './Carousel'
import { CertificateModal } from './CertificateModal'
import { PixelArt } from './PixelArt'
import { SectionHeader } from './SectionHeader'
import type { RegisterFn } from './actions'

export function Certificates({ active, register }: { active: boolean; register: RegisterFn }) {
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
      primary: () => setOpenId(CERTIFICATES[activeIndex]?.id ?? null),
    })
    return () => register(null)
  }, [active, register, activeIndex])

  const open = openId ? CERTIFICATES.find((c) => c.id === openId) : null

  return (
    <div className="h-full overflow-y-auto px-6 py-4 flex flex-col">
      <div className="w-full">
        <SectionHeader
          title="CERTIFICATES"
          meta={`${CERTIFICATES.length} EARNED`}
          active={active}
        />
      </div>

      <div className="w-full mt-3 flex-1">
        {CERTIFICATES.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="pixel text-[10px]" style={{ color: 'var(--gba-em)' }}>
              NO TROPHIES YET
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--gba-dim)' }}>
              New certificates are being verified — check back soon.
            </p>
          </div>
        ) : (
          <Carousel
            ref={carouselRef}
            label="Certificates"
            hintKey="gba-certs-hint"
            onIndexChange={setActiveIndex}
          >
          {CERTIFICATES.map((c, i) => {
            const near = Math.abs(i - activeIndex) <= 1
            return (
              <article key={c.id} className="card h-full flex flex-col p-3">
                <div className="cert-thumb" aria-hidden="true">
                  {c.href && near ? (
                    <iframe
                      src={`${c.href}#page=1&view=Fit&toolbar=0&navpanes=0&statusbar=0`}
                      title={`${c.title} certificate preview`}
                      className="cert-thumb__frame"
                      tabIndex={-1}
                    />
                  ) : (
                    <span className="cert-thumb__empty">
                      <PixelArt rows={AWARD_ART} className="w-16 h-16" />
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-center text-center mt-3">
                  <h3 className="pixel text-sm">{c.title}</h3>
                  <p className="mt-2 text-sm font-semibold" style={{ color: 'var(--gba-em)' }}>
                    {c.issuer}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: 'var(--gba-dim)' }}>
                    {c.date} · {c.category}
                  </p>
                  {c.credentialId && (
                    <p className="mt-1 text-[11px] break-all" style={{ color: 'var(--gba-muted)' }}>
                      ID {c.credentialId}
                    </p>
                  )}
                  <button
                    type="button"
                    className="btn btn-accent btn-sm focus-ring mt-3"
                    onClick={() => setOpenId(c.id)}
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
