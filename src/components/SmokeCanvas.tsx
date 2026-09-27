import { useEffect, useRef } from 'react'

/**
 * Layer 1 of the hero — a lightweight canvas that renders slow-drifting smoke
 * wisps in warm neutral tones behind everything else.
 */
export default function SmokeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    // pointer state in canvas coords — drives swirl + brightening
    const pointer = { x: -9999, y: -9999, active: false }
    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active =
        pointer.y >= 0 && pointer.y <= rect.height &&
        pointer.x >= 0 && pointer.x <= rect.width
    }
    const onPointerOut = () => {
      pointer.active = false
    }
    window.addEventListener('pointermove', onPointer, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerOut)

    interface Wisp {
      x: number
      y: number
      r: number
      vx: number
      vy: number
      drift: number
      phase: number
      alpha: number
      heat: number // 0..1 — rises when the cursor disturbs the wisp
    }
    const wisps: Wisp[] = []
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    // Spawn a field of soft blobs: some cool slate, some warm sand
    const spawn = () => {
      wisps.length = 0
      const count = Math.round(w / 130) + 8
      for (let i = 0; i < count; i++) {
        wisps.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 90 + Math.random() * 220,
          vx: (Math.random() - 0.5) * 0.12,
          vy: -0.05 - Math.random() * 0.12,
          drift: (Math.random() - 0.5) * 0.25,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.05 + Math.random() * 0.09,
          heat: 0,
        })
      }
    }
    spawn()

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const REACH = 280 // px — how far the cursor disturbs the fog

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of wisps) {
        const x = p.x + Math.sin(t / 4000 + p.phase) * 30 * p.drift * 4
        const y = p.y

        // cursor interaction: nearby wisps swirl away and glow warmer
        if (pointer.active && !reduced) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const d = Math.hypot(dx, dy)
          if (d < REACH + p.r * 0.4) {
            const force = Math.max(0, 1 - d / REACH)
            p.heat = Math.min(1, p.heat + force * 0.08)
            if (d > 1) {
              p.x += (dx / d) * force * 2.2
              p.y += (dy / d) * force * 1.4
            }
          }
        }
        p.heat *= 0.965

        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r)
        const warm = p.phase > Math.PI
        const base = warm ? '227, 220, 208' : '154, 162, 173'
        const cr = Math.round(+base.split(',')[0] + (200 - +base.split(',')[0]) * p.heat)
        const cg = Math.round(+base.split(',')[1] + (169 - +base.split(',')[1]) * p.heat)
        const cb = Math.round(+base.split(',')[2] + (126 - +base.split(',')[2]) * p.heat)
        g.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, ${p.alpha + p.heat * 0.14})`)
        g.addColorStop(1, 'rgba(242, 239, 232, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduced) {
        for (const p of wisps) {
          p.y += p.vy
          p.x += p.vx
          if (p.y + p.r < 0) {
            p.y = h + p.r
            p.x = Math.random() * w
          }
          if (p.x + p.r < 0) p.x = w + p.r
          if (p.x - p.r > w) p.x = -p.r
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    const onResize = () => {
      resize()
      spawn()
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointer)
      document.documentElement.removeEventListener('pointerleave', onPointerOut)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 size-full opacity-80"
    />
  )
}
