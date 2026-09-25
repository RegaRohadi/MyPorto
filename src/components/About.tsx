import { useEffect } from 'react'
import { PROFILE } from '../data'
import { SectionHeader } from './SectionHeader'
import type { RegisterFn } from './actions'

const AVATAR_SRC = '/profil_pixelated.png'

export function About({
  active,
  register,
  onContact,
}: {
  active: boolean
  register: RegisterFn
  onContact: () => void
}) {
  useEffect(() => {
    if (!active) return
    register({ primary: onContact })
    return () => register(null)
  }, [active, register, onContact])

  return (
    <div className="min-h-full px-6 py-6">
      <div className="w-full flex flex-col md:flex-row gap-8 items-start">
        <div className="shrink-0 mx-auto md:mx-0">
          <div className="card p-3">
            <img
              src={AVATAR_SRC}
              alt="Pixel-art portrait of the portfolio owner"
              loading="lazy"
              className="w-40 h-40 object-cover rounded-md"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>
        <div className="flex-1">
          <SectionHeader title="ABOUT ME" active={active} />
          <p className="mt-4 text-sm sm:text-base font-semibold" style={{ color: 'var(--gba-em)' }}>
            {PROFILE.tagline}
          </p>
          {PROFILE.description.map((p, i) => (
            <p key={i} className="body-copy mt-3">
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="w-full mt-4 grid grid-cols-3 gap-2 sm:gap-4">
        {PROFILE.stats.map((s) => (
          <div key={s.label} className="stat text-center">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="w-full mt-6">
        <button type="button" className="btn btn-accent focus-ring" onClick={onContact}>
          CONTACT ME
        </button>
      </div>
    </div>
  )
}
