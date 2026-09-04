export interface Project {
  id: string
  level: number
  title: string
  tagline: string
  thumb: string
  stack: string[]
  links: { live: string; github: string }
  detail: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  category: string
  url: string
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Profile {
  name: string
  role: string
  tagline: string
  description: string[]
  skills: SkillGroup[]
  stats: { label: string; value: string }[]
  contact: { email: string; github: string; linkedin: string }
}
