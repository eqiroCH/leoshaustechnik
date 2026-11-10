import { Link } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { LogoStacked } from './brand/Logo'
import { company, nav, phoneHref } from '../data/site'
import SectionLink from './SectionLink'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-ink-950 text-steel-300">
      <div className="bg-thermal h-px w-full opacity-60" aria-hidden />
      <div className="container-x grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" aria-label={`${company.shortName} – Startseite`} className="inline-block text-white">
            <LogoStacked className="h-28 w-auto" />
          </Link>
          <p className="mt-6 max-w-xs leading-relaxed">Heizen, Kühlen, Feinverteilung. Montage von Heiz- und Kühldeckensegeln aus {company.city} {company.canton}.</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-2 lg:col-start-6">
          <p className="eyebrow text-steel-400">Navigation</p>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => (
              <li key={n.id}>
                <SectionLink id={n.id} className="transition-colors hover:text-white">
                  {n.label}
                </SectionLink>
              </li>
            ))}
            <li>
              <SectionLink id="kontakt" className="transition-colors hover:text-white">
                Kontakt
              </SectionLink>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="eyebrow text-steel-400">Kontakt</p>
          <address className="mt-5 space-y-3 not-italic">
            <p>
              {company.name}
              <br />
              {company.street}
              <br />
              {company.zip} {company.city} {company.canton}
            </p>
            {company.email && (
              <p>
                <a href={`mailto:${company.email}`} className="text-white transition-colors hover:text-ice-200">
                  {company.email}
                </a>
              </p>
            )}
            {phoneHref && (
              <p>
                <a href={phoneHref} className="text-white transition-colors hover:text-ice-200">
                  {company.phone}
                </a>
              </p>
            )}
          </address>
        </div>

        <div className="lg:col-span-2">
          <p className="eyebrow text-steel-400">Rechtliches</p>
          <ul className="mt-5 space-y-3">
            <li>
              <Link to="/impressum" className="transition-colors hover:text-white">
                Impressum
              </Link>
            </li>
            <li>
              <Link to="/datenschutz" className="transition-colors hover:text-white">
                Datenschutz
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="container-x flex flex-col gap-4 py-6 pb-28 text-sm sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p>
            © {year} {company.name} · UID {company.uid}
          </p>
          <div className="flex items-center gap-6">
            <p>
              Website von{' '}
              <a href="https://eqiro.ch" target="_blank" rel="noopener" className="font-medium text-white hover:text-ice-200">
                Eqiro
              </a>
            </p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              aria-label="Nach oben"
              className="grid size-10 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
            >
              <ArrowUp className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
