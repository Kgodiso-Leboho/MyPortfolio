import { useEffect, useState, useMemo } from 'react'
import { profile, getProjects } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Badge } from '../components/ui/Badge'

export function AboutPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  const focusTech = useMemo(() => {
    return Array.from(new Set(projects.flatMap((p) => p.tech))).slice(0, 12)
  }, [projects])

  return (
    <div className="py-14 sm:py-20 bg-[var(--bg)] text-[var(--text)]">
      <Container>
        <SectionHeading
          eyebrow="Profile"
          title="Full Stack Engineer building Intelligent systems and scalable applications"
          description="A structured view of my work, mindset, and technical focus."
        />

        {/* ───────── LAYOUT ───────── */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          {/* ───────── LEFT: Sticky identity card ───────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/40 p-6 shadow-sm">

              <div className="text-sm font-semibold text-[var(--text-h)]">
                {profile.name}
              </div>

              <div className="mt-1 text-xs font-mono text-[var(--text)]/60">
                Software Engineer • AI Systems Builder
              </div>

              <div className="mt-5 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent-border)] p-3">
                <div className="text-xs font-semibold text-[var(--accent)]">
                  Focus
                </div>
                <p className="mt-1 text-sm text-[var(--text)]/80">
                  AI, Full-stack systems, ML pipelines, scalable web apps
                </p>
              </div>

              <div className="mt-5">
                <div className="text-xs font-semibold text-[var(--text)]/60">
                  Core traits
                </div>
                <ul className="mt-2 space-y-2 text-sm text-[var(--text)]/80">
                  <li>• Systems thinking</li>
                  <li>• Clean architecture</li>
                  <li>• Research-driven engineering</li>
                  <li>• Product-first mindset</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ───────── RIGHT: Content cards ───────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Card 1 */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/40 p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[var(--text-h)]">
                What I build
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/30 p-4">
                  <div className="text-sm font-semibold text-[var(--accent)]">
                    AI Systems
                  </div>
                  <p className="mt-2 text-sm text-[var(--text)]/70">
                    NLP models, classification systems, and hybrid ML architectures.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/30 p-4">
                  <div className="text-sm font-semibold text-[var(--accent)]">
                    Full-stack Apps
                  </div>
                  <p className="mt-2 text-sm text-[var(--text)]/70">
                    MERN applications with scalable backend logic and clean UI.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/30 p-4">
                  <div className="text-sm font-semibold text-[var(--accent)]">
                    Data Pipelines
                  </div>
                  <p className="mt-2 text-sm text-[var(--text)]/70">
                    Structured ML workflows with evaluation and reproducibility.
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)]/30 p-4">
                  <div className="text-sm font-semibold text-[var(--accent)]">
                    Experimental Systems
                  </div>
                  <p className="mt-2 text-sm text-[var(--text)]/70">
                    Research prototypes that bridge theory and production systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/40 p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[var(--text-h)]">
                Engineering mindset
              </h3>

              <div className="mt-4 space-y-3 text-sm text-[var(--text)]/80">
                <p>• I design systems before writing code</p>
                <p>• I prioritise clarity and maintainability over complexity</p>
                <p>• I treat features as parts of a larger system</p>
                <p>• I optimise for correctness, not just functionality</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg)]/40 p-6 shadow-sm">
              <h3 className="text-base font-semibold text-[var(--text-h)]">
                Technical stack
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {focusTech.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--accent-bg)] p-6">
              <h3 className="text-base font-semibold text-[var(--accent)]">
                Professional identity
              </h3>

              <p className="mt-2 text-sm text-[var(--text)]/80">
                Software Engineer • AI Developer • Full-stack Engineer • ML Systems Builder
              </p>
            </div>

          </div>
        </div>
      </Container>
    </div>
  )
}