import type { Certificate, Profile, Project } from '../types'
import projects from './projects.json'
import certificates from './certificates.json'
import profile from './profile.json'

export const PROJECTS = projects as Project[]
export const CERTIFICATES = certificates as Certificate[]
export const PROFILE = profile as Profile
