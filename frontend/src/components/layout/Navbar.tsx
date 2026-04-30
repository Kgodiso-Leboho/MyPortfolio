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
            ? 'text-[var(--accent)] bg-[var(--accent-bg)]'
            : 'text-[var(--text)]/60 hover:text-[var(--text)] hover:bg-[var(--code-bg)]',
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
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-4">

        {/* Logo */}
        <NavLink
          to="/"
          className="group inline-flex items-center gap-2.5 no-underline"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--code-bg)] border border-[var(--border)] text-[var(--accent)] font-extrabold text-xs transition-colors">
            {initials}
          </span>

          
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
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

        {/* Right side */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--code-bg)] text-[var(--text)]/60 hover:text-[var(--text)] transition-colors"
            >
              <GitHubIcon />
            </a>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--code-bg)] text-[var(--text)]/60 hover:text-[var(--text)] transition-colors"
            >
              <LinkedInIcon />
            </a>
          </div>

          <ThemeToggle />

          {/* Mobile button */}
          <button
            type="button"
            className="inline-flex md:hidden h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--code-bg)] text-[var(--text)]/60 hover:text-[var(--text)] transition-colors"
            onClick={() => setOpen((v) => !v)}
          >
            <HamburgerIcon open={open} />
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden border-t border-[var(--border)] bg-[var(--bg)] transition-all duration-200',
          open ? 'max-h-96' : 'max-h-0',
        )}
      >
        <Container className="py-3">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isAnchor = item.to.startsWith('#')
              return isAnchor ? (
                <a
                  key={item.to}
                  href={item.to}
                  className={navClassName({ isActive: false })}
                >
                  {item.label}
                </a>
              ) : (
                <NavLink key={item.to} to={item.to} className={navClassName}>
                  {item.label}
                </NavLink>
              )
            })}

            <div className="mt-3 pt-3 border-t border-[var(--border)] flex gap-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--code-bg)] text-[var(--text)]/60 hover:text-[var(--text)]"
              >
                <GitHubIcon />
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--code-bg)] text-[var(--text)]/60 hover:text-[var(--text)]"
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