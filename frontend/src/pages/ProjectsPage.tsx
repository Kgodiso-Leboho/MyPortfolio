import { useMemo, useState } from 'react'
import { projects } from '../data/portfolio'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ProjectCard } from '../components/projects/ProjectCard'
import { Badge } from '../components/ui/Badge'
import { cn } from '../utils/cn'

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-4 w-4', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function ProjectsPage() {
  const [query, setQuery] = useState('')
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const techTags = useMemo(() => {
    const tags = new Set<string>()
    for (const p of projects) for (const t of p.tech) tags.add(t)
    return Array.from(tags).sort((a, b) => a.localeCompare(b))
  }, [])

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      const matchesQuery =
        q.length === 0 ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))

      const matchesTech = !selectedTech || p.tech.includes(selectedTech)
      return matchesQuery && matchesTech
    })
  }, [query, selectedTech])

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Selected work"
          title="Projects built for real users"
          description="Search by keyword, filter by technology, and explore how each project balances product requirements with engineering quality."
        />

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <label htmlFor="project-search" className="text-xs font-semibold tracking-wider text-text/60">
              Search
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border border-border bg-bg/40 px-4 py-3 shadow-soft">
              <span className="text-text/60" aria-hidden="true">
                <SearchIcon />
              </span>
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a keyword (e.g. streaming, evaluation, React...)"
                className="w-full bg-transparent text-sm text-text placeholder:text-text/40 focus:outline-none"
              />
            </div>
          </div>

          <div className="lg:w-[360px]">
            <div className="text-xs font-semibold tracking-wider text-text/60">Active filter</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedTech ? (
                <>
                  <Badge variant="accent">{selectedTech}</Badge>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center rounded-lg border border-border bg-bg/30 px-3 text-sm font-semibold text-text/80 transition-colors hover:bg-accent-bg/20 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    onClick={() => setSelectedTech(null)}
                  >
                    Clear
                  </button>
                </>
              ) : (
                <Badge>{techTags.length} tech tags</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            className={cn(
              'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
              selectedTech === null
                ? 'border-accent-border/60 bg-accent-bg/50 text-text'
                : 'border-border bg-bg/30 text-text/70 hover:bg-accent-bg/20 hover:text-text',
            )}
            onClick={() => setSelectedTech(null)}
          >
            All
          </button>
          {techTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTech(tag)}
              className={cn(
                'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
                selectedTech === tag
                  ? 'border-accent-border/60 bg-accent-bg/50 text-text'
                  : 'border-border bg-bg/30 text-text/70 hover:bg-accent-bg/20 hover:text-text',
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {filteredProjects.length ? (
            filteredProjects.map((p) => <ProjectCard key={p.id} project={p} />)
          ) : (
            <div className="sm:col-span-2 rounded-2xl border border-border bg-bg/40 p-8 shadow-soft">
              <div className="text-sm font-semibold text-accent">No matches</div>
              <p className="mt-2 text-sm leading-6 text-text/70">
                Try a different keyword or clear the active technology filter.
              </p>
              <div className="mt-5">
                <button
                  type="button"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-accent-border/60 bg-accent-bg/25 px-5 text-sm font-semibold text-text shadow-soft transition-colors hover:bg-accent-bg/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  onClick={() => {
                    setQuery('')
                    setSelectedTech(null)
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

