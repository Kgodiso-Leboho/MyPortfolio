import type { Project } from '../../data/portfolio'
import { Badge } from '../ui/Badge'
import { ButtonLink } from '../ui/ButtonLink'
import { cn } from '../../utils/cn'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className={cn(
        'group rounded-2xl border border-border bg-bg/40 p-5 shadow-soft transition-transform',
        'hover:-translate-y-0.5 hover:bg-accent-bg/10',
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{project.title}</h3>
            {project.year ? (
              <span className="text-xs font-semibold text-text/60">{project.year}</span>
            ) : null}
          </div>
          <p className="mt-3 text-sm leading-6 text-text/70">{project.description}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.links.map((link) => (
          <ButtonLink
            key={link.href + link.label}
            href={link.href}
            variant="ghost"
            size="sm"
            className="!h-9"
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
          >
            {link.label}
          </ButtonLink>
        ))}
      </div>
    </article>
  )
}

