import { PROFILE } from '../data'

const MENU: { label: string; i: number }[] = [
  { label: 'ABOUT ME', i: 1 },
  { label: 'SKILLS', i: 2 },
  { label: 'PROJECTS', i: 3 },
  { label: 'CERTIFICATES', i: 4 },
  { label: 'ORGANIZATIONS', i: 5 },
  { label: 'CONTACT', i: 6 },
]

export function StartScreen({ onNavigate }: { onNavigate: (i: number) => void }) {
  return (
    <div className="start-screen min-h-full flex flex-col items-center justify-center text-center px-6 py-4 gap-4">
      <div>
        <h1 className="h-display start-title">{PROFILE.name}</h1>
        <p className="mt-2 start-role" style={{ color: 'var(--gba-dim)' }}>
          {PROFILE.role}
        </p>
      </div>

      <p className="pixel blink start-press" style={{ color: 'var(--gba-accent-text)' }}>
        PRESS START
      </p>

      <nav className="start-menu flex flex-col gap-2 w-full max-w-sm" aria-label="Main menu">
        {MENU.map((m) => (
          <button
            key={m.i}
            type="button"
            onClick={() => onNavigate(m.i)}
            className="btn btn-ghost btn-sm focus-ring justify-between w-full"
          >
            <span>
              {'>'} {m.label}
            </span>
            <span className="opacity-50">{String(m.i).padStart(2, '0')}</span>
          </button>
        ))}
      </nav>

      <p className="start-hint" style={{ color: 'var(--gba-dim)' }}>
        Use the D-pad / arrow keys to navigate between sections
      </p>
    </div>
  )
}
