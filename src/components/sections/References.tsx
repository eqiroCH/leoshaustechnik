import { ArrowUpRight } from 'lucide-react'
import Reveal from '../Reveal'
import SectionHeading from '../SectionHeading'
import SectionLink from '../SectionLink'
import { references, stats } from '../../data/site'

export default function References() {
  return (
    <section id="referenzen" className="relative bg-concrete-100 py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="Referenzen"
              title="Gebaut für Spitäler, Hochschulen, Banken und Büros."
              intro="Unsere Heiz- und Kühldecken hängen in anspruchsvollen Bauten in der ganzen Schweiz. Eine Auswahl:"
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
          <ol className="grid gap-3 sm:grid-cols-2">
            {references.map((r, i) => (
              <li key={r.name}>
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

          <Reveal className="mt-8 flex flex-col gap-4 rounded-[22px] bg-ink-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-md leading-relaxed text-steel-300">
              … und viele weitere. Die vollständige Referenzliste senden wir Ihnen gerne.
            </p>
            <SectionLink id="kontakt" className="btn btn-primary shrink-0">
              Referenzliste anfragen
              <ArrowUpRight className="size-4" aria-hidden />
            </SectionLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
