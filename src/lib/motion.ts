import type { CSSProperties } from 'react'

/**
 * Motion helper: sets the `--d` custom property consumed by the `.m-*`
 * entrance classes in global.css, so callers stagger by milliseconds.
 */
export function d(ms: number): CSSProperties {
  return { '--d': `${ms}ms` } as CSSProperties
}
