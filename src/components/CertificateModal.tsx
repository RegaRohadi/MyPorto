import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import type { Certificate } from '../types'
import { XIcon } from './icons'

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, iframe, [tabindex]:not([tabindex="-1"])'

export function CertificateModal({
  cert,
  onClose,
}: {
  cert: Certificate
  onClose: () => void
}) {
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
        className="modal cert-modal"
        role="dialog"
        aria-modal="true"
        aria-label={cert.title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-start justify-between gap-4 p-4"
          style={{ borderBottom: '2px solid var(--gba-border)' }}
        >
          <div className="min-w-0">
            <h3 className="h-section">{cert.title}</h3>
            <p className="text-xs mt-2" style={{ color: 'var(--gba-dim)' }}>
              {cert.issuer} · {cert.date}
              {cert.credentialId ? ` · ID ${cert.credentialId}` : ''}
            </p>
          </div>
          <button type="button" className="arrow-btn focus-ring" onClick={onClose} aria-label="Close">
            <XIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4">
          {cert.href ? (
            <iframe
              key={cert.href}
              src={`${cert.href}#view=Fit&toolbar=0&navpanes=0&statusbar=0`}
              title={`${cert.title} certificate document`}
              className="cert-frame"
              loading="lazy"
            />
          ) : (
            <div className="card p-6 text-center">
              <p className="pixel text-[10px]" style={{ color: 'var(--gba-em)' }}>
                DOCUMENT UNAVAILABLE
              </p>
              <p className="text-sm mt-2" style={{ color: 'var(--gba-dim)' }}>
                The certificate file could not be loaded.
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-4">
            {cert.href && (
              <a
                className="btn btn-accent focus-ring"
                href={cert.href}
                target="_blank"
                rel="noreferrer"
              >
                OPEN IN NEW TAB
              </a>
            )}
            {cert.url ? (
              <a
                className="btn btn-ghost focus-ring"
                href={cert.url}
                target="_blank"
                rel="noreferrer"
              >
                VERIFY
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
