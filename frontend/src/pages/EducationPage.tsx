import { useState } from 'react'
import { Container } from '../components/layout/Container'
import { SectionHeading } from '../components/ui/SectionHeading'
import { education, type EducationItem } from '../data/portfolio'




function EducationItemCard({ item }: { item: EducationItem }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-3 top-0 h-full w-px bg-[var(--border)]" />

      {/* Dot */}
      <div className="absolute left-2 top-6 h-3 w-3 rounded-full bg-[var(--accent)]" />

      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left ml-10 rounded-2xl border border-[var(--border)] bg-[var(--bg)]/40 p-5 shadow-sm hover:bg-[var(--accent-bg)]/20 transition-all"
      >
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between gap-4">
            <h3 className="text-base font-bold text-[var(--text-h)]">
              {item.institution}
            </h3>
            <span className="text-xs font-mono text-[var(--text)]/60">
              {item.period}
            </span>
          </div>

          <div className="text-sm text-[var(--accent)] font-semibold">
            {item.qualification}
          </div>
        </div>

        {/* Expand indicator */}
        <div className="mt-3 text-xs font-mono text-[var(--text)]/50">
          {open ? 'Click to collapse ↑' : 'Click to expand ↓'}
        </div>

        {/* Expanded content */}
        {open && (
          <div className="mt-4 border-t border-[var(--border)] pt-4 animate-fadeIn">
            <p className="text-sm leading-7 text-[var(--text)]/70">
              {item.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {item.highlights.map((h) => (
                <span
                  key={h}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--code-bg)] text-[var(--text)]/70"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}
      </button>
    </div>
  )
}

export function EducationPage() {
  return (
    <div className="py-14 sm:py-20 bg-[var(--bg)] text-[var(--text)]">
      <Container>
        <SectionHeading
          eyebrow="Education"
          title="My academic journey"
          description="Click each section to expand and view details about my learning path and focus areas."
        />

        <div className="mt-10 space-y-6">
          {education.map((item) => (
            <EducationItemCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </div>
  )
}