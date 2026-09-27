import { motion } from 'framer-motion'
import { about } from '../data/site'

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-sand/50 py-24 lg:py-32">
      {/* oversized watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[16rem] uppercase leading-none text-ink/[0.05] lg:text-[22rem]"
      >
        EH
      </span>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:px-10">
        {/* ————— Left: portrait ————— */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="absolute -left-4 -top-4 size-24 rounded-tl-3xl border-l-2 border-t-2 border-bronze" aria-hidden />
          <div className="absolute -bottom-4 -right-4 size-24 rounded-br-3xl border-b-2 border-r-2 border-ink/25" aria-hidden />
          <div className="group relative overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(27,35,46,0.5)]">
            <img
              src="/elizabeth-source.jpg"
              alt="Elizabeth Hayati in a denim jacket, taking a mirror selfie"
              width={736}
              height={981}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl bg-coal/85 px-5 py-3 text-cream backdrop-blur-md">
              <span className="font-serif text-sm italic">Elizabeth Hayati</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-fog">Est. 1997</span>
            </figcaption>
          </div>
        </motion.figure>

        {/* ————— Right: bio, skills, experience ————— */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-bronze">
              {about.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
              {about.headlineLead}{' '}
              <em className="font-light italic text-bronze">{about.headlineAccent}</em>
            </h2>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}

            {/* stats strip */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-y border-ink/10 py-6">
              {about.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-ink sm:text-4xl">{s.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* skill pills */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="mt-10"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink-soft">
              Capabilities
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {about.skills.map((skill) => (
                <span
                  key={skill}
                  className="pill rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-ink"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* experience */}
          <motion.ul
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            className="mt-10"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-ink-soft">
              Experience
            </p>
            <li className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
              {about.experience.map((job) => (
                <div
                  key={job.role}
                  className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 transition-colors duration-300 hover:bg-paper/70"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-bronze transition-transform duration-300 group-hover:translate-x-1">→</span>
                    <div>
                      <p className="font-serif text-lg font-semibold text-ink">{job.role}</p>
                      <p className="text-sm text-ink-soft">{job.place}</p>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-ink-soft">{job.period}</span>
                </div>
              ))}
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
