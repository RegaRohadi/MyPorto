import { useEffect, useState } from 'react'
import { PROFILE } from '../data'
import { CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import type { RegisterFn } from './actions'

export function Contact({ active, register }: { active: boolean; register: RegisterFn }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.contact.email)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = PROFILE.contact.email
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  useEffect(() => {
    if (!active) return
    register({ primary: copy })
    return () => register(null)
  }, [active, register])

  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="h-section">CONTACT</h2>
        <p className="body-copy mt-3" style={{ color: 'var(--gba-dim)' }}>
          Have a project or just want to say hi? Reach me through any of the channels below.
        </p>

        <div className="card p-5 mt-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <MailIcon className="w-5 h-5 shrink-0" style={{ color: 'var(--gba-hl)' }} />
              <span className="truncate font-medium">{PROFILE.contact.email}</span>
            </div>
            <button type="button" className="btn btn-accent btn-sm focus-ring shrink-0" onClick={copy}>
              {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
              {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <a
            className="btn btn-ghost btn-sm focus-ring mt-4"
            href={`mailto:${PROFILE.contact.email}`}
          >
            SEND EMAIL
          </a>
        </div>

        <div className="grid gap-3 mt-4 sm:grid-cols-2">
          <a
            className="card p-5 flex items-center gap-3 transition hover:opacity-90"
            href={PROFILE.contact.github}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon className="w-5 h-5" />
            <span className="font-medium">GitHub</span>
          </a>
          <a
            className="card p-5 flex items-center gap-3 transition hover:opacity-90"
            href={PROFILE.contact.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon className="w-5 h-5" />
            <span className="font-medium">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  )
}
