import { cn } from '../../utils/cn'

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <header className={cn(className, align === 'center' ? 'text-center' : 'text-left')}>
      {eyebrow ? <p className="text-xs font-semibold tracking-wider text-text/70">{eyebrow}</p> : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-sm leading-6 text-text/70 sm:text-base">{description}</p> : null}
    </header>
  )
}

