import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../types'
import { PROJECT_ART } from '../data/art'
import { PixelArt } from './PixelArt'
import { XIcon } from './icons'

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return createPortal(
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
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
