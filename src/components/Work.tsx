import { type ReactElement } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { workProjects, type WorkArt } from '../data/site'

/* ------------------------------------------------------------------ */
/*  Procedural "cover art" per project — no external assets needed     */
/* ------------------------------------------------------------------ */

function BrandArt() {
  return (
    <div className="card-zoom relative grid size-full place-items-center bg-paper">
      <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(35,43,54,0.14)_1px,transparent_1px)] [background-size:14px_14px]" />
      <div className="relative flex flex-col items-center">
        <svg viewBox="0 0 64 64" className="size-16 text-ink" aria-hidden>
          <ellipse cx="32" cy="32" rx="17" ry="24" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <ellipse cx="32" cy="32" rx="7" ry="24" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <line x1="15" y1="32" x2="49" y2="32" stroke="currentColor" strokeWidth="2.5" />
        </svg>
        <p className="mt-4 font-serif text-xl font-semibold tracking-[0.32em] text-ink">ELIZABETH</p>
        <p className="mt-1 text-[9px] uppercase tracking-[0.5em] text-bronze">Brand Design</p>
      </div>
    </div>
  )
}

function ReelArt() {
  return (
    <div className="card-zoom relative size-full overflow-hidden bg-coal">
      <div className="absolute inset-0 opacity-40 [background-image:repeating-linear-gradient(90deg,rgba(242,239,232,0.05)_0_2px,transparent_2px_46px)]" />
      {/* slow panning accent bands, like a reel frame */}
      <motion.div
        aria-hidden
        animate={{ x: ['-30%', '130%'] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-bronze/25 to-transparent"
      />
      <div className="absolute inset-0 grid place-items-center">
        <span className="grid size-16 place-items-center rounded-full border border-cream/40 bg-cream/10 backdrop-blur-sm">
          <svg viewBox="0 0 24 24" className="ml-1 size-6 fill-cream" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>
      <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.3em] text-fog">
        Reel — 00:42
      </span>
      <span className="absolute right-4 top-3 size-2 animate-pulse rounded-full bg-bronze" aria-hidden />
    </div>
  )
}

function AppArt() {
  return (
    <div className="card-zoom relative size-full bg-paper">
      <div className="absolute inset-0 grid place-items-center">
        <div className="flex items-end gap-3">
          {['w-24', 'w-28', 'w-24'].map((width, i) => (
            <div
              key={i}
              className={`${width} ${i === 1 ? '-mb-3 h-36' : 'h-28'} rounded-2xl border border-ink/15 bg-cream p-2 shadow-[0_18px_36px_-20px_rgba(27,35,46,0.45)] transition-transform duration-700 ease-out group-hover/card:-translate-y-1.5`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="mx-auto mb-2 h-1.5 w-8 rounded-full bg-ink/15" />
              <div className="space-y-1.5">
                <div className="h-2 rounded bg-ink/10" />
                <div className="h-2 w-3/4 rounded bg-ink/10" />
                <div className="h-2 w-1/2 rounded bg-bronze/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ART: Record<WorkArt, () => ReactElement> = {
  brand: BrandArt,
  reel: ReelArt,
  app: AppArt,
}

/* ------------------------------------------------------------------ */

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export default function Work() {
  return (
    <section id="work" className="relative bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze">
              ( 01 ) — Featured Work
            </p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-wide text-ink sm:text-6xl lg:text-7xl">
              Selected
              <span className="name-fill"> Projects</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            A slice of recent engagements — identity systems, motion pieces and
            digital products. Each one shipped, each one loved.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {workProjects.map((project, i) => {
            const Art = ART[project.art]
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.12 }}
                data-cursor="view"
                className="group/card relative flex cursor-pointer flex-col rounded-3xl border border-ink/10 bg-paper p-3 shadow-[0_20px_50px_-32px_rgba(27,35,46,0.4)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-bronze/50 hover:shadow-[0_36px_70px_-32px_rgba(27,35,46,0.5)]"
              >
                <div className="relative h-56 overflow-hidden rounded-2xl">
                  <Art />
                  {/* tag reveals on hover */}
                  <div className="absolute inset-x-3 bottom-3 flex flex-wrap gap-1.5 opacity-0 translate-y-3 transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:translate-y-0">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-cream/30 bg-coal/85 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-cream backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
                  <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.24em] text-ink-soft">
                    <span>Project {project.index}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="mt-3 flex items-center gap-2 font-serif text-2xl font-semibold text-ink">
                    {project.title}
                    <ArrowUpRight
                      size={18}
                      className="text-bronze transition-transform duration-500 ease-out group-hover/card:translate-x-1 group-hover/card:-translate-y-1"
                    />
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{project.blurb}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
