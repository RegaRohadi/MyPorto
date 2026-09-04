import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '../data'
import { PROJECT_ART } from '../data/art'
import { Carousel, type CarouselHandle } from './Carousel'
import { PixelArt } from './PixelArt'
import { ProjectModal } from './ProjectModal'
import type { RegisterFn } from './actions'

export function Projects({ active, register }: { active: boolean; register: RegisterFn }) {
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
      primary: () => setOpenId(PROJECTS[activeIndex]?.id ?? null),
    })
    return () => register(null)
  }, [active, register, activeIndex])

  const open = openId ? PROJECTS.find((p) => p.id === openId) : null

  return (
    <div className="h-full overflow-y-auto px-6 py-4 flex flex-col">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-end justify-between gap-4">
          <h2 className="h-section">PROJECTS</h2>
          <p className="pixel text-[9px]" style={{ color: 'var(--gba-dim)' }}>
            LEVEL SELECT
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full mt-3 flex-1">
        <Carousel
          ref={carouselRef}
          label="Projects"
          hintKey="gba-projects-hint"
          onIndexChange={setActiveIndex}
          className="carousel-projects"
        >
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className="card flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 p-3 sm:p-5 sm:min-h-[220px]"
            >
              <div className="shrink-0">
                <div
                  className="rounded-lg overflow-hidden"
                  style={{ border: '1px solid var(--gba-border)' }}
                >
                  <PixelArt
                    rows={PROJECT_ART[p.id] ?? []}
                    className="w-full h-32 sm:w-44 sm:h-44"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="pixel text-[9px]" style={{ color: 'var(--gba-em)' }}>
                    LEVEL {p.level}
                  </span>
                  <span className="pixel text-[9px]" style={{ color: 'var(--gba-dim)' }}>
                    {String(p.level).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="pixel text-base mt-2">{p.title}</h3>

                <p className="text-sm leading-snug mt-2 line-clamp-2">
                  {p.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.stack.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-auto pt-3">
                  <button
                    type="button"
                    className="btn btn-accent btn-sm focus-ring"
                    onClick={() => setOpenId(p.id)}
                  >
                    VIEW DETAILS
                  </button>

                  <a
                    className="btn btn-ghost btn-sm focus-ring"
                    href={p.links.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    CODE
                  </a>
                </div>
              </div>
            </article>
          ))}
        </Carousel>
      </div>

      {open && <ProjectModal project={open} onClose={() => setOpenId(null)} />}
    </div>
  )
}
