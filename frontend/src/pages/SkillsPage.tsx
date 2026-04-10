import { skillGroups } from '../data/portfolio'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { SkillGroupCard } from '../components/skills/SkillGroupCard'

export function SkillsPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills that ship"
          description="A practical toolkit across frontend engineering, backend services, and end-to-end data/ML workflows."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <SkillGroupCard key={group.id} group={group} />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-bg/40 p-6 shadow-soft">
          <h3 className="text-base font-semibold tracking-tight">How I work</h3>
          <p className="mt-3 text-sm leading-6 text-text/70">
            I pair UI polish with engineering fundamentals: typed interfaces, sensible abstractions, and feedback loops that keep
            data and user experience aligned.
          </p>
        </div>
      </Container>
    </div>
  )
}

