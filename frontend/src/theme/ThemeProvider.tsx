import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type ThemeMode = 'light' | 'dark'
export type ThemeVariant = 'default' | 'ocean' | 'emerald'

type ThemeContextValue = {
  mode: ThemeMode
  variant: ThemeVariant
  setMode: (mode: ThemeMode) => void
  setVariant: (variant: ThemeVariant) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): ThemeMode {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readThemeFromStorage(): { mode: ThemeMode; variant: ThemeVariant } {
  if (typeof window === 'undefined') {
    return { mode: 'light', variant: 'default' }
  }

  const mode = window.localStorage.getItem('themeMode')
  const variant = window.localStorage.getItem('themeVariant')

  return {
    mode: mode === 'light' || mode === 'dark' ? mode : getSystemTheme(),
    variant: variant === 'default' || variant === 'ocean' || variant === 'emerald' ? variant : 'default',
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const initial = readThemeFromStorage()
  const [mode, setModeState] = useState<ThemeMode>(initial.mode)
  const [variant, setVariantState] = useState<ThemeVariant>(initial.variant)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark')
    document.documentElement.setAttribute('data-theme', variant)
    window.localStorage.setItem('themeMode', mode)
    window.localStorage.setItem('themeVariant', variant)
  }, [mode, variant])

  const setMode = useCallback((next: ThemeMode) => setModeState(next), [])
  const setVariant = useCallback((next: ThemeVariant) => setVariantState(next), [])
  const toggleMode = useCallback(() => setModeState((t) => (t === 'dark' ? 'light' : 'dark')), [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      variant,
      setMode,
      setVariant,
      toggleMode,
    }),
    [mode, variant, setMode, setVariant, toggleMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}

