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
}

export function TopNav({ screen, navigate }: Props) {
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
        className="ml-auto hidden md:inline whitespace-nowrap text-[10px]"
        style={{ color: 'var(--gba-dim)' }}
      >
        Use D-Pad ↑↓
      </span>
    </nav>
  )
}
