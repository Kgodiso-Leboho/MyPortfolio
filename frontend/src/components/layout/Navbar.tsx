import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { GitHubIcon, LinkedInIcon } from '../ui/InlineIcons'
import { ThemeToggle } from '../theme/ThemeToggle'
import { Container } from './Container'
import { navItems, profile } from '../../data/portfolio'
import { cn } from '../../utils/cn'

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4"
    >
      {open ? (
        <>
          <path d="M18 6L6 18" />
          <path d="M6 6l12 12" />
        </>
      ) : (
        <>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
        </>
      )}
    </svg>
  )
}

export function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const navClassName = useMemo(
    () =>
      ({ isActive }: { isActive: boolean }) =>
        cn(
          'font-mono text-[11px] uppercase tracking-widest px-3 py-1.5 rounded transition-colors no-underline',
          isActive
            ? 'text-[#c8a87a] bg-[#1e1a14]'
            : 'text-[#6b6968] hover:text-[#e8e6e0] hover:bg-[#151413]',
        ),
    [],
  )

  const initials = profile.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c1b1a] bg-[#0c0c0e]/90 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="group inline-flex items-center gap-2.5 no-underline"
          aria-label={`${profile.name} home`}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e1c1a] border border-[#2a2928] text-[#c8a87a] font-extrabold text-xs transition-colors group-hover:border-[#3f3d3a]">
            {initials}
          </span>
          <span className="font-mono text-[13px] text-[#6b6968] group-hover:text-[#e8e6e0] transition-colors hidden sm:block">
            <span className="text-[#c8a87a]">//</span> {profile.name.toLowerCase().replace(' ', '.')}
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const isAnchor = item.to.startsWith('#')
            return isAnchor ? (
              <a key={item.to} href={item.to} className={navClassName({ isActive: false })}>
                {item.label}
              </a>
            ) : (
              <NavLink key={item.to} to={item.to} className={navClassName}>
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5">
            <a
              aria-label="GitHub"
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#1c1b1a] bg-[#0e0e10] text-[#6b6968] hover:border-[#2a2928] hover:text-[#e8e6e0] transition-colors"
            >
              <GitHubIcon />
            </a>
            <a
              aria-label="LinkedIn"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#1c1b1a] bg-[#0e0e10] text-[#6b6968] hover:border-[#2a2928] hover:text-[#e8e6e0] transition-colors"
            >
              <LinkedInIcon />
            </a>
          </div>

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            type="button"
            className="inline-flex md:hidden h-8 w-8 items-center justify-center rounded-lg border border-[#1c1b1a] bg-[#0e0e10] text-[#6b6968] hover:border-[#2a2928] hover:text-[#e8e6e0] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a87a]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden overflow-hidden border-t border-[#1c1b1a] bg-[#0c0c0e]/98 transition-all duration-200',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <Container className="py-3">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isAnchor = item.to.startsWith('#')
              return isAnchor ? (
                <a
                  key={item.to}
                  href={item.to}
                  className={navClassName({ isActive: false })}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={navClassName}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              )
            })}

            {/* Social links in mobile menu */}
            <div className="mt-3 pt-3 border-t border-[#1c1b1a] flex gap-2">
              <a
                aria-label="GitHub"
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#1c1b1a] bg-[#0e0e10] text-[#6b6968] hover:text-[#e8e6e0] transition-colors"
              >
                <GitHubIcon />
              </a>
              <a
                aria-label="LinkedIn"
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#1c1b1a] bg-[#0e0e10] text-[#6b6968] hover:text-[#e8e6e0] transition-colors"
              >
                <LinkedInIcon />
              </a>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  )
}