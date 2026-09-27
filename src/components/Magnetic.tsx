import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticProps {
  children: ReactNode
  /** how far the element may travel toward the pointer, in px */
  strength?: number
  className?: string
}

/**
 * Magnetic — pulls its child toward the cursor while hovered, springs back
 * on leave. Used for header CTA and hero scroll cue.
 */
export default function Magnetic({ children, strength = 24, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.5 })

  return (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      className={className}
      onPointerMove={(e) => {
        if (!window.matchMedia('(pointer: fine)').matches || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        x.set((dx / (r.width / 2)) * strength)
        y.set((dy / (r.height / 2)) * strength * 0.7)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
