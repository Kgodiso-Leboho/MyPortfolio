import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { profile } from '../data/portfolio'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { ButtonLink } from '../components/ui/ButtonLink'
import { Badge } from '../components/ui/Badge'
import { EmailIcon, GitHubIcon, LinkedInIcon } from '../components/ui/InlineIcons'
import { cn } from '../utils/cn'

function ContactMethod({
  label,
  value,
  href,
  icon,
}: {
  label: string
  value: string
  href: string
  icon: ReactNode
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="group rounded-2xl border border-border bg-bg/40 p-5 shadow-soft transition-colors hover:bg-accent-bg/10"
    >
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-text/60">
        {icon}
        {label}
      </div>
      <div className="mt-3 text-sm font-semibold tracking-tight group-hover:text-accent transition-colors">
        {value}
      </div>
    </a>
  )
}

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)

  const mailto = useMemo(() => {
    const subject = `Portfolio inquiry from ${name || 'a visitor'}`
    const body = [
      `Hi ${profile.name},`,
      '',
      message || '(No message provided)',
      '',
      `— ${name || 'Anonymous'}`,
      email ? `Reply to: ${email}` : 'Reply to: (not provided)',
    ].join('\n')

    return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [email, message, name])

  function validate(): string | null {
    if (name.trim().length < 2) return 'Please enter your name.'
    if (email.trim().length < 5 || !email.includes('@')) return 'Please enter a valid email address.'
    if (message.trim().length < 10) return 'Please include a short message (at least 10 characters).'
    return null
  }

  return (
    <div className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Let’s connect"
          title="Contact"
          description="Send a message and I’ll get back to you. For faster replies, include context about the project and timeline."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <ContactMethod
              label="Email"
              value={profile.email}
              href={`mailto:${profile.email}`}
              icon={<EmailIcon />}
            />
            <ContactMethod label="GitHub" value="github.com/…" href={profile.githubUrl} icon={<GitHubIcon />} />
            <ContactMethod
              label="LinkedIn"
              value="linkedin.com/in/…"
              href={profile.linkedinUrl}
              icon={<LinkedInIcon />}
            />
          </div>

          <div className="lg:col-span-2 rounded-2xl border border-border bg-bg/40 p-6 shadow-soft sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold tracking-tight">Message form</h3>
                <p className="mt-2 text-sm leading-6 text-text/70">
                  This form opens your email client with a pre-filled message.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge>Fast reply</Badge>
                <Badge variant="accent">UX + data focus</Badge>
              </div>
            </div>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
                const nextError = validate()
                setError(nextError)
                if (nextError) return
                window.location.href = mailto
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-xs font-semibold tracking-wider text-text/60">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-bg/30 px-3 py-3 text-sm text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-xs font-semibold tracking-wider text-text/60">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-bg/30 px-3 py-3 text-sm text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="you@domain.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="text-xs font-semibold tracking-wider text-text/60">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 min-h-[140px] w-full resize-y rounded-xl border border-border bg-bg/30 px-3 py-3 text-sm text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="What are you building? What does success look like?"
                />
              </div>

              {error ? (
                <div className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className={cn('text-xs text-text/60', !message.trim() ? '' : '')}>
                  By sending, you’re creating an email to {profile.email}.
                </p>
                <ButtonLink variant="primary" size="lg" href={mailto}>
                  Open email
                </ButtonLink>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}

