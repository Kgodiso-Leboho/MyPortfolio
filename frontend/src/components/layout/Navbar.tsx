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
      className="h-5 w-5"
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
          'rounded-lg px-3 py-2 text-sm transition-colors',
          isActive
            ? 'bg-accent-bg/60 text-text'
            : 'text-text/80 hover:bg-accent-bg/30 hover:text-text',
        ),
    [],
  )

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <NavLink to="/" className="group inline-flex items-center gap-2" aria-label={`${profile.name} home`}>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent-bg/60 text-accent ring-1 ring-accent-border/60 transition-transform group-hover:scale-[1.02]">
            <span className="text-sm font-semibold">{profile.name.charAt(0).toUpperCase()}</span>
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-base">{profile.name}</span>
        </NavLink>

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

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <a
              aria-label="GitHub"
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border bg-bg/50 p-2 text-text/80 hover:bg-accent-bg/20 hover:text-text"
            >
              <GitHubIcon />
            </a>
            <a
              aria-label="LinkedIn"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border bg-bg/50 p-2 text-text/80 hover:bg-accent-bg/20 hover:text-text"
            >
              <LinkedInIcon />
            </a>
          </div>
          <ThemeToggle />

          <button
            type="button"
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg/40 text-text transition-colors hover:bg-accent-bg/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          'md:hidden overflow-hidden border-t border-border bg-bg/95 transition-all',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <Container className="py-3">
          <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
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
          </nav>
        </Container>
      </div>
    </header>
  )
}

