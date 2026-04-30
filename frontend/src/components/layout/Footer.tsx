import { Container } from './Container'
import { profile } from '../../data/portfolio'
import { GitHubIcon, LinkedInIcon } from '../ui/InlineIcons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)]">
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">
          

          <span className="h-3 w-px bg-[var(--border)]" />

          <p className="font-mono text-[11px] text-[var(--text)]/40">
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[var(--text)]/60 hover:text-[var(--text)] transition-colors px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--code-bg)]"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>

          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[var(--text)]/60 hover:text-[var(--text)] transition-colors px-3 py-1.5 rounded border border-[var(--border)] bg-[var(--code-bg)]"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
        </div>

      </Container>
    </footer>
  )
}