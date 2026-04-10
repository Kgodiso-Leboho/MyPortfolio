import { useMemo, useState } from 'react'
import { cn } from '../../utils/cn'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  const first = parts[0]?.[0] ?? ''
  const second = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''
  return (first + second).toUpperCase()
}

export function ProfileImage({
  src,
  alt,
  nameForFallback,
  className,
  size = 'md',
}: {
  src?: string
  alt: string
  nameForFallback: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const [errored, setErrored] = useState(false)
  const initials = useMemo(() => getInitials(nameForFallback), [nameForFallback])

  const dims =
    size === 'sm'
      ? 'h-10 w-10 text-sm'
      : size === 'lg'
        ? 'h-20 w-20 text-2xl'
        : 'h-14 w-14 text-xl'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-accent-bg/60 ring-1 ring-accent-border/50',
        dims,
        className,
      )}
    >
      {!src || errored ? (
        <span className="absolute inset-0 flex items-center justify-center font-semibold text-accent">
          {initials}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="eager"
          className="h-full w-full object-cover"
          onError={() => setErrored(true)}
        />
      )}
    </div>
  )
}

