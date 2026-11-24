import { useState } from 'react'
import { ArrowUpRight, ChevronDown } from 'lucide-react'
import Picture from '../Picture'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import SectionLink from '../SectionLink'
import { moreReferences, references, stats } from '../../data/site'

/** Auf dem Handy zunächst nur so viele weitere Referenzen zeigen */
const MOBILE_VISIBLE = 8

export default function References() {
  const [showAll, setShowAll] = useState(false)
  const total = references.length + moreReferences.length

  return (
    <section id="referenzen" className="relative bg-concrete-100 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Referenzen"
              title="Gebaut für Spitäler, Hochschulen, Banken und Büros."
              intro="Unsere Heiz- und Kühldecken hängen in anspruchsvollen Bauten in der ganzen Schweiz und in Liechtenstein. Eine Auswahl:"
            />

            <Reveal delay={120} className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-[22px] border border-ink-900/10 bg-ink-900/10">
              {stats.map((s) => (
                <div key={s.value + s.label} className="bg-white p-4 sm:p-5">
                  <p className="font-display text-3xl font-bold text-ink-950 sm:text-4xl">{s.value}</p>
                  <p className="mt-1.5 text-[0.8rem] leading-snug text-ink-600 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          {/* Referenz im Bild */}
          <Reveal as="figure" className="relative mb-3 overflow-hidden rounded-[22px] bg-ink-900">
            <Picture
              name="pilatus-schwarzhorn-halle"
              className="block"
              alt="Pilatus, Neubau Schwarzhorn: Halle mit weissen Lamellen-Deckensegeln zwischen Lichtbändern, darunter ein gelber Hallenkran"
              sizes="(min-width: 1024px) 52vw, 92vw"
              imgClassName="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-950/85 via-ink-950/40 to-transparent p-5 pt-20 sm:p-7 sm:pt-24">
              <span className="eyebrow text-ice-300">Referenz im Bild</span>
              <span className="font-display mt-1.5 block text-xl font-semibold text-white sm:text-2xl">
                Pilatus, Neubau Schwarzhorn
              </span>
              <span className="mt-1 block text-sm text-white/75">Lamellen-Deckensegel über die ganze Halle</span>
            </figcaption>
          </Reveal>

          <ol className="grid gap-3 sm:grid-cols-2">
            {references.map((r, i) => (
              <li key={r.name + r.place}>
                <Reveal
                  delay={(i % 2) * 80}
                  className="group flex h-full items-start justify-between gap-4 rounded-[20px] border border-ink-900/[0.06] bg-white p-5 transition-shadow hover:shadow-[0_10px_30px_-12px_rgb(17_20_24/0.25)] sm:p-6"
                >
                  <div>
                    <p className="font-semibold text-ink-950">{r.name}</p>
                    <p className="mt-1 text-sm text-ink-600">{r.place}</p>
                  </div>
                  <span className="font-mono text-xs text-steel-500">{String(i + 1).padStart(2, '0')}</span>
                </Reveal>
              </li>
            ))}
          </ol>

          {/* Weitere Referenzen: kompakte Liste */}
          <Reveal className="mt-3 rounded-[20px] border border-ink-900/[0.06] bg-white p-5 sm:p-7">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="eyebrow text-ink-600">Weitere Referenzen</h3>
              <span className="font-mono text-xs text-steel-500">
                {String(references.length + 1).padStart(2, '0')}–{total}
              </span>
            </div>
            <ul id="weitere-referenzen" className="mt-4 grid sm:grid-cols-2 sm:gap-x-8">
              {moreReferences.map((r, i) => (
                <li
                  key={r.name + r.place}
                  className={`items-baseline justify-between gap-4 border-t border-ink-900/[0.07] py-3 ${
                    !showAll && i >= MOBILE_VISIBLE ? 'hidden sm:flex' : 'flex'
                  }`}
                >
                  <span className="font-medium text-ink-950">{r.name}</span>
                  <span className="shrink-0 text-right text-sm text-ink-600">{r.place}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              aria-controls="weitere-referenzen"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-ink-900/10 py-3 text-sm font-semibold text-ink-900 sm:hidden"
            >
              {showAll ? 'Weniger anzeigen' : `${moreReferences.length - MOBILE_VISIBLE} weitere anzeigen`}
              <ChevronDown className={`size-4 transition-transform ${showAll ? 'rotate-180' : ''}`} aria-hidden />
            </button>
          </Reveal>

          <Reveal className="mt-8 flex flex-col gap-4 rounded-[22px] bg-ink-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-md leading-relaxed text-steel-300">
              Ihr Bau als nächste Referenz? Schicken Sie uns Pläne oder eine kurze Beschreibung, wir melden uns mit
              einer Einschätzung.
            </p>
            <SectionLink id="kontakt" className="btn btn-primary shrink-0">
              Projekt anfragen
              <ArrowUpRight className="size-4" aria-hidden />
            </SectionLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
