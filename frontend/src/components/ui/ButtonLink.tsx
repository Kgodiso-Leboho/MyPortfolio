import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type RouterLinkProps = BaseProps & {
  to: string
  href?: never
  target?: never
  rel?: never
}

type AnchorLinkProps = BaseProps & {
  href: string
  to?: never
  target?: string
  rel?: string
}

export type ButtonLinkProps = RouterLinkProps | AnchorLinkProps

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white border border-transparent shadow-soft hover:brightness-110 active:brightness-100',
  secondary:
    'bg-accent-bg/25 text-text border border-accent-border/70 hover:bg-accent-bg/45 active:bg-accent-bg/35',
  ghost: 'bg-transparent text-text border border-border hover:bg-accent-bg/25 active:bg-accent-bg/15',
}

export function ButtonLink(props: ButtonLinkProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
  } = props

  const common =
    'inline-flex items-center justify-center gap-2 rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg'

  const classes = cn(common, sizeClasses[size], variantClasses[variant], className)

  if ('to' in props && typeof (props as RouterLinkProps).to === 'string') {
    const to = (props as RouterLinkProps).to
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  const anchor = props as AnchorLinkProps
  const target = anchor.target ?? (anchor.href.startsWith('http') ? '_blank' : undefined)
  const rel = anchor.rel ?? (target === '_blank' ? 'noreferrer' : undefined)

  return (
    <a href={anchor.href} target={target} rel={rel} className={classes}>
      {children}
    </a>
  )
}

