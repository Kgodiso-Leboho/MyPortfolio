import { useEffect, useState } from 'react'
import { profile, getProjects } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import { Container } from '../components/layout/Container'

// ─── Tag colour map ───────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  TypeScript:         'border-[var(--border)] text-[var(--tech-blue)] bg-[var(--tech-blue-bg)]',
  JavaScript:         'border-[var(--border)] text-[var(--tech-blue)] bg-[var(--tech-blue-bg)]',
  CSS:                'border-[var(--border)] text-[var(--tech-blue)] bg-[var(--tech-blue-bg)]',
  NLP:                'border-[var(--border)] text-[var(--data-purple)] bg-[var(--data-purple-bg)]',
  SBERT:              'border-[var(--border)] text-[var(--data-purple)] bg-[var(--data-purple-bg)]',
  "Machine Learning": 'border-[var(--border)] text-[var(--data-purple)] bg-[var(--data-purple-bg)]',
  "Jupyter Notebook": 'border-[var(--border)] text-[var(--data-purple)] bg-[var(--data-purple-bg)]',
}
const DEFAULT_TAG = 'border-[var(--border)] text-[var(--text)]/50 bg-[var(--code-bg)]'

// ─── Ticker items ─────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { val: `${6}+`,  label: 'Projects shipped'     },
  { val: '15+',    label: 'Technologies'          },
  { val: 'UX',    label: 'Front-end approach', amber: true },
  { val: 'A11Y',   label: 'Accessibility first'   },
  { val: '0px',    label: 'Technical debt goal'   },
  { val: '∞',      label: 'Reproducible workflows'},
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    let mounted = true

    getProjects().then((data) => {
      if (mounted) setProjects(data)
    })

    return () => {
      mounted = false
    }
  }, [])

  const techHighlights = Array.from(
    new Set(
      projects
        .flatMap((p) => p.tech)
        .filter((t) => t.length <= 20)
        .slice(0, 7),
    ),
  )

  const initials = profile.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const titleWords = profile.title.split(' ')
  const half = Math.ceil(titleWords.length / 2)
  const titleMain = titleWords.slice(0, half).join(' ')
  const titleAccent = titleWords.slice(half).join(' ')

  // Double the ticker items for seamless loop
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] relative overflow-hidden"
      style={{
        backgroundImage: [
          'linear-gradient(rgba(var(--text-rgb),0.025) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(var(--text-rgb),0.025) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '48px 48px',
      }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Ticker animation keyframes */}
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 20s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative z-10">
        <Container>
          <div className="py-10 sm:py-14">

            {/* ── Hero: two-column layout ── */}
            <section className="mb-14">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                {/* Left: text content */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--code-bg)] px-3 py-1.5 font-mono text-[11px] text-[#8ab87a] tracking-wider mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8ab87a] animate-pulse flex-shrink-0" />
                    Available for impactful work
                  </div>

                  <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-[var(--text-h)]mb-5">
                    {titleMain}{' '}
                    <em className="not-italic text-[var(--accent)]">{titleAccent}</em>
                  </h1>

                  <p className="text-base leading-7 text-[var(--text)]/60max-w-[52ch] mb-8">
                    {profile.tagline}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <a
                      href="/projects"
                      className="inline-flex items-center gap-1.5 bg-[var(--accent)]text-[var(--bg)] font-bold text-sm px-5 py-2.5 rounded-md no-underline hover:opacity-90 transition-colors"
                    >
                      View projects →
                    </a>
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent('Portfolio inquiry')}`}
                      className="inline-flex items-center gap-1.5 bg-transparent text-[var(--text)]/60 font-bold text-sm px-5 py-2.5 rounded-md border border-[var(--border)] no-underline hover:border-[#3f3d3a] hover:text-[var(--text)] transition-colors"
                    >
                      Email me
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {techHighlights.map((t) => (
                      <span
                        key={t}
                        className={`font-mono text-[10px] tracking-wider px-2.5 py-1 rounded border ${TAG_COLORS[t] ?? DEFAULT_TAG}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: big profile photo */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="absolute -inset-6 rounded-3xl opacity-15 blur-3xl"
                      style={{ background: 'radial-gradient(ellipse at center, #c8a87a 0%, transparent 70%)' }}
                    />
                    <div aria-hidden="true" className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#c8a87a] rounded-tl-xl opacity-70 z-20" />
                    <div aria-hidden="true" className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#c8a87a] rounded-br-xl opacity-70 z-20" />

                    {profile.imageUrl ? (
                      <img
                        src={profile.imageUrl}
                        alt={`${profile.name} — profile photo`}
                        className="relative z-10 w-72 h-[420px] lg:w-80 lg:h-[480px] object-cover object-top rounded-2xl border border-[var(--border)]"
                        style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                      />
                    ) : (
                      <div className="relative z-10 w-72 h-[420px] lg:w-80 lg:h-[480px] rounded-2xl border border-[var(--border)] bg-[#0e0e10] flex flex-col items-center justify-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-[#1e1c1a] border border-[var(--border)] flex items-center justify-center font-extrabold text-3xl text-[var(--accent)]">
                          {initials}
                        </div>
                        <p className="font-mono text-[11px] text-[#3a3836] text-center px-6">
                          Set <span className="text-[var(--accent)]">profile.imageUrl</span> in<br />
                          <span className="text-[#5a5856]">data/portfolio.ts</span>
                        </p>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3 bg-[#0c0c0e]/85 backdrop-blur-sm border border-[var(--border)] rounded-xl px-4 py-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-[#dbd9d3] truncate">{profile.name}</div>
                        <div className="font-mono text-[10px] text-[#4a4846] truncate">{profile.location ?? '—'}</div>
                      </div>
                      <div className="flex-shrink-0 inline-flex items-center gap-1.5 font-mono text-[10px] text-[#8ab87a]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8ab87a] animate-pulse" />
                        Open to work
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* ── Scrolling stats ticker ── */}
            <div className="relative overflow-hidden border-t border-b border-[#1c1b1a] mb-12">
              {/* Fade edges */}
              <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(90deg, #0c0c0e, transparent)' }} />
              <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(270deg, #0c0c0e, transparent)' }} />

              <div className="ticker-track flex w-max">
                {tickerItems.map((item, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-4 px-10 py-4 border-r border-[#1c1b1a] whitespace-nowrap"
                  >
                    <span className={`text-2xl font-extrabold tracking-tight leading-none ${item.amber ? 'text-[var(--accent)]' : 'text-[#f0ede6]'}`}>
                      {item.val}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)]flex-shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#4a4846]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}