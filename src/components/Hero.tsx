import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import SmokeCanvas from './SmokeCanvas'
import Magnetic from './Magnetic'
import { heroSubLeft, heroSubRight } from '../data/site'

const GLASS_SHARDS = [
  { className: 'left-[8%] top-[16%] h-16 w-24 -rotate-12', delay: 0.2, drift: 14 },
  { className: 'right-[14%] top-[12%] h-12 w-20 rotate-6', delay: 0.45, drift: -10 },
  { className: 'left-[15%] bottom-[20%] h-14 w-14 rotate-45', delay: 0.65, drift: 12 },
  { className: 'right-[7%] bottom-[30%] h-20 w-16 -rotate-6', delay: 0.85, drift: -14 },
] as const

/**
 * The hero — three stacked layers for 3D depth:
 *   Layer 1 (z-10): smoke canvas on the cream backdrop
 *   Layer 2 (z-20): giant "ELIZABETH HAYATI" with gradient/sheen fill,
 *                   revealed on load via an expanding clip-path mask
 *   Layer 3 (z-30): the subject cutout, overlapping the type
 * Parallax scroll moves the type slower than the subject.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Foreground subject scrolls fastest, background type lags behind
  const subjectY = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const subjectScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const nameY = useTransform(scrollYProgress, [0, 1], ['0%', '5%'])
  const nameOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const smokeY = useTransform(scrollYProgress, [0, 1], ['0%', '-4%'])

  /* ————— mouse parallax: cursor position (-1..1) drives springed layers —————
     Name drifts opposite the cursor (far plane), shards and subject lean
     toward it (near plane) with a lazy, organic spring lag. */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 50, damping: 20, mass: 0.9 }

  const nameX = useSpring(useTransform(mx, (v) => v * -7), spring)
  const nameYm = useSpring(useTransform(my, (v) => v * -4), spring)
  const shardX = useSpring(useTransform(mx, (v) => v * 16), spring)
  const shardY = useSpring(useTransform(my, (v) => v * 10), spring)
  const subjectX = useSpring(useTransform(mx, (v) => v * 13), spring)
  const subjectRotate = useSpring(useTransform(mx, (v) => v * 0.9), spring)
  const haloX = useSpring(useTransform(mx, (v) => v * 9), spring)

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!window.matchMedia('(pointer: fine)').matches || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
    my.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  const handlePointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const clipReveal = {
    initial: { clipPath: 'inset(0 0 100% 0)' },
    animate: { clipPath: 'inset(0 0 0% 0)' },
  }

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-cream"
    >
      {/* ————— Layer 1 · background canvas (z-10) ————— */}
      <motion.div style={{ y: smokeY }} className="absolute inset-0 z-10">
        <SmokeCanvas />
        {/* vertical editorial hairlines */}
        <div aria-hidden className="absolute inset-0 mx-auto hidden max-w-7xl grid-cols-4 px-6 lg:grid lg:px-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="border-l border-ink/[0.06] last:border-r" />
          ))}
        </div>
      </motion.div>

      {/* ————— Layer 2 · giant name behind the subject (z-20) ————— */}
      <motion.div
        style={{ y: nameY, x: nameX, opacity: nameOpacity }}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center"
      >
        <motion.h1
          initial={clipReveal.initial}
          animate={clipReveal.animate}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="name-fill select-none text-center font-display leading-[0.82] tracking-[0.01em]"
          style={{
            fontSize: 'clamp(4.5rem, 17.5vw, 17rem)',
            y: nameYm,
          }}
          aria-label="Elizabeth Hayati"
        >
          ELIZABETH
          <br />
          HAYATI
        </motion.h1>
      </motion.div>

      {/* ————— floating glass shards between name and subject ————— */}
      <motion.div
        style={{ x: shardX, y: shardY }}
        className="pointer-events-none absolute inset-0 z-[25]"
        aria-hidden
      >
        {GLASS_SHARDS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: s.delay }}
            className={`glass-shard absolute rounded-xl ${s.className}`}
            style={{
              animation: `drift-shard ${7 + i * 1.7}s ease-in-out ${s.delay}s infinite alternate`,
              ['--shard-drift' as string]: `${s.drift}px`,
            }}
          />
        ))}
      </motion.div>

      {/* ————— Layer 3 · subject cutout over the type (z-30) ————— */}
      <div className="pointer-events-none absolute inset-0 z-30">
        {/* breathing bronze halo behind the subject — drifts between planes */}
        <motion.div
          style={{ x: haloX, y: subjectY }}
          className="absolute inset-x-0 bottom-0 mx-auto flex h-full items-end justify-center"
        >
          <motion.div
            animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.07, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-[14%] size-[48vmin] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(169,126,82,0.32) 0%, rgba(169,126,82,0.10) 42%, transparent 70%)',
              filter: 'blur(32px)',
            }}
          />
        </motion.div>

        {/* subject: scroll parallax + mouse lean on the wrapper,
            infinite CSS float on the img itself */}
        <motion.div
          style={{
            y: subjectY,
            x: subjectX,
            rotate: subjectRotate,
            scale: subjectScale,
          }}
          className="absolute inset-x-0 bottom-0 mx-auto flex h-full items-end justify-center"
        >
          <motion.picture
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex h-[86%] items-end justify-center"
          >
            <img
              src="/elizabeth-cutout.webp"
              alt="Elizabeth Hayati — portrait, denim jacket, holding her phone"
              width={1157}
              height={1600}
              fetchPriority="high"
              className="subject-float h-full w-auto object-contain object-bottom drop-shadow-[0_30px_60px_rgba(27,35,46,0.35)]"
            />
          </motion.picture>
        </motion.div>
      </div>

      {/* ————— hero chrome: subtitles, meta, scroll cue (z-40) ————— */}
      <div className="relative z-40 mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-28 pb-10 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
          className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.3em] text-ink-soft"
        >
          <span className="inline-block size-1.5 rounded-full bg-bronze" />
          Portfolio — Vol. 01
        </motion.p>

        {/* Sub-headers flanking the subject */}
        <div className="mt-6 flex flex-1 items-start justify-between gap-6">
          
          <motion.ul
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.25 }}
            className="mt-[10vh] space-y-1.5 text-[13px] font-semibold uppercase tracking-[0.22em] text-ink md:text-[15px]"
          >
            {heroSubLeft.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </motion.ul>

          <motion.ul
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
            className="mt-[10vh] space-y-1.5 text-right text-[13px] font-semibold uppercase tracking-[0.22em] text-ink md:text-[15px]"
          >
            {heroSubRight.map((line) => (
              <li key={line}>
                <span className="text-bronze">/</span>
                <span className="text-bronze">/</span> {line}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Bottom meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex items-end justify-between"
        >
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
            Brand identity, motion & digital products — designed with rhythm,
            built with care.
          </p>
          <Magnetic strength={20}>
            <a
              href="#work"
              className="group flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-ink-soft transition-colors hover:text-ink"
            >
              Scroll
              <span className="grid size-10 place-items-center rounded-full border border-ink/20 transition-colors duration-300 group-hover:border-bronze group-hover:bg-bronze group-hover:text-cream">
                <motion.span
                  animate={scrollYProgress.get() > 0 ? undefined : { y: [0, 4, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowDown size={15} />
                </motion.span>
              </span>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
