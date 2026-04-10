import { cn } from '../../utils/cn'

export function SpriteIcon({
  symbolId,
  className,
}: {
  symbolId: string
  className?: string
}) {
  return (
    <svg
      className={cn('inline-block h-4 w-4', className)}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`/icons.svg#${symbolId}`} />
    </svg>
  )
}

