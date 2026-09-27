import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Mail } from 'lucide-react'
import { site, socials } from '../data/site'

type Status = 'idle' | 'sending' | 'sent'

const inputClasses =
  'w-full rounded-xl border border-cream/15 bg-white/[0.04] px-4 py-3 text-[15px] text-cream placeholder:text-fog/70 outline-none transition-all duration-300 focus:border-bronze focus:bg-white/[0.07] focus:ring-2 focus:ring-bronze/25'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('sending')
    // Demo handler — swap for a real endpoint (Formspree, Resend, API route…)
    setTimeout(() => setStatus('sent'), 1400)
  }

  const field = (key: 'name' | 'email' | 'message') => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value })),
  })

  return (
    <section id="contact" className="relative bg-cream px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-coal text-cream shadow-[0_60px_120px_-50px_rgba(27,35,46,0.8)]"
      >
        {/* ambient texture inside the card */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(242,239,232,0.06)_1px,transparent_1px)] [background-size:22px_22px]"
        />
        <motion.span
          aria-hidden
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-bronze/15 blur-[120px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-48 -left-32 size-[30rem] rounded-full bg-fog/10 blur-[110px]"
        />

        <div className="relative grid gap-14 p-8 sm:p-12 lg:grid-cols-[5fr_6fr] lg:p-16">
          {/* ————— Left: pitch + socials ————— */}
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze-soft">
              ( 03 ) — Contact
            </p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-[0.95] tracking-wide sm:text-6xl">
              Let's make
              <br />
              <span className="text-outline-cream">something</span>
              <br />
              that moves
            </h2>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-fog">
              Freelance, collaborations or a full identity sprint — my inbox is
              open. Expect a reply within two working days.
            </p>

            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-flex items-center gap-3 text-sm text-cream transition-colors hover:text-bronze-soft"
            >
              <span className="grid size-10 place-items-center rounded-full border border-cream/20">
                <Mail size={16} />
              </span>
              {site.email}
            </a>

            <div className="mt-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-fog">
                Social media
              </p>
              <ul className="mt-4 space-y-1">
                {socials.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-baseline gap-2 rounded-lg px-1 py-1.5 text-[15px] text-cream/85 transition-colors hover:text-bronze-soft"
                    >
                      <span className="font-serif font-semibold">{social.label}</span>
                      <span className="text-sm text-fog">{social.handle}</span>
                      <ArrowUpRight
                        size={14}
                        className="self-center text-fog transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-bronze-soft"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ————— Right: form ————— */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.24em] text-fog">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jane Appleseed"
                  {...field('name')}
                  className={inputClasses}
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.24em] text-fog">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="jane@studio.com"
                  {...field('email')}
                  className={inputClasses}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-[11px] font-medium uppercase tracking-[0.24em] text-fog">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell me about your project, timeline and budget…"
                {...field('message')}
                className={`${inputClasses} resize-none`}
              />
            </label>

            <button
              type="submit"
              disabled={status !== 'idle'}
              className="group relative mt-2 inline-flex h-13 items-center justify-center gap-2 overflow-hidden rounded-xl bg-bronze px-8 text-sm font-semibold uppercase tracking-[0.18em] text-coal-deep transition-all duration-500 hover:bg-bronze-soft hover:shadow-[0_18px_40px_-16px_rgba(169,126,82,0.7)] focus-visible:ring-2 focus-visible:ring-bronze-soft disabled:cursor-default"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'idle' && (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2"
                  >
                    Send message
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.span>
                )}
                {status === 'sending' && (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2"
                  >
                    <span className="size-3.5 animate-spin rounded-full border-2 border-coal-deep/40 border-t-coal-deep" />
                    Sending…
                  </motion.span>
                )}
                {status === 'sent' && (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-2"
                  >
                    <Check size={16} />
                    Message sent — thank you!
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <p className="text-center text-xs text-fog/70">
              Or reach me directly at{' '}
              <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-bronze-soft">
                {site.email}
              </a>
            </p>
          </form>
        </div>
      </motion.div>
    </section>
  )
}
