import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, GitHubIcon, LinkedInIcon, MailIcon, MoonIcon, SunIcon } from './icons'
import { PROFILE } from '../data'

interface Props {
  children: React.ReactNode
  onUp: () => void
  onDown: () => void
  onLeft?: () => void
  onRight?: () => void
  onA?: () => void
  onB?: () => void
  onStart?: () => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export function GbaShell({
  children,
  onUp,
  onDown,
  onLeft,
  onRight,
  onA,
  onB,
  onStart,
  theme,
  onToggleTheme,
}: Props) {
  return (
    <div className="gba-shell">
      <div className="gba-top">
        <div className="speaker" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="speaker-dot" />
          ))}
        </div>
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
      </div>

      <div className="screen-bezel">
        <div className="lcd scanlines">{children}</div>
      </div>

      <div className="controls">
        <div className="dpad" role="group" aria-label="Directional pad">
          <button type="button" className="dpad-btn dpad-up focus-ring" onClick={onUp} aria-label="Previous section">
            <ArrowUpIcon className="w-4 h-4" />
          </button>
          <button type="button" className="dpad-btn dpad-left focus-ring" onClick={onLeft} aria-label="Previous item">
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span className="dpad-center" aria-hidden="true" />
          <button type="button" className="dpad-btn dpad-right focus-ring" onClick={onRight} aria-label="Next item">
            <ArrowRightIcon className="w-4 h-4" />
          </button>
          <button type="button" className="dpad-btn dpad-down focus-ring" onClick={onDown} aria-label="Next section">
            <ArrowDownIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="start-select">
          <button type="button" className="startbtn focus-ring" onClick={onStart} aria-label="Open menu">
            MENU
          </button>
          <div className="flex gap-2" role="group" aria-label="Contact links">
            <a
              className="mini-btn focus-ring"
              href={`mailto:${PROFILE.contact.email}`}
              aria-label="Email"
              title="Email"
            >
              <MailIcon className="w-4 h-4" />
            </a>
            <a
              className="mini-btn focus-ring"
              href={PROFILE.contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              className="mini-btn focus-ring"
              href={PROFILE.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="ab" role="group" aria-label="Action buttons">
          <button type="button" className="abtn abtn-b focus-ring" onClick={onB} aria-label="Back to menu">
            B
          </button>
          <button type="button" className="abtn abtn-a focus-ring" onClick={onA} aria-label="Primary action">
            A
          </button>
        </div>
      </div>
    </div>
  )
}
