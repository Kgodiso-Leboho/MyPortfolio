import { Container } from './Container'
import { profile } from '../../data/portfolio'
import { GitHubIcon, LinkedInIcon } from '../ui/InlineIcons'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#1c1b1a] bg-[#0c0c0e]">
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">

        {/* Left: branding + copyright */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[13px] text-[#6b6968]">
            <span className="text-[#c8a87a]">//</span> portfolio.dev
          </span>
          <span className="h-3 w-px bg-[#2a2928]" aria-hidden="true" />
          <p className="font-mono text-[11px] text-[#3a3836]">
            © {year} {profile.name}. All rights reserved.
          </p>
        </div>

        {/* Right: social links */}
        <div className="flex items-center gap-2">
          <a
            aria-label="GitHub"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#6b6968] no-underline hover:text-[#e8e6e0] transition-colors px-3 py-1.5 rounded border border-[#1c1b1a] hover:border-[#2a2928] bg-[#0e0e10]"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </a>
          <a
            aria-label="LinkedIn"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[#6b6968] no-underline hover:text-[#e8e6e0] transition-colors px-3 py-1.5 rounded border border-[#1c1b1a] hover:border-[#2a2928] bg-[#0e0e10]"
          >
            <LinkedInIcon />
            <span>LinkedIn</span>
          </a>
        </div>

      </Container>
    </footer>
  )
}