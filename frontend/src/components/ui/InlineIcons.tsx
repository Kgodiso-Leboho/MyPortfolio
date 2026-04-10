import { cn } from '../../utils/cn'

export function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-4 w-4', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16v16H4z" opacity="0" />
      <path d="M4 6h16" />
      <path d="M4 6l8 7 8-7" />
      <path d="M4 6v12h16V6" />
    </svg>
  )
}

export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-4 w-4', className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.75 5.61.75 12.01c0 5.21 3.33 9.63 7.95 11.2.58.11.79-.26.79-.57v-2.02c-3.24.72-3.92-1.57-3.92-1.57-.53-1.37-1.29-1.73-1.29-1.73-1.06-.73.08-.72.08-.72 1.17.09 1.78 1.23 1.78 1.23 1.04 1.83 2.73 1.31 3.4 1 .1-.77.41-1.31.74-1.61-2.59-.3-5.32-1.34-5.32-5.96 0-1.32.46-2.4 1.21-3.25-.12-.31-.53-1.58.11-3.29 0 0 1-.33 3.28 1.23.95-.27 1.97-.41 2.98-.41 1.01 0 2.03.14 2.98.41 2.28-1.56 3.28-1.23 3.28-1.23.64 1.71.23 2.98.11 3.29.75.85 1.21 1.93 1.21 3.25 0 4.63-2.74 5.65-5.35 5.94.42.38.79 1.12.79 2.27v3.37c0 .31.21.68.8.57 4.61-1.57 7.94-5.99 7.94-11.2C23.25 5.61 18.27.5 12 .5Z" />
    </svg>
  )
}

export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-4 w-4', className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0.5 8.5h4V23h-4V8.5zM8 8.5h3.83v1.94h.05c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.1V23h-4v-6.31c0-1.5-.03-3.43-2.09-3.43-2.09 0-2.41 1.63-2.41 3.32V23H8V8.5z" />
    </svg>
  )
}

export function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('h-5 w-5', className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

