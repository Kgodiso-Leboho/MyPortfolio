import { Container } from './Container'
import { profile } from '../../data/portfolio'
import { GitHubIcon, LinkedInIcon } from '../ui/InlineIcons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text/70">
          © {year} {profile.name}.
        </p>
        <div className="flex items-center gap-4">
          <a
            className="inline-flex items-center gap-2 text-sm text-text/70 hover:text-accent transition-colors"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a
            className="inline-flex items-center gap-2 text-sm text-text/70 hover:text-accent transition-colors"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
        </div>
      </Container>
    </footer>
  )
}

