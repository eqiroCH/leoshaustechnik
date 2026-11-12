import { ArrowUpRight } from 'lucide-react'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import { company, values } from '../../data/site'

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')

export default function About() {
  return (
    <section id="ueber-uns" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow="Über uns" title="Spezialisten statt Generalisten." />
          <Reveal delay={100} className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600 text-pretty">
            <p>
              Hinter {company.shortName} stehen <strong className="font-semibold text-ink-900">Leonard Andreic</strong> und{' '}
              <strong className="font-semibold text-ink-900">Leonardo Mistrafovic</strong>, beide gelernte Heizungs- bzw.
              HLK-Monteure mit über 15 Jahren Erfahrung, davon über 10 Jahre spezialisiert auf Kühldecken.
            </p>
            <p>
              Bei uns haben Sie direkte Ansprechpartner, die Ihr Projekt vom Start bis zur Abnahme persönlich begleiten. Wir
              arbeiten sauber, halten Termine ein und finden Lösungen, wenn es auf der Baustelle eng wird.
            </p>
          </Reveal>

          <p className="eyebrow mt-12 text-steel-500">Ihre Ansprechpartner</p>
          <Reveal delay={160} className="mt-4 grid gap-4 sm:grid-cols-2">
            {company.people.map((p, i) => (
              <div key={p.name} className="flex items-center gap-4 rounded-[22px] border border-ink-900/10 bg-concrete-50 p-5">
                <span
                  aria-hidden
                  className={`grid size-14 shrink-0 place-items-center rounded-full font-mono text-base font-semibold text-ink-950 ${
                    i === 0 ? 'bg-ice-200' : 'bg-heat-200'
                  }`}
                >
                  {initials(p.name)}
                </span>
                <div>
                  <p className="font-semibold text-ink-950">{p.name}</p>
                  <p className="mt-0.5 text-sm leading-snug text-ink-600">{p.role}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Reveal className="rounded-[28px] bg-ink-950 p-7 text-white sm:p-10">
            <p className="eyebrow text-steel-400">Worauf Sie zählen können</p>
            <ul className="mt-8 space-y-7">
              {values.map((v, i) => (
                <li key={v.title} className="flex gap-5">
                  <span className="mt-1 font-mono text-sm text-steel-400">0{i + 1}</span>
                  <div>
                    <p className="font-display text-xl font-bold">{v.title}</p>
                    <p className="mt-1.5 leading-relaxed text-steel-300">{v.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {company.partner && (
            <Reveal delay={120}>
              <a
                href={company.partner.url}
                target="_blank"
                rel="noopener"
                className="group mt-4 flex items-center justify-between gap-4 rounded-[22px] border border-ink-900/10 bg-concrete-50 p-5 transition-colors hover:bg-concrete-100 sm:p-6"
              >
                <span>
                  <span className="eyebrow block text-steel-500">Partner</span>
                  <span className="mt-1.5 block font-semibold text-ink-950">
                    {company.partner.name}, {company.partner.place}
                  </span>
                </span>
                <ArrowUpRight
                  className="size-5 text-ink-700 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
