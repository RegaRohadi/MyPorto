import type { Certificate, Profile, Project } from '../types'
import projects from './projects.json'
import certificates from './certificates.json'
import profile from './profile.json'

/** Every PDF dropped into /docs is bundled and can be previewed in the site. */
const certFiles = import.meta.glob('../../docs/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const fileUrlByName: Record<string, string> = {}
for (const [path, url] of Object.entries(certFiles)) {
  const name = path.replace(/\\/g, '/').split('/').pop() ?? path
  fileUrlByName[name] = url
}

type CertificateSeed = Omit<Certificate, 'href'>

export const PROJECTS = projects as Project[]
export const CERTIFICATES: Certificate[] = (certificates as CertificateSeed[]).map((cert) => ({
  ...cert,
  href: fileUrlByName[cert.file] ?? '',
}))
export const PROFILE = profile as Profile
