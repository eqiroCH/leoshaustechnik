import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, Phone, X } from 'lucide-react'
import { LogoHorizontal } from './brand/Logo'
import { company, nav, phoneHref } from '../data/site'
import SectionLink from './SectionLink'

const navIds = nav.map((n) => n.id)

function useActiveSection(ids: readonly string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    if (!enabled) return
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const visible = new Set<string>()
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)))
        // In Dokument-Reihenfolge den ersten sichtbaren Abschnitt markieren – oder keinen (z. B. im Hero)
        setActive(ids.find((id) => visible.has(id)) ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [ids, enabled])
  return enabled ? active : null
}

export default function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(navIds, isHome)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Offenes Menü: Seite sperren, Hintergrund inert (Fokus bleibt im Menü), Escape schliesst
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const blocked = [document.getElementById('main'), document.querySelector('footer')].filter(Boolean) as HTMLElement[]
    root.style.overflow = 'hidden'
    blocked.forEach((el) => el.setAttribute('inert', ''))
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    // Wird das Fenster breit (z. B. Tablet gedreht), Menü schliessen
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      root.style.overflow = ''
      blocked.forEach((el) => el.removeAttribute('inert'))
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  useEffect(() => setOpen(false), [pathname])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? 'border-b border-white/[0.07] bg-ink-950/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-950 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Zum Inhalt springen
      </a>
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <Link to="/" aria-label={`${company.shortName} – Startseite`} className="shrink-0 text-white">
          <LogoHorizontal className="h-10 w-auto lg:h-11" />
        </Link>

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.id}>
                <SectionLink
                  id={item.id}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
                    active === item.id ? 'text-white' : 'text-steel-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`bg-thermal absolute inset-x-4 -bottom-0.5 h-px origin-left transition-transform duration-500 ${
                      active === item.id ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {phoneHref && (
            <a
              href={phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-steel-200 transition-colors hover:text-white xl:inline-flex"
            >
              <Phone className="size-4" aria-hidden />
              {company.phone}
            </a>
          )}
          <SectionLink id="kontakt" className="btn btn-primary hidden !py-2.5 !text-sm sm:inline-flex">
            Offerte anfragen
            <ArrowUpRight className="size-4" aria-hidden />
          </SectionLink>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile-Menü */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-white/[0.07] bg-ink-950 lg:hidden"
      >
        <nav aria-label="Mobile Navigation" className="container-x flex min-h-full flex-col py-8">
          <ul className="flex flex-col">
            {[...nav, { id: 'kontakt', label: 'Kontakt' }].map((item, i) => (
              <li key={item.id} className="border-b border-white/[0.07]">
                <SectionLink
                  id={item.id}
                  onClick={() => setOpen(false)}
                  className="font-display flex items-baseline justify-between py-5 text-3xl font-semibold text-white"
                >
                  {item.label}
                  <span className="font-mono text-xs text-steel-400">0{i + 1}</span>
                </SectionLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3 pt-10 text-steel-300">
            {phoneHref && (
              <a href={phoneHref} className="flex items-center gap-3 text-lg text-white">
                <Phone className="size-5" aria-hidden /> {company.phone}
              </a>
            )}
            {company.email && (
              <a href={`mailto:${company.email}`} className="block text-lg text-white">
                {company.email}
              </a>
            )}
            <p className="text-sm">
              {company.street}, {company.zip} {company.city} {company.canton}
            </p>
          </div>
        </nav>
      </div>
    </header>
  )
}
