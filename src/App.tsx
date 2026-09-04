import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { GbaShell } from './components/GbaShell'
import { TopNav, type SectionId } from './components/TopNav'
import { StartScreen } from './components/StartScreen'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Certificates } from './components/Certificates'
import { Contact } from './components/Contact'
import { usePrefs } from './hooks/usePrefs'
import type { ActionSet } from './components/actions'

const ORDER: SectionId[] = ['start', 'about', 'skills', 'projects', 'certificates', 'contact']

function indexFromHash(): number {
  const h = window.location.hash.replace('#', '')
  const i = ORDER.indexOf(h as SectionId)
  return i === -1 ? 0 : i
}

export default function App() {
  const { theme, reduce, toggleTheme } = usePrefs()
  const [screen, setScreen] = useState<number>(indexFromHash)
  const [flickering, setFlickering] = useState(false)

  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const flickerTimer = useRef<number | undefined>(undefined)

  const primaryRef = useRef<(() => void) | null>(null)
  const leftRef = useRef<(() => void) | null>(null)
  const rightRef = useRef<(() => void) | null>(null)

  const register = useCallback((a: ActionSet | null) => {
    primaryRef.current = a?.primary ?? null
    leftRef.current = a?.left ?? null
    rightRef.current = a?.right ?? null
  }, [])

  const navigate = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(ORDER.length - 1, i))
      setScreen(next)
      window.history.replaceState(null, '', `#${ORDER[next]}`)
      if (!reduce) {
        setFlickering(true)
        window.clearTimeout(flickerTimer.current)
        flickerTimer.current = window.setTimeout(() => setFlickering(false), 180)
      }
    },
    [reduce],
  )

  const goPrev = useCallback(() => navigate(screen - 1), [navigate, screen])
  const goNext = useCallback(() => navigate(screen + 1), [navigate, screen])

  useEffect(() => {
    const onHash = () => setScreen(indexFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') return
    pointerStart.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' || !pointerStart.current) return
    const dx = e.clientX - pointerStart.current.x
    const dy = e.clientY - pointerStart.current.y
    pointerStart.current = null
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
      if (dy < 0) goNext()
      else goPrev()
    }
  }

  return (
    <div className="min-h-[100dvh] py-2 px-2 sm:py-4 sm:px-4">
      <GbaShell
        onUp={goPrev}
        onDown={goNext}
        onLeft={() => leftRef.current?.()}
        onRight={() => rightRef.current?.()}
        onA={() => primaryRef.current?.()}
        onB={() => navigate(0)}
        onStart={() => navigate(0)}
        theme={theme}
        onToggleTheme={toggleTheme}
      >
        <TopNav screen={screen} navigate={navigate} />
        <div
          className={`screen-viewport ${flickering ? 'flicker' : ''}`}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (pointerStart.current = null)}
        >
          <div className="screen-track" style={{ transform: `translateY(-${screen * 100}%)` }}>
            <section className="screen-page" aria-label="Start screen">
              <StartScreen onNavigate={navigate} />
            </section>
            <section className="screen-page" aria-label="About me">
              <About active={screen === 1} register={register} onContact={() => navigate(5)} />
            </section>
            <section className="screen-page" aria-label="Skills">
              <Skills active={screen === 2} />
            </section>
            <section className="screen-page" aria-label="Projects">
              <Projects active={screen === 3} register={register} />
            </section>
            <section className="screen-page" aria-label="Certificates">
              <Certificates active={screen === 4} register={register} />
            </section>
            <section className="screen-page" aria-label="Contact">
              <Contact active={screen === 5} register={register} />
            </section>
          </div>
        </div>
      </GbaShell>
    </div>
  )
}
