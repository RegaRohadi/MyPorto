import { PixelArt } from './PixelArt'
import { SKILL_FALLBACK, SKILL_ICONS } from '../data/skillIcons'

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const icon = SKILL_ICONS[name] ?? SKILL_FALLBACK
  return (
    <PixelArt
      rows={icon.rows}
      palette={icon.palette}
      className={className}
      label={`${name} icon`}
    />
  )
}
