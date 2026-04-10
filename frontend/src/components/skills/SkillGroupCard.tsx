import type { SkillGroup } from '../../data/portfolio'
import { Badge } from '../ui/Badge'

function levelVariant(level: SkillGroup['skills'][number]['level']): 'default' | 'accent' {
  if (level === 'Advanced') return 'accent'
  return 'default'
}

export function SkillGroupCard({ group }: { group: SkillGroup }) {
  return (
    <section className="rounded-2xl border border-border bg-bg/40 p-6 shadow-soft">
      <header>
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{group.title}</h3>
        {group.description ? <p className="mt-2 text-sm leading-6 text-text/70">{group.description}</p> : null}
      </header>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {group.skills.map((skill) => (
          <li key={skill.name} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-bg/30 px-3 py-2">
            <span className="text-sm font-medium text-text/90">{skill.name}</span>
            <Badge variant={levelVariant(skill.level)}>{skill.level}</Badge>
          </li>
        ))}
      </ul>
    </section>
  )
}

