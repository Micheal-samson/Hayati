import { useEffect, useRef, useState } from 'react'

/**
 * Custom cursor — a bronze dot that tracks 1:1 plus a lagging ring on a spring.
 * Variants swap in based on [data-cursor] targets under the pointer:
 *   default | link (small ring) | view (large "VIEW" disc) | text (tall beam)
 * Hidden on touch devices and when prefers-reduced-motion is set.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100, rx: -100, ry: -100, s: 1 })
  const [variant, setVariant] = useState<'default' | 'link' | 'view' | 'text'>('default')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Skip entirely on touch devices or reduced-motion
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    let raf = 0
    let targetScale = 1

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      setVisible(true)

      const el = (e.target as Element | null)?.closest?.(
        'a, button, [data-cursor], input, textarea, select, [role="button"]',
      ) as HTMLElement | null
      if (!el) {
        setVariant('default')
        targetScale = 1
        return
      }
      const mode = el.dataset.cursor
      if (mode === 'view') {
        setVariant('view')
        targetScale = 3.2
      } else if (mode === 'text') {
        setVariant('text')
        targetScale = 0.9
      } else {
        // interactive control
        setVariant('link')
        targetScale = 1.7
      }
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const tick = () => {
      const p = pos.current
      // dot tracks 1:1, ring eases behind
      p.rx += (p.x - p.rx) * 0.16
      p.ry += (p.y - p.ry) * 0.16
      p.s += (targetScale - p.s) * 0.14
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) scale(${visible ? 1 : 0})`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${p.rx}px, ${p.ry}px, 0) translate(-50%, -50%) scale(${p.s})`
        ringRef.current.style.opacity = visible ? '1' : '0'
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
    }
  }, [visible])

  const variantLabel =
    variant === 'view' ? 'VIEW' : variant === 'text' ? '⌶' : ''

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      {/* lagging ring / VIEW disc */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 grid size-10 place-items-center rounded-full border transition-colors duration-300 ${
          variant === 'view'
            ? 'border-bronze bg-bronze/90'
            : variant === 'link'
              ? 'border-bronze bg-transparent'
              : 'border-ink/40 bg-transparent'
        }`}
        style={{ opacity: 0 }}
      >
        <span
          className={`font-display text-[7px] tracking-[0.2em] text-coal transition-opacity duration-200 ${
            variant === 'view' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {variantLabel}
        </span>
      </div>
      {/* 1:1 dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 size-1.5 rounded-full transition-colors duration-300 ${
          variant === 'view' ? 'bg-cream' : 'bg-bronze'
        }`}
        style={{ transform: 'translate3d(-100px,-100px,0)' }}
      />
    </div>
  )
}
