import { profile, projects } from '../data/portfolio'
import { ButtonLink } from '../components/ui/ButtonLink'
import { Badge } from '../components/ui/Badge'
import { Container } from '../components/layout/Container'
import { ProfileImage } from '../components/ui/ProfileImage'

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-bg/40 p-4 shadow-soft">
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs font-semibold text-text/60">{label}</div>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-border bg-bg/40 p-6 shadow-soft transition-colors hover:bg-accent-bg/10">
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-text/70">{description}</p>
    </div>
  )
}

export function HomePage() {
  const techHighlights = Array.from(
    new Set(
      projects
        .flatMap((p) => p.tech)
        .filter((t) => t.length <= 20)
        .slice(0, 10),
    ),
  )

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
<div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-border/40 bg-accent-bg/40 px-4 py-2 text-xs font-semibold text-text/90">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
              Available for impactful work
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {profile.title}
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-text/70">
              {profile.tagline}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink to="/projects" variant="primary" size="lg">
                View projects
              </ButtonLink>
              <ButtonLink
                href={`mailto:${profile.email}?subject=${encodeURIComponent('Portfolio inquiry')}`}
                variant="secondary"
                size="lg"
                className="border border-border bg-transparent text-text hover:bg-accent-bg/20"
              >
                Email me
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2">
              {techHighlights.slice(0, 7).map((t) => {
                const isWeb = ['TypeScript', 'JavaScript', 'CSS'].includes(t)
                const isData = ['NLP', 'SBERT', 'Jupyter Notebook', 'Machine Learning'].includes(t)
                const styleClass = isWeb
                  ? 'border-[var(--tech-blue)] bg-[var(--tech-blue-bg)] text-[var(--tech-blue)]'
                  : isData
                    ? 'border-[var(--data-purple)] bg-[var(--data-purple-bg)] text-[var(--data-purple)]'
                    : 'border-accent-border/40 bg-accent-bg/40 text-text'

                return (
                  <Badge key={t} className={`${styleClass}`}>
                    {t}
                  </Badge>
                )
              })}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -inset-6 -z-10 rounded-[2.25rem] bg-accent-bg/20 blur-2xl" />

            <div className="w-full max-w-md rounded-[2.25rem] border border-border bg-bg/40 p-8 shadow-soft">
              <div className="flex items-center gap-4">
                <ProfileImage
                  src={profile.imageUrl}
                  alt={`${profile.name} profile picture`}
                  nameForFallback={profile.name}
                  size="lg"
                  className="flex-shrink-0 h-32 w-32 text-4xl"
                />
                <div>
                  <div className="text-sm font-semibold text-text/60">{profile.location ?? '—'}</div>
                  <div className="text-base font-semibold tracking-tight">{profile.name}</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Stat value={`${projects.length}`} label="Projects" />
                <Stat value="15+" label="Core Technologies" />
                <Stat value="UX-first" label="Front-end approach" />
                <Stat value="Reproducible" label="Data/ML workflows" />
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-bg/30 p-4">
                <div className="text-xs font-semibold text-text/60">What you can expect</div>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  <li className="text-sm text-text/80">Fast, accessible interfaces</li>
                  <li className="text-sm text-text/80">Clean architecture</li>
                  <li className="text-sm text-text/80">Measurable performance</li>
                  <li className="text-sm text-text/80">Pragmatic testing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-14 sm:mt-18">
          <div className="grid gap-4 sm:grid-cols-3">
            <FeatureCard
              title="Modern UI with real UX"
              description="Responsive layouts, accessible interactions, and subtle motion where it improves comprehension."
            />
            <FeatureCard
              title="Data pipelines you can trust"
              description="Schema validation, evaluation workflows, and observability designed for iteration and reliability."
            />
            <FeatureCard
              title="Engineering clarity"
              description="Typed components, modular code, and sensible abstractions that keep maintenance cheap."
            />
          </div>
        </section>

      </Container>
    </div>
  )
}

