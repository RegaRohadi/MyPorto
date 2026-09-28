import { PROFILE } from '../data'
import { d } from '../lib/motion'
import { SectionHeader } from './SectionHeader'
import { SkillIcon } from './SkillIcon'

export function Skills({ active }: { active?: boolean }) {
  const on = active !== false

  return (
    <div className="min-h-full px-6 py-6">
      <div className="w-full">
        <SectionHeader title="SKILLS" meta="LOADOUT" active={active} />
        <div className="grid skills-grid mt-4">
          {PROFILE.skills.map((g, i) => (
            <div
              key={g.category}
              className={`card skill-card ${on ? 'm-pop' : ''}`}
              style={d(140 + i * 120)}
            >
              <h3 className="pixel skill-heading" style={{ color: 'var(--gba-em)' }}>
                {g.category.toUpperCase()}
              </h3>
              <div
                className={`flex flex-wrap skill-chips mt-3 ${on ? 'm-fade' : ''}`}
                style={d(260 + i * 120)}
              >
                {g.items.map((s) => (
                  <span className="chip skill-chip inline-flex items-center" key={s}>
                    <SkillIcon name={s} className="skill-icon shrink-0" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
