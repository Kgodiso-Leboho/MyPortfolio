import { profile, projects } from '../data/portfolio'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Badge } from '../components/ui/Badge'

function TimelineItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
      <div>
        <div className="text-sm font-semibold tracking-tight">{title}</div>
        <p className="mt-1 text-sm leading-6 text-text/70">{description}</p>
      </div>
    </div>
  )
}

export function AboutPage() {
  const focusTech = Array.from(new Set(projects.flatMap((p) => p.tech))).slice(0, 10)

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Story"
          title="Building products that feel fast, clear, and trustworthy"
          description="I’m a developer who thinks in systems: UX details matter, but so do data correctness, reproducibility, and engineering clarity."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-bg/40 p-6 shadow-soft sm:p-8">
            <h3 className="text-base font-semibold tracking-tight">A quick professional overview</h3>
            <p className="mt-3 text-sm leading-7 text-text/70">
              {profile.name} focuses on shipping modern web experiences and data/ML workflows. On the front end, I build
              accessible, responsive UI that helps users understand complex systems. On the data side, I prioritize
              validation, evaluation, and observability so insights remain reliable as requirements evolve.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-bg/30 p-4">
              <div className="text-xs font-semibold tracking-wider text-text/60">What drives my work</div>
              <div className="mt-4 space-y-4">
                <TimelineItem
                  title="UX clarity"
                  description="Design decisions are tied to user intent and feedback, not just aesthetics."
                />
                <TimelineItem
                  title="Correctness by design"
                  description="Validation, tests, and observability reduce uncertainty and operational risk."
                />
                <TimelineItem
                  title="Reproducible workflows"
                  description="Experiments are easier to compare and iterate when runs are trackable."
                />
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-border bg-bg/40 p-6 shadow-soft sm:p-8">
            <h3 className="text-base font-semibold tracking-tight">Focus areas</h3>
            <p className="mt-3 text-sm leading-6 text-text/70">
              Technologies I reach for when building clean interfaces and dependable data/ML systems.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {focusTech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>

            <div className="mt-7 rounded-2xl border border-border bg-bg/30 p-4">
              <div className="text-xs font-semibold tracking-wider text-text/60">Principles</div>
              <ul className="mt-3 space-y-2 text-sm text-text/80">
                <li>Typed, modular components</li>
                <li>Meaningful loading and empty states</li>
                <li>Performance and accessibility as defaults</li>
                <li>Clear handoffs between data and UI</li>
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  )
}

