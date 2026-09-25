import type { Certificate, Profile, Project } from '../types'
import projects from './projects.json'
import certificates from './certificates.json'
import organizations from './organizations.json'
import profile from './profile.json'

type Globs = Record<string, string>

/** Maps `filename.ext` -> bundled asset URL from a glob import. */
function urlByFileName(files: Globs): Record<string, string> {
  const map: Record<string, string> = {}
  for (const [path, url] of Object.entries(files)) {
    const name = path.replace(/\\/g, '/').split('/').pop() ?? path
    map[name] = url
  }
  return map
}

/** Maps a file's base name (no extension) -> bundled asset URL. */
function urlByBaseName(files: Globs): Record<string, string> {
  const map: Record<string, string> = {}
  for (const [path, url] of Object.entries(files)) {
    const name = path.replace(/\\/g, '/').split('/').pop() ?? path
    map[name.replace(/\.[^.]+$/, '')] = url
  }
  return map
}

/** Every PDF dropped into /docs can be opened in a new tab. */
const certFileUrlByName = urlByFileName(
  import.meta.glob('../../docs/*.pdf', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Globs,
)

/**
 * Rasterised first pages live in /docs/previews so the preview works on mobile
 * browsers, which refuse to render PDFs inside an iframe. Files are named after
 * the certificate id (`<id>.png`).
 */
const certPreviewUrlById = urlByBaseName(
  import.meta.glob('../../docs/previews/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Globs,
)

/** Organization experience documents live in their own folder. */
const orgFileUrlByName = urlByFileName(
  import.meta.glob('../../docs/sertif_organisasi/*.pdf', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Globs,
)

const orgPreviewUrlById = urlByBaseName(
  import.meta.glob('../../docs/organizations/*.png', {
    eager: true,
    query: '?url',
    import: 'default',
  }) as Globs,
)

type CertificateSeed = Omit<Certificate, 'href' | 'preview'>

export const PROJECTS = projects as Project[]
export const CERTIFICATES: Certificate[] = (certificates as CertificateSeed[]).map((cert) => ({
  ...cert,
  href: certFileUrlByName[cert.file] ?? '',
  preview: certPreviewUrlById[cert.id] ?? '',
}))
export const ORGANIZATIONS: Certificate[] = (organizations as CertificateSeed[]).map((org) => ({
  ...org,
  href: orgFileUrlByName[org.file] ?? '',
  preview: orgPreviewUrlById[org.id] ?? '',
}))
export const PROFILE = profile as Profile
