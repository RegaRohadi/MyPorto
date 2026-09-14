import { MoonIcon, SunIcon } from './icons'

export type SectionId = 'start' | 'about' | 'skills' | 'projects' | 'certificates' | 'contact'

const ITEMS: { id: SectionId; label: string }[] = [
  { id: 'start', label: 'START' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'certificates', label: 'CERTS' },
  { id: 'contact', label: 'CONTACT' },
]

interface Props {
  screen: number
  navigate: (i: number) => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function TopNav({ screen, navigate, theme, onToggleTheme }: Props) {
  return (
    <nav className="nav" aria-label="Main sections">
      {ITEMS.map((item, i) => (
        <button
          key={item.id}
          type="button"
          className={`nav-tab focus-ring ${screen === i ? 'nav-tab-active' : ''}`}
          onClick={() => navigate(i)}
          aria-current={screen === i ? 'page' : undefined}
        >
          {item.label}
        </button>
      ))}
      <span
        className="ml-auto hidden lg:inline whitespace-nowrap text-[10px]"
        style={{ color: 'var(--gba-dim)' }}
      >
        Use ↑↓ arrow keys
      </span>
      <span className="hidden lg:inline-flex">
        <button
          type="button"
          className="mini-btn focus-ring"
          onClick={onToggleTheme}
          aria-pressed={theme === 'light'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title="Brightness"
        >
          {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
        </button>
      </span>
    </nav>
  )
}
