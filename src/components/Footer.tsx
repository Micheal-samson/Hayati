import { navLinks, site, socials } from '../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-cream pb-10 pt-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-10 border-t border-ink/10 pt-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[clamp(2.6rem,8vw,5.5rem)] uppercase leading-[0.9] text-ink">
              Elizabeth <span className="name-fill">Hayati</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
              Creative director & digital designer — crafting identities and
              motion with rhythm since 2018. {site.location}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link w-fit text-[13px] font-medium uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <ul className="flex flex-col gap-2">
            {socials.map((social) => (
              <li key={social.id}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-link w-fit text-[13px] font-medium uppercase tracking-[0.16em] text-ink/80 transition-colors hover:text-bronze"
                >
                  {social.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink/10 pt-6 text-xs text-ink-soft sm:flex-row sm:items-center">
          <p>© {year} Elizabeth Hayati. All rights reserved.</p>
          <p className="uppercase tracking-[0.22em]">Designed & built with too much coffee</p>
        </div>
      </div>
    </footer>
  )
}
