import React from 'react'
import { cn } from '../../utils/cn'

type BadgeVariant = 'default' | 'accent'

export function Badge({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        variant === 'default'
          ? 'border-accent-border/40 bg-accent-bg/40 text-text'
          : 'border-accent-border/70 bg-accent-bg/35 text-text',
        className,
      )}
    >
      {children}
    </span>
  )
}

