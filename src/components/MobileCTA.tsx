import { useEffect, useState } from 'react'
import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { company, phoneHref } from '../data/site'

/** Schwebende Aktionsleiste auf dem Smartphone – erscheint nach dem Hero, verschwindet beim Kontaktformular. */
export default function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const contact = document.getElementById('kontakt')
    let pastHero = false
    let atContact = false
    const update = () => setVisible(pastHero && !atContact)

    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.8
      update()
    }
    const obs = new IntersectionObserver(([e]) => {
      atContact = e.isIntersecting
      update()
    })
    if (contact) obs.observe(contact)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  const secondary = phoneHref
    ? { href: phoneHref, label: 'Anrufen', Icon: Phone }
    : company.email
      ? { href: `mailto:${company.email}`, label: 'E-Mail', Icon: Mail }
      : null

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex gap-2 rounded-full border border-white/10 bg-ink-950/90 p-1.5 shadow-2xl backdrop-blur-xl transition-all duration-500 sm:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-24 opacity-0'
      }`}
    >
      {secondary && (
        <a
          href={secondary.href}
          tabIndex={visible ? 0 : -1}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
        >
          <secondary.Icon className="size-4" aria-hidden />
          {secondary.label}
        </a>
      )}
      <a
        href="#kontakt"
        tabIndex={visible ? 0 : -1}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink-950"
      >
        Offerte anfragen
        <ArrowUpRight className="size-4" aria-hidden />
      </a>
    </div>
  )
}
