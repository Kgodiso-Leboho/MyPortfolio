import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../theme/ThemeProvider'
import { cn } from '../../utils/cn'

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.93 4.93l1.41 1.41" />
      <path d="M17.66 17.66l1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M6.34 17.66l-1.41 1.41" />
      <path d="M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  )
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="13" cy="13" r="8" />
      <path d="M5 9a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
      <path d="M15 5a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
      <path d="M15 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
      <path d="M5 19a2 2 0 1 0 4 0 2 2 0 0 0-4 0" />
    </svg>
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const { mode, variant, toggleMode, setVariant } = useTheme()
  const [showMenu, setShowMenu] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const themes = [
    { id: 'default', name: 'Default', color: 'from-purple-500 to-pink-500' },
    { id: 'ocean', name: 'Ocean', color: 'from-cyan-500 to-blue-500' },
    { id: 'emerald', name: 'Emerald', color: 'from-emerald-500 to-teal-500' },
  ] as const

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

  return (
    <div ref={containerRef} className={cn('relative flex items-center gap-2', className)}>
      <button
        type="button"
        onClick={toggleMode}
        aria-label="Toggle dark mode"
        className={cn(
          'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg/40 text-text transition-colors hover:bg-accent-bg/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
        )}
      >
        {mode === 'dark' ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Toggle theme selector"
          aria-expanded={showMenu}
          aria-haspopup="menu"
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-bg/40 text-text transition-colors hover:bg-accent-bg/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          )}
        >
          <PaletteIcon className="h-5 w-5" />
        </button>

        {showMenu && (
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 w-40 rounded-lg border border-border bg-bg shadow-soft z-50"
          >
            {themes.map((theme) => (
              <button
                key={theme.id}
                role="menuitem"
                onClick={() => {
                  setVariant(theme.id as any)
                  setShowMenu(false)
                }}
                className={cn(
                  'w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-3 hover:bg-accent-bg/20',
                  variant === theme.id && 'bg-accent-bg/30 text-accent font-medium',
                  'first:rounded-t-[7px] last:rounded-b-[7px] border-b border-border last:border-b-0',
                )}
              >
                <div className={cn('h-3 w-3 rounded-full bg-gradient-to-br', theme.color)} />
                {theme.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

