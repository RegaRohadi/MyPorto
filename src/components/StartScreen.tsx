import { Fragment } from 'react'
import { PROFILE } from '../data'
import { DECOR_ICONS } from '../data/decor'
import { d } from '../lib/motion'
import { PixelArt } from './PixelArt'

const MENU: { label: string; i: number }[] = [
  { label: 'ABOUT ME', i: 1 },
  { label: 'SKILLS', i: 2 },
  { label: 'PROJECTS', i: 3 },
  { label: 'CERTIFICATES', i: 4 },
  { label: 'ORGANIZATIONS', i: 5 },
  { label: 'CONTACT', i: 6 },
]

/** Title split per word/letter so each glyph can stagger in. */
let letterIndex = 0
const TITLE_WORDS = PROFILE.name.split(' ').map((word) =>
  [...word].map((ch) => ({ ch, delay: 60 + letterIndex++ * 18 })),
)

const DECOR = ['heart', 'coin', 'star', 'invader', 'mushroom'] as const

export function StartScreen({
  active = true,
  onNavigate,
}: {
  active?: boolean
  onNavigate: (i: number) => void
}) {
  const m = (cls: string) => (active ? cls : '')

  return (
    <div className="start-screen min-h-full flex flex-col items-center justify-center text-center px-6 py-4 gap-4">
      <div className="start-decor" aria-hidden="true">
        {DECOR.map((name, i) => (
          <span
            key={name}
            className={`start-decor__icon start-decor__icon--${'abcde'[i]}`}
          >
            <PixelArt
              rows={DECOR_ICONS[name].rows}
              palette={DECOR_ICONS[name].palette}
              className="w-full h-auto"
            />
          </span>
        ))}
      </div>

      <div>
        <h1 className="h-display start-title">
          {TITLE_WORDS.map((word, wi) => (
            <Fragment key={wi}>
              {wi > 0 ? ' ' : ''}
              <span className="title-word">
                {word.map(({ ch, delay }, ci) => (
                  <span key={ci} className={m('m-letter')} style={d(delay)}>
                    {ch}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </h1>
        <p
          className={`mt-2 start-role ${m('m-drop')}`}
          style={{ color: 'var(--gba-dim)', ...d(130) }}
        >
          {PROFILE.role}
        </p>
      </div>

      <div className={m('m-pop')} style={d(250)}>
        <p className="pixel blink start-press" style={{ color: 'var(--gba-accent-text)' }}>
          PRESS START
        </p>
      </div>

      <nav className="start-menu flex flex-col gap-2 w-full max-w-sm" aria-label="Main menu">
        {MENU.map((menuItem, i) => (
          <button
            key={menuItem.i}
            type="button"
            onClick={() => onNavigate(menuItem.i)}
            className={`btn btn-ghost btn-sm focus-ring justify-between w-full ${m('m-right')}`}
            style={d(320 + i * 50)}
          >
            <span>
              {'>'} {menuItem.label}
            </span>
            <span className="opacity-50">{String(menuItem.i).padStart(2, '0')}</span>
          </button>
        ))}
      </nav>

      <p className={`start-hint ${m('m-fade')}`} style={{ color: 'var(--gba-dim)', ...d(640) }}>
        Use the D-pad / arrow keys to navigate between sections
      </p>
    </div>
  )
}
