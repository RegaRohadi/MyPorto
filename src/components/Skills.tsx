import { PROFILE } from '../data'
import { SectionHeader } from './SectionHeader'
import { SkillIcon } from './SkillIcon'

export function Skills({ active }: { active?: boolean }) {
  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <div className="min-h-full flex flex-col justify-center">
        <div className="w-full">
        <SectionHeader title="SKILLS" meta="LOADOUT" active={active} />
        <div className="grid gap-4 mt-4 sm:grid-cols-3">
          {PROFILE.skills.map((g) => (
            <div key={g.category} className="card p-4">
              <h3 className="pixel text-[10px]" style={{ color: 'var(--gba-em)' }}>
                {g.category.toUpperCase()}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {g.items.map((s) => (
                  <span className="chip inline-flex items-center gap-1.5" key={s}>
                    <SkillIcon name={s} className="h-3.5 w-3.5 shrink-0" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </div>
  )
}
