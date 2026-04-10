import { ButtonLink } from '../components/ui/ButtonLink'
import { Container } from '../components/layout/Container'

export function NotFoundPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-bg/40 p-8 shadow-soft">
          <div className="text-xs font-semibold tracking-wider text-accent">404</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Page not found</h1>
          <p className="mt-3 text-sm leading-6 text-text/70">
            The link you followed doesn&apos;t exist. Use the navigation to get back on track.
          </p>
          <div className="mt-6">
            <ButtonLink to="/" variant="primary" size="md">
              Back to home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  )
}

