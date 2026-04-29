import { profile, projects } from '../data/portfolio'
import { Container } from '../components/layout/Container'

// ─── Tag colour map ───────────────────────────────────────────────────────────

const TAG_COLORS: Record<string, string> = {
  TypeScript:         'border-[#1a3050] text-[#4a8bc4] bg-[#0e1a26]',
  JavaScript:         'border-[#1a3050] text-[#4a8bc4] bg-[#0e1a26]',
  CSS:                'border-[#1a3050] text-[#4a8bc4] bg-[#0e1a26]',
  NLP:                'border-[#2a1a40] text-[#9a6ec8] bg-[#180f26]',
  SBERT:              'border-[#2a1a40] text-[#9a6ec8] bg-[#180f26]',
  'Machine Learning': 'border-[#2a1a40] text-[#9a6ec8] bg-[#180f26]',
  'Jupyter Notebook': 'border-[#2a1a40] text-[#9a6ec8] bg-[#180f26]',
}
const DEFAULT_TAG = 'border-[#222] text-[#5a5856] bg-[#111]'

// ─── Ticker items ─────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  { val: `${6}+`,  label: 'Projects shipped'     },
  { val: '15+',    label: 'Technologies'          },
  { val: 'UX—',    label: 'Front-end approach', amber: true },
  { val: 'A11Y',   label: 'Accessibility first'   },
  { val: '0px',    label: 'Technical debt goal'   },
  { val: '∞',      label: 'Reproducible workflows'},
]

// ─── Bento icon SVGs ──────────────────────────────────────────────────────────

function IconMonitor() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#c8a87a] fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  )
}
function IconLayers() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#c8a87a] fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  )
}
function IconBox() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#c8a87a] fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
    </svg>
  )
}
function IconSun() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#c8a87a] fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
    </svg>
  )
}
function IconActivity() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#c8a87a] fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )
}

function BentoIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-9 h-9 rounded-lg border border-[#2a2928] bg-[#141414] flex items-center justify-center flex-shrink-0">
      {children}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomePage() {
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
      className="min-h-screen bg-[#0c0c0e] text-[#e8e6e0] relative overflow-hidden"
      style={{
        backgroundImage: [
          'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)',
          'linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
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
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#2a2928] bg-[#141414] px-3 py-1.5 font-mono text-[11px] text-[#8ab87a] tracking-wider mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8ab87a] animate-pulse flex-shrink-0" />
                    Available for impactful work
                  </div>

                  <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] text-[#f0ede6] mb-5">
                    {titleMain}{' '}
                    <em className="not-italic text-[#c8a87a]">{titleAccent}</em>
                  </h1>

                  <p className="text-base leading-7 text-[#7a7875] max-w-[52ch] mb-8">
                    {profile.tagline}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    <a
                      href="/projects"
                      className="inline-flex items-center gap-1.5 bg-[#c8a87a] text-[#0c0c0e] font-bold text-sm px-5 py-2.5 rounded-md no-underline hover:bg-[#d9bc93] transition-colors"
                    >
                      View projects →
                    </a>
                    <a
                      href={`mailto:${profile.email}?subject=${encodeURIComponent('Portfolio inquiry')}`}
                      className="inline-flex items-center gap-1.5 bg-transparent text-[#a09d98] font-bold text-sm px-5 py-2.5 rounded-md border border-[#2a2928] no-underline hover:border-[#3f3d3a] hover:text-[#e8e6e0] transition-colors"
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
                        className="relative z-10 w-72 h-[420px] lg:w-80 lg:h-[480px] object-cover object-top rounded-2xl border border-[#2a2928]"
                        style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                      />
                    ) : (
                      <div className="relative z-10 w-72 h-[420px] lg:w-80 lg:h-[480px] rounded-2xl border border-[#2a2928] bg-[#0e0e10] flex flex-col items-center justify-center gap-4">
                        <div className="w-24 h-24 rounded-full bg-[#1e1c1a] border border-[#2a2928] flex items-center justify-center font-extrabold text-3xl text-[#c8a87a]">
                          {initials}
                        </div>
                        <p className="font-mono text-[11px] text-[#3a3836] text-center px-6">
                          Set <span className="text-[#c8a87a]">profile.imageUrl</span> in<br />
                          <span className="text-[#5a5856]">data/portfolio.ts</span>
                        </p>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center gap-3 bg-[#0c0c0e]/85 backdrop-blur-sm border border-[#2a2928] rounded-xl px-4 py-3">
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
                    <span className={`text-2xl font-extrabold tracking-tight leading-none ${item.amber ? 'text-[#c8a87a]' : 'text-[#f0ede6]'}`}>
                      {item.val}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#c8a87a] flex-shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#4a4846]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Section label ── */}
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#4a4846] mb-5">
              What I bring to the table
            </div>

            {/* ── Bento grid ── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-[#1c1b1a] border border-[#1c1b1a] rounded-xl overflow-hidden">

              {/* Wide card: UI */}
              <div className="sm:col-span-2 bg-[#0e0e10] hover:bg-[#111] transition-colors p-7 flex flex-col gap-3 cursor-default">
                <BentoIcon><IconMonitor /></BentoIcon>
                <div className="text-sm font-bold text-[#dbd9d3] tracking-tight">Modern UI with real UX</div>
                <p className="font-mono text-[11px] leading-relaxed text-[#4a4846]">
                  Responsive layouts, accessible interactions, and subtle motion where it improves comprehension — not just aesthetics.
                </p>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[#1e3a28] text-[#4a8a5a] bg-[#0a1810] w-fit">
                  <span className="w-1 h-1 rounded-full bg-[#4a8a5a]" />
                  React · TypeScript · Tailwind
                </div>
              </div>

              {/* Engineering */}
              <div className="bg-[#0e0e10] hover:bg-[#111] transition-colors p-7 flex flex-col gap-3 cursor-default">
                <BentoIcon><IconLayers /></BentoIcon>
                <div className="text-sm font-bold text-[#dbd9d3] tracking-tight">Engineering clarity</div>
                <p className="font-mono text-[11px] leading-relaxed text-[#4a4846]">
                  Typed components, modular code, and sensible abstractions that keep maintenance cheap.
                </p>
              </div>

              {/* Data pipelines */}
              <div className="bg-[#0e0e10] hover:bg-[#111] transition-colors p-7 flex flex-col gap-3 cursor-default">
                <BentoIcon><IconBox /></BentoIcon>
                <div className="text-sm font-bold text-[#dbd9d3] tracking-tight">Pipelines you can trust</div>
                <p className="font-mono text-[11px] leading-relaxed text-[#4a4846]">
                  Schema validation, evaluation workflows, and observability designed for iteration.
                </p>
              </div>

              {/* Technologies stat */}
              <div className="bg-[#0e0e10] hover:bg-[#111] transition-colors p-7 flex flex-col gap-3 cursor-default">
                <BentoIcon><IconSun /></BentoIcon>
                <div className="text-4xl font-extrabold tracking-tight text-[#f0ede6] leading-none">
                  15<span className="text-[#c8a87a]">+</span>
                </div>
                <p className="font-mono text-[11px] leading-relaxed text-[#4a4846]">
                  Core technologies across web, data, and ML stacks
                </p>
              </div>

              {/* Open to work */}
              <div className="bg-[#0e0e10] hover:bg-[#111] transition-colors p-7 flex flex-col gap-3 cursor-default">
                <BentoIcon><IconActivity /></BentoIcon>
                <div className="text-lg font-extrabold tracking-tight text-[#f0ede6] leading-none">
                  Always-on
                </div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] px-2.5 py-1 rounded border border-[#1e3a28] text-[#4a8a5a] bg-[#0a1810] w-fit">
                  <span className="w-1 h-1 rounded-full bg-[#4a8a5a] animate-pulse" />
                  Open to work
                </div>
              </div>

            </div>

          </div>
        </Container>
      </div>
    </div>
  )
}