import { PROFILE } from '../data'

export function Skills() {
  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <div className="min-h-full flex flex-col justify-center">
        <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-end justify-between gap-4">
          <h2 className="h-section">SKILLS</h2>
          <p className="pixel text-[9px]" style={{ color: 'var(--gba-dim)' }}>
            LOADOUT
          </p>
        </div>
        <div className="grid gap-4 mt-4 sm:grid-cols-3">
          {PROFILE.skills.map((g) => (
            <div key={g.category} className="card p-4">
              <h3 className="pixel text-[10px]" style={{ color: 'var(--gba-em)' }}>
                {g.category.toUpperCase()}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {g.items.map((s) => (
                  <span className="chip" key={s}>
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
