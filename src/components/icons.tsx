import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const stroke = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

export const MailIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export const GitHubIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)

export const LinkedInIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.2 8.1h4.7V24H.2ZM8.4 8.1h4.5v2.17h.06c.63-1.19 2.16-2.44 4.45-2.44 4.76 0 5.64 3.13 5.64 7.2V24h-4.7v-7.99c0-1.9-.03-4.35-2.65-4.35-2.65 0-3.06 2.07-3.06 4.2V24H8.4Z" />
  </svg>
)

export const CopyIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)

export const CheckIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export const ArrowUpIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
)

export const ArrowDownIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
)

export const ArrowLeftIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

export const ArrowRightIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const SunIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)

export const MoonIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
)

export const EffectsIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M18.4 5.6l-1.4 1.4M7.6 16.4l-1.4 1.4" />
  </svg>
)

export const PowerIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M12 2v10" />
    <path d="M18.4 6.6a9 9 0 1 1-12.8 0" />
  </svg>
)

export const XIcon = (p: P) => (
  <svg {...stroke} {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)
