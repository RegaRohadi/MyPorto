import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../types'
import { PROJECT_ART } from '../data/art'
import { PixelArt } from './PixelArt'
import { XIcon } from './icons'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const prevFocus = useRef<Element | null>(null)

  useEffect(() => {
    prevFocus.current = document.activeElement
    const dialog = dialogRef.current
    dialog?.focus()
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialog) return
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      )
      if (items.length === 0) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (prevFocus.current instanceof HTMLElement) prevFocus.current.focus()
    }
  }, [onClose])

  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="presentation">
        <div
          ref={dialogRef}
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
        <div
          className="flex items-start justify-between gap-4 p-4"
          style={{ borderBottom: '2px solid var(--gba-border)' }}
        >
          <h3 className="h-section">{project.title}</h3>
          <button type="button" className="arrow-btn focus-ring" onClick={onClose} aria-label="Close">
            <XIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4">
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid var(--gba-border)' }}>
            <PixelArt rows={PROJECT_ART[project.id] ?? []} className="w-full aspect-[5/3]" />
          </div>
          <p className="body-copy mt-4">{project.detail}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {project.stack.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-5">
            <a className="btn btn-accent focus-ring" href={project.links.live} target="_blank" rel="noreferrer">
              LIVE DEMO
            </a>
            <a className="btn btn-ghost focus-ring" href={project.links.github} target="_blank" rel="noreferrer">
              SOURCE
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
