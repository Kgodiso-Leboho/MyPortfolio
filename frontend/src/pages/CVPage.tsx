import { ButtonLink } from '../components/ui/ButtonLink'
import { Container } from '../components/layout/Container'
import { profile } from '../data/portfolio'

export function CVPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <section className="rounded-3xl border border-border bg-bg/40 p-6 shadow-soft sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight">Curriculum Vitae</h1>
              <p className="text-sm text-text/70">
                A dynamic career timeline with role highlights, impact metrics, and next-step contributions.
              </p>
            </div>
            <div className="flex gap-2">
              <ButtonLink
                href={profile.linkedinUrl}
                variant="secondary"
                size="sm"
              >
                View full CV on LinkedIn
              </ButtonLink>
              <ButtonLink
                href="/resume.pdf"
                variant="primary"
                size="sm"
              >
                Download PDF
              </ButtonLink>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-bg/30 p-4">
              <div className="text-xs font-semibold text-text/60">Experience</div>
              <div className="text-xl font-bold">4+ years</div>
            </div>
            <div className="rounded-2xl border border-border bg-bg/30 p-4">
              <div className="text-xs font-semibold text-text/60">Projects delivered</div>
              <div className="text-xl font-bold">6+</div>
            </div>
            <div className="rounded-2xl border border-border bg-bg/30 p-4">
              <div className="text-xs font-semibold text-text/60">Leadership & Mentoring</div>
              <div className="text-xl font-bold">Cross-team</div>
            </div>
          </div>

          <div className="mt-6 border-t border-border pt-6">
            <h3 className="text-lg font-semibold">WORK EXPERIENCE</h3>
            <div className="mt-4 space-y-4 text-sm text-text/80">
              <div className="rounded-2xl border border-border bg-bg/30 p-4">
                <div className="text-xs font-semibold text-text/60">Aug 2024 – Nov 2024</div>
                <div className="text-sm font-semibold text-text">Supplementary Instructor – Data Structures and Algorithms</div>
                <div className="text-sm text-text/70">North-West University, Mafikeng Campus</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-text/80">
                  <li>Conducted academic support sessions and guided students through complex algorithms.</li>
                  <li>Guided students in debugging and optimizing code for assignments and projects.</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-border bg-bg/30 p-4">
                <div className="text-xs font-semibold text-text/60">Feb 2025 – June 2025</div>
                <div className="text-sm font-semibold text-text">Student Assistant – Differential Equations (Applied Mathematics)</div>
                <div className="text-sm text-text/70">North-West University, Mafikeng Campus</div>
                <ul className="mt-2 list-disc pl-5 text-sm text-text/80">
                  <li>Assisted students in understanding differential equations through tutorial sessions.</li>
                  <li>Assisted students with solving problems using analytical and numerical methods.</li>
                  <li>Developed supplementary study materials to support exam preparation.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  )
}
