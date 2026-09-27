import { marqueeItems } from '../data/site'

export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-ink py-4">
      <div className="flex w-max animate-marquee items-center">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
            {marqueeItems.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="flex items-center gap-6 px-6 text-sm font-semibold uppercase tracking-[0.3em] text-cream/90"
              >
                {item}
                <span className="text-bronze">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
