import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Magnetic from './Magnetic'
import { navLinks, site } from '../data/site'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-500 ${
        scrolled
          ? 'border-b border-ink/10 bg-cream/85 shadow-[0_10px_40px_-24px_rgba(27,35,46,0.35)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#home"
          aria-label="Elizabeth Hayati — home"
          className="group flex items-baseline gap-[3px] font-display text-2xl leading-none tracking-wide text-ink"
        >
          <span className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5">
            E
          </span>
          <span className="text-bronze transition-transform duration-500 ease-out group-hover:translate-y-0.5">
            H
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link text-[13px] font-medium uppercase tracking-[0.14em] text-ink/80 transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
          <Magnetic strength={18}>
            <a
              href={`mailto:${site.email}`}
              className="inline-block rounded-full border border-ink/20 px-5 py-2 text-[13px] font-medium uppercase tracking-[0.14em] text-ink transition-all duration-500 hover:border-bronze hover:bg-bronze hover:text-cream"
            >
              Let's talk
            </a>
          </Magnetic>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="grid size-10 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:border-bronze hover:text-bronze md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-ink/10 bg-cream/95 backdrop-blur-xl md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 font-display text-2xl uppercase text-ink transition-colors hover:bg-sand/60 hover:text-bronze"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
